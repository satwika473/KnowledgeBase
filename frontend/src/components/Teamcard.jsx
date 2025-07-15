import React from "react";
import "./Teamcard.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Teamcard = ({ name, role, image, description, size, linkedin, github }) => {
  return (
    <div className={`team-card ${size}`}>
      <img src={image} alt={name} className={`team-image ${size}`} />
      <h3 className="name">{name}</h3>
      <p className="role">{role}</p>
      <p className="description">{description}</p>
      <div className="social-icons">
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noreferrer" className="icon linkedin">
            <FaLinkedin />
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noreferrer" className="icon github">
            <FaGithub />
          </a>
        )}
      </div>
    </div>
  );
};

export default Teamcard;