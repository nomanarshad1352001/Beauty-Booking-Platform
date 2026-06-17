import { useState, useMemo } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore, startOfToday, getDay, addMonths, subMonths } from 'date-fns';
import { useBookingStore } from '@/lib/stores/bookingStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/data/services';
import { generateTimeSlots } from '@/lib/utils/time-slots';
import { formatTime } from '@/lib/utils/formatters';
import { cn } from '@/utils/cn';

export function StepDateTime() {
  const { selectedServiceId, selectDateTime, prevStep } = useBookingStore();
  const service = services.find((s) => s.id === selectedServiceId);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const today = startOfToday();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDay = getDay(monthStart);

  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const timeSlots = useMemo(() => {
    if (!selectedDate || !service) return [];
    return generateTimeSlots(selectedDate, service.duration);
  }, [selectedDate, service]);

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" size="sm" onClick={prevStep} className="mb-4 -ml-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h2
          className="text-2xl font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Pick a Date & Time
        </h2>
        <p className="mt-1 text-[hsl(var(--muted-foreground))]">
          Select your preferred appointment date and time.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Calendar */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                disabled={isSameMonth(currentMonth, today)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="font-semibold">{format(currentMonth, 'MMMM yyyy')}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-[hsl(var(--muted-foreground))] py-2">
                  {day}
                </div>
              ))}

              {/* Empty cells for days before month starts */}
              {Array.from({ length: startDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}

              {days.map((day) => {
                const dateStr = format(day, 'yyyy-MM-dd');
                const isPast = isBefore(day, today);
                const isSunday = getDay(day) === 0;
                const isDisabled = isPast || isSunday;
                const isSelected = selectedDate === dateStr;
                const isTodayDate = isToday(day);

                // Max bookable: 60 days out
                const maxDate = addDays(today, 60);
                const isTooFar = day > maxDate;

                return (
                  <button
                    key={dateStr}
                    onClick={() => !isDisabled && !isTooFar && setSelectedDate(dateStr)}
                    disabled={isDisabled || isTooFar}
                    className={cn(
                      'h-10 w-full rounded-lg text-sm font-medium transition-colors',
                      isSelected
                        ? 'bg-[hsl(var(--primary))] text-white'
                        : isTodayDate
                        ? 'border border-[hsl(var(--primary))] text-[hsl(var(--primary))]'
                        : isDisabled || isTooFar
                        ? 'text-[hsl(var(--muted-foreground))]/30 cursor-not-allowed'
                        : 'hover:bg-[hsl(var(--accent))] text-[hsl(var(--foreground))]'
                    )}
                  >
                    {format(day, 'd')}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Time Slots */}
        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold mb-4">
              {selectedDate
                ? `Available Times — ${format(new Date(selectedDate + 'T00:00:00'), 'EEEE, MMM d')}`
                : 'Select a date to see available times'}
            </h3>

            {!selectedDate ? (
              <div className="flex items-center justify-center h-48 text-sm text-[hsl(var(--muted-foreground))]">
                Please select a date from the calendar.
              </div>
            ) : timeSlots.length === 0 ? (
              <div className="flex items-center justify-center h-48 text-sm text-[hsl(var(--muted-foreground))]">
                No available slots for this date.
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-80 overflow-y-auto">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => selectDateTime(selectedDate, time)}
                    className="rounded-lg border border-[hsl(var(--border))] px-3 py-2.5 text-sm font-medium hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/5 hover:text-[hsl(var(--primary))] transition-colors"
                  >
                    {formatTime(time)}
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
