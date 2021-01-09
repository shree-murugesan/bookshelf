import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/home.component';
import Navbar from './components/Navbar.component';
import AddBook from './components/add-book.component';
import ViewBooks from './components/view-books.component';
import PickNextBook from './components/pick-next-book.component';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={Home} />
        <Route path="/add" exact component={AddBook} />
        <Route path="/view" exact component={ViewBooks} />
        <Route path="/next" exact component={PickNextBook} />
      </div>
    </Router>
  );
}

export default App;
