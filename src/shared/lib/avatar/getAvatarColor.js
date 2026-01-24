export function getAvatarColor(email) {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
        hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = Math.abs(hash) % 360;
    const saturation = 70;
    const lightness = 45;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
