import type { NextPage } from 'next'
import { Fragment } from 'react';
import KeyboardLetter from '../components/KeyboardLetter/KeyboardLetter'
import styles from '../styles/Home.module.css'

var letters = "QWERTYUIOPASDFGHJKLZXCVBNM";
var lettersArray = letters.split('');

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.gameArea}>
        <header className={styles.header}>
          <span>WPS - TERMO</span>
        </header>
        <main className={styles.main}></main>
        <footer className={styles.footer}>
          {lettersArray.map(letter => {
            if (letter == 'L') {
              return <Fragment>
                <KeyboardLetter letter={letter} />
                <KeyboardLetter letter={'backspace'} />
              </Fragment>
            } else if (letter == 'M') {
              return <Fragment>
                <KeyboardLetter letter={letter} />
                <KeyboardLetter letter={'enter'} />
              </Fragment>
            } else {
              return <KeyboardLetter letter={letter} />
            }
          })}
        </footer>
      </div>
    </div>
  )
}

export default Home
