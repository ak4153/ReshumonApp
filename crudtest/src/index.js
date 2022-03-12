import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import styledComponents from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
// import Entries from './pages/entries';
import Entries from './pages/entries';
import Dashboard from './pages/dashboard';
const Container = styledComponents.div`
height:100%;
position:relative;
`;
document.title = 'Reshumon';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="add" element={<App />}></Route>
            <Route path="entries" element={<Entries />}></Route>
            <Route
              index
              element={
                <main style={{ padding: '1rem' }}>
                  <h1>Welcome to Reshumon</h1>
                  <p>Please explore the app</p>
                </main>
              }
            />
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route
              path="*"
              element={
                <main style={{ padding: '1rem' }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
