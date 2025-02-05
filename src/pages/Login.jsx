import React, { useState, useEffect } from "react";
import Logo from "../assets/netflix-logo.png";
import Spinner from "../assets/loading.gif";
import { MdErrorOutline } from "react-icons/md";
import { login, signup } from "../Firebase.js";

function Login() {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("testadmin@gmail.com"); 
  const [password, setPassword] = useState("testadmin"); 
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(false);
    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  const toggleSignState = () => {
    setLoading(true);
    setTimeout(() => {
      setSignState((prevState) =>
        prevState === "Sign In" ? "Sign Up" : "Sign In"
      );
      if (prevState === "Sign In") {
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setEmail("testadmin@gmail.com");
        setPassword("testadmin");
      }
      setError(false);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (signState === "Sign In") {
      setEmail("testadmin@gmail.com");
      setPassword("testadmin");
    }
  }, []);

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <img src={Spinner} alt="" className="w-20 laptop:w-32" />
    </div>
  ) : (
    <div
      className="flex flex-shrink items-center justify-center min-h-screen bg-cover bg-center px-5 py-12"
      style={{ backgroundImage: `url(/bglogin.jpg)` }}
    >
      <img
        src={Logo}
        alt=""
        className="absolute top-[3%] left-[6%] w-28 laptop:w-36"
      />

      <form
        className="flex flex-col bg-black bg-opacity-60 p-8 tablet:p-10 tablet:px-12 space-y-6 laptop:space-y-8 rounded-md tablet:max-w-[400px] w-full"
        onSubmit={user_auth}
      >
        <h2 className="font-poppinsBold tracking-wider">{signState}</h2>

        <div className="flex flex-col space-y-3 tablet:space-y-4 font-poppinsRegular">
          {error && (
            <div className="flex space-x-1 justify-center items-center">
              <MdErrorOutline className="text-red-600 text-sm" />
              <p className="text-red-600 text-xs text-center">
                Invalid credentials!
              </p>
            </div>
          )}

          {signState === "Sign Up" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your Name"
              required
              className="rounded-sm text-sm laptop:text-base p-2"
            />
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder={signState === "Sign In" ? "testadmin@gmail.com" : "Email"}
            required
            className="rounded-sm text-sm laptop:text-base p-2"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder={signState === "Sign In" ? "testadmin" : "Password"}
            required
            className="rounded-sm text-sm laptop:text-base p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 rounded-sm py-2 laptop:py-3"
        >
          <p className="text-sm laptop:text-base">{signState}</p>
        </button>

        <div className="flex justify-between">
          <div className="flex items-center space-x-1">
            <input
              type="checkbox"
              className="size-3 laptop:size-4 focus:ring-transparent checked:text-black checked:border-none cursor-pointer"
            />
            <label className="text-xs laptop:text-sm" htmlFor="">
              Remember Me
            </label>
          </div>
          <p className="text-xs laptop:text-sm cursor-pointer">Need Help?</p>
        </div>

        <div className="text-xs laptop:text-sm">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span
                onClick={toggleSignState}
                className="underline text-blue-600 cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p>
              Already have an Account?{" "}
              <span
                onClick={toggleSignState}
                className="underline text-blue-600 cursor-pointer"
              >
                Sign In
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
