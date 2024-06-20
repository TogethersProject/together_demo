import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import '../styles/Find.css';
import axios from "axios";
import {setMatchers} from "expect/build/jestMatchersObject";

interface Mentor {
    name: string;
    email: string;
    bio: string;
    photo: string | null;
    comments: string[];
}

const Find = () => {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [currentComment, setCurrentComment] = useState<string>('');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const getMentorListURL = 'http://localhost:9000/mentor/getMentorList';
    const [boardDTOList, setBoardDTOList] = useState([]);
    const boardDeleteURL = 'http://localhost:9000/mentor/deleteBoard';
    const [bearer, setBearer] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [member_id, setMember_id] = useState('')

    useEffect(() => {
        //const savedData = JSON.parse(localStorage.getItem('mentors') || '[]');
        //setMentors(savedData);
        getBoardList();

        const grantType = localStorage.getItem("grantType");
        const access_token = localStorage.getItem("accessToken");
        const member_id= localStorage.getItem("username");
        if (grantType  && access_token && member_id) {
            setBearer(grantType);
            setAccessToken(access_token);
            setMember_id(member_id)
        }
    }, []);

    useEffect(() => {
        boardDTOList.forEach((item:any) => {
            const contentRef = document.getElementById(`content-${item.seq}`);
            if (contentRef) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(item.content, 'text/html');
                const oembedTags = doc.querySelectorAll('oembed');
                oembedTags.forEach(oembedTag => {
                    const url:string | null = oembedTag.getAttribute('url');
                    if (url && url.includes('youtube.com')) {
                        const urlObj = new URL(url);
                        const videoId = urlObj.searchParams.get('v');
                        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                        const iframe = document.createElement('iframe');
                        iframe.src = embedUrl;
                        iframe.title = "video";
                        iframe.allowFullscreen = true;
                        iframe.width = "320";
                        iframe.height = "180";
                        oembedTag.replaceWith(iframe);
                    }
                })

                // 이미지 크기 조절 로직 추가
                const images = doc.getElementsByTagName('img');
                for (let i = 0; i < images.length; i++) {
                    const img = images[i];
                    const width = img.width;
                    const height = img.height;

                    if (width > 320) {
                        const min = 320/width;
                        //console.log("min: " + min)
                        //const ratio = Math.min(200 / width, 230 / height);
                        img.width = Math.round(width * min);
                        img.height = Math.round(height * min);
                        //console.log("w,h: " + img.width +", " + img.height )
                    }
                }

                contentRef.innerHTML = doc.body.innerHTML;
            }
        });
    }, [boardDTOList]);

    const getBoardList = async () => {
        try {
            const res = await axios.post(getMentorListURL, null, {
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
    const handleDeleteMentor = (index: number) => {
        axios.post(boardDeleteURL, null, {
            headers:{
                Authorization:bearer+accessToken
            },params: {
                seq: index // 삭제할 글 번호
                ,member_id: member_id
            }
        })
            .then(res => {
                console.log(res);
                if(res.data === "글을 삭제하였습니다.") {
                    alert('삭제 완료!');
                    getBoardList(); // 리스트를 다시 불러와서 삭제된 상태를 반영
                }else{
                    alert('삭제 실패'+res.data)
                }
            })
            .catch(err => {
                console.log(err);
                alert('에러!!!');
            });
        // const updatedMentors = mentors.filter((_, i) => i !== index);
        // setMentors(updatedMentors);
        // localStorage.setItem('mentors', JSON.stringify(updatedMentors));

    };

    const handleAddComment = (index: number) => {
        const updatedMentors = [...mentors];
        updatedMentors[index].comments = [...(updatedMentors[index].comments || []), currentComment];
        setMentors(updatedMentors);
        setCurrentComment('');
        localStorage.setItem('mentors', JSON.stringify(updatedMentors));
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

    const handleUpdateMentor = (seq) => {
        console.log("U가자")
        router.push(`/UDMentor?seq=${seq}`);
        console.log("갓다")
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

    return (
        <div className={`main-screen ${isSidebarOpen ? 'sidebar-open' : ''}`} onClick={isSidebarOpen ? handleOutsideClick : undefined}>
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} ref={sidebarRef}>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Search')}>Search</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Login')}>Login</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/My')}>My</div>
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
                {boardDTOList.map((item:any, index) => (
                    <div key={index} className="info">
                        <p><strong>제목:</strong>{item.title}</p>
                        <p><strong>이름:</strong> {item.name}</p>
                        <p><strong>이메일:</strong> {item.email}</p>
                        <p className={"mentor-content"} id={`content-${item.seq}`}></p>
                        <div className="comments">
                            <h3>댓글:</h3>
                            {/*{mentor.comments.map((comment, commentIndex) => (*/}
                            {/*    <div key={commentIndex} className="commentContainer">*/}
                            {/*        <p>{comment}</p>*/}
                            {/*    </div>*/}
                            {/*))}*/}
                            <input
                                type="text"
                                value={currentComment}
                                onChange={(e) => setCurrentComment(e.target.value)}
                                placeholder="댓글을 입력하세요"
                            />
                            <button onClick={() => handleAddComment(item.seq)}>댓글 달기</button>
                        </div>
                        { (item.id === member_id) && <button onClick={() => handleDeleteMentor(item.seq)}>글 삭제</button>}
                        { (item.id === member_id) && <button onClick={() => handleUpdateMentor(item.seq)}>글 수정</button>}
                    </div>
                ))}
                {/*<p>멘토</p>*/}
                {/*        {mentors.map((mentor, index) => (*/}
                {/*            <div key={index} className="info">*/}
                {/*                <p><strong>이름:</strong> {mentor.name}</p>*/}
                {/*                <p><strong>이메일:</strong> {mentor.email}</p>*/}
                {/*                <p><strong>소개:</strong> {mentor.bio}</p>*/}
                {/*                {mentor.photo ? (*/}
                {/*                    <div className="photo-container">*/}
                {/*                        <Image src={mentor.photo} alt="Photo" width={100} height={100}/>*/}
                {/*                    </div>*/}
                {/*                ) : (*/}
                {/*                    <p>No Photo Available</p>*/}
                {/*                )}*/}
                {/*                <div className="comments">*/}
                {/*                    <h3>댓글:</h3>*/}
                {/*                    {mentor.comments.map((comment, commentIndex) => (*/}
                {/*                        <div key={commentIndex} className="commentContainer">*/}
                {/*                            <p>{comment}</p>*/}
                {/*                        </div>*/}
                {/*                    ))}*/}
                {/*                    <input*/}
                {/*                        type="text"*/}
                {/*                        value={currentComment}*/}
                {/*                        onChange={(e) => setCurrentComment(e.target.value)}*/}
                {/*                        placeholder="댓글을 입력하세요"*/}
                {/*                    />*/}
                {/*                    <button onClick={() => handleAddComment(index)}>댓글 달기</button>*/}
                {/*                </div>*/}
                {/*                <button onClick={() => handleDeleteMentor(index)}>글 삭제</button>*/}
                {/*            </div>*/}
                {/*        ))}*/}
                    </div>
                    <footer className="footer">
                    <div className="footer-icon" onClick={handleSettingsClick}>=
            </div>
            <div className="footer-icon" onClick={handleHomeClick}>🏠</div>
            <div className="footer-icon" onClick={handleProfileClick}>👤</div>
        </footer>
</div>
);
};

export default Find;
