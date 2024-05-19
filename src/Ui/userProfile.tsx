import { NavLink } from "react-router-dom";
import getAllUserProfile from "../Api/userProfile";

export const UserProfile = () => {
  const { data, isLoading, isError } = getAllUserProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user profile</div>;
  }

  return (
    <>
      <div
        className="max-w-2xl mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900 flex flex-col gap-10"
        key={data?.id}
      >
        <div className="shadow-sm bg-gray-50">
          <div
            className="rounded-t-lg h-64 overflow-hidden"
            style={{
              backgroundImage: `url(${data?.imageurl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img
              className="object-cover object-top w-full h-full"
              src={data?.imageurl}
              alt="Background"
            />
          </div>
          <div className="mx-auto w-40 h-40 relative -mt-20 border-4 border-white rounded-full overflow-hidden">
            <img
              className="object-cover object-center h-full w-full"
              src={data?.imageurl}
              alt="User Profile"
            />
          </div>
          <div>
            <div className="text-center mt-2">
              <h2 className="font-semibold text-xl">{data?.username}</h2>
            </div>
          </div>
          <div className=" ">
            <ul className="py-4 mt-2 flex flex-col items-center justify-around gap-5">
              <li className="flex flex-col items-center justify-around bg-gray-400 w-full ">
                <div className="text-lg text-black">Username</div>{" "}
                <div>{data.username}</div>
              </li>
              <li className="flex flex-col items-center justify-around bg-gray-400 w-full ">
                <div className="text-lg text-black">Email</div>{" "}
                <div>{data.email}</div>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-4 border-t mx-8 mt-2">
          <NavLink to="/edituserprofile">
            <button className="w-full rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
              Update Profile
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};
