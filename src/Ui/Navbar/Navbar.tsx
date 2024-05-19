import Button from "../../component/Button/Button";
import Home from "../../component/videomodel";
import { useAuth } from "../../Auth";
import { CircleUserRound } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const router = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const userProfile = () => {
    router("userprofile");
    // mutate();
  };

  return (
    <>
      <div>
        <div className="bg-red-600 p-4">
          <div className="flex justify-between mx-10 items-center">
            <h3
              className="text-3xl text-white cursor-pointer"
              onClick={() => location.reload()}
            >
              Video Streaming
            </h3>
            <div className="flex items-center gap-10">
              <NavLink to="/home/userprofile">
                <div className="cursor-pointer">
                  <CircleUserRound
                    color="white"
                    height={50}
                    width={40}
                    onClick={userProfile}
                  />
                </div>
              </NavLink>
              <div>
                <Button text="Logout" onClick={handleLogout} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
