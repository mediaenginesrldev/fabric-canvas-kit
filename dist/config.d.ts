/**
 * Canvas configuration types and defaults
 */
import { SelectionStyleConfig } from './types';
/**
 * Keyboard configuration
 */
export interface KeyboardConfig {
    /** Enable all keyboard shortcuts (default: true) */
    enabled?: boolean;
    /** Enable arrow key movement */
    arrowKeys?: boolean;
    /** Distance for arrow key movement (default: 5) */
    arrowKeyDistance?: number;
    /** Scale arrow key movement with zoom level */
    scaleArrowKeysWithZoom?: boolean;
    /** Enable copy/paste shortcuts (Ctrl/Cmd+C/V) */
    copyPaste?: boolean;
    /** Enable undo shortcut (Ctrl/Cmd+Z) */
    undo?: boolean;
    /** Enable redo shortcut (Ctrl/Cmd+Shift+Z) */
    redo?: boolean;
    /** Enable delete key */
    delete?: boolean;
}
/**
 * Mouse configuration
 */
export interface MouseConfig {
    /** Enable spacebar + drag to pan */
    spacebarPan?: boolean;
    /** Enable mouse wheel/trackpad scrolling to pan */
    wheelPan?: boolean;
    /** Prevent page scroll when using wheel pan */
    preventPageScroll?: boolean;
}
/**
 * Touch configuration
 */
export interface TouchConfig {
    /** Enable two-finger touch panning */
    enabled?: boolean;
    /** Enable touch pan (alias for enabled) */
    pan?: boolean;
    /** Maximum allowed jump distance to prevent glitches (default: 200) */
    maxJumpDistance?: number;
}
/**
 * History configuration
 */
export interface HistoryConfig {
    /** Enable undo/redo history tracking */
    enabled?: boolean;
    /** Maximum number of history entries (default: 50) */
    maxSize?: number;
    /** Record viewport changes (zoom/pan) in history (default: false) */
    recordViewport?: boolean;
}
/**
 * OnChange event configuration
 */
export interface OnChangeConfig {
    /** Enable onChange event */
    enabled?: boolean;
    /** Debounce time in milliseconds (default: 1000) */
    debounce?: number;
}
/**
 * Zoom configuration
 */
export interface ZoomConfig {
    /** Minimum zoom level (default: 0.1) */
    min?: number;
    /** Maximum zoom level (default: 10) */
    max?: number;
    /** Zoom step for zoomIn/zoomOut (default: 1.1) */
    step?: number;
}
/**
 * Performance configuration
 */
export interface PerformanceConfig {
    /** Enable render on demand (default: true) */
    renderOnAddRemove?: boolean;
    /** Enable stateful cache (default: true) */
    statefulCache?: boolean;
    /** Enable object caching for better performance (default: true). Disable for better quality when scaling images. */
    objectCaching?: boolean;
}
/**
 * Canvas configuration interface
 */
export interface CanvasConfig {
    /** Canvas width (default: container width) */
    width?: number;
    /** Canvas height (default: container height) */
    height?: number;
    scaleX?: number;
    scaleY?: number;
    /** Canvas background color */
    backgroundColor?: string;
    /** Enable selection of objects */
    selection?: boolean;
    /** Preserve object stacking order when selecting (default: true) */
    preserveObjectStacking?: boolean;
    /** Keyboard configuration */
    keyboard?: KeyboardConfig;
    /** Mouse configuration */
    mouse?: MouseConfig;
    /** Touch configuration */
    touch?: TouchConfig;
    /** History configuration */
    history?: HistoryConfig;
    /** OnChange event configuration */
    onChange?: OnChangeConfig;
    /** Zoom configuration */
    zoom?: ZoomConfig;
    /** Performance configuration */
    performance?: PerformanceConfig;
    /** Selection control styling */
    selectionStyle?: SelectionStyleConfig;
    /** Enable responsive behavior (auto-resize) */
    responsive?: boolean;
    /** Read-only mode (disables selection and modification) */
    readOnly?: boolean;
    /** Enable debug logging */
    debug?: boolean;
}
/**
 * Default canvas configuration
 */
export declare const DEFAULT_CANVAS_CONFIG: Required<CanvasConfig>;
/**
 * Merges user config with default config
 */
export declare function mergeConfig(userConfig?: CanvasConfig): Required<CanvasConfig>;
//# sourceMappingURL=config.d.ts.map