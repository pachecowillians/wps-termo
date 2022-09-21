import styles from "./styles.module.css"

interface alertProps {
    alertMessage: string;
}

export default function Alert({ alertMessage }: alertProps) {
    return <div className={styles.container}>
        <span>{alertMessage}</span>
    </div>
}