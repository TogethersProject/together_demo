'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '@/styles/First.css';

const First: React.FC = () => {
    const router = useRouter();

    const handleFindVolunteerClick = () => {
        router.push('/find-volunteer');
    };

    const handleJoinEmergencyClick = () => {
        router.push('/join-emergency');
    };

    return (
        <div className="main-screen">
            <header className="header">
                <Image
                    src="/images/image23.png"
                    width={500} // 이미지의 실제 너비를 설정합니다.
                    height={300} // 이미지의 실제 높이를 설정합니다.
                    alt="My Image"
                />
                <div className="center-image-container">
                    <Image className="center-image" src="/images/first.png" alt="투게더!" />
                </div>
                <Image src="/images/alert.png" alt="alert" className="alert-icon" />
            </header>
            <div className="content">
                <div className="intro">
                    <h1>사회 공헌 활동</h1>
                    <p>쉽고 빠르게 봉사 활동에 참여하세요.</p>
                </div>
                <div className="activity-card" id="find-volunteer" onClick={handleFindVolunteerClick}>
                    <h2>가까운 봉사 활동 찾기</h2>
                    <p>주변에서 진행 중인 봉사 활동을 찾아보세요.</p>
                </div>
                <div className="activity-card" id="join-emergency" onClick={handleJoinEmergencyClick}>
                    <h2>긴급 구호 활동 참여</h2>
                    <p>도움이 필요한 곳에 즉시 지원하세요.</p>
                </div>
            </div>
        </div>
    );
};

export default First;
