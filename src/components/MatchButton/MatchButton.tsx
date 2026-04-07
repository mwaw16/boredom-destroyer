import styles from './MatchButton.module.scss';

export default function MatchButton({ formVisible }: { formVisible: () => void }) {
  return (
    <button onClick={formVisible} className={styles['brd-match-button']}>
        LOSUJ!<span className={styles['brd-match-button__subtitle']}>Najbardziej pasujące zajęcie</span>
    </button>
  )
}
