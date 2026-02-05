/**
 * Object Manager
 * Handles object manipulation operations (z-index, clone, delete, lock, styling)
 *
 */
/**
 * Object Manager class
 * Manages object manipulation operations
 */
export class ObjectManager {
    constructor(canvas, debug = false, eventManager) {
        this.eventManager = null;
        this.boundaryRect = null;
        this.boundaryMoveHandler = null;
        this.boundaryMouseUpHandler = null;
        this.boundaryVisualObject = null;
        this.fadeDistance = 50;
        this.minOpacity = 0;
        this.maxOpacity = 1;
        this.canvas = canvas;
        this.debug = debug;
        this.eventManager = eventManager || null;
    }
    /**
     * Brings object to front of z-order
     * Extracted from presentation-editor lines 1203-1208
     * @param object - Object to bring to front
     */
    bringToFront(object) {
        this.canvas.bringObjectToFront(object);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Object brought to front');
        }
    }
    /**
     * Sends object to back of z-order
     * Extracted from presentation-editor lines 1210-1214
     * @param object - Object to send to back
     */
    sendToBack(object) {
        this.canvas.sendObjectToBack(object);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Object sent to back');
        }
    }
    /**
     * Brings object one level forward in z-order
     * @param object - Object to bring forward
     */
    bringForward(object) {
        this.canvas.bringObjectForward(object);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Object brought forward');
        }
    }
    /**
     * Sends object one level backward in z-order
     * @param object - Object to send backward
     */
    sendBackward(object) {
        this.canvas.sendObjectBackwards(object);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Object sent backward');
        }
    }
    /**
     * Clones an object
     * Extracted from presentation-editor lines 1216-1240 with eraser cloning
     * @param object - Object to clone
     * @returns Promise resolving to cloned object
     */
    async clone(object) {
        const cloned = await object.clone();
        // Offset the cloned object slightly
        cloned.set({
            left: (object.left || 0) + 10,
            top: (object.top || 0) + 10,
        });
        // Clone eraser if present
        if (object.eraser) {
            const clonedEraser = await object.eraser.clone();
            cloned.eraser = clonedEraser;
            this.canvas.add(cloned);
            this.canvas.setActiveObject(cloned);
            this.canvas.requestRenderAll();
            if (this.debug) {
                console.log('[FabricKit] Object cloned with eraser');
            }
            return cloned;
        }
        else {
            this.canvas.add(cloned);
            this.canvas.setActiveObject(cloned);
            this.canvas.requestRenderAll();
            if (this.debug) {
                console.log('[FabricKit] Object cloned');
            }
            return cloned;
        }
    }
    /**
     * Deletes object from canvas
     * Extracted from presentation-editor lines 1154-1174
     * @param object - Object to delete
     */
    delete(object) {
        this.canvas.remove(object);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Object deleted');
        }
    }
    /**
     * Deletes currently selected object(s)
     */
    deleteSelected() {
        const activeObject = this.canvas.getActiveObject();
        if (!activeObject) {
            return;
        }
        // Check if it's a group selection (ActiveSelection)
        if (activeObject.type === 'activeSelection') {
            const objects = activeObject.getObjects() || [];
            objects.forEach((obj) => {
                this.canvas.remove(obj);
            });
        }
        else {
            this.canvas.remove(activeObject);
        }
        this.canvas.discardActiveObject();
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Selected objects deleted');
        }
    }
    /**
     * Removes all objects from canvas
     */
    clear() {
        this.canvas.clear();
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Canvas cleared');
        }
    }
    /**
     * Locks object to prevent modifications
     * @param object - Object to lock
     */
    lock(object) {
        object.set({
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,
            lockScalingX: true,
            lockScalingY: true,
            selectable: true,
            evented: true,
            locked: true,
        });
        this.canvas.requestRenderAll();
        // Emit lock event
        if (this.eventManager) {
            this.eventManager.emitObjectLocked(object);
        }
        if (this.debug) {
            console.log('[FabricKit] Object locked');
        }
    }
    /**
     * Unlocks object to allow modifications
     * @param object - Object to unlock
     */
    unlock(object) {
        object.set({
            lockMovementX: false,
            lockMovementY: false,
            lockRotation: false,
            lockScalingX: false,
            lockScalingY: false,
            selectable: true,
            evented: true,
            locked: false,
        });
        this.canvas.requestRenderAll();
        // Emit unlock event
        if (this.eventManager) {
            this.eventManager.emitObjectUnlocked(object);
        }
        if (this.debug) {
            console.log('[FabricKit] Object unlocked');
        }
    }
    /**
     * Toggles lock state of object
     * @param object - Object to toggle lock
     */
    toggleLock(object) {
        const isLocked = object.lockMovementX || false;
        if (isLocked) {
            this.unlock(object);
        }
        else {
            this.lock(object);
        }
    }
    /**
     * Returns whether object is locked
     * @param object - Object to check
     * @returns True if locked, false otherwise
     */
    isLocked(object) {
        return object.lockMovementX === true;
    }
    /**
     * Sets object fill color
     * @param object - Object to modify
     * @param color - Fill color
     */
    setFill(object, color) {
        object.set('fill', color);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Object fill set to', color);
        }
    }
    /**
     * Sets object stroke color
     * @param object - Object to modify
     * @param color - Stroke color
     */
    setStroke(object, color) {
        object.set('stroke', color);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Object stroke set to', color);
        }
    }
    /**
     * Sets object stroke width
     * @param object - Object to modify
     * @param width - Stroke width
     */
    setStrokeWidth(object, width) {
        object.set('strokeWidth', width);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Object stroke width set to', width);
        }
    }
    /**
     * Sets object opacity
     * @param object - Object to modify
     * @param opacity - Opacity (0-1)
     */
    setOpacity(object, opacity) {
        object.set('opacity', opacity);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Object opacity set to', opacity);
        }
    }
    /**
     * Rotates object by relative angle
     * @param object - Object to rotate
     * @param angle - Angle in degrees to add to current rotation
     */
    rotate(object, angle) {
        const currentAngle = object.angle || 0;
        object.set('angle', currentAngle + angle);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Object rotated by', angle, 'degrees');
        }
    }
    /**
     * Sets object absolute rotation
     * @param object - Object to rotate
     * @param angle - Absolute angle in degrees
     */
    setRotation(object, angle) {
        object.set('angle', angle);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Object rotation set to', angle, 'degrees');
        }
    }
    /**
     * Sets boundary constraint for object movement
     * Objects will be constrained within the bounding rectangle of the provided object
     * @param boundaryObject - FabricObject whose bounding rect defines the constraint area
     * @param options - Configuration options for boundary constraint and visual feedback
     */
    setBoundaryConstraint(boundaryObject, options) {
        // Remove existing constraint if any
        this.removeBoundaryConstraint();
        // Parse options (support both boolean and object for backwards compatibility)
        let enableVisualFeedback = true;
        let fadeDistance = 50;
        if (typeof options === 'boolean') {
            // Legacy boolean parameter
            enableVisualFeedback = options;
        }
        else if (options) {
            // New options object
            enableVisualFeedback = options.enableVisualFeedback ?? true;
            fadeDistance = options.fadeDistance ?? 50;
        }
        // Extract and cache bounding rect once
        this.boundaryRect = boundaryObject.getBoundingRect();
        // Create event handler
        this.boundaryMoveHandler = (event) => {
            if (!this.boundaryRect)
                return;
            const obj = event.target;
            // Skip locked or non-selectable objects
            if (obj.lockMovementX || obj.lockMovementY || !obj.selectable) {
                return;
            }
            // Update coords first to get accurate bounding rect
            obj.setCoords();
            // Get object's bounding rect
            const objBoundingRect = obj.getBoundingRect();
            // Calculate boundary constraints
            const boundaryRight = this.boundaryRect.left + this.boundaryRect.width;
            const boundaryBottom = this.boundaryRect.top + this.boundaryRect.height;
            const objRight = objBoundingRect.left + objBoundingRect.width;
            const objBottom = objBoundingRect.top + objBoundingRect.height;
            // Start with current position
            let newLeft = obj.left || 0;
            let newTop = obj.top || 0;
            // Apply constraints using min/max to handle all boundaries together
            // Left boundary
            if (objBoundingRect.left < this.boundaryRect.left) {
                newLeft = newLeft + (this.boundaryRect.left - objBoundingRect.left);
            }
            // Right boundary
            else if (objRight > boundaryRight) {
                newLeft = newLeft - (objRight - boundaryRight);
            }
            // Top boundary
            if (objBoundingRect.top < this.boundaryRect.top) {
                newTop = newTop + (this.boundaryRect.top - objBoundingRect.top);
            }
            // Bottom boundary
            else if (objBottom > boundaryBottom) {
                newTop = newTop - (objBottom - boundaryBottom);
            }
            // Apply constrained position
            obj.set({
                left: newLeft,
                top: newTop,
            });
            // Update coords after position change
            obj.setCoords();
            // Update visual feedback if enabled
            if (this.boundaryVisualObject) {
                this.updateBoundaryVisualFeedback(objBoundingRect);
            }
        };
        // Attach event listener
        this.canvas.on('object:moving', this.boundaryMoveHandler);
        // Add mouse:up handler to reset visual feedback
        this.boundaryMouseUpHandler = () => {
            if (this.boundaryVisualObject) {
                this.boundaryVisualObject.set({ opacity: this.minOpacity });
                this.canvas.requestRenderAll();
            }
        };
        this.canvas.on('mouse:up', this.boundaryMouseUpHandler);
        // Enable visual feedback if requested
        if (enableVisualFeedback) {
            this.setupBoundaryVisualFeedback(boundaryObject, fadeDistance);
        }
        if (this.debug) {
            console.log('[FabricKit] Boundary constraint enabled', this.boundaryRect);
        }
    }
    /**
     * Removes boundary constraint for object movement
     * Objects will be free to move anywhere on the canvas
     */
    removeBoundaryConstraint() {
        if (this.boundaryMoveHandler) {
            this.canvas.off('object:moving', this.boundaryMoveHandler);
            this.boundaryMoveHandler = null;
        }
        if (this.boundaryMouseUpHandler) {
            this.canvas.off('mouse:up', this.boundaryMouseUpHandler);
            this.boundaryMouseUpHandler = null;
        }
        this.boundaryRect = null;
        // Remove visual feedback if active
        if (this.boundaryVisualObject) {
            this.boundaryVisualObject.set({ opacity: this.minOpacity });
            this.canvas.requestRenderAll();
            this.boundaryVisualObject = null;
        }
        if (this.debug) {
            console.log('[FabricKit] Boundary constraint removed');
        }
    }
    /**
     * Checks if boundary constraint is currently enabled
     * @returns True if boundary constraint is active, false otherwise
     */
    isBoundaryConstraintEnabled() {
        return this.boundaryRect !== null && this.boundaryMoveHandler !== null;
    }
    /**
     * Sets up visual feedback for boundary proximity (private helper)
     * The boundary object will fade in as objects approach it
     * @param visualObject - FabricObject to use for visual feedback
     * @param fadeDistance - Distance in pixels to start fading (default: 50)
     */
    setupBoundaryVisualFeedback(visualObject, fadeDistance = 50) {
        this.boundaryVisualObject = visualObject;
        this.fadeDistance = fadeDistance;
        this.minOpacity = 0; // Invisible when far
        this.maxOpacity = 1; // Fully visible when close
        // Set initial state (invisible)
        visualObject.set({ opacity: this.minOpacity });
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Boundary visual feedback enabled', { fadeDistance });
        }
    }
    /**
     * Updates boundary visual feedback based on object distance
     * @param objBoundingRect - Bounding rect of the moving object
     */
    updateBoundaryVisualFeedback(objBoundingRect) {
        if (!this.boundaryRect || !this.boundaryVisualObject)
            return;
        // Calculate distances from object edges to boundary edges
        const boundaryRight = this.boundaryRect.left + this.boundaryRect.width;
        const boundaryBottom = this.boundaryRect.top + this.boundaryRect.height;
        const objRight = objBoundingRect.left + objBoundingRect.width;
        const objBottom = objBoundingRect.top + objBoundingRect.height;
        const leftDist = objBoundingRect.left - this.boundaryRect.left;
        const rightDist = boundaryRight - objRight;
        const topDist = objBoundingRect.top - this.boundaryRect.top;
        const bottomDist = boundaryBottom - objBottom;
        // Find minimum distance to any boundary edge
        const minDist = Math.min(leftDist, rightDist, topDist, bottomDist);
        // Calculate opacity based on distance (linear fade)
        let opacity = this.minOpacity;
        if (minDist <= this.fadeDistance) {
            const fadeRatio = 1 - minDist / this.fadeDistance;
            opacity = this.minOpacity + fadeRatio * (this.maxOpacity - this.minOpacity);
        }
        // Update visual object opacity
        this.boundaryVisualObject.set({ opacity });
        this.canvas.requestRenderAll();
    }
    /**
     * Hides specified control points on an object
     * @param object - Object to modify control visibility
     * @param controls - Array of control names to hide (e.g., ['ml', 'mt', 'mr', 'mb'])
     */
    hideControls(object, controls) {
        controls.forEach(controlName => {
            object.setControlVisible(controlName, false);
        });
        if (this.debug) {
            console.log('[FabricKit] Controls hidden:', controls);
        }
    }
    /**
     * Shows specified control points on an object
     * @param object - Object to modify control visibility
     * @param controls - Array of control names to show (e.g., ['ml', 'mt', 'mr', 'mb'])
     */
    showControls(object, controls) {
        controls.forEach(controlName => {
            object.setControlVisible(controlName, true);
        });
        if (this.debug) {
            console.log('[FabricKit] Controls shown:', controls);
        }
    }
    /**
     * Gets all objects on the canvas
     * @returns Array of all canvas objects
     */
    getAll() {
        return this.canvas.getObjects();
    }
    /**
     * Gets the currently active (selected) object
     * @returns The active object or null if nothing is selected
     */
    getActive() {
        return this.canvas.getActiveObject() || null;
    }
    /**
     * Clears the active selection
     */
    clearActive() {
        this.canvas.discardActiveObject();
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Active selection cleared');
        }
    }
    /**
     * Cleans up any event listeners or resources
     */
    destroy() {
        // Remove boundary constraint if active
        this.removeBoundaryConstraint();
        if (this.debug) {
            console.log('[FabricKit] Object manager destroyed');
        }
    }
}
//# sourceMappingURL=object-manager.js.map