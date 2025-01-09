import React from "react";
import SectionTitle from "../../../components/SectionTitle";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa6";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItems = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    // Upload image to imgbb
    const imageFIle = { image: data.image[0] };
    const res = await axiosPublic
      .post(image_hosting_api, imageFIle, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(async (res) => {
        //   console.log(res.data.data);
        if (res.data.success) {
          // Prepare data To Send the data to mongoDB
          const menuItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: res.data.data.display_url,
            deleteUrl: res.data.data.delete_url,
          };
          //   Now Send the Data
          const menuRes = await axiosSecure.post(`/menu`, menuItem);
          console.log(menuRes.data);
          if (menuRes.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your Item has been Added",
              showConfirmButton: false,
              timer: 1500,
            });
            // Reset the form after submission
            reset();
          }
        }
      });
  };
  return (
    <>
      <SectionTitle subHeading={"Whats New"} heading={"ADD NEW ITEM"} />
      <section className="p-5 w-full md:w-10/12 bg-gray-200 mx-auto my-5">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body py-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="input input-bordered"
              {...register("name", { required: true })}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                className="select select-bordered w-full capitalize"
                {...register("category", { required: true })}
              >
                <option disabled defaultValue={"None"}>
                  Select Category
                </option>
                <option value="salad" className="capitalize">
                  salad
                </option>
                <option value="pizza" className="capitalize">
                  pizza
                </option>
                <option value="soup" className="capitalize">
                  soup
                </option>
                <option value="dessert" className="capitalize">
                  dessert
                </option>
                <option value="drinks" className="capitalize">
                  drinks
                </option>
              </select>
            </div>
            <div>
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="text"
                placeholder="Enter Price $"
                className="input input-bordered w-full"
                {...register("price", { required: true })}
                required
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
              placeholder="Recipe Details"
              className="textarea textarea-bordered textarea-lg w-full"
              {...register("recipe")}
            ></textarea>
          </div>
          <div className="form-control">
            <input
              type="file"
              className="file-input input-bordered w-full"
              {...register("image", { required: true })}
              required
            />
          </div>
          <button
            className="btn bg-primer w-full flex items-center text-white text-xl font-cinzel"
            type="submit"
          >
            Add Item <FaUtensils />
          </button>
        </form>
      </section>
    </>
  );
};

export default AddItems;
