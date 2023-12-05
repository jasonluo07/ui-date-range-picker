import dayjs, { type Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useCallback, useEffect, useState } from 'react';

import Calendar from './Calendar';
import Header from './Header';
import styles from './index.module.css';

dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

type DateRangePickerProps = {
  onChange?: (startDate: Dayjs | null, endDate: Dayjs | null) => void;
};

const DateRangePicker = ({ onChange }: DateRangePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleGoToPrevMonth = useCallback(() => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  }, [currentMonth]);

  const handleGoToNextMonth = useCallback(() => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  }, [currentMonth]);

  const handlePickDateRange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLButtonElement;
    if (target.tagName !== 'BUTTON') return;

    const pickedDate = dayjs(target.dataset.date);

    if (!startDate || pickedDate.isBefore(startDate) || (startDate && endDate)) {
      setStartDate(pickedDate);
      setEndDate(null);
    } else if (pickedDate.isSameOrAfter(startDate)) {
      setEndDate(pickedDate);
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(startDate, endDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  return (
    <div className={styles.dateRangePicker}>
      <Header currentMonth={currentMonth} onGoToPrevMonth={handleGoToPrevMonth} onGoToNextMonth={handleGoToNextMonth} />
      <Calendar
        startDate={startDate}
        endDate={endDate}
        currentMonth={currentMonth}
        onPickDateRange={handlePickDateRange}
      />
    </div>
  );
};

export default DateRangePicker;
