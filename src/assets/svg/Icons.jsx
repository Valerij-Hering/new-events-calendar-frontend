/* -------------------------------------------------------------------------- */
/*                                 COLOR MAP                                  */
/* -------------------------------------------------------------------------- */
const colorMap = {
    text_inverse: "var(--color-text-inverse)",
    text_primary: "var(--color-text-primary)",
    text_accent_primary: "var(--color-accent-primary)",
    color_accent_secondary: "var(--color-accent-secondary)",
    text_strong: "var(--color-text-strong)",
    text_secondary: "var(--palette-grey-500)",
    text_error: "var(--color-text-error)",
    text_success: "var(--color-text-success)"
};

const getResolvedColor = (color) => colorMap[color] || color;

/* -------------------------------------------------------------------------- */
/*                               BOTTOM BARS ICON                              */
/* -------------------------------------------------------------------------- */
export const BottomBarsIcon = ({
    color = "currentColor",
    size = 24,
    className,
    ...otherProps
}) => {
    const resolvedColor = getResolvedColor(color);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={size}
            height={size}
            fill={resolvedColor}
            className={className}
            {...otherProps}
        >
            <circle cx="256" cy="256" r="48" />
            <circle cx="416" cy="256" r="48" />
            <circle cx="96" cy="256" r="48" />
        </svg>
    );
};


/* -------------------------------------------------------------------------- */
/*                               REPEAT ICON                                   */
/* -------------------------------------------------------------------------- */
export const RepeatIcon = ({
    color = "currentColor",
    size = 24,
    className,
    ...otherProps
    }) => {
        const resolvedColor = getResolvedColor(color);
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={resolvedColor}
        className={className}
        {...otherProps}
        >
        <path d="M16.89,15.5L18.31,16.89C19.21,15.73 19.76,14.39 19.93,13H17.91C17.77,13.87 17.43,14.72 16.89,15.5M13,17.9V19.92C14.39,19.75 15.74,19.21 16.9,18.31L15.46,16.87C14.71,17.41 13.87,17.76 13,17.9M19.93,11C19.76,9.61 19.21,8.27 18.31,7.11L16.89,8.53C17.43,9.28 17.77,10.13 17.91,11M15.55,5.55L11,1V4.07C7.06,4.56 4,7.92 4,12C4,16.08 7.05,19.44 11,19.93V17.91C8.16,17.43 6,14.97 6,12C6,9.03 8.16,6.57 11,6.09V10L15.55,5.55Z"/>
        </svg>
    );
};


/* -------------------------------------------------------------------------- */
/*                               REFRESH ICON                                  */
/* -------------------------------------------------------------------------- */
export const RefreshIcon = ({
    color = "currentColor",
    size = 24,
    className,
    ...otherProps
}) => {
    const resolvedColor = getResolvedColor(color);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={resolvedColor}
            className={className}
            {...otherProps}
        >
            <path d="M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z" />
        </svg>
    );
};


/* -------------------------------------------------------------------------- */
/*                               CLOCK ICON                                   */
/* -------------------------------------------------------------------------- */
export const ClockIcon = ({
    color = "currentColor",
    size = 24,
    className,
    ...otherProps
}) => {

    const resolvedColor = getResolvedColor(color);
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={resolvedColor}
            className={className}
            {...otherProps}
        >
            <path d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M17 13.9L16.3 15.2L11 12.3V7H12.5V11.4L17 13.9Z" />
        </svg>
    );
};


/* -------------------------------------------------------------------------- */
/*                              EDIT CIRCLE ICON                              */
/* -------------------------------------------------------------------------- */
export const EditCircleIcon = ({
    color = "currentColor",
    size = 24,
    className,
    ...otherProps
    }) => {
    const resolvedColor = getResolvedColor(color);

    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={resolvedColor}
        className={className}
        {...otherProps}
        >
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12H20A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4V2M18.78,3C18.61,3 18.43,3.07 18.3,3.2L17.08,4.41L19.58,6.91L20.8,5.7C21.06,5.44 21.06,5 20.8,4.75L19.25,3.2C19.12,3.07 18.95,3 18.78,3M16.37,5.12L9,12.5V15H11.5L18.87,7.62L16.37,5.12Z" />
        </svg>
    );
};


/* -------------------------------------------------------------------------- */
/*                                  USER ICON                                 */
/* -------------------------------------------------------------------------- */
export const UserIcon = ({
    size = 24,
    color = "#ced2d4ff",
    className,
    ...props
    }) => {
        const resolvedColor = getResolvedColor(color);
        return (
        
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={resolvedColor}
        className={className}
        {...props}
    >
        <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
    </svg>
)
};


/* -------------------------------------------------------------------------- */
/*                               EYE ICON                                     */
/* -------------------------------------------------------------------------- */
    export const EyeIcon = ({
    color = "currentColor",
    size = 24,
    className,
    ...otherProps
    }) => {
        const resolvedColor = getResolvedColor(color);

    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={resolvedColor}
        className={className}
        {...otherProps}
        >
        <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z" />
        </svg>
    );
};


/* -------------------------------------------------------------------------- */
/*                               EYE OFF ICON                                 */
/* -------------------------------------------------------------------------- */
export const EyeOffIcon = ({
    color = "currentColor",
    size = 24,
    className,
    ...otherProps
    }) => {
        const resolvedColor = getResolvedColor(color);

    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={resolvedColor}
        className={className}
        {...otherProps}
        >
        <path d="M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z"/>
        </svg>
    );
};


/* -------------------------------------------------------------------------- */
/*                              CHECK CIRCLE ICON                             */
/* -------------------------------------------------------------------------- */
export const CheckCircleIcon = ({
    color = "currentColor",
    size = 24,
    className,
    ...otherProps
    }) => {

        const resolvedColor = getResolvedColor(color);
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width={size}
        height={size}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit="10"
        strokeWidth="32"
        className={className}
        {...otherProps}
        >
        <circle cx="256" cy="256" r="192" fill="none" />
        <path
            d="M352 176L217.6 336 160 272"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
        />
        </svg>
    );
};


/* -------------------------------------------------------------------------- */
/*                              X CIRCLE ICON                                 */
/* -------------------------------------------------------------------------- */
export const XCircleIcon = ({
    color = "currentColor",
    size = 24,
    className,
    ...otherProps
    }) => {

    const resolvedColor = getResolvedColor(color);
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width={size}
        height={size}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit="10"
        strokeWidth="32"
        className={className}
        {...otherProps}
        >
        <circle cx="256" cy="256" r="192" fill="none" />
        <path
            d="M320 320L192 192M192 320l128-128"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
        />
        </svg>
    );
};


/* -------------------------------------------------------------------------- */
/*                              QUESTION ICON                                 */
/* -------------------------------------------------------------------------- */
export const QuestionIcon = ({
    size = 24,
    color = "currentColor",
    className,
    ...otherProps
    }) => {
        const resolvedColor = getResolvedColor(color);
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width={size}
        height={size}
        fill="none"
        stroke={resolvedColor}
        className={className}
        {...otherProps}
        >
        <path
            d="M256 80a176 176 0 10176 176A176 176 0 00256 80z"
            strokeWidth="32"
            strokeMiterlimit="10"
        />
        <path
            d="M200 202.29s.84-17.5 19.57-32.57C230.68 160.77 244 158.18 256 158c10.93-.14 20.69 1.67 26.53 4.45 10 4.76 29.47 16.38 29.47 41.09 0 26-17 37.81-36.37 50.8S251 281.43 251 296"
            strokeWidth="28"
            strokeLinecap="round"
            strokeMiterlimit="10"
        />
        <circle cx="250" cy="348" r="20" fill={resolvedColor} />
        </svg>
    );
};


/* -------------------------------------------------------------------------- */
/*                              INFO ICON                                     */
/* -------------------------------------------------------------------------- */
export const InfoCircleIcon = ({
    size = 24,
    color = "currentColor",
    className,
    ...otherProps
    }) => {
        const resolvedColor = getResolvedColor(color);
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width={size}
        height={size}
        fill="none"
        stroke={resolvedColor}
        className={className}
        {...otherProps}
        >
        <path
            d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z"
            strokeWidth="32"
            strokeMiterlimit="10"
        />

        <path
            d="M220 220h32v116"
            strokeWidth="32"
            strokeLinecap="round"
            strokeLinejoin="round"
        />

        <path
            d="M208 340h88"
            strokeWidth="32"
            strokeLinecap="round"
        />

        <circle cx="248" cy="156" r="26" fill={resolvedColor} />
        </svg>
    );
};




/* -------------------------------------------------------------------------- */
/*                               DELETE ICON                                  */
/* -------------------------------------------------------------------------- */
export const DeleteIcon = ({
    color = "currentColor",
    size = 24,
    className,
    ...otherProps
    }) => {

    const resolvedColor = getResolvedColor(color);
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={resolvedColor}
        className={className}
        {...otherProps}
        >
        <path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"/>
        </svg>
    );
};


/* -------------------------------------------------------------------------- */
/*                               CALENDAR ICON                                */
/* -------------------------------------------------------------------------- */
export const CalendarIcon = ({
    color = "currentColor",
    size = 24,
    className,
    ...otherProps
    }) => {

    const resolvedColor = getResolvedColor(color);
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={resolvedColor}
        className={className}
        {...otherProps}
        >
        <path d="M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z"/>
        </svg>
    );
};


/* -------------------------------------------------------------------------- */
/*                                MAIL ICON                                   */
/* -------------------------------------------------------------------------- */
export const MailIcon = ({
    color = "currentColor",
    size = 24,
    className,
    ...otherProps
}) => {
    const resolvedColor = getResolvedColor(color);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={resolvedColor}
            className={className}
            {...otherProps}
        >
            <path d="M12 .64L8.23 3H5V5L2.97 6.29C2.39 6.64 2 7.27 2 8V18C2 19.11 2.9 20 4 20H20C21.11 20 22 19.11 22 18V8C22 7.27 21.61 6.64 21.03 6.29L19 5V3H15.77M7 5H17V9.88L12 13L7 9.88M8 6V7.5H16V6M5 7.38V8.63L4 8M19 7.38L20 8L19 8.63M8 8.5V10H16V8.5Z" />
        </svg>
    );
};

/* -------------------------------------------------------------------------- */
/*                              EDIT SQUARE ICON                               */
/* -------------------------------------------------------------------------- */
export const EditSquareIcon = ({
    color = "currentColor",
    size = 24,
    className,
    ...otherProps
}) => {
    const resolvedColor = getResolvedColor(color);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={resolvedColor}
            className={className}
            {...otherProps}
        >
            <path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
        </svg>
    );
};

/* -------------------------------------------------------------------------- */
/*                               SETTINGS ICON                                */
/* -------------------------------------------------------------------------- */
export const SettingsIcon = ({
    color = "currentColor",
    size = 24,
    className,
    ...otherProps
    }) => {
    const resolvedColor = getResolvedColor(color);

    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={resolvedColor}
        className={className}
        {...otherProps}
        >
        <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
        </svg>
    );
};


/* -------------------------------------------------------------------------- */
/*                                CAMERA ICON                                 */
/* -------------------------------------------------------------------------- */
export const CameraIcon = ({
    color = "currentColor",
    size = 24,
    className,
    ...otherProps
}) => {
    const resolvedColor = getResolvedColor(color);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={resolvedColor}
            className={className}
            {...otherProps}
        >
            <path d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z" />
        </svg>
    );
};

/* -------------------------------------------------------------------------- */
/*                                IMAGE ICON                                  */
/* -------------------------------------------------------------------------- */
export const ImageIcon = ({
    color = "currentColor",
    size = 24,
    className,
    ...otherProps
}) => {
    const resolvedColor = getResolvedColor(color);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={resolvedColor}
            className={className}
            {...otherProps}
        >
            <path
                fillRule="evenodd"
                d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z"
                clipRule="evenodd"
            />
            <path
                fillRule="evenodd"
                d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z"
                clipRule="evenodd"
            />
        </svg>
    );
};


/* -------------------------------------------------------------------------- */
/*                                 LOGOUT ICON                                 */
/* -------------------------------------------------------------------------- */
export const LogoutIcon = ({
    color = "currentColor",
    size = 24,
    className,
    ...otherProps
}) => {
    const resolvedColor = getResolvedColor(color);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={resolvedColor}
            className={className}
            {...otherProps}
        >
            <path d="M11 7L9.6 8.4L12.2 11H2V13H12.2L9.6 15.6L11 17L16 12L11 7M20 19H12V21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H12V5H20V19Z" />
        </svg>
    );
};


/* -------------------------------------------------------------------------- */
/*                                  LOGIN ICON                                 */
/* -------------------------------------------------------------------------- */
export const LoginIcon = ({
    color = "currentColor",
    size = 24,
    className,
    ...otherProps
}) => {
    const resolvedColor = getResolvedColor(color);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={resolvedColor}
            className={className}
            {...otherProps}
        >
            <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" />
        </svg>
    );
};