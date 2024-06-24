import React, { useState, useEffect, useRef } from 'react';

type Message = {
    text: string;
    isUser: boolean;
};

const InteractiveChatBot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [options, setOptions] = useState<string[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const predefinedQuestions: { [key: string]: string[] } = {
        "계정": ["계정을 잊어버렸어요", "계정을 삭제하고 싶어요", "계정을 변경하고 싶어요"],
        "기술": ["앱이 작동하지 않아요", "기술 지원이 필요해요", "버그를 신고하고 싶어요"],
        "기타": ["기타 문의사항", "다른 문제가 있어요", "상담사와 연결하고 싶어요"],
        // 추가된 키워드와 질문들
        "마이페이지": ["회원정보 수정하기", "혜택 확인하기"],
        "가게": ["주변 가게 찾기", "가게 리뷰 작성하기"],
        "로그인": ["로그인 문제 해결하기", "회원가입 방법", ],
        "봉사활동": ["봉사활동 참여 방법", "봉사활동 관련 문의"],
        "멘토링": ["멘토링 신청 방법", "멘토링 관련 문의"],
        "글 작성": ["글 작성 방법", "글 수정하기"],
        "캘린더": ["일정 추가하기", "일정 확인하기",  "일정을 관리하고 싶어요"],
        "일정": ["일정 추가하기", "일정 확인하기",  "일정을 관리하고 싶어요"],
        "상담사": ["기타 문의 사항", "상담사와 연결하고 싶어요", "다른 문제가 있어요", "기술지원이 필요해요"],
        "에러": ["앱이 작동하지 않아요","기술 지원이 필요해요","버그를 신고하고 싶어요","다른 문제가 있어요", "상담사와 연결하고 싶어요"  ]
    };

    const botResponses: { [key: string]: string } = {
        "계정을 잊어버렸어요": "계정을 잊어버리셨군요. 복구 방법을 안내해드리겠습니다. 불편하시겠지만 다시 회원가입을 진행하심이 좋을 것 같습니다.",
        "계정을 삭제하고 싶어요": "계정을 삭제하시려면 다음 절차를 따라주세요. 개인정보 페이지에 가셔서 하단 회원 탈퇴 버튼을 누르시면 됩니다. 그동안 서비스를 이용해주셔서 감사합니다. ",
        "계정을 변경하고 싶어요": "계정을 변경하는 방법은 다음과 같습니다. 로그인 페이지에서 다른 소셜 로그인으로 접근하시면 됩니다. 감사합니다.",
        "앱이 작동하지 않아요": "죄송합니다.현재 투게더 앱의 보수작업을 하는 중입니다. 내일 오전 시스템을 재개하겠습니다. 이용에 불편을 드려서 죄송합니다.",
        "기술 지원이 필요해요": "기술 지원이 필요하시군요. 문제를 자세히 말씀해 주세요. 빠른 해결을 원하신다면 상담사와의 연결을 추천드립니다. 029998888",
        "버그를 신고하고 싶어요": "버그를 신고해 주셔서 감사합니다. 어떤 버그인가요? 빠른 해결을 원하신다면 상담사와의 연결을 추천드립니다. 029998888",
        "기타 문의사항": "기타 문의사항이 있으신가요? 말씀해 주세요. 빠른 해결을 원하신다면 상담사와의 연결을 추천드립니다. 029998888",
        "다른 문제가 있어요": "다른 문제가 있으시군요. 무엇인지 말씀해 주세요. 빠른 해결을 원하신다면 상담사와의 연결을 추천드립니다. 029998888",
        "상담사와 연결하고 싶어요": "상담사와 연결은 029998888로 전화주시면 바로 해결해드리겠습니다.",
        "일정을 관리하고 싶어요" : "우측 하단 사람 모양 이모티콘 누르시면 마이페이지에서 '월별 봉사 캘린더' 탭 누르시면 일정을 관리하실 수 있습니다.",
        "일정 추가하기": "우측 하단 사람 모양 이모티콘 누르시면 마이페이지에서 '월별 봉사 캘린더' 탭 누르시면 일정을 관리하실 수 있습니다.",
        "일정 확인하기": "우측 하단 사람 모양 이모티콘 누르시면 마이페이지에서 '월별 봉사 캘린더' 탭 누르시면 일정을 관리하실 수 있습니다.",
        "로그인 문제 해결하기" : "앱의 캐시를 삭제하거나 완전히 나간 후에 다시 이용해주시겠습니까?"
        // 추가된 응답들
    };

    useEffect(() => {
        const welcomeMessage: Message = { text: "안녕하세요! 무엇을 도와드릴까요?", isUser: false };
        setMessages([welcomeMessage]);
        resetTimer();
    }, []);

    const resetTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            const thankYouMessage: Message = { text: "이용해주셔서 감사합니다.", isUser: false };
            setMessages(messages => [...messages, thankYouMessage]);
            setTimeout(() => {
                if (inputText === '') {
                    const welcomeMessage: Message = { text: "안녕하세요! 무엇을 도와드릴까요?", isUser: false };
                    setMessages([welcomeMessage]);
                    setOptions([]);
                    setInputText('');
                }
            }, 1000);
        }, 12000);
    };


    const handleUserMessage = (message: string) => {
        const newUserMessage: Message = { text: message, isUser: true };

        if (specialResponses[message]) {
            setTimeout(() => {
                const newBotMessage: Message = { text: specialResponses[message], isUser: false };
                setMessages(messages => [...messages, newUserMessage, newBotMessage]);
                setIsTyping(false);
            }, 1000);
        } else {
            const keywords = Object.keys(predefinedQuestions);
            const foundKeyword = keywords.find(keyword => message.includes(keyword));

            if (foundKeyword) {
                setOptions(predefinedQuestions[foundKeyword]);
            } else {
                setIsTyping(true);
                setTimeout(() => {
                    const newBotMessage: Message = { text: "죄송합니다, 해당 문의에 대해 답변을 준비 중입니다.", isUser: false };
                    setMessages(messages => [...messages, newUserMessage, newBotMessage]);
                    setIsTyping(false);
                }, 1000);
            }
        }

        setInputText('');
        resetTimer(); // 타이머 재설정
    };

    const handleOptionClick = (option: string) => {
        const newUserMessage: Message = { text: option, isUser: true };
        setIsTyping(true);

        setTimeout(() => {
            const botMessageText = botResponses[option] || "죄송합니다, 해당 문의에 대해 답변을 준비 중입니다.";
            const newBotMessage: Message = { text: botMessageText, isUser: false };
            setMessages(messages => [...messages, newUserMessage, newBotMessage]);
            setIsTyping(false);
        }, 1000); // 1초 후에 응답 추가
        setOptions([]);
        resetTimer(); // 타이머 재설정
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim() !== '') {
            handleUserMessage(inputText.trim());
        }
    };

    useEffect(() => {
        const chatWindow = document.getElementById('chat-window');
        if (chatWindow) {
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    }, [messages]);

    const specialResponses: { [key: string]: string } = {
        "고마워": "즐거웠습니다.",
        "안녕": "안녕히가십시오."
    };
    return (
        <div className="chatbot-container">
            <div id="chat-window" className="chat-window">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
                        {message.isUser ? (
                            <div className="message-text user">{message.text}</div>
                        ) : (
                            <div className="message-text bot">
                                {isTyping && !message.isUser ? (
                                    <span className="typing">상담사가 타이핑 중입니다...</span>
                                ) : (
                                    <span>{message.text}</span>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="input-form">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="메시지를 입력하세요"
                    className="input-text"
                />
            </form>
            {options.length > 0 && (
                <div className="options-container">
                    {options.map((option, index) => (
                        <button key={index} onClick={() => handleOptionClick(option)} className="option-button">
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InteractiveChatBot;
