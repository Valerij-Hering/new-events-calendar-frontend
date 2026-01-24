import { useEffect, useState } from "react";

export const useImagePreload = (src) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!src) return;

        const img = new Image();
        img.src = src;
        img.onload = () => setLoaded(true);

    }, [src]);

    return loaded;
};