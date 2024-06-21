import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import '../styles/First.css';

const First: React.FC = () => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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
        <div
            className={`main-screen ${isSidebarOpen ? 'sidebar-open' : ''}`}
            onClick={isSidebarOpen ? handleOutsideClick : undefined}
        >
            <div className="sidebar">
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Search')}>
                    Search
                </div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Login')}>
                    Login
                </div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/My')}>
                    My
                </div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Chat')}>
                    ChatBot
                </div>
            </div>
            <header className="header">
                <Image src="/images/image-23.png" alt="search" width={40} height={40}/>
                <div className="center-image-container" onClick={handleFirstImageClick} style={{cursor: 'pointer'}}>
                    <Image className="center-image" src="/images/first.png" alt="투게더!" width={120} height={45}/>
                </div>
                <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50}/>
            </header>

            <form className="search-form" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="검색..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <button type="submit">Search</button>
            </form>

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
