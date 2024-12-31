import React, { useEffect, useRef, useState } from 'react'
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

const Login = () => {
    const captchaRef = useRef(null);
    const [disabled,setDisabled] = useState(true);
    useEffect(()=>{
        loadCaptchaEnginge(6); 
    },[]);
    const handleLogin = (e)=>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);
    }
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
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row md:flex-row">
                <div className="text-center lg:text-left w-full lg:w-1/2 md:w-1/2">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full lg:w-1/2 md:w-1/2 shadow-2xl">
                    <form className="card-body" onSubmit={handleLogin}>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Enter Email" name='email' className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Enter Password" name='password' className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <LoadCanvasTemplate />
                        </label>
                        <input type="text" placeholder="Type Captcha" ref={captchaRef} name='captcha' className="input input-bordered" required />
                        <button className='btn btn-outline btn-xs my-2' onClick={handleValidateCaptcha}>Validate</button>
                        </div>
                        <div className="form-control mt-6">
                        <input disabled={disabled} type="submit" className="btn btn-primary" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login