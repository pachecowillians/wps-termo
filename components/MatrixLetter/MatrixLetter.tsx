import styles from "./styles.module.css"

interface MatrixLetterProps {
    letter: string;
    status: 'active' | 'inactive' | 'selected' | 'correct' | 'wrongPosition' | 'wrong';
}

export default function MatrixLetter({ letter, status }: MatrixLetterProps) {
    return <div className={`${styles.container} 
                            ${status == 'inactive' && styles.disabled} 
                            ${status == 'selected' && styles.selected} 
                            ${status == 'correct' && styles.correct} 
                            ${status == 'wrongPosition' && styles.wrongPosition} 
                            ${status == 'wrong' && styles.wrong}`}>
        {letter}
    </div>
}