import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import '../styles/Detail.css';
import axios from "axios";

const SearchMentor: React.FC = () => {
    const router = useRouter();
    const { seq } = router.query; // 쿼리에서 id를 추출합니다.
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown status
    // Check if the user is logged in on component mount
    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);
    const boardDeleteURL = 'http://localhost:9000/mentor/deleteBoard';

    const [bearer, setBearer] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [member_id, setMember_id] = useState('');
    const [mentorDTO, setMentorDTO] = useState({
        title: undefined,
        content:'',
        name: undefined,
        email: undefined,
        id: undefined,
        seq: undefined
    });
    // 활동 id에 따라 활동 정보를 가져오는 함수
    useEffect(() => {
        const grantType = localStorage.getItem('grantType');
        const access_token = localStorage.getItem('accessToken');
        const member_id = localStorage.getItem('username');
        if (member_id && grantType && access_token) {
            setBearer(grantType);
            setAccessToken(access_token);
            setMember_id(member_id);
        }

        getBoard()
    }, [seq]);

    const getOneMentorURL = "http://localhost:9000/mentor/getOneMentor"
    const getBoard = () => {
        axios.post(getOneMentorURL, seq)
            .then(res => {
                console.log(res.data)
                setMentorDTO(res.data);
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        //console.log("렌더링")
        rendering();
    }, [mentorDTO])

    const rendering =() => {
        if (!mentorDTO || !mentorDTO.seq) {
            return; // activity가 초기화되지 않은 경우 함수 종료
        }
        const contentRef = document.getElementById(`content-${mentorDTO.seq}`);
        if (contentRef) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(mentorDTO.content, 'text/html');
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
                    iframe.width = "100%";
                    iframe.height = "auto";
                    iframe.style.maxWidth = "300px"; // 최대 너비 설정
                    iframe.style.height = "180px"; // 높이 고정
                    oembedTag.replaceWith(iframe);
                }
            });

            const images = doc.getElementsByTagName('img');
            for (let i = 0; i < images.length; i++) {
                const img = images[i];
                const width = img.width;
                const height = img.height;

                if (width > 300) {
                    const min = 300/width;
                    img.width = Math.round(width * min);
                    img.height = Math.round(height * min);
                }
            }

            contentRef.innerHTML = doc.body.innerHTML;
            console.log("content를 html에서변환")
        }
    }

    const handleDeleteMentor = (index: undefined) => {
        axios.post(boardDeleteURL, null, {
            headers: {
                Authorization: bearer + accessToken,
            },
            params: {
                seq: index,
                member_id: member_id,
            },
        })
    };
    const handleUpdateMentor = (seq: undefined) => {
        router.push(`/UDMentor?seq=${seq}`);
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
    const handleFirstImageClick = () => {
        router.push('/First');
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

            <header className="header">
                <div onClick={handleSearchClick} style={{cursor: 'pointer'}}>
                    <Image src="/images/image-23.png" alt="search" width={40} height={40}/>
                </div>
                <div className="center-image-container" onClick={handleFirstImageClick} style={{cursor: 'pointer'}}>
                    <Image className="center-image" src="/images/first.png" alt="투게더!" width={120} height={45}/>
                </div>
                <div className="alert-container" onClick={handleAlertClick}
                     style={{cursor: 'pointer', position: 'relative'}}>
                    <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50}/>
                    {isDropdownOpen && (
                        <div className="alert-dropdown">
                            <ul>
                                <li>알림 1</li>
                                <li>알림 2</li>
                                <li>알림 3</li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>
            <div className="content">
                <div className="info">
                    <p><strong>제목:</strong>{ mentorDTO.title}</p>
                    <p><strong>이름:</strong> {mentorDTO.name}</p>
                    <p><strong>이메일:</strong> {mentorDTO.email}</p>
                    <p className={"mentor-content"} id={`content-${mentorDTO.seq}`}></p>

                    {(mentorDTO.id === member_id) && <button onClick={() => handleDeleteMentor(mentorDTO.seq)}>글 삭제</button>}
                    {(mentorDTO.id === member_id) && <button onClick={() => handleUpdateMentor(mentorDTO.seq)}>글 수정</button>}
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

export default SearchMentor;
