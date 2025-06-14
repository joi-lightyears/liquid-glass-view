"use client"

import { useState } from "react"
import LiquidGlassView from "@/components/liquid-glass-view"
import { LiquidSlider } from "@/components/liquid-slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function Home() {
  const [settings, setSettings] = useState({
    width: 300,
    height: 200,
    cornerRadius: 25,
    darknessOpacity: 17,
    darknessBlur: 0,
    lightnessOpacity: 0,
    lightnessBlur: 15,
    centerDistortion: 68,
    centerSize: 15,
    preBlur: 7,
    postBlur: 0,
    iridescence: 20,
    draggable: true,
    darkMode: true
  })

  const updateSetting = (key: string, value: number) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const updateBooleanSetting = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <main className={`min-h-screen p-8 transition-all duration-300 ${
      settings.darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-black' 
        : 'bg-gradient-to-br from-purple-50 to-blue-50'
    }`}>
      <style jsx>{`
        .gradient-text {
          background: ${settings.darkMode 
            ? 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 25%, #d1d5db 50%, #9ca3af 75%, #6b7280 100%)'
            : 'linear-gradient(135deg, #374151 0%, #6b7280 25%, #4b5563 50%, #1f2937 75%, #000000 100%)'
          };
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          text-shadow: ${settings.darkMode 
            ? '0 4px 16px rgba(229, 231, 235, 0.3)'
            : '0 4px 16px rgba(75, 85, 99, 0.3)'
          };
          filter: ${settings.darkMode 
            ? 'drop-shadow(0 4px 16px rgba(229, 231, 235, 0.2))'
            : 'drop-shadow(0 4px 16px rgba(75, 85, 99, 0.2))'
          };
        }
        
        .gradient-text:hover {
          transform: scale(1.02);
          filter: ${settings.darkMode 
            ? 'drop-shadow(0 8px 32px rgba(229, 231, 235, 0.4))'
            : 'drop-shadow(0 8px 32px rgba(75, 85, 99, 0.4))'
          };
        }
      `}</style>
      
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-4 text-center gradient-text transition-all duration-300">
        Liquid Glass View
      </h1>
      
      <p className={`text-lg md:text-xl text-center mb-5 font-medium transition-colors duration-300 ${
        settings.darkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        Made by Thanh Dat (Joi) - <a 
          href="https://github.com/joi-lightyears/liquid-glass-view" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`font-bold transition-colors ${
            settings.darkMode 
              ? 'text-gray-300 hover:text-white' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Source code
        </a>
      </p>

      {/* Settings and Preview Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
        {/* Controls */}
        <div className={`p-6 rounded-3xl shadow-lg xl:order-2 h-fit transition-all duration-300 ${
          settings.darkMode 
            ? 'bg-gray-800/90 backdrop-blur-sm' 
            : 'bg-white/80 backdrop-blur-sm'
        }`}>
          <h2 className={`text-xl font-semibold mb-6 transition-colors duration-300 ${
            settings.darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Customize Your Glass
          </h2>
          
          {/* Toggle Controls */}
          <div className={`mb-6 p-4 rounded-2xl transition-colors duration-300 ${
            settings.darkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Draggable Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="draggable" className={`text-base font-medium transition-colors duration-300 ${
                    settings.darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Enable Dragging
                  </Label>
                  <p className={`text-sm mt-1 transition-colors duration-300 ${
                    settings.darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Allow the glass view to be dragged
                  </p>
                </div>
                <Switch
                  id="draggable"
                  checked={settings.draggable}
                  onCheckedChange={(checked) => updateBooleanSetting("draggable", checked)}
                  className="data-[state=checked]:bg-[#34c85a]"
                />
              </div>

              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="darkMode" className={`text-base font-medium transition-colors duration-300 ${
                    settings.darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Dark Mode
                  </Label>
                  <p className={`text-sm mt-1 transition-colors duration-300 ${
                    settings.darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Switch to dark theme
                  </p>
                </div>
                <Switch
                  id="darkMode"
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => updateBooleanSetting("darkMode", checked)}
                  className="data-[state=checked]:bg-[#34c85a]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="width" className={`transition-colors duration-300 ${
                  settings.darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Width: {settings.width}px
                </Label>
                <LiquidSlider
                  id="width"
                  min={100}
                  max={300}
                  step={10}
                  value={[settings.width]}
                  onValueChange={(value) => updateSetting("width", value[0])}
                />
              </div>

              <div>
                <Label htmlFor="height" className={`transition-colors duration-300 ${
                  settings.darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Height: {settings.height}px
                </Label>
                <LiquidSlider
                  id="height"
                  min={100}
                  max={300}
                  step={10}
                  value={[settings.height]}
                  onValueChange={(value) => updateSetting("height", value[0])}
                />
              </div>

              <div>
                <Label htmlFor="cornerRadius" className={`transition-colors duration-300 ${
                  settings.darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Corner Radius: {settings.cornerRadius}px
                </Label>
                <LiquidSlider
                  id="cornerRadius"
                  min={0}
                  max={150}
                  value={[settings.cornerRadius]}
                  onValueChange={(value) => updateSetting("cornerRadius", value[0])}
                />
              </div>

              <div>
                <Label htmlFor="darknessOpacity" className={`transition-colors duration-300 ${
                  settings.darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Darkness Opacity: {settings.darknessOpacity}%
                </Label>
                <LiquidSlider
                  id="darknessOpacity"
                  min={0}
                  max={100}
                  value={[settings.darknessOpacity]}
                  onValueChange={(value) => updateSetting("darknessOpacity", value[0])}
                />
              </div>

              <div>
                <Label htmlFor="darknessBlur" className={`transition-colors duration-300 ${
                  settings.darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Darkness Blur: {settings.darknessBlur}px
                </Label>
                <LiquidSlider
                  id="darknessBlur"
                  min={0}
                  max={50}
                  value={[settings.darknessBlur]}
                  onValueChange={(value) => updateSetting("darknessBlur", value[0])}
                />
              </div>

              <div>
                <Label htmlFor="lightnessOpacity" className={`transition-colors duration-300 ${
                  settings.darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Lightness Opacity: {settings.lightnessOpacity}%
                </Label>
                <LiquidSlider
                  id="lightnessOpacity"
                  min={0}
                  max={100}
                  value={[settings.lightnessOpacity]}
                  onValueChange={(value) => updateSetting("lightnessOpacity", value[0])}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="lightnessBlur" className={`transition-colors duration-300 ${
                  settings.darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Lightness Blur: {settings.lightnessBlur}px
                </Label>
                <LiquidSlider
                  id="lightnessBlur"
                  min={0}
                  max={50}
                  value={[settings.lightnessBlur]}
                  onValueChange={(value) => updateSetting("lightnessBlur", value[0])}
                />
              </div>

              <div>
                <Label htmlFor="centerDistortion" className={`transition-colors duration-300 ${
                  settings.darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Center Distortion: {settings.centerDistortion}
                </Label>
                <LiquidSlider
                  id="centerDistortion"
                  min={0}
                  max={255}
                  value={[settings.centerDistortion]}
                  onValueChange={(value) => updateSetting("centerDistortion", value[0])}
                />
              </div>

              <div>
                <Label htmlFor="centerSize" className={`transition-colors duration-300 ${
                  settings.darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Center Size: {settings.centerSize}
                </Label>
                <LiquidSlider
                  id="centerSize"
                  min={0}
                  max={20}
                  value={[settings.centerSize]}
                  onValueChange={(value) => updateSetting("centerSize", value[0])}
                />
              </div>

              <div>
                <Label htmlFor="preBlur" className={`transition-colors duration-300 ${
                  settings.darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Pre-blur: {settings.preBlur}
                </Label>
                <LiquidSlider
                  id="preBlur"
                  min={0}
                  max={100}
                  value={[settings.preBlur]}
                  onValueChange={(value) => updateSetting("preBlur", value[0])}
                />
              </div>

              <div>
                <Label htmlFor="postBlur" className={`transition-colors duration-300 ${
                  settings.darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Post-blur: {settings.postBlur}
                </Label>
                <LiquidSlider
                  id="postBlur"
                  min={0}
                  max={100}
                  value={[settings.postBlur]}
                  onValueChange={(value) => updateSetting("postBlur", value[0])}
                />
              </div>

              <div>
                <Label htmlFor="iridescence" className={`transition-colors duration-300 ${
                  settings.darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  Iridescence: {settings.iridescence}
                </Label>
                <LiquidSlider
                  id="iridescence"
                  min={0}
                  max={50}
                  value={[settings.iridescence]}
                  onValueChange={(value) => updateSetting("iridescence", value[0])}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="relative bg-[url('/images/whale-background.jpeg')] bg-cover bg-center rounded-3xl flex items-center justify-center xl:order-1">
          <div className="flex items-center justify-center p-8">
          <LiquidGlassView {...settings} className="flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2 text-white">
                Liquid Glass
              </h3>
              <p className="text-sm opacity-80 text-gray-300">
                Adjust the settings to see changes in real-time
              </p>
            </div>
          </LiquidGlassView>
          </div>
        </div>
      </div>
    </main>
  )
}
