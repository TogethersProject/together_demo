import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Find.module.css';
import Image from 'next/image';

interface Mentor {
    name: string;
    email: string;
    bio: string;
    photo: string | null;
    comments?: string[];
}

const Find = () => {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [currentComment, setCurrentComment] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('mentors') || '[]');
        setMentors(savedData);
    }, []);

    const handleBack = () => {
        router.push('/Be');
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedMentors = [...mentors];
        updatedMentors[index].comments = updatedMentors[index].comments || [];
        updatedMentors[index].comments?.push(e.target.value);
        setMentors(updatedMentors);
    };

    const handleAddComment = (index: number) => {
        const updatedMentors = [...mentors];
        updatedMentors[index].comments = [...(updatedMentors[index].comments || []), currentComment];
        setMentors(updatedMentors);
        setCurrentComment('');
        localStorage.setItem('mentors', JSON.stringify(updatedMentors));
    };

    const handleDeleteMentor = (index: number) => {
        const updatedMentors = mentors.filter((_, i) => i !== index);
        setMentors(updatedMentors);
        localStorage.setItem('mentors', JSON.stringify(updatedMentors));
    };

    return (
        <div className={styles.container} style={{ width: '360px', height: '800px', overflowY: 'scroll' }}>
            <h1 className={styles.title}>멘토 정보</h1>
            {mentors.map((mentor, index) => (
                <div key={index} className={styles.info}>
                    <p><strong>이름:</strong> {mentor.name}</p>
                    <p><strong>이메일:</strong> {mentor.email}</p>
                    <p><strong>소개:</strong> {mentor.bio}</p>
                    {mentor.photo && <Image src={mentor.photo} alt="Photo" width={100} height={100} />}
                    <div className={styles.comments}>
                        <h3>댓글:</h3>
                        {mentor.comments && mentor.comments.map((comment, commentIndex) => (
                            <div key={commentIndex} className={styles.commentContainer}>
                                <p>{comment}</p>
                            </div>
                        ))}
                        <input
                            type="text"
                            value={currentComment}
                            onChange={(e) => setCurrentComment(e.target.value)}
                            placeholder="댓글을 입력하세요"
                        />
                        <button onClick={() => handleAddComment(index)}>댓글 달기</button>
                    </div>
                    <button onClick={() => handleDeleteMentor(index)}>글 삭제</button>
                </div>
            ))}
            <button className={styles.backButton} onClick={handleBack}>뒤로가기</button>
        </div>
    );
};

export default Find;
