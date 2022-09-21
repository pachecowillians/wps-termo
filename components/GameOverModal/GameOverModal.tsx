import styles from "./styles.module.css"

interface gameOverModalProps {
    win: boolean;
}

export default function GameOverModal({ win }: gameOverModalProps) {
    return <>
        <div className={styles.blurContainer}>
            <div className={styles.container}>
                <h1>VICTORY!</h1>
                <span>The word was BLIND</span>
                <div className={styles.buttons}>
                    <button type={"button"}>
                        <span>Try Again</span>
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