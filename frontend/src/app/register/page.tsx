'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Leaf, Lock, Mail, User, Eye, EyeOff, Zap, Shield, Sparkles, TrendingUp } from 'lucide-react';

interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuth();

    const [formData, setFormData] = useState<RegisterData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Semua kolom harus diisi');
            setIsLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Password tidak cocok');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password minimal 6 karakter');
            setIsLoading(false);
            return;
        }

        try {
            console.log('📝 Attempting registration...', { email: formData.email });

            const result = await register(formData.name, formData.email, formData.password);

            if (result.success) {
                console.log('✅ Registration successful! Redirecting...');
                // Default redirect to home/dashboard for new users (usually contributor role by default)
                router.push('/contributor');
            } else {
                console.error('❌ Registration failed:', result.error);
                setError(result.error || 'Registrasi gagal. Silakan coba lagi.');
                setIsLoading(false);
            }

        } catch (error: any) {
            console.error('❌ Registration error:', error);
            setError(error.message || 'Terjadi kesalahan saat registrasi');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">

            {/* Background Ornaments */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.08),transparent_60%)]"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"></div>

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">

                {/* Left Side - Marketing Content (Hidden on Mobile) */}
                <div className="hidden lg:block space-y-8 p-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-4 rounded-2xl shadow-2xl shadow-emerald-600/40">
                            <Leaf className="w-12 h-12 text-white" />
                        </div>
                        <div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                                EnerNova
                            </h1>
                            <p className="text-slate-600 text-lg font-medium mt-1">Bergabunglah dalam Revolusi Energi Hijau</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all">
                            <div className="bg-emerald-100 p-3 rounded-xl">
                                <User className="w-7 h-7 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 mb-2 text-lg">Join Community</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Jadilah bagian dari komunitas peneliti dan inovator energi terbarukan
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-lg border border-teal-100 hover:shadow-xl transition-all">
                            <div className="bg-teal-100 p-3 rounded-xl">
                                <Sparkles className="w-7 h-7 text-teal-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 mb-2 text-lg">Access AI Tools</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Akses penuh ke tools AI kami untuk mempercepat riset Anda
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all">
                            <div className="bg-emerald-100 p-3 rounded-xl">
                                <Shield className="w-7 h-7 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 mb-2 text-lg">Contribute Data</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Kontribusikan data riset Anda dan dapatkan pengakuan global
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Register Card */}
                <Card className="shadow-2xl border-2 border-emerald-100 overflow-hidden bg-white">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600"></div>

                    <CardHeader className="space-y-3 pt-8 pb-6">
                        <div className="flex justify-center lg:hidden mb-4">
                            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-3 rounded-2xl shadow-lg shadow-emerald-600/40">
                                <Leaf className="w-10 h-10 text-white" />
                            </div>
                        </div>
                        <CardTitle className="text-3xl font-bold text-center text-slate-900">
                            Buat Akun Baru
                        </CardTitle>
                        <CardDescription className="text-center text-slate-600 text-base">
                            Mulai perjalanan riset Anda bersama EnerNova
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">

                            {/* Name Input */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <User className="w-4 h-4 text-emerald-600" />
                                    Nama Lengkap
                                </label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Nama Lengkap Anda"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 text-slate-900 placeholder:text-slate-400"
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-emerald-600" />
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 text-slate-900 placeholder:text-slate-400"
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-emerald-600" />
                                    Password
                                </label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 text-slate-900 placeholder:text-slate-400 pr-10"
                                        disabled={isLoading}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Input */}
                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-emerald-600" />
                                    Konfirmasi Password
                                </label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 text-slate-900 placeholder:text-slate-400 pr-10"
                                        disabled={isLoading}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2 animate-pulse">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-lg shadow-emerald-600/40 hover:shadow-xl transition-all duration-300 py-6 mt-4"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Mendaftarkan...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-4 h-4" />
                                        <span>Daftar Sekarang</span>
                                    </div>
                                )}
                            </Button>

                            {/* Login Link */}
                            <div className="pt-2 text-center border-t border-slate-200 mt-4">
                                <p className="text-sm text-slate-600">
                                    Sudah punya akun?{' '}
                                    <Link
                                        href="/login"
                                        className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
                                    >
                                        Masuk di sini
                                    </Link>
                                </p>
                            </div>

                        </CardContent>
                    </form>

                    <CardFooter className="flex-col space-y-3 border-t bg-slate-50 py-4">
                        <div className="text-xs text-slate-500 text-center pt-2">
                            <p className="flex items-center justify-center gap-1">
                                <Shield className="w-3 h-3 text-emerald-600" />
                                Data Anda aman dan terenkripsi
                            </p>
                        </div>
                    </CardFooter>
                </Card>

            </div>
        </div>
    );
}
