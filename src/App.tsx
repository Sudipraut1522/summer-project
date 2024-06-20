import Admin from "./Admin/Admin";
import { AuthProvider } from "./Auth";
import Navbar from "./Ui/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./homepage";
import { Login } from "./login";
import History from "./watchhistory/watchHistory.tsx";
import { UserProfile } from "./Ui/userProfile.tsx";
import { Dashboard } from "./Admin/Dashboard/index.tsx";
import EditProfile from "./Ui/Navbar/editUserProfile.tsx";
import Home from "./component/videomodel.tsx";
import VideoPage from "./Admin/Dashboard/videopage.tsx";
import VideoUpload from "./Admin/Dashboard/videoupload.tsx";
import VideoUpadatePage from "./Admin/Dashboard/videoeditpage.tsx";
import ReportPage from "./Admin/Dashboard/Reportpage.tsx";
import GetVideoByID from "./Ui/VideoById.tsx";
import UserPage from "./Admin/Dashboard/usertable.tsx";
import UserComments from "./Admin/userComments.tsx";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="userlogin" element={<Login />} />
          <Route path="home" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="userProfile" element={<UserProfile />} />
            <Route path="watchhistory" element={<History />} />
            <Route path="video/:id" element={<GetVideoByID />} />
          </Route>

          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<ReportPage />} />
            <Route path="userpage" element={<UserPage />} />
            <Route path="videopage" element={<VideoPage />} />
            <Route path="reportpage" element={<ReportPage />} />
            <Route path="videoupload" element={<VideoUpload />} />
            <Route path="usercomment" element={<UserComments />} />

            <Route path="videoeditpage/:id" element={<VideoUpadatePage />} />
          </Route>

          <Route path="admin" element={<Admin />} />
          <Route path="edituserprofile" element={<EditProfile />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
