import React, {useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import '../styles/My.css';
import DaumPostcode from 'react-daum-postcode';
import axios from "axios";

const My: React.FC = () => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [provider, setProvider] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
    const getUserURL = "http://localhost:9000/member/getMemberInfo";
    const sidebarRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        //http header(accessToken) body(member_id) -> MemberDTO
        //const isLoggedIn = localStorage.getItem("isLoggedIn");
        const member_id = localStorage.getItem("username");
        const bearer: string | null = localStorage.getItem("grantType");
        const accessToken: string | null = localStorage.getItem("accessToken");
        let headers: { [key: string]: string } = {};
        if (bearer !== null && accessToken !== null) {
            headers = { Authorization: `${bearer}${accessToken}` };
        }
        console.log(member_id)
        axios.post(getUserURL, member_id, {headers:headers})
            .then( res => {
                console.log(res.data);

                const storedUsername = res.data.member_name
                const storedEmail = res.data.member_email;
                const storedAddress = res.data.member_address;
                const storedDetailAddress = res.data.member_addressDetail;
                const storedPwd = res.data.member_pwd;
                const storedProvider = res.data.provider;

                if (storedUsername) setUsername(storedUsername);
                if (storedEmail) setEmail(storedEmail);
                if (storedAddress) setAddress(storedAddress);
                if (storedDetailAddress) setDetailAddress(storedDetailAddress);
                if (storedPwd) setPassword(storedPwd);
                if (storedProvider)setProvider(storedProvider+"로 가입한 계정입니다.");
            }).catch(err => console.log(err))

    }, []);

    const updateURL = "http://localhost:9000/member/updateMember"
    const handleSave = (e) => {
        //http header(accessToken) body(MemberDTO) -> void
        e.preventDefault();
        //const isLoggedIn = localStorage.getItem("isLoggedIn");
        const member_id = localStorage.getItem("username");
        const bearer: string | null = localStorage.getItem('grantType');
        const accessToken: string | null = localStorage.getItem('accessToken');
        let headers: { [key: string]: string } = {};
        if (bearer !== null && accessToken !== null) {
            headers = { Authorization: `${bearer}${accessToken}` };
        }

        const memberDTO ={member_id:member_id, member_email:email, member_name:username, member_pwd:password, member_address:address, member_addressDetail:detailAddress}
        //회원 정보 수정.
        axios.post(updateURL, memberDTO, {headers:headers})
            .then(res => {
                setShowModal(true)
            })
            .catch(err => console.log(err))
        // localStorage.setItem('username', username);
        // localStorage.setItem('email', email);
        // localStorage.setItem('address', address);
        // localStorage.setItem('detailAddress', detailAddress);

        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
            router.push('/First');
        }, 1000);
    };

    const handleLogout = () => {
        // localStorage.setItem('isLoggedIn', 'false');
        // localStorage.removeItem('username');
        // localStorage.removeItem('email');
        // localStorage.removeItem('address');
        // localStorage.removeItem('detailAddress');

        localStorage.clear();
        router.push('/Login');
    };

    const handleHomeClick = () => {
        router.push('/First');
    };
    const handleFirstImageClick = () => {
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
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
            setSidebarOpen(false);
        }
    };
    const handleAddressSearch = (data: any) => {
        setAddress(data.address);
        setIsPostcodeOpen(false);
    };
    const togglePostcode = () => {
        setIsPostcodeOpen(!isPostcodeOpen);
    };
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleAlertClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

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

    const deleteURL = "http://localhost:9000/member/deleteMember";
    const handleDelete = (e) => {
        e.preventDefault();
        //const isLoggedIn = localStorage.getItem("isLoggedIn");
        const naverAccessToken = localStorage.getItem("naverAccessToken")
        const member_id = localStorage.getItem("username");
        const bearer: string | null = localStorage.getItem('grantType');
        const accessToken: string | null = localStorage.getItem('accessToken');
        let headers: { [key: string]: string } = {};
        if (bearer !== null && accessToken !== null) {
            headers = { Authorization: `${bearer}${accessToken}` };
        }
        
        //회원 탈퇴.
        axios.post(deleteURL, null, {params: {member_id, naverAccessToken},headers:headers})
            .then(res => {
                console.log(res.data)
                // alert("탈퇴 완")
                //
                //localStorage 내부 정보 제거.
                localStorage.clear();
                
                // 페이지 이동
                router.push('/First');
            })
            .catch(err => console.log(err))
        
    }
    return (
        <div className="container">
            <div className={`main-screen ${isSidebarOpen ? 'sidebar-open' : ''}`}
                 onClick={isSidebarOpen ? handleOutsideClick : undefined}>
                <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} ref={sidebarRef}>
                    <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Search')}>Search</div>
                    <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Login')}>Login</div>
                    <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/My')}>My</div>
                    <div className="sidebar-link" onClick={() => handleSidebarLinkClick('/Chat')}>ChatBot</div>
                </div>
                <div className="header">
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
                </div>
                <div className="content">
                    <div className="intro">
                        <h1>개인정보 수정 및 확인</h1>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">이름</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if (provider === '') {
                                    setUsername(e.target.value);
                                }
                            }}
                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="username">비밀번호</label>
                        {(provider == '')
                            && <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                            || <input type="text" value={provider} />
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                        />
                    </div>
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <button onClick={handleSave}>저장</button>
                    <button onClick={handleLogout} className="logout-button">로그아웃</button>
                    <button onClick={handleDelete}>회원탈퇴</button>
                </div>
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            정보가 저장되었습니다.
                        </div>
                    </div>
                )}
                <footer className="footer">
                    <div className="footer-icon" onClick={handleSettingsClick}>=</div>
                    <div className="footer-icon" onClick={handleHomeClick}>🏠</div>
                    <div className="footer-icon" onClick={handleProfileClick}>👤</div>
                </footer>
            </div>
        </div>
    );
};

export default My;
