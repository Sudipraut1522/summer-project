import { useState } from "react";
import Button from "../../component/Button/Button";
import { FolderUp, Upload } from "lucide-react";
import Search from "../../component/Search/Search";

const Navbar = () => {
  const [onClick, setOnClick] = useState<boolean>(false);
  const click = () => {
    setOnClick(false);
  };

  const onSearch = () => {
    console.log("search");
  };
  return (
    <div className=" bg-red-600 p-4">
      <ul className="flex justify-between mx-10 items-center">
        <div>
          <li>
            <h3 className="text-3xl text-white">Video Straming</h3>
          </li>
        </div>
        <div>
          <Search placeholder="search..." onSearch={onSearch}></Search>
        </div>
        <div className="flex gap-4">
          <div className="flex ">
            <div>
              <Button onClick={click} text="Upload" />
            </div>
          </div>
          <div>
            {" "}
            <Button onClick={click} text="LOgin" />
          </div>
          <div>
            {" "}
            <Button onClick={click} text="Signup" />
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
