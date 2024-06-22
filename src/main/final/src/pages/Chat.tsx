// pages/index.tsx

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ChatWindow from '../components/ChatWindow';
import '../styles/First.css'
const First: React.FC = () => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

    // Check if the user is logged in on component mount
    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleFindVolunteerClick = () => {
        router.push('/FindVolunteer');
    };

    const handleMentorClick = () => {
        router.push('/Mentor');
    };

    const handleHomeClick = () => {
        router.push('/First');
    };

    const handleProfileClick = () => {
        router.push('/Mypage');
    };

    const handleSettingsClick = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleSidebarLinkClick = (path: string) => {
        setSidebarOpen(false);
        router.push(path);
    };

    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
            setSidebarOpen(false);
        }
    };

    return (
        <div className={`main-screen ${isSidebarOpen ? 'sidebar-open' : ''}`}
             onClick={isSidebarOpen ? handleOutsideClick : undefined}>
            <div className="sidebar">
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Search')}>
                    <span>🔍 Search</span>
                </div>
                {!isLoggedIn && (
                    <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Login')}>
                        <span>🔒 Login</span>
                    </div>
                )}
                {isLoggedIn && (
                    <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Mypage')}>
                        <span>👤 My Page</span>
                    </div>
                )}
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Chat')}>
                    <span>🤖 ChatBot</span>
                </div>
            </div>

            <header className="header">
                <Image src="/images/image-23.png" alt="search" width={40} height={40}/>
                <div className="center-image-container">
                    <Image src="/images/first.png" alt="First Image" width={120} height={45}/>
                </div>
                <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50}/>
            </header>

            {/* Render the InteractiveChatBot component */}
            <div className="content">
                <ChatWindow/>
            </div>

            <footer className="footer">
                <div className="footer-icon" onClick={handleSettingsClick}>=</div>
                <div className="footer-icon" onClick={handleHomeClick}>🏠</div>
                <div className="footer-icon" onClick={handleProfileClick}>👤</div>
            </footer>
        </div>
    );
};

export default First;