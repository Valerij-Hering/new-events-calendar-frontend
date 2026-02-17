import styles from './CalendarCell.module.scss'
import { getStyles } from '@/shared/lib/getStyles'
import { Stack } from '@/shared/ui/Stack/Stack'
import { Text } from "@/shared/ui/Text/Text"


const getDayColor = ({ isToday, status, isPastDate, isWeekend }) => {
  if (isToday) return "text-inverse";
  if (status === "active") return "text-inverse"; 
  if (status === "past") return "text-error";
  if (isPastDate) return "text-secondary"; 
  if (isWeekend) return "text-accent-primary";  
  
    
  return "text-primary";                      
};

export const CalendarCell = ({
  day,
  eventCount,
  status,
  isToday,
  isSelected,
  isPastDate,
  isWeekend,
  isHoliday,      
  onClick,
  variant = "month",
  
}) => {

  return (
    <Stack align='center' justify='center' fullWidth>
      <Stack
        className={getStyles(
          styles.cell,
          {
            [styles.year]: variant === "year",
            [styles.selected]: isSelected,
            [styles.today]: isToday,
            [styles.active]: status === "active",
            [styles.past]: status === "past",
            [styles.pastDate]: isPastDate && !isToday && !isSelected,
          },
          []
        )}
        onClick={onClick}
        justify='center'
        align='center'
      >
        <Text color={getDayColor({ isToday, status, isPastDate, isWeekend, })} >
          {day}
        </Text>
        {eventCount > 0 && (
          <Text className={getStyles(styles.eventCount,{[styles.year]: variant === "year"},[])} style={{ backgroundColor: getDayColor(status) }} size="10" fontStyle="poppins600" tag='span' color='text-inverse'>
            {eventCount}
          </Text>
        )}
        {isHoliday && <span className={getStyles(styles.holidayDot,{[styles.year]: variant === "year"},[])} />}
      </Stack>
    </Stack>
  );
};
