import styles from "./styles.module.css"

export default function Avatar({ alt, src, withText, text }) {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={src} alt={alt} title={alt} />
      {withText && <strong>{text || alt}</strong>}
    </div>
  )
}
