import styles from './styles.module.css';

export default function DefaultButton({ icon, color='green', ...props }) {
  return(
    <button className={`${styles.button} ${styles[color]}`} {...props}>{icon}</button>
  );
}