
import './App.css';

import{Table,container,row,col,button,buttongroup,form,navbar} from 'react-bootstrap'
import { Home } from './Home';
import { Department } from './Department.js';
import { Employee } from './Employee.js';
import { BrowserRouter,Routes, Route, Switch, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
          My React App
        </h3>
        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/department">
                Department
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/employee">
                Employee
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* <switch>
          <Route path='/home' component={Home}></Route>
          <Route path='/department' component={Department}></Route>
          <Route path='/employee' component={Employee}></Route>
        </switch> */}
      </div>

      <Routes>
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/department" element={<Department />} />
                    <Route exact path="/employee" element={<Employee />} />
                </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
