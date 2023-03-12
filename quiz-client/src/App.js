import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/' element={<Layout />}>
          <Route path='/quiz' element={<Quiz />}></Route>
          <Route path='/result' element={<Result />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
