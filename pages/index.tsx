import type { NextPage } from 'next'
import { Fragment } from 'react';
import KeyboardLetter from '../components/KeyboardLetter/KeyboardLetter'
import MainLetter from '../components/MainLetter/MainLetter';
import Modal from '../components/Modal/MainLetter';
import styles from '../styles/Home.module.css'

var letters = "QWERTYUIOPASDFGHJKLZXCVBNM";
var lettersArray = letters.split('');

lettersArray.splice(lettersArray.findIndex(letter => letter == 'L') + 1, 0, 'backspace');
lettersArray.splice(lettersArray.findIndex(letter => letter == 'M') + 1, 0, 'enter');

interface matrixCellType {
    letter: string;
    status: 'active' | 'inactive' | 'selected' | 'correct' | 'wrongPosition' | 'wrong';
}

interface keyboardLetterType {
    [key: string]: 'active' | 'correct' | 'wrongPosition' | 'wrong';
}

var matrix: matrixCellType[][] = [];

var activeLine = 0;
var activeColumn = 1;

for (var i = 0; i < 6; i++) {
    matrix[i] = [];
    for (var j = 0; j < 5; j++) {
        matrix[i][j] = { letter: '', status: 'inactive' };
    }
}

matrix[0][0] = { letter: 'A', status: 'active' }
matrix[0][1] = { letter: 'U', status: 'selected' }
matrix[0][2] = { letter: 'R', status: 'correct' }
matrix[0][3] = { letter: 'E', status: 'wrongPosition' }
matrix[0][4] = { letter: 'O', status: 'wrong' }

var lettersStatus: keyboardLetterType = {}

for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
    var letter = String.fromCharCode(i);
    lettersStatus[letter] = 'active';
}

lettersStatus['R'] = 'correct';
lettersStatus['E'] = 'wrongPosition';
lettersStatus['O'] = 'wrong';

const Home: NextPage = () => {
    return (
        <>
            <Modal />
            <div className={styles.container}>
                <div className={styles.gameArea}>
                    <header className={styles.header}>
                        <span>WPS TERMO</span>
                        <span className="material-symbols-outlined">
                            info
                        </span>
                    </header>
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
                </div>
            </div>
        </>
    )
}

export default Home
