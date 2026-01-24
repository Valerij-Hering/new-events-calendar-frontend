import { getStyles } from '@/shared/lib/getStyles';
import styles from './Text.module.scss';
import { useTranslation } from "react-i18next";

const sizeClasses = {
    8: styles.size8,
    10: styles.size10,
    12: styles.size12,
    13: styles.size13,
    14: styles.size14,
    16: styles.size16,
    18: styles.size18,
    20: styles.size20,
    22: styles.size22,
    24: styles.size24,
    28: styles.size28,
    29: styles.size29,
    32: styles.size32,
    34: styles.size34,
    42: styles.size42,
    46: styles.size46,
    48: styles.size48,
    64: styles.size64,
};

const lineHeightClasses = {
    1.2: styles.lh12,
    1.4: styles.lh14,
    1.6: styles.lh16,
    1.8: styles.lh18,
};

const colorClasses = {
    "text-inverse": styles.colorinverse,
    "text-strong": styles.colorstrong,
    "text-primary": styles.colorprimary,
    "text-accent-primary": styles.coloraccentPrimary,
    "text-accent-secondary": styles.coloraccentSecondary,
    "text-secondary": styles.colorsecondary,
    "text-error": styles.colorerorr,
    "text-success": styles.colorsuccess
};

const fontFamilyClasses = {
    ...Object.fromEntries(
        [100,200,300,400,500,600,700,800,900].map(weight => [
            `poppins${weight}`,
            styles[`poppins${weight}`],
        ])
    ),
    ...Object.fromEntries(
        [100,200,300,400,500,600,700,800,900].map(weight => [
            `inter${weight}`,
            styles[`inter${weight}`],
        ])
    ),

    ...Object.fromEntries(
        [600].map(weight => [
            `genos${weight}`,
            styles[`genos${weight}`],
        ])
    )
};

export const Text = (props) => {
    const {
        children,
        className,
        size,
        color = 'text-primary',
        fontStyle = 'poppins400', // poppinsXXX, ubuntuXXX, interXXX
        tag = 'p',
        lineHeight, 
        ...otherProps
    } = props;

    const { i18n } = useTranslation();

    // автоматический выбор шрифта в зависимости от языка
    let finalFontStyle = fontStyle;
    if (i18n.language === 'ru') {
        // например, заменяем poppinsXXX на rubikXXX
        finalFontStyle = fontStyle.replace(/^poppins/, 'inter');
    }

    const mapTextTag = {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        p: 'p',
        li: 'li',
        span: 'span',
    };

    const additionals = [
        className,
        sizeClasses[size],
        colorClasses[color],
        fontFamilyClasses[finalFontStyle],
        lineHeight && lineHeightClasses[lineHeight] 
    ];

    const TextTag = mapTextTag[tag];

    return (
        <TextTag
            className={getStyles(styles.text, {}, additionals)}
            {...otherProps}
        >
            {children}
        </TextTag>
    );
};

