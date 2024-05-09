import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page on route change
  }, [pathname]); // Trigger the effect when the pathname changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;
