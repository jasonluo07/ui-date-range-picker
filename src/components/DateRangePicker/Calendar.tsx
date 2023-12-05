import {
  getDatesInCurrentMonth,
  getIsDateInRange,
  getPartialDatesInNextMonth,
  getPartialDatesInPrevMonth,
} from '@/utils/date';
import dayjs, { type Dayjs } from 'dayjs';
import { useMemo } from 'react';

import styles from './Calendar.module.css';
import DateButton from './DateButton';

type CalendarProps = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  currentMonth: Dayjs;
  onPickDateRange: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Calendar = ({ startDate, endDate, currentMonth, onPickDateRange }: CalendarProps) => {
  const today = dayjs();

  const { partialDatesInPrevMonth, partialDatesInNextMonth, datesInCurrentMonth } = useMemo(() => {
    return {
      datesInCurrentMonth: getDatesInCurrentMonth(currentMonth),
      partialDatesInPrevMonth: getPartialDatesInPrevMonth(currentMonth),
      partialDatesInNextMonth: getPartialDatesInNextMonth(currentMonth),
    };
  }, [currentMonth]);

  const renderDateButtons = () => {
    const prevMonth = currentMonth.subtract(1, 'month');
    const nextMonth = currentMonth.add(1, 'month');

    return (
      <>
        {partialDatesInPrevMonth.map(date => {
          const dayjsDate = prevMonth.set('date', date);
          const isDateInRange = getIsDateInRange(dayjsDate, startDate, endDate);

          return <DateButton date={dayjsDate} isDateInRange={isDateInRange} key={`prev-${date}`} />;
        })}
        {datesInCurrentMonth.map(date => {
          const dayjsDate = currentMonth.set('date', date);
          const isDateInRange = getIsDateInRange(dayjsDate, startDate, endDate);
          const isToday = dayjsDate.isSame(today, 'day');

          return (
            <DateButton
              date={dayjsDate}
              isToday={isToday}
              isCurrentMonth
              isDateInRange={isDateInRange}
              key={`current-${date}`}
            />
          );
        })}
        {partialDatesInNextMonth.map(date => {
          const dayjsDate = nextMonth.set('date', date);
          const isDateInRange = getIsDateInRange(dayjsDate, startDate, endDate);

          return <DateButton date={dayjsDate} isDateInRange={isDateInRange} key={`next-${date}`} />;
        })}
      </>
    );
  };

  return (
    <div className={styles.calendar} onClick={onPickDateRange}>
      {renderDateButtons()}
    </div>
  );
};

export default Calendar;
