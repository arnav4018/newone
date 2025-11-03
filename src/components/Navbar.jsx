import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar({ provider, isDefaultKey }) {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'text-emerald-400 bg-emerald-500/10'
        : 'text-gray-300 hover:text-white hover:bg-white/5'
    }`;

  return (
    <nav className="fixed top-0 inset-x-0 bg-gray-800/95 backdrop-blur border-b border-gray-700 z-50 shadow">
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="font-semibold text-white flex items-center">
            <span className="mr-2">♻️</span>
            <span>GreenCode Advisor</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-2">
            {provider === 'Gemini' && isDefaultKey && (
              <span className="mr-2 px-2 py-1 rounded-md text-emerald-400 bg-emerald-500/10 text-xs">Gemini default</span>
            )}
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <NavLink to="/api" className={linkClass}>
              API Config
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {open ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-3">
            <div className="flex flex-col space-y-1 pt-2">
              <NavLink to="/" className={linkClass} end onClick={() => setOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/api" className={linkClass} onClick={() => setOpen(false)}>
                API Config
              </NavLink>
              <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>
                About
              </NavLink>
              <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>
                Contact
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
