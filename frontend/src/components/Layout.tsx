// Layout component - Provides consistent navbar and page structure
import type { ReactNode } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { isDark, toggle } = useDarkMode();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] dark:bg-neutral-900 transition-colors duration-300">
          {/* Fixed Top Navbar with gradient background and drop shadow */}
          <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800 shadow-xl z-50 border-b border-transparent dark:border-neutral-700">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white tracking-tight truncate">
                Handshake
              </h1>
              <p className="text-xs sm:text-sm text-primary-100 dark:text-neutral-300 mt-0.5 sm:mt-1 font-medium hidden sm:block">
                Connect founders with developers
              </p>
            </div>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggle}
              className="flex-shrink-0 p-2 sm:p-2.5 rounded-lg bg-white/10 hover:bg-white/20 dark:bg-neutral-700 dark:hover:bg-neutral-600 backdrop-blur-sm transition-all duration-200 group"
              aria-label="Toggle dark mode"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                // Sun icon for light mode
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 group-hover:text-yellow-200 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                // Moon icon for dark mode
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-200 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content - True full-screen layout, flex-1 makes it fill available space */}
      <main className="flex-1 w-full py-6 sm:py-8 lg:py-10 mt-[88px] sm:mt-24 lg:mt-28">
        {/* Container with max-width for desktop, full-width on mobile */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;

