import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import '../styles/Mentor.css';

const First: React.FC = () => {
    const router = useRouter();

    const handleBeClick = () => {
        router.push('/Be');
    };

    const handleFindClick = () => {
        router.push('/Find');
    };
    const handleHomeClick = () => {
        router.push('/First');
    };

    const handleProfileClick = () => {
        router.push('/Profile');
    };

    const handleSettingsClick = () => {
        router.push('/Menu');
    };

    return (
        <div className="main-screen">
            <header className="header">
                <Image src="/images/image-23.png" alt="search" width={40} height={40}/>
                <div className="center-image-container">
                    <Image src="/images/first.png" alt="First Image" width={120} height={45}/>
                </div>
                <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50}/>
            </header>
            <div className="content">
                <div className="intro">
                    <h1>내가 필요한, 나를 필요로 하는!</h1>
                    <p>멘토가 되어주세요</p>
                </div>
                <div className="activity-card" id="Be" onClick={handleBeClick}>
                    <h2>BE A MENTOR</h2>
                    <p>우리의 희망에게 멘토가 되어주세요.</p>
                </div>
                <div className="activity-card" id="Mentor" onClick={handleFindClick}>
                    <h2>Find MENTOR</h2>
                    <p>나와 핏한 멘토를 찾아보세요.</p>
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

export default First;
