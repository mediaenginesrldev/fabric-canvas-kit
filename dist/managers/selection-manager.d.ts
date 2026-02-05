/**
 * Selection Manager
 * Handles object selection operations on the canvas
 * Core Fabric.js operations used throughout components
 */
import { FabricCanvas, FabricObject, ObjectFilter } from '../types';
/**
 * Selection Manager class
 * Manages selection of objects on the canvas
 */
export declare class SelectionManager {
    private canvas;
    private debug;
    constructor(canvas: FabricCanvas, debug?: boolean);
    /**
     * Returns all objects on the canvas
     * @param filter - Optional filter function
     * @returns Array of objects
     */
    getObjects(filter?: ObjectFilter): FabricObject[];
    /**
     * Returns currently active/selected object
     * @returns Active object or null
     */
    getActiveObject(): FabricObject | null;
    /**
     * Returns all selected objects (multiple selection)
     * @returns Array of selected objects
     */
    getActiveObjects(): FabricObject[];
    /**
     * Sets an object as active/selected
     * @param object - Object to select
     */
    setActiveObject(object: FabricObject): void;
    /**
     * Selects all objects on the canvas
     */
    selectAll(): void;
    /**
     * Clears all selections
     */
    clearSelection(): void;
    /**
     * Alias for clearSelection - Fabric.js native method name
     */
    discardActiveObject(): void;
    /**
     * Cleans up any event listeners or resources
     * Currently no cleanup needed
     */
    destroy(): void;
}
//# sourceMappingURL=selection-manager.d.ts.map