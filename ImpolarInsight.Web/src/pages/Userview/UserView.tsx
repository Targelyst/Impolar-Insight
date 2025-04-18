import { ReactNode } from "react"
import { NavLink, Link } from "react-router-dom"
import { FaCommentDots, FaRoad } from "react-icons/fa"
import { RoutesAndUrls } from "../../RoutesAndUrls"

interface UserViewProps {
  children: ReactNode
}

export const UserView = ({ children }: UserViewProps) => {
  // Grab your two public routes directly
  const fb = RoutesAndUrls.PUBLIC_FEEDBACK
  const rm = RoutesAndUrls.PUBLIC_ROADMAP

  return (
    <div className="min-h-screen w-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo / Site Name */}
            <Link to="/" className="flex items-center">
              <span className="ml-2 text-xl font-bold text-gray-800">
                Impo
              </span>
            </Link>

            {/* RIGHT‑SIDE CONTROLS */}
            <div className="flex items-center space-x-4">
              {/* notifications */}
              <button
                type="button"
                className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                🔔
              </button>
              {/* dashboard link */}
              <Link
                to={RoutesAndUrls.HOME.urlPath}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {RoutesAndUrls.HOME.pageName}
              </Link>
              {/* user avatar */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-medium text-white">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* NAVIGATION UNDER HEADER */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex justify-center py-3">
            {/* Feedback */}
            <NavLink
              to={fb.urlPath}
              end
              className={({ isActive }) =>
                [
                  isActive
                    ? "text-gray-900 border-b-2 border-indigo-500"
                    : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300",
                  "inline-flex items-center px-3 py-2 text-sm font-medium mr-6",
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
                    ? "text-gray-900 border-b-2 border-indigo-500"
                    : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300",
                  "inline-flex items-center px-3 py-2 text-sm font-medium",
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