import * as React from 'react';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface FilterProps extends React.HTMLAttributes<HTMLDivElement> {
  onDateRangeChange?: (dateRange: DateRange | undefined) => void;
  defaultDateRange?: DateRange;
  placeholder?: string;
}

export function Filter({
  className,
  onDateRangeChange,
  defaultDateRange,
  placeholder = 'Pick a date',
  ...props
}: FilterProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(
    defaultDateRange || undefined,
  );

  React.useEffect(() => {
    onDateRangeChange?.(date);
  }, [date, onDateRangeChange]);

  const handleDateSelect = React.useCallback(
    (selectedDate: DateRange | undefined) => {
      setDate(selectedDate);
    },
    [],
  );

  return (
    <div className="flex w-full gap-4 h-fit" {...props}>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Filter period:</span>
        <div className={cn('grid gap-2', className)}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={'outline'}
                className={cn(
                  'w-[300px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground',
                )}
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} -{' '}
                      {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>{placeholder}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleDateSelect}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
