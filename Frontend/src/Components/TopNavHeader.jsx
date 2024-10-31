import { Link } from "react-router-dom";

const TopNavHeader = () => {
  return (
    <div className="container home_topNavHeader p-3 h-fit grid w-full grid-cols-2 grid-rows-1 ">
      <div className="justify-between justify-self-start flex gap-3">
        <div className="create">Logo</div>
        <div className="profile">Socio</div>
      </div>
      <div className="justify-between justify-self-end flex gap-3">
        <Link to={"/createPost"}>
          <div className="create">C</div>
        </Link>

        <div className="profile">P</div>
      </div>
    </div>
  );
};
export default TopNavHeader;
