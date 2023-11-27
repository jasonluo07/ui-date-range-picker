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
        <h1>React Date Range Picker</h1>
        <div className={styles.dateRange}>
          {dateRange[0]?.format('YYYY-MM-DD')} ~ {dateRange[1]?.format('YYYY-MM-DD')}
        </div>
        <DateRangePicker onChange={handleChange} />
      </div>
    </div>
  );
};

export default App;
