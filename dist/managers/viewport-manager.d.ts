/**
 * Viewport Manager
 * Handles viewport operations (zoom, pan, fit-to-screen)
 */
import { FabricCanvas, Point, ZoomToFitOptions } from '../types';
import { EventManager } from './event-manager';
/**
 * Viewport Manager class
 * Manages viewport zoom and pan operations
 */
export declare class ViewportManager {
    private canvas;
    private eventManager;
    private debug;
    private minZoom;
    private maxZoom;
    constructor(canvas: FabricCanvas, eventManager: EventManager, minZoom?: number, maxZoom?: number, debug?: boolean);
    /**
     * Gets current zoom level
     * @returns Current zoom level (1 = 100%)
     */
    getZoom(): number;
    /**
     * Sets zoom level with min/max constraints
     * @param level - Zoom level (1 = 100%)
     */
    setZoom(level: number): void;
    /**
     * Zooms in by specified step
     * @param step - Zoom step (default 1.1 = 110%)
     */
    zoomIn(step?: number): void;
    /**
     * Zooms out by specified step
     * @param step - Zoom step (default 1.1 = 110%)
     */
    zoomOut(step?: number): void;
    /**
     * Resets zoom to 100%
     */
    resetZoom(): void;
    /**
     * Zooms to fit all objects with optional padding
     * Calculates optimal zoom level to fit all objects within the viewport
     * @param options - Zoom to fit options
     */
    fitToScreen(options?: ZoomToFitOptions): void;
    /**
     * Pans viewport by relative offset
     * @param offset - Pan offset
     */
    pan(offset: Point): void;
    /**
     * Resets viewport pan to origin
     */
    resetPan(): void;
    /**
     * Sets absolute pan position
     * @param position - Absolute position
     */
    absolutePan(position: Point): void;
    /**
     * Gets current viewport transform matrix
     * @returns Viewport transform matrix
     */
    getViewportTransform(): [number, number, number, number, number, number];
    /**
     * Sets viewport transform matrix
     * @param transform - Transform matrix
     */
    setViewportTransform(transform: [number, number, number, number, number, number]): void;
    /**
     * Centers viewport on specific object
     * @param object - Object to center on
     */
    centerOn(object: any): void;
    /**
     * Gets the center point of the canvas
     * Returns the absolute center coordinates of the canvas
     * @returns Center point of the canvas {x, y}
     */
    getCenterPoint(): Point;
    /**
     * Cleans up any event listeners or resources
     * Currently no cleanup needed
     */
    destroy(): void;
}
//# sourceMappingURL=viewport-manager.d.ts.map