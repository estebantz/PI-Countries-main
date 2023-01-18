import "./App.css";
import "./index.css";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Detail from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
      <div className="landing">
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route path="/home" component={Home} />
          <Route path="/country/:id" component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
