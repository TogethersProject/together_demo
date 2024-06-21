// components/InteractiveChatBot.tsx
import React, { useState, useEffect } from 'react';

type Message = {
    text: string;
    isUser: boolean;
};

const InteractiveChatBot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [options, setOptions] = useState<string[]>([]);

    const predefinedQuestions: { [key: string]: string[] } = {
        "계정": ["계정을 잊어버렸어요", "계정을 삭제하고 싶어요", "계정을 변경하고 싶어요"],
        "기술": ["앱이 작동하지 않아요", "기술 지원이 필요해요", "버그를 신고하고 싶어요"],
        "기타": ["기타 문의사항", "다른 문제가 있어요", "상담사와 연결하고 싶어요"]
    };

    const botResponses: { [key: string]: string } = {
        "계정을 잊어버렸어요": "계정을 잊어버리셨군요. 복구 방법을 안내해드리겠습니다.",
        "계정을 삭제하고 싶어요": "계정을 삭제하시려면 다음 절차를 따라주세요.",
        "계정을 변경하고 싶어요": "계정을 변경하는 방법은 다음과 같습니다.",
        "앱이 작동하지 않아요": "앱이 작동하지 않나요? 어떤 문제가 있나요?",
        "기술 지원이 필요해요": "기술 지원이 필요하시군요. 문제를 자세히 말씀해 주세요.",
        "버그를 신고하고 싶어요": "버그를 신고해 주셔서 감사합니다. 어떤 버그인가요?",
        "기타 문의사항": "기타 문의사항이 있으신가요? 말씀해 주세요.",
        "다른 문제가 있어요": "다른 문제가 있으시군요. 무엇인지 말씀해 주세요.",
        "상담사와 연결하고 싶어요": "상담사와 연결해드리겠습니다. 잠시만 기다려주세요."
    };

    useEffect(() => {
        const welcomeMessage: Message = { text: "안녕하세요! 무엇을 도와드릴까요?", isUser: false };
        setMessages([welcomeMessage]);
    }, []);

    const handleUserMessage = (message: string) => {
        const newUserMessage: Message = { text: message, isUser: true };
        setMessages([...messages, newUserMessage]);

        const keywords = Object.keys(predefinedQuestions);
        const foundKeyword = keywords.find(keyword => message.includes(keyword));

        if (foundKeyword) {
            setOptions(predefinedQuestions[foundKeyword]);
        } else {
            setIsTyping(true);
            setTimeout(() => {
                const newBotMessage: Message = { text: "죄송합니다, 해당 문의에 대해 답변을 준비 중입니다.", isUser: false };
                setMessages([...messages, newUserMessage, newBotMessage]);
                setIsTyping(false);
            }, 1000); // 1초 후에 응답 추가
        }

        setInputText('');
    };

    const handleOptionClick = (option: string) => {
        const newUserMessage: Message = { text: option, isUser: true };
        setMessages([...messages, newUserMessage]);
        setIsTyping(true);

        setTimeout(() => {
            const botMessageText = botResponses[option] || "죄송합니다, 해당 문의에 대해 답변을 준비 중입니다.";
            const newBotMessage: Message = { text: botMessageText, isUser: false };
            setMessages([...messages, newUserMessage, newBotMessage]);
            setIsTyping(false);
        }, 1000); // 1초 후에 응답 추가
        setOptions([]);
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

    return (
        <div>
            <div id="chat-window" style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                {messages.map((message, index) => (
                    <div key={index} style={{ marginBottom: '5px' }}>
                        {message.isUser ? (
                            <div style={{ textAlign: 'right', fontWeight: 'bold' }}>{message.text}</div>
                        ) : (
                            <div style={{ textAlign: 'left' }}>
                                {isTyping && !message.isUser ? (
                                    <span style={{ color: '#ccc', fontStyle: 'italic' }}>상담사가 타이핑 중입니다...</span>
                                ) : (
                                    <span>{message.text}</span>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="메시지를 입력하세요"
                    style={{ width: '100%', padding: '8px' }}
                />
            </form>
            {options.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                    {options.map((option, index) => (
                        <button key={index} onClick={() => handleOptionClick(option)} style={{ width: '100%', padding: '8px', marginBottom: '5px' }}>
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InteractiveChatBot;
