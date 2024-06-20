import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/Be.css';
import Image from 'next/image';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import axios from "axios";
const CustomEditor = dynamic( () => {
    return import( '../components/CustomEditor' );
}, { ssr: false,suspense: true } );

const Be = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [board, setBoard] = useState({title:''});

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
        const reader = new FileReader();

        reader.onloadend = () => {
            const photoUrl = reader.result as string;
            const newMentor = { name, email, bio, photo: photoUrl };

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

        if (photo) {
            reader.readAsDataURL(photo);
        } else {
            const newMentor = { name, email, bio, photo: null };

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
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    const handleGoBack = () => {
        router.push('/Mentor');
    };

    const handleFirstImageClick = () => {
        router.push('/First');
    };

    const handleHomeClick = () => {
        router.push('/First');
    };

    const handleProfileClick = () => {
        router.push('/Profile');
    };

    const handleSettingsClick = () => {
        setSidebarOpen(true); // = 버튼 클릭 시 사이드바 열기
    };

    const handleSidebarLinkClick = (path: string) => {
        setSidebarOpen(false); // 사이드바 링크 클릭 시 닫기
        router.push(path);
    };

    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setSidebarOpen(false);
        }
    };
    const onContent = (editor) => {
        //const data = editor.getData();
        setBio(editor.getData());
        //console.log('content: ', board);
    };
    const boardSubmitURL = 'http://localhost:9000/mentor/writeBoard'
    const onSubmit = (e) => {
        e.preventDefault();
        //console.log("보드제출~!")

        const bearer: string | null = localStorage.getItem('grantType');
        const accessToken: string | null = localStorage.getItem('accessToken');
        //console.log(bearer)
        //console.log(accessToken)
        let headers: { [key: string]: string } = {};
        if (bearer !== null && accessToken !== null) {
            headers = { Authorization: `${bearer}${accessToken}` };
        }
        //console.log(headers)

        const id = localStorage.getItem("username");
        const title = name
        const content = bio
        const board = {id, title, content}
        axios.post(boardSubmitURL, board    ,{headers:headers}
        ).then(res => {
            console.log(res);
            alert('등록 완료!');
            // Show modal and redirect to First.tsx
            setShowModal(true);
            setTimeout(() => {
                router.push('/Find');
            }, 1000); // Adjust the duration as needed
        }).catch(err => {
            console.log(err);
            alert('에러!!!')
        });
        console.log('Submit: ', board);
    };
    const reissueAccessURL = "http://localhost:9000/common/reissueRefreshToken"
    const onButton = (e) => {
        e.preventDefault();
        console.log("버튼눌럿다");
        const refreshToken = localStorage.getItem('refreshToken')
        axios.post(reissueAccessURL,null,{headers:{RefreshToken:refreshToken}}
        ).then(res => (
            console.log("accessToken: " + res.data)
        )).catch(err => console.log(err))
    }
    return (
        <div className="container">
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
                    <div className="center-image-container" onClick={handleFirstImageClick}
                         style={{cursor: 'pointer'}}>
                        <Image className="center-image" src="/images/first.png" alt="투게더!" width={120} height={45}/>
                    </div>
                    <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50}/>
                </div>
                <main className="activitiesContainer">
                    <h1 className="title">멘토 등록</h1>
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
                                <CustomEditor onContent={onContent} content={bio}
                                    //initialData='<h1>Hello from CKEditor in Next.js!</h1>'
                                />
                            </Suspense>
                        </div>
                        <div className="buttonContainer">
                            <button className="button" type="submit">등록하기</button>
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
