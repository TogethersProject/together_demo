import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import '../../../../../../together_demo_1/src/main/final/src/styles/Mypage.css';

const Market: React.FC = () => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [marketEntries, setMarketEntries] = useState([
        { id: 1, name: 'Store A', phone: '123-456-7890', address: '123 Market St' },
        { id: 2, name: 'Store B', phone: '987-654-3210', address: '456 Market St' },
        // Add more entries as needed
    ]);
    const [expandedEntryId, setExpandedEntryId] = useState<number | null>(null);

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

    return (
        <div
            className={`main-screen ${isSidebarOpen ? 'sidebar-open' : ''}`}
            onClick={isSidebarOpen ? handleOutsideClick : undefined}
        >
            <div className="sidebar">
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Search')}>Search</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Login')}>Login</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Mypage')}>My</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Chat')}>ChatBot</div>
            </div>
            <header className="header">
                <Image src="/images/image-23.png" alt="search" width={40} height={40}/>
                <div className="center-image-container" onClick={handleFirstImageClick} style={{ cursor: 'pointer' }}>
                    <Image className="center-image" src="/images/first.png" alt="투게더!" width={120} height={45}/>
                </div>
                <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50}/>
            </header>
            <div className="content">
                <h1>할인 가맹점 리스트</h1>
                <table className="market-table">
                    <thead>
                    <tr>
                        <th>상점 이름</th>
                        <th>전화번호</th>
                        <th>주소</th>
                    </tr>
                    </thead>
                    <tbody>
                    {marketEntries.map(entry => (
                        <React.Fragment key={entry.id}>
                            <tr className="market-entry" onClick={() => handleExpandEntry(entry.id)}>
                                <td>{entry.name}</td>
                                <td>{entry.phone}</td>
                                <td>{entry.address}</td>
                            </tr>
                            {expandedEntryId === entry.id && (
                                <tr className="expanded-details">
                                    <td colSpan={3}>
                                        <p>전화번호: {entry.phone}</p>
                                        <p>주소: {entry.address}</p>
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


