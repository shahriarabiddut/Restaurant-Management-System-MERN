import React, { createContext, useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import Swal from 'sweetalert2'
import { toast, ToastContainer } from "react-toastify";

const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    // Add New User
    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    // Update User
    const updateUserProfile = (name,photo)=>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
    }
    // Sign In User
    const signIn = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    // Sign Out User
    const logOut = ()=>{
        setLoading(true);
        return signOut(auth);
    }
     //Toast Notification
    const showToast = (message, type) => {
        if(type!=''){
            toast[type](message);
        }else{
            toast(message);
        }
    };
    // Show Modal of SweetAlert
    const sweetAlert = (title='Sure!',message='Do you want to continue!',type='info',confirmedText='Close')=>{
        if(confirmedText!='Close'){
            return Swal.fire({
                title: title,
                text: message,
                icon: type,
                confirmButtonText: confirmedText,
                showCancelButton: true,
                cancelButtonText: `Close`,
              })
        }else{
            return Swal.fire({
                title: title,
                text: message,
                icon: type,
                confirmButtonText: confirmedText,
              })
        }
        
    }
    // 
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser); console.log('Current User : ',currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
    },[]);
    // Cleaner : useEffect(() => { return onAuthStateChanged(auth, currentUser => { setUser(currentUser);setLoading(false); }); }, [])
    const authInfo = {
        user,loading,createUser,signIn,logOut,showToast,sweetAlert,updateUserProfile,
    }
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
        <ToastContainer />
    </AuthContext.Provider>
  )
}

export default AuthProvider