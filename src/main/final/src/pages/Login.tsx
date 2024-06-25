import React, { useState, useEffect, useRef } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useRouter } from 'next/router';
import '../styles/Login.css';
import axios from "axios";
import Image from "next/image"; // Import CSS file for styles

const Login: React.FC = () => {
    const signInMemberURL = "http://localhost:9000/member/loginCheck"
    const signUpURL = "http://localhost:9000/member/writeMember"
    const sendEmailURL = "http://localhost:9000/member/sendEmail"
    const mailCodeSubmit = "http://localhost:9000/member/isEmail"
    const idCheckURL = "http://localhost:9000/member/idCheck";


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

    const [username, setUsername] = useState<string>('');
    const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown status
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
                localStorage.setItem('nickname', member_id); // 나중에 아이디 말고 닉네임으로 바꿔주기.
                console.log("넣어-username(login): " + member_id)
                router.push('/Mypage');
                //alert('로그인 성공!');
            })
            .catch(error => {
                //alert("로그인 실패!!");
                console.log(error);
                router.push('/Login');
            });
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
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const checkDuplicate = async () => {
        try {
            const response = await axios.post(idCheckURL, username);
            console.log(response.data);
            setIsDuplicate(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    //회원가입 제출 - 바로 로그인 되도록
    const handleSignUpSubmit = (e) => {
        //e.preventDefault();
        console.log("클릭")
        const member_id = (document.getElementById('user-signup') as HTMLInputElement).value;
        const member_name = (document.getElementById('name') as HTMLInputElement).value
        const member_pwd = (document.getElementById('pass-signup') as HTMLInputElement).value
        const member_email = (document.getElementById('email-signup') as HTMLInputElement).value;
        const member_address = address;
        const member_addressDetail = detailAddress;


        const member_pwdChk = (document.getElementById('pass-confirm')as HTMLInputElement).value;
        const member_emailChk = (document.getElementById('verification-code')as HTMLInputElement).value;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/;
        if (!passwordRegex.test(member_pwd)) {
            // 비밀번호가 8~15자의 영문 및 숫자가 아닌 경우
            return null;
        }else if(codeStatus && (member_pwd === member_pwdChk) && !isDuplicate){
            console.log(member_email + " = " + member_emailChk +" / " + member_pwd +" = " )
            const member = {member_id, member_pwd, member_name, member_email, member_address, member_addressDetail};
            console.log(member)

            axios.post(signUpURL, member)
                .then( (res) => {
                    console.log(res.data)

                    const username = (document.getElementById('name') as HTMLInputElement).value;
                    setIsLoggedIn(true);
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('username', username); // Save username
                    console.log("넣어-username(login): " + username)
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
    };

    // 클릭 이벤트 핸들러
    async function handleNaverLogin() {
        try {
            // Naver OAuth2 인증 URL 생성
            const clientId = 'cr9KdwLzvG1E2Y2rcKtf';
            const redirectUri = 'http://localhost:9000/member/snsLogin';
            const state = 'test';
            const authUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${redirectUri}`;

            // Axios를 사용하여 Naver 인증 페이지로 리디렉션
            //console.log('이동합니다')
            window.location.href = authUrl;
            //console.log('이동했습니다')

        } catch (error) {
            console.error('Naver 로그인 에러:', error);
        }
    }
    const handleFirstImageClick = () => {
        router.push('/First');
    };
    const hadleBehindClick = () => {
        router.push('/First')
    }

    return (
        <div className="main-screen">
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
                                    <a href="/Password">비밀번호 찾기</a>
                                </div>

                                <div className="social-login">
                                    <a className="social-btn" onClick={handleNaverLogin}>
                                        <img src="/images/btnG_아이콘원형.png" alt="네이버 로그인" className="social-logo"/>
                                    </a>
                                    <a href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=7c9f68f8d72d792f0afc13c42883c924&redirect_uri=http://localhost:9000/member/kakaoLogin"
                                       className="social-btn">
                                        <img src="/images/kakao-logo.webp" alt="카카오 로그인" className="social-logo"/>
                                    </a>
                                </div>
                            </div>

                            <div className="sign-up-html"
                                 style={{transform: tab === 'sign-up' ? 'rotateY(0deg)' : 'rotateY(180deg)'}}>
                                <div className="group">
                                    <label htmlFor="user-signup" className="label">
                                        아이디
                                    </label>
                                    <input
                                        id="user-signup"
                                        type="text"
                                        className="input"
                                        value={username}
                                        onChange={handleInputChange}
                                    />
                                    <button onClick={checkDuplicate} className="check-duplicate-button">
                                        중복 확인
                                    </button>
                                    {isDuplicate !== null && (
                                        <div className="duplicate-check-result">
                                            {isDuplicate ? '아이디가 중복됩니다.' : '아이디를 사용할 수 있습니다.'}
                                        </div>
                                    )}
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
                                        placeholder="영문 및 숫자를 포함한 8~15자로 작성해주세요."
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
            </div>
            <footer className="footer">
                <div className="footer-icon" onClick={hadleBehindClick}>🔙</div>
                <div className="footer-icon" onClick={handleHomeClick}>🏠</div>
                <div className="footer-icon" onClick={handleProfileClick}>👤</div>
            </footer>
        </div>
    );
};

export default Login;
