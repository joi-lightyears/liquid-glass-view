"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import LiquidGlassView from "./liquid-glass-view"

interface LiquidSliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  label?: string
  value?: number[]
  onValueChange?: (value: number[]) => void
  springAnimation?: boolean
}

const LiquidSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  LiquidSliderProps
>(({ className, label, value, onValueChange, springAnimation = true, ...props }, ref) => {
  const [isDragging, setIsDragging] = React.useState(false)
  const [thumbPosition, setThumbPosition] = React.useState(0)
  const [bubblePosition, setBubblePosition] = React.useState(0)
  const sliderRef = React.useRef<HTMLDivElement>(null)

  const calculateThumbPosition = React.useCallback((currentValue: number[]) => {
    if (sliderRef.current && props.min !== undefined && props.max !== undefined) {
      const percentage = ((currentValue[0] - props.min) / (props.max - props.min)) * 100
      const sliderRect = sliderRef.current.getBoundingClientRect()
      const thumbPos = (percentage / 100) * sliderRect.width
      setThumbPosition(thumbPos)
      
      const bubbleWidth = 60
      const sliderWidth = sliderRect.width
      const bufferSpace = -10 
      
      const idealBubbleLeft = thumbPos - (bubbleWidth / 2)
      
      const minLeft = bufferSpace
      const maxLeft = sliderWidth - bubbleWidth - bufferSpace
      const constrainedLeft = Math.max(minLeft, Math.min(maxLeft, idealBubbleLeft))
      
      setBubblePosition(constrainedLeft)
    }
  }, [props.min, props.max])

  const handleValueChange = (newValue: number[]) => {
    if (onValueChange) {
      onValueChange(newValue)
    }
    calculateThumbPosition(newValue)
  }

  React.useEffect(() => {
    if (value && value.length > 0) {
      calculateThumbPosition(value)
    }
  }, [value, calculateThumbPosition])

  React.useEffect(() => {
    const handleResize = () => {
      if (value && value.length > 0) {
        calculateThumbPosition(value)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [value, calculateThumbPosition])

  const handlePointerDown = () => {
    setIsDragging(true)
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  React.useEffect(() => {
    const handleGlobalPointerUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('pointerup', handleGlobalPointerUp)
      document.addEventListener('mouseup', handleGlobalPointerUp)
    }

    return () => {
      document.removeEventListener('pointerup', handleGlobalPointerUp)
      document.removeEventListener('mouseup', handleGlobalPointerUp)
    }
  }, [isDragging])

  return (
    <div className="relative">
      <SliderPrimitive.Root
        ref={sliderRef}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        value={value}
        onValueChange={handleValueChange}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
          <SliderPrimitive.Range className="absolute h-full" style={{ backgroundColor: '#34c85a' }} />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb 
          className={cn(
            "block h-4 w-8 rounded-full bg-background shadow-md transition-all duration-200 focus:outline-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
            isDragging ? "opacity-0" : "opacity-100"
          )}
        />
      </SliderPrimitive.Root>
      
      <motion.div 
        className="absolute pointer-events-none z-50"
        style={{
          left: `${bubblePosition}px`,
          top: '-160%',
          display: isDragging ? 'block' : 'none',
        }}
        animate={{
          width: isDragging ? 60 : 30,
          height: isDragging ? 35 : 20,
          transition: {
            type: "spring",
            damping: 15,
            stiffness: 300,
            mass: 0.8
          }
        }}
      >
        <LiquidGlassView
          width={isDragging ? 60 : 30}
          height={isDragging ? 35 : 20}
          cornerRadius={17}
          darknessOpacity={0}
          darknessBlur={0}
          lightnessOpacity={0}
          lightnessBlur={0}
          centerDistortion={0}
          centerSize={17}
          preBlur={0}
          postBlur={0}
          iridescence={5}
          // transitionAnimationSpring={true}
        />
      </motion.div>
    </div>
  )
})

LiquidSlider.displayName = "LiquidSlider"

export { LiquidSlider } 