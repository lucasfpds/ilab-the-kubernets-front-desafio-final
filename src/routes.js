/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import useGlobal from "./hooks/useGlobal";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Options from "./pages/Options";
import Users from "./pages/Users";
import Orders from "./pages/Orders";

export default function Routes(params) {
  return (
    <Router>
      <Switch>
        <GlobalProvider>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={SignIn} />
          <Route path="/cadastrar" component={SignUp} />
          <ProtectedRoute>
            <Route path="/options" exact component={Options} />
            <Route path="/usuarios" exact component={Users} />
            <Route path="/pedidos" exact component={Orders} />
            <Header />
          </ProtectedRoute>
          {/* <Modal /> */}
        </GlobalProvider>
      </Switch>
    </Router>
  );
}

function ProtectedRoute(props) {
  const { token } = useGlobal();

  return (
    <Route render={() => (token ? props.children : <Redirect to="/" />)} />
  );
}
