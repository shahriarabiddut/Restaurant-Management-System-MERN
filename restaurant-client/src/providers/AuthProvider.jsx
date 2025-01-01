import React, { createContext, useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';

const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    // Add New User
    const createUser = (email,password)=>{
        setLoading(true);
        createUserWithEmailAndPassword(auth,email,password);
    }
    // Sign In User
    const singIn = (email,password)=>{
        setLoading(true);
        signInWithEmailAndPassword(auth,email,password);
    }
    // Sign Out User
    const logOut = ()=>{
        setLoading(true);
        signOut(auth);
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
        user,loading,createUser,singIn,logOut
    }
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider