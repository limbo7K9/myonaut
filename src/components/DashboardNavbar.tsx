'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';

export default function DashboardNavbar() {
  const t = useTranslations('Navbar');
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg text-white">
      {/* Desktop navbar */}
      <div className="hidden sm:flex flex-wrap justify-between items-center gap-4 text-sm sm:text-base">
        <div className="flex gap-4">
          <Link href="/dashboard" className="transition hover:text-blue-400">{t('dashboard')}</Link>
          <Link href="/nutrition" className="transition hover:text-blue-400">{t('nutrition')}</Link>
          <Link href="/workout" className="transition hover:text-blue-400">{t('workout')}</Link>
          <Link href="/log" className="transition hover:text-blue-400">{t('log')}</Link>
          <Link href="/tools" className="transition hover:text-blue-400">{t('tools')}</Link>
        </div>
        <Link href="/profile" className="font-semibold transition hover:text-green-400">
          {t('profile')}
        </Link>
      </div>

      {/* Mobile toggle button */}
      <div className="flex sm:hidden justify-between items-center">
        <button onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="flex flex-col sm:hidden mt-4 gap-3 text-sm">
          <Link href="/profile" className="font-semibold transition hover:text-green-400" onClick={toggleMenu}>{t('profile')}</Link>
          <Link href="/dashboard" className="transition hover:text-blue-400" onClick={toggleMenu}>{t('dashboard')}</Link>
          <Link href="/nutrition" className="transition hover:text-blue-400" onClick={toggleMenu}>{t('nutrition')}</Link>
          <Link href="/workout" className="transition hover:text-blue-400" onClick={toggleMenu}>{t('workout')}</Link>
          <Link href="/log" className="transition hover:text-blue-400" onClick={toggleMenu}>{t('log')}</Link>
          <Link href="/tools" className="transition hover:text-blue-400" onClick={toggleMenu}>{t('tools')}</Link>
        </div>
      )}
    </nav>
  );
}



