import { formatMonth } from '@/utils/date';
import type { Dayjs } from 'dayjs';

import styles from './Header.module.css';

type HeaderProps = {
  currentMonth: Dayjs;
  onGoToPrevMonth: () => void;
  onGoToNextMonth: () => void;
};

const Header = ({ currentMonth, onGoToPrevMonth, onGoToNextMonth }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <button className={`${styles.monthSelect} ${styles.prevMonth}`} onClick={onGoToPrevMonth}>
        &lt;
      </button>
      <span>{formatMonth(currentMonth)}</span>
      <button className={`${styles.monthSelect} ${styles.nextMonth}`} onClick={onGoToNextMonth}>
        &gt;
      </button>
    </div>
  );
};

export default Header;
