import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import FullCalendar from '@fullcalendar/react'; // Import FullCalendar and DateSelectArg
import dayGridPlugin from '@fullcalendar/daygrid'; // Import the DayGrid plugin
import interactionPlugin from '@fullcalendar/interaction'; // Import the Interaction plugin
import '../styles/Calendar.css';
import timeGridPlugin from "@fullcalendar/timegrid";
//import momentPlugin from '@fullcalendar/moment';
//import {DateSelectArg} from "@fullcalendar/core";
import axios from "axios";
import { formatDate } from '@fullcalendar/core'

const Calendar: React.FC = () => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [events, setEvents] = useState([
        { id: '1', title: 'Event 1', start: '2023-06-20' },
        { id: '2', title: 'Event 2', start: '2023-06-21' },
    ]);
    //현재 달력에서 보이는 날짜.    date가 변하면 일정 리스트를 다시 받아야한다.
    const [date, setDate] =useState({start: '', end: ''})
    interface Event {
        title: string;
        content: string;
        start?: Date;
        id: string;
        calendar_memberId: string;
        allDay: boolean;
        backgroundColor: string;
        end?: Date;
    }
    const [event, setEvent] = useState<Event>({
        title: '',
        content: '',
        id: '',
        calendar_memberId: '',
        allDay: false,
        backgroundColor: '',
    });


    const [bearer, setBearer] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [member_id, setMember_id] = useState('')
    const getCalendarURL = "http://localhost:9000/calendar/getCalendarList";
    // 일정 수정 혹은 삭제 모달 표시 여부를 위한 상태
    const [showUDModalState, setShowUDModalState] = useState(false);
// 일정 작성 모달 표시 여부를 위한 상태. 헷갈리면 나중에 W(write) 붙이자.
    const [showModalState, setShowModalState] = useState(false);
    const [allDay, setAllDay] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Stat
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);
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
    const handleOutModalClick = (event) => {
        // 모달 영역 외의 클릭을 감지하여 모달을 닫습니다.
        setShowModal(false);
    };
    //맨 처음 로딩에만 토큰 정보 저장
    useEffect(() => {
        const grantType = localStorage.getItem("grantType");
        const access_token = localStorage.getItem("accessToken");
        const member_id= localStorage.getItem("username");
        if (grantType  && access_token && member_id) {
            setBearer(grantType);
            setAccessToken(access_token);
            setMember_id(member_id)
        }else{
            router.push('/Login');
        }

        if (date.start && date.end) {
            getCalendar();
        }    }, [accessToken])

    //날짜 정보가 바뀔 때마다 캘린더 정보 갱신.  date = 달력에서 보여주는 날짜.
    useEffect(()=>{
        if (date.start && date.end) {
            getCalendar();
        }
    },[date])

    //DB에서 캘린더 정보 가져와 events에 저장. data로 넘겨서 requestbody로 받아도 됨.
    const getCalendar = () => {
        console.log(date.start+"\n"+date.end+"\n"+event.calendar_memberId)
        console.log('getCalendar - accessToken: ' + bearer + accessToken)
        const authorization = bearer + accessToken
        const startDate= date.start
        const endDate= date.end

        axios.post(getCalendarURL
            , {
                startDate: startDate
                ,endDate:  endDate
                ,memberId: member_id}
            ,{ headers:{Authorization:authorization}}
        ).then(res => {
            //console.log("캘린더 가져옴!")
            //console.log(res.data)
            // 날짜 형식 변경
            setEvents(prevEvents => [ ...res.data]);
        })
            .catch(err => console.log("캘린더 못가져옴\n" + err))
    }

    const handleDateClick = (info) => {
        setEvent({
            title: ''
            ,content: ''
            ,start: info.date
            ,id: ''
            ,allDay: false  //allDay면 <->로 일정 조절 가능하다는 장점 & 시간이 안보인다는 단점
            ,calendar_memberId: member_id
            ,backgroundColor: ''
        });
        setShowModalState(true)

        // const title = prompt('Enter event title');
        // if (title) {
        //     setEvents([...events, { id: String(events.length + 1), title, start: arg.dateStr }]);
        // }
    };

    const handleEventClick = (info) => {
        console.log("드래그")
        console.log(info)

        goUDModal(info)
        setShowUDModalState(true)

        // if (confirm(`Do you want to delete the event '${arg.event.title}'`)) {
        //     setEvents(events.filter(event => event.id !== arg.event.id));
        // }
    };

    const handleSelect = (info) => {
        setEvent( preData => ({
            title: ''
            ,content: ''
            ,start: info.start
            ,end: info.end
            ,id: ''
            ,allDay: false
            ,calendar_memberId: member_id
            ,backgroundColor: ''
        }));
        setShowModalState(true)

        // const title = prompt('Enter event title');
        // if (title) {
        //     setEvents(prevEvents => [
        //         ...prevEvents,
        //         { id: String(prevEvents.length + 1), title, start: startStr, end: endStr }
        //     ]);
        // }
    };

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

    const handleLoginClick = () => {
        router.push('/Login');
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
    const handleCancel = () => {
        // Logic to reset the form
        // For example, if using React with state:
        // setEvent({ /* initial state or empty values */ });
        // Or for vanilla JavaScript:
        // document.getElementById('myForm').reset();
    };


    //작성되어있는 이벤트를 드래그를 통해 이동 시키거나 클릭한 경우
    const onDragEvent = (info) => {
        console.log("드래그")
        console.log(info)
        // console.log("캘린더아이디: " + info.event._def.extendedProps.calendar_id)
        // console.log("멤버아이디: " + info.event._def.extendedProps.calendar_memberId)
        // console.log("원래날짜: " + info.oldEvent._instance.range.start + " ~ " + info.oldEvent._instance.range.end)
        // console.log("바뀐날짜: " + info.event._instance.range.start + " ~ " + info.event._instance.range.end)
        // console.log("배경색: " + info.event._def.extendedProps.backgroundColor)
        // console.log('content: ' + info.el.fcSeg.eventRange.def.extendedProps.content
        //             +'\nid: ' + info.el.fcSeg.eventRange.def.extendedProps.calendar_id
        //             +'\nrange: ' + info.el.fcSeg.eventRange.range.start + ' ~ ' + info.el.fcSeg.eventRange.range.end
        //             +'\ncolor(경계선,바탕,글씨): '+ info.el.fcSeg.eventRange.ui.borderColor + "/" + info.el.fcSeg.eventRange.ui.backgroundColor + "/" + info.el.fcSeg.eventRange.ui.textColor)

        //클릭한 일정 정보를 event에 담음
        goUDModal(info)
        //수정 삭제 모달 보여줘
        setShowUDModalState(true)
    }
    //현재 보고 있는 달력의 시작 및 종료 날짜 산출 -> date에 저장
    const dateSet = (dateInfo => {
        console.log(dateInfo.startStr); // 현재 보고 있는 달력의 시작 날짜
        console.log(dateInfo.endStr); // 현재 보고 있는 달력의 종료 날짜
        setDate(preDate=>({
            ...preDate
            ,start:dateInfo.startStr
            ,end:dateInfo.endStr}))

        // 현재 월을 확인하려면 dateInfo.startStr 또는 dateInfo.endStr을 파싱
        //const currentMonth = new Date(dateInfo.startStr).getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
        //console.log(`현재 보고 있는 달: ${currentMonth}월`);
    })

    //수정 삭제 작업을 위해 클릭한 일정 정보를 DB에서 가져와 저장한다. -> DB에 가지 않아도 정보를 받을 수 있으나 시간 정보가 불안정하며, allDay의 경우 시간을 받아오지 않는다.
    const getOneCalendarURL = "http://localhost:9000/calendar/getOneCalendar"
    const goUDModal = (info) =>{
        const calendar_id = info.event._def.extendedProps.calendar_id

        const utcNewStartDate = new Date(info.event._instance.range.start);
        const utcNewEndDate = new Date(info.event._instance.range.end);
        const kstNewStartDate = new Date(utcNewStartDate.getTime() - (9 * 60 * 60 * 1000)); // 9시간을 -
        const kstNewEndDate = new Date(utcNewEndDate.getTime() - (9 * 60 * 60 * 1000)); // 9시간을 -

        console.log("토큰줄게 일정 하나만 줘:" +bearer+accessToken)
        axios.post(
            getOneCalendarURL
            ,calendar_id
            ,{ headers:{Authorization:bearer+accessToken}
            }).then(res => {
            console.log(res.data)
            const eventData = {
                ...res.data
                ,id: calendar_id
                ,start: kstNewStartDate//KST
                //,newStart: kstNewStartDate  //새로 바꿀 시작일 정보. UTC --(-9h)--> KST
                //end 데이터가 있는 경우에만 값을 넣음
                ,...(res.data.end != null && { end: kstNewEndDate })
                //,...(res.data.end != null && { newEnd: kstNewEndDate })
            };
            setEvent(eventData)//console.log(res.data

            getCalendar();
        }).catch(err=> console.log(err))


    }

    // 일정 내역을 저장.
    const onEvent= (e) => {
        //이름대로 값 연결함. 즉, name이 title인 곳에 적힌 값이 Event.title에 저장
        const { name, value } = e.target;
        setEvent(prevData => ({
            ...prevData,
            [name]: value, // `name`에 해당하는 상태를 `value`로 업데이트합니다.
            backgroundColor: name === 'backgroundColor' ? value : prevData.backgroundColor, // `backgroundColor` 속성을 업데이트합니다.

        }));
        //console.log('onEvent: ',event)
    }

    //캘린더 시작 시간 설정
    const onStartTime = (e) => {
        if(event.start){
            const [hours, minutes] = e.target.value.split(':');
            const newStart = new Date(event.start);
            newStart.setHours(hours);
            newStart.setMinutes(minutes);
            console.log(newStart)
            if(newStart) setEvent({ ...event, start: newStart });
        }
    }
    //캘린더 종료 시간 설정
    const onEndTime = (e) => {
        if(event.end){
            const [hours, minutes] = e.target.value.split(':');
            const newStart = new Date(event.end);
            newStart.setHours(hours);
            newStart.setMinutes(minutes);
            console.log(newStart)
            setEvent({ ...event, end: newStart });
        }
    }
    const handleAllDayChange = (e) => {
        const isChecked = e.target.checked;
        setAllDay(isChecked);
        setEvent({ ...event, allDay: isChecked });
    };
    const calendarWriteSubmitURL ='http://localhost:9000/calendar/writeCalendar';
    const handleWriteSubmit = () => {
        console.log('제출 전, 정보 확인: ', event);
        console.log("accessToken: " + bearer + accessToken);

        axios.post(calendarWriteSubmitURL, event, {
            headers: { Authorization: bearer + accessToken }
        }).then(res => {
            console.log('제출 성공: ', res);
            setShowModalState(false); // 모달 숨기기
            handleCancel(); // 입력 폼 리셋
            getCalendar(); // 캘린더 갱신
        }).catch(err => {
            console.log('제출 오류: ', err);
        });

        // setEvent(null); // 이 부분은 event를 초기화하는 용도로 사용할 수 있음
    }

    const deleteCalendarURL ="http://localhost:9000/calendar/deleteCalendar"
    const handleDelete = () => {
        const memberId = event.id
        console.log(memberId + "삭제하겠습니다")
        axios.post(deleteCalendarURL
            ,memberId
            ,{ headers:{Authorization:bearer+accessToken}}
        ).then(res => {
            console.log(res.data)
            handleCancle();//리셋
            getCalendar()
        }).catch(err => console.log(err))
    }
    const handleCancle = () => {
        setEvent( preData => ({
            title: '',
            content: '',
            id: '',
            calendar_memberId: '',
            allDay: false,
            backgroundColor: '',
        }));

        setShowUDModalState(false);
    }
    const updateCalendarURL ="http://localhost:9000/calendar/updateCalendar"
    const handleUDSubmit = () => {
        setEvent(preData => ({
            ...preData
            ,start: event.start
            ,end: event.end
        }));
        axios.post(updateCalendarURL
            ,{...event, start: event.start, end: event.end}
            ,{ headers:{Authorization:bearer+accessToken}}
        ).then(res => {
            console.log(res.data)
            getCalendar()
            handleCancle()
        }).catch(err => console.log(err))
    }
    function handleFirstImageClick() {
        router.push('/First');
    }
    const handleSearchClick = () => {
        router.push('/Search');
    };

    const handleAlertClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <div className={`main-screen ${isSidebarOpen ? 'sidebar-open' : ''}`}
             onClick={isSidebarOpen ? handleOutsideClick : undefined}>
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} ref={sidebarRef}>
                <div className="sidebar-link" onClick={() => handleNavigation('/Search')}>🔍 Search</div>
                {!isLoggedIn ? (
                    <div className="sidebar-link" onClick={() => handleNavigation('/Login')}>🔒 Login</div>
                ) : (
                    <div className="sidebar-link" onClick={() => handleNavigation('/Mypage')}>👤 My Page</div>
                )}
                <div className="sidebar-link" onClick={() => handleNavigation('/Chat')}>🤖 ChatBot</div>
            </div>
            <header className="header">
                <div onClick={() => handleNavigation('/Search')} style={{cursor: 'pointer'}}>
                    <Image src="/images/image-23.png" alt="search" width={40} height={40}/>
                </div>
                <div className="center-image-container" onClick={() => handleNavigation('/First')}
                     style={{cursor: 'pointer'}}>
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
                <div className="intro">
                    <h1>봉사 일정을 확인하세요</h1>
                </div>
                <div className="calendar-container">
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                        initialView="dayGridMonth"
                        titleFormat={{
                            year: "2-digit",         //numeric, 2-digit
                            month: "short",       //2글자. long, short, narrow,
                        }}
                        headerToolbar={{
                            center: 'title'
                            , start: 'today'
                            , end: 'prev,next'
                        }}
                        footerToolbar={{
                            center: 'dayGridMonth,timeGridDay'
                        }}
                        eventTimeFormat={{
                            meridiem: false,     //am, pm 표시 비활성화
                            hour: "2-digit"     //시간만 2글자 표시. year, month, day, minute 비활성화
                        }}
                        events={events}
                        dateClick={handleDateClick}
                        eventClick={handleEventClick}
                        select={handleSelect} // Use handleSelect for handling select events
                        selectable={true} // Allow for selection of dates
                        selectMirror={true} // 이벤트를 추가할 때 선택한 영역을 표시

                        editable={true}//이벤트의 드래그 앤 드롭, 리사이징, 이동
                        eventDurationEditable={true} //이벤트 생명주기
                        eventResizableFromStart={true}//이벤트의 시작부분 리사이즈 가능여부
                        eventResize={onDragEvent}//이벤트를 리사이즈(allDay = true만 가능)한 경우 실행
                        eventChange={onDragEvent}//이벤트의 드래그 앤 드롭 시 실행

                        datesSet={dateSet}//현재 보고 있는 달력의 시작 ~ 종료일

                        //locale='ko'//언어: 한국어
                        weekends={true} // 주말 표시 여부
                        navLinks={true} // 달력의 날짜 클릭시 일간 스케줄로 이동
                        navLinkHint={"이 날의 일정을 더 자세히 보기"} // 날짜에 호버 시 문구. 필요하면 nn일로 이동합니다. 문구를 출력할 수 있음.
                        dayMaxEvents={2}//하루에 너무 많은 일정이 있으면 +more로 표시. 깔끔한 캘린더 디자인을 위함.

                        eventBackgroundColor={'yellowgreen'}//이벤트의 배경색. 디폴트 값.
                        eventBorderColor={'yellowgreen'}// 이벤트의 테두리 색. 달력 배경색과 동일하게 설정.

                        height="auto"
                    />
                </div>
                {showModalState && (
                    <div className="modal" onClick={handleOutModalClick}>
                        <div className="modal-content">
                            <button onClick={() => setShowModalState(false)}>닫기</button>
                        </div>
                        <div className="modal-body">
                            <p>
                                일정 시작일: {event.start && new Date(event.start).toLocaleString()}
                                시간: <input type='time' onChange={onStartTime} name='eventStartTime'/>
                            </p>
                            <p>
                                일정 마감일: {event.end && new Date(event.end).toLocaleString()} 시간:
                                <input type='time' onChange={onEndTime} name='eventEndTime'/>
                            </p>
                            <input type='checkbox' onChange={handleAllDayChange} checked={allDay} name='allDay'/>allDay
                            체크여부
                            <input type='text' onChange={onEvent} name='title' value={event.title} placeholder='제목'/>
                            <input type='text' onChange={onEvent} name='content' value={event.content}
                                   placeholder='내용'/>
                            <select onChange={onEvent} name='backgroundColor' value={event.backgroundColor}>
                                <option value='' disabled>색상을 선택하세요</option>
                                <option value='green'>Green</option>
                                <option value='lightpink'>Light Pink</option>
                                <option value='skyblue'>Sky Blue</option>
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={handleWriteSubmit}>제출하기</button>
                        </div>
                    </div>
                )}
                {showUDModalState && (
                    <div className="modal" onClick={handleOutModalClick}>
                        <div className="modal-body">
                            <p>
                                일정 시작일: {(event.start) && new Date(event.start).toLocaleString()}
                                시간: <input type='time' onChange={onStartTime} name='eventStartTime'/>
                            </p>
                            <p>일정 마감일: {(event.end) && new Date(event.end).toLocaleString()} 시간:
                                <input type='time' onChange={onEndTime} name='eventEndTime'/>
                            </p>

                            <input type='checkbox' onChange={handleAllDayChange} checked={allDay} name='allDay'/>allDay
                            체크여부
                            <input type='text' onChange={onEvent} name='title' value={event.title} placeholder='제목'/>
                            <input type='text' onChange={onEvent} name='content' value={event.content}
                                   placeholder='내용'/>
                            <select onChange={onEvent} name='backgroundColor' value={event.backgroundColor}>
                                <option value='' disabled>색상을 선택하세요</option>
                                <option value='green'>Green</option>
                                <option value='lightpink'>Light Pink</option>
                                <option value='skyblue'>Sky Blue</option>
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button type='button' onClick={handleUDSubmit}>제출하기</button>
                            <button type='button' onClick={handleCancle}>취소하기</button>
                            <button type='button' onClick={handleDelete}>삭제하기</button>
                        </div>
                    </div>
                )};

            </div>
            <footer className="footer">
                <div className="footer-icon" onClick={handleSettingsClick}>=</div>
                <div className="footer-icon" onClick={handleHomeClick}>🏠</div>
                <div className="footer-icon" onClick={handleProfileClick}>👤</div>
            </footer>
        </div>
    );
};

export default Calendar;

