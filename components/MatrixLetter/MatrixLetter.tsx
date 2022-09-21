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

    let classNames = [styles.container];
    status == 'inactive' && classNames.push(styles.disabled);
    status == 'selected' && classNames.push(styles.selected);
    status == 'correct' && classNames.push(styles.correct);
    status == 'wrongPosition' && classNames.push(styles.wrongPosition);
    status == 'wrong' && classNames.push(styles.wrong);

    return <div className={classNames.join(' ')}
        onClick={() => {
            setActiveColumn(position.column);
        }}>
        {letter}
    </div>
}