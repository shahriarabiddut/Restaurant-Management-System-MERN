import { useQuery } from "@tanstack/react-query";
import React from "react";
import SectionTitle from "../../../../components/SectionTitle";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });
  return (
    <>
      <SectionTitle subHeading={"My Payment History"} heading={"PAYMENTS"} />
      <section className="p-5 w-full md:w-10/12 bg-white mx-auto my-5">
        <div className="flex justify-between my-4 font-cinzel font-semibold">
          <h2 className="text-4xl">Total Payments: {payments.length}</h2>
        </div>
        <div className="overflow-hidden rounded-t-2xl my-5">
          <table className="table">
            <thead className="bg-primer text-xl text-white">
              <tr>
                <th></th>
                <th>Type</th>
                <th>Price</th>
                <th>Date</th>
                <th>Transaction Id</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}.</td>
                  <td>{payment.type} </td>
                  <td>${payment.price} </td>
                  <td>{new Date(payment.date).toLocaleString()} </td>
                  <td>{payment.transactionId} </td>
                  <td>{payment.status} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default PaymentHistory;
