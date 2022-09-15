import styles from "./styles.module.css"

interface MainLetterProps {
    letter: string;
    status: 'active' | 'inactive' | 'correct' | 'wrongPosition' | 'wrong';
}

export default function MainLetter({ letter, status }: MainLetterProps) {
    return <div className={`${styles.container} ${status == 'inactive' && styles.disabled}`}>
        {letter}
    </div>
}