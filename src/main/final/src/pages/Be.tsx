import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/Be.css';
import Image from 'next/image';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import axios from "axios";
const CustomEditor = dynamic(() => import('../components/CustomEditor'), { ssr: false });

const Be = () => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        // CustomEditor 컴포넌트 가져오기
        const loadCustomEditor = async () => {
            const CustomEditor = await import('../components/CustomEditor');
            // 필요한 작업 수행
        };
        loadCustomEditor();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newMentor = { name, bio };

        let savedData = JSON.parse(localStorage.getItem('mentors') || '[]');
        if (!Array.isArray(savedData)) {
            savedData = [];
        }
        savedData.push(newMentor);
        localStorage.setItem('mentors', JSON.stringify(savedData));

        setShowModal(true);
        setTimeout(() => {
            router.push('/Find');
        }, 1000);
    };

    const handleProfileClick = () => {
        router.push('/Profile');
    };

    const handleSettingsClick = () => {
        setSidebarOpen(true); // 사이드바 열기
    };

    const handleSidebarLinkClick = (path: string) => {
        setSidebarOpen(false); // 사이드바 닫기
        router.push(path);
    };

    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setSidebarOpen(false);
        }
    };

    const onContent = (editor) => {
        setBio(editor.getData());
    };

    const boardSubmitURL = 'http://localhost:9000/mentor/writeBoard';

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const bearer: string | null = localStorage.getItem('grantType');
        const accessToken: string | null = localStorage.getItem('accessToken');

        let headers: { [key: string]: string } = {};
        if (bearer !== null && accessToken !== null) {
            headers = { Authorization: `${bearer}${accessToken}` };
        }

        const id = localStorage.getItem("username");
        const title = name;
        const content = bio;
        const board = { id, title, content };

        axios.post(boardSubmitURL, board, { headers: headers })
            .then(res => {
                console.log(res);
                alert('등록 완료!');
                setShowModal(true);
                setTimeout(() => {
                    router.push('/Find');
                }, 1000);
            })
            .catch(err => {
                console.log(err);
                alert('에러!!!');
            });
    };

    const handleHomeClick = () => {
        router.push('/First');
    };

    function handleFirstImageClick() {
        router.push('/First');
    }

    return (
        <div className="container">
            <div className={`main-screen ${isSidebarOpen ? 'sidebar-open' : ''}`} onClick={isSidebarOpen ? handleOutsideClick : undefined}>
                <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} ref={sidebarRef}>
                    <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Search')}>Search</div>
                    <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Login')}>Login</div>
                    <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/My')}>My</div>
                    <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Chat')}>ChatBot</div>
                </div>
                <div className="header">
                    <Image src="/images/image-23.png" alt="search" width={40} height={40}/>
                    <div className="center-image-container" onClick={handleFirstImageClick} style={{ cursor: 'pointer' }}>
                        <Image className="center-image" src="/images/first.png" alt="투게더!" width={120} height={45}/>
                    </div>
                    <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50}/>
                </div>
                <main className="activitiesContainer">
                    <h1 className="title">멘토 등록</h1>

                    <div className="buttonContainer">
                        <button className="button" type="submit">등록하기</button>
                    </div>

                    <form className="form" onSubmit={onSubmit}>
                        <div className="formGroup">
                            <label className="label" htmlFor="name">제목:</label>
                            <input
                                className="input"
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="formGroup">
                            <Suspense fallback={<div>Loading editor...</div>}>
                                <CustomEditor onContent={onContent}/>
                            </Suspense>
                        </div>
                    </form>
                </main>
                <footer className="footer">
                    <div className="footer-icon" onClick={handleSettingsClick}>=</div>
                    <div className="footer-icon" onClick={handleHomeClick}>🏠</div>
                    <div className="footer-icon" onClick={handleProfileClick}>👤</div>
                </footer>
            </div>
        </div>
    );
};

export default Be;
