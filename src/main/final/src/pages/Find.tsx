import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import '../styles/Find.css'; // Assuming you have your own CSS file
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Volunteer {
    seq: number;
    title: string;
    name: string;
    email: string;
    content: string; // Assuming there's a content field for detailed description
    thumnail?: string; // Corrected thumbnail spelling
}

const Find: React.FC = () => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [boardDTOList, setBoardDTOList] = useState<Volunteer[]>([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [bearer, setBearer] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [member_id, setMember_id] = useState('');

    useEffect(() => {
        getBoardList(page);

        const grantType = localStorage.getItem("grantType");
        const access_token = localStorage.getItem("accessToken");
        const member_id = localStorage.getItem("username");
        if (grantType && access_token && member_id) {
            setBearer(grantType);
            setAccessToken(access_token);
            setMember_id(member_id);
        }
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 50 || isLoading) return;
            setPage(prevPage => prevPage + 1);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    useEffect(() => {
        boardDTOList.forEach((item: Volunteer) => {
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

                contentRef.innerHTML = doc.body.innerHTML;
            }
        });
    }, [boardDTOList]);

    const getBoardList = async (pageNumber: number) => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:9000/volunteer/getWriteList', null, {
                params: {
                    page: pageNumber
                }
            });
            const newBoardDTOList: Volunteer[] = res.data.content;
            setBoardDTOList(prevBoardDTOList => [...prevBoardDTOList, ...newBoardDTOList]);
            setHasMore(newBoardDTOList.length > 0);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
        setIsLoading(false);
    };

    const handleActivityClick = (seq: number) => {
        router.push(`/Detail?id=${seq}`);
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

                {boardDTOList.map((activity: Volunteer) => (
                    <div className="activity" key={activity.seq} onClick={() => handleActivityClick(activity.seq)}>
                        {activity.thumnail && <Image src={activity.thumnail} alt={activity.title} width={100} height={100} />}
                        <div className="activity-content">
                            <h3>{activity.title}</h3>
                            <p id={`content-${activity.seq}`}></p>
                        </div>
                    </div>
                ))}
                {isLoading && <div>Loading...</div>}
            </main>
            <footer className="footer">
                <div className="footer-icon" onClick={handleSettingsClick}>=</div>
                <div className="footer-icon" onClick={handleHomeClick}>🏠</div>
                <div className="footer-icon" onClick={handleProfileClick}>👤</div>
            </footer>
        </div>
    );
};

export default Find;
