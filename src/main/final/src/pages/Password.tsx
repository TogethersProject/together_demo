import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import '../styles/Password.css';
import axios from "axios"; // Password.css 파일을 추가하여 스타일링을 하도록 합니다.

const Password: React.FC = () => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [newPassword, setNewPassword] = useState(''); // newPassword 변수 추가
    const [confirmPassword, setConfirmPassword] = useState(''); // confirmPassword 변수 추가
    const [changeSuccess, setChangeSuccess] = useState(false);
    const sendEmailURL = "http://localhost:9000/member/findPassword"
    const checkEmailURL = "http://localhost:9000/member/findPasswordCheck"
    const [isVerified, setIsVerified] = useState(false);
    const [codeStatus, setCodeStatus] = useState(false); // null, 'correct', or 'incorrect'
    const [verificationCode, setVerificationCode] = useState('');


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
    const handleCodeChange = (e) => {
        setVerificationCode(e.target.value);
    };
    const handleFirstImageClick = () => {
        router.push('/First');
    };

    const handleEmailSubmit = () => {
        // 여기서 이메일 인증 API 호출하고 인증 결과를 처리
        // 이메일로 코드 전송
        const encodedEmail = encodeURIComponent(email);
        console.log(email);

        axios.post(sendEmailURL, email)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        setIsVerified(true);
        // 예시로 간단히 설정
        if (email === 'example@email.com') {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    };
    const handleCodeSubmit = () => {
        // 백엔드와 통신하여 입력한 인증 번호가 맞는지 확인
        const encodedEmail = email;
        const encodedCode = (document.getElementById('verification-code') as HTMLInputElement).value;
        console.log("보낸다"+email+ encodedCode)
        axios.post(checkEmailURL, {
                encodedEmail,
                encodedCode
        })
            .then(res => {
                console.log(res.data)
                res.data && setCodeStatus(true);
                res.data && setIsAuthenticated(true)
                res.data || setCodeStatus(false);
            })
            .catch(err => console.log(err));
    };

    const changePassURL = "http://localhost:9000/member/changePassword"
    const handleChangePassword = () => {
        // 여기서 비밀번호 변경 API 호출하고 변경 결과를 처리
        const password = newPassword;
        axios.post(changePassURL, {
                password,
                email
        })
            .then(res => {
                setChangeSuccess(true)
                setTimeout(() => {
                    setChangeSuccess(false);
                }, 2000);
            })
            .catch(err => console.log(err));

    };
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
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
    const handleAlertClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
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
                <div>
                    <h2>비밀번호 변경</h2>
                    <div>
                        <label>이메일:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={codeStatus ? () => {
                            } : (e) => setEmail(e.target.value)}
                            required
                            disabled={codeStatus}
                        />
                        <button onClick={handleEmailSubmit}>인증하기</button>
                        {isVerified && (
                            <div className="verification-group">
                                <label htmlFor="verification-code" className="label">
                                    인증번호를 입력하세요
                                </label>
                                <input
                                    id="verification-code"
                                    type="text"
                                    className="input"
                                    value={verificationCode}
                                    onChange={handleCodeChange}
                                />
                                <button type="button" onClick={handleCodeSubmit}>
                                    확인
                                </button>
                                {codeStatus === true && <span>인증되었습니다. </span>}
                                {codeStatus === false && <span>인증되지 않았습니다. </span>}
                            </div>
                        )}
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
                            <button
                                onClick={handleChangePassword}
                                disabled={newPassword !== confirmPassword}
                            >
                            변경하기
                            </button>
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
