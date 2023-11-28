import { useState } from 'react';
import { type Dayjs } from 'dayjs';
import styles from './App.module.css';
import DateRangePicker from '@/components/DateRangePicker';
import DateRangeDisplay from './components/DateRangeDisplay';

const App = () => {
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);

  const handleChange = (startDate: Dayjs | null, endDate: Dayjs | null) => {
    setDateRange([startDate, endDate]);
  };

  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <h1>Date Range Picker</h1>
        <DateRangeDisplay dateRange={dateRange} />
        <DateRangePicker onChange={handleChange} />
      </div>
    </div>
  );
};

export default App;
