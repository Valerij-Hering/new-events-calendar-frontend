import styles from "./Loader.module.scss";

const colorMap = {
  text_inverse: "var(--color-text-inverse)",
  text_primary: "var(--color-text-primary)",
  text_accent_primary: "var(--color-accent-primary)",
  text_accent_secondary: "var(--color-accent-secondary)",
  text_strong: "var(--color-text-strong)",
  text_secondary: "var(--palette-grey-500)",
  text_error: "var(--color-text-error)",
  text_success: "var(--color-text-success)",
};

const getResolvedColor = (color) => colorMap[color] || color;

export const Loader = ({
  size = 25,
  color = "text_accent_primary",
  strokeWidth = 8,
  className = "",
}) => {
  const resolvedColor = getResolvedColor(color);

  return (
    <svg
      viewBox="25 25 50 50"
      className={`${styles.container} ${className}`}
      style={{ width: size }}
    >
      <circle
        cx="50"
        cy="50"
        r="20"
        className={styles.loader}
        style={{
          stroke: resolvedColor,
          strokeWidth: strokeWidth,
        }}
      />
    </svg>
  );
};
