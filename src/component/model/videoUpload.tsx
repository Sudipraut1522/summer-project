import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../Input/Inputfield";
import Button from "../Button/Button";
import { Tvideo, videoSchema } from "../../schema/videoschema";
import { uploadVideo } from "../../Api/videoUpload";
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
}

const VideoUploadMod: React.FC<ModelOpen> = ({ open, onClose }) => {
  const router = useNavigate();
  const { mutate, isPending, isSuccess } = uploadVideo();
  const [uploadError, setUploadError] = useState<string | null>(null); // State to track upload error

  useEffect(() => {
    if (isSuccess) {
      reset();
      router("/dashboard/videopage");
    }
  }, [isSuccess, router]);

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
      videourl: {},
      category: "",
    },
  });

  const onSubmit: SubmitHandler<Tvideo> = async (data) => {
    const formData = new FormData();
    formData.append("teachername", data.teachername);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);

    formData.append("videourl", data.videourl[0]);

    try {
      await mutate(formData);
      setUploadError(null);
    } catch (error) {
      console.error("Error uploading video:", error);
      setUploadError("Failed to upload video. Please try again.");
    }
  };

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
              <div>
                <InputField
                  register={register}
                  name="teachername"
                  type="text"
                  labelname="TeacherName"
                  placeholder="Teacher Name"
                />
                <span className="text-red-600">
                  {errors.teachername && errors.teachername.message}
                </span>
              </div>

              <InputField
                register={register}
                name="title"
                type="text"
                labelname="Title"
                placeholder="Video Title"
              />
              <span className="text-red-600">
                {errors.title && errors.title.message}
              </span>

              <InputField
                register={register}
                name="category"
                type="text"
                labelname="Category"
                placeholder="Category"
              />
              <span className="text-red-600">
                {errors.category && errors.category.message}
              </span>

              <div>
                <InputField
                  register={register}
                  name="videourl"
                  type="file"
                  labelname="Video"
                  placeholder="Video"
                />
              </div>

              <div>
                {uploadError && (
                  <span className="text-red-600">{uploadError}</span>
                )}
              </div>

              <div>
                <InputField
                  register={register}
                  name="description"
                  type="text"
                  labelname="Description"
                  placeholder="Description"
                />
                <span className="text-red-600">
                  {errors.description && errors.description.message}
                </span>
              </div>

              <div className="py-4 flex gap-4">
                <button
                  className="text-l p-2 w-auto bg-red-600 border-2 rounded-md text-white"
                  disabled={isPending}
                >
                  {isPending ? "Uploading..." : "Upload"}
                </button>
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
