import styles from './DateRangePicker.module.css';

function DateRangePicker() {
  return (
    <div className={styles.dateRangePicker}>
      <div className={styles.header}>
        <button className={`${styles.monthSelect} ${styles.prevMonth}`}>&lt;</button>
        <span>
          {/* TODO: 動態產生月份 */}
          2022年9月
        </span>
        <button className={`${styles.monthSelect} ${styles.nextMonth}`}>&gt;</button>
      </div>
      <div className={styles.days}>
        {/* TODO: 動態產生日期按鈕，要注意：一個禮拜的第一天是禮拜一 */}
        <button className={`${styles.dayButton} ${styles.nonCurrentMonth} ${styles.active}`}>29日</button>
        <button className={`${styles.dayButton} ${styles.nonCurrentMonth} ${styles.active}`}>30日</button>
        <button className={`${styles.dayButton} ${styles.nonCurrentMonth} ${styles.active}`}>31日</button>
        <button className={`${styles.dayButton} ${styles.active}`}>1日</button>
        <button className={`${styles.dayButton} ${styles.active}`}>2日</button>
        <button className={styles.dayButton}>3日</button>
        <button className={styles.dayButton}>4日</button>
        <button className={styles.dayButton}>5日</button>
        <button className={styles.dayButton}>6日</button>
        <button className={styles.dayButton}>7日</button>
        <button className={styles.dayButton}>8日</button>
        <button className={styles.dayButton}>9日</button>
        <button className={styles.dayButton}>10日</button>
        <button className={styles.dayButton}>11日</button>
        <button className={styles.dayButton}>12日</button>
        <button className={styles.dayButton}>13日</button>
        <button className={`${styles.dayButton}`}>14日</button>
        <button className={`${styles.dayButton}`}>15日</button>
        <button className={`${styles.dayButton}`}>16日</button>
        <button className={styles.dayButton}>17日</button>
        <button className={styles.dayButton}>18日</button>
        <button className={styles.dayButton}>19日</button>
        <button className={styles.dayButton}>20日</button>
        <button className={styles.dayButton}>21日</button>
        <button className={styles.dayButton}>22日</button>
        <button className={styles.dayButton}>23日</button>
        <button className={styles.dayButton}>24日</button>
        <button className={styles.dayButton}>25日</button>
        <button className={styles.dayButton}>26日</button>
        <button className={`${styles.dayButton} ${styles.today}`}>27日</button>
        <button className={styles.dayButton}>28日</button>
        <button className={styles.dayButton}>29日</button>
        <button className={styles.dayButton}>30日</button>
        <button className={`${styles.dayButton} ${styles.nonCurrentMonth}`}>1日</button>
        <button className={`${styles.dayButton} ${styles.nonCurrentMonth}`}>2日</button>
      </div>
    </div>
  );
}

export default DateRangePicker;
