
import Navbar from "../Navbar";
import SettingSidebar from "./SettingSidebar";

function Profile() {
  document.title = "Profile";
    
  return (
    <div id="profile-container">
      <Navbar />
      <div className="Profile relative">
        <div className="banner"></div>
        <h1>LOGO</h1>
      </div>
      <div className="Profile1">
        <h1>Profile</h1>
        <p>Welcome to the Profile page.</p>
      </div>
      
      <div className="Profile2">
            <SettingSidebar />
            <h1>Welcome to the Dashboard</h1>
      </div>

    </div>
  );
}

export default Profile;