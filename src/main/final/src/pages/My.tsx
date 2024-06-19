import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import '../styles/My.css';
import axios from "axios";

const My: React.FC = () => {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [showModal, setShowModal] = useState(false);

    const getUserURL = "http://localhost:9000/member/getMemberInfo";
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

                if (storedUsername) setUsername(storedUsername);
                if (storedEmail) setEmail(storedEmail);
                if (storedAddress) setAddress(storedAddress);
                if (storedDetailAddress) setDetailAddress(storedDetailAddress);
                if (storedPwd) setPassword(storedPwd);
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
                console.log(res.data)
                alert("수정 완")
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
                alert("탈퇴 완")

                //localStorage 내부 정보 제거.
                localStorage.clear();
                
                // 페이지 이동
            })
            .catch(err => console.log(err))
        
    }
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
                <Image src="/images/image-23.png" alt="search" width={40} height={40} />
                <div className="center-image-container">
                    <Image src="/images/first.png" alt="First Image" width={120} height={45} />
                </div>
                <Image src="/images/alert.png" alt="alert" className="alert-icon" width={50} height={50} />
            </header>
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
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">이메일</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">주소</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="detailAddress">상세 주소</label>
                    <input
                        type="text"
                        id="detailAddress"
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
    );
};

export default My;
