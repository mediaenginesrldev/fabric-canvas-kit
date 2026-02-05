/**
 * Input Manager
 * Handles keyboard shortcuts and panning modes
 *
 */
import { FabricCanvas } from '../types';
import { ObjectManager } from './object-manager';
import { SelectionManager } from './selection-manager';
import { ViewportManager } from './viewport-manager';
/**
 * Input configuration options
 */
export interface InputConfig {
    /** Enable keyboard shortcuts (default: true) */
    keyboard?: boolean;
    /** Enable spacebar panning (default: true) */
    spacebarPan?: boolean;
    /** Enable mouse wheel panning (default: true) */
    mouseWheelPan?: boolean;
    /** Enable two-finger touch panning (default: true) */
    touchPan?: boolean;
    /** Arrow key movement distance in pixels (default: 5) */
    arrowKeyDistance?: number;
    /** Maximum jump distance for touch panning in pixels (default: 200) */
    touchPanMaxJump?: number;
    /** Enable debug logging (default: false) */
    debug?: boolean;
}
/**
 * Input Manager class
 * Manages keyboard shortcuts and various panning modes
 */
export declare class InputManager {
    private canvas;
    private selectionManager;
    private viewportManager;
    private objectManager;
    private config;
    private debug;
    private keyboardEnabled;
    private keydownListener;
    private spacebarPanEnabled;
    private spacebarPressed;
    private mouseDown;
    private lastPosX;
    private lastPosY;
    private spacebarKeydownListener;
    private spacebarKeyupListener;
    private mouseDownListener;
    private mouseUpListener;
    private mouseMoveListener;
    private mouseWheelListener;
    private hammer?;
    private touchPanLastX;
    private touchPanLastY;
    private copiedObjects;
    private undoCallback;
    private redoCallback;
    constructor(canvas: FabricCanvas, selectionManager: SelectionManager, viewportManager: ViewportManager, objectManager: ObjectManager, config?: InputConfig);
    /**
     * Sets the undo callback to be called when Ctrl+Z is pressed
     * @param callback - Undo callback function
     */
    onUndo(callback: () => void): void;
    /**
     * Sets the redo callback to be called when Ctrl+Shift+Z is pressed
     * @param callback - Redo callback function
     */
    onRedo(callback: () => void): void;
    /**
     * Enables keyboard shortcuts
     * Extracted from display-drawing lines 498-557
     */
    enableKeyboard(): void;
    /**
     * Disables keyboard shortcuts
     */
    disableKeyboard(): void;
    /**
     * Enables spacebar panning
     * Extracted from display-drawing lines 295-306
     */
    enableSpacebarPan(): void;
    /**
     * Disables spacebar panning
     */
    disableSpacebarPan(): void;
    /**
     * Enables mouse wheel panning
     * Extracted from display-drawing lines 313-324
     */
    private enableMouseWheelPan;
    /**
     * Disables mouse wheel panning
     */
    private disableMouseWheelPan;
    /**
     * Enables two-finger touch panning using Hammer.js
     * Uses Hammer.js for touch gesture detection since Fabric.js 6 removed touch:drag events
     */
    private enableTouchPan;
    /**
     * Disables two-finger touch panning
     */
    private disableTouchPan;
    /**
     * Main keyboard event handler
     * Extracted from display-drawing lines 498-557
     */
    private handleKeydown;
    /**
     * Handles arrow key movement with zoom scaling
     * Extracted from display-drawing lines 498-521
     */
    private handleArrowKeys;
    /**
     * Handles Delete/Backspace key
     */
    private handleDelete;
    /**
     * Handles Ctrl+C / Cmd+C (copy)
     * Extracted from display-drawing lines 532-534
     */
    private handleCopy;
    /**
     * Handles Ctrl+V / Cmd+V (paste)
     * Extracted from display-drawing lines 536-543
     */
    private handlePaste;
    /**
     * Handles Ctrl+Z / Cmd+Z (undo)
     * Extracted from display-drawing lines 548-552
     */
    private handleUndo;
    /**
     * Handles Ctrl+Shift+Z / Cmd+Shift+Z (redo)
     */
    private handleRedo;
    /**
     * Cleans up all event listeners
     */
    destroy(): void;
}
//# sourceMappingURL=input-manager.d.ts.map