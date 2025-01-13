import React from "react";
import SectionTitle from "../../../../components/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);

const Payment = () => {
  return (
    <>
      <Helmet>
        <title>Pay to Confirm Order | {import.meta.env.VITE_NAME}</title>
      </Helmet>
      <SectionTitle
        subHeading={"Please! Pay to confirm your orders!"}
        heading={"Payment"}
      />

      <section className="p-5 w-full md:w-10/12 bg-white mx-auto my-5">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </section>
    </>
  );
};

export default Payment;
