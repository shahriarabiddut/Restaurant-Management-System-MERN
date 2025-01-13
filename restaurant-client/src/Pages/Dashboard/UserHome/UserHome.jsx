import React from "react";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const UserHome = () => {
  const { user } = useAuth();
  return (
    <>
      <Helmet>
        <title>Dashboard | {import.meta.env.VITE_NAME}</title>
      </Helmet>
      <section className="my-10 px-5">
        <h2 className="text-3xl font-cinzel">
          <span>Hi, Welcome </span>
          {user?.displayName ? user.displayName : "Back"}
        </h2>
      </section>
    </>
  );
};

export default UserHome;
