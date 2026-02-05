/**
 * Canvas configuration types and defaults
 */
/**
 * Default canvas configuration
 */
export const DEFAULT_CANVAS_CONFIG = {
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
export function mergeConfig(userConfig = {}) {
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
//# sourceMappingURL=config.js.map