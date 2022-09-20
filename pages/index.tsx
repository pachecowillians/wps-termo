import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import KeyboardLetter from '../components/KeyboardLetter/KeyboardLetter'
import MainLetter from '../components/MainLetter/MainLetter';
import styles from '../styles/Home.module.css'

var letters = "QWERTYUIOPASDFGHJKLZXCVBNM";
var lettersArray = letters.split('');

lettersArray.splice(lettersArray.findIndex(letter => letter == 'L') + 1, 0, 'backspace');
lettersArray.splice(lettersArray.findIndex(letter => letter == 'M') + 1, 0, 'enter');

interface matrixPositionType {
    line: number;
    column: number;
}

interface matrixCellType {
    letter: string;
    status: 'active' | 'inactive' | 'selected' | 'correct' | 'wrongPosition' | 'wrong';
    position: matrixPositionType;
}

interface keyboardLetterType {
    [key: string]: 'active' | 'correct' | 'wrongPosition' | 'wrong';
}

var lettersStatus: keyboardLetterType = {}

for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
    var letter = String.fromCharCode(i);
    lettersStatus[letter] = 'active';
}

lettersStatus['R'] = 'correct';
lettersStatus['E'] = 'wrongPosition';
lettersStatus['O'] = 'wrong';



const Home: NextPage = () => {

    function handleKeyDown(letter: string) {
        setMatrix(prevMatrix =>
            prevMatrix.map(line => line.map(
                cell => cell.position.line == activeLine && cell.position.column == activeColumn ?
                    { ...cell, letter: letter } :
                    cell))
        )
        setActiveColumn(prevActiveLine =>
            (prevActiveLine + 1) < 5 ?
                prevActiveLine + 1 :
                prevActiveLine)
    }

    const [opennedModal, setOpennedModal] = useState(false);

    const [matrix, setMatrix] = useState<matrixCellType[][]>([]);

    const [activeLine, setActiveLine] = useState(0);
    const [activeColumn, setActiveColumn] = useState(0);

    var baseMatrix: matrixCellType[][] = [];

    for (var i = 0; i < 6; i++) {
        baseMatrix[i] = [];
        for (var j = 0; j < 5; j++) {
            if (i == activeLine) {
                if (j == 0) {
                    baseMatrix[i][j] = {
                        position: {
                            line: i,
                            column: j
                        },
                        letter: '',
                        status: 'selected'
                    };
                } else {
                    baseMatrix[i][j] = {
                        position: {
                            line: i,
                            column: j
                        },
                        letter: '',
                        status: 'active'
                    };
                }
            } else {
                baseMatrix[i][j] = {
                    position: {
                        line: i,
                        column: j
                    },
                    letter: '',
                    status: 'inactive'
                };

            }
        }
    }

    useEffect(() => {
        setMatrix(baseMatrix);
    }, [])

    return (
        <>
            <div className={styles.container} tabIndex={0} onKeyDown={(e) => { handleKeyDown(e.key) }} >
                <div className={styles.gameArea}>
                    <header className={styles.header}>
                        <span>WPS TERMO</span>
                        <span className="material-symbols-outlined" onClick={() => { setOpennedModal(!opennedModal) }}>
                            {!opennedModal ? 'info' : 'close'}
                        </span>
                    </header>
                    {
                        !opennedModal ?
                            <>
                                <main className={styles.main}>
                                    <div className={styles.mainContainer}>
                                        {
                                            matrix.map(line => line.map((cell, key) => <MainLetter key={key} letter={cell.letter} status={cell.status} />))
                                        }
                                    </div>
                                </main>
                                <footer className={styles.footer}>
                                    {lettersArray.map((letter, key) => <KeyboardLetter key={key} letter={letter} status={lettersStatus[letter]} />)}
                                </footer>
                            </>
                            :
                            <>
                                <div className={styles.modalContainer}>
                                    <span> This game is a clone of the Termo game available on term.ooo. In the game, your goal is find the correct word, and you have 6 chances to do it. In each try, will be shown the letters that exists in the word and the correct letters using the colors below.</span>
                                    <div className={styles.colors}>
                                        <div className={`${styles.color} ${styles.correct}`}>Correct</div>
                                        <div className={`${styles.color} ${styles.wrongPosition}`}>Wrong position</div>
                                        <div className={`${styles.color} ${styles.wrong}`}>Wrong</div>
                                    </div>
                                    <div className={styles.contacts}>
                                        <span>Contact me:</span>
                                        <a href='https://www.linkedin.com/in/pachecowillians' target='_blank'><img src="linkedin.svg" alt="LinkedIn" /> linkedin.com/in/pachecowillians</a>
                                        <a href='https://github.com/pachecowillians' target='_blank'><img src="github.svg" alt="GitHub" /> github.com/pachecowillians</a>
                                        <a href='mailto:willianpacheco31@gmail.com' target='_blank'><img src="gmail.svg" alt="Gmail" /> willianpacheco31@gmail.com</a>
                                        <a href='https://pachecowillians.github.io' target='_blank'><img src="portfolio.svg" alt="Portfolio" /> pachecowillians.github.io</a>
                                    </div>
                                </div>
                                <div className={styles.modalFooter}>
                                    <span>&copy; {new Date().getFullYear()} - Willian Pacheco Silva</span>
                                </div>
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default Home
