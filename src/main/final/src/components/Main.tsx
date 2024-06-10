import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image.tsx component from next/image
import '../styles/Main.css';

const Main: React.FC = () => {
    const handleClick = () => {
        // 클릭 이벤트 처리 로직을 여기에 작성하세요
    };

    return (
        <div className="container" onClick={handleClick}>
            <div className="image-wrapper">
                <Image src="/images/image-22.png" alt="" />
            </div>
            <div className="image-wrapper">
                <Image src="/images/image-6.png" alt="" />
            </div>
            <div className="image-wrapper">
                <Image src="/images/image-2.png" alt="" />
            </div>
            <Link href="/First">Go to First Page</Link>
        </div>
    );
};

export default Main;
