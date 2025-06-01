import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../redux/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isFeedPage = location.pathname === "/";

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg px-6 py-3 flex justify-between items-center">
      <Link
        to="/"
        className="text-2xl font-bold drop-shadow-md transition-colors duration-300 text-pink-600"
      >
        Crushes
      </Link>

      {user && (
        <div className="flex items-center gap-4">
          <span
            className={`text-sm font-extrabold transition-colors duration-300 ${
              isFeedPage ? "text-black" : "text-white"
            }`}
          >
            Welcome, {user.firstName}
          </span>

          <div className="relative group">
            <div
              tabIndex={0}
              role="button"
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-400 shadow-pink-200 shadow-md"
            >
              <img
                src={
                  Array.isArray(user.photoUrl)
                    ? user.photoUrl[0] || "/default-avatar.png"
                    : user.photoUrl || "/default-avatar.png"
                }
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>

            <ul className="absolute right-0 mt-3 w-48 bg-white/20 backdrop-blur-lg rounded-xl p-2 hidden group-focus-within:flex group-hover:flex flex-col z-50 shadow-xl border border-white/30">
              <li>
                <Link
                  to="/profile"
                  className="text-white px-4 py-2 rounded hover:bg-white/30"
                >
                  Profile{" "}
                  <span className="ml-2 text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full">
                    New
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="text-white px-4 py-2 rounded hover:bg-white/30"
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  className="text-white px-4 py-2 rounded hover:bg-white/30"
                >
                  Requests
                </Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-300 px-4 py-2 rounded hover:bg-white/30 text-left"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
