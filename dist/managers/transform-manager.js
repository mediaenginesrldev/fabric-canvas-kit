/**
 * Transform Manager
 * Handles object transformation operations (position, scale, center)
 */
/**
 * Transform Manager class
 * Manages object transformation operations
 */
export class TransformManager {
    constructor(canvas, debug = false) {
        this.canvas = canvas;
        this.debug = debug;
    }
    /**
     * Centers object on canvas (both horizontally and vertically)
     * @param object - Object to center
     */
    centerObject(object) {
        this.canvas.centerObject(object);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Object centered');
        }
    }
    /**
     * Centers object horizontally only
     * @param object - Object to center
     */
    centerObjectH(object) {
        this.canvas.centerObjectH(object);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Object centered horizontally');
        }
    }
    /**
     * Centers object vertically only
     * @param object - Object to center
     */
    centerObjectV(object) {
        this.canvas.centerObjectV(object);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Object centered vertically');
        }
    }
    /**
     * Sets object absolute position
     * @param object - Object to position
     * @param position - Position coordinates
     */
    position(object, position) {
        object.set({
            left: position.x,
            top: position.y,
        });
        object.setCoords();
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Object positioned at', position);
        }
    }
    /**
     * Moves object by relative offset
     * @param object - Object to move
     * @param offset - Offset coordinates
     */
    moveBy(object, offset) {
        const currentLeft = object.left || 0;
        const currentTop = object.top || 0;
        object.set({
            left: currentLeft + offset.x,
            top: currentTop + offset.y,
        });
        object.setCoords();
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Object moved by', offset);
        }
    }
    /**
     * Scales object by factor
     * @param object - Object to scale
     * @param factor - Scale factor (1 = 100%, 2 = 200%, etc.)
     */
    scale(object, factor) {
        object.scale(factor);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Object scaled by factor', factor);
        }
    }
    /**
     * Sets object dimensions
     * @param object - Object to resize
     * @param width - Target width
     * @param height - Target height
     */
    setSize(object, width, height) {
        const currentWidth = object.width || 1;
        const currentHeight = object.height || 1;
        object.set({
            scaleX: width / currentWidth,
            scaleY: height / currentHeight,
        });
        object.setCoords();
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Object size set to', width, 'x', height);
        }
    }
    /**
     * Gets object bounding box
     * @param object - Object to measure
     * @returns Bounding box coordinates
     */
    getBounds(object) {
        const bounds = object.getBoundingRect();
        return {
            left: bounds.left,
            top: bounds.top,
            width: bounds.width,
            height: bounds.height,
        };
    }
    /**
     * Gets object center point
     * @param object - Object to measure
     * @returns Center point coordinates
     */
    getCenter(object) {
        const bounds = object.getBoundingRect();
        return {
            x: bounds.left + bounds.width / 2,
            y: bounds.top + bounds.height / 2,
        };
    }
    /**
     * Cleans up any event listeners or resources
     * Currently no cleanup needed
     */
    destroy() {
        // No cleanup needed - this manager has no event listeners
        if (this.debug) {
            console.log('[FabricKit] Transform manager destroyed');
        }
    }
}
//# sourceMappingURL=transform-manager.js.map