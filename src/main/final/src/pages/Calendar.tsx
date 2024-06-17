import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import '../styles/Calendar.css';

const Calendar: React.FC = () => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

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
    const handleLoginClick =() => {
        router.push('/Login')
    }

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
        <div
            className={`main-screen ${isSidebarOpen ? 'sidebar-open' : ''}`}
            onClick={isSidebarOpen ? handleOutsideClick : undefined}
        >
            <div className="sidebar">
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Search')}>Search</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Login')}>Login</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/My')}>My</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Chat')}>ChatBot</div>
            </div>
            <header className="header">
                <Image src="/images/image-23.png" alt="search" width={40} height={40} />
                <div className="center-image-container">
                    <Image src="/images/first.png" alt="First Image" width={120} height={45} />
                </div>
                <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50} />
            </header>
            <div className="content">
                <div className="intro">
                    <h1>봉사 일정을 확인하세요</h1>
                </div>
            <div>
            {/*캘린더 들어오면 돰*/}
            </div>

            </div>
            <footer className="footer">
                <div className="footer-icon" onClick={handleSettingsClick}>=</div>
                <div className="footer-icon" onClick={handleHomeClick}>🏠</div>
                <div className="footer-icon" onClick={handleProfileClick}>👤</div>
            </footer>
        </div>
    );
};

export default Calendar;
