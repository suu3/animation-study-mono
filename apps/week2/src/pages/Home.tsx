import Layout from "../@layout/layout";
import CurtainTransition from "../@layout/CurtainTransition";

function Home() {
  return (
    <CurtainTransition>
      <Layout>curtain animation</Layout>
    </CurtainTransition>
  );
}

export default Home;
