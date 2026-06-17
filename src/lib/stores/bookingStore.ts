import { create } from 'zustand';
import { BookingFlowState, BookingStep, ClientDetails } from '@/lib/types';

/**
 * Defines the linear order of the booking flow steps.
 * Used to navigate forward/backward through the wizard.
 */
const STEP_ORDER: BookingStep[] = [
  'client-type',
  'location',
  'category',
  'service',
  'provider',
  'datetime',
  'details',
  'payment',
  'confirmation',
];

interface BookingStoreState extends BookingFlowState {
  setClientType: (isNew: boolean) => void;
  selectLocation: (id: string) => void;
  selectCategory: (id: string) => void;
  selectService: (id: string) => void;
  selectProvider: (id: string) => void;
  selectDateTime: (date: string, time: string) => void;
  setClientDetails: (details: ClientDetails) => void;
  completePayment: () => void;
  goToStep: (step: BookingStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  getCurrentStepIndex: () => number;
  getCompletionPercentage: () => number;
}

const initialState: BookingFlowState = {
  currentStep: 'client-type',
  isNewClient: null,
  selectedLocationId: null,
  selectedCategoryId: null,
  selectedServiceId: null,
  selectedProviderId: null,
  selectedDate: null,
  selectedTime: null,
  clientDetails: null,
  paymentCompleted: false,
};

export const useBookingStore = create<BookingStoreState>((set, get) => ({
  ...initialState,

  setClientType: (isNew) => set({ isNewClient: isNew, currentStep: 'location' }),

  selectLocation: (id) =>
    set({
      selectedLocationId: id,
      // Reset downstream selections when location changes
      selectedCategoryId: null,
      selectedServiceId: null,
      selectedProviderId: null,
      selectedDate: null,
      selectedTime: null,
      currentStep: 'category',
    }),

  selectCategory: (id) =>
    set({
      selectedCategoryId: id,
      selectedServiceId: null,
      selectedProviderId: null,
      currentStep: 'service',
    }),

  selectService: (id) =>
    set({
      selectedServiceId: id,
      selectedProviderId: null,
      currentStep: 'provider',
    }),

  selectProvider: (id) =>
    set({
      selectedProviderId: id,
      currentStep: 'datetime',
    }),

  selectDateTime: (date, time) =>
    set({
      selectedDate: date,
      selectedTime: time,
      currentStep: 'details',
    }),

  setClientDetails: (details) =>
    set({
      clientDetails: details,
      currentStep: 'payment',
    }),

  completePayment: () =>
    set({
      paymentCompleted: true,
      currentStep: 'confirmation',
    }),

  goToStep: (step) => set({ currentStep: step }),

  nextStep: () => {
    const currentIndex = STEP_ORDER.indexOf(get().currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      set({ currentStep: STEP_ORDER[currentIndex + 1] });
    }
  },

  prevStep: () => {
    const currentIndex = STEP_ORDER.indexOf(get().currentStep);
    if (currentIndex > 0) {
      set({ currentStep: STEP_ORDER[currentIndex - 1] });
    }
  },

  reset: () => set(initialState),

  getCurrentStepIndex: () => STEP_ORDER.indexOf(get().currentStep),

  getCompletionPercentage: () => {
    const currentIndex = STEP_ORDER.indexOf(get().currentStep);
    return Math.round((currentIndex / (STEP_ORDER.length - 1)) * 100);
  },
}));
