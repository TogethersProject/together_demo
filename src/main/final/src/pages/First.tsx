import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import '../styles/First.css';

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
        <div className={`main-screen ${isSidebarOpen ? 'sidebar-open' : ''}`} onClick={isSidebarOpen ? handleOutsideClick : undefined}>
            <div className="sidebar">
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Search')}>Search</div>
                {!isLoggedIn && <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Login')}>Login</div>}
                {isLoggedIn && <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Mypage')}>My</div>}
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
                    <h1>사회 공헌 활동</h1>
                    <p>쉽고 빠르게 지역을 살펴보세요.</p>
                </div>
                <div className="activity-card" id="FindVolunteer" onClick={handleFindVolunteerClick}>
                    <h2>가까운 봉사 활동 찾기</h2>
                    <p>주변에서 진행 중인 봉사 활동을 찾아보세요.</p>
                </div>
                <div className="activity-card" id="Mentor" onClick={handleMentorClick}>
                    <h2>저소득층 학생 대상 멘토링</h2>
                    <p>우리의 희망에게 멘토가 되어주세요.</p>
                </div>
                {!isLoggedIn && (
                    <div className="activity-card" id="Login" onClick={() => router.push('/Login')}>
                        <h2>로그인 및 회원가입</h2>
                    </div>
                )}
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
