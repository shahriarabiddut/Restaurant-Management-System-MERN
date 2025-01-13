import React, { useState } from "react";
import { FaUtensils } from "react-icons/fa6";
import SectionTitle from "../../../components/SectionTitle";
import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const { _id, name, category, price, recipe, image } = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [newImage, setNewImage] = useState(image);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    // console.log(data.imageNew.length === 0);
    if (data.imageNew.length !== 0) {
      // Upload image to imgbb
      const imageFIle = { image: data.imageNew[0] };
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
            setNewImage(res.data.data.display_url);
            //   Now Send the Data
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            console.log(menuRes.data);
            if (menuRes.data.modifiedCount > 0) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Item has been Updated",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          }
        });
    } else {
      // Prepare data To Send the data to mongoDB
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: image,
      };
      //   Now Send the Data
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      console.log(menuRes.data);
      if (menuRes.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Item has been Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (menuRes.data.modifiedCount == 0 && menuRes.data.matchedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "Nothing New To Update!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>Update Item | {import.meta.env.VITE_NAME}</title>
      </Helmet>
      <SectionTitle subHeading={"Whats To Change"} heading={"UPDATE ITEM"} />
      <section className="p-5 w-full md:w-10/12 bg-gray-200 mx-auto my-5">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body py-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              defaultValue={name}
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
                defaultValue={category}
              >
                <option disabled>Select Category</option>
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
                defaultValue={price}
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
              defaultValue={recipe}
            ></textarea>
          </div>
          <div className="form-control">
            <img src={newImage} className="w-64 h-64" alt="" /> <br />
            <input
              type="file"
              className="file-input input-bordered w-full"
              {...register("imageNew")}
            />
          </div>
          <button
            className="btn bg-primer w-full flex items-center text-white text-xl font-cinzel"
            type="submit"
          >
            Update Item Details <FaUtensils />
          </button>
        </form>
      </section>
    </>
  );
};

export default UpdateItem;
