import {
    createBrowserRouter, Link
} from "react-router-dom";
import Landing from "../pages/landing";
import RaffleClosed from "../pages/raffleClosed";
import BuyTickets from "../pages/buyTickets";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
    },
    {
        path: "/raffleClosed",
        element: <RaffleClosed />
    },
    {
        path: "/buyTickets",
        element: <BuyTickets />
    }
])

export default routes