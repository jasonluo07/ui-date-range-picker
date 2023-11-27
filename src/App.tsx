import { useState } from 'react';
import { type Dayjs } from 'dayjs';
import styles from './App.module.css';
import DateRangePicker from '@/components/DateRangePicker';

const App = () => {
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);

  const handleChange = (startDate: Dayjs | null, endDate: Dayjs | null) => {
    setDateRange([startDate, endDate]);
  };

  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <h1>Date Range Picker</h1>
        <div className={styles.dateRangeDisplay}>
          <span className={styles.dateLeft}>{dateRange[0]?.format('YYYY-MM-DD')}</span>
          <span className={styles.separator}> ~ </span>
          <span className={styles.dateRight}>{dateRange[1]?.format('YYYY-MM-DD')}</span>
        </div>
        <DateRangePicker onChange={handleChange} />
      </div>
    </div>
  );
};

export default App;
