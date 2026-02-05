/**
 * Viewport Manager
 * Handles viewport operations (zoom, pan, fit-to-screen)
 */
import { Point as FabricPoint } from 'fabric';
/**
 * Viewport Manager class
 * Manages viewport zoom and pan operations
 */
export class ViewportManager {
    constructor(canvas, eventManager, minZoom = 0.1, maxZoom = 10, debug = false) {
        this.canvas = canvas;
        this.eventManager = eventManager;
        this.minZoom = minZoom;
        this.maxZoom = maxZoom;
        this.debug = debug;
    }
    /**
     * Gets current zoom level
     * @returns Current zoom level (1 = 100%)
     */
    getZoom() {
        return this.canvas.getZoom();
    }
    /**
     * Sets zoom level with min/max constraints
     * @param level - Zoom level (1 = 100%)
     */
    setZoom(level) {
        const constrainedZoom = Math.max(this.minZoom, Math.min(this.maxZoom, level));
        this.canvas.setZoom(constrainedZoom);
        this.canvas.requestRenderAll();
        this.eventManager.emitZoomChanged(constrainedZoom);
        if (this.debug) {
            console.log('[FabricKit] Zoom set to', constrainedZoom);
        }
    }
    /**
     * Zooms in by specified step
     * @param step - Zoom step (default 1.1 = 110%)
     */
    zoomIn(step = 1.1) {
        const currentZoom = this.getZoom();
        this.setZoom(currentZoom * step);
    }
    /**
     * Zooms out by specified step
     * @param step - Zoom step (default 1.1 = 110%)
     */
    zoomOut(step = 1.1) {
        const currentZoom = this.getZoom();
        this.setZoom(currentZoom / step);
    }
    /**
     * Resets zoom to 100%
     */
    resetZoom() {
        this.setZoom(1);
    }
    /**
     * Zooms to fit all objects with optional padding
     * Calculates optimal zoom level to fit all objects within the viewport
     * @param options - Zoom to fit options
     */
    fitToScreen(options = {}) {
        const padding = options.padding ?? 50;
        const maxZoom = options.maxZoom ?? this.maxZoom;
        const minZoom = options.minZoom ?? this.minZoom;
        const objects = this.canvas.getObjects();
        if (objects.length === 0) {
            return;
        }
        // Calculate bounding box of all objects
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        objects.forEach(obj => {
            const bounds = obj.getBoundingRect();
            minX = Math.min(minX, bounds.left);
            minY = Math.min(minY, bounds.top);
            maxX = Math.max(maxX, bounds.left + bounds.width);
            maxY = Math.max(maxY, bounds.top + bounds.height);
        });
        const width = maxX - minX;
        const height = maxY - minY;
        // Calculate zoom level to fit
        const canvasWidth = this.canvas.getWidth();
        const canvasHeight = this.canvas.getHeight();
        const zoomX = (canvasWidth - padding * 2) / width;
        const zoomY = (canvasHeight - padding * 2) / height;
        let zoom = Math.min(zoomX, zoomY);
        // Apply constraints
        zoom = Math.max(minZoom, Math.min(maxZoom, zoom));
        // Calculate center position
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;
        // Apply zoom and center viewport
        this.canvas.setZoom(zoom);
        this.canvas.absolutePan(new FabricPoint(canvasWidth / 2 - centerX * zoom, canvasHeight / 2 - centerY * zoom));
        this.canvas.requestRenderAll();
        this.eventManager.emitZoomChanged(zoom);
        if (this.debug) {
            console.log('[FabricKit] Fit to screen, zoom:', zoom);
        }
    }
    /**
     * Pans viewport by relative offset
     * @param offset - Pan offset
     */
    pan(offset) {
        const vpt = this.canvas.viewportTransform;
        if (!vpt)
            return;
        vpt[4] += offset.x;
        vpt[5] += offset.y;
        this.canvas.setViewportTransform(vpt);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Panned by', offset);
        }
    }
    /**
     * Resets viewport pan to origin
     */
    resetPan() {
        this.canvas.absolutePan(new FabricPoint(0, 0));
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Pan reset to origin');
        }
    }
    /**
     * Sets absolute pan position
     * @param position - Absolute position
     */
    absolutePan(position) {
        this.canvas.absolutePan(new FabricPoint(position.x, position.y));
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Absolute pan to', position);
        }
    }
    /**
     * Gets current viewport transform matrix
     * @returns Viewport transform matrix
     */
    getViewportTransform() {
        return this.canvas.viewportTransform
            ? [...this.canvas.viewportTransform]
            : [1, 0, 0, 1, 0, 0];
    }
    /**
     * Sets viewport transform matrix
     * @param transform - Transform matrix
     */
    setViewportTransform(transform) {
        this.canvas.setViewportTransform(transform);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Viewport transform set');
        }
    }
    /**
     * Centers viewport on specific object
     * @param object - Object to center on
     */
    centerOn(object) {
        const bounds = object.getBoundingRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        const zoom = this.getZoom();
        const canvasWidth = this.canvas.getWidth();
        const canvasHeight = this.canvas.getHeight();
        this.canvas.absolutePan(new FabricPoint(canvasWidth / 2 - centerX * zoom, canvasHeight / 2 - centerY * zoom));
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Centered on object');
        }
    }
    /**
     * Gets the center point of the canvas
     * Returns the absolute center coordinates of the canvas
     * @returns Center point of the canvas {x, y}
     */
    getCenterPoint() {
        return this.canvas.getCenterPoint();
    }
    /**
     * Cleans up any event listeners or resources
     * Currently no cleanup needed
     */
    destroy() {
        // No cleanup needed - this manager has no event listeners
        if (this.debug) {
            console.log('[FabricKit] Viewport manager destroyed');
        }
    }
}
//# sourceMappingURL=viewport-manager.js.map