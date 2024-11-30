import React, { useState } from "react";
import Logo from "../assets/netflix-logo.png";

function Login() {
  const [signState, setSignState] = useState("Sign In");

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(/bglogin.jpg)` }}
    >
      <img src={Logo} alt="" className="absolute top-[3%] left-[6%] w-36" />

      <form className="flex flex-col bg-black bg-opacity-60 p-10 space-y-8 rounded-md max-w-[400px] w-full">
        <h2 className="font-poppinsBold tracking-wider">{signState}</h2>

        <div className="flex flex-col space-y-4 font-poppinsRegular">
          {signState === "Sign Up" ? (
            <input
              type="text"
              placeholder="Your Name"
              required
              className="rounded-sm"
            />
          ) : (
            <></>
          )}

          <input
            type="email"
            placeholder="Email"
            required
            className="rounded-sm"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="rounded-sm"
          />
        </div>
        <button className="bg-red-600 hover:bg-red-700 rounded-sm py-3">
          <p>{signState}</p>
        </button>

        <div className="flex justify-between">
          <div className="flex items-center space-x-1">
            <input
              type="checkbox"
              className="size-4 focus:ring-transparent checked:text-black checked:border-none cursor-pointer"
            />
            <label className="text-sm" htmlFor="">
              Remember Me
            </label>
          </div>
          <p className="text-sm cursor-pointer">Need Help?</p>
        </div>

        <div className="text-sm">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span
                onClick={() => {
                  setSignState("Sign Up");
                }}
                className="underline text-blue-600 cursor-pointer"
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have an Account?{" "}
              <span
                onClick={() => {
                  setSignState("Sign In");
                }}
                className="underline text-blue-600 cursor-pointer"
              >
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
