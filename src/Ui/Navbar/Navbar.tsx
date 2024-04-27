import React, { useState } from "react";
import Search from "../../component/Search/Search";
import ModalComponent from "../../component/model/Register";
import { LogIn } from "lucide-react";
import Footer from "./footer/Footer";
import UserLoginModel from "../../component/model/userLogin";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setLoginModal] = useState(false);
  const [register, setRegister] = useState(true);

  const login = () => {
    setLoginModal(true);
  };
  const closeLogin = () => {
    setLoginModal(false);
  };
  const tologin = () => {
    setRegister(false);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const onSearch = () => {
    console.log("search");
  };

  return (
    <div className="flex flex-col min-h-screen">
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
          <div className="flex gap-4">
            <div className="flex">
              <div>
                <button onClick={login}>
                  <div className="flex items-center text-white justify-center p-2 rounded-md border-2 gap-4">
                    <div className="text-xl">Login</div>
                    <span>
                      <LogIn />
                    </span>
                  </div>
                </button>
                <UserLoginModel openLogin={showLogin} onClose={closeLogin} />
              </div>
            </div>

            <div>
              <button onClick={openModal}>
                <div className="flex items-center text-white justify-center p-2 rounded-md border-2 gap-4">
                  <div className="text-xl">
                    {register ? "Register" : "Login"}
                  </div>
                </div>
              </button>
              <ModalComponent
                open={showModal}
                onClose={closeModal}
                toregister={register}
                login={tologin}
              />
            </div>
          </div>
        </ul>
      </div>
      <div className="flex-grow"></div> <Footer />
    </div>
  );
};

export default Navbar;
