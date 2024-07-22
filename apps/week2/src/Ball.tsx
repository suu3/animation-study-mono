import { motion } from "framer-motion";

const Ball = () => {
  return (
    <motion.div
      className="box"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0.5, scale: 0.5 }}
      transition={{
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    />
  );
};

export default Ball;
