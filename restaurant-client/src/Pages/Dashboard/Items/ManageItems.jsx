import React from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ManageItems = () => {
  const [menu, loading, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/menu/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Item has been deleted from Menu.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Manage Item | {import.meta.env.VITE_NAME}</title>
      </Helmet>
      <SectionTitle subHeading={"Hurry Up"} heading={"MANAGE ALL ITEMS"} />
      <section className="p-5 w-full md:w-10/12 bg-white mx-auto my-5">
        <div className="flex justify-between my-4 font-cinzel font-semibold">
          <h2 className="text-4xl">Total Items : {menu.length}</h2>
        </div>
        <div className="overflow-hidden rounded-t-2xl my-5">
          <table className="table">
            <thead className="bg-primer text-xl text-white">
              <tr>
                <th>no.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {menu.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}.</td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                  </td>
                  <td>{item.name} </td>
                  <td className="capitalize">{item.category} </td>
                  <td>${item.price} </td>
                  <th>
                    <Link
                      className="btn bg-primer m-1 btn-xl text-white"
                      to={`/dashboard/updateItem/${item._id}`}
                      title="Update"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      className="btn btn-error btn-xl text-white"
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ManageItems;
