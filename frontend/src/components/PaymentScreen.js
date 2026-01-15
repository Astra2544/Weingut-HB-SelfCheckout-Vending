import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7"/>
    <path d="M19 12H5"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const CreditCardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="5" rx="2"/>
    <line x1="2" x2="22" y1="10" y2="10"/>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const LoaderIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);

const Logo = () => (
  <div className="text-center">
    <h1 className="font-serif text-3xl md:text-4xl text-[#2D2A26] tracking-tight">
      Hermann Böhmer
    </h1>
    <p className="text-[0.7rem] tracking-[0.3em] uppercase text-[#969088] mt-1">
      Weingut Dürnstein
    </p>
  </div>
);

const CardForm = ({ onSubmit, onCancel, isProcessing }) => {
  const { t } = useLanguage();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : v;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ cardNumber, expiry, cvc, name });
  };

  const isValid = cardNumber.replace(/\s/g, '').length >= 15 &&
                  expiry.length === 5 &&
                  cvc.length >= 3 &&
                  name.length > 0;

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="w-full space-y-4 overflow-hidden"
    >
      <div>
        <label className="block text-xs font-medium text-[#5C5852] mb-1.5 uppercase tracking-wider">
          {t('payment.cardNumber')}
        </label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          maxLength={19}
          placeholder="1234 5678 9012 3456"
          className="w-full px-4 py-3 border border-[#D6D0C4] rounded-lg focus:border-[#8B2E2E] focus:ring-1 focus:ring-[#8B2E2E] outline-none transition-colors bg-white text-[#2D2A26]"
          disabled={isProcessing}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#5C5852] mb-1.5 uppercase tracking-wider">
          {t('payment.cardHolder')}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Max Mustermann"
          className="w-full px-4 py-3 border border-[#D6D0C4] rounded-lg focus:border-[#8B2E2E] focus:ring-1 focus:ring-[#8B2E2E] outline-none transition-colors bg-white text-[#2D2A26]"
          disabled={isProcessing}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#5C5852] mb-1.5 uppercase tracking-wider">
            {t('payment.expiry')}
          </label>
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            maxLength={5}
            placeholder="MM/YY"
            className="w-full px-4 py-3 border border-[#D6D0C4] rounded-lg focus:border-[#8B2E2E] focus:ring-1 focus:ring-[#8B2E2E] outline-none transition-colors bg-white text-[#2D2A26]"
            disabled={isProcessing}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#5C5852] mb-1.5 uppercase tracking-wider">
            CVC
          </label>
          <input
            type="text"
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
            maxLength={4}
            placeholder="123"
            className="w-full px-4 py-3 border border-[#D6D0C4] rounded-lg focus:border-[#8B2E2E] focus:ring-1 focus:ring-[#8B2E2E] outline-none transition-colors bg-white text-[#2D2A26]"
            disabled={isProcessing}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCancel}
          disabled={isProcessing}
          className="btn-secondary flex-1 rounded-lg"
        >
          {t('payment.cancel')}
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: isValid && !isProcessing ? 1.02 : 1 }}
          whileTap={{ scale: isValid && !isProcessing ? 0.98 : 1 }}
          disabled={!isValid || isProcessing}
          className={`btn-primary flex-1 rounded-lg flex items-center justify-center gap-2 ${(!isValid || isProcessing) && 'opacity-50 cursor-not-allowed'}`}
        >
          {isProcessing ? (
            <>
              <LoaderIcon className="w-4 h-4 animate-spin" />
              {t('payment.processing')}
            </>
          ) : (
            <>
              <LockIcon />
              {t('payment.payNow')}
            </>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};

const PaymentScreen = ({ selectedDoor, onPaymentSuccess, onBack }) => {
  const { t } = useLanguage();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApplePay = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onPaymentSuccess();
  };

  const handleCardPayment = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsProcessing(false);
    onPaymentSuccess();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Logo />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mt-10 mb-8"
      >
        <h2 className="font-serif text-2xl text-[#2D2A26] mb-2">
          {t('payment.title')}
        </h2>
        <p className="text-sm text-[#969088]">
          {t('payment.subtitle')}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#8B2E2E]/10 rounded-full">
          <span className="text-[#8B2E2E] font-serif">{t('doorSelect.door')} {selectedDoor}</span>
          <span className="text-[#969088]">-</span>
          <span className="text-[#2D2A26] font-medium">EUR 12,00</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-md space-y-4"
      >
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleApplePay}
          disabled={isProcessing}
          className="w-full py-4 bg-black text-white rounded-lg flex items-center justify-center gap-3 font-medium hover:bg-black/90 transition-colors disabled:opacity-50"
        >
          {isProcessing && selectedMethod === 'apple' ? (
            <LoaderIcon className="w-5 h-5 animate-spin" />
          ) : (
            <AppleIcon />
          )}
          <span>Apple Pay</span>
        </motion.button>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-[#D6D0C4]" />
          <span className="text-xs text-[#969088] uppercase tracking-wider">{t('payment.or')}</span>
          <div className="flex-1 h-px bg-[#D6D0C4]" />
        </div>

        <motion.button
          whileHover={{ scale: selectedMethod !== 'card' ? 1.02 : 1 }}
          whileTap={{ scale: selectedMethod !== 'card' ? 0.98 : 1 }}
          onClick={() => setSelectedMethod(selectedMethod === 'card' ? null : 'card')}
          disabled={isProcessing}
          className={`w-full py-4 border-2 rounded-lg flex items-center justify-center gap-3 font-medium transition-all ${
            selectedMethod === 'card'
              ? 'border-[#8B2E2E] bg-[#8B2E2E]/5 text-[#8B2E2E]'
              : 'border-[#D6D0C4] text-[#2D2A26] hover:border-[#8B2E2E]/50'
          } disabled:opacity-50`}
        >
          <CreditCardIcon />
          <span>{t('payment.card')}</span>
          <motion.span
            animate={{ rotate: selectedMethod === 'card' ? 90 : 0 }}
            className="ml-auto"
          >
            <ChevronRightIcon />
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {selectedMethod === 'card' && (
            <CardForm
              onSubmit={handleCardPayment}
              onCancel={() => setSelectedMethod(null)}
              isProcessing={isProcessing}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex items-center gap-2 text-xs text-[#969088]"
      >
        <LockIcon />
        <span>{t('payment.secure')}</span>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onBack}
        disabled={isProcessing}
        className="mt-6 btn-secondary flex items-center justify-center gap-2 rounded-none disabled:opacity-50"
      >
        <span className="w-4 h-4"><ArrowLeftIcon /></span>
        {t('doorSelect.back')}
      </motion.button>
    </motion.div>
  );
};

export default PaymentScreen;
