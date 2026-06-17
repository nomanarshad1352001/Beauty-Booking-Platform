import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Gem, Eye, EyeOff, Zap } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/authStore';
import { useToastStore } from '@/lib/stores/toastStore';
import { loginSchema, LoginFormData } from '@/lib/validations/booking';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { addToast } = useToastStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginFormData) => {
    setLoading(true);
    setTimeout(() => {
      const result = login(data.email, data.password);
      setLoading(false);
      if (result.success) {
        addToast('success', 'Welcome back!', 'You have successfully logged in.');
        navigate('/admin');
      } else {
        addToast('error', 'Login failed', result.error);
      }
    }, 800);
  };

  const fillDemoCredentials = (role: 'admin' | 'manager') => {
    setValue('email', role === 'admin' ? 'admin@demo.com' : 'user@demo.com');
    setValue('password', 'demo1234');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] px-4 py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-[hsl(var(--primary))]/8 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-500/6 rounded-full blur-3xl animate-float" />

      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <motion.div whileHover={{ rotate: 15, scale: 1.1 }} transition={{ type: 'spring', stiffness: 400 }}>
              <Gem className="h-9 w-9 text-[hsl(var(--primary))]" />
            </motion.div>
            <span className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Solvé
            </span>
          </Link>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Admin Portal</p>
        </div>

        <Card className="shadow-2xl border-[hsl(var(--border))]/50 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>Welcome Back</CardTitle>
            <CardDescription>Sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  error={errors.email?.message}
                  {...register('email')}
                />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <label className="block text-sm font-medium mb-1.5">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    error={errors.password?.message}
                    className="pr-10"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Button
                  type="submit"
                  className="w-full rounded-xl h-11 shadow-lg shadow-[hsl(var(--primary))]/20"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Signing in...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[hsl(var(--border))]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[hsl(var(--card))] px-3 text-[hsl(var(--muted-foreground))] flex items-center gap-1.5">
                    <Zap className="h-3 w-3" />
                    Quick Demo Access
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fillDemoCredentials('admin')}
                    className="w-full rounded-lg"
                  >
                    👑 Admin Login
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fillDemoCredentials('manager')}
                    className="w-full rounded-lg"
                  >
                    👤 Manager Login
                  </Button>
                </motion.div>
              </div>

              <p className="mt-3 text-center text-xs text-[hsl(var(--muted-foreground))]">
                Password: <code className="bg-[hsl(var(--muted))] px-1.5 py-0.5 rounded-md font-mono">demo1234</code>
              </p>
            </motion.div>

            <p className="mt-6 text-center text-sm text-[hsl(var(--muted-foreground))]">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-[hsl(var(--primary))] hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-[hsl(var(--muted-foreground))]">
          <Link to="/" className="hover:text-[hsl(var(--primary))] transition-colors">
            ← Back to website
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
