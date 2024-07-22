import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AnimatedOutlet from "./components/AnimationOutlet";

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <AnimatedOutlet key={location.pathname} />
    </AnimatePresence>
  );
};

export default App;
