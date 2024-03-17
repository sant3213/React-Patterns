import { useEffect, useRef, useState } from "react";

export const useHover = () => {

    const [isHovered, setIsHovered] = useState(false);

    const hoverRef = useRef(null);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    useEffect(() => {
        const node  = hoverRef.current;
        if (node) {
            node.addEventListener('mouseenter', handleMouseEnter);
            node.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                node.removeEventListener('mouseenter', handleMouseEnter);
                node.removeEventListener('mouseleave', handleMouseLeave);
            }
        }

    }, []);

    return [isHovered, hoverRef];
};

export default useHover;