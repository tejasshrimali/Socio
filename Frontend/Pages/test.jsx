import { useState } from "react";
import axios from "axios";
const TestFunction = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/createUser/`, {
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
    <>
      <div>
        <input id="name" value={user.name} onInput={(e) => setUser({ ...user, name: e.target.value })}></input>
        <br />
        <input id="name" value={user.email} onInput={(e) => setUser({ ...user, email: e.target.value })}></input>
        <br />
        <input id="name" value={user.password} onInput={(e) => setUser({ ...user, password: e.target.value })}></input>
        <br />
        <button onClick={registerUser}>Submit</button>
      </div>
    </>
  );
};

export default TestFunction;
