'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function RegisterPage() {
  const t = useTranslations('Register');
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthdate: '',
    gender: '',
    weight: '',
    height: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setLoading(false);

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg">
      {step === 1 && (
        <div className="flex flex-col gap-4">
          <input placeholder="First name" value={formData.firstname} onChange={e => updateField('firstname', e.target.value)} className="input" />
          <input placeholder="Last name" value={formData.lastname} onChange={e => updateField('lastname', e.target.value)} className="input" />
          <input placeholder="Username" value={formData.username} onChange={e => updateField('username', e.target.value)} className="input" />
          <input type="email" placeholder="Email" value={formData.email} onChange={e => updateField('email', e.target.value)} className="input" />
          <input type="password" placeholder="Password" value={formData.password} onChange={e => updateField('password', e.target.value)} className="input" />
          <input type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={e => updateField('confirmPassword', e.target.value)} className="input" />
          <input placeholder="Phone (optional)" value={formData.phone} onChange={e => updateField('phone', e.target.value)} className="input" />
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4">
          <input type="date" placeholder="Birthdate" value={formData.birthdate} onChange={e => updateField('birthdate', e.target.value)} className="input" />
          <select value={formData.gender} onChange={e => updateField('gender', e.target.value)} className="input">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input type="number" placeholder="Weight (kg)" value={formData.weight} onChange={e => updateField('weight', e.target.value)} className="input" />
          <input type="number" placeholder="Height (cm)" value={formData.height} onChange={e => updateField('height', e.target.value)} className="input" />
        </div>
      )}

      {/* Future: Step 3 - email/phone verification */}

      <div className="flex justify-between mt-6">
        {step > 1 && <button onClick={() => setStep(step - 1)} className="text-white hover:underline">Back</button>}
        {step < 2 && <button onClick={() => setStep(step + 1)} className="text-white hover:underline">Next</button>}
        {step === 2 && <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>}
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}