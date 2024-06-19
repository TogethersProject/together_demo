import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {router} from "next/client";

const UpdateDeleteCalendar = ({show, onClose, event, onEvent, getCalendar, setEvent}) => {
    const [bearer, setBearer] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [member_id, setMember_id] = useState('')
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [allDay, setAllDay] = useState( false);

    if(!show){
        return null;
    }

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
    }, [])

    useEffect(() => {
        if (show && event) {
            if (event.start) {
                // `Date` 객체에서 시간과 분을 추출
                const startHours = event.start.getHours().toString().padStart(2, '0');
                const startMinutes = event.start.getMinutes().toString().padStart(2, '0');
                // 시간과 분을 'HH:MM' 형식의 문자열로 결합
                const startTime = `${startHours}:${startMinutes}`;
                setStartTime(startTime);
            }
            if (event.end) {
                const endHours = event.end.getHours().toString().padStart(2, '0');
                const endMinutes = event.end.getMinutes().toString().padStart(2, '0');
                const endTime = `${endHours}:${endMinutes}`;
                setEndTime(endTime);
                console.log(endTime)
            }
            setAllDay(event.allDay || false); // event가 변경될 때 allDay 상태 설정
        }
    }, [show,event]);

    //event에 일정 내용을 담아 수정.
    const updateCalendarURL ="http://localhost:9000/calendar/updateCalendar"

    const onStartTime = (e) => {
        //이벤트에 시간 넣기
        const [hours, minutes] = e.target.value.split(':');
        const newStart = new Date(event.newStart);
        newStart.setHours(hours);
        newStart.setMinutes(minutes);
        //console.log(newStart)
        setEvent({ ...event, newStart: newStart });
    }
    const onEndTime = (e) => {
        setEndTime(e.target.value);

        const [hours, minutes] = e.target.value.split(':');
        const newEnd = new Date(event.newEnd);
        newEnd.setHours(hours);
        newEnd.setMinutes(minutes);
        //console.log(newEnd)
        setEvent({ ...event, newEnd: newEnd });
    }
    const onSubmit = () => {

        setEvent(preData => ({
            ...preData
            ,start: event.newStart
            ,end: event.newEnd
        }));
        axios.post(updateCalendarURL
            ,{...event, start: event.newStart, end: event.newEnd}
            ,{ headers:{Authorization:bearer+accessToken}}
        ).then(res => {
            console.log(res.data)
            alert("어어저장했다")
            getCalendar()
            setEvent(preData => ({
                calendar_memberId: preData.calendar_memberId
                ,allDay:false
            }))

            onClose()
        }).catch(err => console.log(err))
    }
    const formatDate = (dateString) => {
        if(dateString == null ) return null;
        return new Date(dateString).toLocaleDateString();
    };
    const deleteCalendarURL ="http://localhost:9000/calendar/deleteCalendar"
    const onDelete = () => {
        const memberId = event.id
        console.log(memberId + "삭제하겠습니다")
        axios.post(deleteCalendarURL
            ,memberId
            ,{ headers:{Authorization:bearer+accessToken}}
        ).then(res => {
            console.log(res.data)
            alert('삭제완')
            getCalendar()
        }).catch(err => console.log(err))
    }
    const onExit = () => {
        setEvent( preData => ({
            allDay: true
            ,calendar_memberId: event.calendar_memberId
        }));

        onClose()
    }
    const handleAllDayChange = (e) => {
        const isChecked = e.target.checked;
        setAllDay(isChecked);
        setEvent({ ...event, allDay: isChecked });
    };
    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <button onClick={onClose}>&times;모달닫기</button>
                </div>
                <div className="modal-body">
                    일정 수정 삭제<br/>
                    <p>
                        일정 시작일: <input type='type' onChange={() => formatDate(event.newStart)}/>
                        시간: <input type='time' onChange={onStartTime} value={startTime} name='eventStartTime'/>
                    </p>
                    <p>일정 마감일: <input type={'text'} onChange={() => formatDate(event.newEnd)} />
                        시간: <input type='time' onChange={onEndTime} value={endTime} name='eventEndTime'/>
                    </p>

                    <input type='checkbox' onChange={handleAllDayChange} checked={allDay} name='allDay'/>allDay 체크여부
                    <input type='text' onChange={onEvent} name='title' value={event.title} placeholder='제목'/>
                    <input type='text' onChange={onEvent} name='content' value={event.content} placeholder='내용'/>

                    <input type='radio' onChange={onEvent} name='backgroundColor' value='skyblue' checked={event.backgroundColor === 'skyblue'}/>파랑
                    <input type='radio' onChange={onEvent} name='backgroundColor' value='orange' checked={event.backgroundColor === 'orange'}/>오렌지
                    <input type='text' onChange={onEvent} name='backgroundColor' value={event.backgroundColor} placeholder='색상 알아서 잘 넣어보도록. 나중에는 체크박스나 다른 기능 필요'/>
                </div>
                <div className="modal-footer">
                    <button type='button' onClick={onSubmit}>제출하기</button>
                    <button type='button' onClick={onExit}>취소하기</button>
                    <button type='button' onClick={onDelete}>삭제하기</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateDeleteCalendar;