'use client';

import DashboardNavbar from '@/components/DashboardNavbar';
import { useState } from 'react';
import ToolModal from '@/components/ToolModal';
import { useTranslations } from 'next-intl';
import Timer from '@/components/tools/Timer';

export default function ToolsPage() {
  const t = useTranslations('Tools');
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <DashboardNavbar />
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mt-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button onClick={() => setActiveTool('timer')} className="bg-blue-500 text-white p-4 rounded hover:scale-105">{t('timer')}</button>
          <button onClick={() => setActiveTool('prCalculator')} className="bg-green-500 text-white p-4 rounded hover:scale-105">{t('prCalculator')}</button>
          <button onClick={() => setActiveTool('barbellCalculator')} className="bg-purple-500 text-white p-4 rounded hover:scale-105">{t('barbellCalculator')}</button>
          <button onClick={() => setActiveTool('exerciseLibrary')} className="bg-yellow-500 text-white p-4 rounded hover:scale-105">{t('exerciseLibrary')}</button>
        </div>
      </div>


      {activeTool && (
        <ToolModal onClose={() => setActiveTool(null)}>
          <div className="p-4">
            {activeTool === 'timer' && <Timer />}
            {activeTool === 'prCalculator' && <p>PR Calculator coming soon...</p>}
            {activeTool === 'barbellCalculator' && <p>Barbell Calculator coming soon...</p>}
            {activeTool === 'exerciseLibrary' && <p>Exercise Library coming soon...</p>}
          </div>
        </ToolModal>
      )}
    </div>
  );
}