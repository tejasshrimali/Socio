import { Link } from "react-router-dom";
import { userStore } from "../src/Store/user.store";

const HomePage = () => {
  const { user, isLoggedIn, verifyUser, logoutUser } = userStore();

  const handelUserCheck = async () => {
    const { success, message } = await verifyUser();
    if (!success) {
      console.log(success, message);
    }
  };

  const handleLogOut = async () => {
    const { success, message } = await logoutUser();
    if (!success) {
      console.log(message);
    }
  };

  handelUserCheck();

  return (
    <>
      <h1 className="text-3xl text-white">Hello this is a homepage</h1>
      <br />
      {isLoggedIn ? (
        <>
          Hello {user.name} <button onClick={handleLogOut}>Logout</button>
        </>
      ) : (
        <p>
          New here?considering
          <Link to={"/register"} className="text-blue-500">
            joining us
          </Link>
          or already a user?
          <Link to={"/login"} className="text-blue-500">
            login
          </Link>
        </p>
      )}
    </>
  );
};

export default HomePage;
