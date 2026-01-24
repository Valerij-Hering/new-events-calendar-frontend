/* -------------------------------------------------------------------------- */
/*                                 COLOR MAP                                  */
/* -------------------------------------------------------------------------- */
const colorMap = {
    white: "var(--white-color)",
    whiteSoft: "var(--white-soft-color)",
    blue: "#3780ff",
    black: "var(--black-color)",
    blackSoft: "var(--black-soft-color)",
    grey: "var(--grey-color)",
};

const getResolvedColor = (color) => colorMap[color] || color;

/* -------------------------------------------------------------------------- */
/*                                CHECK ICON                                  */
/* -------------------------------------------------------------------------- */
export const CheckIcon = ({
    color = "currentColor",
    size = 24,
    className,
    ...otherProps
    }) => {
    const resolvedColor = getResolvedColor(color);

    return (
    <svg
        xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={resolvedColor}
        className={className}
        {...otherProps}
    > 
        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /> 
    </svg>
    );
};
