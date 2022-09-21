import styles from "./styles.module.css"

interface gameOverModalProps {
    win: boolean;
}

export default function GameOverModal({ win }: gameOverModalProps) {

    let containerClassNames = [styles.container]
    win && containerClassNames.push(styles.victory);
    !win && containerClassNames.push(styles.failed);

    return <>
        <div className={styles.blurContainer}>
            <div className={containerClassNames.join(' ')}>
                <h1>{win ? 'VICTORY!' : 'FAILED!'}</h1>
                <span>The word was BLIND</span>
                <div className={styles.buttons}>
                    <button type={"button"}>
                        <span>Play Again</span>
                        <span className="material-symbols-outlined">
                            restart_alt
                        </span>
                    </button>
                    <button type={"button"}>
                        <span>Share</span>
                        <span className="material-symbols-outlined">
                            share
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </>
}