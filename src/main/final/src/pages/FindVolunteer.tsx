import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { useRouter } from 'next/router';
import '../styles/Volunteer.css';

interface Activity {
    id: number;
    title: string;
    description: string;
    image: string;
}

const FindVolunteer: React.FC = () => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const activities: Activity[] = [
        {
            id: 1,
            title: '어르신 돌봄 봉사',
            description: '혼자 계신 어르신들과 시간 보내기',
            image: '/images/senior.png'
        },
        {
            id: 2,
            title: '아이 돌봄 봉사',
            description: '저소득가정 아이들을 위한 무료 학습 보조',
            image: '/images/children.png'
        },
        {
            id: 3,
            title: '장애인 박물관 관람 도우미',
            description: '관람의 어려움을 느끼지 않도록 보조',
            image: '/images/disable.png'
        }
    ];

    const handleActivityClick = (activityId: number) => {
        router.push(`/Detail?id=${activityId}`);
    };

    const handleFirstImageClick = () => {
        router.push('/First');
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
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setSidebarOpen(false);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
    };

    return (
        <div className={`main-screen ${isSidebarOpen ? 'sidebar-open' : ''}`} onClick={isSidebarOpen ? handleOutsideClick : undefined}>
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} ref={sidebarRef}>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Search')}>Search</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Login')}>Login</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/My')}>My</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Chat')}>ChatBot</div>
            </div>
            <div className="header">
                <Image src="/images/image-23.png" alt="search" width={40} height={40} />
                <div className="center-image-container" onClick={handleFirstImageClick} style={{ cursor: 'pointer' }}>
                    <Image className="center-image" src="/images/first.png" alt="투게더!" width={120} height={45} />
                </div>
                <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50} />
            </div>
            <div className="banner-container">
                <Slider {...settings}>
                    <div className="banner-slide">
                        <Image src="/images/volunteer1.png" alt="배너 이미지 1" layout="responsive" width={360} height={200} className="banner-image" />
                    </div>
                    <div className="banner-slide">
                        <Image src="/images/volunteer2.png" alt="배너 이미지 2" layout="responsive" width={360} height={200} className="banner-image" />
                    </div>
                    <div className="banner-slide">
                        <Image src="/images/volunteer3.png" alt="배너 이미지 3" layout="responsive" width={360} height={200} className="banner-image" />
                    </div>
                </Slider>
            </div>

            <main className="activities-container">
                <button className="register-button" onClick={() => router.push('/register')}>봉사 등록</button>
                {activities.map(activity => (
                    <div className="activity" key={activity.id} onClick={() => handleActivityClick(activity.id)}>
                        <Image src={activity.image} alt={activity.title} width={100} height={100}/>
                        <div className="activity-content">
                            <h3>{activity.title}</h3>
                            <p>{activity.description}</p>
                        </div>
                    </div>
                ))}
            </main>
            <footer className="footer">
                <div className="footer-icon" onClick={handleSettingsClick}>=</div>
                <div className="footer-icon" onClick={handleHomeClick}>🏠</div>
                <div className="footer-icon" onClick={handleProfileClick}>👤</div>
            </footer>
        </div>
    );
};

export default FindVolunteer;