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

interface Board {
    title: string;
    content: string;
    id?: string | null;
    board_time?: Date | null;
    seq?: string | null;
}
const Be = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [bearer, setBearer] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [member_id, setMember_id] = useState('')
    const [board, setBoard] = useState<Board>({
        title: ''
        ,content: ''
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Stat
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    useEffect(() => {
        // CustomEditor 컴포넌트 가져오기
        const loadCustomEditor = async () => {
            const CustomEditor = await import('../components/CustomEditor');
            // 필요한 작업 수행
        };
        loadCustomEditor();

        const grantType = localStorage.getItem("grantType");
        const access_token = localStorage.getItem("accessToken");
        const member_id= localStorage.getItem("username");
        if (grantType  && access_token && member_id) {
            setBearer(grantType);
            setAccessToken(access_token);
            setMember_id(member_id)

        }
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
        router.push('/Mypage');
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

    const handleButtonClick = () => {
        router.push('/Find');
    }
    const onContent = (editor) => {
        //const data = editor.getData();
        //setBio(editor.getData());
        setBoard((prevBoard) => ({
            ...prevBoard,
            content: editor.getData(),
            title: name,
            id: member_id
        }));
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

        // const id = localStorage.getItem("username");
        // const title = name
        // const content = bio
        // const board = {id, title, content}
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
    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);
    const handleSearchClick = () => {
        router.push('/Search');
    };

    const handleAlertClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (
        <div className="container">
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
                <main className="activitiesContainer">
                    <h1 className="title">멘토 등록</h1>
                    <div className="buttonContainer" onClick={handleButtonClick}
                         style={{cursor: 'pointer'}}>
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
                                <CustomEditor onContent={onContent} oldContent={bio}
                                    //initialData='<h1>Hello from CKEditor in Next.js!</h1>'
                                />
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
