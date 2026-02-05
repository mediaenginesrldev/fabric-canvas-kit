/**
 * Image Factory
 * Provides methods for loading and manipulating images on the canvas
 *
 */
import { FabricCanvas, FabricImage, ImageFilter, ImageOptions, ImageToAdd, MultipleImagesConfig } from '../types';
/**
 * Image Factory class
 * Handles loading and manipulation of image objects
 */
export declare class ImageFactory {
    private canvas;
    private debug;
    constructor(canvas: FabricCanvas, debug?: boolean);
    /**
     * Loads and adds image from URL
     * @param url - Image URL
     * @param options - Image options
     * @returns Promise resolving to created image object
     */
    addFromUrl(imageData: ImageToAdd, select?: boolean): Promise<FabricImage>;
    /**
     * Loads and adds image from File object
     * @param file - File object
     * @param options - Image options
     * @returns Promise resolving to created image object
     */
    addFromFile(file: File, options?: ImageOptions): Promise<FabricImage>;
    /**
     * Flips image horizontally or vertically
     *
     * @param image - Image object to flip
     * @param direction - Flip direction ('horizontal' or 'vertical')
     */
    flip(image: FabricImage, direction?: 'horizontal' | 'vertical'): void;
    /**
     * Opens crop editor for image (requires modal integration)
     *
     * Note: This is a placeholder that returns the image as-is
     * Full implementation would require modal/UI integration
     * @param image - Image object to crop
     * @returns Promise resolving to cropped image
     */
    crop(image: FabricImage): Promise<FabricImage>;
    /**
     * Applies Fabric.js native filter to image
     * @param _image - Image object
     * @param _filter - Filter type
     * @deprecated Filters are not implemented in v6 yet
     */
    applyFilter(_image: FabricImage, _filter: ImageFilter): void;
    /**
     * Removes all filters from image
     * @deprecated Filters are not implemented in v6 yet
     */
    removeFilters(_image: FabricImage): void;
    /**
     * Loads and adds image from base64 string
     * @param base64 - Base64 encoded image string
     * @param options - Image options
     * @returns Promise resolving to created image object
     */
    addFromBase64(base64: string, options?: ImageOptions): Promise<FabricImage>;
    /**
     * Resizes image to specified dimensions
     * @param image - Image object
     * @param width - Target width
     * @param height - Target height
     */
    resize(image: FabricImage, width: number, height: number): void;
    /**
     * Adds multiple images to canvas with optional animation
     * - If positions provided: places images directly without animation
     * - If no positions: centers first image, animates subsequent images in grid pattern
     *
     * @param images - Array of images to add
     * @param config - Animation and positioning configuration
     * @returns Promise resolving to array of created image objects
     */
    addMultipleFromUrl(images: ImageToAdd[], config?: MultipleImagesConfig): Promise<FabricImage[]>;
}
//# sourceMappingURL=image-factory.d.ts.map