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
import BookingConfirm from "./components/BookingConfirm";
import Contact from "./components/Contact";

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
        {path: "/getInTouch", element: <Contact />},
        { path: "/home/place/:id", element: <SinglePlacePage />},
        { path: "/home/place/booking/:id", element: <BookingConfirm />},
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
