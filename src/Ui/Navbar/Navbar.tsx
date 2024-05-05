import Search from "../../component/Search/Search";
import Footer from "./footer/Footer";
import { useAuth } from "../../Auth";
import Button from "../../component/Button/Button";
const Navbar = () => {
  const { logout } = useAuth();
  const onSearch = () => {
    console.log("search");
  };

  const userLogout = () => {
    logout();
  };

  return (
    <div>
      <div className="">
        <div className="bg-red-600 p-4">
          <ul className="flex justify-between mx-10 items-center">
            <div>
              <li>
                <h3 className="text-3xl text-white">Video Streaming</h3>
              </li>
            </div>
            <div>
              <Search placeholder="search..." onSearch={onSearch} />
            </div>
            <div>
              <li>
                <Button text="Logout" onClick={userLogout} />
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div className="grid grid-rows-3">
        <div>{/* <Videos /> */}</div>
      </div>
      <div className="flex justify-center items-center h-screen"></div>
      <Footer />
    </div>
  );
};

export default Navbar;
