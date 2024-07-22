import App from "./App";
import Background from "./pages/Background";
import ClipPath from "./pages/ClipPath";
import Home from "./pages/Home";
import Opacity from "./pages/Opacity";

export const routerInfo = [
  {
    path: "/",
    element: <App />,
    // errorElement: <NotFound />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "opacity",
        element: <Opacity />,
      },
      {
        path: "background",
        element: <Background />,
      },
      {
        path: "clip-path",
        element: <ClipPath />,
      },
    ],
  },
];
