import { createBrowserRouter, RouterProvider } from "react-router-dom";
import appStore from "./utils/appStore";
import { Provider} from "react-redux";
import Body from "./components/Body";
import Login from "./components/Login";
import Home from "./components/Home";
import User from "./components/User";
import Place from "./components/Place";


function App() {
  const AppRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/user",
          element: <User />
        },
        {
          path: "/user/:subpage?",
          element: <User />,
        },
        {
          path: "/user/:subpage?/:action?",
          element: <User />
        }
        
      ],
    },
  ]);

  return (
    <Provider store={appStore}>
      <RouterProvider router={AppRouter} />
    </Provider>
  );
}

export default App;
