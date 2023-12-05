import type { Dayjs } from 'dayjs';

import styles from './index.module.css';

type DateRangeDisplayProps = {
  dateRange: [Dayjs | null, Dayjs | null];
};

const DateRangeDisplay = ({ dateRange }: DateRangeDisplayProps) => {
  return (
    <div className={styles.dateRangeDisplay}>
      <span className={styles.dateLeft}>{dateRange[0]?.format('YYYY-MM-DD')}</span>
      <span className={styles.separator}> ~ </span>
      <span className={styles.dateRight}>{dateRange[1]?.format('YYYY-MM-DD')}</span>
    </div>
  );
};

export default DateRangeDisplay;
