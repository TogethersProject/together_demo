import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import '../styles/Detail.css';
import { useAuth } from '../useAuth'; // useAuth 모듈 import

const Detail: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [activity, setActivity] = useState<any>(null);
    const { isLoggedIn } = useAuth(); // useAuth 훅 사용

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
                            detail: '홀로 계신 어르신분들을 위한 따뜻함을 나눠주세요\n' +
                                '\n' +
                                '명동성당 인근에 위치한 한사랑 요양원입니다\n' +
                                '5층 규모의 요양원이며 6~80세에 어르신이 입주해 계십니다\n' +
                                '주 업무는 원 내 및 외부 환경미화 , 원 내 업무에 대한 보조가 있으며\n' +
                                '식자재 나르거나 분배 등 힘을 쓰는 업무도 있기에 염두해주셨으면 좋겠습니다\n' +
                                '\n' +
                                '원내에 계시는 어르신분들 모두 마음이 따뜻하신 분들입니다\n' +
                                '담소 나누시는 걸 좋아하시기에 어르신들과 함께 즐거운 추억과 함께\n' +
                                '힘을 보태주시길 희망합니다\n' +
                                '\n' +
                                '\n' +
                                '봉사기간 : 2024.03.14 ~ 2024.07.05 매주 토,일요일\n' +
                                '봉사시간: 13:00 ~17:00 \n' +
                                '장소 : 도봉구 방학2동 한사랑요양원\n' +
                                '활동내용: 원 주변 환경미화 및 식자재 분배 등에 잔잔한 업무\n' +
                                '주의사항: 몸이 불편하시거나 고령인 어르신이 있는 만큼 예의 바르시고 인내심이 많은 분이셨으면 좋겠습니다 \n' +
                                '조건: 미성년자, 해외여행 결격사유 있는 분은 안됩니다\n',
                            // location: '',
                            // startdate: '',
                            // enddate:'',
                            // people: '',
                            image: '/images/senior.png'
                        });
                        break;
                    case 2:
                        setActivity({
                            id: 2,
                            title: '아이 돌봄 봉사',
                            description: '저소득가정 아이들을 위한 무료 학습 보조',
                            detail: '특별한 여름 방학을 선물해줄 여름의 산타를 찾고 있습니다!\n' +
                                '\n' +
                                '안녕하세요, 20대 청년 여러분. 광명시 청년동에서 진행되는 저소득 가정 아이들을 위한 무료 학습 봉사 멘토를 모집합니다. 방학을 맞이하여 여러분의 따뜻한 마음과 열정을 보태주세요.\n' +
                                '\n' +
                                '매주 화요일 오후 1시부터 5시 사이, 2시간 동안 아이들과 함께 공부하고 놀며 멘토링을 해주실 분을 찾고 있습니다. 이번 봉사 활동은 2024년 7월 21일부터 8월 31일까지 진행되며, 모집 기간은 6월 4일부터 7월 7일까지입니다.\n' +
                                '\n' +
                                '단순히 아이들을 도와주는 것뿐만 아니라, 여러분 자신에게도 큰 보람과 성장의 기회가 될 것입니다. 아이들의 밝은 미래를 위해 힘써주시길 바라며, 여러분의 적극적인 참여를 기대하겠습니다.\n' +
                                '\n' +
                                '17세 이상의 개인 또는 단체 봉사자를 모집하고 있으니, 지금 바로 신청해 주세요! 이번 여름, 청년동에서 특별한 경험을 해보세요.\n' +
                                '\n' +
                                '봉사 기간: 2024.07.21 ~ 2024.08.31 매주 화요일\n' +
                                '봉사시간: 13:00 ~ 17:00\n' +
                                '모집기간: 2024.06.04 ~ 2024.07.07 \n' +
                                '모집인원: 5명\n' +
                                '신청인원: ?명\n' +
                                '봉사분야: 학습, 멘토링\n' +
                                '봉사자 유형: 17세 이상의 개인 또는 단체\n' +
                                '봉사활동 장소: 경기도 광명시 오리로854번길 10\n' +
                                '예약여부: x\n' +
                                '작성자: free0604',
                            // location: '',
                            // startdate: '',
                            // enddate:'',
                            // people: '',
                            image: '/images/disable.png'
                        });
                        break;
                    default:
                        setActivity(null);
                        break;
                }
            }
        };

        getActivityById(id);
    }, [id]);

    const handleParticipate = () => {
        if (isLoggedIn()) {
            router.push('/mypage'); // 로그인 상태이면 마이페이지로 이동
        } else {
            router.push('/Login'); // 로그인 상태가 아니면 로그인 페이지로 이동
        }
    };

    if (!activity) {
        return <div>봉사활동을 찾을 수 없습니다.</div>;
    }
    const handleHomeClick = () => {
        router.push('/First');
    };

    const handleProfileClick = () => {
        router.push('/Profile');
    };

    const handleSettingsClick = () => {
        router.push('/Menu');
    };

    return (
        <div className="container">
            <div className="main-screen">
                <div className="header">
                    <Image src="/images/image-23.png" alt="search" width={40} height={40}/>
                    <div className="center-image-container" style={{cursor: 'pointer'}}>
                        <Image className="center-image" src="/images/first.png" alt="투게더!" width={120} height={45}/>
                    </div>
                    <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50}/>
                </div>
                <div className="content">
                    <h1>{activity.title}</h1>
                    <Image src={activity.image} alt={activity.title} width={300} height={300}/>
                    <p>{activity.description}</p>
                    <h4>{activity.detail}</h4>
                    <button onClick={handleParticipate}>참여하기</button>
                </div>
                <footer className="footer">
                    <div className="footer-icon" onClick={handleSettingsClick}>=</div>
                    <div className="footer-icon" onClick={handleHomeClick}>🏠</div>
                    <div className="footer-icon" onClick={handleProfileClick}>👤</div>
                </footer>
            </div>
        </div>
    );
};

export default Detail;
