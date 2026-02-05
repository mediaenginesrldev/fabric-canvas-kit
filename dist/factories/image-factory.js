/**
 * Image Factory
 * Provides methods for loading and manipulating images on the canvas
 *
 */
import { FabricImage as FabricImageClass, util } from 'fabric';
import { applyImageOptions, setCustomProperties } from '../utilities/object-utilities';
import { hasPositioning } from '../utilities/validators';
/**
 * Image Factory class
 * Handles loading and manipulation of image objects
 */
export class ImageFactory {
    constructor(canvas, debug = false) {
        this.canvas = canvas;
        this.debug = debug;
    }
    /**
     * Loads and adds image from URL
     * @param url - Image URL
     * @param options - Image options
     * @returns Promise resolving to created image object
     */
    async addFromUrl(imageData, select = true) {
        const img = await FabricImageClass.fromURL(imageData.url, {
            crossOrigin: imageData.crossOrigin ?? 'anonymous',
        });
        if (!img) {
            throw new Error('Failed to load image from URL');
        }
        // Set custom properties (id, data, locked)
        if (imageData.data || imageData.id || imageData.locked !== undefined) {
            setCustomProperties(img, {
                data: imageData.data,
                id: imageData.id,
                locked: imageData.locked,
            });
        }
        // Apply all image options (opacity, scale, angle, etc.)
        applyImageOptions(img, imageData);
        // If image has positioning, set directly and skip animation
        if (hasPositioning(imageData)) {
            img.set('left', imageData.left);
            img.set('top', imageData.top);
            this.canvas.add(img);
        }
        else {
            this.canvas.add(img);
            this.canvas.centerObject(img);
        }
        if (select)
            this.canvas.setActiveObject(img);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Image loaded from URL', img);
        }
        return img;
    }
    /**
     * Loads and adds image from File object
     * @param file - File object
     * @param options - Image options
     * @returns Promise resolving to created image object
     */
    addFromFile(file, options = {}) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const dataUrl = e.target?.result;
                if (!dataUrl) {
                    reject(new Error('Failed to read file'));
                    return;
                }
                try {
                    const img = await FabricImageClass.fromURL(dataUrl);
                    if (!img) {
                        reject(new Error('Failed to create image from file'));
                        return;
                    }
                    // Set custom properties
                    setCustomProperties(img, options);
                    // Apply options
                    img.set({
                        left: options.left ?? 100,
                        top: options.top ?? 100,
                        opacity: options.opacity ?? 1,
                        angle: options.angle ?? 0,
                        scaleX: options.scaleX ?? 1,
                        scaleY: options.scaleY ?? 1,
                        selectable: options.selectable ?? true,
                        evented: options.evented ?? true,
                    });
                    this.canvas.add(img);
                    this.canvas.setActiveObject(img);
                    this.canvas.requestRenderAll();
                    if (this.debug) {
                        console.log('[FabricKit] Image loaded from file', file.name);
                    }
                    resolve(img);
                }
                catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };
            reader.readAsDataURL(file);
        });
    }
    /**
     * Flips image horizontally or vertically
     *
     * @param image - Image object to flip
     * @param direction - Flip direction ('horizontal' or 'vertical')
     */
    flip(image, direction = 'horizontal') {
        if (direction === 'horizontal') {
            image.set('flipX', !image.flipX);
        }
        else {
            image.set('flipY', !image.flipY);
        }
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Image flipped', direction);
        }
    }
    /**
     * Opens crop editor for image (requires modal integration)
     *
     * Note: This is a placeholder that returns the image as-is
     * Full implementation would require modal/UI integration
     * @param image - Image object to crop
     * @returns Promise resolving to cropped image
     */
    async crop(image) {
        // This is a simplified version - full implementation would open a modal
        // For now, return the image as-is
        if (this.debug) {
            console.log('[FabricKit] Crop method called (requires modal integration)');
        }
        return Promise.resolve(image);
    }
    /**
     * Applies Fabric.js native filter to image
     * @param _image - Image object
     * @param _filter - Filter type
     * @deprecated Filters are not implemented in v6 yet
     */
    applyFilter(_image, _filter) {
        if (this.debug) {
            console.warn('[FabricKit] Image filters are not implemented in Fabric.js v6 yet');
        }
    }
    /**
     * Removes all filters from image
     * @deprecated Filters are not implemented in v6 yet
     */
    removeFilters(_image) {
        if (this.debug) {
            console.warn('[FabricKit] Image filters are not implemented in Fabric.js v6 yet');
        }
    }
    /**
     * Loads and adds image from base64 string
     * @param base64 - Base64 encoded image string
     * @param options - Image options
     * @returns Promise resolving to created image object
     */
    async addFromBase64(base64, options = {}) {
        // Ensure data URL prefix
        const dataUrl = base64.startsWith('data:') ? base64 : `data:image/png;base64,${base64}`;
        const img = await FabricImageClass.fromURL(dataUrl);
        if (!img) {
            throw new Error('Failed to create image from base64');
        }
        // Set custom properties
        setCustomProperties(img, options);
        // Apply options
        img.set({
            left: options.left ?? 100,
            top: options.top ?? 100,
            opacity: options.opacity ?? 1,
            angle: options.angle ?? 0,
            scaleX: options.scaleX ?? 1,
            scaleY: options.scaleY ?? 1,
            selectable: options.selectable ?? true,
            evented: options.evented ?? true,
        });
        this.canvas.add(img);
        this.canvas.setActiveObject(img);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Image loaded from base64');
        }
        return img;
    }
    /**
     * Resizes image to specified dimensions
     * @param image - Image object
     * @param width - Target width
     * @param height - Target height
     */
    resize(image, width, height) {
        const currentWidth = image.width || 1;
        const currentHeight = image.height || 1;
        image.set({
            scaleX: width / currentWidth,
            scaleY: height / currentHeight,
        });
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Image resized to', width, 'x', height);
        }
    }
    /**
     * Adds multiple images to canvas with optional animation
     * - If positions provided: places images directly without animation
     * - If no positions: centers first image, animates subsequent images in grid pattern
     *
     * @param images - Array of images to add
     * @param config - Animation and positioning configuration
     * @returns Promise resolving to array of created image objects
     */
    async addMultipleFromUrl(images, config = {}) {
        // Set defaults
        const duration = config.duration ?? 1000;
        const selectLast = config.selectLast ?? true;
        const addedImages = [];
        // Check if all images have positions (AI mode)
        const allHavePositions = images.every(img => !!img.top && !!img.left);
        const imagesWithoutPositions = images.filter(img => hasPositioning(img) === false);
        for (let index = 0; index < images.length; index++) {
            const imageData = images[index];
            try {
                // Load image
                const img = await FabricImageClass.fromURL(imageData.url, {
                    crossOrigin: imageData.crossOrigin,
                });
                if (!img) {
                    console.warn('[FabricKit] Failed to load image:', imageData.url);
                    continue;
                }
                // Set custom properties (id, data, locked)
                if (imageData.data || imageData.id || imageData.locked !== undefined) {
                    setCustomProperties(img, {
                        data: imageData.data,
                        id: imageData.id,
                        locked: imageData.locked,
                    });
                }
                // Apply all image options (opacity, scale, angle, etc.)
                applyImageOptions(img, imageData);
                // If image has positioning, set directly and skip animation
                if (hasPositioning(imageData)) {
                    img.set('left', imageData.left);
                    img.set('top', imageData.top);
                    this.canvas.add(img);
                    addedImages.push(img);
                }
                else {
                    this.canvas.add(img);
                    this.canvas.centerObject(img);
                    addedImages.push(img);
                    const index = imagesWithoutPositions.findIndex(imgData => imgData.url === imageData.url);
                    if (index > 0) {
                        // Animate to offset position (Fabric v6 syntax)
                        const targetLeft = img.left + 50 * index;
                        const targetTop = img.top + 50 * index;
                        img.animate({ left: targetLeft, top: targetTop }, {
                            duration,
                            onChange: () => this.canvas.renderAll.bind(this.canvas),
                            easing: util.ease.easeOutExpo,
                        });
                    }
                }
                // Bring to front
                this.canvas.bringObjectToFront(img);
                this.canvas.requestRenderAll();
            }
            catch (error) {
                console.error('[FabricKit] Failed to add image:', imageData.url, error);
            }
        }
        // Select last image if requested
        if (selectLast && addedImages.length > 0) {
            this.canvas.setActiveObject(addedImages[addedImages.length - 1]);
        }
        this.canvas.renderAll();
        if (this.debug) {
            console.log('[FabricKit] Added', addedImages.length, 'images', allHavePositions ? '(positioned)' : '(animated)');
        }
        return addedImages;
    }
}
//# sourceMappingURL=image-factory.js.map