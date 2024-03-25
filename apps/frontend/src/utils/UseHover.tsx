import { useEffect, useRef, useState } from "react";

// Specifying the return type of the hook: a tuple containing a boolean and a ref object
export const useHover = <T extends HTMLElement>(): [boolean, React.RefObject<T>] => {

    const [isHovered, setIsHovered] = useState(false);
    const hoverRef = useRef<T>(null);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    const node = hoverRef.current;
    if (node) {
      node.addEventListener('mouseenter', handleMouseEnter);
      node.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup function to remove event listeners
      return () => {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return [isHovered, hoverRef];
};

export default useHover;
