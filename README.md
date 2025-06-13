# Liquid Glass View

A beautiful, interactive React component that creates a stunning liquid glass effect using advanced SVG filters and CSS backdrop-filter. Built with Next.js, TypeScript, and Framer Motion.

![Liquid Glass View Demo](https://img.shields.io/badge/Demo-Live-brightgreen)

## ✨ Features

- 🌊 **Liquid Glass Effect**: Realistic glass distortion with customizable parameters
- 🎛️ **Interactive Controls**: Real-time customization of all glass properties
- 🖱️ **Draggable Interface**: Optional drag-and-drop functionality with smooth animations
- 📱 **Responsive Design**: Works seamlessly across all devices
- 🎨 **Customizable**: Extensive API for fine-tuning the visual effect
- ⚡ **Performance Optimized**: Uses React hooks and efficient rendering
- 🔧 **TypeScript Support**: Fully typed for better development experience

## 🧪 How the Liquid Glass Effect Works

The liquid glass effect is achieved through a sophisticated combination of technologies:

### 1. **SVG Filter Chain**
The core of the effect uses a complex SVG filter that processes the background content through multiple stages:

```xml
<filter id="liquid-glass-filter">
  <!-- Pre-processing blur -->
  <feGaussianBlur stdDeviation="0.7" in="SourceGraphic" result="preblur" />
  
  <!-- RGB channel displacement for chromatic aberration -->
  <feDisplacementMap in2="distortion-map" scale="-148" xChannelSelector="B" yChannelSelector="G" />
  
  <!-- Color channel separation -->
  <feColorMatrix type="matrix" values="1 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 1 0" result="red-channel" />
  
  <!-- Blend modes for color combination -->
  <feBlend mode="screen" />
  
  <!-- Final compositing and masking -->
  <feComposite operator="in" />
</filter>
```

### 2. **Dynamic Filter Generation**
The component generates unique SVG patterns for each instance:

- **Darkness Layer**: Creates depth with controlled opacity and blur
- **Lightness Layer**: Adds highlights and reflections  
- **Distortion Map**: Generates the liquid-like warping effect
- **Iridescence**: Adds rainbow-like color dispersion

### 3. **CSS Backdrop Filter**
The final glass effect is applied using CSS `backdrop-filter` with the custom SVG filter:

```css
.liquid-glass-overlay {
  backdrop-filter: url(#liquid-glass-filter-unique-id);
  position: absolute;
  /* Positioning and sizing */
}
```

## 🎛️ Liquid Slider Implementation

The `LiquidSlider` component demonstrates advanced usage of the liquid glass effect:

### Real-time Glass Bubble
When dragging the slider, a small liquid glass bubble appears

```tsx
<LiquidGlassView
  width={80}
  height={35}
  cornerRadius={17}
  darknessOpacity={7}
  lightnessOpacity={17}
  centerDistortion={0}
  iridescence={20}
/>
```

### Spring Animations
Uses Framer Motion for fluid animations:

```tsx
<motion.div
  initial={{ scale: 0, opacity: 0 }}
  animate={{ 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 300,
      mass: 0.8
    }
  }}
  exit={{ scale: 0.8, opacity: 0 }}
>
```

## 📖 API Reference

### LiquidGlassView Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to display inside the glass view |
| `width` | `number` | `100` | Width of the glass container in pixels |
| `height` | `number` | `100` | Height of the glass container in pixels |
| `cornerRadius` | `number` | `25` | Border radius of the glass shape |
| `darknessOpacity` | `number` | `17` | Opacity of the dark shadow (0-100) |
| `darknessBlur` | `number` | `5` | Blur amount for the shadow effect |
| `lightnessOpacity` | `number` | `17` | Opacity of the light reflection (0-100) |
| `lightnessBlur` | `number` | `15` | Blur amount for the light effect |
| `centerDistortion` | `number` | `68` | Amount of center distortion (0-255) |
| `centerSize` | `number` | `15` | Size of the center distortion area |
| `preBlur` | `number` | `7` | Pre-processing blur amount |
| `postBlur` | `number` | `0` | Post-processing blur amount |
| `iridescence` | `number` | `20` | Rainbow color dispersion amount |
| `draggable` | `boolean` | `false` | Enable drag functionality |
| `dragAnimation` | `boolean` | `true` | Enable drag animations |
| `className` | `string` | `""` | Additional CSS classes |
| `style` | `CSSProperties` | `{}` | Additional inline styles |

## 🚀 Usage Examples

### Basic Usage

```tsx
import LiquidGlassView from './components/liquid-glass-view'

function App() {
  return (
    <LiquidGlassView width={300} height={200}>
      <div className="text-center">
        <h2>Hello, Glass World!</h2>
        <p>This content appears inside the liquid glass.</p>
      </div>
    </LiquidGlassView>
  )
}
```

### Advanced Configuration

```tsx
<LiquidGlassView
  width={400}
  height={250}
  cornerRadius={30}
  darknessOpacity={25}
  lightnessOpacity={30}
  centerDistortion={80}
  iridescence={35}
  draggable={true}
  className="my-glass-container"
>
  <YourContent />
</LiquidGlassView>
```

### Card-like Interface

```tsx
<LiquidGlassView
  width={320}
  height={180}
  cornerRadius={20}
  darknessOpacity={15}
  lightnessOpacity={20}
  className="shadow-2xl"
>
  <div className="p-6 text-white">
    <h3 className="text-xl font-bold mb-2">Glass Card</h3>
    <p className="text-sm opacity-90">
      Beautiful glass morphism effect
    </p>
  </div>
</LiquidGlassView>
```

## 🎨 Customization Tips

### Creating Different Glass Types

**Subtle Glass** (minimal distortion):
```tsx
darknessOpacity={10}
lightnessOpacity={15}
centerDistortion={30}
iridescence={10}
```

**Dramatic Glass** (high distortion):
```tsx
darknessOpacity={30}
lightnessOpacity={35}
centerDistortion={120}
iridescence={40}
```

**Frosted Glass** (heavy blur):
```tsx
lightnessBlur={25}
preBlur={15}
postBlur={5}
```

### Performance Optimization

- Use consistent `width` and `height` to avoid recalculations
- Limit the number of simultaneous instances
- Consider using `memo()` for static glass components

## 🛠️ Installation & Setup

1. **Clone the repository**:
```bash
git clone https://github.com/joi-lightyears/liquid-glass-view.git
cd liquid-glass-view
```

2. **Install dependencies**:
```bash
npm install
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Open your browser** to `http://localhost:3000`

## 📁 Project Structure

```
liquid-glass-view/
├── components/
│   ├── liquid-glass-view.tsx    # Main glass component
│   ├── liquid-slider.tsx        # Enhanced slider with glass effect
│   └── ui/                      # UI components (label, switch, toast)
├── app/
│   ├── page.tsx                 # Demo page with controls
│   └── globals.css              # Global styles
├── lib/
│   └── utils.ts                 # Utility functions
└── README.md                    # This file
```

## 🎯 Key Technical Features

### Hydration-Safe Rendering
Uses React's `useId()` hook to generate stable, unique filter IDs that work consistently across server and client renders.

### Browser Compatibility
- Modern browsers with CSS backdrop-filter support
- Graceful degradation for older browsers
- Optimized SVG filter chain for performance

### Animation System
- Framer Motion for smooth, spring-based animations
- Configurable drag interactions
- Responsive to user input with haptic-like feedback

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 👨‍💻 Author

**Thanh Dat (Joi)**
- GitHub: [@joi-lightyears](https://github.com/joi-lightyears)

---

Made with ❤️ and advanced CSS/SVG techniques 