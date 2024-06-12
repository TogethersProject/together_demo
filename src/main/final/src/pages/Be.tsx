import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Be.module.css';

//ckeditor
//import { CKEditor } from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import axios from "axios";
const CustomEditor = dynamic( () => {
    return import( '../components/CustomEditor' );
}, { ssr: false,suspense: true } );


const Be = () => {
    useEffect(() => {
        // CustomEditor 컴포넌트 가져오기
        const loadCustomEditor = async () => {
            const CustomEditor = await import('../components/CustomEditor');
            // 필요한 작업 수행
        };
        loadCustomEditor();
    }, []);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [board, setBoard] = useState({title:'멘토입니당'});
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const reader = new FileReader();

        reader.onloadend = () => {
            const photoUrl = reader.result as string;
            const newMentor = { name, email, bio, photo: photoUrl };

            // Save to local storage
            const savedData = JSON.parse(localStorage.getItem('mentors') || '[]');
            savedData.push(newMentor);
            localStorage.setItem('mentors', JSON.stringify(savedData));

            // Show modal and redirect to First.tsx
            setShowModal(true);
            setTimeout(() => {
                router.push('/Find');
            }, 1000); // Adjust the duration as needed
        };

        if (photo) {
            reader.readAsDataURL(photo);
        } else {
            const newMentor = { name, email, bio, photo: null };
            const savedData = JSON.parse(localStorage.getItem('mentors') || '[]');
            savedData.push(newMentor);
            localStorage.setItem('mentors', JSON.stringify(savedData));

            // Show modal and redirect to First.tsx
            setShowModal(true);
            setTimeout(() => {
                router.push('/Find');
            }, 1000); // Adjust the duration as needed
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    const handleGoBack = () => {
        router.push('/Mentor');
    };

    const handleHomeClick = () => {
        router.push('/First');
    };

    const handleProfileClick = () => {
        router.push('/Profile');
    };

    const handleSettingsClick = () => {
        router.push('/Menu');
    };

    const onContent = (editor) => {
        const data = editor.getData();
        setBoard(prevData => ({
            ...prevData,
            name:name,
            email:email,
            id: 'hong',
            title:'멘토입니당',
            content: data
        }));
        console.log('content: ', board);
    };

    const boardSubmitURL = 'http://localhost:9000/board/writeBoard'
    const onSubmit = (e) => {
        e.preventDefault();
        //console.log("보드제출~!")

        const bearer: string | null = localStorage.getItem('grantType');
        const accessToken: string | null = localStorage.getItem('accessToken');
        //console.log(bearer)
        //console.log(accessToken)
        let headers: { [key: string]: string } = {};
        if (bearer !== null && accessToken !== null) {
            headers = { Authorization: `${bearer}${accessToken}` };
        }
        //console.log(headers)

        axios.post(boardSubmitURL, board    ,{headers:headers}
        ).then(res => {
            console.log(res);
                alert('등록 완료!');
            // Show modal and redirect to First.tsx
            setShowModal(true);
            setTimeout(() => {
                router.push('/Find');
            }, 1000); // Adjust the duration as needed
        }).catch(err => {
            console.log(err);
            alert('에러!!!')
        });
        console.log('Submit: ', board);
    };
    const reissueAccessURL = "http://localhost:9000/common/reissueRefreshToken"
    const onButton = (e) => {
        e.preventDefault();
        console.log("버튼눌럿다");
        const refreshToken = localStorage.getItem('refreshToken')
        axios.post(reissueAccessURL,null,{headers:{RefreshToken:refreshToken}}
        ).then(res => (
            console.log("accessToken: " + res.data)
        )).catch(err => console.log(err))
    }
    return (
        <div className={styles.container}>
            <div className={styles.mainScreen}>
                <h1 className={styles.title}>멘토 등록</h1>
                {/*<form className={styles.form} onSubmit={handleSubmit}>*/}
                <form className={styles.form} onSubmit={onSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="name">이름:</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">이메일:</label>
                        <input
                            className={styles.input}
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <Suspense fallback={<div>Loading editor...</div>}>
                            <CustomEditor onContent={onContent}
                                //initialData='<h1>Hello from CKEditor in Next.js!</h1>'
                            />
                        </Suspense>
                    </div>
                    <button className={styles.button} type="submit">등록하기</button>
                    <button className={styles.goBackButton} onClick={handleGoBack}>뒤로가기</button>
                </form>
            </div>
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <p>등록되었습니다!</p>
                    </div>
                </div>
            )}
            <button onClick ={onButton}>엑세스내놔</button>
        </div>
    );
};

export default Be;
