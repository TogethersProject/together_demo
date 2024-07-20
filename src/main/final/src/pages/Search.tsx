import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import '../styles/First.css';
import axios from "axios";

const First: React.FC = () => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchOption, setSearchOption] = useState('author');
    const [searchList, setSearchList] = useState([]);
    const sidebarRef = useRef<HTMLDivElement>(null);
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

    const searchQueryURL = "http://localhost:9000/search/query"
    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchQuery.trim() !== '') {
            axios.post(searchQueryURL,{searchOption, searchQuery})
                .then(res => {
                    console.log(res.data);
                    //검색 결과를 searchList에 담음
                    setSearchList(res.data);
                }).catch(err => console.log(err));
            // Perform search-related actions, e.g., navigate to search results page
            //router.push(`/SearchResults?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleSearchOptionChange = (e) => {
        console.log(e.target.value);
        setSearchOption(e.target.value);
    }

    const handleGo = (searchDTO) => {
        if(searchDTO.table === "mentor"){
            router.push('/SearchMentor?seq='+searchDTO.seq)
        }else{//searchDTO.table === "volunteer"
            router.push('/Detail?seq='+searchDTO.seq);
        }
    }
    const handleAlertClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
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
                <form className="search-form" onSubmit={handleSearchSubmit}>
                    <div className="search-options">
                        <select value={searchOption} onChange={handleSearchOptionChange}>
                            <option selected value="author">작성자</option>
                            <option value="content">내용</option>
                            <option value="title">제목</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        placeholder="검색..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <button type="submit">Search</button>
                </form>


                {searchList.map((search: any, index: number) => {
                    const MAX_CONTENT_LENGTH = 100; // 최대 내용 길이
                    let displayContent = search.content;
                    if (search.content.length > MAX_CONTENT_LENGTH) {
                        displayContent = search.content.slice(0, MAX_CONTENT_LENGTH) + "...";
                    }
                    return (
                        <div className="searchContainer" key={index} onClick={() => handleGo(search)}>
                            <h4 className="search_title">제목: {search.title}</h4>
                            <div className="search_content">내용: {displayContent}</div>
                        </div>
                    )
                })}
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
