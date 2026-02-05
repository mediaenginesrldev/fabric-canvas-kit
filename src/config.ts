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
  //** Canvas scale X */
  scaleX?: number;
  //** Canvas scale Y */
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
export const DEFAULT_CANVAS_CONFIG: Required<CanvasConfig> = {
  width: 800,
  height: 600,
  scaleX: 1,
  scaleY: 1,
  backgroundColor: '#ffffff',
  selection: true,
  preserveObjectStacking: true,
  keyboard: {
    enabled: true,
    arrowKeys: true,
    arrowKeyDistance: 5,
    scaleArrowKeysWithZoom: true,
    copyPaste: true,
    undo: true,
    redo: true,
    delete: true,
  },
  mouse: {
    spacebarPan: true,
    wheelPan: true,
    preventPageScroll: true,
  },
  touch: {
    enabled: true,
    pan: true,
    maxJumpDistance: 200,
  },
  history: {
    enabled: true,
    maxSize: 50,
    recordViewport: false,
  },
  onChange: {
    enabled: true,
    debounce: 1000,
  },
  zoom: {
    min: 0.1,
    max: 10,
    step: 1.1,
  },
  performance: {
    renderOnAddRemove: true,
    statefulCache: true,
    objectCaching: true, // Can be disabled for better image quality when scaling
  },
  selectionStyle: {
    // Empty object = use FabricJS defaults
    // Users can override with their own values in config
  },
  responsive: false,
  readOnly: false,
  debug: false,
};

/**
 * Merges user config with default config
 */
export function mergeConfig(userConfig: CanvasConfig = {}): Required<CanvasConfig> {
  return {
    ...DEFAULT_CANVAS_CONFIG,
    ...userConfig,
    keyboard: {
      ...DEFAULT_CANVAS_CONFIG.keyboard,
      ...userConfig.keyboard,
    },
    mouse: {
      ...DEFAULT_CANVAS_CONFIG.mouse,
      ...userConfig.mouse,
    },
    touch: {
      ...DEFAULT_CANVAS_CONFIG.touch,
      ...userConfig.touch,
    },
    history: {
      ...DEFAULT_CANVAS_CONFIG.history,
      ...userConfig.history,
    },
    onChange: {
      ...DEFAULT_CANVAS_CONFIG.onChange,
      ...userConfig.onChange,
    },
    zoom: {
      ...DEFAULT_CANVAS_CONFIG.zoom,
      ...userConfig.zoom,
    },
    performance: {
      ...DEFAULT_CANVAS_CONFIG.performance,
      ...userConfig.performance,
    },
    selectionStyle: {
      ...DEFAULT_CANVAS_CONFIG.selectionStyle,
      ...userConfig.selectionStyle,
    },
  };
}
