import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";

const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  // Add New User
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // Update User
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  // Sign In User
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Sign In With Google
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  // Sign Out User
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  //Toast Notification
  const showToast = (message, type) => {
    if (type != "") {
      toast[type](message);
    } else {
      toast(message);
    }
  };
  // Show Modal of SweetAlert
  const sweetAlert = (
    title = "Sure!",
    message = "Do you want to continue!",
    type = "info",
    confirmedText = "Close"
  ) => {
    if (confirmedText != "Close") {
      return Swal.fire({
        title: title,
        text: message,
        icon: type,
        confirmButtonText: confirmedText,
        showCancelButton: true,
        cancelButtonText: `Close`,
      });
    } else {
      return Swal.fire({
        title: title,
        text: message,
        icon: type,
        confirmButtonText: confirmedText,
      });
    }
  };
  //
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Current User : ", currentUser?.email);
      // console.log(auth.currentUser.uid);
      if (currentUser) {
        // Get Token and Store in Client Side
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        });
      } else {
        // Remove Token From Client Side
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [axiosPublic]);
  // Cleaner : useEffect(() => { return onAuthStateChanged(auth, currentUser => { setUser(currentUser);setLoading(false); }); }, [])
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    showToast,
    sweetAlert,
    updateUserProfile,
    googleSignIn,
  };
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
