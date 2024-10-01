'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { format } from 'date-fns';
import { useRecurrenceStore } from '@/store/store';

export default function RecurringDatePicker() {
  const {
    startDate,
    endDate,
    recurrenceType,
    interval,
    selectedDays,
    monthlyOption,
    selectedMonthDays,
    selectedMonthWeek,
    yearlyOption,
    selectedMonth,
    selectedMonthDay,
    previewDates,
    setStartDate,
    setEndDate,
    setRecurrenceType,
    setInterval,
    setSelectedDays,
    setMonthlyOption,
    setSelectedMonthDays,
    setSelectedMonthWeek,
    setYearlyOption,
    setSelectedMonth,
    setSelectedMonthDay,
    updatePreviewDates,
  } = useRecurrenceStore();

  const handleDaySelect = (day: number) => {
    const newSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setSelectedDays(newSelectedDays);
  };

  const handleMonthDaySelect = (day: number) => {
    const newSelectedMonthDays = selectedMonthDays.includes(day)
      ? selectedMonthDays.filter((d) => d !== day)
      : [...selectedMonthDays, day];
    setSelectedMonthDays(newSelectedMonthDays);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-5 sm:gap-10 mt-5">
      <h1 className="text-xl text-bold">Calendar </h1>
      <div className="p-4 space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !startDate && 'text-muted-foreground'
                  )}
                >
                  {startDate ? (
                    format(startDate, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex-1">
            <Label>End Date (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !endDate && 'text-muted-foreground'
                  )}
                >
                  {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Recurrence</Label>
          <Select
            value={recurrenceType}
            onValueChange={(value: any) => setRecurrenceType(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select recurrence type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Every</Label>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              min={1}
              value={interval}
              onChange={(e) => setInterval(parseInt(e.target.value))}
              className="w-20"
            />
            <span>
              {recurrenceType === 'daily'
                ? 'day(s)'
                : recurrenceType === 'weekly'
                ? 'week(s)'
                : recurrenceType === 'monthly'
                ? 'month(s)'
                : 'year(s)'}
            </span>
          </div>
        </div>
        {recurrenceType === 'weekly' && (
          <div className="space-y-2">
            <Label>On</Label>
            <div className="flex flex-wrap gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                (day, index) => (
                  <Button
                    key={day}
                    variant={
                      selectedDays.includes(index) ? 'default' : 'outline'
                    }
                    onClick={() => handleDaySelect(index)}
                    className="w-12"
                  >
                    {day}
                  </Button>
                )
              )}
            </div>
          </div>
        )}
        {recurrenceType === 'monthly' && (
          <div className="space-y-2">
            <Label>On the</Label>
            <RadioGroup
              value={monthlyOption}
              onValueChange={(value: any) => setMonthlyOption(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dayOfMonth" id="dayOfMonth" />
                <Label htmlFor="dayOfMonth">Day of the month</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dayOfWeek" id="dayOfWeek" />
                <Label htmlFor="dayOfWeek">Day of the week</Label>
              </div>
            </RadioGroup>
            {monthlyOption === 'dayOfMonth' ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-start">
                    {selectedMonthDays.length > 0
                      ? `${selectedMonthDays.length} day(s) selected`
                      : 'Select days'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <ScrollArea className="h-[300px] p-4">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          id={`day-${day}`}
                          checked={selectedMonthDays.includes(day)}
                          onCheckedChange={() => handleMonthDaySelect(day)}
                        />
                        <label
                          htmlFor={`day-${day}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {day}
                        </label>
                      </div>
                    ))}
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="space-y-2">
                <Select
                  value={selectedMonthWeek.toString()}
                  onValueChange={(value) =>
                    setSelectedMonthWeek(parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select week" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">First</SelectItem>
                    <SelectItem value="2">Second</SelectItem>
                    <SelectItem value="3">Third</SelectItem>
                    <SelectItem value="4">Fourth</SelectItem>
                    <SelectItem value="-1">Last</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                    (day, index) => (
                      <Button
                        key={day}
                        variant={
                          selectedDays.includes(index) ? 'default' : 'outline'
                        }
                        onClick={() => handleDaySelect(index)}
                        className="w-12"
                      >
                        {day}
                      </Button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        {recurrenceType === 'yearly' && (
          <div className="space-y-2">
            <Label>On</Label>
            <RadioGroup
              value={yearlyOption}
              onValueChange={(value: any) => setYearlyOption(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="specificDate" id="specificDate" />
                <Label htmlFor="specificDate">Specific date</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="specificDay" id="specificDay" />
                <Label htmlFor="specificDay">
                  Specific day of week in month
                </Label>
              </div>
            </RadioGroup>
            {yearlyOption === 'specificDate' ? (
              <div className="flex space-x-2">
                <Select
                  value={selectedMonth.toString()}
                  onValueChange={(value) => setSelectedMonth(parseInt(value))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                      'August',
                      'September',
                      'October',
                      'November',
                      'December',
                    ].map((month, index) => (
                      <SelectItem key={month} value={index.toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  min={1}
                  max={31}
                  value={selectedMonthDay}
                  onChange={(e) =>
                    setSelectedMonthDay(parseInt(e.target.value))
                  }
                  className="w-20"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Select
                  value={selectedMonthWeek.toString()}
                  onValueChange={(value) =>
                    setSelectedMonthWeek(parseInt(value))
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select week" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">First</SelectItem>
                    <SelectItem value="2">Second</SelectItem>
                    <SelectItem value="3">Third</SelectItem>
                    <SelectItem value="4">Fourth</SelectItem>
                    <SelectItem value="-1">Last</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                    (day, index) => (
                      <Button
                        key={day}
                        variant={
                          selectedDays.includes(index) ? 'default' : 'outline'
                        }
                        onClick={() => handleDaySelect(index)}
                        className="w-12"
                      >
                        {day}
                      </Button>
                    )
                  )}
                </div>
                <Select
                  value={selectedMonth.toString()}
                  onValueChange={(value) => setSelectedMonth(parseInt(value))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                      'August',
                      'September',
                      'October',
                      'November',
                      'December',
                    ].map((month, index) => (
                      <SelectItem key={month} value={index.toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}
        <Button
          onClick={updatePreviewDates}
          className="hover:ring-yellow-300 hover:ring-2"
        >
          Update Preview
        </Button>
        <div>
          <Label>Preview</Label>
          <div className="border rounded p-2 mt-2 max-h-20 overflow-y-auto">
            {previewDates.map((date) => (
              <div key={date.toISOString()} className="">
                {format(date, 'yyyy-MM-dd')}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
