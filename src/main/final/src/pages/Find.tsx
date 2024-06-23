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
        console.log(`Fetching page: ${currentPage}`);
        getBoardList(currentPage);
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

    const getBoardList = async (page: number) => {
        try {
            const res = await axios.post(getMentorListURL, null, {
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
            }
        });
    }, [boardDTOList]);

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

    return (
        <div className={`main-screen ${isSidebarOpen ? 'sidebar-open' : ''}`}
             onClick={isSidebarOpen ? handleOutsideClick : undefined}>
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} ref={sidebarRef}>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Search')}>Search</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Login')}>Login</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/My')}>My</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Chat')}>ChatBot</div>
            </div>
            <div className="header">
                <Image src="/images/image-23.png" alt="search" width={40} height={40}/>
                <div className="center-image-container" onClick={handleFirstImageClick} style={{cursor: 'pointer'}}>
                    <Image className="center-image" src="/images/first.png" alt="투게더!" width={120} height={45}/>
                </div>
                <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50}/>
            </div>
            <div className="container">
                <h1 className="title">등록된 멘토 정보</h1>
                {boardDTOList.map((item: any, index) => {
                    return (
                        <div key={index} className="info">
                            <p><strong>제목:</strong>{item.title}</p>
                            <p><strong>이름:</strong> {item.name}</p>
                            <p><strong>이메일:</strong> {item.email}</p>
                            <p className={"mentor-content"} id={`content-${item.seq}`}></p>

                            {(item.id === member_id) && <button onClick={() => handleDeleteMentor(item.seq)}>글 삭제</button>}
                            {(item.id === member_id) && <button onClick={() => handleUpdateMentor(item.seq)}>글 수정</button>}
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
