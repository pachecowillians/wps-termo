import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.gameArea}>
        <header className={styles.header}>
          <span>WPS - TERMO</span>
        </header>
        <main className={styles.main}></main>
        <footer className={styles.footer}></footer>
      </div>
    </div>
  )
}

export default Home
