/**
 * Transform Manager
 * Handles object transformation operations (position, scale, center)
 */
import { FabricCanvas, FabricObject, Point } from '../types';
/**
 * Transform Manager class
 * Manages object transformation operations
 */
export declare class TransformManager {
    private canvas;
    private debug;
    constructor(canvas: FabricCanvas, debug?: boolean);
    /**
     * Centers object on canvas (both horizontally and vertically)
     * @param object - Object to center
     */
    centerObject(object: FabricObject): void;
    /**
     * Centers object horizontally only
     * @param object - Object to center
     */
    centerObjectH(object: FabricObject): void;
    /**
     * Centers object vertically only
     * @param object - Object to center
     */
    centerObjectV(object: FabricObject): void;
    /**
     * Sets object absolute position
     * @param object - Object to position
     * @param position - Position coordinates
     */
    position(object: FabricObject, position: Point): void;
    /**
     * Moves object by relative offset
     * @param object - Object to move
     * @param offset - Offset coordinates
     */
    moveBy(object: FabricObject, offset: Point): void;
    /**
     * Scales object by factor
     * @param object - Object to scale
     * @param factor - Scale factor (1 = 100%, 2 = 200%, etc.)
     */
    scale(object: FabricObject, factor: number): void;
    /**
     * Sets object dimensions
     * @param object - Object to resize
     * @param width - Target width
     * @param height - Target height
     */
    setSize(object: FabricObject, width: number, height: number): void;
    /**
     * Gets object bounding box
     * @param object - Object to measure
     * @returns Bounding box coordinates
     */
    getBounds(object: FabricObject): {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    /**
     * Gets object center point
     * @param object - Object to measure
     * @returns Center point coordinates
     */
    getCenter(object: FabricObject): Point;
    /**
     * Cleans up any event listeners or resources
     * Currently no cleanup needed
     */
    destroy(): void;
}
//# sourceMappingURL=transform-manager.d.ts.map