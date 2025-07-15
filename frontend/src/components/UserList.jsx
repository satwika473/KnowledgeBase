// UserList.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const UserList = ({ refresh }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh]); 

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Residential Address</th>
            <th>Permanent Address</th>
            <th>Profile Picture</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.dob).toLocaleDateString()}</td>
              <td>{user.residential}</td>
              <td>{user.permanent}</td>
              <td>
                <img
                  src={`http://localhost:3000/${user.filePath}`}
                  alt="Profile"
                  style={{ width: '50px', height: '50px' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
