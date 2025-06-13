"use client"

import type React from "react"
import { useEffect, useRef, useState, useId } from "react"
import { motion } from "framer-motion"

interface LiquidGlassViewProps {
  children?: React.ReactNode
  width?: number
  height?: number
  cornerRadius?: number
  darknessOpacity?: number
  darknessBlur?: number
  lightnessOpacity?: number
  lightnessBlur?: number
  centerDistortion?: number
  centerSize?: number
  preBlur?: number
  postBlur?: number
  iridescence?: number
  className?: string
  style?: React.CSSProperties
  draggable?: boolean
  dragAnimation?: boolean
}

export default function LiquidGlassView({
  children,
  width = 100,
  height = 100,
  cornerRadius = 25,
  darknessOpacity = 17,
  darknessBlur = 5,
  lightnessOpacity = 17,
  lightnessBlur = 15,
  centerDistortion = 68,
  centerSize = 15,
  preBlur = 7,
  postBlur = 0,
  iridescence = 20,
  className = "",
  style = {},
  draggable = false,
  dragAnimation = true,
}: LiquidGlassViewProps) {
  const id = useId()
  const [filterId] = useState(`liquid-glass-filter-${id.replace(/:/g, '')}`)
  const [isHovered, setIsHovered] = useState(false)
  const [dragDirection, setDragDirection] = useState<'none' | 'horizontal' | 'vertical'>('none')
  const lastDragPos = useRef({ x: 0, y: 0 })

  const handleDragStart = () => {
    lastDragPos.current = { x: 0, y: 0 }
    setDragDirection('none')
  }

  const handleDrag = (event: any, info: { offset: { x: number; y: number } }) => {
    const xDiff = Math.abs(info.offset.x - lastDragPos.current.x)
    const yDiff = Math.abs(info.offset.y - lastDragPos.current.y)
    
    if (dragDirection === 'none' && (xDiff > 5 || yDiff > 5)) {
      setDragDirection(xDiff > yDiff ? 'horizontal' : 'vertical')
    }
    
    lastDragPos.current = { x: info.offset.x, y: info.offset.y }
  }

  const handleDragEnd = () => {
    setDragDirection('none')
  }

  const containerWidth = width
  const containerHeight = height

  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const thing9Ref = useRef<SVGFEImageElement>(null)
  const thing0Ref = useRef<SVGFEImageElement>(null)
  const thing1Ref = useRef<SVGFEImageElement>(null)
  const thing2Ref = useRef<SVGFEImageElement>(null)
  const preblurRef = useRef<SVGFEGaussianBlurElement>(null)
  const postblurRef = useRef<SVGFEGaussianBlurElement>(null)
  const dispRRef = useRef<SVGFEDisplacementMapElement>(null)
  const dispGRef = useRef<SVGFEDisplacementMapElement>(null)
  const dispBRef = useRef<SVGFEDisplacementMapElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    svgRef.current.setAttribute("width", `${width}`)
    svgRef.current.setAttribute("height", `${height}`)
    svgRef.current.setAttribute("viewBox", `0 0 ${width} ${height}`)

    const glassWidth = width
    const glassHeight = height
    const glassX = 0
    const glassY = 0

    if (thing9Ref.current) {
      thing9Ref.current.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "href",
        `data:image/svg+xml,%3Csvg width='${width}' height='${height}' viewBox='0 0 ${width} ${height}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='${glassX}' y='${glassY}' width='${glassWidth}' height='${glassHeight}' rx='${cornerRadius}' fill='rgb%280 0 0 %2F${darknessOpacity / 2.55}%25%29' /%3E%3Crect x='${glassX}' y='${glassY}' width='${glassWidth}' height='${glassHeight}' rx='${cornerRadius}' fill='%23FFF' style='filter:blur(${darknessBlur}px)' /%3E%3C/svg%3E`,
      )
    }

    if (thing0Ref.current) {
      thing0Ref.current.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "href",
        `data:image/svg+xml,%3Csvg width='${width}' height='${height}' viewBox='0 0 ${width} ${height}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='${glassX}' y='${glassY}' width='${glassWidth}' height='${glassHeight}' rx='${cornerRadius}' fill='rgb%28255 255 255 %2F${lightnessOpacity / 2.55}%25%29' style='filter:blur(${lightnessBlur}px)' /%3E%3C/svg%3E`,
      )
    }

    if (thing1Ref.current) {
      thing1Ref.current.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "href",
        `data:image/svg+xml,%3Csvg width='${width}' height='${height}' viewBox='0 0 ${width} ${height}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='${glassX}' y='${glassY}' width='${glassWidth}' height='${glassHeight}' rx='${cornerRadius}' fill='%23000' /%3E%3C/svg%3E`,
      )
    }

    if (thing2Ref.current) {
      thing2Ref.current.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "href",
        `data:image/svg+xml,%3Csvg width='${width}' height='${height}' viewBox='0 0 ${width} ${height}' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='gradient1' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%23000'/%3E%3Cstop offset='100%25' stop-color='%2300F'/%3E%3C/linearGradient%3E%3ClinearGradient id='gradient2' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23000'/%3E%3Cstop offset='100%25' stop-color='%230F0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='0' width='${width}' height='${height}' rx='${cornerRadius}' fill='%237F7F7F' /%3E%3Crect x='${glassX}' y='${glassY}' width='${glassWidth}' height='${glassHeight}' rx='${cornerRadius}' fill='%23000' /%3E%3Crect x='${glassX}' y='${glassY}' width='${glassWidth}' height='${glassHeight}' rx='${cornerRadius}' fill='url(%23gradient1)' style='mix-blend-mode: screen' /%3E%3Crect x='${glassX}' y='${glassY}' width='${glassWidth}' height='${glassHeight}' rx='${cornerRadius}' fill='url(%23gradient2)' style='mix-blend-mode: screen' /%3E%3Crect x='${glassX}' y='${glassY}' width='${glassWidth}' height='${glassHeight}' rx='${cornerRadius}' fill='rgb%28127 127 127 %2F${(255 - centerDistortion) / 2.55}%25%29' style='filter:blur(${20 - centerSize}px)' /%3E%3C/svg%3E`,
      )
    }

    if (preblurRef.current) {
      preblurRef.current.setAttribute("stdDeviation", `${preBlur / 10}`)
    }

    if (postblurRef.current) {
      postblurRef.current.setAttribute("stdDeviation", `${postBlur / 10}`)
    }

    if (dispRRef.current) {
      dispRRef.current.setAttribute("scale", `${-150 + iridescence / 10}`)
    }

    if (dispGRef.current) {
      dispGRef.current.setAttribute("scale", `-150`)
    }

    if (dispBRef.current) {
      dispBRef.current.setAttribute("scale", `${-150 - iridescence / 10}`)
    }
  }, [
    width,
    height,
    cornerRadius,
    darknessOpacity,
    darknessBlur,
    lightnessOpacity,
    lightnessBlur,
    centerDistortion,
    centerSize,
    preBlur,
    postBlur,
    iridescence,
  ])



  return (
    <>
      <motion.div
        ref={containerRef}
        drag={draggable}
        dragMomentum={false}
        dragElastic={0.1}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { type: "spring", damping: 20, stiffness: 250 },
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
          transition: { type: "spring", damping: 25, stiffness: 300, duration: 0.3 },
        }}
        whileHover={draggable ? { scale: 1.05, transition: { type: "spring", damping: 20, stiffness: 300 } } : {}}
        whileDrag={dragAnimation ? (dragDirection === 'horizontal' ? {
          scaleX: 1.15,
          scaleY: 1.15,
          transition: {
            type: "spring",
            damping: 2,
            stiffness: 20,
            mass: 0.1,
            restSpeed: 0.2,
            restDelta: 0.01,
            bounce: 2
          }
        } : dragDirection === 'vertical' ? {
          scaleX: 1.15,
          scaleY: 1.15,
          transition: {
            type: "spring",
            damping: 2,
            stiffness: 20,
            mass: 0.1,
            restSpeed: 0.2,
            restDelta: 0.01,
            bounce: 2
          }
        } : {
          scale: 1
        }) : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        className={`liquid-glass-container relative ${className} ${draggable ? "cursor-move" : ""}`}
        style={{
          width: containerWidth,
          height: containerHeight,
          userSelect: "none",
          zIndex: draggable ? 100 : 10,
          ...style,
        }}
      >
        <div className="liquid-glass-content">{children}</div>

        <div
          className="liquid-glass-overlay"
          style={{
            position: "absolute",
            top: "-43px",
            left: "-43px",
            width: "calc(100% + 43px)",
            height: "calc(100% + 43px)",
            backdropFilter: `url(#${filterId})`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      </motion.div>

      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }}
      >
        <filter id={filterId}>
          <feImage ref={thing9Ref} xlinkHref="" x="0%" y="0%" width="100%" height="100%" result="thing9" />
          <feImage ref={thing0Ref} xlinkHref="" x="0%" y="0%" width="100%" height="100%" result="thing0" />
          <feImage ref={thing1Ref} xlinkHref="" x="0%" y="0%" width="100%" height="100%" result="thing1" />
          <feImage ref={thing2Ref} xlinkHref="" x="0%" y="0%" width="100%" height="100%" result="thing2" />
          <feGaussianBlur ref={preblurRef} stdDeviation={preBlur / 10} in="SourceGraphic" result="preblur" />
          <feDisplacementMap
            ref={dispRRef}
            in2="thing2"
            in="preblur"
            scale={-150 + iridescence / 10}
            xChannelSelector="B"
            yChannelSelector="G"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="disp1"
          />
          <feDisplacementMap
            ref={dispGRef}
            in2="thing2"
            in="preblur"
            scale="-150"
            xChannelSelector="B"
            yChannelSelector="G"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0
                    0 1 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="disp2"
          />
          <feDisplacementMap
            ref={dispBRef}
            in2="thing2"
            in="preblur"
            scale={-150 - iridescence / 10}
            xChannelSelector="B"
            yChannelSelector="G"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
            result="disp3"
          />
          <feBlend in2="disp2" mode="screen" />
          <feBlend in2="disp1" mode="screen" />
          <feGaussianBlur ref={postblurRef} stdDeviation={postBlur / 10} />
          <feBlend in2="thing0" mode="screen" />
          <feBlend in2="thing9" mode="multiply" />
          <feComposite in2="thing1" operator="in" />
          <feOffset dx="43" dy="43" />
        </filter>
      </svg>

      <style jsx>{`
        .liquid-glass-container {
          overflow: hidden;
          border-radius: ${cornerRadius}px;
        }
        
        .liquid-glass-content {
          position: relative;
          z-index: 20;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .liquid-glass-overlay {
          border-radius: ${cornerRadius}px;
        }
      `}</style>
    </>
  )
}
