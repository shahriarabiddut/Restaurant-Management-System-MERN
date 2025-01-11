import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useCart from "../../../../hooks/useCart";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user, showToast } = useAuth();
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((acc, curr) => {
    return (acc += curr.price);
  }, 0);
  const navigate = useNavigate();
  //
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  //
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          // console.log(res.data);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // Confirm Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "Anonymous",
            name: user?.displayName || "Anonymous",
          },
        },
      });
    if (confirmError) {
      // console.log("Confirm Error : ", confirmError);
      setError(confirmError);
    } else {
      // console.log("Payment Intent : ", paymentIntent);
      setError("");
      if (paymentIntent?.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        // Now save the payment in DATABASE
        const payment = {
          email: user?.email || "Anonymous",
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(), // UTC Convert : MomentJs
          cartIds: cart.map((item) => item._id),
          menuItemIds: cart.map((item) => item.menuId),
          status: "Pending",
          type: "Food Order",
        };
        const result = await axiosSecure.post("/payments", payment);
        console.log("Payment Saved ", result);
        if (result.data?.result?.insertedId) {
          refetch();
          showToast("Payment Successfull! Order Confirmed!", "success");
          navigate("/dashboard/payments");
        }
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn bg-primer my-5"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {error != "" && <p className="text-red-500 p-2"> {error}</p>}
      {transactionId != "" && (
        <p className="text-green-500 p-2">
          Your Transaction ID : {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
