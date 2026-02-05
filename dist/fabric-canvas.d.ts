/**
 * Main FabricCanvas class - Entry point for the Fabric Kit library
 * Provides a high-level API for working with Fabric.js canvases
 */
import { CanvasConfig } from './config';
import { EventManager } from './managers/event-manager';
import { FabricCanvas as FabricCanvasType } from './types';
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
 * FabricCanvas class
 * Manages the lifecycle and provides high-level API for Fabric.js canvas
 */
export declare class FabricCanvas {
    private canvas;
    private config;
    private canvasElement;
    private cleanupFunctions;
    readonly shapes: ShapeFactory;
    readonly text: TextFactory;
    readonly images: ImageFactory;
    readonly selection: SelectionManager;
    readonly events: EventManager;
    readonly objects: ObjectManager;
    readonly transform: TransformManager;
    readonly viewport: ViewportManager;
    readonly input: InputManager;
    readonly history: HistoryManager;
    readonly serialization: SerializationManager;
    readonly performance: PerformanceUtility;
    /**
     * Private constructor - use create() static method instead
     */
    private constructor();
    /**
     * Creates and initializes a new Fabric.js canvas instance
     * @param elementOrId - Canvas element or element ID
     * @param config - Canvas configuration
     * @returns FabricCanvas instance
     */
    static create(elementOrId: string | HTMLCanvasElement, config?: CanvasConfig): FabricCanvas;
    /**
     * Initializes the canvas with configuration
     * @param elementOrId - Canvas element or element ID
     */
    private initialize;
    /**
     * Applies selection style configuration to FabricObject defaults
     * This ensures all objects created (via factories, JSON, cloning) have consistent styles
     * Individual objects can still override these defaults
     * @private
     */
    private applySelectionStyles;
    /**
     * Destroys the canvas and cleans up all resources
     * This method should be called when the canvas is no longer needed
     * to prevent memory leaks
     */
    destroy(): void;
    /**
     * Returns the raw Fabric.js canvas instance for advanced use cases
     * Use this as an escape hatch when you need direct access to Fabric.js API
     * @returns Raw Fabric.js canvas instance
     */
    getRawCanvas(): FabricCanvasType;
    /**
     * Updates canvas configuration at runtime
     * @param config - Partial configuration to update
     */
    configure(config: Partial<CanvasConfig>): void;
    /**
     * Returns current canvas configuration
     * @returns Current configuration
     */
    getConfig(): Required<CanvasConfig>;
    /**
     * Enables or disables read-only mode
     * In read-only mode, selection and modification are disabled
     * @param enabled - Whether to enable read-only mode
     */
    setReadOnly(enabled: boolean): void;
    /**
     * Returns whether canvas is in read-only mode
     * @returns True if read-only, false otherwise
     */
    isReadOnly(): boolean;
    /**
     * Enables or disables object selection
     * @param enabled - Whether to enable selection
     */
    setSelectionEnabled(enabled: boolean): void;
    /**
     * Updates selection style configuration at runtime
     * Only affects new objects created after this call
     * Existing objects retain their current styles unless explicitly changed
     * @param styles - Partial selection style configuration to update
     */
    updateSelectionStyle(styles: Partial<import('./types').SelectionStyleConfig>): void;
    /**
     * Set canvas background image from URL
     * Scales image to fit canvas dimensions while maintaining aspect ratio
     * @param imageUrl - URL of the background image
     * @returns Promise that resolves when background is set
     */
    setBackgroundImage(imageUrl: string): Promise<void>;
    /**
     * Set canvas background color
     * @param color - Background color (hex, rgb, rgba, etc.)
     */
    setBackgroundColor(color: string): void;
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
    fitToContainer(containerWidth?: number, containerHeight?: number, fitMode?: 'height' | 'width' | 'auto' | 'contain' | 'cover', canvasWidth?: number, canvasHeight?: number): void;
    /**
     * Registers a cleanup function to be called when the canvas is destroyed
     * @param cleanup - Cleanup function
     */
    protected registerCleanup(cleanup: () => void): void;
    /**
     * Enables debug logging
     */
    enableDebugMode(): void;
    /**
     * Disables debug logging
     */
    disableDebugMode(): void;
}
//# sourceMappingURL=fabric-canvas.d.ts.map