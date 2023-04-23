import { useEffect, useState } from "react";
import ReactGA from "react-ga";

const useGA = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // 구글 애널리틱스 운영서버만 적용
    if (process.env.REACT_APP_GA_TRACKING_ID) {
      ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, { debug: true });
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  });
};

export default useGA;
