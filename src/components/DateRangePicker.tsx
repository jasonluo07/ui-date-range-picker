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

  function getPartialDatesInPrevMonth() {
    const firstDayOfCurrentMonth = currentMonth.startOf('month').day() || 7;
    const prevMonth = currentMonth.subtract(1, 'month');
    const daysInPrevMonth = prevMonth.daysInMonth();

    return Array.from(
      { length: firstDayOfCurrentMonth - 1 },
      (_, i) => daysInPrevMonth - (firstDayOfCurrentMonth - 1) + 1 + i
    );
  }

  function getPartialDatesInNextMonth() {
    const lastDayOfCurrentMonth = currentMonth.endOf('month').day() || 7;
    return Array.from({ length: 7 - lastDayOfCurrentMonth }, (_, i) => i + 1);
  }

  function renderDaysButtons() {
    const partialDatesInPrevMonth = getPartialDatesInPrevMonth();
    const partialDatesInNextMonth = getPartialDatesInNextMonth();
    const daysInCurrentMonth = Array.from({ length: currentMonth.daysInMonth() }, (_, i) => i + 1);

    return (
      <>
        {partialDatesInPrevMonth.map((date) => (
          <button className={`${styles.dayButton} ${styles.nonCurrentMonth}`} key={`prev-${date}`}>
            {date}
          </button>
        ))}
        {daysInCurrentMonth.map((date) => (
          <button className={styles.dayButton} key={`current-${date}`}>
            {date}
          </button>
        ))}
        {partialDatesInNextMonth.map((date) => (
          <button className={`${styles.dayButton} ${styles.nonCurrentMonth}`} key={`next-${date}`}>
            {date}
          </button>
        ))}
      </>
    );
  }

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
      <div className={styles.days}>{renderDaysButtons()}</div>
    </div>
  );
}

export default DateRangePicker;
