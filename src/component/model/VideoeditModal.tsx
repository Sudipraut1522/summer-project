import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../Input/Inputfield";
import Button from "../Button/Button";
import { Tvideo, videoSchema } from "../../schema/videoschema";
import { getVideoById } from "../../Api/getvideobyid";
import { useEditVideo } from "../../Api/editVideo";

interface modealOpen {
  open: boolean;
  onClose: () => void;
}

const VideoEditPage: React.FC<modealOpen> = ({ open, onClose }) => {
  const { id } = useParams<{ id: string }>();
  const { mutate: editVideoMutation } = useEditVideo();
  const { data: videoData } = getVideoById(id);

  const {
    register,
    handleSubmit,
    setValue, // Add setValue from useForm
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

  useEffect(() => {
    setValue("teachername", videoData?.teachername);
    setValue("title", videoData?.title);
    setValue("description", videoData?.description);
    setValue("category", videoData?.category);
  }, [videoData, setValue]);

  const onSubmit: SubmitHandler<Tvideo> = (data: any) => {
    const formData = new FormData();
    formData.append("teachername", data.teachername);
    formData.append("title", data.title);
    formData.append("description", data.description);
    // formData.append("videourl", data.videourl[0]);
    formData.append("category", data.category);
    editVideoMutation({ ...data, id });
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 bg-white p-4 rounded-md shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Edit Video</h2>

        <InputField
          register={register}
          name="teachername"
          type="text"
          labelname="Teacher Name"
          placeholder="Teacher Name"
        />
        <span className="text-red-600">{errors.teachername?.message}</span>

        <InputField
          register={register}
          name="title"
          type="text"
          labelname="Title"
          placeholder="Video Title"
        />
        <span className="text-red-600">{errors.title?.message}</span>

        <InputField
          register={register}
          name="category"
          type="text"
          labelname="Category"
          placeholder="Category"
        />
        <span className="text-red-600">{errors.category?.message}</span>

        <InputField
          register={register}
          name="videourl"
          type="file"
          labelname="Video"
          placeholder="Video..."
        />
        {/* <span className="text-red-600">{errors.videourl?.message}</span> */}

        <InputField
          register={register}
          name="description"
          type="text"
          labelname="Description"
          placeholder="Description"
        />
        <span className="text-red-600">{errors.description?.message}</span>

        <div className="py-4 flex gap-4">
          <Button text="Update" />
          <Button text="Close" onClick={onClose} />
        </div>
      </form>
    </div>
  );
};

export default VideoEditPage;
