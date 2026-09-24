import profileImage from "../assets/profile.jpeg";

import {
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

function ProfileSidebar() {
  return (
    <aside className="profile-sidebar">

      <img
        src={profileImage}
        alt="Louay Ziani"
        className="profile-image"
      />

      <h2 className="profile-name">
        Louay Ziani
      </h2>

      <div className="profile-details">

        <p>
          <FaMapMarkerAlt className="detail-icon location-icon" />
          Almaty, Kazakhstan
        </p>

        <a
          href="https://github.com/LouayZiani"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="detail-icon" />
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/louay-ziani"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className="detail-icon linkedin-icon" />
          LinkedIn
        </a>

        <a
          href="https://www.instagram.com/louayz1/"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram className="detail-icon instagram-icon" />
          @louayz1
        </a>

      </div>

    </aside>
  );
}

export default ProfileSidebar;