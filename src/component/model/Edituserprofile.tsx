import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../Input/Inputfield";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { Tregister, regesterSchema } from "../../schema/LoginSchema";
import { useEidiUserProfile } from "../../Api/edituserProfile";
import getAllUserProfile from "../../Api/userProfile";

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
}

const Edituserprofile: React.FC<ModelOpen> = ({ open, onClose }) => {
  const router = useNavigate();

  const { data: userProfile } = getAllUserProfile();
  const { mutate, isSuccess } = useEidiUserProfile();

  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<Tregister>({
    resolver: zodResolver(regesterSchema),
  });

  useEffect(() => {
    if (userProfile) {
      setValue("username", userProfile.username || "");
      setValue("email", userProfile.email || "");
      setValue("password", userProfile.password || "");
      setValue("imageurl", userProfile.imageurl[0] || "");
    }
  }, [userProfile, setValue]);

  const onSubmit: SubmitHandler<Tregister> = async (data) => {
    try {
      setIsUpdating(true); // Set updating state to true before mutation
      const formData = new FormData();
      formData.append("imageurl", data.imageurl[0]);

      mutate({ ...data, imageurl: data.imageurl[0] });
    } catch (error) {
      console.error("Error updating user profile:", error);
      // Handle error (e.g., show error message)
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setIsUpdating(false); // Set updating state to false after mutation
      reset(); // Reset form on success
      router("/home/userprofile"); // Redirect to user profile page
    }
  }, [isSuccess, reset, router]);

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="">
        <Modal isOpen={open} style={customStyles}>
          <div className="p-4">
            <div className="flex justify-center">
              <div className="text-3xl">Edit Profile</div>
            </div>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <InputField
                  register={register}
                  name="username"
                  type="text"
                  labelname="Username"
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
                name="imageurl"
                type="file"
                labelname="Image"
                placeholder="Image"
              />
              {/* <span className="text-red-600">{errors?.imageurl?.message}</span> */}

              {/* Input field for image goes here */}

              <InputField
                register={register}
                name="password"
                type="password"
                labelname="Password"
                placeholder="Password"
              />
              <div>
                <span className="text-red-600">
                  {errors?.password?.message}
                </span>
              </div>

              <div className="py-4 flex gap-4">
                <Button text="Update" />
                <Button text="Close" onClick={onClose} />
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Edituserprofile;
