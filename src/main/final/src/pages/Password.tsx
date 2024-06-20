import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import '../styles/Password.css'; // Password.css 파일을 추가하여 스타일링을 하도록 합니다.

const Password: React.FC = () => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [newPassword, setNewPassword] = useState(''); // newPassword 변수 추가
    const [confirmPassword, setConfirmPassword] = useState(''); // confirmPassword 변수 추가
    const [changeSuccess, setChangeSuccess] = useState(false);


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

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleFirstImageClick = () => {
        router.push('/First');
    };

    const handleEmailSubmit = () => {
        // 여기서 이메일 인증 API 호출하고 인증 결과를 처리
        // 예시로 간단히 설정
        if (email === 'example@email.com') {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    };

    const handleChangePassword = () => {
        // 여기서 비밀번호 변경 API 호출하고 변경 결과를 처리
        // 예시로 간단히 설정
        if (newPassword === confirmPassword) {
            // 비밀번호 변경 성공
            setChangeSuccess(true);
            setTimeout(() => {
                setChangeSuccess(false);
                // 여기서 로그인 페이지로 이동하는 코드 추가
                // 예시로는 window.location.href 사용
                window.location.href = '/Login';
            }, 3000); // 3초 후에 자동으로 로그인 페이지로 이동
        } else {
            // 비밀번호가 일치하지 않음을 사용자에게 알림
            alert('비밀번호가 일치하지 않습니다.');
        }
    };


    return (
        <div
            className={`main-screen ${isSidebarOpen ? 'sidebar-open' : ''}`}
            onClick={isSidebarOpen ? handleOutsideClick : undefined}
        >
            <div className="sidebar">
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Search')}>Search</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Login')}>Login</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/My')}>My</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Chat')}>ChatBot</div>
            </div>
            <header className="header">
                <Image src="/images/image-23.png" alt="search" width={40} height={40}/>
                <div className="center-image-container" onClick={handleFirstImageClick} style={{cursor: 'pointer'}}>
                    <Image className="center-image" src="/images/first.png" alt="투게더!" width={120} height={45}/>
                </div>
                <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50}/>
            </header>
            <div className="content">
                <div>
                    <h2>비밀번호 변경</h2>
                    <div>
                        <label>이메일:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button onClick={handleEmailSubmit}>인증하기</button>
                        <br/>
                        {isAuthenticated ? <span>인증되었습니다. </span> : <span>인증되지 않았습니다. </span>}
                    </div>
                    {isAuthenticated && (
                        <div>
                            <label>새 비밀번호:</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <label>비밀번호 확인:</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button onClick={handleChangePassword}>변경하기</button>
                        </div>
                    )}
                    {changeSuccess && (
                        <div className="modal">
                            <p>비밀번호 변경이 완료되었습니다.</p>
                        </div>
                    )}
                </div>
            </div>
            <footer className="footer">
                <div className="footer-icon" onClick={handleSettingsClick}>=</div>
                <div className="footer-icon" onClick={() => router.push('/First')}>🏠</div>
                <div className="footer-icon" onClick={() => router.push('/Mypage')}>👤</div>
            </footer>
        </div>
    );
};

export default Password;
