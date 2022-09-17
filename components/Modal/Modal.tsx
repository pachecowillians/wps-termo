import styles from "./styles.module.css"

export default function Modal() {
    return <div className={styles.container}>
        <div className={styles.header}>
            <span className="material-symbols-outlined">
                close
            </span>
        </div>
        <div className={styles.body}>
            This game is a clone of the Termo game available on https://term.ooo/. In the game, your goal is find the correct word, and you have 6 chances to do it. In each try, will be shown the letters that exists in the word and the correct letters using the colors below.
            <div className={`${styles.color} ${styles.correct}`}>Correct</div>
            <div className={`${styles.color} ${styles.wrongPosition}`}>Wrong position</div>
            <div className={`${styles.color} ${styles.wrong}`}>Wrong</div>
        </div>
    </div>
}