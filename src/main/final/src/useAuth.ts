import { useState } from 'react';

// 가짜 사용자 인증 훅
export const useAuth = () => {
    // 가짜로 로그인 상태를 관리합니다.
    const [loggedIn, setLoggedIn] = useState(false);

    // 로그인 함수
    const login = (email: string, password: string) => {
        // 여기서는 가짜로 인증을 진행하는데, 실제로는 서버와 통신하여 사용자를 인증해야 합니다.
        if (email === 'example@example.com' && password === 'password') {
            setLoggedIn(true);
        } else {
            throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
    };

    // 로그아웃 함수
    const logout = () => {
        setLoggedIn(false);
    };

    // 로그인 상태 확인 함수
    const isLoggedIn = () => {
        return loggedIn;
    };

    // 인증 관련 함수들을 객체로 반환합니다.
    return {
        login,
        logout,
        isLoggedIn
    };
};
