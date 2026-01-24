import { getStyles } from '../../lib/getStyles';
import { Stack } from '../../ui/Stack/Stack'
import { Text } from '../Text/Text';
import styles from './Input.module.scss'
import { forwardRef } from "react";


export const Input = forwardRef(({
    label,
    type = 'text',
    required,
    error,
    className,
    onChange,
    fullWidth,
    ...otherProps
}, ref) => {
    

    const mode = {
        [styles.error]: !!error,
        [styles.fullWidth]: fullWidth,
    };

    const additional = [
        className,
    ];

    const inputClass = getStyles(styles.input, mode, additional);
    const stackClass = fullWidth ? styles.fullWidth : '';

    return (
        <Stack className={stackClass} direction="column" gap={4} align="start">
            {label && (
                <label className={styles.label} htmlFor={otherProps.name}>
                    {label} {required && <span className={styles.required}>*</span>}
                </label>
            )}
            <Stack className={stackClass} direction="column" gap={4}>
                
                <input
                    ref={ref}
                    type={type}
                    required={required}
                    onChange={onChange}
                    className={inputClass}
                    {...otherProps}
                />
                <Text tag='span' size={12} color='text-error'>
                    {error ? error.message : ''}
                </Text>
            </Stack>
        </Stack>
    );
});
