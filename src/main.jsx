import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import AppWrapper from "./App.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Router>
            <AppWrapper />
        </Router>
    </StrictMode>
)
