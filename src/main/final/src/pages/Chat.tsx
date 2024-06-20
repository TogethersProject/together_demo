// pages/index.tsx

import React from 'react';
import Head from 'next/head';
import ChatWindow from '../components/ChatWindow';

const Home: React.FC = () => {
    return (
        <div>
            <Head>
                <title>가상 챗봇</title>
                <meta name="description" content="가상 챗봇 예제" />
                <link rel="icon" href="/final/public/favicon.ico" />
            </Head>

            <main>
                <h1>가상 챗봇</h1>
                <ChatWindow />
            </main>
        </div>
    );
};

export default Home;
