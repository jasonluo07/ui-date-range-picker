import dayjs, { type Dayjs } from 'dayjs';

import styles from './Calendar.module.css';
import { getPartialDatesInPrevMonth, getPartialDatesInNextMonth, getIsDateInRange } from '@/utils/date';

import DateButton from './DateButton';

type CalendarProps = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  currentMonth: Dayjs;
  onPickDateRange: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Calendar = ({ startDate, endDate, currentMonth, onPickDateRange }: CalendarProps) => {
  const today = dayjs();

  const renderDateButtons = () => {
    const partialDatesInPrevMonth = getPartialDatesInPrevMonth(currentMonth);
    const partialDatesInNextMonth = getPartialDatesInNextMonth(currentMonth);
    const datesInCurrentMonth = Array.from({ length: currentMonth.daysInMonth() }, (_, i) => i + 1);

    return (
      <>
        {partialDatesInPrevMonth.map((date) => {
          const dayjsDate = currentMonth.subtract(1, 'month').set('date', date);
          const isDateInRange = getIsDateInRange(dayjsDate, startDate, endDate);

          return (
            <DateButton
              date={dayjsDate}
              isToday={false}
              isCurrentMonth={false}
              isDateInRange={isDateInRange}
              key={`prev-${date}`}
            />
          );
        })}
        {datesInCurrentMonth.map((date) => {
          const dayjsDate = currentMonth.set('date', date);
          const isDateInRange = getIsDateInRange(dayjsDate, startDate, endDate);
          const isToday = dayjsDate.isSame(today, 'day');

          return (
            <DateButton
              date={dayjsDate}
              isToday={isToday}
              isCurrentMonth={true}
              isDateInRange={isDateInRange}
              key={`current-${date}`}
            />
          );
        })}
        {partialDatesInNextMonth.map((date) => {
          const dayjsDate = currentMonth.add(1, 'month').set('date', date);
          const isDateInRange = getIsDateInRange(dayjsDate, startDate, endDate);

          return (
            <DateButton
              date={dayjsDate}
              isToday={false}
              isCurrentMonth={false}
              isDateInRange={isDateInRange}
              key={`next-${date}`}
            />
          );
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
