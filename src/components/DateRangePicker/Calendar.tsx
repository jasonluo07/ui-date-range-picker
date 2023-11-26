import dayjs, { type Dayjs } from 'dayjs';

import styles from './Calendar.module.css';

type CalendarProps = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  currentMonth: Dayjs;
  onPickDateRange: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Calendar = ({ startDate, endDate, currentMonth, onPickDateRange }: CalendarProps) => {
  const today = dayjs();

  const isDateInRange = (date: Dayjs) => {
    if (!startDate) return false;
    if (!endDate) return date.isSame(startDate, 'day');
    return date.isBetween(startDate, endDate, 'day', '[]');
  };

  const getPartialDatesInPrevMonth = () => {
    const firstDayOfCurrentMonth = currentMonth.startOf('month').day() || 7;
    const prevMonth = currentMonth.subtract(1, 'month');
    const daysInPrevMonth = prevMonth.daysInMonth();

    return Array.from(
      { length: firstDayOfCurrentMonth - 1 },
      (_, i) => daysInPrevMonth - (firstDayOfCurrentMonth - 1) + 1 + i
    );
  };

  const getPartialDatesInNextMonth = () => {
    const lastDayOfCurrentMonth = currentMonth.endOf('month').day() || 7;
    return Array.from({ length: 7 - lastDayOfCurrentMonth }, (_, i) => i + 1);
  };

  const renderDayButtons = () => {
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
          const isToday = dayjsDate.isSame(today, 'day');
          const className = `${styles.dateButton} ${isToday ? styles.today : ''} ${
            isDateInRange(dayjsDate) ? styles.active : ''
          }`;

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
  };

  return (
    <div className={styles.calendar} onClick={onPickDateRange}>
      {renderDayButtons()}
    </div>
  );
};

export default Calendar;
