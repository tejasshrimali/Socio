import { useState } from "react";
import axios from "axios";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { userStore } from "../src/Store/user.store.js";
const RegisterUser = () => {
  const nav = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { registerUser } = userStore();
  const handleRegisterUser = async () => {
    console.log(user);
    // e.preventDefault();
    // const res = await fetch(`http://localhost:3000/api/createUser/`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(user),
    // });

    const { success, message } = await registerUser(user);

    if (!success) {
      toast.error(`${message}`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      toast.success(`${message}`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        icon: "no",
        transition: Bounce,
      });
      nav("/");
    }
    console.log(`${success} ${message}`);
  };

  return (
    <div className="user_register_container w-full flex justify-center ">
      <div className="text-xl user_register ">
        <h1 className="text-3xl mb-20 mt-10">Create an account</h1>

        <input
          id="name"
          type="text"
          className="p-3 mb-5 rounded-md"
          value={user.name}
          placeholder="Username"
          onInput={(e) => setUser({ ...user, name: e.target.value })}
        ></input>
        <br />
        <input
          id="email"
          value={user.email}
          type="email"
          className="p-3 mb-5 rounded-md"
          placeholder="Example@gmail.com"
          onInput={(e) => setUser({ ...user, email: e.target.value })}
        ></input>
        <br />
        <input
          id="password"
          value={user.password}
          type="text"
          placeholder="+_+((*(*^%&@"
          className="p-3 mb-5 rounded-md"
          onInput={(e) => setUser({ ...user, password: e.target.value })}
        ></input>
        <br />
        <p className="text-sm mb-5">
          Already have an account?{" "}
          <span className="text-blue-400">
            <Link to={"/login"}>login</Link>
          </span>
        </p>
        <button onClick={handleRegisterUser} className="p-3 btn w-full rounded-md mb-8">
          Continue
        </button>
        <p className="text-md">or signup with</p>

        <div className="other_signup_options flex flex-row justify-between mt-8">
          <div>Google</div>
          <div>Facenbook</div>
          <div>Apple</div>
        </div>
        <ToastContainer className={"mb-5 "} />
      </div>
    </div>
  );
};

export default RegisterUser;
