/**
 * Selection Manager
 * Handles object selection operations on the canvas
 * Core Fabric.js operations used throughout components
 */
/**
 * Selection Manager class
 * Manages selection of objects on the canvas
 */
export class SelectionManager {
    constructor(canvas, debug = false) {
        this.canvas = canvas;
        this.debug = debug;
    }
    /**
     * Returns all objects on the canvas
     * @param filter - Optional filter function
     * @returns Array of objects
     */
    getObjects(filter) {
        const objects = this.canvas.getObjects();
        if (filter) {
            return objects.filter(filter);
        }
        return objects;
    }
    /**
     * Returns currently active/selected object
     * @returns Active object or null
     */
    getActiveObject() {
        return this.canvas.getActiveObject() || null;
    }
    /**
     * Returns all selected objects (multiple selection)
     * @returns Array of selected objects
     */
    getActiveObjects() {
        const activeObject = this.canvas.getActiveObject();
        if (!activeObject) {
            return [];
        }
        // Check if it's a group selection (ActiveSelection)
        if (activeObject.type === 'activeSelection') {
            return activeObject.getObjects() || [];
        }
        // Single object selection
        return [activeObject];
    }
    /**
     * Sets an object as active/selected
     * @param object - Object to select
     */
    setActiveObject(object) {
        this.canvas.setActiveObject(object);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Object selected', object);
        }
    }
    /**
     * Selects all objects on the canvas
     */
    selectAll() {
        const objects = this.canvas.getObjects();
        if (objects.length === 0) {
            return;
        }
        // Create active selection with all objects
        const selection = new window.fabric.ActiveSelection(objects, {
            canvas: this.canvas,
        });
        this.canvas.setActiveObject(selection);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] All objects selected', objects.length);
        }
    }
    /**
     * Clears all selections
     */
    clearSelection() {
        this.canvas.discardActiveObject();
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Selection cleared');
        }
    }
    /**
     * Alias for clearSelection - Fabric.js native method name
     */
    discardActiveObject() {
        this.clearSelection();
    }
    /**
     * Cleans up any event listeners or resources
     * Currently no cleanup needed
     */
    destroy() {
        // No cleanup needed - this manager has no event listeners
        if (this.debug) {
            console.log('[FabricKit] Selection manager destroyed');
        }
    }
}
//# sourceMappingURL=selection-manager.js.map