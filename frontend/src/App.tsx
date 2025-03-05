import { BrowserRouter as Router, Routes, Route } from "react-router"
import { ThemeProvider } from "./contexts/ThemeContext"
import Layout from "./components/Layout"
import LoginForm from "./components/LoginForm"
import SignUpForm from "./components/SignUpForm"

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LoginForm />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignUpForm />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

