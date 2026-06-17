import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Gem, Eye, EyeOff } from 'lucide-react';
import { useToastStore } from '@/lib/stores/toastStore';
import { signupSchema, SignupFormData } from '@/lib/validations/booking';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = (_data: SignupFormData) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast('success', 'Account created!', 'Please use demo credentials to log in for this prototype.');
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] px-4 py-12 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-80 h-80 bg-[hsl(var(--primary))]/8 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-violet-500/6 rounded-full blur-3xl animate-float" />

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
          <Link to="/" className="inline-flex items-center gap-2.5">
            <Gem className="h-9 w-9 text-[hsl(var(--primary))]" />
            <span className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Solvé
            </span>
          </Link>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Admin Portal</p>
        </div>

        <Card className="shadow-2xl border-[hsl(var(--border))]/50">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>Create Account</CardTitle>
            <CardDescription>Get started with your admin account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {[
                { label: 'Full Name', type: 'text', placeholder: 'Jane Doe', name: 'name' as const, delay: 0.15 },
                { label: 'Email', type: 'email', placeholder: 'you@example.com', name: 'email' as const, delay: 0.2 },
              ].map((field) => (
                <motion.div key={field.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: field.delay }}>
                  <label className="block text-sm font-medium mb-1.5">{field.label}</label>
                  <Input type={field.type} placeholder={field.placeholder} error={errors[field.name]?.message} {...register(field.name)} />
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                <label className="block text-sm font-medium mb-1.5">Password</label>
                <div className="relative">
                  <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" error={errors.password?.message} className="pr-10" {...register('password')} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <label className="block text-sm font-medium mb-1.5">Confirm Password</label>
                <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <Button type="submit" className="w-full rounded-xl h-11 shadow-lg shadow-[hsl(var(--primary))]/20" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating account...
                    </span>
                  ) : 'Create Account'}
                </Button>
              </motion.div>
            </form>

            <p className="mt-6 text-center text-sm text-[hsl(var(--muted-foreground))]">
              Already have an account?{' '}
              <Link to="/login" className="text-[hsl(var(--primary))] hover:underline font-medium">Sign in</Link>
            </p>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-[hsl(var(--muted-foreground))]">
          <Link to="/" className="hover:text-[hsl(var(--primary))] transition-colors">← Back to website</Link>
        </p>
      </motion.div>
    </div>
  );
}
