import { useState, useRef, useEffect } from "react";
import styles from "./DatePicker.module.scss";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Button } from "../Button/Button";
import { Text } from "@/shared/ui/Text/Text";
import { CalendarIcon } from "../../../assets/svg/Icons";
import { useTranslation } from "react-i18next";

export const DatePicker = ({ label, onOk, onCancel, error, ...props }) => {
  const { i18n, t } = useTranslation("common");
  const lang = i18n.language || "en";
  const ref = useRef(null);

  const today = new Date();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  // 🔹 Сдвиг индекса, чтобы неделя начиналась с понедельника
  const firstDayOfMonth = (year, month) => {
    const day = new Date(year, month, 1).getDay(); // 0 = Sun
    return day === 0 ? 6 : day - 1; // Понедельник = 0, Воскресенье = 6
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleOkClick = () => {
    if (selectedDate) {
      onOk?.(selectedDate);
      setOpen(false);
    }
  };

  const handleCancelClick = () => {
    onCancel?.();
    setOpen(false);
  };

  const formattedDate = selectedDate
    ? `${String(selectedDate.getDate()).padStart(2, "0")}.${String(
        selectedDate.getMonth() + 1
      ).padStart(2, "0")}.${selectedDate.getFullYear()}`
    : "";

  const monthNames = {
    en: [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ],
    ru: [
      "Январь","Февраль","Март","Апрель","Май","Июнь",
      "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"
    ],
    de: [
      "Januar","Februar","März","April","Mai","Juni",
      "Juli","August","September","Oktober","November","Dezember"
    ],
  };

  const weekDays = {
    en: ["Mo","Te","We","Th","Fr","Sa","Su"],
    ru: ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],
    de: ["Mo","Di","Mi","Do","Fr","Sa","So"],
  };

  const renderCalendar = () => {
    const totalDays = daysInMonth(currentYear, currentMonth);
    const startDay = firstDayOfMonth(currentYear, currentMonth);

    const cells = [];

    // Пустые ячейки до первого дня месяца
    for (let i = 0; i < startDay; i++) {
      cells.push(<div key={`empty-${i}`} className={styles.emptyCell} />);
    }

    // Ячейки дней месяца
    for (let d = 1; d <= totalDays; d++) {
      const dateObj = new Date(currentYear, currentMonth, d);
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === d &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear;

      const isToday =
        today.getDate() === d &&
        today.getMonth() === currentMonth &&
        today.getFullYear() === currentYear;

      cells.push(
        <button
          key={d}
          type="button"
          className={`${styles.dayCell} ${isSelected ? styles.selected : ""} ${
            isToday ? styles.today : ""
          }`}
          onClick={() => setSelectedDate(dateObj)}
        >
          {d}
        </button>
      );
    }

    return cells;
  };

  return (
    <Stack ref={ref} direction="column" gap="4" fullWidth>
      {label && <label className={styles.label}>{label}</label>}

      <Stack className={styles.inputWrapper} fullWidth>
        <input
          readOnly
          placeholder={t("input.placeholder.DD.MM.YYYY")}
          value={formattedDate}
          onClick={() => setOpen(true)}
          {...props}
          className={styles.input}
        />
        <CalendarIcon size={22} color="text_primary" className={styles.calendar}/>
      </Stack>

      {open && (
        <div className={styles.pickerModal}>
          <Stack justify="between" align="center" className={styles.header}>
            <Button variant="subtle" type="button" onClick={handlePrevMonth}>{"<"}</Button>
            <Text>{monthNames[lang][currentMonth]} {currentYear}</Text>
            <Button variant="subtle" type="button" onClick={handleNextMonth}>{">"}</Button>
          </Stack>

          {/* 🔹 Дни недели */}
          <div className={styles.weekDays}>
            {weekDays[lang].map((day) => (
              <Text key={day} className={styles.weekDayCell}>{day}</Text>
            ))}
          </div>

          <div className={styles.calendarGrid}>{renderCalendar()}</div>

          <Stack justify="between" gap="8" className={styles.actions}>
            <Button variant="subtle" size="small" color="dark" type="button" onClick={handleCancelClick} fullWidth>
              {t("button.Cancel")}
            </Button>
            <Button type="button" size="small" onClick={handleOkClick} fullWidth>
              {t("button.OK")}
            </Button>
          </Stack>
        </div>
      )}

      <Text className={styles.message} tag="span" size={12} color="text-error">
        {error ? error.message : ""}
      </Text>
    </Stack>
  );
};
