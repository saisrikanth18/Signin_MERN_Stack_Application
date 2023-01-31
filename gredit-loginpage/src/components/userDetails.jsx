import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import '../ProfileCard/profileCard.css';
import profile from '../ProfileCard/profile.jpg';

const UserDetails = () => {
    const [userData, setUserData] = useState('');
    useEffect(() => {
        fetch('http://localhost:5000/userData', {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token")
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userData");
                setUserData(data.data);
            });
    }, []);

    const logOut = () => {
        window.localStorage.clear();
        window.location.href = "/sign-in";
    };

    const [isFollowersVisible, setIsFollowersVisible] = useState(false);

    const handleFollowersClick = () => {
        setIsFollowersVisible(!isFollowersVisible);
    };

    const followersList = [
        "Sai Srikanth",
        "Adithi",
        "Kavya",
        "Ramanuja",
        "Nirmala"
    ];

    return (
        <div>
            <div className='center-container'>
                <div className="profile-card">
                    <img src={profile} alt="Profile" className="profile-photo" />
                    <h3 className="profile-name">Kadali Nirmala</h3>
                    <div className="profile-stats">
                        <p className="followers">
                            Followers:
                            <a href="#" onClick={handleFollowersClick}>5</a>
                        </p>
                        <p className="following">
                            Following:
                            <a href="#">9</a>
                        </p>
                    </div>
                    <div className="profile-summary">
                        <p>"I am a software developer and I enjoy building web applications. I am passionate about solving complex problems and learning new technologies."</p>
                    </div>
                    <Modal isOpen={isFollowersVisible} onRequestClose={handleFollowersClick}>
                        <h2>Followers</h2>
                        <ul>
                            {followersList.map((follower, index) => (
                                <li key={index}>{follower}</li>
                            ))}
                        </ul>
                        <button onClick={handleFollowersClick} style={{ borderRadius: '10px', backgroundColor: 'red', color: 'white', border: 'none', fontSize: '20px' }}>Close</button>
                    </Modal>
                </div>
            </div>
            <br />
            <button onClick={logOut} className="btn btn-primary">Log Out</button>
        </div>
    );
};

export default UserDetails;