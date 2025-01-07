import React from "react";
import useCart from "../../../../hooks/useCart";
import SectionTitle from "../../../../components/SectionTitle";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Cart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((acc, curr) => {
    return (acc += curr.price);
  }, 0);
  let i = 1;
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
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Item has been deleted from Cart.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <>
      <SectionTitle subHeading={"My Cart"} heading={"WANNA ADD MORE?"} />
      <section className="p-5 w-full md:w-10/12 bg-white mx-auto my-5">
        <div className="flex justify-between my-4 font-cinzel font-semibold">
          <h2 className="text-4xl">Total Orders: {cart.length}</h2>
          <h2 className="text-4xl">Total Price: ${totalPrice.toFixed(2)}</h2>
          <button className="btn bg-primer">Pay</button>
        </div>
        <div className="overflow-hidden rounded-t-2xl my-5">
          <table className="table">
            <thead className="bg-primer text-xl text-white">
              <tr>
                <th>no.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>{i++}</td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                  </td>
                  <td>{item.name} </td>
                  <td>{item.price} </td>
                  <th>
                    <button
                      className="btn btn-error btn-xl text-white"
                      onClick={() => {
                        handleDelete(item._id);
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

export default Cart;
