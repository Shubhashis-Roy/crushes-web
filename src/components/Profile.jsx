import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return user && (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-pink-50 to-pink-100">
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;
