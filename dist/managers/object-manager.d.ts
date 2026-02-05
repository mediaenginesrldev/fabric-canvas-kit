/**
 * Object Manager
 * Handles object manipulation operations (z-index, clone, delete, lock, styling)
 *
 */
import { FabricCanvas, FabricObject } from '../types';
import { EventManager } from './event-manager';
/**
 * Object Manager class
 * Manages object manipulation operations
 */
export declare class ObjectManager {
    private canvas;
    private debug;
    private eventManager;
    private boundaryRect;
    private boundaryMoveHandler;
    private boundaryMouseUpHandler;
    private boundaryVisualObject;
    private fadeDistance;
    private minOpacity;
    private maxOpacity;
    constructor(canvas: FabricCanvas, debug?: boolean, eventManager?: EventManager);
    /**
     * Brings object to front of z-order
     * Extracted from presentation-editor lines 1203-1208
     * @param object - Object to bring to front
     */
    bringToFront(object: FabricObject): void;
    /**
     * Sends object to back of z-order
     * Extracted from presentation-editor lines 1210-1214
     * @param object - Object to send to back
     */
    sendToBack(object: FabricObject): void;
    /**
     * Brings object one level forward in z-order
     * @param object - Object to bring forward
     */
    bringForward(object: FabricObject): void;
    /**
     * Sends object one level backward in z-order
     * @param object - Object to send backward
     */
    sendBackward(object: FabricObject): void;
    /**
     * Clones an object
     * Extracted from presentation-editor lines 1216-1240 with eraser cloning
     * @param object - Object to clone
     * @returns Promise resolving to cloned object
     */
    clone(object: FabricObject): Promise<FabricObject>;
    /**
     * Deletes object from canvas
     * Extracted from presentation-editor lines 1154-1174
     * @param object - Object to delete
     */
    delete(object: FabricObject): void;
    /**
     * Deletes currently selected object(s)
     */
    deleteSelected(): void;
    /**
     * Removes all objects from canvas
     */
    clear(): void;
    /**
     * Locks object to prevent modifications
     * @param object - Object to lock
     */
    lock(object: FabricObject): void;
    /**
     * Unlocks object to allow modifications
     * @param object - Object to unlock
     */
    unlock(object: FabricObject): void;
    /**
     * Toggles lock state of object
     * @param object - Object to toggle lock
     */
    toggleLock(object: FabricObject): void;
    /**
     * Returns whether object is locked
     * @param object - Object to check
     * @returns True if locked, false otherwise
     */
    isLocked(object: FabricObject): boolean;
    /**
     * Sets object fill color
     * @param object - Object to modify
     * @param color - Fill color
     */
    setFill(object: FabricObject, color: string): void;
    /**
     * Sets object stroke color
     * @param object - Object to modify
     * @param color - Stroke color
     */
    setStroke(object: FabricObject, color: string): void;
    /**
     * Sets object stroke width
     * @param object - Object to modify
     * @param width - Stroke width
     */
    setStrokeWidth(object: FabricObject, width: number): void;
    /**
     * Sets object opacity
     * @param object - Object to modify
     * @param opacity - Opacity (0-1)
     */
    setOpacity(object: FabricObject, opacity: number): void;
    /**
     * Rotates object by relative angle
     * @param object - Object to rotate
     * @param angle - Angle in degrees to add to current rotation
     */
    rotate(object: FabricObject, angle: number): void;
    /**
     * Sets object absolute rotation
     * @param object - Object to rotate
     * @param angle - Absolute angle in degrees
     */
    setRotation(object: FabricObject, angle: number): void;
    /**
     * Sets boundary constraint for object movement
     * Objects will be constrained within the bounding rectangle of the provided object
     * @param boundaryObject - FabricObject whose bounding rect defines the constraint area
     * @param options - Configuration options for boundary constraint and visual feedback
     */
    setBoundaryConstraint(boundaryObject: FabricObject, options?: boolean | {
        enableVisualFeedback?: boolean;
        fadeDistance?: number;
    }): void;
    /**
     * Removes boundary constraint for object movement
     * Objects will be free to move anywhere on the canvas
     */
    removeBoundaryConstraint(): void;
    /**
     * Checks if boundary constraint is currently enabled
     * @returns True if boundary constraint is active, false otherwise
     */
    isBoundaryConstraintEnabled(): boolean;
    /**
     * Sets up visual feedback for boundary proximity (private helper)
     * The boundary object will fade in as objects approach it
     * @param visualObject - FabricObject to use for visual feedback
     * @param fadeDistance - Distance in pixels to start fading (default: 50)
     */
    private setupBoundaryVisualFeedback;
    /**
     * Updates boundary visual feedback based on object distance
     * @param objBoundingRect - Bounding rect of the moving object
     */
    private updateBoundaryVisualFeedback;
    /**
     * Hides specified control points on an object
     * @param object - Object to modify control visibility
     * @param controls - Array of control names to hide (e.g., ['ml', 'mt', 'mr', 'mb'])
     */
    hideControls(object: FabricObject, controls: string[]): void;
    /**
     * Shows specified control points on an object
     * @param object - Object to modify control visibility
     * @param controls - Array of control names to show (e.g., ['ml', 'mt', 'mr', 'mb'])
     */
    showControls(object: FabricObject, controls: string[]): void;
    /**
     * Gets all objects on the canvas
     * @returns Array of all canvas objects
     */
    getAll(): FabricObject[];
    /**
     * Gets the currently active (selected) object
     * @returns The active object or null if nothing is selected
     */
    getActive(): FabricObject | null;
    /**
     * Clears the active selection
     */
    clearActive(): void;
    /**
     * Cleans up any event listeners or resources
     */
    destroy(): void;
}
//# sourceMappingURL=object-manager.d.ts.map