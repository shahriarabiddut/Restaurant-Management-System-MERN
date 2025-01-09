import React from "react";
import { FaGoogle } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { getAdditionalUserInfo } from "firebase/auth";

const SocialLogin = ({ navigate, location, from }) => {
  const { googleSignIn, updateUserProfile, showToast } = useAuth();
  const axiosPublic = useAxiosPublic();
  // SignInTime Update
  const signInTimeUpdate = (user, email) => {
    const lastSignInTime = user.metadata.lastSignInTime;
    const signInInfo = { email, lastSignInTime };
    //Update sign In Info
    axiosPublic.patch(`/users`, signInInfo).then((response) => {
      console.log("User lastSignInTime Updated ", response);
    });
    //
  };
  //   Sign In With Google
  const handleSignInWithGoogle = () => {
    googleSignIn()
      .then((result) => {
        const additionalInfo = getAdditionalUserInfo(result);
        showToast("Logged In", "");
        const currentUser = result.user;
        // setUser(currentUser);
        if (additionalInfo.isNewUser) {
          updateUserProfile({
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          })
            .then(() => {
              console.log("Profile updated successfully And Signed Up");
            })
            .catch((error) => {
              console.error("Signed Up but Error updating profile:", error);
            });
          // Send Data to MongoDB
          const createdAt = currentUser?.metadata?.createdAt;
          const userDB = {
            name: currentUser.displayName,
            email: currentUser.email,
            photo: currentUser.photoURL,
            createdAt,
          };
          axiosPublic.post(`/users`, userDB).then((response) => {
            console.log("User created in DB ", response);
          });
          //
        }
        signInTimeUpdate(currentUser, currentUser.email);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        showToast("Invalid Email/Password", "error");
      });
  };
  return (
    <div className="grid gap-3 m-3">
      <button
        type="button"
        className="btn btn-success"
        onClick={handleSignInWithGoogle}
      >
        <FaGoogle /> Login With Google
      </button>
    </div>
  );
};

export default SocialLogin;
