import CurtainTransition from "../@layout/CurtainTransition";
import Layout from "../@layout/layout";
import OpacityTransition from "../@layout/OpacityTransition";

function Opacity() {
  return (
    <CurtainTransition>
      <Layout>opacity animation</Layout>
    </CurtainTransition>
  );
}

export default Opacity;
