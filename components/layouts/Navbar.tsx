"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Menu, 
  X, 
  Search, 
  User, 
  LogOut, 
  Settings, 
  Film, 
  Tv, 
  Star, 
  List, 
  CreditCard,
  Home,
  TrendingUp,
  PlusSquare,
  ShieldCheck,
  Sun,
  Moon,
  Laptop,
  LayoutDashboard
} from 'lucide-react';
import { NavbarProps } from '@/lib/types';
import { useTheme } from "next-themes";

export default function Navbar({ user, onLogout }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const router = useRouter();
  const pathName = usePathname();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  // 2. Use the library's hook instead of local state
  const { theme, setTheme, resolvedTheme } = useTheme();

  // 3. Handle mounting once to avoid hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  
  // 4. Update your change handler to use the library's setTheme
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setIsThemeMenuOpen(false);
  };

  // 5. Update the icon logic to use 'resolvedTheme' 
  // (This ensures the icon is correct even when theme is set to 'system')
  const getThemeIcon = () => {
    if (!mounted) return <Laptop className="w-4 h-4" />;
    const current = theme === 'system' ? resolvedTheme : theme;
    return current === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />;
  };

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  // Navigation links for regular users
  const userNavLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/movies', label: 'Movies', icon: Film },
    { href: '/series', label: 'TV Series', icon: Tv },
    { href: '/top-rated', label: 'Top Rated', icon: Star },
  ];

  // Navigation links for admin users
  const adminNavLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/movies', label: 'Movies', icon: Film },
    { href: '/series', label: 'TV Series', icon: Tv },
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  // Get current navigation links based on user role
  const getNavLinks = () => {
    if (user?.role === 'ADMIN') {
      return adminNavLinks;
    }
    return userNavLinks;
  };

  const adminMenuLinks = [
    { href: '/admin/media', label: 'Manage Media', icon: PlusSquare },
    { href: '/admin/reviews', label: 'Moderate Reviews', icon: ShieldCheck },
    { href: '/admin/analytics', label: 'Analytics', icon: TrendingUp },
  ];

  // Don't render theme-dependent content until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-gradient-to-r dark:from-gray-900/95 dark:to-gray-800/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700'
            : 'bg-white dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo / Brand */}
            <Link href={user?.role === 'ADMIN' ? '/admin/dashboard' : '/'} className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-gradient-to-r from-red-500 to-purple-600 rounded-lg p-1.5">
                  <Film className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                CineTube
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {getNavLinks().map((link) => {
                const Icon = link.icon;
                const isActive = pathName === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1.5 ${
                      isActive
                        ? 'bg-gradient-to-r from-red-500/20 to-purple-500/20 text-red-600 dark:text-red-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search Bar - Hide for admin users on desktop */}
              {user?.role !== 'ADMIN' && (
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies, series..."
                    className="w-64 pl-10 pr-4 py-1.5 text-sm bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </form>
              )}

              {/* Theme Toggle Button */}
              <div className="relative" ref={themeMenuRef}>
                <button
                  onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                  className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200"
                  aria-label="Toggle theme"
                >
                  {getThemeIcon()}
                </button>

                {isThemeMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fadeIn">
                    <button
                      onClick={() => handleThemeChange('light')}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition ${
                        theme === 'light'
                          ? 'bg-gradient-to-r from-red-500/10 to-purple-500/10 text-red-600 dark:text-red-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
                      }`}
                    >
                      <Sun className="w-4 h-4" />
                      <span>Light</span>
                      {theme === 'light' && (
                        <span className="ml-auto text-xs">✓</span>
                      )}
                    </button>
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition ${
                        theme === 'dark'
                          ? 'bg-gradient-to-r from-red-500/10 to-purple-500/10 text-red-600 dark:text-red-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
                      }`}
                    >
                      <Moon className="w-4 h-4" />
                      <span>Dark</span>
                      {theme === 'dark' && (
                        <span className="ml-auto text-xs">✓</span>
                      )}
                    </button>
                    <button
                      onClick={() => handleThemeChange('system')}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition ${
                        theme === 'system'
                          ? 'bg-gradient-to-r from-red-500/10 to-purple-500/10 text-red-600 dark:text-red-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
                      }`}
                    >
                      <Laptop className="w-4 h-4" />
                      <span>System</span>
                      {theme === 'system' && (
                        <span className="ml-auto text-xs">✓</span>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* User Section */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 focus:outline-none group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                      {user.image ? (
                        <img src={user.image} alt={user.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition">
                      {user.name.split(' ')[0]}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fadeIn">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                        {user.role === 'ADMIN' && (
                          <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-gradient-to-r from-red-500/20 to-purple-500/20 text-red-600 dark:text-red-400 rounded-full">
                            Admin
                          </span>
                        )}
                      </div>
                      <div className="py-2">
                        {user.role === 'ADMIN' ? (
                          // Admin dropdown menu
                          <>
                            <Link
                              href="/admin/dashboard"
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <LayoutDashboard className="w-4 h-4" />
                              <span>Dashboard</span>
                            </Link>
                            {adminMenuLinks.map((link) => {
                              const Icon = link.icon;
                              return (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition"
                                  onClick={() => setIsUserMenuOpen(false)}
                                >
                                  <Icon className="w-4 h-4" />
                                  <span>{link.label}</span>
                                </Link>
                              );
                            })}
                          </>
                        ) : (
                          // Regular user dropdown menu
                          <>
                            <Link
                              href="/profile"
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <User className="w-4 h-4" />
                              <span>Profile</span>
                            </Link>
                            <Link
                              href="/watchlist"
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <List className="w-4 h-4" />
                              <span>Watchlist</span>
                            </Link>
                            <Link
                              href="/subscription"
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <CreditCard className="w-4 h-4" />
                              <span>Subscription</span>
                            </Link>
                          </>
                        )}
                        
                        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            onLogout?.();
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-40 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ top: '64px' }}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Mobile Search - Only for regular users */}
          {user?.role !== 'ADMIN' && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies, series..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </form>
            </div>
          )}

          {/* Mobile Theme Toggle */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`p-2 rounded-lg transition ${
                    theme === 'light'
                      ? 'bg-gradient-to-r from-red-500/20 to-purple-500/20 text-red-600 dark:text-red-400'
                      : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`p-2 rounded-lg transition ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-red-500/20 to-purple-500/20 text-red-600 dark:text-red-400'
                      : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleThemeChange('system')}
                  className={`p-2 rounded-lg transition ${
                    theme === 'system'
                      ? 'bg-gradient-to-r from-red-500/20 to-purple-500/20 text-red-600 dark:text-red-400'
                      : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                >
                  <Laptop className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex-1 py-4">
            {getNavLinks().map((link) => {
              const Icon = link.icon;
              const isActive = pathName === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 text-base font-medium transition ${
                    isActive
                      ? 'bg-gradient-to-r from-red-500/20 to-purple-500/20 text-red-600 dark:text-red-400 border-l-4 border-red-500'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile User Section */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-4">
            {user ? (
              <>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {user.role === 'ADMIN' ? (
                    // Admin mobile menu
                    <>
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      {adminMenuLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition"
                          >
                            <Icon className="w-4 h-4" />
                            <span>{link.label}</span>
                          </Link>
                        );
                      })}
                    </>
                  ) : (
                    // Regular user mobile menu
                    <>
                      <Link
                        href="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        href="/watchlist"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition"
                      >
                        <List className="w-4 h-4" />
                        <span>Watchlist</span>
                      </Link>
                      <Link
                        href="/subscription"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Subscription</span>
                      </Link>
                    </>
                  )}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLogout?.();
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition mt-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2 text-sm font-medium bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-full"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}