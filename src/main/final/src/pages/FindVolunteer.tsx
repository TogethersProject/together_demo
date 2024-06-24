import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { useRouter } from 'next/router';
import '../styles/Volunteer.css';
import axios from "axios";

interface Activity {
    id: number;
    title: string;
    description: string;
    image: string;
}
interface Volunteer {
    seq: number;
    name: string;
    id: string;
    email: string;
    title: string;
    content: string;
    board_time: Date;
    board_lastTime: Date;
    volun_address: string;
    volun_institution: string;
    thumnail: string;
}

const FindVolunteer: React.FC = () => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
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
    const getVolunteerListURL = 'http://localhost:9000/volunteer/getWriteList';
    const [boardDTOList, setBoardDTOList] = useState<Volunteer[]>([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [bearer, setBearer] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [member_id, setMember_id] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown status
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
    // Check if the user is logged in on component mount
    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);
    useEffect(() => {
        const grantType = localStorage.getItem("grantType");
        const access_token = localStorage.getItem("accessToken");
        const member_id = localStorage.getItem("username");
        if (grantType && access_token && member_id) {
            setBearer(grantType);
            setAccessToken(access_token);
            setMember_id(member_id);
        }
    }, []);
    // 페이지 번호가 변경될 때마다 데이터 가져오기
    useEffect(() => {
        console.log(`Fetching page: ${currentPage}`);
        getVolunteerList(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                console.log('Load more element is intersecting, incrementing page...');
                setCurrentPage((prevPage) => prevPage + 1);
            }
        });

        if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [hasMore]);

    const getVolunteerList = async (page: number) => {
        try {
            const res = await axios.post(getVolunteerListURL, null, {
                params: { page }
            });
            console.log('Fetched data:', res.data.content);
            setBoardDTOList((prevBoardDTOList) => [...prevBoardDTOList, ...res.data.content]);
            setHasMore(res.data.content.length > 0);
        } catch (err) {
            console.log('Error occurred:', err);
        }
    };

    useEffect(() => {
        boardDTOList.forEach((item: any) => {
            const contentRef = document.getElementById(`content-${item.seq}`);
            if (contentRef) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(item.content, 'text/html');
                const oembedTags = doc.querySelectorAll('oembed');
                oembedTags.forEach(oembedTag => {
                    const url: string | null = oembedTag.getAttribute('url');
                    if (url && url.includes('youtube.com')) {
                        const urlObj = new URL(url);
                        const videoId = urlObj.searchParams.get('v');
                        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                        const iframe = document.createElement('iframe');
                        iframe.src = embedUrl;
                        iframe.title = "video";
                        iframe.allowFullscreen = true;
                        iframe.width = "300";
                        iframe.height = "180";
                        oembedTag.replaceWith(iframe);
                    }
                });

                const images = Array.from(doc.getElementsByTagName('img'));
                images.forEach(image => {
                    if (image.parentNode) {
                        image.parentNode.removeChild(image);
                    }
                });
                const maxLength = 100; // 최대 길이 설정
                const content = doc.body.innerHTML;
                contentRef.innerHTML = content.length > maxLength ? `${content.slice(0, maxLength)}...` : content;            }
        });
    }, [boardDTOList]);

    const handleActivityClick = (activityId: number) => {
        router.push(`/Detail?seq=${activityId}`);
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
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
            setSidebarOpen(false);
        }
    };
    const handleSearchClick = () => {
        router.push('/Search');
    };

    const handleAlertClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
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
            <div className="header">
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
            </div>
            <div className="banner-container">
                <Slider {...settings}>
                    <div className="banner-slide">
                        <Image src="/images/volunteer1.png" alt="배너 이미지 1" layout="responsive" width={360} height={200}
                               className="banner-image"/>
                    </div>
                    <div className="banner-slide">
                        <Image src="/images/volunteer2.png" alt="배너 이미지 2" layout="responsive" width={360} height={200}
                               className="banner-image"/>
                    </div>
                    <div className="banner-slide">
                        <Image src="/images/volunteer3.png" alt="배너 이미지 3" layout="responsive" width={360} height={200}
                               className="banner-image"/>
                    </div>
                </Slider>
            </div>

            <main className="activities-container">
                <button className="register-button" onClick={() => router.push('/register')}>봉사 등록</button>

                {boardDTOList.map((activity: any, index: number) => {
                    return (
                        <div className="activity" key={activity.seq} onClick={() => handleActivityClick(activity.seq)}>
                            {activity.thumnail &&
                                <Image src={activity.thumnail} alt={activity.title} width={100} height={100}/>}
                            <div className="activity-content">
                                <h3>{activity.title}</h3>
                                <p id={`content-${activity.seq}`}></p>
                            </div>
                        </div>
                    );
                })}
                <div ref={loadMoreRef} className="load-more">
                    {hasMore && <p>Loading more...</p>}
                </div>
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
