// import React, { useEffect, useState } from "react";
// import {jwtDecode} from "jwt-decode";

// const Profile = () => {
//   const [myuser, setUser] = useState(null);

//   useEffect(() => {
//     let email = localStorage.getItem("email");
//     const token = localStorage.getItem("token");

//     if (!email && token) {
//       try {
//         const decoded = jwtDecode(token);
//         email = decoded.email;
//         localStorage.setItem("email", email); // optional
//       } catch (e) {
//         console.error("Invalid token");
//         return;
//       }
//     }

//     if (email) {
//       fetch(`http://localhost:3000/email/${email}`)
//         .then((res) => res.json())
//         .then((data) => setUser(data))
//         .catch((err) => console.error("Error loading profile:", err));
//     }
//   }, []);

//   if (!user) return <p>Loading profile...</p>;

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         <img
//           src={`http://localhost:3000/${myuser.filePath}`}
//           alt="Profile"
//           className="profile-image"
//         />
//         <h2>{myuser.name}</h2>
//         <p><strong>Email:</strong> {myuser.email}</p>
//         <p><strong>Date of Birth:</strong> {myuser.dob}</p>
//         <p><strong>Residential Address:</strong> {myuser.residential}</p>
//         <p><strong>Permanent Address:</strong> {myuser.permanent}</p>
//       </div>
//     </div>
//   );
// };
// export default Profile;
import axios from "axios";
import { useEffect, useState } from "react";
import './Profile.css'; // Assuming you have a CSS file for styling

const Profile = () => {
  const [myuser, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail") || "satwijanu@gmail.com";

    axios.get(`http://localhost:5000/email/${email}`)
      .then(res => {
        if (res.data) {
          setUser(res.data);
        } else {
          setError("User not found.");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching user:", err);
        setError("Failed to fetch user.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error || !myuser) {
    return <div className="text-danger text-center mt-5">{error || "No user data available."}</div>;
  }

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Left Profile Card */}
        <div className="col-md-4">
          <div className="card text-center p-3">
            <img
              src={`http://localhost:5000/${myuser.filePath}`}
              className="rounded-circle mx-auto"
              alt="Profile"
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
            />
            <p  className="mt-3"  style={{ color: "#333",fontSize:"50px", fontWeight: "600", fontStyle: "italic",fontFamily: "Brush Script MT" }}
>{`${myuser.name || ''} ${myuser.lastName || ''}`}</p>
            <p className="text-muted">{myuser.designation || "User Profile"}</p>
           
          </div>
        </div>

        {/* Right Form Card */}
        <div className="col-md-8">
          <div className="card p-4">
            

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input type="text" className="form-control" value={myuser.name || ''} readOnly />
              </div>
              
             
              <div className="col-md-6">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-control" value={myuser.email || ''} readOnly />
              </div>

              {/* New Fields from Your Code */}
              <div className="col-md-6">
                <label className="form-label">Date of Birth</label>
                <input type="text" className="form-control" value={myuser.dob || ''} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" value="********" readOnly />
              </div>
              <div className="col-md-12">
                <label className="form-label">Residential Address</label>
                <input type="text" className="form-control" value={myuser.residential || ''} readOnly />
              </div>
              <div className="col-md-12">
                <label className="form-label">Permanent Address</label>
                <input type="text" className="form-control" value={myuser.permanent || ''} readOnly />
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
