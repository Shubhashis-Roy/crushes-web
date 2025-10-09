import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useEffect } from "react";
import { getCookie } from "../utils/getCookie";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // 👈 get current route
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res?.data));
    } catch (err) {
      if (err.status === 400) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100">
      <NavBar />
      <Outlet />
      {location.pathname === "/login" && <Footer />}
    </div>
  );
};

export default Body;
