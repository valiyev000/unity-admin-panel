import { useContext } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import contextApi from "../StateManager";
import { AnimatePresence } from "framer-motion";
import Home from "../Pages/Home";
import Campaigns from "../Pages/Campaigns";
import Inbox from "../Pages/Inbox";
import Notifications from "../Pages/Notifications";
import Payouts from "../Pages/Payouts";
import Products from "../Pages/Products";
import Statements from "../Pages/Statements";
import Login from "../Pages/Login";
import Setting from "../components/Setting";
// import Comment from './Pages/Comment';


export default function Routes({user, isSettingOpen, auth}) {

    const {translation} = useContext(contextApi)

  return (
    <Router>
    {translation &&
      user !== null && user !== "pending" ?
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/campaigns">
          <Campaigns />
        </Route>
        {/* <Route exact path="/comment">
          <Comment />
        </Route> */}
        <Route exact path="/inbox">
          <Inbox />
        </Route>
        <Route exact path="/inbox/:key">
          <Inbox />
        </Route>
        <Route exact path="/notifications">
          <Notifications />
        </Route>
        <Route exact path="/payouts">
          <Payouts />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/statements">
          <Statements />
        </Route>
      </Switch>
      : translation && user === null ?
        <Switch>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
        : ""
    }
    <AnimatePresence>
      {isSettingOpen && auth.currentUser && <Setting />}
    </AnimatePresence>
  </Router>
  )
}
