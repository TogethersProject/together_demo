import React, { useState, useEffect, useRef } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useRouter } from 'next/router';
import '../styles/Login.css';
import axios from "axios"; // Import CSS file for styles

const Login: React.FC = () => {
    const signInMemberURL = "http://localhost:9000/member/loginCheck"
    const signUpURL = "http://loclahost:9000/member/writeMember"

    const [tab, setTab] = useState<'sign-in' | 'sign-up'>('sign-in');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const [codeStatus, setCodeStatus] = useState(false); // null, 'correct', or 'incorrect'

    // State for email verification
    const [isVerified, setIsVerified] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');

    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleAddressSearch = (data: any) => {
        setAddress(data.address);
        setIsPostcodeOpen(false);
    };

    const togglePostcode = () => {
        setIsPostcodeOpen(!isPostcodeOpen);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        const member_id = (document.getElementById('user-signin') as HTMLInputElement).value;
        const member_pwd = (document.getElementById('pass-signin') as HTMLInputElement).value;
        const signInDTO = {member_id, member_pwd}
        console.log("id: " +member_id + " / member_pwd: " + member_pwd);

        fetch(signInMemberURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signInDTO)
        })
            .then(response => response.json())
            .then(data => {
                const { accessToken, grantType, refreshToken } = data;

                console.log("accessToken: " + accessToken);
                console.log("grantType: " + grantType);
                console.log("refreshToken: " + refreshToken);

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('grantType', grantType);
                localStorage.setItem('refreshToken', refreshToken);

                setIsLoggedIn(true);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', member_id); // Save username

                alert('로그인 성공!');
            })
            .catch(error => {
                alert("로그인 실패!!");
                console.log(error);
            });

        router.push('/Mypage');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('username'); // Remove username
    };

    const handleHomeClick = () => {
        router.push('/First');
    };

    const handleProfileClick = () => {
        router.push('/Mypage');
    };

    const handleSettingsClick = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleSidebarLinkClick = (path: string) => {
        setSidebarOpen(false);
        router.push(path);
    };

    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setSidebarOpen(false);
        }
    };

    //회원가입 제출 - 바로 로그인 되도록
    const handleSignUpSubmit = () => {
        const member_id = document.getElementById('id');
        const member_name = document.getElementById('name')
        const member_pwd = document.getElementById('pass-signup')
        const member_email = document.getElementById('email-signup');
        const member_address = address;
        const member_addressDetail = detailAddress;
        const member = {member_id, member_pwd, member_name, member_email, member_address, member_addressDetail};

        const member_pwdChk = document.getElementById('pass-confirm');
        const member_emailChk = document.getElementById('verification-code');
        if((member_email === member_emailChk ) && (member_pwd === member_emailChk)){
            console.log(member_email + " = " + member_emailChk +" / " + member_pwd +" = " )

            axios.post(signUpURL, member)
                .then( (res) => {
                    console.log(res.data)

                    const username = (document.getElementById('name') as HTMLInputElement).value;
                    setIsLoggedIn(true);
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('username', username); // Save username

                    router.push('/First');
                }).catch(err => console.log(err))
        }

    };

    const naverURL = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=cr9KdwLzvG1E2Y2rcKtf&state=test&redirect_uri=http://localhost:9000/member/snsLogin";
    const onNaver = (e) => {
        e.preventDefault();

        axios.get(naverURL)//data, header x
            .then(res => {
                console.log(res.data);
                localStorage.set("username", "뭐야");
            }).catch(err => console.log(err))
    }

    const sendEmailURL = "http://localhost:9000/member/sendEmail"
    // Handle email verification
    const handleVerifyClick = () => {
        // Logic to send verification code to the email
        const email = (document.getElementById('email-signup') as HTMLInputElement).value;
        console.log("이메일: " + email);
        const encodedEmail = encodeURIComponent(email);

        axios.post(sendEmailURL, encodedEmail)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        setIsVerified(true);
    };

    const handleCodeChange = (e) => {
        setVerificationCode(e.target.value);
    };
    const mailCodeSubmit = "http://localhost:9000/member/isEmail"
    const handleCodeSubmit = () => {
        // 백엔드와 통신하여 입력한 인증 번호가 맞는지 확인
        const email = (document.getElementById('email-signup') as HTMLInputElement).value;
        const encodedEmail = encodeURIComponent(email);
        const authcode = (document.getElementById('verification-code') as HTMLInputElement).value;
        const encodedAuthcode = encodeURIComponent(authcode);
        axios.get(mailCodeSubmit, {
            params: {
                encodedEmail,
                encodedAuthcode
            }
        })
            .then(res => {
                console.log(res.data)
                res.data && setCodeStatus(true);
                res.data || setCodeStatus(false);
            })
            .catch(err => console.log(err));

        // const isCodeCorrect = verificationCode === '123456'; // 백엔드에서 받은 코드와 비교
        //
        // if (isCodeCorrect) {
        //     setCodeStatus(true);
        // } else {
        //     setCodeStatus(false);
        // }
    };

    return (
        <div className={`main-screen ${isSidebarOpen ? 'sidebar-open' : ''}`} onClick={isSidebarOpen ? handleOutsideClick : undefined}>
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} ref={sidebarRef}>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Search')}>Search</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Login')}>Login</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Mypage')}>My</div>
                <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Chat')}>ChatBot</div>
            </div>
            <div className="body-wrapper">
                <div className="login-wrap">
                    <div className="login-html">
                        <input
                            id="tab-1"
                            type="radio"
                            name="tab"
                            className="radio sign-in"
                            checked={tab === 'sign-in'}
                            onChange={() => setTab('sign-in')}
                        />
                        <label htmlFor="tab-1" className="tab" onClick={() => setTab('sign-in')}>
                            로그인
                        </label>
                        <input
                            id="tab-2"
                            type="radio"
                            name="tab"
                            className="radio sign-up"
                            checked={tab === 'sign-up'}
                            onChange={() => setTab('sign-up')}
                        />
                        <label htmlFor="tab-2" className="tab" onClick={() => setTab('sign-up')}>
                            회원가입
                        </label>
                        <div className="login-form">
                            <div className="sign-in-html"
                                 style={{transform: tab === 'sign-in' ? 'rotateY(0deg)' : 'rotateY(-180deg)'}}>
                                <div className="group">
                                    <label htmlFor="user-signin" className="label">
                                        아이디
                                    </label>
                                    <input id="user-signin" type="id" className="input"/>
                                </div>
                                <div className="group">
                                    <label htmlFor="pass-signin" className="label">
                                        비밀번호
                                    </label>
                                    <input
                                        id="pass-signin"
                                        type="password"
                                        className="input"
                                        data-type="password"
                                    />
                                </div>
                                <div className="group">
                                    <input
                                        type="button"
                                        className="button"
                                        value="로그인"
                                        onClick={handleLoginSubmit}
                                    />
                                </div>
                                <div className="hr"></div>
                                <div className="foot-lnk">
                                    <a href="#">비밀번호 찾기</a>
                                </div>

                                <div className="social-login">
                                    <a className="social-btn" href="https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=cr9KdwLzvG1E2Y2rcKtf&state=test&redirect_uri=http://localhost:9000/member/snsLogin">
                                        <img src="/images/naver-logo.webp" alt="네이버 로그인" className="social-logo"/>
                                    </a>
                                    <a href="#" className="social-btn">
                                        <img src="/images/kakao-logo.webp" alt="카카오 로그인" className="social-logo"/>
                                    </a>
                                    <a href="#" className="social-btn">
                                        <img src="/images/google-logo.png" alt="구글 로그인" className="social-logo"/>
                                    </a>
                                </div>
                            </div>

                            <div className="sign-up-html"
                                 style={{transform: tab === 'sign-up' ? 'rotateY(0deg)' : 'rotateY(180deg)'}}>
                                <div className="group">
                                    <label htmlFor="user-signup" className="label">
                                        아이디
                                    </label>
                                    <input id="user-signup" type="id" className="input"/>
                                </div>
                                <div className="group">
                                    <label htmlFor="email-signup" className="label">
                                        이메일
                                    </label>
                                    <input id="email-signup" type="email" className="input"/>
                                    <button type="button" onClick={handleVerifyClick}>
                                        인증하기
                                    </button>
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
                                            {codeStatus === true && <span className="correct">✔️</span>}
                                            {codeStatus === false && <span className="incorrect">❌</span>}
                                        </div>
                                    )}
                                </div>
                                <div className="group">
                                    <label htmlFor="pass-signup" className="label">
                                        비밀번호
                                    </label>
                                    <input
                                        id="pass-signup"
                                        type="password"
                                        className="input"
                                        data-type="password"
                                    />
                                </div>
                                <div className="group">
                                    <label htmlFor="pass-confirm" className="label">
                                        비밀번호 확인
                                    </label>
                                    <input
                                        id="pass-confirm"
                                        type="password"
                                        className="input"
                                        data-type="password"
                                    />
                                </div>
                                <div className="group">
                                    <label htmlFor="name" className="label">
                                        이름
                                    </label>
                                    <input id="name" type="text" className="input"/>
                                </div>
                                <div className="group">
                                    <label htmlFor="address" className="label">
                                        주소
                                    </label>
                                    <input
                                        id="address"
                                        type="text"
                                        className="input"
                                        value={address}
                                        readOnly
                                    />
                                    <button type="button" className="postcode-button" onClick={togglePostcode}>
                                        주소 검색
                                    </button>
                                    {isPostcodeOpen && (
                                        <div className="postcode-wrapper">
                                            <DaumPostcode onComplete={handleAddressSearch}/>
                                        </div>
                                    )}
                                </div>
                                <div className="group">
                                    <label htmlFor="detail-address" className="label">
                                        상세 주소
                                    </label>
                                    <input
                                        id="detail-address"
                                        type="text"
                                        className="input"
                                        value={detailAddress}
                                        onChange={(e) => setDetailAddress(e.target.value)}
                                    />
                                </div>
                                <div className="group">
                                    <input
                                        type="button"
                                        className="button"
                                        value="회원가입"
                                        onClick={handleSignUpSubmit}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <div className="footer-icon" onClick={handleSettingsClick}>
                        =
                    </div>
                    <div className="footer-icon" onClick={handleHomeClick}>
                        🏠
                    </div>
                    <div className="footer-icon" onClick={handleProfileClick}>
                        👤
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Login;
