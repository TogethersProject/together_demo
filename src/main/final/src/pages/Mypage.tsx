import React, {useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import '../styles/Mypage.css';

const Mypage: React.FC = () => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown status
    const dropdownRef = useRef<HTMLDivElement>(null);
    // Check if the user is logged in on component mount
    useEffect(() => {
        //const storedLoginStatus = localStorage.getItem('isLoggedIn');
        const storedLoginStatus = localStorage.getItem('accessToken');
        if (storedLoginStatus) {
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
        }
    }, []);
    useEffect(() => {
        // 주소에서 id, accessToken, naverAccessToken 추출
        if(localStorage.getItem("temp") == null){
            localStorage.setItem("temp","true")
            router.push('/Temp');
        }

        console.log(router.query);
        const name = router.query.name as string | string;
        const accessToken = router.query.accessToken as string | number;
        const naverAccessToken = router.query.naverAccessToken as string | boolean;
        const id = router.query.id as string | object;
        console.log("name: " + name)
        //const {  accessToken, naverAccessToken, id } = router.query;
        console.log(name + "\n" + accessToken+ "\n" + naverAccessToken+ "\n" + id)
        // 추출한 값을 로컬 스토리지에 저장
        if (name && accessToken && naverAccessToken && id) {
            setUsername(name as string);

            localStorage.setItem('grantType', "Bearer ");
            localStorage.setItem('username', id as string);
            localStorage.setItem('accessToken', accessToken as string);
            localStorage.setItem('naverAccessToken', naverAccessToken as string);
            localStorage.setItem('nickname', name as string);
        }

        // 사이트 회원가입 유저의 경우
        //localStorage에서 accessKey(header), member_id(body) -> username = member_name
        const storedUsername = localStorage.getItem('nickname');
        if (storedUsername) {
            console.log("name: " + username)
            setUsername(storedUsername);
        }
    }, [username]);

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
        router.push('Market');
    }
    function handleFirstImageClick() {
        router.push('/First');
    }
    const handleSearchClick = () => {
        router.push('/Search');
    };

    const handleAlertClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

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
                <div className="activity-card" id="Calendar" onClick={handleMarketClick}>
                    <h2>우리 지역을 즐겨요</h2>
                    <p>저렴하게 즐겨보세요.</p>
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
