import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { useRouter } from 'next/router';
import '../styles/Volunteer.css';

export interface Activity {
    id: number;
    title: string;
    description: string;
    image: string;
}
const FindVolunteer: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        setActivities([
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
        ]);
    }, []);

    const handleActivityClick = (activityId: number) => {
        setSelectedActivityId(activityId);
        router.push(`/Detail?id=${activityId}`);
    };

    const handleFirstImageClick = () => {
        router.push('/First');
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
        <div className="container">
            <div className="main-screen">
                <div className="header">
                    <Image src="/images/image-23.png" alt="search" width={40} height={40}/>
                    <div className="center-image-container" onClick={handleFirstImageClick} style={{cursor: 'pointer'}}>
                        <Image className="center-image" src="/images/first.png" alt="투게더!" width={120} height={45}/>
                    </div>
                    <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50}/>
                </div>
                <div className="banner-container">
                    <Slider {...settings}>
                        <div className="banner-slide">
                            <Image src="/images/volunteer1.png" alt="배너 이미지 1" layout="responsive" width={360}
                                   height={200} className="banner-image"/>
                        </div>
                        <div className="banner-slide">
                            <Image src="/images/volunteer2.png" alt="배너 이미지 2" layout="responsive" width={360}
                                   height={200} className="banner-image"/>
                        </div>
                        <div className="banner-slide">
                            <Image src="/images/volunteer3.png" alt="배너 이미지 3" layout="responsive" width={360}
                                   height={200} className="banner-image"/>
                        </div>
                    </Slider>
                </div>

                <main className="activities-container">
                    {activities.map(activity => (
                        <div className="activity" key={activity.id}
                             onClick={() => handleActivityClick(activity.id)}>
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
        </div>
    );
}

export default FindVolunteer;
