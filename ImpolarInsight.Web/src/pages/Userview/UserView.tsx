import { ReactNode } from "react"
import { NavLink, Link } from "react-router-dom"
import { FaCommentDots, FaRoad } from "react-icons/fa"
import { RoutesAndUrls } from "../../RoutesAndUrls"

interface UserViewProps {
  children: ReactNode
}

export const UserView = ({ children }: UserViewProps) => {
  // Get theme colors from ThemeContext
  
  // Grab your two public routes directly
  const fb = RoutesAndUrls.PUBLIC_FEEDBACK
  const rm = RoutesAndUrls.PUBLIC_ROADMAP

  return (
    <div className="min-h-screen w-screen bg-main">
      {/* HEADER */}
      <header className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo / Site Name */}
            <Link to="/" className="flex items-center">
              <span className="ml-2 text-xl font-bold">
                Impo
              </span>
            </Link>

            {/* RIGHT‑SIDE CONTROLS */}
            <div className="flex items-center space-x-4">
              {/* notifications */}
              <button
                type="button"
                className="rounded-full p-1 focus:outline-none"
              >
                🔔
              </button>
              {/* dashboard link */}
              <Link
                to={RoutesAndUrls.HOME.urlPath}
                className="inline-flex items-center rounded-md border border-secondary bg-surface px-3 py-1.5 text-sm font-medium hover:bg-highlight"
              >
                {RoutesAndUrls.HOME.pageName}
              </Link>
              {/* user avatar */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* NAVIGATION UNDER HEADER */}
      <div className="bg-surface shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-start">
            {/* Feedback */}
            <NavLink
              to={fb.urlPath}
              end
              className={({ isActive }) =>
                [
                  isActive
                    ? "bg-main rounded-t-xl pt-3 px-4 pb-2"
                    : "hover:bg-highlight px-3 py-2",
                  "inline-flex items-center text-sm font-medium mr-6",
                ].join(" ")
              }
            >
              <FaCommentDots className="mr-1 h-5 w-5" />
              {fb.pageName}
            </NavLink>

            {/* Roadmap */}
            <NavLink
              to={rm.urlPath}
              end
              className={({ isActive }) =>
                [
                  isActive
                    ? "bg-main rounded-t-xl pt-3 px-4 pb-2"
                    : "hover:bg-highlight px-3 py-2",
                  "inline-flex items-center text-sm font-medium",
                ].join(" ")
              }
            >
              <FaRoad className="mr-1 h-5 w-5" />
              {rm.pageName}
            </NavLink>
          </nav>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}