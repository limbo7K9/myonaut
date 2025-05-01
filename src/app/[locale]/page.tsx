'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Redirection vers la page de connexion...</p>
    </div>
  );
}