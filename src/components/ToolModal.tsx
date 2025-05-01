'use client';

import { ReactNode } from 'react';

export default function ToolModal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-300 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}