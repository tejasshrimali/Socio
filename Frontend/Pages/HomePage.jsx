import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1 className="text-3xl text-white">Hello this is a homepage</h1>
      <br />
      <p>
        New here?considering{" "}
        <Link to={"/register"} className="text-blue-500">
          {" "}
          joining us
        </Link>{" "}
        or already a user?{" "}
        <Link to={"/login"} className="text-blue-500">
          login
        </Link>
      </p>
    </>
  );
};

export default HomePage;
