import React, { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import * as Slider from '@radix-ui/react-slider';
import { 
  Type, 
  Image, 
  PaintBucket, 
  Download,
  Layout,
  Palette,
  Circle,
  Square,
  Triangle,
  Star,
  Heart,
  Building2,
  Briefcase,
  ShoppingBag,
  Utensils,
  Car,
  Shirt,
  Music,
  Camera,
  Dumbbell,
  Gem,
  Coffee,
  Leaf,
  Zap,
  Globe,
  Smartphone,
  Book,
  Palette as ArtPalette,
  Home,
  Wrench,
  Plane,
  Gamepad,
  Baby,
  Dog,
  Flower2,
  Dumbbell as Fitness,
  Heart as Health,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react';

interface LogoSettings {
  text: string;
  slogan: string;
  fontSize: number;
  fontColor: string;
  backgroundColor: string;
  shape: string;
  shapeColor: string;
  template: string;
  industry: string;
  layout: 'icon-left' | 'icon-top' | 'icon-right';
  fontFamily: string;
  iconSize: number;
  letterSpacing: number;
  lineHeight: number;
  opacity: number;
  rotation: number;
}

const industries = [
  { name: 'Business', icon: Building2, color: '#2563eb' },
  { name: 'Luxury', icon: Gem, color: '#9333ea' },
  { name: 'Restaurant', icon: Utensils, color: '#dc2626' },
  { name: 'Cafe', icon: Coffee, color: '#92400e' },
  { name: 'Eco/Green', icon: Leaf, color: '#16a34a' },
  { name: 'Technology', icon: Zap, color: '#2563eb' },
  { name: 'Global', icon: Globe, color: '#0891b2' },
  { name: 'Mobile App', icon: Smartphone, color: '#6366f1' },
  { name: 'Education', icon: Book, color: '#4338ca' },
  { name: 'Art & Design', icon: ArtPalette, color: '#be185d' },
  { name: 'Real Estate', icon: Home, color: '#0f766e' },
  { name: 'Automotive', icon: Car, color: '#b91c1c' },
  { name: 'Construction', icon: Wrench, color: '#92400e' },
  { name: 'Travel', icon: Plane, color: '#0369a1' },
  { name: 'Gaming', icon: Gamepad, color: '#7c3aed' },
  { name: 'Kids', icon: Baby, color: '#db2777' },
  { name: 'Pets', icon: Dog, color: '#9333ea' },
  { name: 'Fashion', icon: Shirt, color: '#be185d' },
  { name: 'Flowers', icon: Flower2, color: '#be185d' },
  { name: 'Fitness', icon: Fitness, color: '#2563eb' },
  { name: 'Healthcare', icon: Health, color: '#dc2626' },
  { name: 'Education', icon: GraduationCap, color: '#4338ca' },
  { name: 'Shopping', icon: ShoppingBag, color: '#059669' },
  { name: 'Music', icon: Music, color: '#6366f1' }
];

const templates = [
  {
    name: 'Modern Minimal',
    colors: ['#000000', '#ffffff'],
    fontSize: 36,
    fontFamily: 'Inter, sans-serif',
    letterSpacing: 1,
    lineHeight: 1.2
  },
  {
    name: 'Bold & Creative',
    colors: ['#ff0000', '#000000'],
    fontSize: 42,
    fontFamily: 'Poppins, sans-serif',
    letterSpacing: 2,
    lineHeight: 1.4
  },
  {
    name: 'Professional Classic',
    colors: ['#003366', '#ffffff'],
    fontSize: 32,
    fontFamily: 'Georgia, serif',
    letterSpacing: 0.5,
    lineHeight: 1.3
  },
  {
    name: 'Tech Startup',
    colors: ['#6200ee', '#ffffff'],
    fontSize: 38,
    fontFamily: 'SF Pro Display, sans-serif',
    letterSpacing: 1.5,
    lineHeight: 1.2
  },
  {
    name: 'Elegant Luxury',
    colors: ['#c9b037', '#000000'],
    fontSize: 34,
    fontFamily: 'Playfair Display, serif',
    letterSpacing: 3,
    lineHeight: 1.5
  },
  {
    name: 'Eco Friendly',
    colors: ['#2e7d32', '#f1f8e9'],
    fontSize: 36,
    fontFamily: 'Montserrat, sans-serif',
    letterSpacing: 1,
    lineHeight: 1.4
  },
  {
    name: 'Vintage Style',
    colors: ['#795548', '#efebe9'],
    fontSize: 40,
    fontFamily: 'Abril Fatface, cursive',
    letterSpacing: 2,
    lineHeight: 1.3
  },
  {
    name: 'Minimalist Black',
    colors: ['#212121', '#ffffff'],
    fontSize: 32,
    fontFamily: 'Helvetica Neue, sans-serif',
    letterSpacing: 1,
    lineHeight: 1.2
  },
  {
    name: 'Creative Agency',
    colors: ['#ff4081', '#ffffff'],
    fontSize: 38,
    fontFamily: 'Futura, sans-serif',
    letterSpacing: 2.5,
    lineHeight: 1.4
  },
  {
    name: 'Corporate Blue',
    colors: ['#0277bd', '#ffffff'],
    fontSize: 34,
    fontFamily: 'Arial, sans-serif',
    letterSpacing: 0.8,
    lineHeight: 1.3
  }
];

const shapes = {
  circle: Circle,
  square: Square,
  triangle: Triangle,
  star: Star,
  heart: Heart
};

const fontFamilies = [
  'Inter, sans-serif',
  'Poppins, sans-serif',
  'Georgia, serif',
  'Arial, sans-serif',
  'Helvetica Neue, sans-serif',
  'Playfair Display, serif',
  'Montserrat, sans-serif',
  'Roboto, sans-serif',
  'Open Sans, sans-serif',
  'Lato, sans-serif'
];

function App() {
  const [step, setStep] = useState(1);
  const logoRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState<LogoSettings>({
    text: 'Your Company',
    slogan: 'Your Slogan',
    fontSize: 32,
    fontColor: '#000000',
    backgroundColor: '#ffffff',
    shape: 'circle',
    shapeColor: '#ff0000',
    template: 'Modern Minimal',
    industry: 'Business',
    layout: 'icon-left',
    fontFamily: 'Inter, sans-serif',
    iconSize: 48,
    letterSpacing: 1,
    lineHeight: 1.2,
    opacity: 100,
    rotation: 0
  });

  const ShapeComponent = shapes[settings.shape as keyof typeof shapes];
  const IndustryIcon = industries.find(i => i.name === settings.industry)?.icon || Building2;

  const handleDownload = async (format: 'png' | 'svg') => {
    if (!logoRef.current) return;

    try {
      if (format === 'png') {
        const dataUrl = await htmlToImage.toPng(logoRef.current, {
          quality: 1.0,
          pixelRatio: 3
        });
        const link = document.createElement('a');
        link.download = `${settings.text.toLowerCase().replace(/\s+/g, '-')}-logo.png`;
        link.href = dataUrl;
        link.click();
      } else {
        const dataUrl = await htmlToImage.toSvg(logoRef.current);
        const link = document.createElement('a');
        link.download = `${settings.text.toLowerCase().replace(/\s+/g, '-')}-logo.svg`;
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      console.error('Error downloading logo:', error);
      alert('There was an error downloading your logo. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Free Logo Maker</h1>
          <h1>Phone: <a href="tel:+923153799709">+92 315 3799 709</a></h1>

          <div className="flex gap-4">
            <button 
              onClick={() => setStep(Math.max(1, step - 1))}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <button 
              onClick={() => setStep(Math.min(4, step + 1))}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {['Choose Industry', 'Select Template', 'Customize Design', 'Download'].map((text, index) => (
              <div 
                key={text} 
                className={`flex items-center ${index < step ? 'text-blue-600' : 'text-gray-400'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index + 1 === step ? 'bg-blue-600 text-white' : 
                  index + 1 < step ? 'bg-blue-100 text-blue-600' : 
                  'bg-gray-100 text-gray-400'
                }`}>
                  {index + 1 < step ? <Check size={16} /> : index + 1}
                </div>
                <span className="ml-2 font-medium">{text}</span>
                {index < 3 && (
                  <div className="w-24 h-0.5 mx-4 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Logo Preview */}
          <div className="lg:col-span-2">
            <div 
              ref={logoRef}
              className="flex items-center justify-center p-12 rounded-lg shadow-lg aspect-video"
              style={{ backgroundColor: settings.backgroundColor }}
            >
              <div 
                className={`flex ${
                  settings.layout === 'icon-top' ? 'flex-col' :
                  settings.layout === 'icon-left' ? 'flex-row' :
                  'flex-row-reverse'
                } items-center gap-4`}
                style={{
                  transform: `rotate(${settings.rotation}deg)`,
                  opacity: settings.opacity / 100
                }}
              >
                <IndustryIcon 
                  size={settings.iconSize} 
                  color={settings.shapeColor}
                  className="flex-shrink-0"
                />
                <div className="flex flex-col items-center">
                  <span 
                    style={{ 
                      color: settings.fontColor,
                      fontSize: `${settings.fontSize}px`,
                      fontFamily: settings.fontFamily,
                      letterSpacing: `${settings.letterSpacing}px`,
                      lineHeight: settings.lineHeight
                    }}
                    className="font-bold text-center"
                  >
                    {settings.text}
                  </span>
                  <span 
                    style={{ 
                      color: settings.fontColor,
                      fontFamily: settings.fontFamily,
                      letterSpacing: `${settings.letterSpacing * 0.8}px`,
                      lineHeight: settings.lineHeight
                    }}
                    className="mt-2 text-sm font-medium"
                  >
                    {settings.slogan}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-6 space-y-6 bg-white rounded-lg shadow">
            {step === 1 && (
              <div>
                <h3 className="mb-4 text-lg font-medium">Select Your Industry</h3>
                <div className="grid grid-cols-3 gap-4">
                  {industries.map((industry) => {
                    const Icon = industry.icon;
                    return (
                      <button
                        key={industry.name}
                        onClick={() => setSettings({ 
                          ...settings, 
                          industry: industry.name,
                          shapeColor: industry.color 
                        })}
                        className={`p-4 rounded-lg border ${
                          settings.industry === industry.name 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-200'
                        } flex flex-col items-center gap-2`}
                      >
                        <Icon size={24} color={industry.color} />
                        <span className="text-sm text-center">{industry.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="mb-4 text-lg font-medium">Choose a Template</h3>
                <div className="space-y-4">
                  {templates.map((template) => (
                    <button
                      key={template.name}
                      onClick={() => setSettings({
                        ...settings,
                        template: template.name,
                        fontColor: template.colors[0],
                        backgroundColor: template.colors[1],
                        fontSize: template.fontSize,
                        fontFamily: template.fontFamily,
                        letterSpacing: template.letterSpacing,
                        lineHeight: template.lineHeight
                      })}
                      className={`w-full p-4 rounded-lg border ${
                        settings.template === template.name 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{template.name}</span>
                        <div className="flex gap-2">
                          {template.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 border border-gray-200 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <>
                {/* Text Settings */}
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-medium">
                    <Type size={20} /> Text Settings
                  </h3>
                  <div className="mt-3 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company Name</label>
                      <input
                        type="text"
                        value={settings.text}
                        onChange={(e) => setSettings({ ...settings, text: e.target.value })}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Slogan</label>
                      <input
                        type="text"
                        value={settings.slogan}
                        onChange={(e) => setSettings({ ...settings, slogan: e.target.value })}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Font Family</label>
                      <select
                        value={settings.fontFamily}
                        onChange={(e) => setSettings({ ...settings, fontFamily: e.target.value })}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        {fontFamilies.map(font => (
                          <option key={font} value={font}>{font.split(',')[0]}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Font Size</label>
                      <input
                        type="range"
                        min="16"
                        max="72"
                        value={settings.fontSize}
                        onChange={(e) => setSettings({ ...settings, fontSize: Number(e.target.value) })}
                        className="block w-full mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Letter Spacing</label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={settings.letterSpacing}
                        onChange={(e) => setSettings({ ...settings, letterSpacing: Number(e.target.value) })}
                        className="block w-full mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Line Height</label>
                      <input
                        type="range"
                        min="1"
                        max="2"
                        step="0.1"
                        value={settings.lineHeight}
                        onChange={(e) => setSettings({ ...settings, lineHeight: Number(e.target.value) })}
                        className="block w-full mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Font Color</label>
                      <input
                        type="color"
                        value={settings.fontColor}
                        onChange={(e) => setSettings({ ...settings, fontColor: e.target.value })}
                        className="block w-full h-10 mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Layout Settings */}
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-medium">
                    <Layout size={20} /> Layout
                  </h3>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {(['icon-left', 'icon-top', 'icon-right'] as const).map((layout) => (
                      <button
                        key={layout}
                        onClick={() => setSettings({ ...settings, layout })}
                        className={`p-4 rounded-lg border ${
                          settings.layout === layout
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-200'
                        }`}
                      >
                        <div className={`flex ${
                          layout === 'icon-top' ? 'flex-col' :
                          layout === 'icon-left' ? 'flex-row' :
                          'flex-row-reverse'
                        } items-center justify-center gap-2`}>
                          <div className="w-3 h-3 bg-gray-400 rounded-full" />
                          <div className="w-8 h-2 bg-gray-400 rounded" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Icon Settings */}
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-medium">
                    <Image size={20} /> Icon Settings
                  </h3>
                  <div className="mt-3 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Icon Size</label>
                      <input
                        type="range"
                        min="24"
                        max="96"
                        value={settings.iconSize}
                        onChange={(e) => setSettings({ ...settings, iconSize: Number(e.target.value) })}
                        className="block w-full mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Icon Color</label>
                      <input
                        type="color"
                        value={settings.shapeColor}
                        onChange={(e) => setSettings({ ...settings, shapeColor: e.target.value })}
                        className="block w-full h-10 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Opacity</label>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={settings.opacity}
                        onChange={(e) => setSettings({ ...settings, opacity: Number(e.target.value) })}
                        className="block w-full mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Rotation</label>
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        value={settings.rotation}
                        onChange={(e) => setSettings({ ...settings, rotation: Number(e.target.value) })}
                        className="block w-full mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Background Settings */}
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-medium">
                    <PaintBucket size={20} /> Background
                  </h3>
                  <div className="mt-3">
                    <input
                      type="color"
                      value={settings.backgroundColor}
                      onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                      className="block w-full h-10"
                    />
                  </div>
                </div>
              </>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Download Your Logo</h3>
                  <p className="mb-6 text-gray-600">Your logo is ready! Choose your preferred format and download.</p>
                  
                  <div className="space-y-4">
                    <button
                      onClick={() => handleDownload('png')}
                      className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Download size={20} />
                      Download PNG
                    </button>
                    
                    <button
                      onClick={() => handleDownload('svg')}
                      className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Download size={20} />
                      Download SVG
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;