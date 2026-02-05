/**
 * Performance Utilities
 * Provides utilities for optimizing canvas rendering performance
 */
import { FabricCanvas } from '../types';
/**
 * Performance utility class
 * Manages canvas rendering optimization
 */
export declare class PerformanceUtility {
    private canvas;
    private debug;
    constructor(canvas: FabricCanvas, debug?: boolean);
    /**
     * Executes multiple operations in batch mode without re-rendering after each
     * Significantly improves performance when making multiple changes
     * @param callback - Function containing operations to batch
     */
    batchUpdate(callback: () => void): void;
    /**
     * Forces an immediate synchronous canvas re-render
     * Use this when you need to ensure the canvas is updated immediately
     * For better performance, use canvas.requestRenderAll() instead
     */
    renderAll(): void;
    /**
     * Schedules a canvas render on the next animation frame (batched)
     * More efficient than immediate render when multiple changes are happening
     * Multiple calls will only result in one render (handled by Fabric.js internally)
     *
     * Note: This is a simple passthrough to Fabric.js's native requestRenderAll()
     * which already implements batching and animation frame optimization
     */
    requestRenderAll(): void;
    /**
     * Cleans up resources
     */
    destroy(): void;
}
//# sourceMappingURL=performance.d.ts.map