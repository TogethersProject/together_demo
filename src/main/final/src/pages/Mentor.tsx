import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import '../styles/Mentor.css';
import axios from "axios";

const First: React.FC = () => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [boardDTOList, setBoardDTOList] = useState([]);
    //const { page } = useParams();

    useEffect(() => {
        getBoardList();
    //}, [page]);
    }, []);

    //mentor 글 가져와서 board에 저장
    const getBoardList = async () => {
        try {
            const res = await axios.post('http://localhost:9000/mentor/getMentorList', null, {
                params: {
                    //page: page
                    page: 0
                }
            });
            setBoardDTOList(res.data.content);
            console.log(res.data.content)
        } catch (err) {
            console.log("에러발생" + err);
        }
    }

    //mentor 글 내용의 ombed 태그 처리를 위한 과정(react 기준)
    // useEffect(() => {
    //     boardDTOList.forEach((item) => {
    //         const contentRef = document.getElementById(`content-${item.seq}`);
    //         if (contentRef) {
    //             const parser = new DOMParser();
    //             const doc = parser.parseFromString(item.content, 'text/html');
    //             const oembedTags = doc.querySelectorAll('oembed');
    //             oembedTags.forEach(oembedTag => {
    //                 const url = oembedTag.getAttribute('url');
    //                 if (url.includes('youtube.com')) {
    //                     const urlObj = new URL(url);
    //                     const videoId = urlObj.searchParams.get('v');
    //                     const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    //                     const iframe = document.createElement('iframe');
    //                     iframe.src = embedUrl;
    //                     iframe.title = "video";
    //                     iframe.allowFullscreen = true;
    //                     iframe.width = "560";
    //                     iframe.height = "315";
    //                     oembedTag.replaceWith(iframe);
    //                 }
    //             })
    //             contentRef.innerHTML = doc.body.innerHTML;
    //         }
    //     });
    // }, [boardDTOList]);

    const handleFindVolunteerClick = () => {
        router.push('/FindVolunteer');
    };

    const handleMentorClick = () => {
        router.push('/Mentor');
    };

    const handleHomeClick = () => {
        router.push('/First');
    };

    const handleProfileClick = () => {
        router.push('/Mypage');
    };

    const handleSettingsClick = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleSidebarLinkClick = (path: string) => {
        setSidebarOpen(false);
        router.push(path);
    };

    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
            setSidebarOpen(false);
        }
    };

    function handleBeClick() {
        router.push('/Be');
    }

    function handleFindClick() {
        router.push('/Find');
    }

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
                <Image src="/images/image-23.png" alt="search" width={40} height={40} />
                <div className="center-image-container">
                    <Image src="/images/first.png" alt="First Image" width={120} height={45} />
                </div>
                <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50} />
            </header>
            <div className="content">
                <div className="intro">
                    <h1>내가 필요한, 나를 필요로 하는!</h1>
                    <p>멘토가 되어주세요</p>
                </div>
                <div className="activity-card" id="Be" onClick={handleBeClick}>
                    <h2>BE A MENTOR</h2>
                    <p>우리의 희망에게 멘토가 되어주세요.</p>
                </div>
                <div className="activity-card" id="Mentor" onClick={handleFindClick}>
                    <h2>Find MENTOR</h2>
                    <p>나와 핏한 멘토를 찾아보세요.</p>
                </div>

                {boardDTOList.map((item:any) => (
                    <div key={item.seq} className="activity-card" id={item.seq}>{/*onClick={handleBoardClick}>*/}
                        <p>{item.seq}</p>
                        <p>{item.name}</p>
                        <p>{item.title}</p>
                        <p id={`content-${item.seq}`}></p>
                        {/*<p><Link to={`/board/updateBoard/${item.seq}`}><button type='button'>글수정</button></Link></p>*/}
                        {/*<p><button type='button' onClick={() => onDeleteBoard(item.seq)}>글삭제</button></p>*/}
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

export default First;
