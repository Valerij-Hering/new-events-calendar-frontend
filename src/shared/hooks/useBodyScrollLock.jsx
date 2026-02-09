export const useBodyScrollLock = () => {
    const lockScroll = () => {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden"; // <html>
    };

    const unlockScroll = () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
    };

    return { lockScroll, unlockScroll };
};