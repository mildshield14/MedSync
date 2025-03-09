import React, { useState, useEffect } from "react";
import "../scss/Profile.scss";
import AvatarViewer from "./Profile3D"; // Import the 3D model component
import Devices from "./Devices";

interface UserProfile {
  name: string;
  age: number;
  socialInsuranceNumber: string;
  hospital: string;
  address: string;
  phoneNumber: string;
  email: string;
  sex: "male"| "female";
  height: number;
  weight: number;
}

interface Device {
  id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected";
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        // TODO: Replace with your actual API endpoint
        // const response = await fetch("http://localhost:8080/api/user-profile");
        // const data = await response.json();

        const data = {
          name: "John Doe",
          age: 30,
          socialInsuranceNumber: "123-45-6789",
          hospital: "General Hospital",
          address: "123 Main St, Anytown, USA",
          phoneNumber: "(123) 456-7890",
          email: "john.doe@example.com",
          sex: "male" as const, // Ensure it matches the type "male" | "female"
          height: 180,
          weight: 75,
          clothes: "/models/clothes/shirt.glb",
        };
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }



    async function fetchDevices() {
      try {
        // TODO: Replace with your actual API endpoint
        // const response = await fetch("http://localhost:8080/api/devices");
        // const data = await response.json();

        const data = [
          {
            id: "1",
            name: "Fitbit Charge 5",
            type: "Smartwatch",
            status: "connected" as const, // Ensure it matches the type "connected" | "disconnected"
          },
        ];


        setDevices(data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    }

    fetchDevices();
    fetchUserProfile();
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const heightInMeters = userProfile.height / 100;
  const bmi = (userProfile.weight / (heightInMeters * heightInMeters)).toFixed(1);

  // Determine BMI category
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi < 24.9) return "Healthy";
    if (bmi >= 25 && bmi < 29.9) return "Overweight";
    return "Obese";
  };

  const bmiCategory = getBMICategory(parseFloat(bmi))

  return (
    <div className="profile">
      <h2 className="profile__title">User Profile</h2>
      <div className="profile__info">
        <p>
          <strong>Name:</strong> {userProfile.name}
        </p>
        <p>
          <strong>Age:</strong> {userProfile.age}
        </p>
        <p>
          <strong>Social Insurance Number:</strong>{" "}
          {userProfile.socialInsuranceNumber}
        </p>
        <p>
          <strong>Hospital:</strong> {userProfile.hospital}
        </p>
        <p>
          <strong>Address:</strong> {userProfile.address}
        </p>
        <p>
          <strong>Phone Number:</strong> {userProfile.phoneNumber}
        </p>
        <p>
          <strong>Email:</strong> {userProfile.email}
        </p>
      </div>

      <div className="profile__avatar">
        <div className="profile__avatar__label profile__avatar__label-title">Body Measurements</div>
        <div className="profile__avatar-info">

          <div className="profile__avatar-info-left">
            <div className="profile__avatar-info-para">
              <div className="profile__avatar-info-para__container">
                <strong className="profile__avatar-info-detail">Height:</strong>
                <span className="profile__avatar-info-value">
                  {userProfile.height} cm
                </span>
              </div>

              <div className="ruler-lines">
                <span className="small"></span>
                <span className="small"></span>
                <span className="small"></span>
                <span className="small"></span>
                <span className="small"></span>
                <span className="long"></span>
                <span className="medium"></span>
                <span className="medium"></span>
                <span className="medium"></span>
              </div>
            </div>

            {/* Weight */}
            <div className="profile__avatar-info-para">
              <div className="profile__avatar-info-para__container">
                <strong className="profile__avatar-info-detail">Weight:</strong>
                <span className="profile__avatar-info-value">
                  {userProfile.weight} kg
                </span>
              </div>
              <div className="ruler-lines">
                <span className="small"></span>
                <span className="small"></span>
                <span className="small"></span>
                <span className="small"></span>
                <span className="small"></span>
                <span className="long"></span>
                <span className="medium"></span>
                <span className="medium"></span>
                <span className="medium"></span>
              </div>
            </div>
            {/* BMI Section */}
            <div className="profile__bmi">
              <h3 className="profile__avatar__label">BMI</h3>
              <div className="profile__bmi-result">
                <span className="profile__bmi-value">{bmi}</span>
                <span className="profile__bmi-category">{bmiCategory}</span>
              </div>
              <div className="profile__bmi-scale">
                <div className="profile__bmi-scale-gradient"></div>
                <div
                    className="profile__bmi-scale-marker"
                    style={{left: `${(parseFloat(bmi) / 40) * 100}%`}}
                ></div>
              </div>
            </div>
          </div>
          <div className="profile__avatar-info-right">
            <AvatarViewer/>
          </div>
        </div>
      </div>


      <Devices devices={devices} />

      <span className="profile__contact">Contact your admin for any changes</span>
    </div>
  );
};

export default Profile;
