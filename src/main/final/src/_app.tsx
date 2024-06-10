// pages/_app.tsx
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '../styles/globals.css'; // 전역 스타일 파일 import

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    return (
        <Component {...pageProps} router={router} />
    );
}

export default MyApp;
