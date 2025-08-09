import NavBar from "../../Components/NavBar/NavBar";
import SideBar from "../../Components/Sidebar/Sidebar";

const Profile = () => {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar full height */}
        <div className="h-full">
          <SideBar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-100 overflow-auto">
          Profile content here
        </div>
      </div>
    </div>
  );
};

export default Profile;
