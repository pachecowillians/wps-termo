import Image from "next/image";
import styles from "./styles.module.css"

interface KeyboardLetterProps {
    letter: string;
    status: 'active' | 'correct' | 'wrongPosition' | 'wrong';
    writeLetter: (letter: string) => void;
    eraseLetter: () => void;
    validateWord: () => void
}

export default function KeyboardLetter({ letter, status, writeLetter, eraseLetter, validateWord }: KeyboardLetterProps) {
    let classNames = [styles.container]

    if (letter == 'backspace') {
        classNames.push(styles.backspace)
        return <div className={classNames.join(' ')}
            onClick={() => eraseLetter()}>
            <img alt="backspace" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjkwIiBoZWlnaHQ9IjI1NSIgdmlld0JveD0iMCAwIDI5MCAyNTUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xOS44OTE0IDEyNy4yNTFMMTAzLjA2OCA0MEgyNzVWMjE2SDEwMy4xM0wxOS44OTE0IDEyNy4yNTFaIiBzdHJva2U9IiNGQUZBRkYiIHN0cm9rZS13aWR0aD0iMjYiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPGxpbmUgeDE9IjEzIiB5MT0iLTEzIiB4Mj0iMTMwLjk0NyIgeTI9Ii0xMyIgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDcxMDcgMC43MDcxMDcgLTAuNzY1MzY3IDAuNjQzNTk0IDExNSA4NikiIHN0cm9rZT0iI0ZBRkFGRiIgc3Ryb2tlLXdpZHRoPSIyNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxsaW5lIHgxPSIxMyIgeTE9Ii0xMyIgeDI9IjEzMC45NDciIHkyPSItMTMiIHRyYW5zZm9ybT0ibWF0cml4KDAuNzA3MTA3IC0wLjcwNzEwNyAwLjc2NTM2NyAwLjY0MzU5NCAxMzMuNDY1IDE4Ny43ODYpIiBzdHJva2U9IiNGQUZBRkYiIHN0cm9rZS13aWR0aD0iMjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K" />
        </div>

    } else if (letter == 'enter') {
        classNames.push(styles.enter)
        return <div className={classNames.join(' ')}
            onClick={() => { validateWord() }}>
            <span>ENTER</span>
        </div>
    } else {
        letter == 'A' && classNames.push(styles.letterA);
        letter == 'Z' && classNames.push(styles.letterZ);
        status == 'correct' && classNames.push(styles.correct);
        status == 'wrongPosition' && classNames.push(styles.wrongPosition);
        status == 'wrong' && classNames.push(styles.wrong);
        return <div className={classNames.join(' ')}
            onClick={() => { writeLetter(letter) }}>
            <span>{letter}</span>
        </div>
    }
}