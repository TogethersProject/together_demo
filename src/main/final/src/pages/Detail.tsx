import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuth } from '../useAuth'; // useAuth 훅을 불러옵니다.
import '../styles/Detail.css'; // Detail 컴포넌트에 사용될 CSS 파일을 불러옵니다.

const Detail: React.FC = () => {
    const router = useRouter(); // Next.js의 useRouter 훅을 사용하여 라우터 객체를 얻습니다.
    const { id } = router.query; // 쿼리에서 id를 추출합니다.
    const [activity, setActivity] = useState<any>(null); // 활동 상세 정보를 담을 상태 변수
    const { isLoggedIn } = useAuth(); // 인증 정보를 다루는 커스텀 훅을 사용하여 로그인 상태를 확인합니다.
    const [isSidebarOpen, setSidebarOpen] = useState(false); // 사이드바 열림 상태를 관리할 상태 변수
    const sidebarRef = useRef<HTMLDivElement>(null); // 사이드바 요소를 참조할 useRef 객체

    // 활동 id에 따라 활동 정보를 가져오는 함수
    useEffect(() => {
        const getActivityById = async (id: string | string[] | undefined) => {
            if (id && typeof id === 'string') {
                const activityId = parseInt(id);
                switch (activityId) {
                    case 1:
                        setActivity({
                            id: 1,
                            title: '어르신 돌봄 봉사',
                            description: '혼자 계신 어르신들과 시간 보내기',
                            detail: '홀로 계신 어르신분들을 위한 따뜻함을 나눠주세요.\n',
                            detail2: '5층 규모의 요양원이며 60~80세의 어르신이 입주해 계십니다.\n',
                            detail3: '원내에 계시는 어르신분들 모두 마음이 따뜻하신 분들입니다.\n',
                            detail4: '담소 나누시는 걸 좋아하시기에, 어르신들과 함께 즐거운 추억을 만들고 힘을 보태주시길 희망합니다.\n',
                            date: '봉사기간: 2024.03.14 ~ 2024.07.05 매주 토, 일요일\n',
                            time: '봉사시간: 13:00 ~ 17:00\n',
                            place: '장소: 도봉구 방학2동 한사랑요양원',
                            category: '활동내용: 원 주변 환경미화 및 식자재 분배 등 잔잔한 업무\n',
                            people: '주의사항: 몸이 불편하시거나 고령인 어르신이 있는 만큼 예의 바르고 인내심이 많은 분이셨으면 좋겠습니다.\n',
                            type: '조건: 미성년자, 해외여행 결격사유 있는 분은 안됩니다.\n',
                            image: '/images/senior.png'
                        });
                        break;
                    case 2:
                        setActivity({
                            id: 2,
                            title: '아이 돌봄 봉사',
                            description: '저소득가정 아이들을 위한 무료 학습 보조',
                            detail1: '특별한 여름 방학을 선물해줄 여름의 산타를 찾고 있습니다!\n',
                            detail2: '안녕하세요, 광명시 청년동에서 진행되는 저소득 가정 아이들을 위한 무료 학습 봉사 멘토를 모집합니다.\n',
                            detail3: '아이들의 밝은 미래를 위해 힘써주시길 바라며,적극적인 참여를 기대하겠습니다.\n',
                            detail4: '17세 이상의 개인 또는 단체 봉사자를 모집하고 있으니, 지금 신청해 주세요!\n',
                            date: '봉사 기간: 2024.07.21 ~ 2024.08.31 매주 화요일\n',
                            time: '봉사시간: 13:00 ~ 17:00\n',
                            period: '모집기간: 2024.06.04 ~ 2024.07.07\n',
                            people: '모집인원: 5명\n',
                            category: '봉사분야: 학습, 멘토링\n',
                            type: '봉사자 유형: 17세 이상의 개인 또는 단체\n',
                            place: '봉사활동 장소: 경기도 광명시 오리로854번길 10\n',
                            auth: '작성자: free0604',
                            image: '/images/disable.png'
                        });
                        break;
                    case 3:
                        setActivity({
                            id: 3,
                            title: '장애인 박물관 관람 도우미',
                            description: '관람의 어려움을 느끼지 않도록 보조',
                            detail1: '특별한 관람을 선물해줄 여러분들을 찾고 있습니다!\n',
                            detail2: '안녕하세요,장애인 분들을 위한 전시 관람 보조 도우미 분들을 모집합니다.\n',
                            detail3: '매주 목요일 오후 1시부터 3시 사이, 2시간 동안 함께 해주실 분을 찾고 있습니다.\n',
                            detail4: '밝은 미래를 위해 힘써주시길 바라며,적극적인 참여를 기대하겠습니다.\n',
                            date: '봉사 기간: 2024.6/27~2024.7/25 매주 목요일\n',
                            time: '봉사시간: 13:00 ~ 15:00\n',
                            period: '모집기간: 2024.06.04 ~ 2024.06.15\n',
                            people: '모집인원: 10명\n',
                            category: '봉사분야: 보조, 도움\n',
                            type: '봉사자 유형: 18세 이상의 개인 또는 단체\n',
                            place: '봉사활동 장소: 서울특별시 중구 덕수궁길 61\n',
                            auth: '작성자: sooyeon13',
                            image: '/images/disable.png'
                        });
                        break;
                    default:
                        setActivity(null);
                        break;
                }
            }
        };

        getActivityById(id); // id가 변화할 때마다 해당 id의 활동을 가져옵니다.
    }, [id]);

    // 참여하기 버튼 클릭 시 처리하는 함수
    const handleParticipate = () => {
        if (isLoggedIn()) {
            router.push('/mypage'); // 로그인 되어 있으면 마이페이지로 이동
        } else {
            router.push('/Login'); // 로그인 되어 있지 않으면 로그인 페이지로 이동
        }
    };

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
        router.push('/Profile'); // Profile 페이지로 이동
    };

    // 활동 정보가 없는 경우
    if (!activity) {
        return <div>봉사활동을 찾을 수 없습니다.</div>;
    }

    // 활동 정보가 있는 경우, 화면에 렌더링
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
            <div className="content">
                <h1>{activity.title}</h1>
                <Image src={activity.image} alt={activity.title} width={300} height={300} />
                <p>{activity.description}</p>
                <p>{activity.detail}</p>
                {activity.detail2 && <p>{activity.detail2}</p>}
                {activity.detail3 && <p>{activity.detail3}</p>}
                {activity.detail4 && <p>{activity.detail4}</p>}
                <p>{activity.date}</p>
                <p>{activity.time}</p>
                <p>{activity.place}</p>
                <p>{activity.category}</p>
                <p>{activity.people}</p>
                <p>{activity.type}</p>
                {activity.auth && <p>{activity.auth}</p>}
                <button className="participate-button" onClick={handleParticipate}>참여하기</button>
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