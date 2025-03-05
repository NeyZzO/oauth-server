import {BrowserRouter as Router, Routes, Route} from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register"
// import './App.css'

function App() {
    return (
        <Router basename="/">
            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Register />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
