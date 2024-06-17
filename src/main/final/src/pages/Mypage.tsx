import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import '../styles/Mypage.css';

const Mypage: React.FC = () => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
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

    const handleMyClick = () => {
        router.push('/My');
    }
    const handleCalendarClick = () => {
        router.push('/Calendar');
    }
    const handleClubClick = () => {
        router.push('/Club');
    }
    const handleFirstImageClick = () => {
        router.push('/First');
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

    const handleMarketClick = () => {
        router.push('/Market');

    }

    return (
        <div
            className={`main-screen ${isSidebarOpen ? 'sidebar-open' : ''}`}
            onClick={isSidebarOpen ? handleOutsideClick : undefined}
        >
            <div className="sidebar">
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Search')}>Search</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Login')}>Login</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Mypage')}>My</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Chat')}>ChatBot</div>
            </div>
            <header className="header">
                <Image src="/images/image-23.png" alt="search" width={40} height={40}/>
                <div className="center-image-container" onClick={handleFirstImageClick} style={{cursor: 'pointer'}}>
                    <Image className="center-image" src="/images/first.png" alt="투게더!" width={120} height={45}/>
                </div>
                <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50}/>
            </header>
            <div className="content">
                <div className="intro">
                    <h1>{username}님 안녕하세요</h1>
                    <p>오늘도 방문해주셔서 감사합니다.</p>
                </div>
                <div className="activity-card" id="My" onClick={handleMyClick}>
                    <h2>개인정보 확인 및 수정</h2>
                    <p>주변에서 진행 중인 봉사 활동을 찾아보세요.</p>
                </div>
                <div className="activity-card" id="Calendar" onClick={handleCalendarClick}>
                    <h2>월별 봉사 캘린더</h2>
                    <p>봉사 일정을 확인하세요.</p>
                </div>
                <div className="activity-card" id="Club" onClick={handleClubClick}>
                    <h2>봉사 소속 모임</h2>
                    <p>가입된 모임을 확인하세요.</p>
                </div>
                <div className="activity-card" id="Market" onClick={handleMarketClick}>
                    <h2>할인 가맹점</h2>
                    <p>수고하셨습니다! 저렴한 가격으로 이용하세요.</p>
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

export default Mypage;
