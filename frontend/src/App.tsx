import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
// import './App.css'

function App() {
    return (
        <Router basename="/">
            <Routes>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
