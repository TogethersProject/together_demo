import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import '../styles/Main.css';

const HomePage: React.FC = () => {
    const router = useRouter();

    const handleClick = () => {
        // First 페이지로 이동하는 로직을 작성합니다.
        router.push('/First');
    };

    return (
        <div className="container" onClick={handleClick}>
            <div className="image-wrapper">
                <Image src="/images/image-22.png" width={500} height={300} alt="My Image" />
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

export default HomePage;
