import { useState } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';
import styles from './DateRangePicker.module.css';

dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

function DateRangePicker() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  function handleGoToPrevMonth() {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  }

  function handleGoToNextMonth() {
    setCurrentMonth(currentMonth.add(1, 'month'));
  }

  function handlePickDateRange(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = event.target as HTMLButtonElement;
    if (target.tagName !== 'BUTTON') return;

    const pickedDate = dayjs(target.dataset.date);

    if (!startDate || pickedDate.isBefore(startDate) || (startDate && endDate)) {
      setStartDate(pickedDate);
      setEndDate(null);
    } else if (pickedDate.isSameOrAfter(startDate)) {
      setEndDate(pickedDate);
    }
  }

  function isDateInRange(date: Dayjs) {
    // 情況一：沒有選擇開始日期
    if (!startDate) return false;

    // 情況二：選擇了開始日期，但沒有選擇結束日期
    if (!endDate) {
      return date.isSame(startDate, 'day');
    }

    // 情況三：選擇了開始日期，也選擇了結束日期
    return date.isBetween(startDate, endDate, 'day', '[]');
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
        {partialDatesInPrevMonth.map((date) => {
          const dayjsDate = currentMonth.subtract(1, 'month').set('date', date);
          const className = `${styles.dateButton} ${styles.nonCurrentMonth} ${
            isDateInRange(dayjsDate) ? styles.active : ''
          }`;

          return (
            <button className={className} data-date={dayjsDate.format('YYYY-MM-DD')} key={`prev-${date}`}>
              {date}
            </button>
          );
        })}
        {daysInCurrentMonth.map((date) => {
          const dayjsDate = currentMonth.set('date', date);
          const className = `${styles.dateButton} ${isDateInRange(dayjsDate) ? styles.active : ''}`;

          return (
            <button className={className} data-date={dayjsDate.format('YYYY-MM-DD')} key={`current-${date}`}>
              {date}
            </button>
          );
        })}
        {partialDatesInNextMonth.map((date) => {
          const dayjsDate = currentMonth.add(1, 'month').set('date', date);
          const className = `${styles.dateButton} ${styles.nonCurrentMonth} ${
            isDateInRange(dayjsDate) ? styles.active : ''
          }`;

          return (
            <button className={className} data-date={dayjsDate.format('YYYY-MM-DD')} key={`next-${date}`}>
              {date}
            </button>
          );
        })}
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
      <div className={styles.calendar} onClick={handlePickDateRange}>
        {renderDaysButtons()}
      </div>
    </div>
  );
}

export default DateRangePicker;
