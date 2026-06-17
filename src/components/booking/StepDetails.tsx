import { motion } from 'framer-motion';
import { ArrowLeft, UserCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBookingStore } from '@/lib/stores/bookingStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { clientDetailsSchema, ClientDetailsFormData } from '@/lib/validations/booking';

export function StepDetails() {
  const { setClientDetails, prevStep } = useBookingStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientDetailsFormData>({
    resolver: zodResolver(clientDetailsSchema),
    defaultValues: { firstName: '', lastName: '', email: '', phone: '', notes: '' },
  });

  const onSubmit = (data: ClientDetailsFormData) => {
    setClientDetails(data);
  };

  const fields = [
    { name: 'firstName' as const, label: 'First Name', placeholder: 'Victoria', half: true, delay: 0.15 },
    { name: 'lastName' as const, label: 'Last Name', placeholder: 'Sterling', half: true, delay: 0.2 },
    { name: 'email' as const, label: 'Email', placeholder: 'you@example.com', type: 'email', delay: 0.25 },
    { name: 'phone' as const, label: 'Phone', placeholder: '(555) 555-5555', delay: 0.3 },
  ];

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" size="sm" onClick={prevStep} className="mb-4 -ml-2 rounded-lg">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Details
          </h2>
          <p className="mt-2 text-[hsl(var(--muted-foreground))]">
            Tell us about yourself so we can confirm your appointment.
          </p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-[hsl(var(--primary))]/5 to-purple-500/5 px-6 py-4 flex items-center gap-3 border-b border-[hsl(var(--border))]">
            <div className="p-2 rounded-lg bg-[hsl(var(--primary))]/10">
              <UserCircle className="h-5 w-5 text-[hsl(var(--primary))]" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Contact Information</h3>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">All fields are required unless noted</p>
            </div>
          </div>
          <CardContent className="p-6 pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {fields.filter((f) => f.half).map((field) => (
                  <motion.div key={field.name} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: field.delay }}>
                    <label className="block text-sm font-medium mb-1.5">{field.label}</label>
                    <Input placeholder={field.placeholder} error={errors[field.name]?.message} {...register(field.name)} />
                  </motion.div>
                ))}
              </div>

              {fields.filter((f) => !f.half).map((field) => (
                <motion.div key={field.name} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: field.delay }}>
                  <label className="block text-sm font-medium mb-1.5">{field.label}</label>
                  <Input type={field.type} placeholder={field.placeholder} error={errors[field.name]?.message} {...register(field.name)} />
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                <label className="block text-sm font-medium mb-1.5">
                  Notes <span className="text-[hsl(var(--muted-foreground))] font-normal">(optional)</span>
                </label>
                <Textarea placeholder="Any allergies, preferences, or things we should know?" error={errors.notes?.message} {...register('notes')} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Button type="submit" className="w-full rounded-xl h-12 text-base shadow-lg shadow-[hsl(var(--primary))]/20" size="lg">
                  Continue to Payment
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
