import { useState } from 'react';
import dayjs from 'dayjs';
import styles from './DateRangePicker.module.css';

function DateRangePicker() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  function handleGoToPrevMonth() {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  }

  function handleGoToNextMonth() {
    setCurrentMonth(currentMonth.add(1, 'month'));
  }

  const daysInCurrentMonth = Array.from({ length: currentMonth.daysInMonth() }, (_, i) => i + 1);
  // 這個月的第一天是禮拜幾，這個值會是 0 ~ 6，但是當等於 0 時，會有個問題，應該要是 7，這樣才順序才會正確
  const firstDayOfCurrentMonth = currentMonth.startOf('month').day() || 7;
  const lastDayOfCurrentMonth = currentMonth.endOf('month').day() || 7;

  return (
    <div className={styles.dateRangePicker}>
      <div className={styles.header}>
        <button className={`${styles.monthSelect} ${styles.prevMonth}`} onClick={handleGoToPrevMonth}>
          &lt;
        </button>
        <span>{currentMonth.format('YYYY年M月')}</span>
        <button className={`${styles.monthSelect} ${styles.nextMonth}`} onClick={handleGoToNextMonth}>
          &gt;
        </button>
      </div>
      <div className={styles.days}>
        {/* 上個月要顯示的日期 */}
        {Array.from({ length: firstDayOfCurrentMonth - 1 }, (_, i) => (
          <button key={i} className={`${styles.dayButton} ${styles.nonCurrentMonth}`}>
            {dayjs(currentMonth).subtract(1, 'month').endOf('month').date() - (firstDayOfCurrentMonth - 1) + i}日
          </button>
        ))}

        {/* 這個月的所有日期 */}
        {daysInCurrentMonth.map((day) => (
          <button key={day} className={styles.dayButton}>
            {day}日
          </button>
        ))}

        {/* 下個月要顯示的日期 */}
        {Array.from({ length: 7 - lastDayOfCurrentMonth }, (_, i) => (
          <button key={i} className={`${styles.dayButton} ${styles.nonCurrentMonth}`}>
            {i + 1}日
          </button>
        ))}
      </div>
    </div>
  );
}

export default DateRangePicker;
