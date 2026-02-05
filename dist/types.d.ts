/**
 * Core type definitions for Fabric Kit library
 * Provides type-safe wrappers around Fabric.js objects
 */
import { Canvas, Circle, FabricImage as FabricImageClass, FabricObject as FabricObjectClass, Group, IText, Line, Rect, TCrossOrigin, Triangle } from 'fabric';
/**
 * Base Fabric.js object type wrapper
 */
export type FabricObject = FabricObjectClass;
/**
 * Fabric.js canvas type wrapper
 */
export type FabricCanvas = Canvas;
/**
 * Fabric.js rectangle type
 */
export type FabricRectangle = Rect;
/**
 * Fabric.js circle type
 */
export type FabricCircle = Circle;
/**
 * Fabric.js triangle type
 */
export type FabricTriangle = Triangle;
/**
 * Fabric.js line type
 */
export type FabricLine = Line;
/**
 * Fabric.js text type (interactive/editable)
 */
export type FabricText = IText;
/**
 * Fabric.js image type
 */
export type FabricImage = FabricImageClass;
/**
 * Fabric.js group type
 */
export type FabricGroup = Group;
/**
 * Point coordinates
 */
export interface Point {
    x: number;
    y: number;
}
/**
 * Size dimensions
 */
export interface Size {
    width: number;
    height: number;
}
/**
 * Bounding box
 */
export interface BoundingBox {
    left: number;
    top: number;
    width: number;
    height: number;
}
/**
 * Selection control styling configuration
 * Controls the appearance of object selection controls (corners and borders)
 */
export interface SelectionStyleConfig {
    /** Whether corners should be transparent or filled (default: FabricJS default) */
    transparentCorners?: boolean;
    /** Corner fill color (default: FabricJS default) */
    cornerColor?: string;
    /** Corner stroke color (default: FabricJS default) */
    cornerStrokeColor?: string;
    /** Corner shape style (default: FabricJS default) */
    cornerStyle?: 'circle' | 'rect';
    /** Selection border color (default: FabricJS default) */
    borderColor?: string;
    /** Corner size in pixels (default: FabricJS default) */
    cornerSize?: number;
}
/**
 * Common options for shapes
 */
export interface ShapeOptions {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    opacity?: number;
    angle?: number;
    scaleX?: number;
    scaleY?: number;
    selectable?: boolean;
    evented?: boolean;
    id?: string;
    data?: any;
    locked?: boolean;
    setAsSelected?: boolean;
}
/**
 * Rectangle options
 */
export interface RectangleOptions extends ShapeOptions {
    rx?: number;
    ry?: number;
}
/**
 * Square options (width = height)
 */
export interface SquareOptions extends Omit<ShapeOptions, 'height'> {
    size?: number;
}
/**
 * Circle options
 */
export interface CircleOptions extends Omit<ShapeOptions, 'width' | 'height'> {
    radius?: number;
}
/**
 * Triangle options
 */
export interface TriangleOptions extends ShapeOptions {
}
/**
 * Line options
 */
export interface LineOptions extends Omit<ShapeOptions, 'width' | 'height'> {
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
}
/**
 * Arrow options
 */
export interface ArrowOptions extends LineOptions {
    arrowSize?: number;
}
/**
 * Text options
 */
export interface TextOptions extends ShapeOptions {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string | number;
    fontStyle?: string;
    underline?: boolean;
    textAlign?: 'left' | 'center' | 'right';
    lineHeight?: number;
}
/**
 * Image options
 */
export interface ImageOptions extends ShapeOptions {
    crossOrigin?: TCrossOrigin;
}
/**
 * Image to add with optional data and position
 */
export interface ImageToAdd extends ImageOptions {
    url: string;
    data?: any;
    id?: string;
}
/**
 * Configuration for adding multiple images with animation
 */
export interface MultipleImagesConfig {
    spacing?: number;
    itemsPerRow?: number;
    duration?: number;
    easing?: string;
    selectLast?: boolean;
}
/**
 * Image filter types
 */
export type ImageFilter = 'Grayscale' | 'Blur' | 'Brightness' | 'Contrast' | 'Saturation' | 'Sepia' | 'Invert';
/**
 * Selection event data
 */
export interface SelectionEvent {
    selected: FabricObject[];
    deselected: FabricObject[];
}
/**
 * History state
 */
export interface HistoryState {
    canUndo: boolean;
    canRedo: boolean;
}
/**
 * Serialization options
 */
export interface SerializationOptions {
    format?: 'json' | 'object';
    propertiesToInclude?: string[];
}
/**
 * Canvas JSON structure
 */
export interface CanvasJSON {
    version?: string;
    objects: any[];
    background?: string;
    [key: string]: any;
}
/**
 * Export options
 */
export interface ExportOptions {
    format?: 'png' | 'jpeg' | 'webp';
    quality?: number;
    multiplier?: number;
    width?: number;
    height?: number;
    backgroundColor?: string;
}
/**
 * SVG export options
 */
export interface SVGOptions {
    suppressPreamble?: boolean;
    viewBox?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    encoding?: 'UTF-8';
    width?: number;
    height?: number;
}
/**
 * PDF export options
 */
export interface PDFOptions extends Omit<ExportOptions, 'format'> {
    orientation?: 'portrait' | 'landscape';
    unit?: 'pt' | 'mm' | 'cm' | 'in';
    format?: 'a3' | 'a4' | 'a5' | 'letter' | 'legal';
}
/**
 * Zoom to fit options
 */
export interface ZoomToFitOptions {
    padding?: number;
    maxZoom?: number;
    minZoom?: number;
}
/**
 * Arrow key options
 */
export interface ArrowKeyOptions {
    distance?: number;
    scaleWithZoom?: boolean;
}
/**
 * Touch pan options
 */
export interface TouchPanOptions {
    maxJumpDistance?: number;
    enabled?: boolean;
}
/**
 * Crop options
 */
export interface CropOptions {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
}
/**
 * Animation properties
 */
export interface AnimationProperties {
    [key: string]: any;
}
/**
 * Animation options
 */
export interface AnimationOptions {
    duration?: number;
    easing?: string | ((t: number, b: number, c: number, d: number) => number);
    onChange?: () => void;
    onComplete?: () => void;
}
/**
 * Responsive options
 */
export interface ResponsiveOptions {
    enabled?: boolean;
    maintainAspectRatio?: boolean;
}
/**
 * Eraser options
 */
export interface EraserOptions {
    width?: number;
    color?: string;
}
/**
 * Object inspection for debugging
 */
export interface ObjectInspection {
    type: string;
    left: number;
    top: number;
    width: number;
    height: number;
    angle: number;
    scaleX: number;
    scaleY: number;
    fill?: string;
    stroke?: string;
    opacity: number;
    [key: string]: any;
}
/**
 * Object filter function
 */
export type ObjectFilter = (obj: FabricObject) => boolean;
/**
 * Custom object class
 */
export type CustomObjectClass = typeof FabricObjectClass;
/**
 * Module augmentation to add custom properties to all Fabric.js objects
 * This ensures these properties are always available and included in serialization
 */
declare module 'fabric' {
    interface FabricObject {
        id?: string;
        data?: any;
        locked?: boolean;
    }
    interface SerializedObjectProps {
        id?: string;
        data?: any;
        locked?: boolean;
    }
}
//# sourceMappingURL=types.d.ts.map