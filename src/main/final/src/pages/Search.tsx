import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import '../styles/First.css';

const First: React.FC = () => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
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

    const handleLoginClick = () => {
        router.push('/Login');
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
    const handleFirstImageClick = () => {
        router.push('/First');
    };
    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchQuery.trim() !== '') {
            // Perform search-related actions, e.g., navigate to search results page
            router.push(`/SearchResults?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className={`main-screen ${isSidebarOpen ? 'sidebar-open' : ''}`}
             onClick={isSidebarOpen ? handleOutsideClick : undefined}>
            <div className="sidebar" ref={sidebarRef}>
                <div className="sidebar-link" onClick={() => handleNavigation('/Search')}>🔍 Search</div>
                {!isLoggedIn ? (
                    <div className="sidebar-link" onClick={() => handleNavigation('/Login')}>🔒 Login</div>
                ) : (
                    <div className="sidebar-link" onClick={() => handleNavigation('/Mypage')}>👤 My Page</div>
                )}
                <div className="sidebar-link" onClick={() => handleNavigation('/Chat')}>🤖 ChatBot</div>
            </div>

            <header className="header">
                <div onClick={() => handleNavigation('/Search')} style={{cursor: 'pointer'}}>
                    <Image src="/images/image-23.png" alt="search" width={40} height={40}/>
                </div>
                <div className="center-image-container" onClick={() => handleNavigation('/First')}
                     style={{cursor: 'pointer'}}>
                    <Image className="center-image" src="/images/first.png" alt="투게더!" width={120} height={45}/>
                </div>
                <div className="alert-container" onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
                <form className="search-form" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="검색..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            <footer className="footer">
                <div className="footer-icon" onClick={handleSettingsClick}>
                    =
                </div>
                <div className="footer-icon" onClick={handleHomeClick}>
                    🏠
                </div>
                <div className="footer-icon" onClick={handleProfileClick}>
                    👤
                </div>
            </footer>
        </div>
    );
};

export default First;
