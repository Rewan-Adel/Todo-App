"use client"

import React, { useState, useEffect } from "react"
import "../styles/UserProfile.css"
import { Link } from "react-router-dom";
import {getUser,  updateUser,  changePassword} from "../services/UserService"

function UserProfile() {
  const [userData, setUserData] = useState({});
  const [showPassword, setShowPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [changingPassword, setChangingPassword] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const {data} = await getUser(token);
        setUserData(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      
      const data = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
      };
  
      await updateUser(token, data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert(error.message);
    }
  };
  
  

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Toggle password change section
  const togglePasswordChange = () => {
    setChangingPassword(!changingPassword)
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
  
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert("New passwords don't match!");
        return;
      }
  
      const token = localStorage.getItem("token");
      await changePassword(token, passwordData);
      alert("Password updated successfully!");
      setChangingPassword(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error changing password:", error.message);
      alert(error.message);
    }
  };
  

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="card-header">
          <h1>Personal Information</h1>
          <p>View and edit your personal details</p>
        </div>

        <div className="card-content">
          <form onSubmit={handleSubmit}>
            <div className="profile-avatar">
              <div className="avatar-image">
                {userData.name}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" value={userData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" id="phone" name="phone" value={userData.phone} onChange={handleChange} />
            </div>

            <div className="password-section">
              <div className="password-header">
                <h2>Password</h2>
                <button type="button" className="change-password-btn" onClick={togglePasswordChange}>
                  {changingPassword ? "Cancel" : "Change Password"}
                </button>
              </div>

              {!changingPassword ? (
                <p className="password-info">
                  Your password is securely stored. Last updated on {new Date().toLocaleDateString()}
                </p>
              ) : (
                <div className="password-change-form">
                  <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <div className="password-input-wrapper">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                      <button type="button" className="toggle-password-btn" onClick={togglePasswordVisibility}>
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>

                  <button type="button" className="update-password-btn" onClick={handlePasswordUpdate}>
                    Update Password
                  </button>
                </div>
              )}
            </div>

            <div className="button-group">
              <button type="button" className="cancel-button">
                <Link to="/home">
                Cancel
                </Link>
              </button>
              <button type="submit" className="save-button">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
