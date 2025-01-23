import React, { useState } from 'react';
import MobileMenu from './MobileMenu';
import DesktopNavigation from './DesktopNavigation';
import CurrencySelector from './CurrencySelector';
import CartIcon from './CartIcon';
import HelpIcon from './HelpIcon';
import {
    Bars3Icon,
  } from '@heroicons/react/24/outline'
export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative">
      <nav aria-label="Top">
        {/* Top Bar */}
        <div className="bg-gray-900">
          <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <CurrencySelector />
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm font-medium text-white hover:text-gray-100">
                Sign in
              </a>
              <a href="#" className="text-sm font-medium text-white hover:text-gray-100">
                Create an account
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center justify-between">
                {/* Logo */}
                <div className="hidden lg:flex lg:flex-1 lg:items-center">
                  <a href="#">
                    <span className="sr-only">Your Company</span>
                    <img
                      alt="Your Company"
                      src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                      className="h-8 w-auto"
                    />
                  </a>
                </div>

                {/* Desktop Navigation */}
                <DesktopNavigation />

                {/* Mobile Menu and Search */}
                <div className="flex flex-1 items-center lg:hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon aria-hidden="true" className="size-6" />
                  </button>
                </div>

                <div className="flex items-center justify-end space-x-6">
                  <HelpIcon />
                  <CartIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && <MobileMenu open={open} setOpen={setOpen} />}
    </header>
  );
}
