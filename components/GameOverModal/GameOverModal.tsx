import styles from "./styles.module.css"

interface gameOverModalProps {
    win: boolean;
    word: string;
    playAgain: () => void;
}

export default function GameOverModal({ win, word, playAgain }: gameOverModalProps) {

    let containerClassNames = [styles.container]
    win && containerClassNames.push(styles.victory);
    !win && containerClassNames.push(styles.failed);

    return <>
        <div className={styles.blurContainer}>
            <div className={containerClassNames.join(' ')}>
                <h1>{win ? 'VICTORY!' : 'FAILED!'}</h1>
                <span>The word was {word}</span>
                <div className={styles.buttons}>
                    <button type={"button"} onClick={playAgain}>
                        <span>Play Again</span>
                        <span className="material-symbols-outlined">
                            restart_alt
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </>
}