import type { NextPage } from 'next'
import { Fragment } from 'react';
import KeyboardLetter from '../components/KeyboardLetter/KeyboardLetter'
import styles from '../styles/Home.module.css'

var letters = "QWERTYUIOPASDFGHJKLZXCVBNM";
var lettersArray = letters.split('');

lettersArray.splice(lettersArray.findIndex(letter => letter == 'L') + 1, 0, 'backspace');
lettersArray.splice(lettersArray.findIndex(letter => letter == 'M') + 1, 0, 'enter');

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.gameArea}>
        <header className={styles.header}>
          <span>WPS - TERMO</span>
        </header>
        <main className={styles.main}></main>
        <footer className={styles.footer}>
          {lettersArray.map((letter, key) => <KeyboardLetter key={key} letter={letter} />)}
        </footer>
      </div>
    </div>
  )
}

export default Home
