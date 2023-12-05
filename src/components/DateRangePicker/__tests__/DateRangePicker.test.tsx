import DateRangePicker from '@/components/DateRangePicker';
import { formatMonth } from '@/utils/date';
import { fireEvent, render, screen } from '@testing-library/react';
import dayjs from 'dayjs';

describe('DateRangePicker Component', () => {
  beforeEach(() => {
    render(<DateRangePicker />);
  });

  describe('Date Button Functionality', () => {
    test('marks the button representing today\'s date with a "today" class', () => {
      const today = dayjs().format('YYYY-MM-DD');
      const todayButton = screen.getByText(
        (_content, element) =>
          element!.tagName.toLowerCase() === 'button' && element!.getAttribute('data-date') === today
      );
      expect(todayButton.getAttribute('class')).toMatch('today');
    });
  });

  describe('Month Selection Functionality', () => {
    const currentMonth = dayjs();
    const prevMonth = currentMonth.subtract(1, 'month');
    const nextMonth = currentMonth.add(1, 'month');

    test('displays current month', () => {
      expect(screen.getByText(formatMonth(currentMonth))).toBeInTheDocument();
    });

    test('displays October 2023 when previous month button is clicked', () => {
      fireEvent.click(screen.getByRole('button', { name: '<' }));
      expect(screen.getByText(formatMonth(prevMonth))).toBeInTheDocument();
    });

    test('displays December 2023 when next month button is clicked', () => {
      fireEvent.click(screen.getByRole('button', { name: '>' }));
      expect(screen.getByText(formatMonth(nextMonth))).toBeInTheDocument();
    });
  });

  describe('Date Selection Functionality', () => {
    test('activates selected start and end dates', () => {
      const startButton = screen.getByRole('button', { name: '10日' });
      const endButton = screen.getByRole('button', { name: '15日' });

      fireEvent.click(startButton);
      expect(startButton.getAttribute('class')).toMatch('active');

      fireEvent.click(endButton);
      expect(endButton.getAttribute('class')).toMatch('active');
    });

    test('updates start date when a prior date is selected as end date', () => {
      const startButton = screen.getByRole('button', { name: '10日' });
      const endButton = screen.getByRole('button', { name: '9日' });

      fireEvent.click(startButton);
      fireEvent.click(endButton);

      expect(startButton.getAttribute('class')).not.toMatch('active');
      expect(endButton.getAttribute('class')).toMatch('active');
    });

    test('resets end date and sets start date when a new date is selected after a range', () => {
      const startButton = screen.getByRole('button', { name: '10日' });
      const endButton = screen.getByRole('button', { name: '15日' });
      const newStartButton = screen.getByRole('button', { name: '20日' });

      fireEvent.click(startButton);
      fireEvent.click(endButton);
      fireEvent.click(newStartButton);

      expect(newStartButton.getAttribute('class')).toMatch('active');
      expect(startButton.getAttribute('class')).not.toMatch('active');
      expect(endButton.getAttribute('class')).not.toMatch('active');
    });
  });
});
