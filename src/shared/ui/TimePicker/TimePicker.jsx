import { useState, useRef, useEffect } from "react";
import { ClockIcon } from "../../../assets/svg/Icons";
import styles from "./TimePicker.module.scss";
import { Text } from "@/shared/ui/Text/Text";
import { Stack } from '@/shared/ui/Stack/Stack';
import { Button } from "../Button/Button";
import { useTranslation } from "react-i18next";

export const TimePicker = ({ label, onOk, onCancel, required, error, align = "left", ...props }) => {
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState("00");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const { t } = useTranslation('common');

  const ref = useRef(null);
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

  const extendedHours = [...hours, ...hours, ...hours];
  const extendedMinutes = [...minutes, ...minutes, ...minutes];

  const ITEM_HEIGHT = 40;
  const VISIBLE = 5;
  const OFFSET = Math.floor(VISIBLE / 2) * ITEM_HEIGHT;

  const scrollToMiddle = (el) => {
    if (!el) return;
    el.scrollTop = (el.scrollHeight / 3) - OFFSET;
  };

  useEffect(() => {
    if (open) {
      scrollToMiddle(hoursRef.current);
      scrollToMiddle(minutesRef.current);
    }
  }, [open]);

  useEffect(() => {
    const handleScroll = (el, list, setter) => {
    if (!el) return;
    const index = Math.round((el.scrollTop + OFFSET) / ITEM_HEIGHT);
    const realIndex = index % list.length;
    setter(list[realIndex]);
  };

    const hEl = hoursRef.current;
    const mEl = minutesRef.current;

    const onHScroll = () => handleScroll(hEl, hours, setSelectedHour);
    const onMScroll = () => handleScroll(mEl, minutes, setSelectedMinute);

    if (hEl && mEl) {
      hEl.addEventListener("scroll", onHScroll);
      mEl.addEventListener("scroll", onMScroll);
    }

    return () => {
      hEl?.removeEventListener("scroll", onHScroll);
      mEl?.removeEventListener("scroll", onMScroll);
    };
  }, [open]);


  

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOkClick = () => {
    setTime(`${selectedHour}:${selectedMinute}`);
    onOk?.(`${selectedHour}:${selectedMinute}`);
    setOpen(false);
  };

  const handleCancelClick = () => {
    onCancel?.();
    setOpen(false);
  };

  return (
    <Stack ref={ref} direction='column' gap='4' className={styles.containerTimePicker} fullWidth>
      {label && <label className={styles.label}>{label}</label>}

      <Stack className={styles.inputWrapper}>
        <input
          value={time}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          required={required}
          readOnly
          placeholder="00:00"
          className={styles.input}
          {...props}
        />
        <ClockIcon size={22} color='text_primary' className={styles.clock} />
      </Stack>

      {open && (
        <div className={styles.pickerModal}style={{left: align === "left" ? 0 : "auto", right: align === "right" ? 0 : "auto",}}>
          <Text className={styles.title} color='text-strong' fontStyle="poppins500">{t("timePicker.Select Time")}</Text>

          <Stack justify='center' align='center' className={styles.drumsWrapper}>
            <div className={styles.drum} ref={hoursRef}>
              {extendedHours.map((h, i) => (
                <div key={i} className={styles.item}>{h}</div>
              ))}
            </div>
            <Text color='text-strong' size='24'>:</Text>
            <div className={styles.drum} ref={minutesRef}>
              {extendedMinutes.map((m, i) => (
                <div key={i} className={styles.item}>{m}</div>
              ))}
            </div>

            <div className={styles.centerHighlight} />
          </Stack>

          <div className={styles.actions}>
            <Button variant='subtle' size='small' color='dark' type="button"  onClick={handleCancelClick}>
              {t("button.Cancel")}
            </Button>
            <Button type="button" size='small' fullWidth onClick={handleOkClick}>
              {t("button.OK")}
            </Button>
          </div>
        </div>
      )}
      <Text className={styles.message} tag='span' size={12} color='text-error'>
        {error ? error.message : ''}
      </Text>
    </Stack>
  );
};
