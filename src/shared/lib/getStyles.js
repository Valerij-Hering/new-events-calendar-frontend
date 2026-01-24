export const getStyles = (style, mods, additional) => {

    const modeStyle = Object.entries(mods)
        .filter(([_, value]) => Boolean(value))
        .map(([key]) => key);

        return [style, ...modeStyle, ...additional].join(' ');
}