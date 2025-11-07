import React, { useState, useEffect } from 'react';
import { Moon, Sun, Target, Heart, Wind, Leaf, Zap, RefreshCw, Square, Brain, ChevronRight, ChevronLeft, Play, Pause, X, ChevronDown, ChevronUp, Home } from 'lucide-react';

// Technique data
const techniques = [
  {
    id: 'box-breathing',
    name: 'Box Breathing',
    category: ['anxious', 'stressed'],
    duration: 5,
    tier: 'beginner',
    summary: 'Equal breathing that creates balance. Used by Navy SEALs for staying calm under pressure.',
    icon: Square,
    color: 'sage',
    pattern: [
      { phase: 'inhale', duration: 4, instruction: 'Breathe in through your nose' },
      { phase: 'hold', duration: 4, instruction: 'Hold your breath' },
      { phase: 'exhale', duration: 4, instruction: 'Breathe out through your mouth' },
      { phase: 'hold', duration: 4, instruction: 'Hold your breath' }
    ],
    cycles: 8,
    why: 'Creates balanced heart rhythm. Calms your nervous system. Brings mental clarity.',
    steps: [
      'Sit comfortably with straight back',
      'Exhale completely to start',
      'Breathe in through nose for 4 seconds',
      'Hold your breath for 4 seconds',
      'Breathe out through mouth for 4 seconds', 
      'Hold empty for 4 seconds',
      'Repeat for 5-10 minutes'
    ],
    expect: "You'll feel calmer within 2-3 cycles. Your mind will quiet down. Breathing becomes smooth and natural.",
    safety: null
  },
  {
    id: '4-7-8-breathing',
    name: '4-7-8 Breathing',
    category: ['sleep', 'anxious'],
    duration: 3,
    tier: 'beginner',
    summary: "The natural sleep switch. Extended exhale that tells your body it's safe to rest deeply.",
    icon: Moon,
    color: 'terracotta',
    pattern: [
      { phase: 'inhale', duration: 4, instruction: 'Breathe in through your nose' },
      { phase: 'hold', duration: 7, instruction: 'Hold your breath' },
      { phase: 'exhale', duration: 8, instruction: 'Breathe out through your mouth' }
    ],
    cycles: 4,
    why: "The long exhale activates your body's rest mode. Increases calming chemicals. Makes you drowsy naturally.",
    steps: [
      'Place tongue tip behind upper front teeth',
      'Exhale completely with a whoosh sound',
      'Close mouth, breathe in through nose for 4 seconds',
      'Hold breath for 7 seconds',
      'Exhale through mouth for 8 seconds with whoosh',
      'Repeat 4 times'
    ],
    expect: "You might yawn. Body feels heavy. Mind slows down. Sleep comes naturally.",
    safety: null
  },
  {
    id: 'physiological-sigh',
    name: 'Physiological Sigh',
    category: ['emotional', 'anxious'],
    duration: 2,
    tier: 'beginner',
    summary: "Your body's natural reset button. Two quick inhales, one long exhale. Works in seconds.",
    icon: Wind,
    color: 'sage',
    pattern: [
      { phase: 'inhale', duration: 2, instruction: 'First inhale - fill 80%' },
      { phase: 'inhale', duration: 1, instruction: 'Second inhale - top it off' },
      { phase: 'exhale', duration: 8, instruction: 'Long exhale through mouth' }
    ],
    cycles: 3,
    why: "Re-inflates your lungs fully. Releases stress instantly. This is what your body does naturally when crying.",
    steps: [
      'Breathe in through nose for 2 seconds',
      'Immediately take tiny second breath (no pause)',
      'Exhale slowly through mouth for 8 seconds',
      'Pause naturally',
      'Repeat 2-3 times'
    ],
    expect: "Relief comes fast. Often within one breath. Chest feels lighter. Calm washes over you.",
    safety: null
  },
  {
    id: 'coherent-breathing',
    name: 'Coherent Breathing',
    category: ['focus', 'balance'],
    duration: 10,
    tier: 'beginner',
    summary: 'The optimal rhythm. Five seconds in, five out. Creates perfect balance between alert and calm.',
    icon: Target,
    color: 'cream',
    pattern: [
      { phase: 'inhale', duration: 5, instruction: 'Breathe in through your nose' },
      { phase: 'exhale', duration: 5, instruction: 'Breathe out through your nose' }
    ],
    cycles: 12,
    why: "Your heart and breath sync perfectly. Improves focus without tension. Used by top performers.",
    steps: [
      'Sit comfortably, close eyes if you like',
      'Breathe in through nose for 5 seconds',
      'Breathe out through nose for 5 seconds',
      'No pauses - smooth and continuous',
      'Continue for 10-20 minutes'
    ],
    expect: "Mind becomes steady. Not too alert, not too relaxed. Perfect for work or meditation.",
    safety: null
  },
  {
    id: 'extended-exhale',
    name: 'Extended Exhale',
    category: ['stressed', 'anxious'],
    duration: 10,
    tier: 'beginner',
    summary: "Twice as long out as in. The ultimate stress melter. Your exhale is your best friend.",
    icon: Leaf,
    color: 'sage',
    pattern: [
      { phase: 'inhale', duration: 4, instruction: 'Breathe in gently' },
      { phase: 'exhale', duration: 8, instruction: 'Breathe out slowly' }
    ],
    cycles: 10,
    why: "Long exhales turn on your calm switch. Slows racing heart. Quiets worried thoughts.",
    steps: [
      'Find comfortable inhale length (4-6 seconds)',
      'Exhale for double that (8-12 seconds)',
      'No holds needed',
      'Smooth and gentle',
      'Practice 5-10 minutes'
    ],
    expect: "Shoulders drop. Jaw relaxes. Breathing becomes effortless. Peace settles in.",
    safety: null
  },
  {
    id: 'kapalabhati',
    name: 'Kapalabhati',
    category: ['energy', 'focus'],
    duration: 3,
    tier: 'intermediate',
    summary: 'Quick energy spark. Sharp exhales through your nose. Wakes up your brain and body.',
    icon: Zap,
    color: 'terracotta',
    pattern: [
      { phase: 'exhale', duration: 0.5, instruction: 'Sharp exhale through nose' },
      { phase: 'passive', duration: 0.5, instruction: 'Let inhale happen naturally' }
    ],
    cycles: 20,
    why: 'Increases oxygen to brain. Clears mental fog. Energizes without coffee.',
    steps: [
      'Sit upright in stable position',
      'Take deep breath in',
      'Make sharp, forceful exhales through nose',
      'Let inhales happen passively',
      'Start with just 10-20 breaths',
      'Rest after finishing'
    ],
    expect: "You'll feel tingling. Energy rises. Mind gets sharp. Body warms up.",
    safety: 'Start with only 10 breaths. Can cause dizziness. Never while driving or standing. Build slowly over weeks.'
  },
  {
    id: 'left-nostril-cooling',
    name: 'Left Nostril Cooling',
    category: ['calm', 'urges'],
    duration: 10,
    tier: 'beginner',
    summary: 'The cooling channel. Breathe only through your left nostril. Calms heat and urges.',
    icon: Wind,
    color: 'cream',
    pattern: [
      { phase: 'inhale', duration: 6, instruction: 'Breathe in through left nostril' },
      { phase: 'exhale', duration: 8, instruction: 'Breathe out through left nostril' }
    ],
    cycles: 10,
    why: 'Left nostril activates your cooling, calming side. Reduces arousal and heat. Ancient practice for self-control.',
    steps: [
      'Use right thumb to close right nostril',
      'Breathe only through left nostril',
      'Breathe slowly - 6 seconds in, 8 out',
      'Keep breathing cool and gentle',
      'Continue 10-15 minutes'
    ],
    expect: "Body cools down. Urges fade. Mind becomes clear and calm.",
    safety: null
  },
  {
    id: 'natural-observation',
    name: 'Natural Observation',
    category: ['mindful', 'balance'],
    duration: 15,
    tier: 'beginner',
    summary: "Just watch your breath. Don't change anything. Simple presence practice.",
    icon: Leaf,
    color: 'sage',
    pattern: [
      { phase: 'observe', duration: 3, instruction: 'Notice your natural breathing' }
    ],
    cycles: 20,
    why: "Anchors you to now. Quiets endless thinking. Builds awareness without effort.",
    steps: [
      'Sit or lie comfortably',
      'Don\'t control your breath',
      'Just notice it - nose or belly',
      'When mind wanders, gently return',
      'Practice 10-20 minutes'
    ],
    expect: "Mind wanders constantly - this is normal. Each return to breath is the practice. Peace grows.",
    safety: null
  },
  {
    id: 'recovery-breathing',
    name: 'Recovery Breathing',
    category: ['tired', 'recovery'],
    duration: 20,
    tier: 'beginner',
    summary: "Deep rest breathing. For when your body needs to recover. Let go completely.",
    icon: RefreshCw,
    color: 'terracotta',
    pattern: [
      { phase: 'inhale', duration: 5, instruction: 'Breathe in gently' },
      { phase: 'exhale', duration: 5, instruction: 'Breathe out gently' }
    ],
    cycles: 15,
    why: 'Optimal recovery rhythm. Tells body to heal and restore. Used by athletes for recovery.',
    steps: [
      'Lie down completely flat',
      'Close your eyes',
      'Breathe 5 seconds in, 5 seconds out',
      'Make it gentle and effortless',
      'Continue 15-20 minutes'
    ],
    expect: "Body becomes heavy. Energy returns slowly. You might fall asleep - that's good.",
    safety: null
  },
  {
    id: 'alternate-nostril',
    name: 'Alternate Nostril',
    category: ['balance', 'focus'],
    duration: 10,
    tier: 'beginner',
    summary: "Balance both sides. Clears your head. Ancient practice for mental clarity.",
    icon: Brain,
    color: 'cream',
    pattern: [
      { phase: 'inhale', duration: 4, instruction: 'Breathe in through left nostril' },
      { phase: 'exhale', duration: 4, instruction: 'Breathe out through right nostril' },
      { phase: 'inhale', duration: 4, instruction: 'Breathe in through right nostril' },
      { phase: 'exhale', duration: 4, instruction: 'Breathe out through left nostril' }
    ],
    cycles: 8,
    why: 'Balances left and right brain. Reduces mental chatter. Creates inner harmony.',
    steps: [
      'Sit with straight spine',
      'Use right thumb to close right nostril',
      'Breathe in through left for 4 seconds',
      'Close left with ring finger, release right',
      'Breathe out through right for 4 seconds',
      'Breathe in through right',
      'Switch and breathe out through left',
      'This is one cycle'
    ],
    expect: "Mind becomes balanced. Scattered thoughts settle. Clarity emerges.",
    safety: null
  }
];

const categories = [
  { id: 'anxious', label: 'Feeling Anxious', icon: Wind, description: 'Racing thoughts. Tight chest. Need calm now.' },
  { id: 'sleep', label: "Can't Sleep", icon: Moon, description: "Mind won't stop. Body won't rest. Need deep sleep." },
  { id: 'energy', label: 'Need Energy', icon: Zap, description: 'Foggy brain. Heavy body. Need a natural boost.' },
  { id: 'focus', label: 'Need Focus', icon: Target, description: "Scattered mind. Can't concentrate. Need clarity." },
  { id: 'stressed', label: 'Feeling Stressed', icon: Heart, description: 'Overwhelmed. Tense. Need to let go.' },
  { id: 'tired', label: 'Physically Tired', icon: RefreshCw, description: 'Body exhausted. Need recovery. Need rest.' },
  { id: 'emotional', label: 'Emotional Pain', icon: Heart, description: 'Heart hurts. Feeling overwhelmed. Need relief.' },
  { id: 'balance', label: 'Need Balance', icon: Leaf, description: 'Out of sync. Need to center. Find equilibrium.' }
];

const colorClasses = {
  sage: {
    bg: 'bg-[#7A9B8E]',
    text: 'text-[#7A9B8E]',
    hover: 'hover:bg-[#6A8B7E]',
    light: 'bg-[#7A9B8E]/10'
  },
  terracotta: {
    bg: 'bg-[#B87D6A]',
    text: 'text-[#B87D6A]',
    hover: 'hover:bg-[#A86D5A]',
    light: 'bg-[#B87D6A]/10'
  },
  cream: {
    bg: 'bg-[#D4C4A8]',
    text: 'text-[#D4C4A8]',
    hover: 'hover:bg-[#C4B498]',
    light: 'bg-[#D4C4A8]/10'
  }
};

function App() {
  const [screen, setScreen] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  
  return (
    <div className="min-h-screen bg-[#F5F3EC]">
      {screen === 'home' && <HomeScreen onSelectCategory={(cat) => { setSelectedCategory(cat); setScreen('category'); }} />}
      {screen === 'category' && <CategoryScreen category={selectedCategory} onSelectTechnique={(tech) => { setSelectedTechnique(tech); setScreen('technique-detail'); }} onBack={() => setScreen('home')} />}
      {screen === 'technique-detail' && <TechniqueDetail technique={selectedTechnique} onStartPractice={() => setScreen('practice')} onBack={() => setScreen('category')} />}
      {screen === 'practice' && <PracticeScreen technique={selectedTechnique} onComplete={() => setScreen('technique-detail')} onExit={() => setScreen('technique-detail')} />}
    </div>
  );
}

function HomeScreen({ onSelectCategory }) {
  return (
    <div className="min-h-screen p-6 pb-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 mt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#7A9B8E]/20 mb-4">
            <Wind className="w-10 h-10 text-[#3D5A4C]" />
          </div>
          <h1 className="text-4xl font-light text-[#3D5A4C] mb-3">Breathe</h1>
          <p className="text-lg text-[#3D5A4C]/70">How can we help you today?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category)}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#7A9B8E]/10 flex items-center justify-center group-hover:bg-[#7A9B8E]/20 transition-colors">
                    <Icon className="w-7 h-7 text-[#3D5A4C]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[#3D5A4C] mb-1">{category.label}</h3>
                    <p className="text-sm text-[#3D5A4C]/60 leading-relaxed">{category.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#3D5A4C]/30 flex-shrink-0 group-hover:text-[#3D5A4C]/60 transition-colors" />
                </div>
              </button>
            );
          })}
        </div>

        <button 
          onClick={() => onSelectCategory({ id: 'all', label: 'All Techniques' })}
          className="w-full py-4 text-[#3D5A4C]/70 hover:text-[#3D5A4C] transition-colors text-center font-medium"
        >
          Browse All Techniques
        </button>
      </div>
    </div>
  );
}

function CategoryScreen({ category, onSelectTechnique, onBack }) {
  const filteredTechniques = category.id === 'all' 
    ? techniques 
    : techniques.filter(t => t.category.includes(category.id));

  return (
    <div className="min-h-screen p-6 pb-20">
      <div className="max-w-2xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-[#3D5A4C]/70 hover:text-[#3D5A4C] mb-6">
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-[#3D5A4C] mb-2">{category.label}</h1>
          <p className="text-[#3D5A4C]/60">{filteredTechniques.length} techniques to help you</p>
        </div>

        <div className="space-y-4">
          {filteredTechniques.map((technique) => {
            const Icon = technique.icon;
            const colors = colorClasses[technique.color];
            return (
              <button
                key={technique.id}
                onClick={() => onSelectTechnique(technique)}
                className="w-full bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full ${colors.light} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-[#3D5A4C]">{technique.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${technique.tier === 'beginner' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {technique.tier === 'beginner' ? '🟢' : '🟡'}
                      </span>
                    </div>
                    <p className="text-sm text-[#3D5A4C]/60 mb-2 leading-relaxed">{technique.summary}</p>
                    <span className="text-xs text-[#3D5A4C]/50">⏱ {technique.duration} min</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#3D5A4C]/30 flex-shrink-0 group-hover:text-[#3D5A4C]/60 transition-colors" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TechniqueDetail({ technique, onStartPractice, onBack }) {
  const [expandedSection, setExpandedSection] = useState(null);
  const Icon = technique.icon;
  const colors = colorClasses[technique.color];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen p-6 pb-32">
      <div className="max-w-2xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-[#3D5A4C]/70 hover:text-[#3D5A4C] mb-6">
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${colors.light} mb-4`}>
            <Icon className={`w-10 h-10 ${colors.text}`} />
          </div>
          <h1 className="text-3xl font-light text-[#3D5A4C] mb-2">{technique.name}</h1>
          <p className="text-lg text-[#3D5A4C]/70 mb-4 leading-relaxed">{technique.summary}</p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-[#3D5A4C]/60">
            <span className={`px-3 py-1 rounded-full ${technique.tier === 'beginner' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {technique.tier === 'beginner' ? '🟢 Safe for beginners' : '🟡 Start carefully'}
            </span>
            <span>⏱ {technique.duration} min</span>
          </div>
        </div>

        {technique.safety && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6">
            <div className="flex gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-medium text-yellow-900 mb-1">Important Safety Note</h3>
                <p className="text-sm text-yellow-800 leading-relaxed">{technique.safety}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3 mb-8">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => toggleSection('why')}
              className="w-full p-5 flex items-center justify-between text-left"
            >
              <span className="font-medium text-[#3D5A4C]">Why this helps</span>
              {expandedSection === 'why' ? <ChevronUp className="w-5 h-5 text-[#3D5A4C]/50" /> : <ChevronDown className="w-5 h-5 text-[#3D5A4C]/50" />}
            </button>
            {expandedSection === 'why' && (
              <div className="px-5 pb-5">
                <p className="text-[#3D5A4C]/70 leading-relaxed">{technique.why}</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => toggleSection('steps')}
              className="w-full p-5 flex items-center justify-between text-left"
            >
              <span className="font-medium text-[#3D5A4C]">Step by step guide</span>
              {expandedSection === 'steps' ? <ChevronUp className="w-5 h-5 text-[#3D5A4C]/50" /> : <ChevronDown className="w-5 h-5 text-[#3D5A4C]/50" />}
            </button>
            {expandedSection === 'steps' && (
              <div className="px-5 pb-5">
                <ol className="space-y-2">
                  {technique.steps.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#7A9B8E]/10 flex items-center justify-center text-sm text-[#3D5A4C]">{index + 1}</span>
                      <span className="text-[#3D5A4C]/70 leading-relaxed pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => toggleSection('expect')}
              className="w-full p-5 flex items-center justify-between text-left"
            >
              <span className="font-medium text-[#3D5A4C]">What to expect</span>
              {expandedSection === 'expect' ? <ChevronUp className="w-5 h-5 text-[#3D5A4C]/50" /> : <ChevronDown className="w-5 h-5 text-[#3D5A4C]/50" />}
            </button>
            {expandedSection === 'expect' && (
              <div className="px-5 pb-5">
                <p className="text-[#3D5A4C]/70 leading-relaxed">{technique.expect}</p>
              </div>
            )}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#F5F3EC] via-[#F5F3EC] to-transparent">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={onStartPractice}
              className={`w-full ${colors.bg} text-white py-4 rounded-full font-medium ${colors.hover} transition-colors flex items-center justify-center gap-2 shadow-lg`}
            >
              <Play className="w-5 h-5" fill="white" />
              Start Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PracticeScreen({ technique, onComplete, onExit }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(technique.pattern[0].duration);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownValue, setCountdownValue] = useState(5);
  
  const currentPhase = technique.pattern[currentPhaseIndex];
  const progress = ((currentCycle * technique.pattern.length + currentPhaseIndex) / (technique.cycles * technique.pattern.length)) * 100;

  useEffect(() => {
    if (!showCountdown || isPlaying) return;

    const timer = setInterval(() => {
      setCountdownValue((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowCountdown(false);
          setCurrentPhaseIndex(0);
          setCurrentCycle(0);
          setTimeLeft(technique.pattern[0].duration);
          setIsPlaying(true);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showCountdown, isPlaying, technique.pattern]);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          const nextPhaseIndex = (currentPhaseIndex + 1) % technique.pattern.length;
          
          if (nextPhaseIndex === 0) {
            const nextCycle = currentCycle + 1;
            if (nextCycle >= technique.cycles) {
              setIsPlaying(false);
              setTimeout(() => onComplete(), 1000);
              return 0;
            }
            setCurrentCycle(nextCycle);
          }
          
          setCurrentPhaseIndex(nextPhaseIndex);
          return technique.pattern[nextPhaseIndex].duration;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isPlaying, currentPhaseIndex, currentCycle, technique, onComplete]);

  const handleStartPause = () => {
    if (showInstructions) {
      setShowInstructions(false);
      setShowCountdown(true);
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const getCircleScale = () => {
    const phaseDuration = currentPhase.duration;
    const phaseProgress = 1 - (timeLeft / phaseDuration);
    
    if (currentPhase.phase === 'inhale') {
      return 0.5 + (phaseProgress * 0.5);
    } else if (currentPhase.phase === 'exhale') {
      return 1 - (phaseProgress * 0.5);
    } else if (currentPhase.phase === 'hold') {
      return 1;
    } else if (currentPhase.phase === 'passive') {
      return 0.6;
    } else if (currentPhase.phase === 'observe') {
      return 0.75 + Math.sin(phaseProgress * Math.PI * 2) * 0.1;
    }
    return 1;
  };

  const getCircleColor = () => {
    const colors = colorClasses[technique.color];
    if (currentPhase.phase === 'inhale') return colors.bg.replace('bg-', '');
    if (currentPhase.phase === 'exhale') return '#E8DCC4';
    if (currentPhase.phase === 'hold') return '#B87D6A';
    if (currentPhase.phase === 'passive') return '#D4C4A8';
    if (currentPhase.phase === 'observe') return '#7A9B8E';
    return '#7A9B8E';
  };

  if (showInstructions) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#F5F3EC]">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-lg text-center">
          <div className="w-16 h-16 rounded-full bg-[#7A9B8E]/10 mx-auto mb-4 flex items-center justify-center">
            <Wind className="w-8 h-8 text-[#3D5A4C]" />
          </div>
          <h2 className="text-2xl font-light text-[#3D5A4C] mb-4">Ready to begin?</h2>
          <p className="text-[#3D5A4C]/70 mb-6 leading-relaxed">
            Find a comfortable position. Close your eyes if you like. Just follow the circle and the instructions.
          </p>
          <p className="text-sm text-[#3D5A4C]/60 mb-8">
            The circle will guide your breath. Let it be easy and natural.
          </p>
          <button
            onClick={handleStartPause}
            className="w-full bg-[#7A9B8E] text-white py-4 rounded-full font-medium hover:bg-[#6A8B7E] transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" fill="white" />
            Start Now
          </button>
          <button
            onClick={onExit}
            className="w-full mt-3 text-[#3D5A4C]/60 py-3 rounded-full font-medium hover:text-[#3D5A4C] transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    );
  }

  if (showCountdown) {
    return (
      <div className="min-h-screen bg-[#F5F3EC] flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <button
            onClick={onExit}
            className="p-2 rounded-full hover:bg-white/50 transition-colors"
          >
            <X className="w-6 h-6 text-[#3D5A4C]" />
          </button>
          <div className="text-sm text-[#3D5A4C]/60">
            Get Ready
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="relative w-full max-w-sm aspect-square flex items-center justify-center mb-12">
            <div
              className="absolute rounded-full"
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#7A9B8E',
                opacity: 0.3,
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: '90%',
                height: '90%',
                backgroundColor: '#7A9B8E',
                opacity: 0.5,
              }}
            />
            <div
              className="absolute rounded-full flex items-center justify-center"
              style={{
                width: '80%',
                height: '80%',
                backgroundColor: '#7A9B8E',
              }}
            >
              <span className="text-white text-6xl font-light">
                {countdownValue}
              </span>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-light text-[#3D5A4C]">Get Ready</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3EC] flex flex-col">
      <div className="p-4 flex items-center justify-between">
        <button
          onClick={onExit}
          className="p-2 rounded-full hover:bg-white/50 transition-colors"
        >
          <X className="w-6 h-6 text-[#3D5A4C]" />
        </button>
        <div className="text-sm text-[#3D5A4C]/60">
          Cycle {currentCycle + 1} of {technique.cycles}
        </div>
      </div>

      <div className="px-6">
        <div className="h-1 bg-white rounded-full overflow-hidden">
          <div
            className="h-full bg-[#7A9B8E] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 pb-32">
        <div className="relative w-full max-w-sm aspect-square flex items-center justify-center mb-12">
          <div
            className="absolute rounded-full transition-all duration-300 ease-in-out"
            style={{
              width: '100%',
              height: '100%',
              transform: `scale(${getCircleScale()})`,
              backgroundColor: getCircleColor(),
              opacity: 0.3,
            }}
          />
          <div
            className="absolute rounded-full transition-all duration-300 ease-in-out"
            style={{
              width: '90%',
              height: '90%',
              transform: `scale(${getCircleScale()})`,
              backgroundColor: getCircleColor(),
              opacity: 0.5,
            }}
          />
          <div
            className="absolute rounded-full transition-all duration-300 ease-in-out flex items-center justify-center"
            style={{
              width: '80%',
              height: '80%',
              transform: `scale(${getCircleScale()})`,
              backgroundColor: getCircleColor(),
            }}
          >
            <span className="text-white text-6xl font-light">
              {Math.ceil(timeLeft)}
            </span>
          </div>
        </div>

        <div className="text-center mb-4">
          <h2 className="text-2xl font-light text-[#3D5A4C] capitalize mb-2">
            {currentPhase.phase === 'passive' ? 'Passive Inhale' : currentPhase.phase}
          </h2>
          <p className="text-lg text-[#3D5A4C]/70 leading-relaxed max-w-md">
            {currentPhase.instruction}
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#F5F3EC] via-[#F5F3EC] to-transparent">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleStartPause}
            className="w-full bg-white text-[#3D5A4C] py-4 rounded-full font-medium hover:bg-white/80 transition-colors flex items-center justify-center gap-2 shadow-lg border border-[#3D5A4C]/10"
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5" fill="currentColor" />
                Resume
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
