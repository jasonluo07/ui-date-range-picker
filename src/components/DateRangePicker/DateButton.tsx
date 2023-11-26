import { type Dayjs } from 'dayjs';
import clsx from 'clsx';

import styles from './DateButton.module.css';

type DateButtonProps = {
  date: Dayjs;
  isToday?: boolean;
  isCurrentMonth?: boolean;
  isDateInRange: boolean;
};

const DateButton = ({ date, isToday, isCurrentMonth, isDateInRange }: DateButtonProps) => {
  const className = clsx(styles.dateButton, {
    [styles.today]: isToday,
    [styles.nonCurrentMonth]: !isCurrentMonth,
    [styles.active]: isDateInRange,
  });

  return (
    <button data-date={date.format('YYYY-MM-DD')} className={className}>
      {date.date()}
    </button>
  );
};

export default DateButton;
