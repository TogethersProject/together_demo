import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ChatWindow from '../components/ChatWindow';
import '../styles/First.css';

const First: React.FC = () => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown status
    const dropdownRef = useRef<HTMLDivElement>(null);
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

    const handleFirstImageClick = () => {
        router.push('/First');
    };

    const handleSearchClick = () => {
        router.push('/Search');
    };

    const handleAlertClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isDropdownOpen]);
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
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
                <div onClick={handleSearchClick} style={{cursor: 'pointer'}}>
                    <Image src="/images/image-23.png" alt="search" width={40} height={40}/>
                </div>
                <div className="center-image-container" onClick={handleFirstImageClick} style={{cursor: 'pointer'}}>
                    <Image className="center-image" src="/images/first.png" alt="투게더!" width={120} height={45}/>
                </div>
                <div className="alert-container" onClick={handleAlertClick}
                     style={{cursor: 'pointer', position: 'relative'}} ref={dropdownRef}>
                    <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50}/>
                    {isDropdownOpen && (
                        <div className="alert-dropdown" style={{
                            position: 'absolute',
                            top: '60px',
                            right: '0',
                            backgroundColor: 'white',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            borderRadius: '4px'
                        }}>
                            <ul style={{listStyle: 'none', padding: '10px', margin: '0'}}>
                                <li style={{padding: '8px 0', borderBottom: '1px solid #ddd'}}>알림 1</li>
                                <li style={{padding: '8px 0', borderBottom: '1px solid #ddd'}}>알림 2</li>
                                <li style={{padding: '8px 0'}}>알림 3</li>
                            </ul>
                        </div>
                    )}
                </div>
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
