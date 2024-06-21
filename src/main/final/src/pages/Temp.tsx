import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import '../styles/First.css';

const Temp: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        router.back();
    }, []);

    return (
        <div>

        </div>
    );
};

export default Temp;
