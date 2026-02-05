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
 * History state entry
 */
interface HistoryEntry {
  /** Canvas state as JSON */
  state: string;
  /** Timestamp of the state */
  timestamp: number;
}

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
export class HistoryManager {
  private canvas: FabricCanvas;
  private eventManager: EventManager;
  private config: Required<HistoryManagerConfig>;
  private debug: boolean;

  // History stacks
  private undoStack: HistoryEntry[] = [];
  private redoStack: HistoryEntry[] = [];

  // State tracking
  private isUndoing: boolean = false;
  private isRedoing: boolean = false;
  private enabled: boolean = true;

  constructor(canvas: FabricCanvas, eventManager: EventManager, config: HistoryManagerConfig = {}) {
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
  private initialize(): void {
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
  private saveState(): void {
    if (!this.enabled) {
      return;
    }

    // Get current canvas state (excluding viewport)
    const currentState = this.getCanvasState();

    // Clear redo stack when new action is performed
    this.redoStack = [];

    // Add to undo stack
    const entry: HistoryEntry = {
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
  private getCanvasState(): string {
    const json = this.canvas.toJSON() as any;

    // Remove viewport from state (we don't want viewport changes in history)
    delete json.viewportTransform;

    return JSON.stringify(json);
  }

  /**
   * Restores canvas state from JSON string
   */
  private restoreState(stateString: string): void {
    const state = JSON.parse(stateString);

    // Preserve current viewport transform
    const currentViewport = (this.canvas.viewportTransform?.slice(0) || [1, 0, 0, 1, 0, 0]) as [
      number,
      number,
      number,
      number,
      number,
      number,
    ];

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
  undo(): void {
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
  redo(): void {
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
  canUndo(): boolean {
    return this.undoStack.length > 1; // Need at least 2 entries (current + previous)
  }

  /**
   * Checks if redo is available
   * @returns True if can redo, false otherwise
   */
  canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  /**
   * Clears all history
   */
  clearHistory(): void {
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
  getUndoStackSize(): number {
    return this.undoStack.length;
  }

  /**
   * Gets current redo stack size
   * @returns Number of redo entries
   */
  getRedoStackSize(): number {
    return this.redoStack.length;
  }

  /**
   * Enables history tracking
   */
  enable(): void {
    this.enabled = true;

    if (this.debug) {
      console.log('[FabricKit] History tracking enabled');
    }
  }

  /**
   * Disables history tracking
   */
  disable(): void {
    this.enabled = false;

    if (this.debug) {
      console.log('[FabricKit] History tracking disabled');
    }
  }

  /**
   * Checks if history tracking is enabled
   * @returns True if enabled, false otherwise
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Cleans up event listeners
   */
  destroy(): void {
    this.clearHistory();
    this.enabled = false;

    if (this.debug) {
      console.log('[FabricKit] HistoryManager destroyed');
    }
  }
}
