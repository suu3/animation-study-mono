import { useEffect, useState, useRef } from "react";
import { useScroll } from "framer-motion";

const useSection = () => {
  const [section, setSection] = useState(0);
  const { scrollYProgress } = useScroll();
  const lastSection = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // 현재 페이지 계산
      const curSection = Math.round(
        scrollYProgress.get() *
          (document.documentElement.scrollHeight / window.innerHeight - 1)
      );
      console.log(curSection);

      // 섹션 변경 호출
      if (curSection !== lastSection.current) {
        setSection(curSection);
        lastSection.current = curSection;
      }
    };

    const unsubscribe = scrollYProgress.onChange(handleScroll);

    // 클린업 함수
    return () => {
      unsubscribe();
    };
  }, [scrollYProgress]);

  return section;
};

export default useSection;
