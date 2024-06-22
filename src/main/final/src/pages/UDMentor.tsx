import React, {useEffect, useRef, useState} from 'react';
import Image from "next/image";
import {useRouter} from "next/router";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import axios from "axios";
import '../styles/Be.css';

const CustomEditor = dynamic(() => import('../components/CustomEditor'), { ssr: false });

interface Board {
    title: string;
    content: string;
    id?: string | null;
    board_time?: Date | null;
    seq?: string | null;
}

const UdMentor = () => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { seq } = router.query;
    const [board, setBoard] = useState<Board>({
        title: ''
        ,content: ''
    });
    const [imageNamesBefore, setImageNamesBefore] = useState([]); // 수정 전 이미지들
    const [bearer, setBearer] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [member_id, setMember_id] = useState('')
    const boardSubmitURL = 'http://localhost:9000/mentor/updateBoard';
    const boardGetURL = 'http://localhost:9000/mentor/getUpdateBoard';

    useEffect(() => {
        console.log("UDMentor 시작: " + seq)
        // CustomEditor 컴포넌트 가져오기
        const loadCustomEditor = async () => {
            const CustomEditor = await import('../components/CustomEditor');
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
            axios.post(boardGetURL, null
                , {
                    headers:{Authorization:grantType+access_token}
                    ,params: {
                        seq: seq
                        , member_id:member_id
                    }
                }).then(res => {
                    console.log(res);
                    setBoard(prevData => ({
                        ...prevData,
                        title: res.data.boardDTO.title,
                        content: res.data.boardDTO.content,
                        board_time:res.data.boardDTO.board_time,
                        seq: res.data.boardDTO.seq,
                        id: res.data.boardDTO.id,
                }));

                setName(res.data.boardDTO.title);
                setBio(res.data.boardDTO.content);
                console.log("bio에 넣음:" + res.data.boardDTO.content)
                setImageNamesBefore(res.data.imageList);
            }).catch(err => console.log(err));
        }


        //title 입력
        //content 입력
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

    const onContent = (editor) => {
        //setBio(editor.getData());
        console.log(editor.getData())
        setBoard((prevBoard) => ({
            ...prevBoard,
            content: editor.getData(),
        }));
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //console.log(board)

        const bearer: string | null = localStorage.getItem('grantType');
        const accessToken: string | null = localStorage.getItem('accessToken');

        let headers: { [key: string]: string } = {};
        if (bearer !== null && accessToken !== null) {
            headers = { Authorization: `${bearer}${accessToken}` };
        }

        // const id = localStorage.getItem("username");
        // const title = name;
        // const content = bio;
        // const board = { id, title, content };

        console.log(board)
        axios.post(boardSubmitURL, {board, imageNamesBefore}, { headers: headers })
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
        <div
            className={`main-screen ${isSidebarOpen ? 'sidebar-open' : ''}`}
            onClick={isSidebarOpen ? handleOutsideClick : undefined}
        >
            <div className="sidebar">
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Search')}>Search</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Login')}>Login</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/My')}>My</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Chat')}>ChatBot</div>
            </div>
            <header className="header">
                <Image src="/images/image-23.png" alt="search" width={40} height={40}/>
                <div className="center-image-container">
                    <Image src="/images/first.png" alt="First Image" width={120} height={45}/>
                </div>
                <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50}/>
            </header>

            <main className="activitiesContainer">
                <h1 className="title">멘토 등록</h1>


                <form className="form" onSubmit={onSubmit}>
                    <div className="buttonContainer">
                        <button className="button" type="submit">등록하기</button>
                    </div>
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
                            <CustomEditor onContent={onContent} oldContent={bio}/>
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

    );
};

export default UdMentor;