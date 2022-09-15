import styles from "./styles.module.css"

interface MainLetterProps {
    letter: string;
    status: 'active' | 'inactive' | 'selected' | 'correct' | 'wrongPosition' | 'wrong';
}

export default function MainLetter({ letter, status }: MainLetterProps) {
    return <div className={`${styles.container} 
                            ${status == 'inactive' && styles.disabled} 
                            ${status == 'selected' && styles.selected} 
                            ${status == 'correct' && styles.correct} 
                            ${status == 'wrongPosition' && styles.wrongPosition} 
                            ${status == 'wrong' && styles.wrong}`}>
        {letter}
    </div>
}