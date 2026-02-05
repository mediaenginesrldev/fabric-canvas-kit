/**
 * Shape Factory
 * Provides methods for creating geometric shapes on the canvas
 *
 */
import { Arrow } from '../extensions/arrow.extension';
import { ArrowOptions, CircleOptions, FabricCanvas, FabricCircle, FabricLine, FabricRectangle, FabricTriangle, LineOptions, RectangleOptions, SquareOptions, TriangleOptions } from '../types';
/**
 * Shape Factory class
 * Handles creation of geometric shapes
 */
export declare class ShapeFactory {
    private canvas;
    private debug;
    constructor(canvas: FabricCanvas, debug?: boolean);
    /**
     * Adds a rectangle to the canvas
     * @param options - Rectangle options
     * @returns Created rectangle object
     */
    addRectangle(options?: RectangleOptions): FabricRectangle;
    /**
     * Adds a square to the canvas
     * @param options - Square options
     * @returns Created square object (Rect with equal width/height)
     */
    addSquare(options?: SquareOptions): FabricRectangle;
    /**
     * Adds a circle to the canvas
     * @param options - Circle options
     * @returns Created circle object
     */
    addCircle(options?: CircleOptions): FabricCircle;
    /**
     * Adds a triangle to the canvas
     * @param options - Triangle options
     * @returns Created triangle object
     */
    addTriangle(options?: TriangleOptions): FabricTriangle;
    /**
     * Adds a line to the canvas
     * @param options - Line options
     * @returns Created line object
     */
    addLine(options?: LineOptions): FabricLine;
    /**
     * Adds an arrow to the canvas using custom Arrow extension
     * @param options - Arrow options
     * @returns Created arrow object
     */
    addArrow(options?: ArrowOptions): Arrow;
}
//# sourceMappingURL=shape-factory.d.ts.map