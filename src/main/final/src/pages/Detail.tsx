import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuth } from '../useAuth'; // useAuth 훅을 불러옵니다.
import '../styles/Detail.css';
import axios from "axios"; // Detail 컴포넌트에 사용될 CSS 파일을 불러옵니다.

interface CommentDTO {
    boardSeq: number;
    member_id: string;
    content: string;
    isGoodVolun: boolean;
}

const Detail: React.FC = () => {
    const router = useRouter(); // Next.js의 useRouter 훅을 사용하여 라우터 객체를 얻습니다.
    const { seq } = router.query; // 쿼리에서 id를 추출합니다.
    const [activity, setActivity] = useState<any>(null); // 활동 상세 정보를 담을 상태 변수
    const [isLoggedIn, setIsLoggedIn] = useState(false);// 인증 정보를 다루는 커스텀 훅을 사용하여 로그인 상태를 확인합니다.
    const [isSidebarOpen, setSidebarOpen] = useState(false); // 사이드바 열림 상태를 관리할 상태 변수
    const sidebarRef = useRef<HTMLDivElement>(null); // 사이드바 요소를 참조할 useRef 객체
    const [isGood, setIsGood] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown status

    // Check if the user is logged in on component mount
    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [showModal_D, setShowModal_D] = useState(false);
    const [currentComment, setCurrentComment] = useState<string>('');
    const [bearer, setBearer] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [member_id, setMember_id] = useState('');
    const [boardDTO, setBoardDTO] = useState<any>({});
    const boardDeleteURL = 'http://localhost:9000/volunteer/deleteBoard';
    const getBoardURL = "http://localhost:9000/volunteer/getUpdateBoard"
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
    // 활동 id에 따라 활동 정보를 가져오는 함수
    useEffect(() => {
        const grantType = localStorage.getItem('grantType');
        const access_token = localStorage.getItem('accessToken');
        const member_id = localStorage.getItem('username');
        if (member_id && grantType && access_token) {
            setBearer(grantType);
            setAccessToken(access_token);
            setMember_id(member_id);
        }

        getBoard()
        getComment()
        }, [seq]);
    const getBoard = () => {
        axios.post(getBoardURL, seq)
            .then(res=>{
                setActivity({
                    title: res.data.boardDTO.title,
                    content:res.data.boardDTO.content,
                    seq:res.data.boardDTO.seq,
                    email:res.data.boardDTO.email,
                    name:res.data.boardDTO.name,
                    id:res.data.boardDTO.id,
                    board_time:res.data.boardDTO.board_time,
                    board_lastTime:res.data.boardDTO.board_lastTime,
                    volun_address:res.data.boardDTO.volun_address,
                    volun_institution:res.data.boardDTO.volun_institution,
                    volun_date:res.data.boardDTO.volun_date
                });
            }).catch(err => console.log(err));
    }
    const [commentList, setCommentList] = useState<CommentDTO[]>([])
    const getCommentURL = "http://localhost:9000/comment/getCommentList"
    const getComment = () => {
        console.log("코멘트 줘")
        axios.post(getCommentURL,seq)
            .then(res => {
                console.log(res.data)
                setCommentList(res.data.content);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        //console.log("렌더링")
        rendering();
    }, [activity])
    //렌더링
    const rendering =() => {
        if (!activity || !activity.seq) {
            return; // activity가 초기화되지 않은 경우 함수 종료
        }
        const contentRef = document.getElementById(`content-${activity.seq}`);
        if (contentRef) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(activity.content, 'text/html');
            const oembedTags = doc.querySelectorAll('oembed');
            oembedTags.forEach(oembedTag => {
                const url: string | null = oembedTag.getAttribute('url');
                if (url && url.includes('youtube.com')) {
                    const urlObj = new URL(url);
                    const videoId = urlObj.searchParams.get('v');
                    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    const iframe = document.createElement('iframe');
                    iframe.src = embedUrl;
                    iframe.title = "video";
                    iframe.allowFullscreen = true;
                    iframe.width = "100%";
                    iframe.height = "auto";
                    iframe.style.maxWidth = "300px"; // 최대 너비 설정
                    iframe.style.height = "180px"; // 높이 고정
                    oembedTag.replaceWith(iframe);
                }
            });

            const images = doc.getElementsByTagName('img');
            for (let i = 0; i < images.length; i++) {
                const img = images[i];
                const width = img.width;
                const height = img.height;

                if (width > 300) {
                    const min = 300/width;
                    img.width = Math.round(width * min);
                    img.height = Math.round(height * min);
                }
            }

            contentRef.innerHTML = doc.body.innerHTML;
            console.log("content를 html에서변환")
        }
    }
    // 참여하기 버튼 클릭 시 처리하는 함수

    // 첫 번째 이미지 클릭 시 처리하는 함수
    const handleFirstImageClick = () => {
        router.push('/First'); // First 페이지로 이동
    };


    // 설정 아이콘 클릭 시 처리하는 함수
    const handleSettingsClick = () => {
        setSidebarOpen(!isSidebarOpen); // 사이드바 열림/닫힘 상태를
        setSidebarOpen(!isSidebarOpen); // 사이드바 열림/닫힘 상태를 토글합니다.
    };

    // 사이드바 링크 클릭 시 처리하는 함수
    const handleSidebarLinkClick = (path: string) => {
        setSidebarOpen(false); // 사이드바를 닫습니다.
        router.push(path); // 주어진 경로로 라우팅합니다.
    };

    // 사이드바 외부 클릭 시 처리하는 함수
    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setSidebarOpen(false); // 사이드바 외부를 클릭하면 사이드바를 닫습니다.
        }
    };

    // 홈 아이콘 클릭 시 처리하는 함수
    const handleHomeClick = () => {
        router.push('/FindVolunteer'); // FindVolunteer 페이지로 이동
    };

    // 프로필 아이콘 클릭 시 처리하는 함수
    const handleProfileClick = () => {
        router.push('/Mypage'); // Profile 페이지로 이동
    };

    // 활동 정보가 없는 경우
    if (!activity) {
        return <div>봉사활동을 찾을 수 없습니다.</div>;
    }

    const handleParticipate = () => {
        // Show the modal
        setShowModal(true);

        // Hide the modal after 3 seconds and navigate to /FindVolunteer
        setTimeout(() => {
            setShowModal(false);
            window.location.href = '/FindVolunteer';
        }, 2000);
    };
    const handleSearchClick = () => {
        router.push('/Search');
    };

    const handleAlertClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const writeCommentURL = "http://localhost:9000/comment/writeComment"
    const handleAddComment = (seq: number) => {
        if(activity.id === member_id){
            alert("자신이 작성한 글에는 평가를 남길 수 없습니다.")
            return null;
        }

        const bearer: string | null = localStorage.getItem('grantType');
        const accessToken: string | null = localStorage.getItem('accessToken');

        let headers: { [key: string]: string } = {};
        if (bearer !== null && accessToken !== null) {
            headers = { Authorization: `${bearer}${accessToken}` };
        }

        const boardSeq = seq;
        const content = currentComment;
        const isGoodVolun = isGood;
        const commentDTO: CommentDTO = {
            boardSeq,
            member_id,
            content,
            isGoodVolun
        };
        axios.post(writeCommentURL, commentDTO, { headers: headers })
            .then(res => {
                console.log(res.data);//성공 or 실패 문구 출력
                router.push('/Detail?seq='+seq)
            })
            .catch(err => console.log(err))
        getComment();

    };


    const handleDeleteVolun = (index: number) => {
        axios.post(boardDeleteURL, null, {
            headers: {
                Authorization: bearer + accessToken,
            },
            params: {
                seq: index,
                member_id: member_id,
            },
        })
        setShowModal_D(true);
        setTimeout(() => {
            setShowModal_D(false);
            router.push('/FindVolunteer')
        }, 2000);
    };

    const handleUpdateVolun = (seq: number) => {
        router.push(`/UDVolun?seq=${seq}`);
    };

    const deleteCommentURL = "http://localhost:9000/comment/deleteComment"
    const handleDeleteComment = (comment_seq) => {
        let headers: { [key: string]: string } = {};
        if (bearer !== null && accessToken !== null) {
            headers = { Authorization: `${bearer}${accessToken}` };
        }
        console.log("삭제: " +comment_seq)
        axios.post(deleteCommentURL, comment_seq, {headers: headers})
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        alert("댓글 삭제 완료")
        getComment();
    }

    const updateCommentURL = "http://localhost:9000/comment/updateComment";
    const handleUpdateComment = (comment_seq) => {
        let headers: { [key: string]: string } = {};
        if (bearer !== null && accessToken !== null) {
            headers = { Authorization: `${bearer}${accessToken}` };
        }
        //모달창 띄워서 변경

        const commentDTO = {};
        axios.post(updateCommentURL, commentDTO, {headers:headers})
            .then(res => console.log(res))
            .catch(err => console.log(err))
        getComment();
    }
    // 활동 정보가 있는 경우, 화면에 렌더링
    return (
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
            </header>
            <div className="content">
                <h1>{activity.title}</h1>
                <p id={`content-${activity.seq}`}></p>
                <p>{activity.volun_date}</p>
                <p>{activity.volun_address}</p>

                <p>작성자 메일 주소: {activity.email}</p>
                <div className="rightSide">
                    {(activity.id === member_id) && <button className="btn" onClick={() => handleDeleteVolun(activity.seq)}>글 삭제</button>}
                    {(activity.id === member_id) && <button className="btn" onClick={() => handleUpdateVolun(activity.seq)}>글 수정</button>}
                </div>

                <div className="comments">
                    <h3 style={{textAlign: 'left'}}>댓글</h3>
                    <input
                        type="text"
                        value={currentComment}
                        onChange={(e) => setCurrentComment(e.target.value)}
                        placeholder="댓글을 입력하세요"
                    />
                    <input type="radio" name="isGood" value="true" defaultChecked onClick={() => setIsGood(true)}/>
                    <Image src="/images/smile2.png" alt="true" width={20} height={20}/>
                    <input type="radio" name="isGood" value="false" onClick={() => setIsGood(false)}/>
                    <Image src="/images/sad.png" alt="false" width={20} height={20}/>

                    <button className="btn" onClick={() => handleAddComment(activity.seq)}>댓글 달기</button>
                    {commentList.map((commentDTO: any, index: number) => {
                        const commentTime = new Date(commentDTO.comment_time);
                        const formattedTime = `${commentTime.getFullYear()}-${(commentTime.getMonth() + 1).toString().padStart(2, '0')}-${commentTime.getDate().toString().padStart(2, '0')}`;
                        return (
                            <p className="commentContainer" key={commentDTO.commentSeq}>
                                <div className="comment_createTime">{formattedTime}</div>
                                <div className="comment_content">{commentDTO.content}</div>
                                {(commentDTO.member_id === member_id) &&
                                    <button className="btn" onClick={() => handleDeleteComment(commentDTO.commentSeq)}>글 삭제</button>}
                            </p>

                        );
                    })}
                </div>

                {activity.auth && <p>{activity.auth}</p>}
                <div>
                    <button className="participate-button" onClick={handleParticipate}>참여하기</button>
                    {showModal && (
                        <div className="modal">
                            {activity.email}로 신청서 내주시면 됩니다.
                            신청서를 낼 때는 신청자 이름, 연락처 등을 함께 제출해주시면 좋습니다.
                        </div>
                    )}
                </div>
                {showModal_D && (
                    <div className="modal">
                        <div className="modal-content">
                            삭제를 완료했습니다.
                        </div>
                    </div>
                )}
            </div>
            <footer className="footer">
                <div className="footer-icon" onClick={handleSettingsClick}>=</div>
                <div className="footer-icon" onClick={handleHomeClick}>🏠</div>
                <div className="footer-icon" onClick={handleProfileClick}>👤</div>
            </footer>
        </div>
    );
};

export default Detail;