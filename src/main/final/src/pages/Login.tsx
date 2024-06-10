import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

interface HtmlProps {
    active: boolean;
}

const BodyWrapper = styled.div`
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
`;

const LoginWrap = styled.div`
    width: 360px;
    height: 800px;
    position: relative;
    background: #fff;
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;
`;

const LoginHtml = styled.div`
    width: 100%;
    height: 100%;
    padding: 90px 70px 50px 70px;
    background: #f0f0f0;
    box-sizing: border-box;
    position: absolute;
`;

const Radio = styled.input`
    display: none;

    &:checked + label {
        color: #0070f3;
        border-bottom: 2px solid #0070f3;
    }
`;

const Tab = styled.label`
    display: inline-block;
    margin: 0 15px 10px 0;
    padding-bottom: 10px;
    font-size: 22px;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
    color: #999;
    border-bottom: 2px solid transparent;
`;

const LoginForm = styled.div`
    min-height: 345px;
    position: relative;
    perspective: 1000px;
    transform-style: preserve-3d;
`;

const SignInHtml = styled.div<HtmlProps>`
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    backface-visibility: hidden;
    transform: ${(props) => (props.active ? 'rotateY(0deg)' : 'rotateY(-180deg)')};
    transition: all 0.4s linear;
`;

const SignUpHtml = styled.div<HtmlProps>`
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    backface-visibility: hidden;
    transform: ${(props) => (props.active ? 'rotateY(0deg)' : 'rotateY(180deg)')};
    transition: all 0.4s linear;
`;

const Group = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    margin-bottom: 5px;
    display: block;
    color: #333;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Check = styled.input`
    margin-right: 5px;
`;

const Button = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #005bb5;
    }
`;

const Hr = styled.div`
    margin: 20px 0;
    border-bottom: 1px solid #ccc;
`;

const FootLnk = styled.div`
    text-align: center;
    font-size: 14px;
`;

const Login: React.FC = () => {
    const [tab, setTab] = useState<'sign-in' | 'sign-up'>('sign-in');
    const router = useRouter();

    const handleSignUpClick = () => {
        router.push('/Join');
    };

    return (
        <BodyWrapper>
            <LoginWrap>
                <LoginHtml>
                    <Radio
                        id="tab-1"
                        type="radio"
                        name="tab"
                        className="sign-in"
                        checked={tab === 'sign-in'}
                        onChange={() => setTab('sign-in')}
                    />
                    <Tab htmlFor="tab-1" onClick={() => setTab('sign-in')}>로그인</Tab>
                    <Radio
                        id="tab-2"
                        type="radio"
                        name="tab"
                        className="sign-up"
                        checked={tab === 'sign-up'}
                        onChange={() => setTab('sign-up')}
                    />
                    <Tab htmlFor="tab-2" onClick={() => setTab('sign-up')}>회원가입</Tab>
                    <LoginForm>
                        <SignInHtml active={tab === 'sign-in'}>
                            <Group>
                                <Label htmlFor="user-signin">이름</Label>
                                <Input id="user-signin" type="text" className="input" />
                            </Group>
                            <Group>
                                <Label htmlFor="pass-signin">비밀번호</Label>
                                <Input id="pass-signin" type="password" className="input" data-type="password" />
                            </Group>
                            <Group>
                                <Check id="check" type="checkbox" className="check" defaultChecked />
                                <Label htmlFor="check">
                                    <span className="icon"></span> 정보 수집 동의
                                </Label>
                            </Group>
                            <Group>
                                <Button type="submit" className="button" value="Sign In" />
                            </Group>
                            <Hr />
                            <FootLnk>
                                <a href="#forgot">비밀번호를 잊으셨나요?</a>
                            </FootLnk>
                        </SignInHtml>
                        <SignUpHtml active={tab === 'sign-up'}>
                            <Group>
                                <Label htmlFor="user-signup">이름</Label>
                                <Input id="user-signup" type="text" className="input" />
                            </Group>
                            <Group>
                                <Label htmlFor="pass-signup">비밀번호</Label>
                                <Input id="pass-signup" type="password" className="input" data-type="password" />
                            </Group>
                            <Group>
                                <Label htmlFor="pass-confirm">비밀번호 확인</Label>
                                <Input id="pass-confirm" type="password" className="input" data-type="password" />
                            </Group>
                            <Group>
                                <Button type="button" className="button" value="Sign Up" onClick={handleSignUpClick} />
                            </Group>
                            <Hr />
                            <FootLnk>
                                <a href="#signin">이미 회원이신가요?</a>
                            </FootLnk>
                        </SignUpHtml>
                    </LoginForm>
                </LoginHtml>
            </LoginWrap>
        </BodyWrapper>
    );
};

export default Login;
