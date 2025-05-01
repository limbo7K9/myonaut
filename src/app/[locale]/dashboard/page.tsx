'use client';

import DashboardNavbar from '@/components/DashboardNavbar';
import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations('Dashboard');

  return (
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <DashboardNavbar />
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mt-6 shadow-lg">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="mt-2 text-lg">{t('welcome')}</p>
      </div>
    </div>
  )
}