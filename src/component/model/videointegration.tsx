import VideoPlayer from "./Videoplayer";
import { getAllVideo } from "../../Api/getAllVideo";

const Videos = () => {
  const { data, isSuccess } = getAllVideo();

  console.log("video", data);
  return (
    <>
      {data.map((data: any) => {
        return <VideoPlayer url={data.videourl} />;
      })}
    </>
  );
};
export default Videos;
