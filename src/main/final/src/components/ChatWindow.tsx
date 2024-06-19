// components/ChatWindow.tsx

import React, { useState, useEffect } from 'react';

type Message = {
    text: string;
    isUser: boolean;
};

const ChatWindow: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false); // 상담사가 타이핑 중인지 여부

    const botResponses = [
        "네, 무엇을 도와드릴까요?",
        "죄송합니다, 그 질문에 대해서는 좀 더 자세히 알려주시겠어요?",
        "해당 내용에 대해 답변을 준비 중입니다. 잠시만 기다려주세요.",
        "이해가 잘 되지 않네요. 다시 말해주실 수 있나요?"
    ];

    useEffect(() => {
        // 처음 채팅창에 인사 메시지 추가
        const welcomeMessage: Message = { text: botResponses[0], isUser: false };
        setMessages([welcomeMessage]);
    }, []);

    const handleUserMessage = (message: string) => {
        const newUserMessage: Message = { text: message, isUser: true };
        setMessages([...messages, newUserMessage]);
        setIsTyping(true);

        // 일정 시간 후에 챗봇 응답 추가 (랜덤)
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * botResponses.length);
            const newBotMessage: Message = { text: botResponses[randomIndex], isUser: false };
            setMessages([...messages, newBotMessage]);
            setIsTyping(false);
        }, 1000); // 1초 후에 응답 추가
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim() !== '') {
            handleUserMessage(inputText.trim());
            setInputText('');
        }
    };

    useEffect(() => {
        // 대화창 스크롤을 항상 아래로 유지
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
        </div>
    );
};

export default ChatWindow;
