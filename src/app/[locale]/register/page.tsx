'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const t = useTranslations();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Attraper les autofill quand la page est chargée
  useEffect(() => {
    const usernameInput = document.getElementById('username') as HTMLInputElement | null;
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;

    if (usernameInput?.value) {
      setUsername(usernameInput.value);
    }
    if (passwordInput?.value) {
      setPassword(passwordInput.value);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error(t('Please fill all fields'));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || t('An error occurred'));
      } else {
        toast.success(t('Account created successfully!'));
        router.push('/login');
      }
    } catch (err) {
      toast.error(t('Server error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-10" autoComplete="on">
      <input
        id="username"
        name="username"
        type="text"
        placeholder={t('Username')}
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 border rounded"
        autoComplete="username"
      />
      <input
        id="password"
        name="password"
        type="password"
        placeholder={t('Password')}
        defaultValue={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded"
        autoComplete="current-password"
      />
      <button
        type="submit"
        className="bg-green-600 text-white p-2 rounded disabled:opacity-50 flex items-center justify-center gap-2"
        disabled={loading}
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          t('Register')
        )}
      </button>

      <p className="text-center text-sm mt-4">
        {t('Already have an account?')} <a href="/login" className="text-blue-500 hover:underline">{t('Login')}</a>
      </p>
      
    </form>
  );
}