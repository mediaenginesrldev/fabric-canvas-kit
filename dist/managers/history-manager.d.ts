/**
 * History Manager
 * Handles undo/redo functionality with history tracking
 *
 *
 * IMPORTANT: History EXCLUDES viewport changes (zoom/pan)
 * Only tracks object modifications, additions, and removals
 */
import { EventManager } from './event-manager';
import { FabricCanvas } from '../types';
/**
 * History Manager configuration options
 */
export interface HistoryManagerConfig {
    /** Maximum number of history entries (default: 50) */
    maxSize?: number;
    /** Enable debug logging (default: false) */
    debug?: boolean;
}
/**
 * History Manager class
 * Manages undo/redo history for canvas operations
 */
export declare class HistoryManager {
    private canvas;
    private eventManager;
    private config;
    private debug;
    private undoStack;
    private redoStack;
    private isUndoing;
    private isRedoing;
    private enabled;
    constructor(canvas: FabricCanvas, eventManager: EventManager, config?: HistoryManagerConfig);
    /**
     * Initializes history tracking
     */
    private initialize;
    /**
     * Saves current canvas state to history
     */
    private saveState;
    /**
     * Gets canvas state as JSON string (excluding viewport)
     */
    private getCanvasState;
    /**
     * Restores canvas state from JSON string
     */
    private restoreState;
    /**
     * Performs undo operation
     * Extracted from presentation-editor lines 837-858
     */
    undo(): void;
    /**
     * Performs redo operation
     */
    redo(): void;
    /**
     * Checks if undo is available
     * @returns True if can undo, false otherwise
     */
    canUndo(): boolean;
    /**
     * Checks if redo is available
     * @returns True if can redo, false otherwise
     */
    canRedo(): boolean;
    /**
     * Clears all history
     */
    clearHistory(): void;
    /**
     * Gets current undo stack size
     * @returns Number of undo entries
     */
    getUndoStackSize(): number;
    /**
     * Gets current redo stack size
     * @returns Number of redo entries
     */
    getRedoStackSize(): number;
    /**
     * Enables history tracking
     */
    enable(): void;
    /**
     * Disables history tracking
     */
    disable(): void;
    /**
     * Checks if history tracking is enabled
     * @returns True if enabled, false otherwise
     */
    isEnabled(): boolean;
    /**
     * Cleans up event listeners
     */
    destroy(): void;
}
//# sourceMappingURL=history-manager.d.ts.map