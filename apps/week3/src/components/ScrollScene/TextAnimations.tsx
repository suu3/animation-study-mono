import { motion } from "framer-motion";

const Section = (props) => {
  const { children } = props;

  return (
    <motion.section
      style={{
        height: "100vh",
        width: "100vw",
        padding: "2rem",
        maxWidth: "1536px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

const TextAnimation = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        width: "100vw",
      }}
    >
      <Section>{/* 빈 페이지 */}</Section>
      <Section>
        <h1
          style={{
            fontSize: 70,
            fontWeight: 600,
            color: "white",
            textAlign: "center",
          }}
        >
          아무거나 텍스트
        </h1>
        <motion.p
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: "#f8f99a",
            textAlign: "center",
          }}
        >
          아무거나 텍스트 2
        </motion.p>
      </Section>
      <Section>
        <h1
          style={{
            fontSize: 70,
            fontWeight: 600,
            color: "white",
            textAlign: "center",
          }}
        >
          {" "}
          아무거나 텍스트 3
        </h1>
      </Section>
    </div>
  );
};

export default TextAnimation;
