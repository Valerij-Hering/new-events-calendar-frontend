import { getStyles } from "../../lib/getStyles"
import PropTypes from "prop-types"
import styles from "./Stack.module.scss"

const directionClasses = {
    row: styles.directionRow,
    column: styles.directionColumn,
    column_reverse: styles.directionColumnReverse,
};

const justifyClasses = {
    start: styles.justifyStart,
    center: styles.justifyCenter,
    end: styles.justifyEnd,
    evenly: styles.justifyEvenly,
    between: styles.justifyBetween,
    around: styles.justifyAround,
};

const alignClasses = {
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
    stretch: styles.alignStretch,
};

const gapClasses = {
    4: styles.gap4,
    8: styles.gap8,
    12: styles.gap12,
    16: styles.gap16,
    24: styles.gap24,
    32: styles.gap32,
    48: styles.gap48,
    64: styles.gap64
};

export const Stack = (props) => {
    const {
        className,
        children,
        direction = 'row',
        justify = 'start',
        align = 'start',
        gap,
        fullWidth,
        tag = 'div',
        wrap,
        ...otherProps
    } = props;
    

    const mapStackTag = {
        div: 'div',
        section: 'section',
        article: 'article',
        aside: 'aside',
        main: 'main',
        nav: 'nav',
        header: 'header',
        ul: 'ul',
        form: 'form'
    };

    const StackTag = mapStackTag[tag] || 'div';

    const additional = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
    ];

    const mods = {
        [styles.fullWidth]: fullWidth,
        [styles.wrap]: wrap,
    };

    return (
        <StackTag
            className={getStyles(styles.flex, mods, additional)}
            {...otherProps}
        >
            {children}
        </StackTag>
    );
};

Stack.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    direction: PropTypes.oneOf(['row', 'column', 'column-reverse']),
    justify: PropTypes.oneOf(['start', 'center', 'end', 'between', 'around']),
    align: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
    gap: PropTypes.oneOf([4, 8, 12, 16, 24, 32, 48, 64]),
    fullWidth: PropTypes.bool,
    tag: PropTypes.oneOf(['div', 'section', 'article', 'aside', 'main', 'nav', 'header']),
    wrap: PropTypes.bool,
};