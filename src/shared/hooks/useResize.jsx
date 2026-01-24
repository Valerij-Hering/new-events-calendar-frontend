import { useEffect, useState } from "react";

export const useResize = (mobileSize = 768, tabletSize = 1024) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth <= mobileSize);
        setIsTablet(window.innerWidth > mobileSize && window.innerWidth <= tabletSize);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, [mobileSize, tabletSize]);

    return { isMobile, isTablet };
};
