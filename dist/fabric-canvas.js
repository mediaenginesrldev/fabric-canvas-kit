/**
 * Main FabricCanvas class - Entry point for the Fabric Kit library
 * Provides a high-level API for working with Fabric.js canvases
 */
import { Canvas, FabricObject } from 'fabric';
import { mergeConfig } from './config';
import { EventManager } from './managers/event-manager';
import { HistoryManager } from './managers/history-manager';
import { ImageFactory } from './factories/image-factory';
import { InputManager } from './managers/input-manager';
import { ObjectManager } from './managers/object-manager';
import { PerformanceUtility } from './utilities/performance';
import { SelectionManager } from './managers/selection-manager';
import { SerializationManager } from './managers/serialization-manager';
import { ShapeFactory } from './factories/shape-factory';
import { TextFactory } from './factories/text-factory';
import { TransformManager } from './managers/transform-manager';
import { ViewportManager } from './managers/viewport-manager';
/**
 * Set global custom properties for all Fabric.js objects
 * This ensures custom properties are always included in serialization
 * - id: Unique identifier for the object (default: null)
 * - data: Custom application data (default: null)
 * - locked: Lock state for object manipulation (default: false)
 */
FabricObject.customProperties = ['id', 'data', 'locked'];
/**
 * FabricCanvas class
 * Manages the lifecycle and provides high-level API for Fabric.js canvas
 */
export class FabricCanvas {
    /**
     * Private constructor - use create() static method instead
     */
    constructor(config) {
        this.cleanupFunctions = [];
        this.config = mergeConfig(config);
    }
    /**
     * Creates and initializes a new Fabric.js canvas instance
     * @param elementOrId - Canvas element or element ID
     * @param config - Canvas configuration
     * @returns FabricCanvas instance
     */
    static create(elementOrId, config = {}) {
        const instance = new FabricCanvas(config);
        instance.initialize(elementOrId);
        return instance;
    }
    /**
     * Initializes the canvas with configuration
     * @param elementOrId - Canvas element or element ID
     */
    initialize(elementOrId) {
        // Get canvas element
        if (typeof elementOrId === 'string') {
            const element = document.getElementById(elementOrId);
            if (!element || !(element instanceof HTMLCanvasElement)) {
                throw new Error(`Canvas element with id "${elementOrId}" not found or is not a canvas element`);
            }
            this.canvasElement = element;
        }
        else {
            this.canvasElement = elementOrId;
        }
        // Create Fabric.js canvas
        this.canvas = new Canvas(this.canvasElement, {
            width: this.config.width,
            height: this.config.height,
            backgroundColor: this.config.backgroundColor,
            selection: this.config.selection && !this.config.readOnly,
            preserveObjectStacking: this.config.preserveObjectStacking,
            renderOnAddRemove: this.config.performance.renderOnAddRemove,
        });
        // Set high-quality image smoothing for better downscaling quality
        const ctx = this.canvas.getContext();
        if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
        }
        // Apply selection styles before creating any objects
        this.applySelectionStyles();
        // Initialize factories and managers
        this.shapes = new ShapeFactory(this.canvas, this.config.debug);
        this.text = new TextFactory(this.canvas, this.config.debug);
        this.images = new ImageFactory(this.canvas, this.config.debug);
        this.selection = new SelectionManager(this.canvas, this.config.debug);
        this.events = new EventManager(this.canvas, this.config.onChange.debounce, this.config.debug);
        this.objects = new ObjectManager(this.canvas, this.config.debug, this.events);
        this.transform = new TransformManager(this.canvas, this.config.debug);
        this.viewport = new ViewportManager(this.canvas, this.events, this.config.zoom.min, this.config.zoom.max, this.config.debug);
        this.input = new InputManager(this.canvas, this.selection, this.viewport, this.objects, {
            keyboard: this.config.keyboard.enabled,
            spacebarPan: this.config.mouse.spacebarPan,
            mouseWheelPan: this.config.mouse.wheelPan,
            touchPan: this.config.touch.pan ?? this.config.touch.enabled,
            arrowKeyDistance: this.config.keyboard.arrowKeyDistance,
            touchPanMaxJump: this.config.touch.maxJumpDistance,
            debug: this.config.debug,
        });
        this.history = new HistoryManager(this.canvas, this.events, {
            maxSize: this.config.history.maxSize,
            debug: this.config.debug,
        });
        this.serialization = new SerializationManager(this.canvas, this.config.debug);
        this.performance = new PerformanceUtility(this.canvas, this.config.debug);
        // Connect InputManager undo/redo to HistoryManager
        this.input.onUndo(() => this.history.undo());
        this.input.onRedo(() => this.history.redo());
        // Register cleanup functions
        this.registerCleanup(() => this.events.destroy());
        this.registerCleanup(() => this.input.destroy());
        this.registerCleanup(() => this.history.destroy());
        this.registerCleanup(() => this.serialization.destroy());
        this.registerCleanup(() => this.performance.destroy());
        this.registerCleanup(() => this.objects.destroy());
        this.registerCleanup(() => this.selection.destroy());
        this.registerCleanup(() => this.transform.destroy());
        this.registerCleanup(() => this.viewport.destroy());
        // Apply read-only mode
        if (this.config.readOnly) {
            this.setReadOnly(true);
        }
        // Log initialization if debug is enabled
        if (this.config.debug) {
            console.log('[FabricKit] Canvas initialized', {
                width: this.config.width,
                height: this.config.height,
                config: this.config,
            });
        }
    }
    /**
     * Applies selection style configuration to FabricObject defaults
     * This ensures all objects created (via factories, JSON, cloning) have consistent styles
     * Individual objects can still override these defaults
     * @private
     */
    applySelectionStyles() {
        const styles = this.config.selectionStyle;
        // Apply to FabricObject defaults (FabricJS 6 pattern)
        if (styles.transparentCorners !== undefined) {
            FabricObject.ownDefaults.transparentCorners = styles.transparentCorners;
        }
        if (styles.cornerColor !== undefined) {
            FabricObject.ownDefaults.cornerColor = styles.cornerColor;
        }
        if (styles.cornerStrokeColor !== undefined) {
            FabricObject.ownDefaults.cornerStrokeColor = styles.cornerStrokeColor;
        }
        if (styles.cornerStyle !== undefined) {
            FabricObject.ownDefaults.cornerStyle = styles.cornerStyle;
        }
        if (styles.borderColor !== undefined) {
            FabricObject.ownDefaults.borderColor = styles.borderColor;
        }
        if (styles.cornerSize !== undefined) {
            FabricObject.ownDefaults.cornerSize = styles.cornerSize;
        }
        if (this.config.debug) {
            console.log('[FabricKit] Selection styles applied', styles);
        }
    }
    /**
     * Destroys the canvas and cleans up all resources
     * This method should be called when the canvas is no longer needed
     * to prevent memory leaks
     */
    destroy() {
        if (this.config.debug) {
            console.log('[FabricKit] Destroying canvas');
        }
        // Execute all cleanup functions
        this.cleanupFunctions.forEach(cleanup => cleanup());
        this.cleanupFunctions = [];
        // Dispose Fabric.js canvas
        if (this.canvas) {
            this.canvas.dispose();
        }
        if (this.config.debug) {
            console.log('[FabricKit] Canvas destroyed');
        }
    }
    /**
     * Returns the raw Fabric.js canvas instance for advanced use cases
     * Use this as an escape hatch when you need direct access to Fabric.js API
     * @returns Raw Fabric.js canvas instance
     */
    getRawCanvas() {
        return this.canvas;
    }
    /**
     * Updates canvas configuration at runtime
     * @param config - Partial configuration to update
     */
    configure(config) {
        this.config = mergeConfig({ ...this.config, ...config });
        // Apply updated configuration
        if (config.width !== undefined) {
            this.canvas.setWidth(config.width);
        }
        if (config.height !== undefined) {
            this.canvas.setHeight(config.height);
        }
        if (config.backgroundColor !== undefined) {
            this.canvas.backgroundColor = config.backgroundColor;
            this.canvas.requestRenderAll();
        }
        if (config.selection !== undefined && !this.config.readOnly) {
            this.canvas.selection = config.selection;
        }
        if (config.preserveObjectStacking !== undefined) {
            this.canvas.preserveObjectStacking = config.preserveObjectStacking;
        }
        if (this.config.debug) {
            console.log('[FabricKit] Configuration updated', config);
        }
    }
    /**
     * Returns current canvas configuration
     * @returns Current configuration
     */
    getConfig() {
        return { ...this.config };
    }
    /**
     * Enables or disables read-only mode
     * In read-only mode, selection and modification are disabled
     * @param enabled - Whether to enable read-only mode
     */
    setReadOnly(enabled) {
        this.config.readOnly = enabled;
        this.canvas.selection = !enabled;
        // Disable selection and evented for all objects
        const objects = this.canvas.getObjects();
        objects.forEach((obj) => {
            obj.selectable = !enabled;
            obj.evented = !enabled;
        });
        this.canvas.requestRenderAll();
        if (this.config.debug) {
            console.log('[FabricKit] Read-only mode:', enabled);
        }
    }
    /**
     * Returns whether canvas is in read-only mode
     * @returns True if read-only, false otherwise
     */
    isReadOnly() {
        return this.config.readOnly;
    }
    /**
     * Enables or disables object selection
     * @param enabled - Whether to enable selection
     */
    setSelectionEnabled(enabled) {
        this.canvas.selection = enabled && !this.config.readOnly;
        this.canvas.requestRenderAll();
        if (this.config.debug) {
            console.log('[FabricKit] Selection enabled:', enabled);
        }
    }
    /**
     * Updates selection style configuration at runtime
     * Only affects new objects created after this call
     * Existing objects retain their current styles unless explicitly changed
     * @param styles - Partial selection style configuration to update
     */
    updateSelectionStyle(styles) {
        // Merge with existing config
        this.config.selectionStyle = {
            ...this.config.selectionStyle,
            ...styles,
        };
        // Apply to FabricObject defaults for future objects
        this.applySelectionStyles();
        // Note: We don't update existing objects (Option A from Q3)
        // This keeps the implementation simple and performant
        // Users can manually update specific objects if needed
        if (this.config.debug) {
            console.log('[FabricKit] Selection styles updated', styles);
        }
    }
    /**
     * Set canvas background image from URL
     * Scales image to fit canvas dimensions while maintaining aspect ratio
     * @param imageUrl - URL of the background image
     * @returns Promise that resolves when background is set
     */
    async setBackgroundImage(imageUrl) {
        try {
            // Load image using ImageFactory
            const img = await this.images.addFromUrl({
                url: imageUrl,
                selectable: false,
                evented: false,
            }, false);
            // Remove from canvas objects (we don't want it as a regular object)
            this.canvas.remove(img);
            // Get canvas dimensions
            const canvasWidth = this.canvas.width || this.config.width;
            const canvasHeight = this.canvas.height || this.config.height;
            // Get image dimensions
            const imgWidth = img.width || 1;
            const imgHeight = img.height || 1;
            // Calculate scale to cover canvas while maintaining aspect ratio (like background-size: cover)
            const scaleX = canvasWidth / imgWidth;
            const scaleY = canvasHeight / imgHeight;
            const scale = Math.max(scaleX, scaleY); // Cover canvas entirely
            // Calculate scaled dimensions
            const scaledWidth = imgWidth * scale;
            const scaledHeight = imgHeight * scale;
            // Center the image if it overflows
            const left = (canvasWidth - scaledWidth) / 2;
            const top = (canvasHeight - scaledHeight) / 2;
            // Scale and position image
            img.set({
                left: left,
                top: top,
                scaleX: scale,
                scaleY: scale,
            });
            // Add canvas reference to the image for proper zoom detection
            // This is required by Fabric.js for image caching to work correctly with viewport transforms
            img.canvas = this.canvas;
            // Set as background image
            this.canvas.backgroundImage = img;
            this.canvas.requestRenderAll();
            if (this.config.debug) {
                console.log('[FabricKit] Background image set:', imageUrl, {
                    canvasSize: { width: canvasWidth, height: canvasHeight },
                    imageSize: { width: imgWidth, height: imgHeight },
                    scale: scale,
                });
            }
        }
        catch (error) {
            if (this.config.debug) {
                console.error('[FabricKit] Failed to set background image:', error);
            }
            throw error;
        }
    }
    /**
     * Set canvas background color
     * @param color - Background color (hex, rgb, rgba, etc.)
     */
    setBackgroundColor(color) {
        this.canvas.backgroundColor = color;
        this.canvas.requestRenderAll();
        if (this.config.debug) {
            console.log('[FabricKit] Background color set:', color);
        }
    }
    /**
     * Fit canvas to container with different fitting strategies
     * Scales and centers the canvas viewport to fit the provided container dimensions
     * @param containerWidth - Container width in pixels (optional, defaults to canvas width)
     * @param containerHeight - Container height in pixels (optional, defaults to canvas height)
     * @param fitMode - Fitting strategy:
     *   - 'height': Scale to fit container height (width may overflow)
     *   - 'width': Scale to fit container width (height may overflow)
     *   - 'auto' | 'contain': Fit entire canvas inside container (maintains aspect ratio, may have empty space)
     *   - 'cover': Fill entire container (maintains aspect ratio, may crop content)
     * @param canvasWidth - Optional custom canvas width for scaling calculation
     * @param canvasHeight - Optional custom canvas height for scaling calculation
     */
    fitToContainer(containerWidth, containerHeight, fitMode = 'auto', canvasWidth, canvasHeight) {
        // Use provided dimensions or fallback to canvas/config dimensions
        const cWidth = containerWidth ?? (this.canvas.width || this.config.width);
        const cHeight = containerHeight ?? (this.canvas.height || this.config.height);
        const canvWidth = canvasWidth ?? (this.canvas.width || this.config.width);
        const canvHeight = canvasHeight ?? (this.canvas.height || this.config.height);
        let scale;
        switch (fitMode) {
            case 'height':
                // Scale based on height only (width may overflow)
                scale = cHeight / canvHeight;
                break;
            case 'width':
                // Scale based on width only (height may overflow)
                scale = cWidth / canvWidth;
                break;
            case 'cover':
                // Scale to cover entire container (may crop)
                scale = Math.max(cWidth / canvWidth, cHeight / canvHeight);
                break;
            case 'auto':
            case 'contain':
            default:
                // Scale to fit entirely inside container (may have empty space)
                scale = Math.min(cWidth / canvWidth, cHeight / canvHeight);
                break;
        }
        // Calculate scaled dimensions of the ACTUAL canvas (for viewport transform)
        // Note: If custom canvas dimensions were provided, they were used for scale calculation,
        // but the viewport transform operates on the actual canvas dimensions
        const actualCanvasWidth = this.canvas.width || this.config.width;
        const actualCanvasHeight = this.canvas.height || this.config.height;
        const scaledWidth = actualCanvasWidth * scale;
        const scaledHeight = actualCanvasHeight * scale;
        // Calculate offsets to center the canvas
        const offsetX = (cWidth - scaledWidth) / 2;
        const offsetY = (cHeight - scaledHeight) / 2;
        // Apply viewport transform: [scaleX, skewY, skewX, scaleY, translateX, translateY]
        // Cast to any to access setViewportTransform (Fabric.js Canvas method)
        this.canvas.setViewportTransform([scale, 0, 0, scale, offsetX, offsetY]);
        this.canvas.requestRenderAll();
        if (this.config.debug) {
            console.log('[FabricKit] Canvas fitted to container', {
                fitMode,
                containerSize: { width: cWidth, height: cHeight },
                canvasSize: { width: canvWidth, height: canvHeight },
                scale,
                scaledSize: { width: scaledWidth, height: scaledHeight },
                offset: { x: offsetX, y: offsetY },
            });
        }
    }
    /**
     * Registers a cleanup function to be called when the canvas is destroyed
     * @param cleanup - Cleanup function
     */
    registerCleanup(cleanup) {
        this.cleanupFunctions.push(cleanup);
    }
    /**
     * Enables debug logging
     */
    enableDebugMode() {
        this.config.debug = true;
        console.log('[FabricKit] Debug mode enabled');
    }
    /**
     * Disables debug logging
     */
    disableDebugMode() {
        this.config.debug = false;
    }
}
//# sourceMappingURL=fabric-canvas.js.map