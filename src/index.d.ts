import type { ReactNode, CSSProperties } from 'react';

export interface LiquidGlassViewProps {
  children?: ReactNode;
  width?: number;
  height?: number;
  cornerRadius?: number;
  darknessOpacity?: number;
  darknessBlur?: number;
  lightnessOpacity?: number;
  lightnessBlur?: number;
  centerDistortion?: number;
  centerSize?: number;
  preBlur?: number;
  postBlur?: number;
  iridescence?: number;
  className?: string;
  style?: CSSProperties;
  draggable?: boolean;
  dragAnimation?: boolean;
  transitionAnimationSpring?: boolean;
}

export declare const LiquidGlassView: React.FC<LiquidGlassViewProps>;

declare module 'react-liquid-glass-view' {
  export { LiquidGlassView, LiquidGlassViewProps };
} 