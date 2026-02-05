/**
 * History Manager
 * Handles undo/redo functionality with history tracking
 *
 *
 * IMPORTANT: History EXCLUDES viewport changes (zoom/pan)
 * Only tracks object modifications, additions, and removals
 */
/**
 * History Manager class
 * Manages undo/redo history for canvas operations
 */
export class HistoryManager {
    constructor(canvas, eventManager, config = {}) {
        // History stacks
        this.undoStack = [];
        this.redoStack = [];
        // State tracking
        this.isUndoing = false;
        this.isRedoing = false;
        this.enabled = true;
        this.canvas = canvas;
        this.eventManager = eventManager;
        this.config = {
            maxSize: config.maxSize ?? 50,
            debug: config.debug ?? false,
        };
        this.debug = this.config.debug;
        this.initialize();
    }
    /**
     * Initializes history tracking
     */
    initialize() {
        // Save initial state
        this.saveState();
        // Listen to canvas modifications
        this.canvas.on('object:added', () => {
            if (!this.isUndoing && !this.isRedoing && this.enabled) {
                this.saveState();
            }
        });
        this.canvas.on('object:removed', () => {
            if (!this.isUndoing && !this.isRedoing && this.enabled) {
                this.saveState();
            }
        });
        this.canvas.on('object:modified', () => {
            if (!this.isUndoing && !this.isRedoing && this.enabled) {
                this.saveState();
            }
        });
        if (this.debug) {
            console.log('[FabricKit] HistoryManager initialized');
        }
    }
    /**
     * Saves current canvas state to history
     */
    saveState() {
        if (!this.enabled) {
            return;
        }
        // Get current canvas state (excluding viewport)
        const currentState = this.getCanvasState();
        // Clear redo stack when new action is performed
        this.redoStack = [];
        // Add to undo stack
        const entry = {
            state: currentState,
            timestamp: Date.now(),
        };
        this.undoStack.push(entry);
        // Limit stack size
        if (this.undoStack.length > this.config.maxSize) {
            this.undoStack.shift();
        }
        // Emit history changed event
        this.eventManager.emitHistoryChanged({
            canUndo: this.canUndo(),
            canRedo: this.canRedo(),
        });
        if (this.debug) {
            console.log('[FabricKit] State saved to history', {
                undoStackSize: this.undoStack.length,
                redoStackSize: this.redoStack.length,
            });
        }
    }
    /**
     * Gets canvas state as JSON string (excluding viewport)
     */
    getCanvasState() {
        const json = this.canvas.toJSON();
        // Remove viewport from state (we don't want viewport changes in history)
        delete json.viewportTransform;
        return JSON.stringify(json);
    }
    /**
     * Restores canvas state from JSON string
     */
    restoreState(stateString) {
        const state = JSON.parse(stateString);
        // Preserve current viewport transform
        const currentViewport = (this.canvas.viewportTransform?.slice(0) || [1, 0, 0, 1, 0, 0]);
        this.canvas.loadFromJSON(state).then(() => {
            // Restore viewport transform after loading
            this.canvas.setViewportTransform(currentViewport);
            this.canvas.requestRenderAll();
            if (this.debug) {
                console.log('[FabricKit] State restored from history');
            }
        });
    }
    /**
     * Performs undo operation
     * Extracted from presentation-editor lines 837-858
     */
    undo() {
        if (!this.canUndo()) {
            if (this.debug) {
                console.warn('[FabricKit] Cannot undo: no history available');
            }
            return;
        }
        this.isUndoing = true;
        // Save current state to redo stack
        const currentState = this.getCanvasState();
        this.redoStack.push({
            state: currentState,
            timestamp: Date.now(),
        });
        // Get previous state from undo stack
        this.undoStack.pop(); // Remove current state
        const previousEntry = this.undoStack[this.undoStack.length - 1];
        if (previousEntry) {
            this.restoreState(previousEntry.state);
        }
        this.isUndoing = false;
        // Emit history changed event
        this.eventManager.emitHistoryChanged({
            canUndo: this.canUndo(),
            canRedo: this.canRedo(),
        });
        if (this.debug) {
            console.log('[FabricKit] Undo performed', {
                undoStackSize: this.undoStack.length,
                redoStackSize: this.redoStack.length,
            });
        }
    }
    /**
     * Performs redo operation
     */
    redo() {
        if (!this.canRedo()) {
            if (this.debug) {
                console.warn('[FabricKit] Cannot redo: no redo history available');
            }
            return;
        }
        this.isRedoing = true;
        // Get next state from redo stack
        const nextEntry = this.redoStack.pop();
        if (nextEntry) {
            // Save current state to undo stack
            const currentState = this.getCanvasState();
            this.undoStack.push({
                state: currentState,
                timestamp: Date.now(),
            });
            // Restore next state
            this.restoreState(nextEntry.state);
        }
        this.isRedoing = false;
        // Emit history changed event
        this.eventManager.emitHistoryChanged({
            canUndo: this.canUndo(),
            canRedo: this.canRedo(),
        });
        if (this.debug) {
            console.log('[FabricKit] Redo performed', {
                undoStackSize: this.undoStack.length,
                redoStackSize: this.redoStack.length,
            });
        }
    }
    /**
     * Checks if undo is available
     * @returns True if can undo, false otherwise
     */
    canUndo() {
        return this.undoStack.length > 1; // Need at least 2 entries (current + previous)
    }
    /**
     * Checks if redo is available
     * @returns True if can redo, false otherwise
     */
    canRedo() {
        return this.redoStack.length > 0;
    }
    /**
     * Clears all history
     */
    clearHistory() {
        this.undoStack = [];
        this.redoStack = [];
        // Save initial state
        this.saveState();
        // Emit history changed event
        this.eventManager.emitHistoryChanged({
            canUndo: false,
            canRedo: false,
        });
        if (this.debug) {
            console.log('[FabricKit] History cleared');
        }
    }
    /**
     * Gets current undo stack size
     * @returns Number of undo entries
     */
    getUndoStackSize() {
        return this.undoStack.length;
    }
    /**
     * Gets current redo stack size
     * @returns Number of redo entries
     */
    getRedoStackSize() {
        return this.redoStack.length;
    }
    /**
     * Enables history tracking
     */
    enable() {
        this.enabled = true;
        if (this.debug) {
            console.log('[FabricKit] History tracking enabled');
        }
    }
    /**
     * Disables history tracking
     */
    disable() {
        this.enabled = false;
        if (this.debug) {
            console.log('[FabricKit] History tracking disabled');
        }
    }
    /**
     * Checks if history tracking is enabled
     * @returns True if enabled, false otherwise
     */
    isEnabled() {
        return this.enabled;
    }
    /**
     * Cleans up event listeners
     */
    destroy() {
        this.clearHistory();
        this.enabled = false;
        if (this.debug) {
            console.log('[FabricKit] HistoryManager destroyed');
        }
    }
}
//# sourceMappingURL=history-manager.js.map