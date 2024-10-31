import { useState } from "react";

const LoginUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/userLogin/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const { success, message } = await res.json();
    console.log(`${success} ${message}`);
  };

  return (
    <div className="user_login_container h-screen flex justify-center overflow-hidden">
      <div className="text-xl user_register">
        <h1 className="text-3xl mb-20 mt-10">Login into account</h1>

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
        {/* <p className="text-sm mb-5">
          Already have an account? <span className="text-blue-400">login</span>
        </p> */}
        <button onClick={loginUser} className="p-3 btn w-full rounded-md mb-8">
          Continue
        </button>
        {/*   <p className="text-md">or signup with</p>
       <div className="other_signup_options flex flex-row justify-between mt-8">
          <div>Google</div>
          <div>Facenbook</div>
          <div>Apple</div>
        </div> */}
      </div>
    </div>
  );
};

export default LoginUser;
