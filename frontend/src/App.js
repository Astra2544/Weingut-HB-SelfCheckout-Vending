import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import PaymentScreen from './components/PaymentScreen';
import './App.css';

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

const WineIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8 22h8"/>
    <path d="M7 10h10"/>
    <path d="M12 15v7"/>
    <path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7"/>
    <path d="M19 12H5"/>
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

const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="absolute top-6 right-6 flex gap-2 z-10">
      <button
        onClick={() => setLanguage('de')}
        className={`px-3 py-1.5 text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
          language === 'de'
            ? 'text-[#8B2E2E] border-b-2 border-[#8B2E2E]'
            : 'text-[#969088] hover:text-[#5C5852]'
        }`}
      >
        DE
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
          language === 'en'
            ? 'text-[#8B2E2E] border-b-2 border-[#8B2E2E]'
            : 'text-[#969088] hover:text-[#5C5852]'
        }`}
      >
        EN
      </button>
    </div>
  );
};

const StepIndicator = ({ step, label, completed, active }) => (
  <div className="flex items-center gap-4">
    <div className={`
      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
      ${completed
        ? 'bg-[#8B2E2E] text-white'
        : active
          ? 'bg-[#8B2E2E]/10 text-[#8B2E2E] border-2 border-[#8B2E2E]'
          : 'bg-[#F2EFE9] text-[#969088] border border-[#D6D0C4]'
      }
    `}>
      {completed ? (
        <span className="w-5 h-5"><CheckIcon /></span>
      ) : (
        <span className="text-sm font-medium">{step}</span>
      )}
    </div>
    <span className={`text-sm font-medium transition-colors duration-300 ${
      completed || active ? 'text-[#2D2A26]' : 'text-[#969088]'
    }`}>
      {label}
    </span>
  </div>
);

const LandingScreen = ({ onContinue }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Logo />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-4 mb-12"
      >
        <WineIcon className="w-8 h-8 text-[#8B2E2E] mx-auto" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-full max-w-sm space-y-6 mb-12"
      >
        <div className="flex items-center justify-between">
          <StepIndicator step={1} label={t('landing.step1')} completed={true} />
          <span className="text-xs text-[#8B2E2E] font-medium uppercase tracking-wider">
            {t('landing.scanned')}
          </span>
        </div>

        <div className="ml-5 border-l-2 border-dashed border-[#D6D0C4] h-4" />

        <StepIndicator step={2} label={t('landing.step2')} active={true} />

        <div className="ml-5 border-l-2 border-dashed border-[#D6D0C4] h-4" />

        <StepIndicator step={3} label={t('landing.step3')} />
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onContinue}
        className="btn-primary flex items-center gap-3 rounded-none"
      >
        {t('landing.continue')}
        <span className="w-4 h-4"><ChevronRightIcon /></span>
      </motion.button>
    </motion.div>
  );
};

const DoorSelectScreen = ({ onSelect, onBack }) => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);

  const doors = [1, 2];

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
        className="text-center mt-12 mb-10"
      >
        <h2 className="font-serif text-2xl text-[#2D2A26] mb-2">
          {t('doorSelect.title')}
        </h2>
        <p className="text-sm text-[#969088]">
          {t('doorSelect.subtitle')}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 gap-6 w-full max-w-md mb-12"
      >
        {doors.map((door, index) => (
          <motion.button
            key={door}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelected(door)}
            className={`
              relative aspect-[3/4] rounded-lg border-2 transition-all duration-300
              flex flex-col items-center justify-center gap-4
              ${selected === door
                ? 'border-[#8B2E2E] bg-[#8B2E2E]/5 shadow-lg'
                : 'border-[#D6D0C4] bg-white hover:border-[#8B2E2E]/50 hover:bg-[#F9F8F6]'
              }
            `}
          >
            <div className={`
              relative w-20 h-28 rounded border-2 transition-all duration-300
              ${selected === door
                ? 'border-[#8B2E2E] bg-[#8B2E2E]/10'
                : 'border-[#D6D0C4] bg-[#F2EFE9]'
              }
            `}>
              <div className={`
                w-2 h-2 rounded-full absolute right-2 top-1/2 -translate-y-1/2 transition-colors duration-300
                ${selected === door ? 'bg-[#8B2E2E]' : 'bg-[#969088]'}
              `} />
            </div>
            <span className={`
              text-lg font-serif transition-colors duration-300
              ${selected === door ? 'text-[#8B2E2E]' : 'text-[#2D2A26]'}
            `}>
              {t('doorSelect.door')} {door}
            </span>
            {selected === door && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 right-3 w-6 h-6 bg-[#8B2E2E] rounded-full flex items-center justify-center"
              >
                <span className="w-4 h-4 text-white"><CheckIcon /></span>
              </motion.div>
            )}
          </motion.button>
        ))}
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="btn-secondary flex items-center justify-center gap-2 flex-1 rounded-none"
        >
          <span className="w-4 h-4"><ArrowLeftIcon /></span>
          {t('doorSelect.back')}
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: selected ? 1.02 : 1, y: selected ? -2 : 0 }}
          whileTap={{ scale: selected ? 0.98 : 1 }}
          onClick={() => selected && onSelect(selected)}
          disabled={!selected}
          className={`
            btn-primary flex items-center justify-center gap-2 flex-1 rounded-none
            ${!selected && 'opacity-50 cursor-not-allowed'}
          `}
        >
          {t('doorSelect.confirm')}
          <span className="w-4 h-4"><ChevronRightIcon /></span>
        </motion.button>
      </div>
    </motion.div>
  );
};

const LoaderIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);

const SuccessScreen = ({ selectedDoor, onReset }) => {
  const { t } = useLanguage();
  const [phase, setPhase] = useState('success');

  React.useEffect(() => {
    const timer1 = setTimeout(() => setPhase('opening'), 2000);
    const timer2 = setTimeout(() => setPhase('open'), 4000);
    const timer3 = setTimeout(() => setPhase('complete'), 5500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
    >
      <Logo />

      <div className="mt-12 mb-8 text-center">
        <AnimatePresence mode="wait">
          {phase === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center mb-6"
              >
                <span className="w-10 h-10 text-white"><CheckIcon /></span>
              </motion.div>

              <h2 className="font-serif text-2xl text-[#2D2A26] mb-2">
                {t('success.title')}
              </h2>
              <p className="text-sm text-[#969088] mb-4">
                {t('success.subtitle')}
              </p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 px-6 py-4 bg-[#8B2E2E]/10 rounded-xl"
              >
                <p className="text-sm text-[#5C5852] mb-1">{t('success.doorInfo')}</p>
                <p className="text-3xl font-serif text-[#8B2E2E] font-medium">
                  {t('doorSelect.door')} {selectedDoor}
                </p>
              </motion.div>
            </motion.div>
          )}

          {phase === 'opening' && (
            <motion.div
              key="opening"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{
                  rotateY: [0, 90],
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ transformStyle: 'preserve-3d' }}
                className="w-24 h-36 border-2 border-[#8B2E2E] bg-[#8B2E2E]/5 rounded-lg mb-6 relative"
              >
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#D4AF37]" />
              </motion.div>

              <h2 className="font-serif text-2xl text-[#2D2A26]">
                {t('doorSelect.door')} {selectedDoor}
              </h2>
              <p className="text-sm text-[#969088] mt-2 flex items-center gap-2">
                <LoaderIcon className="w-4 h-4 animate-spin" />
                {t('success.opening')}
              </p>
            </motion.div>
          )}

          {phase === 'open' && (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={{ rotateY: 90 }}
                animate={{ rotateY: -30 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-24 h-36 border-2 border-[#8B2E2E] bg-[#8B2E2E]/10 rounded-lg mb-6 relative origin-left"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <WineIcon className="w-10 h-10 text-[#8B2E2E]" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="font-serif text-2xl text-[#8B2E2E]">
                  {t('success.ready')}
                </h2>
                <p className="text-sm text-[#969088] mt-2 text-center">
                  {t('doorSelect.door')} {selectedDoor}
                </p>
              </motion.div>
            </motion.div>
          )}

          {phase === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                className="w-20 h-20 rounded-full bg-[#8B2E2E] flex items-center justify-center mb-6"
              >
                <span className="w-10 h-10 text-white"><CheckIcon /></span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-serif text-3xl text-[#2D2A26]"
              >
                {t('success.thanks')}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[#969088] mt-2 mb-8"
              >
                {t('success.enjoy')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2 text-[#D4AF37]"
              >
                <WineIcon className="w-5 h-5" />
                <span className="text-sm font-medium">
                  Hermann Böhmer
                </span>
                <WineIcon className="w-5 h-5" />
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onReset}
                className="mt-10 btn-secondary rounded-none"
              >
                {t('success.newPurchase')}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const SelfCheckoutApp = () => {
  const [screen, setScreen] = useState('landing');
  const [selectedDoor, setSelectedDoor] = useState(null);

  const handleContinue = () => setScreen('doorSelect');
  const handleBackToLanding = () => setScreen('landing');
  const handleDoorSelect = (door) => {
    setSelectedDoor(door);
    setScreen('payment');
  };
  const handleBackToDoorSelect = () => setScreen('doorSelect');
  const handlePaymentSuccess = () => setScreen('success');
  const handleReset = () => {
    setSelectedDoor(null);
    setScreen('landing');
  };

  return (
    <div className="relative min-h-screen bg-[#F9F8F6]">
      <LanguageSwitch />

      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <LandingScreen key="landing" onContinue={handleContinue} />
        )}
        {screen === 'doorSelect' && (
          <DoorSelectScreen key="doorSelect" onSelect={handleDoorSelect} onBack={handleBackToLanding} />
        )}
        {screen === 'payment' && (
          <PaymentScreen
            key="payment"
            selectedDoor={selectedDoor}
            onPaymentSuccess={handlePaymentSuccess}
            onBack={handleBackToDoorSelect}
          />
        )}
        {screen === 'success' && (
          <SuccessScreen key="success" selectedDoor={selectedDoor} onReset={handleReset} />
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <SelfCheckoutApp />
    </LanguageProvider>
  );
}

export default App;
