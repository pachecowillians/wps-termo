import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react';
import KeyboardLetter from '../components/KeyboardLetter/KeyboardLetter'
import MatrixLetter from '../components/MatrixLetter/MatrixLetter';
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

    const [opennedModal, setOpennedModal] = useState(false);

    const [matrix, setMatrix] = useState<matrixCellType[][]>([]);

    const [activeLine, setActiveLine] = useState(0);
    const [activeColumn, setActiveColumn] = useState(0);

    const mainDivRef = useRef<HTMLDivElement>(null);

    function isLetter(letter: string) {
        return letter.length === 1 && letter.match(/[a-z]/i);
    }

    function updateLetter(activeLine: number, activeColumn: number, letter: string) {
        setMatrix(prevMatrix =>
            prevMatrix.map(line => line.map(
                cell => {
                    if (cell.position.line == activeLine && cell.position.column == activeColumn) {
                        return {
                            ...cell,
                            letter: letter,
                        }
                    } else {
                        return cell;
                    }
                })
            )
        )
    }

    function handleKeyDown(letter: string) {
        if (isLetter(letter) && activeColumn < 5) {
            updateLetter(activeLine, activeColumn, letter);
            setActiveColumn(prevActiveColumn => prevActiveColumn + 1)
        } else if (letter == 'Backspace' && activeColumn > -1) {
            if (activeColumn < 5) {
                if (matrix[activeLine][activeColumn].letter == '') {
                    updateLetter(activeLine, activeColumn - 1, '');
                    setActiveColumn(prevActiveColumn => prevActiveColumn - 1)
                } else {
                    updateLetter(activeLine, activeColumn, '');
                }
            } else {
                updateLetter(activeLine, activeColumn - 1, '');
                setActiveColumn(prevActiveColumn => prevActiveColumn - 1);
            }

        } else if (letter == 'ArrowLeft' && activeColumn > 0) {
            setActiveColumn(prevActiveColumn => prevActiveColumn - 1)
        } else if (letter == 'ArrowRight' && activeColumn < 4) {
            setActiveColumn(prevActiveColumn => prevActiveColumn + 1)
        }
    }

    useEffect(() => {
        setMatrix(prevMatrix =>
            prevMatrix.map(line => line.map(
                cell => {
                    if (cell.position.line == activeLine && cell.position.column == activeColumn) {
                        return {
                            ...cell,
                            status: 'selected'
                        }
                    } else if (cell.position.line == activeLine) {
                        return {
                            ...cell,
                            status: 'active'
                        }
                    } else {
                        return {
                            ...cell,
                            status: 'inactive'
                        }
                    }
                })
            )
        )
    }, [activeColumn])

    useEffect(() => {
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

        setMatrix(baseMatrix);

        if (mainDivRef.current) {
            mainDivRef.current.focus();
        }
    }, []);

    return (
        <>
            <div className={styles.container} ref={mainDivRef} tabIndex={-1} onKeyDown={(e) => { handleKeyDown(e.key) }} >
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
                                            matrix.map(line => line.map((cell, key) => <MatrixLetter key={key} letter={cell.letter} status={cell.status} position={cell.position} setActiveColumn={setActiveColumn} />))
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
