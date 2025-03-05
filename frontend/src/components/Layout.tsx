import { Outlet } from "react-router"
import { ThemeToggle } from "./theme-toggle"
import { useTheme } from "../contexts/ThemeContext"

export default function Layout() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen w-full bg-background transition-colors duration-300 ${theme}`}>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

