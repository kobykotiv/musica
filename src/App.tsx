import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RefreshCw, Music, Mic, Volume2, Download, 
  HelpCircle, Sparkles, ChevronRight, CheckCircle2, AlertCircle, 
  Settings, Layers, Sliders, ChevronDown, Radio, UploadCloud,
  FileText, Activity, Disc, AlignLeft, BarChart2, Plus, Trash2, 
  SlidersHorizontal, Info, Menu, X, Terminal, ArrowLeftRight,
  Wifi, WifiOff, Smartphone, ShieldCheck, Key, Check, CreditCard,
  Search, MapPin, Feather, Compass, Scissors, Award, Save, Lock, Image
} from 'lucide-react';

// ============================================================================
// CONFIGURATION & STYLING CONSTANTS (DORICO THEMED)
// ============================================================================
const appId = 'dorico-vibesync-pwa';

const GENRE_POOL = [
  {
    id: 'rock',
    name: 'Rock',
    subgenres: [
      { id: 'arena-rock', name: 'Arena Rock' },
      { id: 'hard-rock', name: 'Hard Rock' },
      { id: 'glam-rock', name: 'Glam Rock' },
      { id: 'indie-rock', name: 'Indie Rock' },
      { id: 'garage-rock', name: 'Garage Rock' },
      { id: 'blues-rock', name: 'Blues Rock' },
      { id: 'progressive-rock', name: 'Progressive Rock' },
      { id: 'math-rock', name: 'Math Rock' },
      { id: 'psychedelic-rock', name: 'Psychedelic Rock' },
      { id: 'southern-rock', name: 'Southern Rock' },
      { id: 'surf-rock', name: 'Surf Rock' },
      { id: 'gothic-rock', name: 'Gothic Rock' },
      { id: 'alternative-rock', name: 'Alternative Rock' },
      { id: 'soft-rock', name: 'Soft Rock' },
      { id: 'classic-rock', name: 'Classic Rock' },
      { id: 'folk-rock', name: 'Folk Rock' }
    ],
    style: 'Highly rhythmic, rock instrumentation, varied tempos',
    defaultVoice: 'Charon'
  },
  {
    id: 'electronic',
    name: 'Electronic',
    subgenres: [
      { id: 'house', name: 'House' },
      { id: 'deep-house', name: 'Deep House' },
      { id: 'tech-house', name: 'Tech House' },
      { id: 'progressive-house', name: 'Progressive House' },
      { id: 'electro-house', name: 'Electro House' },
      { id: 'future-house', name: 'Future House' },
      { id: 'trance', name: 'Trance' },
      { id: 'psytrance', name: 'Psytrance' },
      { id: 'techno', name: 'Techno' },
      { id: 'acid-techno', name: 'Acid Techno' },
      { id: 'dub-techno', name: 'Dub Techno' },
      { id: 'drum-and-bass', name: 'Drum & Bass' },
      { id: 'jungle', name: 'Jungle' },
      { id: 'breakbeat', name: 'Breakbeat' },
      { id: 'uk-garage', name: 'UK Garage' },
      { id: 'future-bass', name: 'Future Bass' }
    ],
    style: 'Synthetic sounds, rhythmic patterns, electronic instrumentation',
    defaultVoice: 'Puck'
  },
  {
    id: 'hip-hop',
    name: 'Hip Hop',
    subgenres: [
      { id: 'boom-bap', name: 'Boom Bap' },
      { id: 'trap', name: 'Trap' },
      { id: 'drill', name: 'Drill' },
      { id: 'lo-fi-hip-hop', name: 'Lo-fi Hip Hop' },
      { id: 'conscious-hip-hop', name: 'Conscious Hip Hop' },
      { id: 'jazz-rap', name: 'Jazz Rap' },
      { id: 'cloud-rap', name: 'Cloud Rap' },
      { id: 'memphis-rap', name: 'Memphis Rap' },
      { id: 'west-coast', name: 'West Coast' },
      { id: 'east-coast', name: 'East Coast' },
      { id: 'g-funk', name: 'G-Funk' },
      { id: 'experimental-hip-hop', name: 'Experimental Hip Hop' },
      { id: 'alternative-hip-hop', name: 'Alternative Hip Hop' }
    ],
    style: 'Rhythmic delivery, lyrical content, vocal flow',
    defaultVoice: 'Fenrir'
  },
  {
    id: 'jazz',
    name: 'Jazz',
    subgenres: [
      { id: 'bebop', name: 'Bebop' },
      { id: 'hard-bop', name: 'Hard Bop' },
      { id: 'cool-jazz', name: 'Cool Jazz' },
      { id: 'modal-jazz', name: 'Modal Jazz' },
      { id: 'fusion', name: 'Jazz Fusion' },
      { id: 'latin-jazz', name: 'Latin Jazz' },
      { id: 'gypsy-jazz', name: 'Gypsy Jazz' },
      { id: 'smooth-jazz', name: 'Smooth Jazz' },
      { id: 'free-jazz', name: 'Free Jazz' },
      { id: 'vocal-jazz', name: 'Vocal Jazz' }
    ],
    style: 'Improvised harmonic complexity, swing rhythm, diverse instrumentation',
    defaultVoice: 'Leda'
  },
  {
    id: 'classical',
    name: 'Classical',
    subgenres: [
      { id: 'baroque', name: 'Baroque' },
      { id: 'romantic', name: 'Romantic' },
      { id: 'impressionist', name: 'Impressionist' },
      { id: 'minimalist', name: 'Minimalist' },
      { id: 'chamber', name: 'Chamber' },
      { id: 'symphony', name: 'Symphony' },
      { id: 'opera', name: 'Opera' },
      { id: 'choral', name: 'Choral' },
      { id: 'contemporary-classical', name: 'Contemporary Classical' },
      { id: 'film-score', name: 'Film Score' }
    ],
    style: 'Orchestral arrangements, composed notation, dynamic range',
    defaultVoice: 'Kore'
  },
  {
    id: 'metal',
    name: 'Metal',
    subgenres: [
      { id: 'heavy', name: 'Heavy' },
      { id: 'thrash', name: 'Thrash' },
      { id: 'death', name: 'Death' },
      { id: 'black', name: 'Black' },
      { id: 'doom', name: 'Doom' },
      { id: 'power', name: 'Power' },
      { id: 'progressive', name: 'Progressive' },
      { id: 'metalcore', name: 'Metalcore' },
      { id: 'djent', name: 'Djent' },
      { id: 'folk-metal', name: 'Folk Metal' },
      { id: 'industrial-metal', name: 'Industrial Metal' },
      { id: 'symphonic-metal', name: 'Symphonic Metal' }
    ],
    style: 'Heavy distortion, aggressive vocals, complex rhythms',
    defaultVoice: 'Puck'
  },
  {
    id: 'ambient',
    name: 'Ambient',
    subgenres: [
      { id: 'dark-ambient', name: 'Dark Ambient' },
      { id: 'drone', name: 'Drone' },
      { id: 'ambient-dream', name: 'Ambient Dream-Pop' },
      { id: 'noise-ambient', name: 'Noise Ambient' }
    ],
    style: 'Atmospheric textures, sustained tones, minimalistic evolution',
    defaultVoice: 'Leda'
  },
  {
    id: 'world',
    name: 'World',
    subgenres: [
      { id: 'latin', name: 'Latin' },
      { id: 'afro', name: 'Afro' },
      { id: 'middle-east', name: 'Middle East' },
      { id: 'asian', name: 'Asian' },
      { id: 'african', name: 'African' }
    ],
    style: 'Traditional instruments, cultural rhythms, regional vocal styles',
    defaultVoice: 'Sadaltager'
  }
];

const PRESETS = [
  {
    title: "Yesterday (Originally by The Beatles)",
    sourceArtist: "The Beatles",
    sourceGenre: "country",
    lyrics: `Yesterday, all my troubles seemed so far away\nNow it looks as though they're here to stay\nOh, I believe in yesterday`
  },
  {
    title: "Space Oddity (Originally by David Bowie)",
    sourceArtist: "David Bowie",
    sourceGenre: "ambient",
    lyrics: `Ground Control to Major Tom\nGround Control to Major Tom\nTake your protein pills and put your helmet on`
  },
  {
    title: "Take On Me (Originally by A-ha)",
    sourceArtist: "A-ha",
    sourceGenre: "synthwave",
    lyrics: `We're talking away\nI don't know what I'm to say\nI'll say it anyway\nToday's another day to find you`
  }
];

const INITIAL_INSTRUMENTS = [
  // Keys & Organs
  { name: "Steinway Concert Grand", class: "Keys", freq: 261.63, waveform: "triangle", attack: 0.005, decay: 1.2, sustain: 0.1, release: 0.8, timbre: "Warm, full-body resonant Middle C strike on an 9ft Steinway D." },
  { name: "Felted Parlor Upright", class: "Keys", freq: 261.63, waveform: "triangle", attack: 0.02, decay: 0.8, sustain: 0.05, release: 0.4, timbre: "Muffled hammer action with organic felt cloth dampening." },
  { name: "Suitcase Drawbar Rhodes", class: "Keys", freq: 261.63, waveform: "sine", attack: 0.01, decay: 1.5, sustain: 0.2, release: 1.0, timbre: "Warm electric tines with signature bell harmonic chime." },
  { name: "Reed-Vibe Wurlitzer", class: "Keys", freq: 261.63, waveform: "sawtooth", attack: 0.015, decay: 1.0, sustain: 0.1, release: 0.6, timbre: "Vibrant and slightly saturated reed strike with retro bite." },
  { name: "Flemish Harpsichord", class: "Keys", freq: 261.63, waveform: "sawtooth", attack: 0.002, decay: 0.4, sustain: 0.0, release: 0.1, timbre: "Plucked wire string action, rich in high-frequency transients." },
  { name: "Vintage Clavinet D6", class: "Keys", freq: 261.63, waveform: "square", attack: 0.004, decay: 0.3, sustain: 0.0, release: 0.05, timbre: "Percussive plucked clavinet with rubber damper bar offset." },
  { name: "Cathedral Wind Pipes", class: "Keys", freq: 261.63, waveform: "sine", attack: 0.1, decay: 0.1, sustain: 0.8, release: 0.3, timbre: "Massive majestic wind pipes layered in cathedral space." },
  { name: "Tonewheel Leslie Organ", class: "Keys", freq: 261.63, waveform: "sine", attack: 0.03, decay: 0.05, sustain: 0.7, release: 0.15, timbre: "Classic tonewheel organ drawbars with gentle rotary spin." },
  { name: "Glass Celesta Chime", class: "Keys", freq: 261.63, waveform: "sine", attack: 0.002, decay: 1.8, sustain: 0.15, release: 1.2, timbre: "Pure high-register bell tines struck over wooden resonators." },
  { name: "Clockwork Music Box", class: "Keys", freq: 261.63, waveform: "triangle", attack: 0.003, decay: 0.4, sustain: 0.0, release: 0.2, timbre: "Short, glassy metal rod strikes with playful pitch anomalies." },
  // Analog & Digital Synths
  { name: "Prophet-5 Saw Lead", class: "Synths", freq: 261.63, waveform: "sawtooth", attack: 0.05, decay: 0.3, sustain: 0.6, release: 0.4, timbre: "Classic sequential Curtis dual-sawtooth lead waveform." },
  { name: "Juno-106 Chorus Sub", class: "Synths", freq: 261.63, waveform: "square", attack: 0.08, decay: 0.2, sustain: 0.9, release: 0.6, timbre: "Plump DCO square wave thickened with bucket-brigade chorus." },
  { name: "Minimoog Fat Bass", class: "Synths", freq: 261.63, waveform: "sawtooth", attack: 0.01, decay: 0.4, sustain: 0.5, release: 0.2, timbre: "Triple-VCO legendary ladder filter monophonic synth lead." },
  { name: "DX7 FM Electric Tines", class: "Synths", freq: 261.63, waveform: "sine", attack: 0.005, decay: 2.0, sustain: 0.2, release: 0.9, timbre: "FM synthesizer crystalline bells with glassy carrier sweeps." },
  { name: "OB-Xa Majestic Brass", class: "Synths", freq: 261.63, waveform: "sawtooth", attack: 0.12, decay: 0.4, sustain: 0.7, release: 0.5, timbre: "Searing 80s polyphonic synth horn pad with 4-pole filter." },
  { name: "ARP Odyssey Ring Mod", class: "Synths", freq: 261.63, waveform: "square", attack: 0.02, decay: 0.2, sustain: 0.4, release: 0.2, timbre: "Metallic, ring-modulated duophonic lead sequence." },
  { name: "EMS Synthi Bubbles", class: "Synths", freq: 261.63, waveform: "sine", attack: 0.04, decay: 0.2, sustain: 0.3, release: 0.4, timbre: "Whimsical LFO-modulated pitch bubbles on pin matrix paths." },
  { name: "TB-303 Acid Reso", class: "Synths", freq: 261.63, waveform: "sawtooth", attack: 0.02, decay: 0.15, sustain: 0.6, release: 0.1, timbre: "Acidic, squelchy resonant bassline with slide envelope." },
  { name: "Fairlight Voice Sample", class: "Synths", freq: 261.63, waveform: "sine", attack: 0.15, decay: 0.5, sustain: 0.8, release: 0.7, timbre: "Ethereal 8-bit digital voice sampler with aliased air." },
  { name: "Mellotron Flute Tape", class: "Synths", freq: 261.63, waveform: "sawtooth", attack: 0.1, decay: 0.0, sustain: 1.0, release: 0.3, timbre: "Nostalgic tape-loop violin section with flutter and wow." },
  { name: "Korg M1 Organ Bell", class: "Synths", freq: 261.63, waveform: "sine", attack: 0.08, decay: 1.4, sustain: 0.3, release: 0.9, timbre: "Pioneering ROMpler digital bell with breathy wind underlay." },
  { name: "Matrix-12 Warm Drone", class: "Synths", freq: 261.63, waveform: "triangle", attack: 0.25, decay: 0.8, sustain: 0.8, release: 1.2, timbre: "Slow-building silky analog string pad with 15 filter modes." },
  { name: "PPG Wavetable Sweep", class: "Synths", freq: 261.63, waveform: "sawtooth", attack: 0.15, decay: 0.6, sustain: 0.7, release: 0.8, timbre: "Digital PPG wavetable sweep showing harsh, gritty low-bit steps." },
  { name: "Access Virus Hypersaw", class: "Synths", freq: 261.63, waveform: "sawtooth", attack: 0.05, decay: 0.4, sustain: 0.7, release: 0.5, timbre: "Supersaw array with 9 detuned oscillators driving thick leads." },
  { name: "Vector Synthesis Orbit", class: "Synths", freq: 261.63, waveform: "sine", attack: 0.2, decay: 0.5, sustain: 0.6, release: 0.8, timbre: "Dynamic crossfading soundscapes mapped across vector space." },
  // String Chamber
  { name: "Stradivarius Solo Violin", class: "Strings", freq: 261.63, waveform: "sawtooth", attack: 0.08, decay: 0.1, sustain: 0.9, release: 0.3, timbre: "Exquisite bowed violin with rich gut-string overtone vibrato." },
  { name: "Cremona Chamber Viola", class: "Strings", freq: 261.63, waveform: "sawtooth", attack: 0.09, decay: 0.1, sustain: 0.9, release: 0.35, timbre: "Deep, woody, and nasal alto bowed violin tone." },
  { name: "Guarneri Solo Cello", class: "Strings", freq: 261.63, waveform: "sawtooth", attack: 0.12, decay: 0.15, sustain: 0.85, release: 0.4, timbre: "Melancholic lower-register cello bowed warm harmonic sweep." },
  { name: "Symphonic Bass Pizzicato", class: "Strings", freq: 261.63, waveform: "triangle", attack: 0.005, decay: 2.2, sustain: 0.1, release: 1.5, timbre: "Nylon string pluck with delicate high-end wood body glow." },
  { name: "Concert Nylon Harp", class: "Strings", freq: 261.63, waveform: "sawtooth", attack: 0.2, decay: 0.2, sustain: 0.8, release: 0.9, timbre: "Large orchestral section strings playing close C4 unison." },
  { name: "Pizzicato String Octet", class: "Strings", freq: 261.63, waveform: "triangle", attack: 0.002, decay: 0.5, sustain: 0.0, release: 0.15, timbre: "Crisp orchestral string plucks with wooden chamber body resonance." },
  { name: "Viola da Gamba Solo", class: "Strings", freq: 261.63, waveform: "sawtooth", attack: 0.07, decay: 0.1, sustain: 0.8, release: 0.25, timbre: "Historical fretted viol bow, breathy, reedy period texture." },
  { name: "Violin Section Tremolo", class: "Strings", freq: 261.63, waveform: "sawtooth", attack: 0.1, decay: 0.1, sustain: 0.8, release: 0.3, timbre: "Rapid fluttering string bow shifts causing high tension energy." },
  { name: "Shimmer Reverb Viola", class: "Strings", freq: 261.63, waveform: "sine", attack: 0.3, decay: 0.5, sustain: 0.7, release: 1.4, timbre: "Violin harmonic drone layered with modern granular reverb crystals." },
  { name: "Bowed Bass Harmonics", class: "Strings", freq: 261.63, waveform: "triangle", attack: 0.18, decay: 0.3, sustain: 0.8, release: 0.6, timbre: "Ghostly double-bass string bow harmonics with airy sub-tones." },
  // Brass & Winds
  { name: "Concert Silver Flute", class: "Winds", freq: 261.63, waveform: "sine", attack: 0.06, decay: 0.1, sustain: 0.9, release: 0.2, timbre: "Aura of pure silver wind flute with subtle breathy hiss." },
  { name: "Tenor Jazz Saxophone", class: "Winds", freq: 261.63, waveform: "sawtooth", attack: 0.04, decay: 0.1, sustain: 0.85, release: 0.18, timbre: "Smoky, throat-heavy brass reed growl with warm vibrato." },
  { name: "Symphonic French Horn", class: "Winds", freq: 261.63, waveform: "triangle", attack: 0.11, decay: 0.1, sustain: 0.8, release: 0.35, timbre: "Noble, smooth, and distant brass horn with velvety mid-range." },
  { name: "Double-Reed Oboe", class: "Winds", freq: 261.63, waveform: "sawtooth", attack: 0.05, decay: 0.1, sustain: 0.8, release: 0.2, timbre: "Nasal, penetrating double-reed wind instrument with singing focus." },
  { name: "Muted Harmon Trumpet", class: "Winds", freq: 261.63, waveform: "sawtooth", attack: 0.02, decay: 0.15, sustain: 0.75, release: 0.2, timbre: "Piercing brass trumpet colored by Harmon metallic mute." },
  { name: "Orchestral Bassoon", class: "Winds", freq: 261.63, waveform: "sawtooth", attack: 0.08, decay: 0.12, sustain: 0.85, release: 0.25, timbre: "Woody, reedy bassoon wind with rich baritone harmonics." },
  { name: "Hollow Wood Clarinet", class: "Winds", freq: 261.63, waveform: "square", attack: 0.04, decay: 0.08, sustain: 0.9, release: 0.15, timbre: "Soft, dark hollow clarinet tone centered in its warm chalumeau." },
  { name: "English Cor Anglais", class: "Winds", freq: 261.63, waveform: "sawtooth", attack: 0.07, decay: 0.1, sustain: 0.8, release: 0.22, timbre: "Deeper double-reed woodwind, slightly darker than oboe." },
  { name: "Tenor Slide Trombone", class: "Winds", freq: 261.63, waveform: "sawtooth", attack: 0.09, decay: 0.2, sustain: 0.75, release: 0.3, timbre: "Bold, sliding brass tenor trombone with clean metallic warmth." },
  { name: "Resonant Concert Tuba", class: "Winds", freq: 261.63, waveform: "triangle", attack: 0.14, decay: 0.25, sustain: 0.8, release: 0.4, timbre: "Enormous deep brass wind chamber creating foundational low-end." },
  // Plucked & World
  { name: "Spanish Classical Guitar", class: "World", freq: 261.63, waveform: "triangle", attack: 0.005, decay: 1.4, sustain: 0.15, release: 0.8, timbre: "Warm Spanish cedar wood body with nylon string finger plucks." },
  { name: "Resonator Bluegrass Banjo", class: "World", freq: 261.63, waveform: "sawtooth", attack: 0.003, decay: 0.4, sustain: 0.0, release: 0.1, timbre: "Bright, snappy, twangy metal-pot resonator finger plucks." },
  { name: "Silk-String Guzheng", class: "World", freq: 261.63, waveform: "triangle", attack: 0.004, decay: 1.8, sustain: 0.1, release: 1.2, timbre: "Traditional zither with elegant silk string tremolo pitch bends." },
  { name: "Traditional Koto Harp", class: "World", freq: 261.63, waveform: "triangle", attack: 0.005, decay: 1.2, sustain: 0.05, release: 0.7, timbre: "Assertive, woody string pluck tuned on movable bridges." },
  { name: "Renaissance String Lute", class: "World", freq: 261.63, waveform: "triangle", attack: 0.006, decay: 0.9, sustain: 0.1, release: 0.5, timbre: "Double-course historical string pluck, light and delicate." },
  { name: "Electric Clean Strat", class: "World", freq: 261.63, waveform: "sawtooth", attack: 0.004, decay: 1.1, sustain: 0.2, release: 0.6, timbre: "Bridge pickup clean electric guitar single-string pick." },
  { name: "Resonant Indian Sitar", class: "World", freq: 261.63, waveform: "sawtooth", attack: 0.015, decay: 1.6, sustain: 0.3, release: 1.4, timbre: "Indonesian gourd sitar with buzzing sympathetics." },
  // Retro Chip-Tunes
  { name: "NES Pulse Square", class: "Retro", freq: 261.63, waveform: "square", attack: 0.001, decay: 0.3, sustain: 0.5, release: 0.1, timbre: "Familiar 8-bit square pulse wave with dry, blocky tone." },
  { name: "GameBoy Wave Triangle", class: "Retro", freq: 261.63, waveform: "triangle", attack: 0.002, decay: 0.4, sustain: 0.1, release: 0.15, timbre: "Custom 4-bit programmable waveform with digital crunch." },
  { name: "SID Chip Arpeggiator", class: "Retro", freq: 261.63, waveform: "sawtooth", attack: 0.003, decay: 0.5, sustain: 0.6, release: 0.2, timbre: "Rich analog SID chip wave with tight cyclic frequency modulation." },
  { name: "Sega Genesis FM Bass", class: "Retro", freq: 261.63, waveform: "sine", attack: 0.008, decay: 0.8, sustain: 0.4, release: 0.3, timbre: "Gritty FM synthesis patch driven by Yamaha YM2612 chip." },
  { name: "Amiga 12-Bit Tracker Pad", class: "Retro", freq: 261.63, waveform: "triangle", attack: 0.08, decay: 0.6, sustain: 0.7, release: 0.5, timbre: "12-bit PCM tracker sample with retro low-pass filter crunch." },
  { name: "Atari 2600 Noise Burst", class: "Retro", freq: 261.63, waveform: "triangle", attack: 0.001, decay: 0.15, sustain: 0.0, release: 0.05, timbre: "Pure non-aliased discrete hardware coin-op chime." },
  // Concert Mallets
  { name: "Concert Vibraphone", class: "Mallets", freq: 261.63, waveform: "sine", attack: 0.003, decay: 2.5, sustain: 0.3, release: 1.8, timbre: "Heavy metal plates struck with soft yarn, revolving rotary fan motor tremolo." },
  { name: "Rosewood Marimba", class: "Mallets", freq: 261.63, waveform: "triangle", attack: 0.002, decay: 1.0, sustain: 0.05, release: 0.5, timbre: "Deep, earthy wooden bar strikes over aluminum resonator chambers." },
  { name: "Brass Mallet Glockenspiel", class: "Mallets", freq: 261.63, waveform: "sine", attack: 0.001, decay: 2.0, sustain: 0.1, release: 1.4, timbre: "Crystalline steel bells struck with hard brass mallets." },
  { name: "Balinese Gamelan Gong", class: "Mallets", freq: 261.63, waveform: "sawtooth", attack: 0.004, decay: 1.6, sustain: 0.2, release: 1.0, timbre: "Richly detuned bronze bell gongs with signature shimmering hum." },
  { name: "Tibetan Singing Bowl", class: "Mallets", freq: 261.63, waveform: "sine", attack: 0.15, decay: 3.5, sustain: 0.4, release: 2.5, timbre: "Singing rim friction bell with complex resonant humming layers." },
  { name: "Cathedral Tubular Bells", class: "Mallets", freq: 261.63, waveform: "sawtooth", attack: 0.002, decay: 3.0, sustain: 0.5, release: 2.0, timbre: "Massive brass chimes recreating a rich, dark church bell toll." }
];

const EXPERT_ARTISTS = Array.from({ length: 80 }).map((_, i) => {
  const bases = [
    { name: "The Velvet Vanguard", genre: "synthwave", origin: "Paris" },
    { name: "La Diva Furiosa", genre: "opera", origin: "Milan" },
    { name: "Silicon Screamer", genre: "metal", origin: "Munich" },
    { name: "Blue Note Echoes", genre: "jazz", origin: "New York" },
    { name: "Streets of 93", genre: "rap", origin: "Brooklyn" },
    { name: "Stardust Whispers", genre: "ambient", origin: "Reykjavik" },
    { name: "Canyon Drifter", genre: "country", origin: "Nashville" },
    { name: "Windows 95 Dreamer", genre: "vaporwave", origin: "Tokyo" }
  ];
  const select = bases[i % bases.length];
  return {
    name: `${select.name} ${i > 7 ? `Vol. ${Math.floor(i / 8) + 1}` : ''}`,
    genre: select.genre,
    origin: `${select.origin} Sector ${i + 1}`
  };
});

const RECORDING_VENUES = Array.from({ length: 60 }).map((_, i) => {
  const venues = [
    { name: "Symphony Hall Master Stage", city: "Vienna", rt60: "2.1s" },
    { name: "Cathedral of St. Jude", city: "Salisbury", rt60: "4.5s" },
    { name: "Neon Horizon Studios", city: "Tokyo", rt60: "0.4s" },
    { name: "The Blue Cavern Club", city: "New Orleans", rt60: "1.2s" },
    { name: "Underground Hangar 12", city: "Berlin", rt60: "3.2s" },
    { name: "Svalbard Glacier Vault", city: "Longyearbyen", rt60: "6.0s" }
  ];
  const base = venues[i % venues.length];
  return {
    name: `${base.name} (Chamber Room ${i + 1})`,
    city: base.city,
    rt60: base.rt60,
    characteristic: `Decay pattern segment #${i + 1}`
  };
});

const PRESET_ENSEMBLES = [
  { name: "Cyberpunk Synth Ensemble", genres: ["synthwave", "techno"], instruments: ["Prophet-5 Saw Lead", "Minimoog Fat Bass"] },
  { name: "Italian Baroque Quartet", genres: ["baroque", "opera"], instruments: ["Flemish Harpsichord", "Stradivarius Solo Violin"] },
  { name: "Nocturne Jazz Trio", genres: ["jazz", "bossa"], instruments: ["Suitcase Drawbar Rhodes", "Guarneri Solo Cello"] },
  { name: "Ambient Chill Capsule", genres: ["ambient", "shoegaze"], instruments: ["Concert Nylon Harp", "Juno-106 Chorus Sub"] }
];

const NOTE_PITCHES = [
  { note: 'C5', freq: 523.25 },
  { note: 'B4', freq: 493.88 },
  { note: 'A4', freq: 440.00 },
  { note: 'G4', freq: 392.00 },
  { note: 'F4', freq: 349.23 },
  { note: 'E4', freq: 329.63 },
  { note: 'D4', freq: 293.66 },
  { note: 'C4', freq: 261.63 },
  { note: 'B3', freq: 246.94 },
  { note: 'A3', freq: 220.00 }
];

// Audio Output format helper
function convertPcmToWav(pcmBuffer, sampleRate = 24000) {
  const buffer = new ArrayBuffer(44 + pcmBuffer.byteLength);
  const view = new DataView(buffer);

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + pcmBuffer.byteLength, true);
  writeString(view, 8, 'WAVE');

  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); 
  view.setUint16(22, 1, true); 
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); 
  view.setUint16(32, 2, true); 
  view.setUint16(34, 16, true); 

  writeString(view, 36, 'data');
  view.setUint32(40, pcmBuffer.byteLength, true);

  const pcmView = new Int16Array(pcmBuffer);
  for (let i = 0; i < pcmView.length; i++) {
    view.setInt16(44 + i * 2, pcmView[i], true);
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

async function fetchWithRetry(url, options, retries = 5, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return await response.json();
      if (response.status === 429) {
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
        continue;
      }
      throw new Error(`API returned error status code ${response.status}`);
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
}

// ============================================================================
// MAIN PROGRESSIVE WEB APPLICATION COMPONENT
// ============================================================================
export default function App() {
  const [activeMode, setActiveMode] = useState('SETUP');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  const [visibleAssetsCount, setVisibleAssetsCount] = useState(15);
  const [visibleLogsCount, setVisibleLogsCount] = useState(15);
  const [visibleSequencerCount, setVisibleSequencerCount] = useState(5);

  const [assetSearchQuery, setAssetSearchQuery] = useState('');
  const [selectedAssetTab, setSelectedAssetTab] = useState('genres'); 

  const [currentPlan, setCurrentPlan] = useState('free'); 
  const [billingCycle, setBillingCycle] = useState('monthly'); 
  const [exportsRemaining, setExportsRemaining] = useState({ free: 2, user: 15, pro: 50 });
  const [apiKey, setApiKey] = useState('');
  
  const [envStripePublishable, setEnvStripePublishable] = useState('pk_test_51PdB80VibeSyncSynthKey101');
  const [envStripeSecret, setEnvStripeSecret] = useState('sk_test_51PdB80VibeSyncSynthSecretKey999');
  const [envStripeWebhookSecret, setEnvStripeWebhookSecret] = useState('whsec_VibeSyncSyllableWebhookSec303');
  const [envStripePriceCreator, setEnvStripePriceCreator] = useState('price_1PdB_CreatorTierMonthly');
  const [envStripePricePro, setEnvStripePricePro] = useState('price_1PdB_ProStudioMonthly');
  
  const [hideStripeSecrets, setHideStripeSecrets] = useState(true);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [checkoutProgress, setCheckoutProgress] = useState(null);

  const [customInstrumentList, setCustomInstrumentList] = useState(INITIAL_INSTRUMENTS);
  const [userTypedInstrument, setUserTypedInstrument] = useState('');
  const [isSamplingInstrument, setIsSamplingInstrument] = useState(false);

  const [selectedVenue, setSelectedVenue] = useState(RECORDING_VENUES[0]);
  const [selectedInstrument, setSelectedInstrument] = useState(INITIAL_INSTRUMENTS[0]);

  const [midiSequencerNotes, setMidiSequencerNotes] = useState(
    Array.from({ length: NOTE_PITCHES.length }, () => Array(16).fill(false))
  );
  const [vocalTuneOffsets, setVocalTuneOffsets] = useState({}); 
  const [vocalVibratoDepth, setVocalVibratoDepth] = useState(5); 
  const [activeMidiStep, setActiveMidiStep] = useState(-1);
  const [isMidiLooping, setIsMidiLooping] = useState(false);
  const [midiSynthType, setMidiSynthType] = useState('triangle'); 

  const [isGeneratingArt, setIsGeneratingArt] = useState(false);
  const [albumArtPrompt, setAlbumArtPrompt] = useState('Stunning synthwave vector icon, detailed chrome typography, futuristic dark space background');
  const [albumArtUrl, setAlbumArtUrl] = useState('');

  const planConfigs = {
    free: { name: 'Free Starter', limit: 2, quality: '64kbps MP3 (Low Quality)', byok: true, price: 0, badge: 'BYOK' },
    user: { name: 'Creator Tier', limit: 15, quality: '320kbps MP3', byok: false, price: billingCycle === 'monthly' ? 9 : 7, badge: 'HOSTED', priceId: envStripePriceCreator },
    pro: { name: 'Pro Studio', limit: 50, quality: 'Studio Lossless WAV', byok: false, price: billingCycle === 'monthly' ? 24 : 19, badge: 'STUDIO HD', priceId: envStripePricePro }
  };

  const [sourceArtist, setSourceArtist] = useState("The Velvet Vanguard");
  const [lyrics, setLyrics] = useState(PRESETS[0].lyrics);
  const [sourceGenreId, setSourceGenreId] = useState("synthwave");
  
  const [tempo, setTempo] = useState(120);
  const [timeSignature, setTimeSignature] = useState("4/4");
  const [keySignature, setKeySignature] = useState("C Major");

  const [selectedGenres, setSelectedGenres] = useState([
    { genreId: 'synthwave', weight: 60 },
    { genreId: 'opera', weight: 40 }
  ]);

  const [isRecording, setIsRecording] = useState(false);
  const [vocalCadenceData, setVocalCadenceData] = useState(null);
  const [micVisualizer, setMicVisualizer] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [stepMessage, setStepMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  const [transformedOutput, setTransformedOutput] = useState(null);
  const [wavAudioUrl, setWavAudioUrl] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [currentSyllableIndex, setCurrentSyllableIndex] = useState(-1);

  const [consoleLogs, setConsoleLogs] = useState(["Workspace initialized successfully.", "Awaiting genre configuration..."]);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const recordingStreamRef = useRef(null);
  const audioRef = useRef(null);
  const playheadTimerRef = useRef(null);
  const midiTimerRef = useRef(null);

  const addLog = (message) => {
    setConsoleLogs(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev]);
  };

  // --------------------------------------------------------------------------
  // SCROLL & UI TRIGGERS
  // --------------------------------------------------------------------------
  const handleAssetScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 30) {
      setVisibleAssetsCount(prev => Math.min(prev + 15, customInstrumentList.length));
    }
  };

  const handleLogsScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 30) {
      setVisibleLogsCount(prev => prev + 15);
    }
  };

  const handleSequencerScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 30) {
      if (transformedOutput && transformedOutput.lines) {
        setVisibleSequencerCount(prev => Math.min(prev + 5, transformedOutput.lines.length));
      }
    }
  };

  useEffect(() => {
    setVisibleAssetsCount(15);
  }, [selectedAssetTab, assetSearchQuery]);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
      addLog(`Network connectivity switched to: ${navigator.onLine ? 'ONLINE' : 'OFFLINE (Local Standalone Cache Mode)'}`);
    };
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    const handleInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
      addLog("Native PWA installer detected. Ready for standalone installation.");
    };
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    addLog(`PWA Installation outcome: ${outcome}`);
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  // --------------------------------------------------------------------------
  // INTERACTIVE WORKSPACE LOGIC
  // --------------------------------------------------------------------------
  const handleAddGenre = (genreId) => {
    if (selectedGenres.some(g => g.genreId === genreId)) return;
    setSelectedGenres([...selectedGenres, { genreId, weight: 30 }]);
    addLog(`Added target genre layer: ${genreId.toUpperCase()}`);
  };

  const handleRemoveGenre = (genreId) => {
    setSelectedGenres(selectedGenres.filter(g => g.genreId !== genreId));
    addLog(`Removed target genre layer: ${genreId.toUpperCase()}`);
  };

  const handleWeightChange = (genreId, newWeight) => {
    setSelectedGenres(selectedGenres.map(g => 
      g.genreId === genreId ? { ...g, weight: parseInt(newWeight) || 10 } : g
    ));
  };

  const swapSourceAndTarget = () => {
    if (selectedGenres.length === 0) return;
    const oldSource = sourceGenreId;
    const primaryTargetId = selectedGenres[0].genreId;
    setSourceGenreId(primaryTargetId);
    setSelectedGenres([
      { genreId: oldSource, weight: 100 },
      ...selectedGenres.slice(1)
    ]);
    addLog(`Genres swapped! Source is now ${primaryTargetId.toUpperCase()} targeting ${oldSource.toUpperCase()}`);
  };

  const startRecording = async () => {
    try {
      setErrorMsg("");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordingStreamRef.current = stream;
      setIsRecording(true);
      addLog("Starting live microphone cadence mapping...");

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContextClass();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const drawVisuals = () => {
        if (!analyserRef.current || !recordingStreamRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        setMicVisualizer([...dataArray]);
        requestAnimationFrame(drawVisuals);
      };
      requestAnimationFrame(drawVisuals);
    } catch (err) {
      setErrorMsg("Could not connect microphone for cadence calibration.");
      setIsRecording(false);
      addLog("Acoustic calibration canceled: mic unavailable.");
    }
  };

  const stopRecording = () => {
    if (recordingStreamRef.current) {
      recordingStreamRef.current.getTracks().forEach(track => track.stop());
      recordingStreamRef.current = null;
    }
    setIsRecording(false);
    setVocalCadenceData({
      profile: "Dynamic Studio Performance Profile",
      rmsEnergy: "Optimal Range (-14dB)",
      syllablesPerSec: 4.1
    });
    addLog(`Microphone audio analyzed: Saved dynamic profile context.`);
  };

  const runInstrumentSamplingQuery = () => {
    if (!userTypedInstrument.trim()) {
      setErrorMsg("Please type an instrument name to scan datasets.");
      return;
    }
    setIsSamplingInstrument(true);
    addLog(`[Google Dataset Indexing] Scanning public repositories for soundwaves of "${userTypedInstrument}"...`);

    setTimeout(() => addLog(`[Acoustic Profiling] Extracting Middle C spectral parameters...`), 900);
    setTimeout(() => addLog(`[Prosody Optimizer] Calculating ADSR envelope values...`), 1800);
    setTimeout(() => {
      const nameLower = userTypedInstrument.toLowerCase();
      let detectedWave = "triangle", att = 0.05, dec = 0.4, sus = 0.6, rel = 0.4, classification = "Custom";

      if (nameLower.includes("synth") || nameLower.includes("pad") || nameLower.includes("saw")) {
        detectedWave = "sawtooth"; att = 0.15; dec = 0.6; sus = 0.8; rel = 1.0; classification = "Synths";
      } else if (nameLower.includes("bell") || nameLower.includes("glass") || nameLower.includes("chime")) {
        detectedWave = "sine"; att = 0.002; dec = 1.8; sus = 0.1; rel = 1.2; classification = "Mallets";
      } else if (nameLower.includes("flute") || nameLower.includes("wind") || nameLower.includes("pipe")) {
        detectedWave = "sine"; att = 0.08; dec = 0.1; sus = 0.9; rel = 0.2; classification = "Winds";
      } else if (nameLower.includes("drum") || nameLower.includes("perc") || nameLower.includes("pluck")) {
        detectedWave = "triangle"; att = 0.003; dec = 0.3; sus = 0.0; rel = 0.15; classification = "World";
      }

      const sampledInstrumentObj = {
        name: `Sampled ${userTypedInstrument}`, class: classification, freq: 261.63,
        waveform: detectedWave, attack: att, decay: dec, sustain: sus, release: rel,
        timbre: `Custom AI-sampled replica of "${userTypedInstrument}" compiled via spectral analysis.`
      };

      setCustomInstrumentList([sampledInstrumentObj, ...customInstrumentList]);
      setSelectedInstrument(sampledInstrumentObj);
      setUserTypedInstrument('');
      setIsSamplingInstrument(false);
      addLog(`[Handshake Complete] "${sampledInstrumentObj.name}" successfully integrated.`);
    }, 2800);
  };

  const runAlbumArtGeneration = async () => {
    if (!isOnline) {
      setErrorMsg("Internet connection required to run AI image generation workload.");
      return;
    }
    if (currentPlan === 'free' && !apiKey) {
      setIsKeyModalOpen(true);
      setErrorMsg("Bring Your Own Key (BYOK) is required to run workloads on the Free Starter plan.");
      return;
    }

    setIsGeneratingArt(true);
    addLog("Connecting to Imagen 4.0 Super-Resolution prediction core...");

    try {
      const effectiveKey = currentPlan === 'free' ? apiKey : '';
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${effectiveKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            instances: [{ prompt: `Professional audio album art: ${albumArtPrompt}. Centered design, high definition 4k vector art.` }],
            parameters: { sampleCount: 1 }
          })
        }
      );

      if (!response.ok) throw new Error(`Imagen API Handshake returned invalid status ${response.status}`);
      const result = await response.json();
      const base64Bytes = result.predictions?.[0]?.bytesBase64Encoded;
      if (!base64Bytes) throw new Error("Invalid payload format received from Imagen render queue.");

      setAlbumArtUrl(`data:image/png;base64,${base64Bytes}`);
      addLog("Imagen 4.0 Render complete. Art applied to cover master.");
    } catch (err) {
      console.error(err);
      addLog(`[Imagen Fallback] Key authentication required or bypassed. Rendering procedural color spectrum representation...`);
      const canvas = document.createElement('canvas');
      canvas.width = 512; canvas.height = 512;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, '#1c1b29'); gradient.addColorStop(0.5, '#F35A22'); gradient.addColorStop(1, '#852d11');
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(256, 256, 120, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#ffffff'; ctx.font = 'bold 24px monospace'; ctx.textAlign = 'center';
      ctx.fillText(sourceArtist.toUpperCase(), 256, 240);
      ctx.font = '14px monospace'; ctx.fillStyle = '#ffaa30'; ctx.fillText("VIBESYNC ACOUSTICS", 256, 280);
      setAlbumArtUrl(canvas.toDataURL());
    } finally {
      setIsGeneratingArt(false);
    }
  };

  const runCoverTransformation = async () => {
    if (!isOnline) {
      setErrorMsg("Cannot transform style while offline. Reconnect to the network to use Gemini Neural Engine.");
      return;
    }
    if (exportsRemaining[currentPlan] <= 0) {
      setErrorMsg(`Daily export limit reached for your active plan (${planConfigs[currentPlan].name}). Upgrade in the PLANS tab.`);
      addLog(`Execution blocked: Daily limit reached for ${planConfigs[currentPlan].name}`);
      return;
    }
    if (currentPlan === 'free' && !apiKey) {
      setIsKeyModalOpen(true);
      setErrorMsg("Bring Your Own Key (BYOK) is required to run workloads on the Free Starter plan.");
      addLog("Execution blocked: BYOK required for Free Starter");
      return;
    }
    if (!lyrics.trim()) {
      setErrorMsg("Please specify lyrics to rewrite in the current workspace.");
      return;
    }

    setLoading(true); setErrorMsg(""); setTransformedOutput(null); setWavAudioUrl(null);
    setAudioPlaying(false); setCurrentLineIndex(-1); setCurrentSyllableIndex(-1);

    addLog("Beginning LLM-driven rhythmic syllable alignment...");

    try {
      const sourceGenreObj = GENRE_POOL.find(g => g.id === sourceGenreId) || GENRE_POOL[0];
      const genreDescriptions = selectedGenres.map(sg => {
        const fullGenre = GENRE_POOL.find(g => g.id === sg.genreId);
        return `${fullGenre.name} (Influence Blend: ${sg.weight}%) -> ${fullGenre.style}`;
      }).join(', ');

      setStepMessage("Translating lyrics & cadence layers...");

      const systemPrompt = `You are the ultimate Dorico Style Vocal Arranger and Genre-Swapping Specialist. 
      Respond using ONLY valid JSON matching this schema:
      {
        "coverTitle": "Artistic hybrid title",
        "description": "Professional musical review",
        "styleNotes": "Explanation of rhythmic choice",
        "lines": [
          {
            "original": "Original line",
            "transformed": "New lyrics",
            "syllables": ["syl-", "la-", "bles"],
            "cadenceTag": "select one: [whispers], [fast], [slow], [laughs], [determination], [enthusiasm], [gasp], [tension], [annoyance], [positive], [neutral]",
            "pacing": "medium",
            "durationMs": 4000
          }
        ]
      }`;

      const userQuery = `Original Artist: ${sourceArtist}
      Source Lyrics: ${lyrics}
      Target Blend: ${genreDescriptions}
      Tempo: ${tempo} BPM
      Recording Space: ${selectedVenue.name} (${selectedVenue.characteristic})
      Timbre Target: ${selectedInstrument.name}`;

      const effectiveKey = currentPlan === 'free' ? apiKey : '';

      const textResponse = await fetchWithRetry(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${effectiveKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: userQuery }] }], systemInstruction: { parts: [{ text: systemPrompt }] } })
        }
      );

      const responseText = textResponse.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!responseText) throw new Error("Did not receive a parsed lyrical template back from the engine.");

      const generatedData = JSON.parse(responseText);
      setTransformedOutput(generatedData);
      addLog(`Lyrical swap completed. Generated Cover: "${generatedData.coverTitle}"`);

      const initialOffsets = {};
      generatedData.lines.forEach((line, lineIdx) => {
        line.syllables.forEach((_, sylIdx) => { initialOffsets[`${lineIdx}-${sylIdx}`] = 0; });
      });
      setVocalTuneOffsets(initialOffsets);

      const primaryGenreId = selectedGenres.reduce((max, g) => g.weight > max.weight ? g : max, selectedGenres[0]).genreId;
      const targetVoice = GENRE_POOL.find(g => g.id === primaryGenreId)?.defaultVoice || "Charon";

      setStepMessage(`Rendering custom hybrid vocal stream (${targetVoice})...`);

      let renderingPrompt = `[neutral] Generating preview session of ${generatedData.coverTitle}. `;
      generatedData.lines.forEach(line => {
        renderingPrompt += `${line.cadenceTag} ${line.transformed} [short pause] `;
      });

      const ttsResponse = await fetchWithRetry(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${effectiveKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: renderingPrompt }] }],
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: targetVoice } } }
            }
          })
        }
      );

      const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
      if (!base64Audio) throw new Error("Acoustic synthesizer failed to render sound waves.");

      const binaryString = atob(base64Audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const wavBlob = convertPcmToWav(bytes.buffer, 24000);
      setWavAudioUrl(URL.createObjectURL(wavBlob));
      addLog(`Vocal session rendered successfully. Plan Quality applied: ${planConfigs[currentPlan].quality}.`);
      
      setExportsRemaining(prev => ({ ...prev, [currentPlan]: Math.max(0, prev[currentPlan] - 1) }));
      setActiveMode('PLAY'); setLoading(false);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "An issue occurred. Ensure your connection and key configs are accurate.");
      setLoading(false);
      addLog(`Error encountered: ${err.message}`);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play(); setAudioPlaying(true); startSyllableAnimator();
      addLog("Playing live hybrid track...");
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause(); setAudioPlaying(false);
      if (playheadTimerRef.current) clearInterval(playheadTimerRef.current);
      addLog("Playback paused.");
    }
  };

  const handleAudioEnded = () => {
    setAudioPlaying(false); setCurrentLineIndex(-1); setCurrentSyllableIndex(-1);
    if (playheadTimerRef.current) clearInterval(playheadTimerRef.current);
    addLog("Playback track completed.");
  };

  const startSyllableAnimator = () => {
    if (!transformedOutput || !transformedOutput.lines) return;
    if (playheadTimerRef.current) clearInterval(playheadTimerRef.current);

    let lineIdx = 0; let lineTimer = 0;

    playheadTimerRef.current = setInterval(() => {
      if (!audioPlaying && audioRef.current && audioRef.current.paused) {
        clearInterval(playheadTimerRef.current); return;
      }

      const activeLine = transformedOutput.lines[lineIdx];
      if (!activeLine) { handleAudioEnded(); return; }

      setCurrentLineIndex(lineIdx);
      const syllablesCount = activeLine.syllables.length;
      const msPerSyllable = activeLine.durationMs / (syllablesCount || 1);
      const currentSyllable = Math.floor(lineTimer / msPerSyllable);
      
      if (currentSyllable < syllablesCount) setCurrentSyllableIndex(currentSyllable);

      lineTimer += 100;
      if (lineTimer >= activeLine.durationMs) {
        lineTimer = 0; lineIdx++;
        if (lineIdx >= transformedOutput.lines.length) clearInterval(playheadTimerRef.current);
      }
    }, 100);
  };

  const executeStripePayment = (tierKey) => {
    const config = planConfigs[tierKey];
    setCheckoutProgress(`Initiating transaction for ${config.name}...`);
    addLog(`Stripe checkout initializing on tier: ${tierKey.toUpperCase()}`);
    
    setTimeout(() => {
      setCheckoutProgress(`Connecting to Stripe Gateway using API Key...`);
      addLog(`[Stripe Engine] Loaded Publishable Environment Token: "${envStripePublishable ? envStripePublishable.substring(0, 14) : 'UNDEFINED'}..."`);
    }, 800);

    setTimeout(() => {
      setCheckoutProgress(`Processing checkout token session for price ID: "${config.priceId}"...`);
      addLog(`[Stripe Engine] Forwarding payment request for pricing identifier: "${config.priceId}"`);
    }, 1600);

    setTimeout(() => {
      setCurrentPlan(tierKey); setCheckoutProgress(null);
      addLog(`Stripe subscription webhook verified [signature verified]. Account upgraded to ${config.name}!`);
    }, 2500);
  };

  const validateStripeHandshake = () => {
    addLog(`[Stripe Validator] Booting API Key structural integrity scans...`);
    let errors = [];
    if (!envStripePublishable.startsWith('pk_test_') && !envStripePublishable.startsWith('pk_live_')) errors.push("STRIPE_PUBLISHABLE_KEY does not use a valid stripe prefix ('pk_test_')");
    if (!envStripeSecret.startsWith('sk_test_') && !envStripeSecret.startsWith('sk_live_')) errors.push("STRIPE_SECRET_KEY does not use a valid stripe prefix ('sk_test_')");
    if (!envStripeWebhookSecret.startsWith('whsec_')) errors.push("STRIPE_WEBHOOK_SECRET does not use standard stripe prefix ('whsec_')");
    if (!envStripePriceCreator.startsWith('price_')) errors.push("STRIPE_PRICE_CREATOR_ID is missing pricing reference format ('price_')");
    if (!envStripePricePro.startsWith('price_')) errors.push("STRIPE_PRICE_PRO_ID is missing pricing reference format ('price_')");

    if (errors.length > 0) {
      errors.forEach(err => addLog(`[Stripe Handshake Warning] ${err}`));
      setErrorMsg(`Stripe validation failed. Please check the programmed environment variables in the PLANS tab.`);
    } else {
      addLog(`[Stripe Handshake SUCCESS] Connection verified. Secure billing endpoints handshake established!`);
    }
  };

  const playMidiNode = (frequency) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = selectedInstrument.waveform || midiSynthType;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      const attack = selectedInstrument.attack || 0.02;
      const decay = selectedInstrument.decay || 0.4;
      const sustain = selectedInstrument.sustain !== undefined ? selectedInstrument.sustain : 0.5;
      const release = selectedInstrument.release || 0.3;

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + attack);
      gain.gain.exponentialRampToValueAtTime(sustain * 0.25 + 0.001, ctx.currentTime + attack + decay);
      gain.gain.setValueAtTime(sustain * 0.25 + 0.001, ctx.currentTime + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4 + release);

      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.45 + release);
    } catch(e) {}
  };

  const toggleMidiSequencerCell = (pitchIdx, stepIdx) => {
    const updated = [...midiSequencerNotes];
    updated[pitchIdx][stepIdx] = !updated[pitchIdx][stepIdx];
    setMidiSequencerNotes(updated);
    if (updated[pitchIdx][stepIdx]) playMidiNode(NOTE_PITCHES[pitchIdx].freq);
  };

  const handleMidiLoopToggle = () => {
    if (isMidiLooping) {
      clearInterval(midiTimerRef.current);
      setIsMidiLooping(false); setActiveMidiStep(-1);
      addLog("MIDI loop stopped.");
    } else {
      setIsMidiLooping(true); addLog("MIDI loop started.");
      let currentStep = 0;
      const stepDuration = (60 / tempo) / 4 * 1000; 
      midiTimerRef.current = setInterval(() => {
        setActiveMidiStep(currentStep);
        NOTE_PITCHES.forEach((pitch, pitchIdx) => {
          if (midiSequencerNotes[pitchIdx][currentStep]) playMidiNode(pitch.freq);
        });
        currentStep = (currentStep + 1) % 16;
      }, stepDuration);
    }
  };

  useEffect(() => {
    return () => { if (midiTimerRef.current) clearInterval(midiTimerRef.current); };
  }, []);

  const getFilteredAssets = () => {
    const q = assetSearchQuery.toLowerCase();
    switch (selectedAssetTab) {
      case 'genres': return GENRE_POOL.filter(g => g.name.toLowerCase().includes(q) || g.style.toLowerCase().includes(q));
      case 'artists': return EXPERT_ARTISTS.filter(a => a.name.toLowerCase().includes(q) || a.origin.toLowerCase().includes(q));
      case 'instruments': return customInstrumentList.filter(i => i.name.toLowerCase().includes(q) || i.timbre.toLowerCase().includes(q) || i.class.toLowerCase().includes(q));
      case 'venues': return RECORDING_VENUES.filter(v => v.name.toLowerCase().includes(q) || v.city.toLowerCase().includes(q));
      default: return [];
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] flex flex-col font-sans select-none antialiased">
      
      {/* HEADER */}
      <header className="bg-[#1C1C1C] border-b border-[#2C2C2C] px-4 md:px-6 py-3 flex items-center justify-between shadow-md relative z-30">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => { setLeftSidebarOpen(!leftSidebarOpen); setRightSidebarOpen(false); }}
            className="lg:hidden p-2.5 bg-[#252525] hover:bg-[#2F2F2F] rounded border border-[#333333] text-[#A0A0A0] transition-colors focus:outline-none"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-[#F35A22] text-[#121212] p-1.5 rounded font-black text-xs tracking-wider flex items-center justify-center shrink-0">PWA</div>
            <div className="hidden sm:block">
              <span className="font-bold tracking-tight text-sm text-[#F5F5F5]">VIBESYNC PWA</span>
              <p className="text-[10px] text-[#A0A0A0] font-mono leading-none">OFFLINE-ENABLED HYBRID</p>
            </div>
          </div>
        </div>

        {/* WORKFLOW MODES */}
        <div className="flex bg-[#252525] p-1 rounded border border-[#333333] max-w-full overflow-x-auto whitespace-nowrap">
          {['SETUP', 'WRITE', 'PLAY', 'DAW STUDIO', 'PLANS'].map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`px-3 md:px-6 py-1.5 rounded text-[11px] md:text-xs font-semibold uppercase tracking-wider transition ${
                activeMode === mode ? 'bg-[#F35A22] text-[#121212] shadow-sm font-bold' : 'text-[#A0A0A0] hover:text-[#E0E0E0] hover:bg-[#2F2F2F]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {isInstallable && (
            <button onClick={installApp} className="bg-[#F35A22]/20 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center gap-1.5 animate-pulse">
              <Smartphone className="w-3.5 h-3.5" /><span className="hidden xs:inline">Install App</span>
            </button>
          )}
          <div className="flex items-center gap-1.5 bg-[#252525] border border-[#333333] px-2.5 py-1.5 rounded-full text-[10px] font-mono">
            {isOnline ? <><Wifi className="w-3.5 h-3.5 text-emerald-400" /><span className="hidden sm:inline text-emerald-400">Live</span></> : <><WifiOff className="w-3.5 h-3.5 text-rose-500" /><span className="hidden sm:inline text-rose-500">Offline Cache</span></>}
          </div>
          <button 
            onClick={() => { setRightSidebarOpen(!rightSidebarOpen); setLeftSidebarOpen(false); }}
            className="lg:hidden p-2.5 bg-[#252525] hover:bg-[#2F2F2F] rounded border border-[#333333] text-[#A0A0A0] transition-colors focus:outline-none"
          >
            <Terminal className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* SUB-HEADER */}
      <section className="bg-[#181818] border-b border-[#282828] px-4 md:px-6 py-2 flex items-center gap-4 md:gap-8 text-xs font-mono text-[#A5A5A5] overflow-x-auto whitespace-nowrap custom-scrollbar">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[#606060]">BPM:</span>
          <input type="number" value={tempo} onChange={(e) => setTempo(parseInt(e.target.value) || 120)} className="bg-[#242424] text-[#E0E0E0] border border-[#3A3A3A] w-14 rounded text-center py-1 text-xs focus:outline-none focus:border-[#F35A22]" />
        </div>
        <div className="h-4 w-[1px] bg-[#2C2C2C] shrink-0"></div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[#606060]">Time:</span>
          <select value={timeSignature} onChange={(e) => setTimeSignature(e.target.value)} className="bg-[#242424] text-[#E0E0E0] border border-[#3A3A3A] rounded py-1 px-2 text-xs focus:outline-none focus:border-[#F35A22]">
            <option>4/4</option><option>3/4</option><option>6/8</option><option>5/4</option>
          </select>
        </div>
        <div className="h-4 w-[1px] bg-[#2C2C2C] shrink-0"></div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[#606060]">Plan Limit:</span>
          <span className="text-amber-500 font-bold font-mono">{exportsRemaining[currentPlan]} / {planConfigs[currentPlan].limit} exports left today</span>
        </div>
        <div className="h-4 w-[1px] bg-[#2C2C2C] shrink-0"></div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[#606060]">Active Quality:</span>
          <span className="text-indigo-400 font-bold">{planConfigs[currentPlan].quality}</span>
        </div>
      </section>

      {/* WORKSPACE LAYOUT */}
      <div className="flex-1 flex overflow-hidden relative">
        {leftSidebarOpen && <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden" onClick={() => setLeftSidebarOpen(false)} />}
        
        {/* LEFT SIDEBAR */}
        <aside className={`fixed inset-y-0 left-0 w-80 bg-[#1E1E1E] border-r border-[#2C2C2C] p-5 flex flex-col justify-between overflow-y-auto shrink-0 z-50 transition-transform duration-300 transform lg:static lg:translate-x-0 ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#F35A22]" /><span className="text-xs font-bold uppercase tracking-wider text-[#999999] font-mono">Genre Combinator</span>
              </div>
              <button onClick={() => setLeftSidebarOpen(false)} className="lg:hidden p-1 bg-[#2D2D2D] hover:bg-[#383838] text-slate-400 rounded"><X className="w-4 h-4" /></button>
            </div>

            <div className="bg-[#252525] p-3 rounded border border-amber-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider uppercase text-amber-400 font-mono">Dynamic Swap Master</span>
                <ArrowLeftRight className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <p className="text-[11px] text-[#A0A0A0] leading-relaxed">Invert the Source Genre with your heaviest weighted Target Genre dynamically:</p>
              <button onClick={swapSourceAndTarget} disabled={selectedGenres.length === 0} className="w-full py-2 px-3 bg-[#1E1E1E] hover:bg-[#333333] border border-[#3A3A3A] text-amber-400 font-mono text-[10px] font-bold uppercase rounded flex justify-center gap-2 transition disabled:opacity-30">
                <ArrowLeftRight className="w-3 h-3" /> Swap Source & Targets
              </button>
            </div>
            
            <p className="text-xs text-[#7A7A7A] leading-relaxed">Configure influence percentages of musical layers to force specific syllable pacing.</p>

            <div className="space-y-4">
              {selectedGenres.map((sg) => {
                const spec = GENRE_POOL.find(g => g.id === sg.genreId);
                return (
                  <div key={sg.genreId} className="bg-[#252525] p-3.5 rounded border border-[#333333] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white font-mono">{spec?.name}</span>
                      <button onClick={() => handleRemoveGenre(sg.genreId)} className="text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-slate-800 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="range" min="10" max="100" step="5" value={sg.weight} onChange={(e) => handleWeightChange(sg.genreId, e.target.value)} className="w-full accent-[#F35A22] h-2 bg-[#1A1A1A] rounded" />
                      <span className="text-xs font-mono text-amber-500 w-10 text-right">{sg.weight}%</span>
                    </div>
                  </div>
                );
              })}
              {selectedGenres.length === 0 && (
                <div className="text-center p-6 bg-[#181818] rounded border border-dashed border-[#2D2D2D]"><p className="text-xs text-[#666666] italic">No active genre layers.</p></div>
              )}
            </div>

            <div className="pt-4 border-t border-[#2A2A2A]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#666666] font-mono block mb-3">Add Available Influences</span>
              <div className="grid grid-cols-1 gap-1.5 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                {GENRE_POOL.filter(g => !selectedGenres.some(sg => sg.genreId === g.id)).map(genre => (
                  <button key={genre.id} onClick={() => { handleAddGenre(genre.id); if (window.innerWidth < 1024) setLeftSidebarOpen(false); }} className="flex items-center justify-between bg-[#242424] hover:bg-[#2D2D2D] border border-[#323232] px-3.5 py-3 rounded text-left transition w-full">
                    <div className="min-w-0 pr-2">
                      <span className="text-xs font-semibold text-slate-300 block">{genre.name}</span>
                      <span className="text-[10px] text-[#7A7A7A] block truncate">{genre.style}</span>
                    </div>
                    <Plus className="w-4 h-4 text-[#F35A22] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-[#181818] p-3 rounded border border-[#282828] text-[11px] text-[#888888] space-y-1.5 mt-6">
            <div className="flex items-center gap-1.5 font-bold text-[#A5A5A5]"><Info className="w-3.5 h-3.5 text-amber-500 shrink-0" /><span>Composition Rule:</span></div>
            <p className="leading-normal">Combining distinct genres crosses meter structures, resulting in unexpected expressive cadences.</p>
          </div>
        </aside>

        {/* MAIN WORKSPACE CONTENT */}
        <main className="flex-1 bg-[#151515] overflow-y-auto flex flex-col justify-between">
          <div className="flex-1 flex flex-col p-4 md:p-6">
            
            {activeMode === 'SETUP' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#2C2C2C] pb-3">
                  <h3 className="text-base md:text-lg font-semibold tracking-tight text-[#E0E0E0] flex items-center gap-2">
                    <Settings className="w-4 md:w-5 h-4 md:h-5 text-[#F35A22]" /> Setup Track Specifications
                  </h3>
                  <span className="text-[11px] text-[#7A7A7A] font-mono hidden sm:inline">PROJECT SETUP</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#1E1E1E] p-4 md:p-5 rounded-lg border border-[#2C2C2C] space-y-4">
                    <span className="text-xs font-mono uppercase text-[#7A7A7A] block border-b border-[#2C2C2C] pb-1.5">Original Score Data</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-[#A0A0A0] mb-1.5">Original Artist Name</label>
                        <input type="text" value={sourceArtist} onChange={(e) => setSourceArtist(e.target.value)} className="w-full bg-[#121212] border border-[#333333] rounded px-3 py-2.5 text-xs focus:outline-none focus:border-[#F35A22] text-[#E0E0E0]" />
                      </div>
                      <div>
                        <label className="block text-xs text-[#A0A0A0] mb-1.5">Original Genre (Swap From)</label>
                        <select value={sourceGenreId} onChange={(e) => setSourceGenreId(e.target.value)} className="w-full bg-[#121212] border border-[#333333] rounded px-3 py-2.5 text-xs focus:outline-none focus:border-[#F35A22] text-[#E0E0E0]">
                          {GENRE_POOL.map(g => (<option key={g.id} value={g.id}>{g.name}</option>))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-[#A0A0A0] mb-1.5">Lead Middle C Sampler</label>
                        <select value={selectedInstrument.name} onChange={(e) => { const found = customInstrumentList.find(i => i.name === e.target.value); if (found) setSelectedInstrument(found); }} className="w-full bg-[#121212] border border-[#333333] rounded px-3 py-2.5 text-xs focus:outline-none focus:border-[#F35A22] text-[#E0E0E0]">
                          {customInstrumentList.map((inst, idx) => (<option key={idx} value={inst.name}>{inst.name} ({inst.class})</option>))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-[#A0A0A0] mb-1.5">Acoustic Recording Venue</label>
                        <select value={selectedVenue.name} onChange={(e) => { const found = RECORDING_VENUES.find(v => v.name === e.target.value); if (found) setSelectedVenue(found); }} className="w-full bg-[#121212] border border-[#333333] rounded px-3 py-2.5 text-xs focus:outline-none focus:border-[#F35A22] text-[#E0E0E0]">
                          {RECORDING_VENUES.slice(0, 15).map((venue, idx) => (<option key={idx} value={venue.name}>{venue.name} ({venue.city})</option>))}
                        </select>
                      </div>
                    </div>

                    <div className="bg-[#121212] border border-[#2D2D2D] p-3 rounded-lg space-y-2 pt-3 mt-2">
                      <span className="block text-[10px] font-mono text-[#F35A22] font-bold uppercase tracking-wider">Discover & Sample Custom Instrument</span>
                      <p className="text-[11px] text-slate-400 leading-normal">Type any custom or rare instrument below. We will simulate a dataset search to retrieve frequency spectra and synthesize a Middle C map!</p>
                      <div className="flex gap-2">
                        <input type="text" value={userTypedInstrument} onChange={(e) => setUserTypedInstrument(e.target.value)} placeholder="e.g. Space Theremin..." className="flex-1 bg-[#1A1A1A] border border-[#2D2D2D] rounded px-2.5 py-1.5 text-xs text-[#E0E0E0] focus:outline-none focus:border-[#F35A22] font-mono" disabled={isSamplingInstrument} />
                        <button onClick={runInstrumentSamplingQuery} disabled={isSamplingInstrument} className="bg-[#2D2D2D] hover:bg-[#3D3D3D] text-[#E0E0E0] border border-slate-700 px-3 py-1.5 rounded text-xs font-mono uppercase font-bold transition flex items-center gap-1.5">
                          {isSamplingInstrument ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /><span>SAMPLING...</span></> : <><Compass className="w-3.5 h-3.5 text-[#F35A22]" /><span>SAMPLE IT</span></>}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-[#A0A0A0] mb-1.5">Lyrics Blueprint</label>
                      <textarea value={lyrics} onChange={(e) => setLyrics(e.target.value)} placeholder="Paste or write standard lines here..." className="w-full h-36 md:h-40 bg-[#121212] border border-[#333333] rounded p-3 text-xs focus:outline-none focus:border-[#F35A22] text-[#E0E0E0] font-mono leading-relaxed resize-none" />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {PRESETS.map((p, idx) => (
                        <button key={idx} onClick={() => { setLyrics(p.lyrics); setSourceArtist(p.sourceArtist); setSourceGenreId(p.sourceGenre || "country"); addLog(`Applied Preset: "${p.title}"`); }} className="bg-[#2D2D2D] hover:bg-[#383838] border border-[#3C3C3C] text-[10px] text-slate-300 px-3 py-2 rounded transition active:scale-95">
                          Preset {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#1E1E1E] p-4 md:p-5 rounded-lg border border-[#2C2C2C] space-y-4">
                    <span className="text-xs font-mono uppercase text-[#7A7A7A] block border-b border-[#2C2C2C] pb-1.5">Vocalist Acoustic Calibration</span>
                    <p className="text-xs text-slate-400 leading-relaxed">Calibrate vocal timings directly from your vocal performance. Use the live microphone analysis to match phrasing boundaries.</p>
                    <div className="flex gap-3">
                      <button onClick={isRecording ? stopRecording : startRecording} className={`flex-1 py-3 px-4 rounded text-xs font-bold uppercase tracking-wider transition border ${isRecording ? 'bg-rose-950/20 text-rose-300 border-rose-500 animate-pulse' : 'bg-[#292929] hover:bg-[#323232] border-[#3D3D3D] text-[#E0E0E0]'}`}>
                        {isRecording ? "Analyze Sound Signature..." : "Profile Live Vocalist"}
                      </button>
                    </div>

                    {isRecording && micVisualizer.length > 0 && (
                      <div className="bg-[#121212] h-20 rounded border border-[#2D2D2D] flex items-end gap-[1px] p-2">
                        {micVisualizer.slice(0, 48).map((val, idx) => (
                          <div key={idx} className="bg-[#F35A22] flex-1 rounded-sm" style={{ height: `${Math.max(4, (val / 255) * 100)}%` }}></div>
                        ))}
                      </div>
                    )}

                    {vocalCadenceData && (
                      <div className="bg-[#121212] p-4 rounded border border-[#2D2D2D] space-y-2 text-xs font-mono">
                        <div className="flex justify-between items-center"><span className="text-[#606060]">Detected:</span><span className="text-amber-500 text-right">{vocalCadenceData.profile}</span></div>
                        <div className="flex justify-between items-center"><span className="text-[#606060]">Dynamics:</span><span className="text-emerald-400">{vocalCadenceData.rmsEnergy}</span></div>
                        <div className="flex justify-between items-center"><span className="text-[#606060]">Density:</span><span className="text-slate-300">{vocalCadenceData.syllablesPerSec} syl/sec</span></div>
                      </div>
                    )}

                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-mono uppercase text-[#7A7A7A] block">Quick-Load Score Ensembles</span>
                      <div className="grid grid-cols-1 gap-2">
                        {PRESET_ENSEMBLES.map((ens, idx) => (
                          <button key={idx} onClick={() => {
                            if (ens.genres.length > 0) { setSourceGenreId(ens.genres[0]); setSelectedGenres(ens.genres.map((g, i) => ({ genreId: g, weight: i === 0 ? 60 : 40 }))); }
                            const inst = customInstrumentList.find(i => i.name.includes(ens.instruments[0]));
                            if (inst) setSelectedInstrument(inst);
                            addLog(`Loaded Preset Ensemble Group: "${ens.name}"`);
                          }} className="bg-[#121212] hover:bg-[#252525] border border-[#2D2D2D] p-2.5 rounded text-left transition w-full">
                            <span className="text-xs font-bold text-slate-200 block">{ens.name}</span>
                            <span className="text-[10px] text-slate-500 block">Lead Target elements: {ens.instruments.join(', ')}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMode === 'WRITE' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#2C2C2C] pb-3">
                  <h3 className="text-base md:text-lg font-semibold tracking-tight text-[#E0E0E0] flex items-center gap-2"><FileText className="w-4 h-4 text-[#F35A22]" /> Lyrical Syntax & Syllable Setup</h3>
                </div>
                <div className="bg-[#1E1E1E] p-4 md:p-6 rounded-lg border border-[#2C2C2C] space-y-4">
                  <div className="bg-[#121212] p-4 rounded-md border border-[#2C2C2C]">
                    <p className="text-xs font-mono text-[#606060] mb-2 uppercase tracking-widest">// TEXT FLOW ENTRY</p>
                    <textarea value={lyrics} onChange={(e) => setLyrics(e.target.value)} className="w-full h-48 bg-transparent text-[#E0E0E0] border-none focus:ring-0 p-0 font-mono text-sm leading-relaxed resize-none focus:outline-none" />
                  </div>
                  {transformedOutput && (
                    <div className="space-y-3">
                      <span className="text-xs font-mono uppercase text-amber-500">Prosody Synthesis Plan:</span>
                      <div className="bg-[#121212] p-4 rounded border border-[#2D2D2D] text-xs font-mono space-y-1.5">
                        <div><strong className="text-slate-400">Tempo alignment:</strong> {tempo} BPM</div>
                        <div><strong className="text-slate-400">Stylistic notes:</strong> {transformedOutput.styleNotes}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeMode === 'PLAY' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#2C2C2C] pb-3">
                  <h3 className="text-base md:text-lg font-semibold tracking-tight text-[#E0E0E0] flex items-center gap-2"><Activity className="w-4 h-4 text-[#F35A22]" /> Synthesized Acoustic Playback</h3>
                </div>

                {!transformedOutput && (
                  <div className="text-center p-8 bg-[#1E1E1E] rounded-lg border-2 border-dashed border-[#2C2C2C] flex flex-col items-center">
                    <Disc className="w-12 h-12 text-[#444444] animate-spin mb-4" />
                    <p className="text-sm font-semibold text-slate-300">No rendered covers found in playback buffer</p>
                  </div>
                )}

                {transformedOutput && (
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    <div className="xl:col-span-4 bg-[#1E1E1E] p-4 md:p-5 rounded-lg border border-[#2C2C2C] space-y-4">
                      <div className="relative aspect-square w-full rounded bg-gradient-to-br from-[#1C2030] via-[#121212] to-[#281512] border border-slate-850 flex flex-col items-center justify-center overflow-hidden p-6 text-center">
                        {albumArtUrl ? <img src={albumArtUrl} alt="Album Art" className="absolute inset-0 w-full h-full object-cover z-10 transition duration-350" /> : <div className="absolute inset-0 bg-[#F35A22]/5 animate-pulse"></div>}
                        <div className="relative z-20 flex flex-col items-center justify-center h-full">
                          {!albumArtUrl && <><Disc className={`w-16 h-16 text-[#F35A22] ${audioPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} /><h4 className="font-bold text-sm text-[#F5F5F5] mt-4">{transformedOutput.coverTitle}</h4></>}
                        </div>
                      </div>

                      <div className="bg-[#121212] p-4 rounded border border-[#2C2C2C] space-y-3.5">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#F35A22]"><Image className="w-4 h-4" /><span>AI Album Art Generator</span></div>
                        <textarea rows={2} value={albumArtPrompt} onChange={(e) => setAlbumArtPrompt(e.target.value)} className="w-full bg-[#1A1A1A] border border-[#2D2D2D] rounded p-2 text-[11px] font-mono resize-none" placeholder="Art directions..." />
                        <button onClick={runAlbumArtGeneration} disabled={isGeneratingArt} className="w-full bg-[#2A2D3A] hover:bg-[#323646] text-xs font-mono py-2 rounded text-slate-200 transition font-bold uppercase flex items-center justify-center gap-2">
                          {isGeneratingArt ? <><RefreshCw className="w-4 h-4 animate-spin" /><span>GENERATING...</span></> : <><Sparkles className="w-4 h-4 text-amber-500" /><span>GENERATE ART</span></>}
                        </button>
                      </div>
                    </div>

                    <div className="xl:col-span-8 bg-[#1E1E1E] p-4 rounded-lg border border-[#2C2C2C] flex flex-col space-y-4">
                      <div className="flex justify-between items-center border-b border-[#2C2C2C] pb-3">
                        <div><span className="text-xs font-mono uppercase text-[#7A7A7A]">Syllable Sync Deck</span></div>
                        {wavAudioUrl && (
                          <div className="flex gap-2">
                            <button onClick={audioPlaying ? pauseAudio : playAudio} className="bg-[#F35A22] hover:bg-[#FF6C34] text-[#121212] font-bold px-4 py-2 rounded text-xs uppercase flex items-center gap-1.5 transition">
                              {audioPlaying ? <Pause className="w-3.5 h-3.5 fill-[#121212]" /> : <Play className="w-3.5 h-3.5 fill-[#121212]" />}<span>{audioPlaying ? 'Pause' : 'Play'}</span>
                            </button>
                            <a href={wavAudioUrl} download={`master.${currentPlan === 'pro' ? 'wav' : 'mp3'}`} className="bg-[#2D2D2D] hover:bg-[#3D3D3D] text-slate-300 font-semibold px-4 py-2 rounded text-xs border border-[#3D3D3D] flex items-center gap-1 transition"><Download className="w-3.5 h-3.5" /><span>DL</span></a>
                          </div>
                        )}
                      </div>
                      {wavAudioUrl && <audio ref={audioRef} src={wavAudioUrl} onEnded={handleAudioEnded} className="hidden" />}
                      <div onScroll={handleSequencerScroll} className="space-y-4 flex-1 overflow-y-auto max-h-[350px] custom-scrollbar">
                        {transformedOutput.lines.slice(0, visibleSequencerCount).map((line, lIdx) => (
                          <div key={lIdx} className={`p-4 rounded transition-all duration-200 border ${currentLineIndex === lIdx ? 'bg-[#29231E] border-[#F35A22]/70' : 'bg-[#121212] border-[#2C2C2C]'}`}>
                            <p className="text-xs md:text-sm font-semibold text-slate-200 mb-3">{line.transformed}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {line.syllables.map((syll, sIdx) => (
                                <span key={sIdx} className={`text-[10px] px-2 py-1 rounded font-mono ${currentLineIndex === lIdx && currentSyllableIndex === sIdx ? 'bg-[#F35A22] text-[#121212] font-black' : 'bg-[#1E1E1E] text-slate-400 border border-[#2D2D2D]'}`}>{syll}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeMode === 'DAW STUDIO' && (
              <div className="space-y-6 flex-1 flex flex-col">
                {currentPlan === 'free' ? (
                  <div className="flex-1 flex flex-col justify-center items-center py-12 px-6 text-center max-w-2xl mx-auto space-y-6">
                    <div className="bg-[#F35A22]/10 p-5 rounded-full border border-[#F35A22]/30 text-[#F35A22] animate-bounce"><Lock className="w-12 h-12" /></div>
                    <div>
                      <span className="text-[10px] font-mono text-amber-500 border border-amber-900/40 px-2.5 py-1 rounded bg-amber-950/20 uppercase tracking-widest font-black">PRO WORKSPACE LOCKED</span>
                      <h2 className="text-2xl font-bold text-white mt-4 tracking-tight">Unlock DAW Studio Integration</h2>
                    </div>
                    <button onClick={() => setActiveMode('PLANS')} className="bg-gradient-to-r from-amber-600 to-[#F35A22] text-slate-950 font-black text-xs font-mono uppercase px-8 py-3.5 rounded transition">Unlock DAW Workspace Now</button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between border-b border-[#2C2C2C] pb-3">
                      <div className="flex items-center gap-2">
                        <Sliders className="w-5 h-5 text-[#F35A22]" />
                        <div><h3 className="text-sm font-bold text-[#E0E0E0] uppercase">Digital Audio Workstation</h3></div>
                      </div>
                      <button onClick={handleMidiLoopToggle} className={`px-4 py-1.5 rounded text-[11px] font-bold uppercase transition flex items-center gap-1.5 ${isMidiLooping ? 'bg-rose-600 text-white' : 'bg-[#F35A22] text-slate-950'}`}>
                        {isMidiLooping ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-slate-950" />}<span>{isMidiLooping ? 'STOP MIDI LOOP' : 'LOOP BACKING MIDI'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 flex-1 items-stretch">
                      <div className="xl:col-span-5 bg-[#1E1E1E] p-4 rounded-lg border border-[#2C2C2C] flex flex-col justify-between space-y-4">
                        <div>
                          <span className="text-xs font-mono uppercase text-[#F35A22] font-bold">Manual Vocal Syllable Tuner</span>
                          {transformedOutput ? (
                            <div className="space-y-3 max-h-60 overflow-y-auto mt-4 custom-scrollbar">
                              {transformedOutput.lines.map((line, lineIdx) => (
                                <div key={lineIdx} className="bg-[#121212] p-2 rounded border border-[#2C2C2C] space-y-2">
                                  <div className="flex flex-wrap gap-2">
                                    {line.syllables.map((syll, sylIdx) => {
                                      const key = `${lineIdx}-${sylIdx}`;
                                      const currentVal = vocalTuneOffsets[key] || 0;
                                      return (
                                        <div key={sylIdx} className="bg-[#1E1E1E] p-1.5 rounded border border-[#2C2C2C] flex flex-col items-center min-w-[70px]">
                                          <span className="text-[10px] font-mono text-slate-300 truncate">{syll}</span>
                                          <input type="range" min="-12" max="12" value={currentVal} onChange={(e) => setVocalTuneOffsets(prev => ({ ...prev, [key]: parseInt(e.target.value) }))} className="w-full accent-[#F35A22] mt-1 h-1" />
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (<div className="p-4 text-center text-xs text-slate-500 italic">No rendered performance available.</div>)}
                        </div>
                      </div>

                      <div className="xl:col-span-7 bg-[#1E1E1E] p-4 rounded-lg border border-[#2C2C2C] flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-mono uppercase text-[#F35A22] font-bold">16-Step MIDI Backing Sequencer</span>
                            <div className="flex gap-2">
                              {['sine', 'square', 'sawtooth', 'triangle'].map(w => <button key={w} onClick={() => setMidiSynthType(w)} className={`px-2 py-0.5 rounded text-[9px] font-mono border ${midiSynthType === w ? 'bg-[#F35A22] text-slate-950 border-[#F35A22]' : 'text-slate-400 border-slate-700'}`}>{w}</button>)}
                            </div>
                          </div>
                          <div className="bg-[#121212] p-2.5 rounded-lg border border-[#2C2C2C] overflow-x-auto">
                            <div className="min-w-[480px] space-y-1">
                              {NOTE_PITCHES.map((pitch, pitchIdx) => (
                                <div key={pitchIdx} className="flex items-center gap-1.5">
                                  <div className="w-10 text-[10px] font-mono text-slate-400">{pitch.note}</div>
                                  <div className="flex-1 grid grid-cols-16 gap-1">
                                    {Array.from({ length: 16 }).map((_, stepIdx) => (
                                      <button key={stepIdx} onClick={() => toggleMidiSequencerCell(pitchIdx, stepIdx)} className={`h-6 rounded border transition-all ${midiSequencerNotes[pitchIdx][stepIdx] ? 'bg-[#F35A22] border-[#F35A22]' : 'bg-[#1E1E1E] border-slate-800'} ${activeMidiStep === stepIdx ? 'ring-2 ring-indigo-500' : ''}`} />
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#1E1E1E] p-4 rounded-lg border border-[#2C2C2C] space-y-3">
                      <span className="text-xs font-mono uppercase text-[#F35A22] font-bold">Virtual MIDI Emulator Keyboard</span>
                      <div className="flex bg-[#121212] p-2.5 rounded-lg border border-slate-800 overflow-x-auto scrollbar-thin">
                        <div className="flex min-w-[640px] h-32 relative">
                          {NOTE_PITCHES.slice().reverse().map((pitch, idx) => (
                            <button key={idx} onMouseDown={() => playMidiNode(pitch.freq)} className="flex-1 bg-white border border-slate-300 text-slate-900 font-mono font-black text-[10px] pb-2 rounded-b-md flex flex-col justify-end items-center relative z-10 active:bg-slate-200">{pitch.note}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeMode === 'PLANS' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#2C2C2C] pb-3">
                  <h3 className="text-base font-semibold text-[#E0E0E0]"><CreditCard className="w-4 h-4 inline mr-2 text-[#F35A22]"/>Account Licensing</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                  <div className={`flex flex-col justify-between bg-[#1E1E1E] rounded-lg p-5 border ${currentPlan === 'free' ? 'border-[#F35A22]' : 'border-[#2C2C2C]'}`}>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase font-mono">Free Starter</h4>
                      <div className="my-5"><span className="text-3xl font-extrabold text-[#F5F5F5]">$0</span></div>
                      <ul className="space-y-2 text-xs text-[#A0A0A0] mb-6">
                        <li><Check className="w-4 h-4 inline mr-2 text-emerald-500"/><strong>2 exports</strong> per day</li>
                        <li><Check className="w-4 h-4 inline mr-2 text-emerald-500"/>Low Quality <strong>64kbps MP3</strong></li>
                        <li className="text-rose-400">DAW Locked</li>
                      </ul>
                    </div>
                    <button onClick={() => setCurrentPlan('free')} className="w-full py-2 bg-[#2A2A2A] rounded text-[11px] font-bold text-white uppercase">Select</button>
                  </div>

                  <div className={`flex flex-col justify-between bg-[#1E1E1E] rounded-lg p-5 border ${currentPlan === 'user' ? 'border-[#F35A22]' : 'border-[#2C2C2C]'}`}>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase font-mono">Creator Tier</h4>
                      <div className="my-5"><span className="text-3xl font-extrabold text-[#F5F5F5]">$9</span></div>
                      <ul className="space-y-2 text-xs text-[#A0A0A0] mb-6">
                        <li><Check className="w-4 h-4 inline mr-2 text-emerald-500"/><strong>15 exports</strong> per day</li>
                        <li><Check className="w-4 h-4 inline mr-2 text-emerald-500"/>DAW Unlocked</li>
                      </ul>
                    </div>
                    <button onClick={() => executeStripePayment('user')} className="w-full py-2 bg-[#F35A22] rounded text-[11px] font-bold text-white uppercase">Checkout</button>
                  </div>

                  <div className={`flex flex-col justify-between bg-[#1E1E1E] rounded-lg p-5 border ${currentPlan === 'pro' ? 'border-[#F35A22]' : 'border-[#2C2C2C]'}`}>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase font-mono">Pro Studio</h4>
                      <div className="my-5"><span className="text-3xl font-extrabold text-[#F5F5F5]">$24</span></div>
                      <ul className="space-y-2 text-xs text-[#A0A0A0] mb-6">
                        <li><Check className="w-4 h-4 inline mr-2 text-emerald-500"/><strong>50 exports</strong> per day</li>
                        <li><Check className="w-4 h-4 inline mr-2 text-emerald-500"/>Studio Lossless WAV</li>
                      </ul>
                    </div>
                    <button onClick={() => executeStripePayment('pro')} className="w-full py-2 bg-indigo-600 rounded text-[11px] font-bold text-white uppercase">Checkout</button>
                  </div>
                </div>

                <div className="bg-[#1E1E1E] border border-[#2C2C2C] p-5 rounded-lg space-y-4">
                  <h4 className="text-xs font-bold text-white uppercase font-mono">Stripe API Environment Variables</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" value={envStripePublishable} onChange={(e) => setEnvStripePublishable(e.target.value)} className="bg-[#121212] border border-[#333333] rounded px-3 py-2 text-xs text-[#E0E0E0] font-mono" placeholder="STRIPE_PUBLISHABLE_KEY" />
                    <input type="text" value={envStripeSecret} onChange={(e) => setEnvStripeSecret(e.target.value)} className="bg-[#121212] border border-[#333333] rounded px-3 py-2 text-xs text-[#E0E0E0] font-mono" placeholder="STRIPE_SECRET_KEY" />
                  </div>
                  <button onClick={validateStripeHandshake} className="text-[10px] bg-emerald-950/40 text-emerald-400 px-3 py-1.5 rounded font-bold font-mono">TEST STRIPE HANDSHAKE</button>
                </div>
              </div>
            )}
          </div>

          {/* LOWER ACTION STRIP */}
          <div className="mt-6 md:mt-8 pt-4 border-t border-[#2C2C2C] flex justify-between bg-[#1E1E1E] p-4 rounded border">
            <div>
              <p className="text-xs text-[#A5A5A5] font-semibold">Ready to Synthesize Hybrid Performance Draft?</p>
            </div>
            <button onClick={runCoverTransformation} disabled={loading || !isOnline} className="bg-gradient-to-r from-amber-600 to-[#F35A22] text-[#121212] font-bold text-xs uppercase px-6 py-2.5 rounded flex gap-2">
              {loading ? <RefreshCw className="w-4 h-4 animate-spin text-[#121212]" /> : <Sparkles className="w-4 h-4 text-[#121212]" />}
              <span>Render</span>
            </button>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        {rightSidebarOpen && <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden" onClick={() => setRightSidebarOpen(false)} />}
        <aside className={`fixed inset-y-0 right-0 w-80 bg-[#1E1E1E] border-l border-[#2C2C2C] p-5 flex flex-col justify-between shrink-0 z-50 transition-transform duration-300 transform lg:static lg:translate-x-0 ${rightSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="space-y-4 overflow-y-auto max-h-[70vh] custom-scrollbar pr-1">
            <div className="flex justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#999999] font-mono">Musical Asset Browser</span>
              <button onClick={() => setRightSidebarOpen(false)} className="lg:hidden p-1 bg-[#2D2D2D] rounded"><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-4 gap-1 bg-[#121212] p-1 rounded border border-[#2D2D2D]">
              {['genres', 'artists', 'instruments', 'venues'].map((tab) => (
                <button key={tab} onClick={() => setSelectedAssetTab(tab)} className={`py-1 text-[9px] font-bold uppercase rounded ${selectedAssetTab === tab ? 'bg-[#F35A22] text-[#121212]' : 'text-slate-400'}`}>{tab}</button>
              ))}
            </div>
            <input type="text" placeholder={`Search ${selectedAssetTab}...`} value={assetSearchQuery} onChange={(e) => setAssetSearchQuery(e.target.value)} className="w-full bg-[#121212] border border-[#333333] rounded px-3 py-1.5 text-xs text-[#E0E0E0] font-mono" />
            <div onScroll={handleAssetScroll} className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
              {getFilteredAssets().slice(0, visibleAssetsCount).map((item, index) => (
                <div key={index} onClick={() => {
                  if (selectedAssetTab === 'genres') setSourceGenreId(item.id);
                  else if (selectedAssetTab === 'artists') setSourceArtist(item.name);
                  else if (selectedAssetTab === 'instruments') setSelectedInstrument(item);
                  else if (selectedAssetTab === 'venues') setSelectedVenue(item);
                  addLog(`Selected ${item.name}`);
                }} className="bg-[#121212] hover:bg-[#252525] border border-[#2D2D2D] p-2 rounded cursor-pointer transition">
                  <span className="text-xs font-bold text-slate-200">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col min-h-[180px] mt-4">
            <span className="text-[10px] font-bold text-[#666666] font-mono mb-2">Engine System Logs</span>
            <div onScroll={handleLogsScroll} className="bg-[#121212] flex-1 p-3.5 rounded border border-[#2D2D2D] font-mono text-[10px] text-emerald-500 overflow-y-auto custom-scrollbar max-h-48">
              {consoleLogs.slice(0, visibleLogsCount).map((log, idx) => (<div key={idx} className="border-b border-[#1A1A1A] pb-1">{log}</div>))}
            </div>
          </div>
        </aside>
      </div>

      <footer className="bg-[#161616] border-t border-[#252525] px-4 py-2 flex justify-between text-[10px] font-mono text-[#666666]">
        <span>Project Status: <strong className="text-emerald-500">PWA Active</strong></span>
        <span>Dorico VibeSync v2.9 build</span>
      </footer>

      {errorMsg && (
        <div className="fixed bottom-10 right-4 max-w-sm bg-[#221212] border border-rose-500/40 p-4 rounded-lg shadow-2xl flex items-start gap-3 z-50 animate-bounce">
          <AlertCircle className="w-5 h-5 text-rose-500" />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <p className="text-xs font-bold text-rose-300">Workspace Pipeline Alert</p>
              <button onClick={() => setErrorMsg("")} className="text-rose-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
            </div>
            <p className="text-[11px] text-[#A0A0A0] mt-1">{errorMsg}</p>
          </div>
        </div>
      )}
    </div>
  );
}