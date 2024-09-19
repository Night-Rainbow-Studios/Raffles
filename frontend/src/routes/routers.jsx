import {
    createBrowserRouter, Link
} from "react-router-dom";
import Landing from "../pages/landing";
import RaffleClosed from "../pages/raffleClosed";
import BuyTickets from "../pages/buyTickets";
import AdminDashboard from "../pages/adminDashboard";

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
    },
    {
        path: "/adminDashboard",
        element: <AdminDashboard />
    }
])

export default routes