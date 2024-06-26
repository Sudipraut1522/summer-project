import React, { useEffect } from "react";
import Modal from "react-modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tlogin, loginSchema } from "../../schema/LoginSchema";
import InputField from "../Input/Inputfield";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../Api/adminLogin";
import { useAuth } from "../../Auth";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-40%, -40%)",
    width: "25%",
  },
};

interface ModelOpen {
  openLogin: boolean;
  onClose: () => void;
}

const AdminLoginModel: React.FC<ModelOpen> = ({ openLogin, onClose }) => {
  const navigate = useNavigate();
  const { mutate, isSuccess } = adminLogin();
  const { checkToken, isLoggedIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Tlogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Tlogin> = async (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      checkToken();
    }
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [isSuccess, checkToken, navigate]);

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="">
        <Modal isOpen={openLogin} style={customStyles}>
          <div className="p-4">
            <div className="flex justify-center">
              <div className="text-3xl">Login</div>
            </div>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                register={register}
                name="email"
                type="email"
                labelname="Email"
                placeholder="Email"
              />
              <span className="text-red-600">{errors?.email?.message}</span>
              <InputField
                register={register}
                name="password"
                type={"password"}
                labelname="password"
                placeholder="password"
              />
              <div>
                <span className="text-red-600">
                  {errors?.password?.message}
                </span>
              </div>
              <div></div>

              <div className="py-4 flex gap-4">
                <Button text="Login" />
                <Button text="Close" onClick={onClose} />
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AdminLoginModel;
