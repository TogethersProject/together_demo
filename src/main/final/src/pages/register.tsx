import React, {useState, useRef, useEffect, Suspense} from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import '../styles/Be.css';
import dynamic from "next/dynamic";
import axios from "axios";

const CustomEditor = dynamic(() => import('../components/CustomEditor2'), { ssr: false, suspense: true });

const Be = () => {
    const [activityTitle, setActivityTitle] = useState('');
    const [activityDescription, setActivityDescription] = useState('');
    const [activityLocation, setActivityLocation] = useState('');
    const [activityOrganization, setActivityOrganization] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const reader = new FileReader();

        reader.onloadend = () => {
            const photoUrl = reader.result as string;
            const newActivity = {
                title: activityTitle,
                description: activityDescription,
                location: activityLocation,
                organization: activityOrganization,
                photo: photoUrl,
            };

            let savedData = JSON.parse(localStorage.getItem('activities') || '[]');
            if (!Array.isArray(savedData)) {
                savedData = [];
            }
            savedData.push(newActivity);
            localStorage.setItem('activities', JSON.stringify(savedData));

            setShowModal(true);
            setTimeout(() => {
                router.push('/FindVolunteer');
            }, 1000);
        };

        if (photo) {
            reader.readAsDataURL(photo);
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setSidebarOpen(false);
        }
    };

    const onContent = (editor) => {
        setActivityDescription(editor.getData());
    };

    const boardSubmitURL = 'http://localhost:9000/volunteer/writeBoard';
    const onSubmit = (e) => {
        e.preventDefault();
        const content = activityDescription;
        const title = activityTitle;
        const id = localStorage.getItem("username");
        const volun_address = activityLocation;
        const volun_institution = activityOrganization;
        const board = { title, content, id, volun_institution, volun_address };

        const bearer: string | null = localStorage.getItem('grantType');
        const accessToken: string | null = localStorage.getItem('accessToken');

        let headers: { [key: string]: string } = {};
        if (bearer !== null && accessToken !== null) {
            headers = { Authorization: `${bearer}${accessToken}` };
        }

        axios.post(boardSubmitURL, board, { headers })
            .then(res => {
                setShowModal(true);
                setTimeout(() => {
                    handleNavigation('/FindVolunteer');
                }, 1000);
            })
            .catch(err => {
                console.log(err);
                alert('에러!!!');
            });
    };

    return (
        <div className={`main-screen ${isSidebarOpen ? 'sidebar-open' : ''}`} onClick={isSidebarOpen ? handleOutsideClick : undefined}>
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
                <div onClick={() => handleNavigation('/Search')} style={{ cursor: 'pointer' }}>
                    <Image src="/images/image-23.png" alt="search" width={40} height={40} />
                </div>
                <div className="center-image-container" onClick={() => handleNavigation('/First')} style={{ cursor: 'pointer' }}>
                    <Image className="center-image" src="/images/first.png" alt="투게더!" width={120} height={45} />
                </div>
                <div className="alert-container" onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{ cursor: 'pointer', position: 'relative' }}>
                    <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50} />
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
            <main className="activitiesContainer">
                <h1 className="title">봉사 등록</h1>
                <div className="buttonContainer" onClick={() => handleNavigation('/Find')} style={{ cursor: 'pointer' }}>
                    <button className="button" type="submit">등록하기</button>
                </div>
                <form className="form" onSubmit={onSubmit}>
                    <div className="formGroup">
                        <label className="label" htmlFor="title">제목:</label>
                        <input
                            className="input"
                            type="text"
                            id="title"
                            value={activityTitle}
                            onChange={(e) => setActivityTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label className="label" htmlFor="description">글:</label>
                        <Suspense fallback={<div>Loading editor...</div>}>
                            <CustomEditor onContent={onContent} />
                        </Suspense>
                    </div>
                    <div className="formGroup">
                        <label className="label" htmlFor="location">봉사 위치:</label>
                        <input
                            className="input"
                            type="text"
                            id="location"
                            value={activityLocation}
                            onChange={(e) => setActivityLocation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label className="label" htmlFor="organization">봉사 기관:</label>
                        <input
                            className="input"
                            type="text"
                            id="organization"
                            value={activityOrganization}
                            onChange={(e) => setActivityOrganization(e.target.value)}
                            required
                        />
                    </div>
                </form>
            </main>
            <footer className="footer">
                <div className="footer-icon" onClick={() => setSidebarOpen(true)}>=</div>
                <div className="footer-icon" onClick={() => handleNavigation('/First')}>🏠</div>
                <div className="footer-icon" onClick={() => handleNavigation('/Mypage')}>👤</div>
            </footer>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>등록되었습니다!</h2>
                        <button onClick={() => setShowModal(false)}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Be;
