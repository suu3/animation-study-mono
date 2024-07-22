import { motion } from "framer-motion";

const blackBox = {
  initial: {
    height: "100vh",
    backgroundColor: "black",
  },
};

const InitialTransition = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div initial="initial" animate="animate" variants={blackBox} />
    </div>
  );
};

export default InitialTransition;
