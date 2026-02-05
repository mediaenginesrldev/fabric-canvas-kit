/**
 * Input Manager
 * Handles keyboard shortcuts and panning modes
 *
 */

import * as Hammer from 'hammerjs';

import { FabricCanvas, FabricObject, Point } from '../types';

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
export class InputManager {
  private canvas: FabricCanvas;
  private selectionManager: SelectionManager;
  private viewportManager: ViewportManager;
  private objectManager: ObjectManager;
  private config: Required<InputConfig>;
  private debug: boolean;

  // Keyboard state
  private keyboardEnabled: boolean = false;
  private keydownListener: ((e: KeyboardEvent) => void) | null = null;

  // Spacebar panning state
  private spacebarPanEnabled: boolean = false;
  private spacebarPressed: boolean = false;
  private mouseDown: boolean = false;
  private lastPosX: number = 0;
  private lastPosY: number = 0;
  private spacebarKeydownListener: ((e: KeyboardEvent) => void) | null = null;
  private spacebarKeyupListener: ((e: KeyboardEvent) => void) | null = null;
  private mouseDownListener: (() => void) | null = null;
  private mouseUpListener: (() => void) | null = null;
  private mouseMoveListener: ((opt: any) => void) | null = null;

  // Mouse wheel panning state
  private mouseWheelListener: ((opt: any) => void) | null = null;

  // Touch panning state with Hammer.js
  private hammer?: HammerManager;
  private touchPanLastX: number = 0;
  private touchPanLastY: number = 0;

  // Clipboard for copy/paste
  private copiedObjects: FabricObject[] = [];

  // Undo/redo callback
  private undoCallback: (() => void) | null = null;
  private redoCallback: (() => void) | null = null;

  constructor(
    canvas: FabricCanvas,
    selectionManager: SelectionManager,
    viewportManager: ViewportManager,
    objectManager: ObjectManager,
    config: InputConfig = {}
  ) {
    this.canvas = canvas;
    this.selectionManager = selectionManager;
    this.viewportManager = viewportManager;
    this.objectManager = objectManager;
    this.config = {
      keyboard: config.keyboard ?? true,
      spacebarPan: config.spacebarPan ?? true,
      mouseWheelPan: config.mouseWheelPan ?? true,
      touchPan: config.touchPan ?? true,
      arrowKeyDistance: config.arrowKeyDistance ?? 5,
      touchPanMaxJump: config.touchPanMaxJump ?? 200,
      debug: config.debug ?? false,
    };
    this.debug = this.config.debug;

    // Auto-enable based on config
    if (this.config.keyboard) {
      this.enableKeyboard();
    }
    if (this.config.spacebarPan) {
      this.enableSpacebarPan();
    }
    if (this.config.mouseWheelPan) {
      this.enableMouseWheelPan();
    }
    if (this.config.touchPan) {
      this.enableTouchPan();
    }
  }

  /**
   * Sets the undo callback to be called when Ctrl+Z is pressed
   * @param callback - Undo callback function
   */
  onUndo(callback: () => void): void {
    this.undoCallback = callback;
  }

  /**
   * Sets the redo callback to be called when Ctrl+Shift+Z is pressed
   * @param callback - Redo callback function
   */
  onRedo(callback: () => void): void {
    this.redoCallback = callback;
  }

  /**
   * Enables keyboard shortcuts
   * Extracted from display-drawing lines 498-557
   */
  enableKeyboard(): void {
    if (this.keyboardEnabled) {
      return;
    }

    this.keydownListener = (event: KeyboardEvent) => {
      this.handleKeydown(event);
    };

    document.addEventListener('keydown', this.keydownListener);
    this.keyboardEnabled = true;

    if (this.debug) {
      console.log('[FabricKit] Keyboard shortcuts enabled');
    }
  }

  /**
   * Disables keyboard shortcuts
   */
  disableKeyboard(): void {
    if (!this.keyboardEnabled || !this.keydownListener) {
      return;
    }

    document.removeEventListener('keydown', this.keydownListener);
    this.keydownListener = null;
    this.keyboardEnabled = false;

    if (this.debug) {
      console.log('[FabricKit] Keyboard shortcuts disabled');
    }
  }

  /**
   * Enables spacebar panning
   * Extracted from display-drawing lines 295-306
   */
  enableSpacebarPan(): void {
    if (this.spacebarPanEnabled) {
      return;
    }

    // Spacebar keydown
    this.spacebarKeydownListener = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        this.spacebarPressed = true;
        if (this.debug) {
          console.log('[FabricKit] Spacebar pressed, panning mode active');
        }
      }
    };

    // Spacebar keyup
    this.spacebarKeyupListener = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        this.spacebarPressed = false;
        this.lastPosX = 0;
        this.lastPosY = 0;
        if (this.debug) {
          console.log('[FabricKit] Spacebar released, panning mode inactive');
        }
      }
    };

    // Mouse down
    this.mouseDownListener = () => {
      this.mouseDown = true;
    };

    // Mouse up
    this.mouseUpListener = () => {
      this.mouseDown = false;
      this.lastPosX = 0;
      this.lastPosY = 0;
    };

    // Mouse move for panning
    this.mouseMoveListener = (opt: any) => {
      if (!this.spacebarPressed || !this.mouseDown) return;
      const e = opt.e as MouseEvent;
      const vpt = this.canvas.viewportTransform?.slice(0) as [
        number,
        number,
        number,
        number,
        number,
        number,
      ];
      if (!vpt) return;

      const lastPosX = this.lastPosX ?? 0;
      const lastPosY = this.lastPosY ?? 0;
      vpt[4] += e.movementX + lastPosX;
      vpt[5] += e.movementY + lastPosY;
      this.lastPosX = e.movementX;
      this.lastPosY = e.movementY;
      this.canvas.setViewportTransform(vpt);
    };

    document.addEventListener('keydown', this.spacebarKeydownListener);
    document.addEventListener('keyup', this.spacebarKeyupListener);
    this.canvas.on('mouse:down', this.mouseDownListener);
    this.canvas.on('mouse:up', this.mouseUpListener);
    this.canvas.on('mouse:move', this.mouseMoveListener);

    this.spacebarPanEnabled = true;

    if (this.debug) {
      console.log('[FabricKit] Spacebar panning enabled');
    }
  }

  /**
   * Disables spacebar panning
   */
  disableSpacebarPan(): void {
    if (!this.spacebarPanEnabled) {
      return;
    }

    if (this.spacebarKeydownListener) {
      document.removeEventListener('keydown', this.spacebarKeydownListener);
      this.spacebarKeydownListener = null;
    }

    if (this.spacebarKeyupListener) {
      document.removeEventListener('keyup', this.spacebarKeyupListener);
      this.spacebarKeyupListener = null;
    }

    if (this.mouseDownListener) {
      this.canvas.off('mouse:down', this.mouseDownListener);
      this.mouseDownListener = null;
    }

    if (this.mouseUpListener) {
      this.canvas.off('mouse:up', this.mouseUpListener);
      this.mouseUpListener = null;
    }

    if (this.mouseMoveListener) {
      this.canvas.off('mouse:move', this.mouseMoveListener);
      this.mouseMoveListener = null;
    }

    this.spacebarPanEnabled = false;
    this.spacebarPressed = false;
    this.mouseDown = false;
    this.lastPosX = 0;
    this.lastPosY = 0;

    if (this.debug) {
      console.log('[FabricKit] Spacebar panning disabled');
    }
  }

  /**
   * Enables mouse wheel panning
   * Extracted from display-drawing lines 313-324
   */
  private enableMouseWheelPan(): void {
    this.mouseWheelListener = (opt: any) => {
      const e = opt.e as WheelEvent;
      const vpt = this.canvas.viewportTransform?.slice(0) as [
        number,
        number,
        number,
        number,
        number,
        number,
      ];
      if (!vpt) return;

      const lastPosX = this.lastPosX ?? 0;
      const lastPosY = this.lastPosY ?? 0;
      vpt[4] += e.deltaX + lastPosX;
      vpt[5] += e.deltaY + lastPosY;
      this.lastPosX = e.deltaX;
      this.lastPosY = e.deltaY;
      this.canvas.setViewportTransform(vpt);
    };

    this.canvas.on('mouse:wheel', this.mouseWheelListener);

    if (this.debug) {
      console.log('[FabricKit] Mouse wheel panning enabled');
    }
  }

  /**
   * Disables mouse wheel panning
   */
  private disableMouseWheelPan(): void {
    if (this.mouseWheelListener) {
      this.canvas.off('mouse:wheel', this.mouseWheelListener);
      this.mouseWheelListener = null;

      if (this.debug) {
        console.log('[FabricKit] Mouse wheel panning disabled');
      }
    }
  }

  /**
   * Enables two-finger touch panning using Hammer.js
   * Uses Hammer.js for touch gesture detection since Fabric.js 6 removed touch:drag events
   */
  private enableTouchPan(): void {
    if (this.hammer) {
      return; // Already enabled
    }

    // Get the upper canvas element for touch events
    const upperCanvas = this.canvas.upperCanvasEl;
    if (!upperCanvas) {
      if (this.debug) {
        console.warn('[FabricKit] Cannot enable touch pan: upperCanvasEl not found');
      }
      return;
    }

    // Create Hammer manager for the canvas
    this.hammer = new Hammer.Manager(upperCanvas);

    // Add two-finger pan recognizer
    const pan = new Hammer.Pan({ threshold: 0, pointers: 2 });
    this.hammer.add(pan);

    // Pan start - initialize position tracking
    this.hammer.on('panstart', (e: HammerInput) => {
      this.canvas.selection = false;
      this.touchPanLastX = e.center.x; // Center of all touch points
      this.touchPanLastY = e.center.y;

      if (this.debug) {
        console.log('[FabricKit] Two-finger pan started');
      }
    });

    // Pan move - perform panning
    this.hammer.on('panmove', (e: HammerInput) => {
      const activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        return; // Don't pan when object is selected
      }

      const currentX = e.center.x;
      const currentY = e.center.y;
      const xChange = currentX - this.touchPanLastX;
      const yChange = currentY - this.touchPanLastY;

      // Apply max jump limit to prevent large viewport jumps
      if (
        Math.abs(xChange) <= this.config.touchPanMaxJump &&
        Math.abs(yChange) <= this.config.touchPanMaxJump
      ) {
        const delta: Point = { x: xChange, y: yChange };
        this.viewportManager.pan(delta);
      }

      this.touchPanLastX = currentX;
      this.touchPanLastY = currentY;
    });

    // Pan end - restore selection
    this.hammer.on('panend', () => {
      this.canvas.selection = true;

      if (this.debug) {
        console.log('[FabricKit] Two-finger pan ended');
      }
    });

    if (this.debug) {
      console.log('[FabricKit] Two-finger touch panning enabled (Hammer.js)');
    }
  }

  /**
   * Disables two-finger touch panning
   */
  private disableTouchPan(): void {
    if (this.hammer) {
      this.hammer.destroy();
      this.hammer = undefined;

      if (this.debug) {
        console.log('[FabricKit] Two-finger touch panning disabled');
      }
    }
  }

  /**
   * Main keyboard event handler
   * Extracted from display-drawing lines 498-557
   */
  private handleKeydown(event: KeyboardEvent): void {
    // Arrow keys - move selected object
    // Extracted from lines 498-521
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      this.handleArrowKeys(event);
      return;
    }

    // Delete key
    if (event.key === 'Delete' || event.key === 'Backspace') {
      this.handleDelete(event);
      return;
    }

    // Ctrl+C / Cmd+C - Copy
    // Extracted from lines 532-534
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'c') {
      this.handleCopy(event);
      return;
    }

    // Ctrl+V / Cmd+V - Paste
    // Extracted from lines 536-543
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'v') {
      this.handlePaste(event);
      return;
    }

    // Ctrl+Z / Cmd+Z - Undo
    // Extracted from lines 548-552
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z' && !event.shiftKey) {
      this.handleUndo(event);
      return;
    }

    // Ctrl+Shift+Z / Cmd+Shift+Z - Redo
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z' && event.shiftKey) {
      this.handleRedo(event);
      return;
    }
  }

  /**
   * Handles arrow key movement with zoom scaling
   * Extracted from display-drawing lines 498-521
   */
  private handleArrowKeys(event: KeyboardEvent): void {
    const activeObject = this.selectionManager.getActiveObject();
    if (!activeObject) {
      return;
    }

    // Check if object is locked
    if ((activeObject as any).locked) {
      return;
    }

    event.preventDefault();

    // Movement distance scales with zoom level
    const zoom = this.viewportManager.getZoom();
    const movementDistance = this.config.arrowKeyDistance * (1 / zoom);

    switch (event.key) {
      case 'ArrowUp':
        activeObject.top! -= movementDistance;
        break;
      case 'ArrowDown':
        activeObject.top! += movementDistance;
        break;
      case 'ArrowLeft':
        activeObject.left! -= movementDistance;
        break;
      case 'ArrowRight':
        activeObject.left! += movementDistance;
        break;
    }

    activeObject.setCoords();
    this.canvas.requestRenderAll();

    if (this.debug) {
      console.log(`[FabricKit] Moved object by ${movementDistance}px`);
    }
  }

  /**
   * Handles Delete/Backspace key
   */
  private handleDelete(event: KeyboardEvent): void {
    const activeObjects = this.selectionManager.getActiveObjects();
    if (activeObjects.length === 0) {
      return;
    }

    event.preventDefault();
    this.objectManager.deleteSelected();

    if (this.debug) {
      console.log(`[FabricKit] Deleted ${activeObjects.length} object(s)`);
    }
  }

  /**
   * Handles Ctrl+C / Cmd+C (copy)
   * Extracted from display-drawing lines 532-534
   */
  private handleCopy(event: KeyboardEvent): void {
    const activeObjects = this.selectionManager.getActiveObjects();

    // Filter out locked objects
    const unlocked = activeObjects.filter((obj: any) => !obj?.locked);

    if (unlocked.length === 0) {
      return;
    }

    event.preventDefault();
    this.copiedObjects = unlocked;

    if (this.debug) {
      console.log(`[FabricKit] Copied ${unlocked.length} object(s)`);
    }
  }

  /**
   * Handles Ctrl+V / Cmd+V (paste)
   * Extracted from display-drawing lines 536-543
   */
  private handlePaste(event: KeyboardEvent): void {
    if (this.copiedObjects.length === 0) {
      return;
    }

    event.preventDefault();

    // Clone the copied objects (using async/await for v6)
    Promise.all(
      this.copiedObjects.map(async obj => {
        const cloned = await obj.clone();
        // Offset the cloned object slightly
        cloned.left = (cloned.left ?? 0) + 10;
        cloned.top = (cloned.top ?? 0) + 10;
        cloned.setCoords();
        this.canvas.add(cloned);
        return cloned;
      })
    ).then(() => {
      this.canvas.requestRenderAll();
    });

    // Removed synchronous renderAll since we're now async

    if (this.debug) {
      console.log(`[FabricKit] Pasted ${this.copiedObjects.length} object(s)`);
    }
  }

  /**
   * Handles Ctrl+Z / Cmd+Z (undo)
   * Extracted from display-drawing lines 548-552
   */
  private handleUndo(event: KeyboardEvent): void {
    event.preventDefault();

    if (this.undoCallback) {
      this.undoCallback();
      if (this.debug) {
        console.log('[FabricKit] Undo triggered');
      }
    } else if (this.debug) {
      console.warn('[FabricKit] Undo callback not set. Use onUndo() to set it.');
    }
  }

  /**
   * Handles Ctrl+Shift+Z / Cmd+Shift+Z (redo)
   */
  private handleRedo(event: KeyboardEvent): void {
    event.preventDefault();

    if (this.redoCallback) {
      this.redoCallback();
      if (this.debug) {
        console.log('[FabricKit] Redo triggered');
      }
    } else if (this.debug) {
      console.warn('[FabricKit] Redo callback not set. Use onRedo() to set it.');
    }
  }

  /**
   * Cleans up all event listeners
   */
  destroy(): void {
    this.disableKeyboard();
    this.disableSpacebarPan();
    this.disableMouseWheelPan();
    this.disableTouchPan();

    this.copiedObjects = [];
    this.undoCallback = null;
    this.redoCallback = null;

    if (this.debug) {
      console.log('[FabricKit] InputManager destroyed');
    }
  }
}
