import React, { useEffect } from "react";
import Modal from "react-modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../Input/Inputfield";
import Button from "../Button/Button";
import { userRegister } from "../../Api/userRegister";
import { Tregister, regesterSchema } from "../../schema/LoginSchema";
import { useNavigate } from "react-router-dom";

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
  open: boolean;
  onClose: () => void;
  toregister?: boolean;
  login?: () => void;
}

const Model: React.FC<ModelOpen> = ({ open, onClose, login }) => {
  const { mutate, isSuccess } = userRegister();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Tregister>({
    resolver: zodResolver(regesterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Tregister> = async (data) => {
    await mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/userlogin");
      reset();
    } else {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="">
        <Modal isOpen={open} style={customStyles}>
          <div className="p-4">
            <div className="flex justify-center">
              <div className="text-3xl">Register</div>
            </div>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <InputField
                  register={register}
                  name="username"
                  type="text"
                  labelname="username"
                  placeholder="Username"
                />
                <span className="text-red-600">
                  {errors?.username?.message}
                </span>
              </div>

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
                type={"text"}
                labelname="password"
                placeholder="password"
              />
              <div>
                <span className="text-red-600">
                  {errors?.password?.message}
                </span>
              </div>
              <div>
                <div>
                  <p>
                    Already have an Account?
                    <span>
                      <button onClick={login}>Login</button>
                    </span>
                  </p>
                </div>
              </div>

              <div className="py-4 flex gap-4">
                <Button text="Register" />
                <Button text="Close" onClick={onClose} />
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Model;
