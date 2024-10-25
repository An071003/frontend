import './App.css';
import Router from './route/routes';
import Header from './componets/Header/Header';
import Footer from './componets/Footer/Footer';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div style={{paddingLeft: "100px", paddingRight: "100px"}}>
      <BrowserRouter>
        <Header />
        <Router />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
