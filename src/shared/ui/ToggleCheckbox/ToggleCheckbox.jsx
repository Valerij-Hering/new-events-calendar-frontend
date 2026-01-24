import { forwardRef, useCallback } from "react";
import styles from "./ToggleCheckbox.module.scss";
import { Text } from "@/shared/ui/Text/Text";

export const ToggleCheckbox = forwardRef(
  ({ label, disabled, onChange, ...props }, ref) => {

    const playSound = useCallback(() => {
      const audio = new Audio("/click.mp3"); // положи файл в public/click.mp3
      audio.volume = 0.25;
      audio.play().catch(() => {});
    }, []);

    const triggerVibration = useCallback(() => {
      if (disabled) return;
      if (navigator.vibrate) {
        navigator.vibrate(20);
      }
    }, [disabled]);

    const handleToggle = (e) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      playSound();
      triggerVibration();
      onChange?.(e);
    };

    return (
      <label className={styles.toggleWrapper} data-disabled={disabled}>
        <div className={styles.toggle}>
          <input
            ref={ref}
            type="checkbox"
            disabled={disabled}
            onChange={handleToggle}
            className={styles.input}
            {...props}
          />
          <div className={styles.slider}></div>
        </div>
        {label && <Text color="text-primary">{label}</Text>}
      </label>
    );
  }
);
