import React, {Suspense, useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useRouter} from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";
import '../styles/Be.css';

const CustomEditor = dynamic( () => {
    return import( '../components/CustomEditor2' );
}, { ssr: false,suspense: true } );

interface Board {
    title: string;
    content: string;
    id?: string | null;
    board_time?: Date | null;
    seq?: string | null;
}

const UDVolun = () => {
    const [activityTitle, setActivityTitle] = useState('');
    const [activityDescription, setActivityDescription] = useState('');
    const [activityLocation, setActivityLocation] = useState('');
    const [activityOrganization, setActivityOrganization] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { seq } = router.query;
    const [activityTime, setActivityTime] = useState('');
    const [imageNamesBefore, setImageNamesBefore] = useState([]); // 수정 전 이미지들
    const [bearer, setBearer] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [member_id, setMember_id] = useState('')
    const [activity, setActivity] = useState<any>(null); // 활동 상세 정보를 담을 상태 변수
    const boardSubmitURL = 'http://localhost:9000/volunteer/updateBoard';
    const boardGetURL = 'http://localhost:9000/volunteer/getUpdateBoard';
    const [boardCreateTime, setBoardCreateTime] = useState(Date);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isDropdownOpen]);
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };
    useEffect(() => {
        console.log("UDMentor 시작: " + seq)
        // CustomEditor 컴포넌트 가져오기
        const loadCustomEditor = async () => {
            const CustomEditor = await import('../components/CustomEditor2');
            // 필요한 작업 수행
        };
        loadCustomEditor();

        console.log("로컬 ㅅ저장소에서 내놔")
        const grantType = localStorage.getItem("grantType");
        const access_token = localStorage.getItem("accessToken");
        const member_id= localStorage.getItem("username");
        if (grantType  && access_token && member_id) {
            setBearer(grantType);
            setAccessToken(access_token);
            setMember_id(member_id)

            //seq를 이용해 mentor 글 가져오기
            axios.post(boardGetURL, seq)
                .then(res => {
                    console.log(res);
                    setActivity(prevData => ({
                    ...prevData,
                        title: res.data.boardDTO.title,
                        content: res.data.boardDTO.content,
                        board_time:res.data.boardDTO.board_time,
                        seq: res.data.boardDTO.seq,
                        id: res.data.boardDTO.id,
                        email: res.data.boardDTO.email,
                        address: res.data.boardDTO.volun_address,
                        institution: res.data.boardDTO.volun_institution,
                        volun_date:res.data.boardDTO.volun_date
                }));

                setActivityTitle(res.data.boardDTO.title);
                setActivityDescription(res.data.boardDTO.content);
                setActivityLocation(res.data.boardDTO.volun_address);
                setActivityOrganization(res.data.boardDTO.volun_institution);
                setActivityTime(res.data.boardDTO.volun_date);
                setBoardCreateTime(res.data.boardDTO.board_time)
                setImageNamesBefore(res.data.imageList);
                console.log("시간: " +res.data.boardDTO.board_time)
                }).catch(err => console.log(err));
        }

    }, []);

    const onContent = (editor) => {
        //console.log(editor.getData())
        setActivityDescription(editor.getData());
    };

    const onSubmit = () => {
        //e.preventDefault();
        const content = activityDescription;
        const title = activityTitle;
        const id = localStorage.getItem("username")
        const volun_address = activityLocation;
        const volun_institution = activityOrganization;
        const volun_date = activityTime;
        const board_time = boardCreateTime//activity.board_time;
        console.log("시간"+board_time)
        const board_lastTime = activity.board_lastTime;
        const board = {seq, title, content, id, volun_institution, volun_address, volun_date, board_time, board_lastTime}

        console.log(board)

        const bearer: string | null = localStorage.getItem('grantType');
        const accessToken: string | null = localStorage.getItem('accessToken');

        let headers: { [key: string]: string } = {};
        if (bearer !== null && accessToken !== null) {
            headers = { Authorization: `${bearer}${accessToken}` };
        }

        console.log(board)
        axios.post(boardSubmitURL, {board, imageNamesBefore}, { headers: headers })
            .then(res => {
                console.log(res);
                //alert('등록 완료!');
                setShowModal(true);
                setTimeout(() => {
                    router.push('/FindVolunteer');
                }, 1000);
            })
            .catch(err => {
                console.log(err);
                alert('에러!!!');
            });
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

    const handleButtonClick = () => {
        //router.push('/Find');
        onSubmit()
    }

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
    const handleAlertClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
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
                    <div className="alert-container" onClick={handleAlertClick}
                         style={{cursor: 'pointer', position: 'relative'}} ref={dropdownRef}>
                        <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50}/>
                        {isDropdownOpen && (
                            <div className="alert-dropdown" style={{
                                position: 'absolute',
                                top: '60px',
                                right: '0',
                                backgroundColor: 'white',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                borderRadius: '4px'
                            }}>
                                <ul style={{listStyle: 'none', padding: '10px', margin: '0'}}>
                                    <li style={{padding: '8px 0', borderBottom: '1px solid #ddd'}}>알림 1</li>
                                    <li style={{padding: '8px 0', borderBottom: '1px solid #ddd'}}>알림 2</li>
                                    <li style={{padding: '8px 0'}}>알림 3</li>
                                </ul>
                            </div>
                        )}
                    </div>
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
                            <CustomEditor onContent={onContent} oldContent={activityDescription}
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
                        <h2>수정되었습니다!</h2>
                        <button onClick={() => setShowModal(false)}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UDVolun;