import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { DateTimeProps } from '../../models/dateTimeProps';

/**
 * A component that displays a formatted date and time.
 *
 * This component takes a date input and formats it according to the provided pattern
 * and timezone.
 *
 * @example
 * <DateTime
 *   dateTime={myDate}
 *   pattern="yyyy-MM-dd"
 *   timezone="America/New_York"
 * />
 */
export const DateTime = ({
  dateTime,
  className = '',
  pattern = 'MMM dd, yyyy',
  timezone = 'UTC',
  'data-testid': dataTestId = 'date-time',
}: DateTimeProps) => {
  const date = typeof dateTime === 'string' ? parseISO(dateTime) : dateTime;

  const formattedDate = format(toZonedTime(date, timezone), pattern);
  const isoString = date.toISOString();

  return (
    <time className={className} dateTime={isoString} data-testid={dataTestId}>
      {formattedDate}
    </time>
  );
};
