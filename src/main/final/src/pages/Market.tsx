import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
//import '../../../../../../together_demo_1/src/main/final/src/styles/Mypage.css';
import '../styles/Mypage.css';

const Market: React.FC = () => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [marketEntries, setMarketEntries] = useState([
        { id: 1, region: 'Store A', shopname: '123-456-7890', business: '123 Market St', phone: '01000000000', address: '111', discount: '10%', dismember: '10'},
        { id: 2,region: 'Store A', shopname: '123-456-7890', business: '123 Market St', phone: '01000000000', address: '111', discount: '10%', dismember: '10' },
        // Add more entries as needed
    ]);
    const [expandedEntryId, setExpandedEntryId] = useState<number | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown status
    // Check if the user is logged in on component mount
    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
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

    const handleMyClick = () => {
        router.push('/My');
    };

    const handleCalendarClick = () => {
        router.push('/Calendar');
    };

    const handleClubClick = () => {
        router.push('/Club');
    };

    const handleFirstImageClick = () => {
        router.push('/First');
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

    const handleMarketClick = () => {
        router.push('/Market');
    };

    const handleExpandEntry = (entryId: number) => {
        setExpandedEntryId(entryId === expandedEntryId ? null : entryId);
    };
    const handleSearchClick = () => {
        router.push('/Search');
    };

    const handleAlertClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
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
                <h1>할인 가맹점 리스트</h1>
                <table className="market-table">
                    <thead>
                    <tr>
                        <th>동 주소</th>
                        <th>상점이름</th>
                        <th>업종</th>
                    </tr>
                    </thead>
                    <tbody>
                    {marketEntries.map(entry => (
                        <React.Fragment key={entry.id}>
                            <tr className="market-entry" onClick={() => handleExpandEntry(entry.id)}>
                                <td>{entry.region}</td>
                                <td>{entry.shopname}</td>
                                <td>{entry.business}</td>
                            </tr>
                            {expandedEntryId === entry.id && (
                                <tr className="expanded-details">
                                    <td colSpan={3}>
                                        <p>전화번호: {entry.phone}</p>
                                        <p>주소: {entry.address}</p>
                                        <p>할인율: {entry.discount}</p>
                                        <p>할인대상: {entry.dismember}</p>
                                        {/* Add more details as needed */}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
            <footer className="footer">
                <div className="footer-icon" onClick={handleSettingsClick}>=</div>
                <div className="footer-icon" onClick={handleHomeClick}>🏠</div>
                <div className="footer-icon" onClick={handleProfileClick}>👤</div>
            </footer>
        </div>
    );
};

export default Market;


