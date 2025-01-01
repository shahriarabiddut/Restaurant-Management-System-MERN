import React, { useContext, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import authImg from '../../assets/others/authentication2.png';
import { AuthContext } from '../../providers/AuthProvider';
import { useForm } from 'react-hook-form';

const SignUp = () => {
    const captchaRef = useRef(null);
    const [disabled,setDisabled] = useState(true);
    const {createUser} = useContext(AuthContext);
    const { register, handleSubmit, watch,formState: { errors },} = useForm();
    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email,data.password)
        .then((result)=>{
            const loggedUser = result.user;
            console.log(loggedUser);
        })
    }
    console.log(watch("name")) // watch input value by passing the name of it
    useEffect(()=>{
        loadCaptchaEnginge(6); 
    },[]);
    const handleValidateCaptcha = (e)=>{
        e.preventDefault();
        const value = captchaRef.current.value;
        // console.log(value);
        if (validateCaptcha(value)) {
            alert('Captcha Matched');
            setDisabled(false);
        }else {
            alert('Captcha Does Not Match');
        }
    }
  return (
    <>
            <Helmet>
                <title>SignUp | {import.meta.env.VITE_NAME}</title>
            </Helmet>
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse md:flex-row-reverse p-10 m-10 border-2 shadow-2xl">
                <div className="text-center lg:text-left w-full lg:w-1/2 md:w-1/2">
                    <img src={authImg} alt="" />
                </div>
                <div className="card bg-base-100 w-full lg:w-1/2 md:w-1/2 shadow-2xl">
                    <h1 className="text-5xl font-bold pt-5 font-cinzel text-center">SignUp</h1>
                    <form className="card-body py-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Enter Name" name='name' className="input input-bordered" {...register("name")} required />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Enter Email" name='email' className="input input-bordered" {...register("email")} required />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Enter Password" name='password' className="input input-bordered" {...register("password", { required: true, minLength: 6,pattern:/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}/, })} required />
                        {errors.password && (

                            <p className="text-red-600 px-1">
                                {errors.password.type === "required" && "Password field is required"}
                                {errors.password.type === "minLength" && "At least 8 characters long"}
                                {errors.password.type === "pattern" && "Password must include at least 1 lowercase, uppercase, number, and special character"}
                            </p>
                        )}

                        </div>
                        <div className="form-control">
                        <label className="label">
                            <LoadCanvasTemplate />
                        </label>
                        <input type="text" placeholder="Type Captcha" ref={captchaRef} name='captcha' className="input input-bordered" required />
                        <button className='btn btn-outline btn-xs my-2' onClick={handleValidateCaptcha}>Validate</button>
                        </div>
                        <div className="form-control mt-6">
                        <input disabled={disabled} type="submit" className="btn btn-primary" value="SignUp" />
                        </div>
                    </form>
                    <p className='text-yellow-500 text-center pb-5'><small> Allready Have An Account ? <Link to={'/signup'} className='font-bold'> Login</Link></small></p>
                </div>
            </div>
        </div>
    </>
  )
}

export default SignUp