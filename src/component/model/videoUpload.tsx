import React, { useEffect } from "react";
import Modal from "react-modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../Input/Inputfield";
import Button from "../Button/Button";

import { Tvideo, videoSchema } from "../../schema/videoschema";
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

const VideoUploadMod: React.FC<ModelOpen> = ({
  open,
  onClose,
  toregister,
  login,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Tvideo>({
    resolver: zodResolver(videoSchema),

    defaultValues: {
      teachername: "",
      title: "",
      description: "",
      image: "",
    },
  });

  const onSubmit: SubmitHandler<Tvideo> = async (data) => {};

  // Redirect to the next page after a successful registration
  //   useEffect(() => {
  //     if (isSuccess) {
  //       navigate("/admin");
  //       // Change "/next-page" to the desired route
  //     }
  //   }, [isSuccess, navigate]);

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="">
        <Modal isOpen={open} style={customStyles} onRequestClose={onClose}>
          <div className="p-4">
            <div className="flex justify-center">
              <div className="text-3xl">UploadVideo</div>
            </div>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* {toregister && ( */}
              <div>
                <InputField
                  register={register}
                  name="teachername"
                  type="text"
                  labelname="TeacherName"
                  placeholder="Username"
                />
                <span className="text-red-600">
                  {errors?.teachername?.message}
                </span>
              </div>
              {/* ) */}

              <InputField
                register={register}
                name="title"
                type="text"
                labelname="Title"
                placeholder="video Title"
              />
              <span className="text-red-600">{errors?.title?.message}</span>
              <InputField
                register={register}
                name="image"
                type={"file"}
                labelname="image"
                placeholder="image"
              />
              <div>
                {/* <span className="text-red-600">{errors?.image?.message}</span> */}
              </div>
              <div>
                <InputField
                  register={register}
                  name="description"
                  type={"text"}
                  labelname="Description"
                  placeholder="Description"
                />
                <div>
                  <span className="text-red-600">
                    {errors?.description?.message}
                  </span>
                </div>
              </div>

              <div className="py-4 flex gap-4">
                <Button text="Upload" />
                <Button text="Close" onClick={onClose} />
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default VideoUploadMod;
