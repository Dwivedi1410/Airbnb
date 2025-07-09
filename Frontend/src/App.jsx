import { createBrowserRouter, RouterProvider } from "react-router-dom";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Body from "./components/Body";
import Login from "./components/Login";
import Home from "./components/Home";
import User from "./components/User";
import Place from "./components/Place";
import PlaceRegistration from "./components/PlaceRegistration";
import Bookings from "./components/Bookings";
import Profile from "./components/Profile";
import SinglePlacePage from "./components/SinglePlacePage";

// App.jsx
function App() {
  const AppRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        { path: "/login", element: <Login /> },
        { index: true, element: <Home /> },
        { path: "/home", element: <Home />},
        { path: "/home/place/:id", element: <SinglePlacePage />},
        {
          path: "/user",
          element: <User />,
          children: [
            { index: true, element: <Profile /> },
            { path: "bookings", element: <Bookings /> },
            {
              path: "accommodations",
              children: [
                { index: true, element: <Place /> },
                { path: "new", element: <PlaceRegistration /> },
                { path: ":id", element: <PlaceRegistration /> },
              ],
            },
          ],
        },
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
