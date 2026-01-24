import { getStyles } from '../../lib/getStyles';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import styles from './Textarea.module.scss';
import { useState } from 'react';


export const Textarea = ({
    label,
    className,
    error,
    onChange,
    fullWidth,
    ...otherProps
}) => {

    const [text, setText] = useState(otherProps.value || '');

    const handleChange = (e) => {
        setText(e.target.value);
        if (onChange) {
            onChange(e);
        }
    };

    const mode = {
        [styles.error]: !!error,
        [styles.fullWidth]: fullWidth,
    };

    const additional = [
        className,
    ];

    const textareaClass = getStyles(styles.textarea, mode, additional);

    return (
        <Stack direction="column" gap={4} fullWidth>
            {label && (
                <label className={styles.label} htmlFor={otherProps.name}>
                    {label} 
                </label>
            )}
            <Stack className={styles.contTextarea} direction="column" fullWidth>
                <textarea
                    className={textareaClass}
                    onChange={handleChange}
                    {...otherProps}
                />
                <Text size={12} color='text-error' tag='span'>
                    {error ? error.message : ''}
                </Text>
            </Stack>
                {otherProps.maxLength && (
                    <Text size={12} className={styles.maxLength}>
                        {text.length} / {otherProps.maxLength}

                    </Text>
                )}
            </Stack>
    );
};