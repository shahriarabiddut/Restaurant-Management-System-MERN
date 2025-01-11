import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import SectionTitle from "../../../../components/SectionTitle";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa6";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      //  Before axiosSecure Interceptor Config
      // const res = await axiosSecure.get("/users", {
      //   headers: {
      //     authorization: `Bearer ${localStorage.getItem("access-token")}`,
      //   },
      // });
      return res.data;
    },
  });
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
        axiosSecure.delete(`/users/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Role Changed!",
              text: "User has been deleted!",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleMadeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/role/${user._id}`, { role: "admin" })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "User Role Changed!",
                text: ` User : ${user.name} is now an Admin`,
                icon: "success",
              });
            }
          });
      }
    });
  };
  const handleMadeUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make User!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/role/${user._id}`, { role: "user" })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "User Role Changed!",
                text: ` User : ${user.name} is now an User`,
                icon: "success",
              });
            }
          });
      }
    });
  };
  return (
    <>
      <SectionTitle subHeading={"Users Data"} heading={"MANAGE ALL USERS"} />
      <section className="p-5 w-full md:w-10/12 bg-white mx-auto my-5">
        <div className="flex justify-between my-4 font-cinzel font-semibold">
          <h2 className="text-4xl">Total Users: {users.length}</h2>
        </div>
        <div className="overflow-hidden rounded-t-2xl my-5">
          <table className="table">
            <thead className="bg-primer text-xl text-white">
              <tr>
                <th></th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}.</td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photo} alt={user.name} />
                      </div>
                    </div>
                  </td>
                  <td>{user.name} </td>
                  <td>{user.email} </td>
                  <td className="text-center">
                    {user.role === "admin" ? (
                      <>
                        Admin <br />
                        <button
                          className="bg-primer p-1 m-1 text-xs text-white rounded-sm text-center"
                          onClick={() => {
                            handleMadeUser(user);
                          }}
                        >
                          Make User
                        </button>
                      </>
                    ) : (
                      <button
                        className="bg-primer btn btn-lg"
                        onClick={() => {
                          handleMadeAdmin(user);
                        }}
                      >
                        <FaUsers />
                      </button>
                    )}
                  </td>
                  <th>
                    <button
                      className="btn btn-error btn-xl text-white"
                      onClick={() => {
                        handleDelete(user._id);
                      }}
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

export default AllUsers;
