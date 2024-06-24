import React, {useState, useRef, Suspense, useEffect} from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import '../styles/Be.css';
import dynamic from "next/dynamic";
import axios from "axios";

const CustomEditor = dynamic( () => {
    return import( '../components/CustomEditor2' );
}, { ssr: false,suspense: true } );


const Be = () => {
    const [activityTitle, setActivityTitle] = useState('');
    const [activityDescription, setActivityDescription] = useState('');
    const [activityLocation, setActivityLocation] = useState('');
    const [activityTime, setActivityTime] = useState('');
    const [activityOrganization, setActivityOrganization] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [showModal, setShowModal] = useState(false); // State for showing modal
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        // CustomEditor 컴포넌트 가져오기
        const loadCustomEditor = async () => {
            const CustomEditor = await import('../components/CustomEditor2');
            // 필요한 작업 수행
        };
        loadCustomEditor();
    }, []);

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

    const handleButtonClick = () => {
        onSubmit()
        //router.push('/Find');
    }

    const handleSidebarLinkClick = (path: string) => {
        setSidebarOpen(false);
        router.push(path);
    };

    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setSidebarOpen(false);
        }
    };

    const onContent = (editor) => {
        //const data = editor.getData();
        setActivityDescription(editor.getData());
    };
    const boardSubmitURL = 'http://localhost:9000/volunteer/writeBoard'
    const onSubmit = () => {
        //e.preventDefault();
        const content = activityDescription;
        const title = activityTitle;
        const id = localStorage.getItem("username")
        const volun_address = activityLocation;
        const volun_institution = activityOrganization;
        const volun_date = activityTime;
        const board = {title, content, id, volun_institution, volun_address, volun_date}

        const bearer: string | null = localStorage.getItem('grantType');
        const accessToken: string | null = localStorage.getItem('accessToken');
        //console.log(bearer)
        //console.log(accessToken)
        let headers: { [key: string]: string } = {};
        if (bearer !== null && accessToken !== null) {
            headers = { Authorization: `${bearer}${accessToken}` };
        }
        //console.log(headers)

        console.log("제출시작할게")
        axios.post(boardSubmitURL, board    ,{headers:headers}
        ).then(res => {
            console.log(res);
            //alert('등록 완료!');
            // Show modal and redirect to First.tsx
            setShowModal(true);
            setTimeout(() => {
                router.push('/FindVolunteer');
            }, 1000); // Adjust the duration as needed
        }).catch(err => {
            console.log(err);
            alert('에러!!!')
        });
        console.log('Submit: ', board);
    };
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
                    <div className="center-image-container" onClick={handleFirstImageClick} style={{cursor: 'pointer'}}>
                        <Image className="center-image" src="/images/first.png" alt="투게더!" width={120} height={45}/>
                    </div>
                    <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50}/>
                </div>
                <main className="activitiesContainer">
                    <h1 className="title"> 봉사 등록</h1>
                    <div className="buttonContainer" onClick={handleButtonClick}
                         style={{cursor: 'pointer'}}>
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
                                <CustomEditor onContent={onContent}
                                    //initialData='<h1>Hello from CKEditor in Next.js!</h1>'
                                />
                            </Suspense>
                        </div>
                        <div className="formGroup">
                            <label className="label" htmlFor="location">봉사 시간:</label>
                            <input
                                className="input"
                                type="text"
                                id="time"
                                value={activityTime}
                                onChange={(e) => setActivityTime(e.target.value)}
                                required
                            />
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
                    <div className="footer-icon" onClick={handleSettingsClick}>=</div>
                    <div className="footer-icon" onClick={handleHomeClick}>🏠</div>
                    <div className="footer-icon" onClick={handleProfileClick}>👤</div>
                </footer>
            </div>

            {/* Modal for Registration Success */}
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
