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
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      {/* Show footer only on login screen */}
      {location.pathname === "/login" && <Footer />}
    </div>
  );
};

export default Body;
