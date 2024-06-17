import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import '../styles/Find.css';

interface Mentor {
    name: string;
    email: string;
    bio: string;
    photo: string | null;
    comments: string[];
}

const Find = () => {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [currentComments, setCurrentComments] = useState<string[]>([]);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('mentors') || '[]');
        setMentors(savedData);
        setCurrentComments(savedData.map(() => '')); // Initialize currentComments state for each mentor
    }, []);

    const handleDeleteMentor = (index: number) => {
        const updatedMentors = mentors.filter((_, i) => i !== index);
        setMentors(updatedMentors);
        setCurrentComments(updatedMentors.map(() => ''));
        localStorage.setItem('mentors', JSON.stringify(updatedMentors));
    };

    const handleAddComment = (index: number) => {
        const updatedMentors = [...mentors];
        if (currentComments[index]) {
            if (!updatedMentors[index].comments) {
                updatedMentors[index].comments = [];
            }
            updatedMentors[index].comments.push(currentComments[index]);
            setMentors(updatedMentors);
            setCurrentComments(updatedMentors.map(() => ''));
            localStorage.setItem('mentors', JSON.stringify(updatedMentors));
        }
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
        <div className={`main-screen ${isSidebarOpen ? 'sidebar-open' : ''}`} onClick={isSidebarOpen ? handleOutsideClick : undefined}>
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} ref={sidebarRef}>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Search')}>Search</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Login')}>Login</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Mypage')}>My</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Chat')}>ChatBot</div>
            </div>
            <div className="header">
                <Image src="/images/image-23.png" alt="search" width={40} height={40} />
                <div className="center-image-container" onClick={handleFirstImageClick} style={{ cursor: 'pointer' }}>
                    <Image className="center-image" src="/images/first.png" alt="투게더!" width={120} height={45} />
                </div>
                <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50} />
            </div>
            <div className="container">
                <h1 className="title">등록된 멘토 정보</h1>
                {mentors.map((mentor, index) => (
                    <div key={index} className="info">
                        <p><strong>이름:</strong> {mentor.name}</p>
                        <p><strong>이메일:</strong> {mentor.email}</p>
                        <p><strong>소개:</strong> {mentor.bio}</p>
                        {mentor.photo ? (
                            <div className="photo-container">
                                <Image src={mentor.photo} alt="Photo" width={100} height={100} />
                            </div>
                        ) : (
                            <p>사진 없음</p>
                        )}
                        <div className="comments">
                            <h3>댓글:</h3>
                            {mentor.comments && mentor.comments.length > 0 ? (
                                mentor.comments.map((comment, commentIndex) => (
                                    <div key={commentIndex} className="commentContainer">
                                        <p>{comment}</p>
                                    </div>
                                ))
                            ) : (
                                <p>댓글이 없습니다</p>
                            )}
                            <input
                                type="text"
                                value={currentComments[index] || ''}
                                onChange={(e) => {
                                    const newComments = [...currentComments];
                                    newComments[index] = e.target.value;
                                    setCurrentComments(newComments);
                                }}
                                placeholder="댓글을 입력하세요"
                            />
                            <button onClick={() => handleAddComment(index)}>댓글 달기</button>
                        </div>
                        <button onClick={() => handleDeleteMentor(index)}>멘토 삭제</button>
                    </div>
                ))}
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
