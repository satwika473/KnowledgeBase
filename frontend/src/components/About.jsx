import React from 'react';
import TeamCard from '../components/TeamCard';
import './About.css';

const teamMembers = [
  {
    name: 'Sandhya',
    role: 'Frontend Developer',
    description: 'Converts UI designs into responsive and styled web components using HTML, CSS, and JS.',
    image: 'https://wallpapers.com/images/hd/cute-cherry-blossom-profile-picture-kdm43x8tlaw2sl0p.jpg',
    size: 'small',
    linkedin: "https://linkedin.com/in/sandhya",
    github: "https://github.com/sandhyaHR",
  },
  {
    name: 'Chandana priya',
    role: 'UI/UX Developer',
    description: 'Designs the visual layout and user experience to make the application intuitive and appealing.',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhpC5WceJkXkT0KYLtmA7t_gYw5x_7_4mr9Io1-Y7w6HtG1CPeELfjuqBrtD2ExOTuTQWswdFM2tPC8tfkdW9SYewrkNkLzsNR_m3Vp2MvGQVlLQbRjU2LEKqr2Qu9_m3Az9kkNrXbB5NBZHuqowO4JETjOXoSQyJhAoFz1k4ZUW6JkV869N8UBJ3ZQaMsV/s1080/Profile%20Picture%20Girl%20Pic.jpg',
    size: 'small',
    linkedin: "https://www.linkedin.com/in/chandana-priya-badina-827b97276/",
    github: "https://github.com/chandanapriyabadina",
  },
  {
    name: 'Satwika',
    role: 'Team Leader',
    description: 'Oversees planning, coordination, and ensures smooth team collaboration and delivery.',
    image: 'https://wallpapers.com/images/hd/cute-profile-picture-bxmwah5el6rxxp8g.jpg',
    size: 'large',
    linkedin: "https://www.linkedin.com/in/chakka-satwika-jahnavi-0a5649276/",
    github: "https://github.com/satwika473",
  },
  {
    name: 'Sri Lakshmi',
    role: 'Frontend Developer',
    description: 'Converts UI designs into responsive and styled web components using HTML, CSS, and JS.',
    image: 'https://i.pinimg.com/736x/de/96/ed/de96edee8558cd27844f78d06f37d5ef.jpg',
    size: 'small',
    linkedin: "https://www.linkedin.com/in/sri-lakshmi-bandi-318b30287/",
    github: "https://github.com/22471A0574",
  },
  {
    name: 'Vinay',
    role: 'Backend Developer',
    description: ' Builds and manages the server, database, and APIs to power the application’s functionality.',
    image: 'https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH',
    size: 'small',
    linkedin: "https://www.linkedin.com/in/vinay-nallamothu-42901b283/",
    github: "https://github.com/Vinaychowdary13",
  }
];

function About() {
  return (
    <div className="about-container">
      <h1>Meet Our Team</h1>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <TeamCard key={index} {...member} />
        ))}
      </div>
    </div>
  );
}

export default About;