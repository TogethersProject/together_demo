import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import '../styles/Find.css';
import axios from 'axios';

interface Mentor {
    name: string;
    email: string;
    bio: string;
    photo: string | null;
    comments: string[];
    seq: number;
}

const Find = () => {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [currentComment, setCurrentComment] = useState<string>('');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const getMentorListURL = 'http://localhost:9000/mentor/getMentorList';
    const [boardDTOList, setBoardDTOList] = useState<any[]>([]);
    const boardDeleteURL = 'http://localhost:9000/mentor/deleteBoard';
    const [bearer, setBearer] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [member_id, setMember_id] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);
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
        const grantType = localStorage.getItem('grantType');
        const access_token = localStorage.getItem('accessToken');
        const member_id = localStorage.getItem('username');
        if (grantType && access_token && member_id) {
            setBearer(grantType);
            setAccessToken(access_token);
            setMember_id(member_id);
        }
    }, []);

    useEffect(() => {
        getBoardList(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setCurrentPage((prevPage) => prevPage + 1);
            }
        });

        if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [hasMore]);

    const getBoardList = async (page: number) => {
        try {
            const res = await axios.post(getMentorListURL, null, {
                params: { page }
            });
            setBoardDTOList((prevBoardDTOList) => [...prevBoardDTOList, ...res.data.content]);
            setHasMore(res.data.content.length > 0);
        } catch (err) {
            console.log('에러발생' + err);
        }
    };

    const handleDeleteMentor = (index: number) => {
        axios.post(boardDeleteURL, null, {
            headers: {
                Authorization: bearer + accessToken,
            },
            params: {
                seq: index,
                member_id: member_id,
            },
        })
    //         .then((res) => {
    //             console.log(res);
    //             if (res.data === '글을 삭제하였습니다.') {
    //                 alert('삭제 완료!');
    //                 setBoardDTOList((prevBoardDTOList) => prevBoardDTOList.filter((item) => item.seq !== index));
    //             } else {
    //                 alert('삭제 실패' + res.data);
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             alert('에러!!!');
    //         });
    };

    const handleAddComment = (seq: number) => {
        const updatedMentors = [...mentors];
        const mentorIndex = updatedMentors.findIndex((mentor) => mentor.seq === seq);
        if (mentorIndex !== -1) {
            updatedMentors[mentorIndex].comments = [...(updatedMentors[mentorIndex].comments || []), currentComment];
            setMentors(updatedMentors);
            setCurrentComment('');
            localStorage.setItem('mentors', JSON.stringify(updatedMentors));
        }
    };

    const handleUpdateMentor = (seq: number) => {
        router.push(`/UDMentor?seq=${seq}`);
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
        setSidebarOpen(true);
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
            <div className="container">
                <h1 className="title">등록된 멘토 정보</h1>
                {boardDTOList.map((item: any, index) => {
                    return (
                        <div key={index} className="info">
                            <p><strong>제목:</strong>{item.title}</p>
                            <p><strong>이름:</strong> {item.name}</p>
                            <p><strong>이메일:</strong> {item.email}</p>
                            <p className={"mentor-content"} id={`content-${item.seq}`}></p>
                            <div className="comments">
                                <h3>댓글:</h3>
                                <input
                                    type="text"
                                    value={currentComment}
                                    onChange={(e) => setCurrentComment(e.target.value)}
                                    placeholder="댓글을 입력하세요"
                                />
                                <button onClick={() => handleAddComment(item.seq)}>댓글 달기</button>
                            </div>
                            {(item.id === member_id) &&
                                <button onClick={() => handleDeleteMentor(item.seq)}>글 삭제</button>}
                            {(item.id === member_id) &&
                                <button onClick={() => handleUpdateMentor(item.seq)}>글 수정</button>}
                        </div>
                    );
                })}
                <div ref={loadMoreRef} className="load-more">
                    {hasMore && <p>Loading more...</p>}
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

export default Find;
