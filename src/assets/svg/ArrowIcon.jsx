/* -------------------------------------------------------------------------- */
/*                                 COLOR MAP                                  */
/* -------------------------------------------------------------------------- */
const colorMap = {
    "text-strong": "var(--color-text-strong)",
    "text-primary": "var(--color-text-primary)",
    "text-secondary": "var(--color-text-secondary)",
    "text-inverse": "var(--color-text-inverse)",
    "accent-primary": "var(--color-accent-primary)",
};


const getResolvedColor = (color) => colorMap[color] || color;

/* -------------------------------------------------------------------------- */
/*                                ARROW ICON                                  */
/* -------------------------------------------------------------------------- */

const rotationMap = {
    down: 0,
    top: 180,
    left: 90,
    right: -90,
};

export const ArrowIcon = ({
    color = "currentColor",
    size = 24,
    rotate = "down",
    className,
    ...otherProps
    }) => {
    const resolvedColor = getResolvedColor(color);

    // Вычисляем угол поворота
    const angle = rotationMap[rotate] ?? rotationMap.down;

    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={resolvedColor}
        style={{ transform: `rotate(${angle}deg)` }}
        className={className}
        {...otherProps}
        >
        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
        </svg>
    );
};
