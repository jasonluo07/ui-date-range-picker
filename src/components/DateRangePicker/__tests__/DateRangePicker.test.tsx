import { render, screen, fireEvent } from '@testing-library/react';
import DateRangePicker from '@/components/DateRangePicker';
import dayjs from 'dayjs';
import { formatMonth } from '@/utils/date';

describe('DateRangePicker Component', () => {
  beforeEach(() => {
    render(<DateRangePicker />);
  });

  describe('Month Selection Functionality', () => {
    const currentMonth = dayjs();
    const prevMonth = currentMonth.subtract(1, 'month');
    const nextMonth = currentMonth.add(1, 'month');

    it('displays current month', () => {
      expect(screen.getByText(formatMonth(currentMonth))).toBeInTheDocument();
    });

    it('displays October 2023 when previous month button is clicked', () => {
      fireEvent.click(screen.getByRole('button', { name: '<' }));
      expect(screen.getByText(formatMonth(prevMonth))).toBeInTheDocument();
    });

    it('displays December 2023 when next month button is clicked', () => {
      fireEvent.click(screen.getByRole('button', { name: '>' }));
      expect(screen.getByText(formatMonth(nextMonth))).toBeInTheDocument();
    });
  });

  describe('Date Selection Functionality', () => {
    it('activates selected start and end dates', () => {
      const startButton = screen.getByRole('button', { name: '10日' });
      const endButton = screen.getByRole('button', { name: '15日' });

      fireEvent.click(startButton);
      expect(startButton.getAttribute('class')).toMatch('active');

      fireEvent.click(endButton);
      expect(endButton.getAttribute('class')).toMatch('active');
    });

    it('updates start date when a prior date is selected as end date', () => {
      const startButton = screen.getByRole('button', { name: '10日' });
      const endButton = screen.getByRole('button', { name: '9日' });

      fireEvent.click(startButton);
      fireEvent.click(endButton);

      expect(startButton.getAttribute('class')).not.toMatch('active');
      expect(endButton.getAttribute('class')).toMatch('active');
    });

    it('resets end date and sets start date when a new date is selected after a range', () => {
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
