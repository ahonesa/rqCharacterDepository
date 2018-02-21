import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from './Header'

const Dashboard = () => <h2>Dashboard</h2>;
const CharacterNew = () => <h2>CharacterNew</h2>;
const Landing = () => <h2>Landing</h2>;

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/chars" component={Dashboard} />
          <Route exact path="/chars/new" component={CharacterNew} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
