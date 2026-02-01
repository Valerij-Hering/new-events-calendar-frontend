export function getAvatarColor(email, theme = "light") {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;

  const saturation = 80;
  const lightness = theme === "dark" ? 40 : 55;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}