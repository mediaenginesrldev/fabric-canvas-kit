/**
 * Performance Utilities
 * Provides utilities for optimizing canvas rendering performance
 */
/**
 * Performance utility class
 * Manages canvas rendering optimization
 */
export class PerformanceUtility {
    constructor(canvas, debug = false) {
        this.canvas = canvas;
        this.debug = debug;
    }
    /**
     * Executes multiple operations in batch mode without re-rendering after each
     * Significantly improves performance when making multiple changes
     * @param callback - Function containing operations to batch
     */
    batchUpdate(callback) {
        // Disable automatic rendering
        const originalRenderOnAddRemove = this.canvas.renderOnAddRemove;
        this.canvas.renderOnAddRemove = false;
        try {
            // Execute the batched operations
            callback();
        }
        finally {
            // Restore original setting
            this.canvas.renderOnAddRemove = originalRenderOnAddRemove;
            // Render once after all operations
            this.renderAll();
            if (this.debug) {
                console.log('[FabricKit] Batch update completed with single render');
            }
        }
    }
    /**
     * Forces an immediate synchronous canvas re-render
     * Use this when you need to ensure the canvas is updated immediately
     * For better performance, use canvas.requestRenderAll() instead
     */
    renderAll() {
        this.canvas.renderAll();
        if (this.debug) {
            console.log('[FabricKit] Canvas rendered immediately (synchronous)');
        }
    }
    /**
     * Schedules a canvas render on the next animation frame (batched)
     * More efficient than immediate render when multiple changes are happening
     * Multiple calls will only result in one render (handled by Fabric.js internally)
     *
     * Note: This is a simple passthrough to Fabric.js's native requestRenderAll()
     * which already implements batching and animation frame optimization
     */
    requestRenderAll() {
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Canvas render requested (batched by Fabric.js)');
        }
    }
    /**
     * Cleans up resources
     */
    destroy() {
        if (this.debug) {
            console.log('[FabricKit] PerformanceUtility destroyed');
        }
    }
}
//# sourceMappingURL=performance.js.map