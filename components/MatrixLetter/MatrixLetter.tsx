import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.css"

interface matrixPositionType {
    line: number;
    column: number;
}

interface MatrixLetterProps {
    letter: string;
    status: 'active' | 'inactive' | 'selected' | 'correct' | 'wrongPosition' | 'wrong';
    position: matrixPositionType;
    setActiveColumn: (column: number) => void;
}

export default function MatrixLetter({ letter, status, position, setActiveColumn }: MatrixLetterProps) {
    return <div className={`${styles.container} 
                            ${status == 'inactive' && styles.disabled} 
                            ${status == 'selected' && styles.selected} 
                            ${status == 'correct' && styles.correct} 
                            ${status == 'wrongPosition' && styles.wrongPosition} 
                            ${status == 'wrong' && styles.wrong}`}
        onClick={() => {
            setActiveColumn(position.column);
        }}>
        {letter}
    </div>
}