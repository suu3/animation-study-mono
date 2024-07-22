import Ball from "./components/Ball.tsx";
import FadeInText from "./components/FadeInText.tsx";
import Hamburger from "./components/Hamburger.tsx";
import Text from "./components/Text.tsx";
import "./App.css";

function App() {
  // const [show, setShow] = useState(false);

  return (
    <>
      <FadeInText />
      <Hamburger />
      <section className="wrapper">
        <Ball />
        <Text />
      </section>
    </>
  );
}

export default App;
