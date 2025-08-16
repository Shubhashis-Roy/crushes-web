import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../redux/userSlice";
import { useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isProfilePage = location.pathname === "/profile";
  const isChatPage = location.pathname.startsWith("/chat");
  const isFeedPage = location.pathname === "/";
  const isConnectionsPage = location.pathname === "/connections";
  const isRequestsPage = location.pathname === "/requests";

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const getItemClasses = (active) =>
    `px-4 py-2 rounded transition-colors duration-200 ${
      active
        ? "bg-pink-200 text-black"
        : isProfilePage || isChatPage
        ? "text-black hover:bg-gray-300"
        : "text-white hover:bg-white/30"
    }`;

  const handleChatNavigate = () => {
    navigate("/connections");
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg px-6 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold drop-shadow-md transition-colors duration-300 text-pink-600"
        >
          Crushes
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            {!isConnectionsPage && (
              <IoChatbubbleEllipsesOutline
                onClick={handleChatNavigate}
                className="text-4xl cursor-pointer font-extrabold text-pink-600 transition-all duration-300 hover:text-red-500"
              />
            )}

            <span
              className={`text-sm font-extrabold transition-colors duration-300 ${
                isProfilePage ? "text-black" : "text-white"
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
                      ? user.photoUrl[0]
                      : user.photoUrl
                  }
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>

              <ul
                className={`absolute right-0 mt-3 w-48 backdrop-blur-lg rounded-xl p-2 hidden group-focus-within:flex group-hover:flex flex-col gap-y-3 z-50 shadow-xl border  ${
                  isProfilePage || isChatPage
                    ? "border-white/100 bg-white bg-opacity-95"
                    : "border-white/30"
                }`}
              >
                <li>
                  <Link to="/profile" className={getItemClasses(isProfilePage)}>
                    Profile
                    <span className="ml-2 text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full">
                      New
                    </span>
                  </Link>
                </li>

                {!isFeedPage && (
                  <li>
                    <Link to="/" className={getItemClasses(isFeedPage)}>
                      Discover
                    </Link>
                  </li>
                )}

                <li>
                  <Link
                    to="/connections"
                    className={getItemClasses(isConnectionsPage)}
                  >
                    Connections
                  </Link>
                </li>
                <li>
                  <Link
                    to="/requests"
                    className={getItemClasses(isRequestsPage)}
                  >
                    Requests
                  </Link>
                </li>

                <li>
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className={`px-4 py-2 rounded text-left ${
                      isProfilePage || isChatPage
                        ? "text-red-500 hover:bg-red-300"
                        : "text-red-300 hover:bg-white/30"
                    }`}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  handleLogout();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
