"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { motion, AnimatePresence } from "framer-motion"
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
      
      <AnimatePresence>
        {isDragging && (
          <motion.div 
            className="absolute pointer-events-none z-50"
            style={{
              left: `${bubblePosition}px`,
              top: '-160%',
            }}
            initial={springAnimation ? { 
              scale: 0, 
              opacity: 0,
            } : { 
              scale: 0.8, 
              opacity: 0 
            }}
            animate={springAnimation ? { 
              scale: 1, 
              opacity: 1,
              transition: {
                type: "spring",
                damping: 15,
                stiffness: 300,
                mass: 0.8
              }
            } : { 
              scale: 1, 
              opacity: 1,
              transition: { duration: 0.2 }
            }}
            exit={springAnimation ? { 
              scale: 0.8, 
              opacity: 0,
              y: 10,
              transition: {
                type: "spring",
                damping: 20,
                stiffness: 400,
                mass: 0.5
              }
            } : { 
              scale: 0.8, 
              opacity: 0,
              transition: { duration: 0.15 }
            }}
          >
            <LiquidGlassView
              width={60}
              height={35}
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
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

LiquidSlider.displayName = "LiquidSlider"

export { LiquidSlider } 