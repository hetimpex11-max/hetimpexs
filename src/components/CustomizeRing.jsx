import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';

const diamondOptions = [
  { id: 'round', name: 'Round Brilliant', img: '/shapes/round.webp' },
  { id: 'cushion', name: 'Cushion', img: '/shapes/cushion.webp' },
  { id: 'emerald', name: 'Emerald', img: '/shapes/emerald.avif' },
  { id: 'oval', name: 'Oval', img: '/shapes/oval.avif' },
  { id: 'princess', name: 'Princess', img: '/shapes/princess.webp' },
  { id: 'marquise', name: 'Marquise', img: '/shapes/marquise.webp' },
  { id: 'asscher', name: 'Asscher', img: '/shapes/asscher.webp' },
];

const settingOptions = [
  { id: 'solitaire', name: 'Solitaire Style', desc: 'Classic single stone', img: '/settings/solitaire-white.png' },
  { id: 'pave', name: 'Pavé Band Style', desc: 'Pavé-set band', img: '/settings/pave-white.png' },
  { id: 'halo', name: 'Royal Halo Style', desc: 'Surrounded by brilliance', img: '/settings/halo-white.png' },
  { id: 'three-stone', name: 'Three-Stone Style', desc: 'Past, present, future', img: '/settings/three-stone-white.png' },
];

const metalOptions = [
  { id: 'yellow', name: 'Yellow Gold', gradient: 'bg-gradient-to-tr from-amber-200 via-yellow-400 to-amber-100' },
  { id: 'rose', name: 'Rose Gold', gradient: 'bg-gradient-to-tr from-orange-200 via-rose-300 to-orange-100' },
  { id: 'white', name: 'White Gold', gradient: 'bg-gradient-to-tr from-slate-200 via-zinc-300 to-neutral-100' },
];

export default function CustomizeRing() {
  const [selectedDiamond, setSelectedDiamond] = useState('');
  const [selectedSetting, setSelectedSetting] = useState('');
  const [selectedMetal, setSelectedMetal] = useState('');
  const [step, setStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextStep = () => {
    if (step < 3) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep(step + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep(step - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const getDiamondImage = () => {
    const diamond = diamondOptions.find(d => d.id === selectedDiamond);
    return diamond ? diamond.img : '/full-logo.png';
  };

  const getSettingImage = () => {
    if (!selectedSetting) return '/full-logo.png';
    const metal = selectedMetal === 'rose' ? 'yellow' : selectedMetal;
    return `/settings/${selectedSetting}-${metal}.png`;
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-neutral-900 font-sans py-12 px-6">
      {/* Live Layered Preview Canvas */}
      <div className="relative w-full max-w-2xl h-[450px] mx-auto mb-12 bg-white border border-neutral-100 rounded-2xl shadow-sm flex flex-col items-center justify-center overflow-hidden">
        {/* Layer 1: Base Setting */}
        <motion.img
          key={selectedSetting + selectedMetal}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          src={getSettingImage()}
          alt="Active Ring Setting Base"
          className="absolute inset-0 m-auto w-[85%] h-auto object-contain z-10 transition-all duration-500 ease-in-out"
          onError={(e) => {
            e.target.src = '/full-logo.png';
          }}
        />

        {/* Layer 2: Floating Diamond */}
        <AnimatePresence mode="wait">
          {selectedDiamond && (
            <motion.img
              key={selectedDiamond}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              src={getDiamondImage()}
              alt="Selected Diamond Shape"
              className="absolute inset-0 m-auto pb-[16%] w-1/3 h-auto object-contain z-20 transition-all duration-300"
              onError={(e) => {
                e.target.src = '/full-logo.png';
              }}
            />
          )}
        </AnimatePresence>

        {/* Guide Arrow */}
        {selectedDiamond && selectedSetting && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-[38%] z-30"
          >
            <div className="flex flex-col items-center">
              <div className="w-px h-8 bg-neutral-300" />
              <div className="w-2 h-2 border-r-2 border-b-2 border-neutral-400 transform rotate-45" />
            </div>
          </motion.div>
        )}

        {/* Placeholder when nothing selected */}
        {!selectedDiamond && !selectedSetting && (
          <div className="text-center text-neutral-400">
            <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm tracking-widest uppercase">Begin Your Design</p>
          </div>
        )}
      </div>

      {/* 3-Step Luxury Selection Console */}
      <div className="w-full max-w-6xl mx-auto bg-white/80 backdrop-blur-md border border-neutral-200/60 rounded-xl p-8 shadow-md">
        {/* Step Progress Indicator */}
        <div className="flex items-center justify-center gap-6 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-4">
              <button
                onClick={() => {
                  if (s < step) {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setStep(s);
                      setIsAnimating(false);
                    }, 300);
                  }
                }}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  s === step
                    ? 'text-neutral-900'
                    : s < step
                    ? 'text-neutral-500 cursor-pointer hover:text-neutral-900'
                    : 'text-neutral-300'
                }`}
              >
                <span className={`text-sm font-medium tracking-widest uppercase ${
                  s === step ? 'font-bold' : ''
                }`}>
                  {s === 1 ? '01 Loose Diamond' : s === 2 ? '02 Choose Setting' : '03 Choose Metal'}
                </span>
              </button>
              {s < 3 && (
                <div className={`w-6 h-px ${s < step ? 'bg-neutral-900' : 'bg-neutral-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="relative overflow-hidden min-h-[300px]">
          <AnimatePresence mode="wait" custom={isAnimating ? (step > 1 ? 1 : -1) : 0}>
            <motion.div
              key={step}
              custom={isAnimating ? (step > 1 ? 1 : -1) : 0}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {/* Step 1: Loose Diamond */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-6 tracking-wide">
                    Select Your Diamond Shape
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {diamondOptions.map((diamond) => (
                      <button
                        key={diamond.id}
                        type="button"
                        onClick={() => setSelectedDiamond(diamond.id)}
                        className={`group p-5 rounded-xl border transition-all duration-300 ${
                          selectedDiamond === diamond.id
                            ? 'border-neutral-900 bg-neutral-50 shadow-sm text-neutral-900'
                            : 'border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300 hover:shadow-sm'
                        }`}
                      >
                        <img
                          src={diamond.img}
                          alt={diamond.name}
                          className="w-16 h-16 object-contain mx-auto mb-2"
                          onError={(e) => {
                            e.target.src = '/full-logo.png';
                          }}
                        />
                        <span className="text-xs font-medium tracking-wider uppercase block text-center">
                          {diamond.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Choose Setting */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-6 tracking-wide">
                    Select Your Setting Style
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {settingOptions.map((setting) => (
                      <button
                        key={setting.id}
                        type="button"
                        onClick={() => setSelectedSetting(setting.id)}
                        className={`group p-5 rounded-xl border text-left transition-all duration-300 ${
                          selectedSetting === setting.id
                            ? 'border-neutral-900 bg-neutral-50 shadow-sm text-neutral-900'
                            : 'border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300 hover:shadow-sm'
                        }`}
                      >
                        <img
                          src={setting.img}
                          alt={setting.name}
                          className="w-16 h-16 object-contain mx-auto mb-2"
                          onError={(e) => {
                            e.target.src = '/full-logo.png';
                          }}
                        />
                        <h4 className="text-sm font-semibold tracking-wider uppercase mb-1">
                          {setting.name}
                        </h4>
                        <p className="text-xs text-neutral-400">
                          {setting.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Choose Metal */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-6 tracking-wide">
                    Select Your Metal
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {metalOptions.map((metal) => (
                      <button
                        key={metal.id}
                        type="button"
                        onClick={() => setSelectedMetal(metal.id)}
                        className={`group relative p-5 rounded-xl border text-center transition-all duration-300 ${
                          selectedMetal === metal.id
                            ? 'border-neutral-900 bg-neutral-50 shadow-sm'
                            : 'border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm'
                        }`}
                      >
                        <div
                          className={`w-14 h-14 rounded-full mx-auto mb-3 border-2 ${
                            selectedMetal === metal.id ? 'border-neutral-900' : 'border-neutral-200'
                          } ${metal.gradient}`}
                        />
                        <span className={`text-xs font-medium tracking-wider uppercase block ${
                          selectedMetal === metal.id ? 'text-neutral-900' : 'text-neutral-500'
                        }`}>
                          {metal.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-neutral-100">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="group inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-200 text-neutral-600 font-sans uppercase text-xs tracking-widest font-medium rounded-lg hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-300"
            >
              <ChevronRight className="rotate-180 w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white font-sans uppercase text-xs tracking-widest font-medium rounded-lg hover:bg-neutral-800 transition-all duration-300 transform active:scale-98 shadow-md"
            >
              Next Step
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white font-sans uppercase text-xs tracking-widest font-medium rounded-lg hover:bg-neutral-800 transition-all duration-300 transform active:scale-98 shadow-lg"
            >
              Preview Custom Ring
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
