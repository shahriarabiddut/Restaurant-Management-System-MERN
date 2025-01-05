import React, { useContext, useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import authImg from "../../assets/others/authentication2.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../../components/SocialLogin";

const Login = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const { signIn, showToast } = useContext(AuthContext);
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email,password);
    signIn(email, password)
      .then((userCredential) => {
        // showToast('Logged In','');
        const currentUser = userCredential.user;
        console.log(currentUser);
        showToast("Logged in Successfully!", "info");
        // setUser(currentUser);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        // showToast('Invalid Email/Password','error');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  const handleValidateCaptcha = (e) => {
    e.preventDefault();
    const value = captchaRef.current.value;
    // console.log(value);
    if (validateCaptcha(value)) {
      showToast("Captcha Matched", "success");
      setDisabled(false);
    } else {
      showToast("Captcha Didn't Matched", "error");
      setDisabled(true);
    }
  };
  return (
    <>
      <Helmet>
        <title>Login | {import.meta.env.VITE_NAME}</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row md:flex-row p-10 m-10 border-2 shadow-2xl">
          <div className="text-center lg:text-left w-full lg:w-1/2 md:w-1/2">
            <img src={authImg} alt="" />
          </div>
          <div className="card bg-base-100 w-full lg:w-1/2 md:w-1/2 shadow-2xl">
            <h1 className="text-5xl font-bold pt-5 font-cinzel text-center">
              Login
            </h1>
            <form className="card-body py-5" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  placeholder="Type Captcha"
                  ref={captchaRef}
                  onBlur={handleValidateCaptcha}
                  name="captcha"
                  className="input input-bordered"
                  required
                />
                {/* <button className='btn btn-outline btn-xs my-2' type='button' onClick={handleValidateCaptcha}>Validate</button> */}
              </div>
              <div className="form-control mt-6">
                <input
                  disabled={disabled}
                  type="submit"
                  className="btn btn-primary"
                  value="Login"
                />
              </div>
            </form>
            <p className="text-yellow-500 text-center pb-5">
              <small>
                New Here ?
                <Link to={"/signup"} className="font-bold">
                  Create A New Account
                </Link>
              </small>
            </p>

            <div className="divider">OR</div>
            <SocialLogin />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
