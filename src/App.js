import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Calculation from "./pages/calculation";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Calculation />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
