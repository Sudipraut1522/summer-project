import React, { useState } from "react";
import Button from "../../component/Button/Button";
import Search from "../../component/Search/Search";
import ModalComponent from "../../component/model/ModalComponent";
import { Upload } from "lucide-react";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const onSearch = () => {
    console.log("search");
  };

  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
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
              <button onClick={openModal}>
                <div className="flex items-center text-white justify-center p-2 rounded-md border-2">
                  <div className="text-xl">Upload</div>
                  <span>
                    <Upload />
                  </span>
                </div>
              </button>
              <ModalComponent open={showModal} onClose={closeModal} />
            </div>
          </div>
          <div>
            <Button onClick={handleClick} text="Login" />
          </div>
          <div>
            <Button onClick={handleClick} text="Signup" />
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
