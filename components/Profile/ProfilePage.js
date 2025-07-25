'use client';

import React, { useState, useEffect } from 'react';
import styles from './ProfilePage.module.css';

const ProfilePage = ({ onSave }) => {
  const [formData, setFormData] = useState({
    hospitalName: '',
    branchName: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    googleLocation: '',
    logo: null,
  });

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('https://testing.erp4dentist.com/api/calendar');
        const data = await response.json();
        const profile = data?.profile?.[0];

        if (profile) {
          setFormData({
            hospitalName: profile.hospitalname || '',
            branchName: profile.branchname || '',
            email: profile.email || '',
            mobile: profile.phoneNumber || '',
            address: profile.address || '',
            city: profile.city || '',
            state: profile.state || '',
            pincode: profile.picode || '',
            country: profile.country || 'India',
            googleLocation: profile.g_location || '',
            logo: null, // logos are uploaded manually, not prefilled from URL
          });
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Profile Data:", formData);
    if (onSave) onSave(formData);
    alert("Profile saved successfully!");
  };

  return (
    <div className={styles.profileWrapper}>
      <div className={`card shadow-sm ${styles.profileCard}`}>
        <div className="card-body">
          <h4 className="mb-4 fw-semibold">Profile Details</h4>
          <form onSubmit={handleSubmit}>
            <div className="row gy-3">
              <div className="col-md-6">
                <label>Hospital Name</label>
                <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6">
                <label>Branch Name</label>
                <input type="text" name="branchName" value={formData.branchName} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6">
                <label>E-mail</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6">
                <label>Mobile Number</label>
                <div className="input-group">
                  <span className="input-group-text">+91</span>
                  <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <label>Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6">
                <label>City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6">
                <label>State</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6">
                <label>Pincode</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6">
                <label>Country</label>
                <select name="country" value={formData.country} onChange={handleChange} className="form-select">
                  <option>India</option>
                  <option>USA</option>
                  <option>UK</option>
                  <option>Canada</option>
                </select>
              </div>
              <div className="col-md-6">
                <label>
                  Hospital Logo <small>(JPG/PNG, Max 3MB)</small>
                </label>
                <input type="file" name="logo" accept=".jpg,.png" onChange={handleChange} className="form-control" />
              </div>
              <div className="col-12">
                <label>Google Location</label>
                <input type="text" name="googleLocation" value={formData.googleLocation} onChange={handleChange} className="form-control" />
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button type="submit" className={`btn ${styles.saveBtn}`}>
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
