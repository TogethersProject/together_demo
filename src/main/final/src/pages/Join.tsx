import React from 'react';
import styled from 'styled-components';

const JoinWrap = styled.div`
  width: 360px;
  height: 800px;
  margin: auto;
  position: relative;
  background: #fff;
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
`;

const JoinHtml = styled.div`
  width: 100%;
  height: 100%;
  padding: 90px 70px 50px 70px;
  background: #f0f0f0;
  box-sizing: border-box;
  position: absolute;
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

const Join = () => {
    return (
        <JoinWrap>
            <JoinHtml>
                <Group>
                    <Label htmlFor="user-signup">이름</Label>
                    <Input id="user-signup" type="text" className="input" />
                </Group>
                <Group>
                    <Label htmlFor="pass-signup">비밀번호</Label>
                    <Input id="pass-signup" type="password" className="input" data-type="password" />
                </Group>
                <Group>
                    <Label htmlFor="repeat-pass">비밀번호 확인</Label>
                    <Input id="repeat-pass" type="password" className="input" data-type="password" />
                </Group>
                <Group>
                    <Label htmlFor="email">이메일</Label>
                    <Input id="email" type="text" className="input" />
                </Group>
                <Group>
                    <Button type="submit" className="button" value="Sign Up" />
                </Group>
                <Hr />
                <FootLnk>
                    <a href="/Login">Already Member?</a>
                </FootLnk>
            </JoinHtml>
        </JoinWrap>
    );
};

export default Join;
