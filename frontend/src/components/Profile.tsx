import React, { useState, useEffect } from "react";
import "../scss/Profile.scss";

interface UserProfile {
    name: string;
    age: number;
    socialInsuranceNumber: string;
    hospital: string;
    address: string;
    phoneNumber: string;
    email: string;
}

const Profile: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

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
                };

                setUserProfile(data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        }

        fetchUserProfile();
    }, []);

    if (!userProfile) {
        return <div>Loading...</div>;
    }
    return (
        <div className="profile">
            <h2 className="profile__title">User Profile</h2>
            <div className="profile__info">
                <p><strong>Name:</strong> {userProfile.name}</p>
                <p><strong>Age:</strong> {userProfile.age}</p>
                <p><strong>Social Insurance Number:</strong> {userProfile.socialInsuranceNumber}</p>
                <p><strong>Hospital:</strong> {userProfile.hospital}</p>
                <p><strong>Address:</strong> {userProfile.address}</p>
                <p><strong>Phone Number:</strong> {userProfile.phoneNumber}</p>
                <p><strong>Email:</strong> {userProfile.email}</p>
            </div>
        </div>
    );
};

export default Profile;