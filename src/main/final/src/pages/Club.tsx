import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import '../styles/Club.css';

interface ActivityData {
    id: string;
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    place: string;
}

const Club: React.FC = () => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [joinedActivity, setJoinedActivity] = useState<ActivityData | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedActivity = localStorage.getItem('joinedActivity');
            if (storedActivity) {
                setJoinedActivity(JSON.parse(storedActivity));
            }
        }
    }, []);

    const handleDetailClick = () => {
        if (joinedActivity) {
            router.push(`/Detail/${joinedActivity.id}`);
        }
    };

    const handleFindVolunteerClick = () => {
        router.push('/FindVolunteer');
    };

    const handleMentorClick = () => {
        router.push('/Mentor');
    };

    const handleHomeClick = () => {
        router.push('/First');
    };
    const handleFirstImageClick = () => {
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
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Login')}>Login</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Mypage')}>My</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Chat')}>ChatBot</div>
            </div>
            <header className="header">
                <Image src="/images/image-23.png" alt="search" width={40} height={40}/>
                <div className="center-image-container" onClick={handleFirstImageClick}
                     style={{cursor: 'pointer'}}>
                    <Image className="center-image" src="/images/first.png" alt="투게더!" width={120} height={45}/>
                </div>
                <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50}/>
            </header>
            <div className="club-container">
                <h1>내가 참여한 봉사활동</h1>
                {joinedActivity ? (
                    <div className="activity-item" onClick={handleDetailClick}>
                        <h2>{joinedActivity.title}</h2>
                        <p>{joinedActivity.description}</p>
                        <p>날짜: {joinedActivity.date}</p>
                        <p>시간: {joinedActivity.startTime} - {joinedActivity.endTime}</p>
                        <p>장소: {joinedActivity.place}</p>
                        <button className="detail-btn">자세히 보기</button>
                    </div>
                ) : (
                    <p className="no-activity">아직 참여한 봉사활동이 없습니다.</p>
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

export default Club;
