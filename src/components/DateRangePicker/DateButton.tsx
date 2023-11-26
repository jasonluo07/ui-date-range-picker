import { type Dayjs } from 'dayjs';

import styles from './DateButton.module.css';

type DateButtonProps = {
  date: Dayjs;
  isToday: boolean;
  isCurrentMonth: boolean;
  isDateInRange: boolean;
};

const DateButton = ({ date, isToday, isCurrentMonth, isDateInRange }: DateButtonProps) => {
  const className = `${styles.dateButton} ${isToday ? styles.today : ''} ${
    isCurrentMonth ? '' : styles.nonCurrentMonth
  } ${isDateInRange ? styles.active : ''}`;

  return (
    <button data-date={date.format('YYYY-MM-DD')} className={className}>
      {date.date()}
    </button>
  );
};

export default DateButton;
