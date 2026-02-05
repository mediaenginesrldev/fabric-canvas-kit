/**
 * Object Utilities
 * Centralized helpers for setting properties on Fabric.js objects
 * This ensures consistent initialization across all object types
 */
import { isNullOrUndefined } from './validators';
/**
 * Sets custom properties on a Fabric.js object
 * Provides default values for properties not explicitly provided
 *
 * @param obj - Fabric.js object to set properties on
 * @param options - Custom properties to set
 * @returns The same object (for chaining)
 *
 * @example
 * const rect = new Rect({ left: 0, top: 0 });
 * setCustomProperties(rect, { id: 'a123', data: {}, locked: false });
 *
 * @example
 * // With defaults
 * const circle = new Circle({ radius: 50 });
 * setCustomProperties(circle); // id =undefined, data = null, locked = false
 */
export function setCustomProperties(obj, options = {}) {
    // Set id property (default: undefined for consistency)
    obj.id = options.id ?? undefined;
    // Set data property (default: null for consistency)
    obj.data = options.data ?? null;
    // Set locked property (default: false)
    obj.locked = options.locked ?? false;
    return obj;
}
/**
 * Applies all available image options to a Fabric.js image object
 * Only applies options that are explicitly provided (not null/undefined)
 * Excludes positioning (top, left) and custom properties (id, data, locked)
 *
 * @param img - Fabric.js image object to apply options to
 * @param imageData - Image data containing optional properties
 * @returns The same image object (for chaining)
 *
 * @example
 * const img = await FabricImage.fromURL(url);
 * applyImageOptions(img, {
 *   opacity: 0.8,
 *   scaleX: 0.5,
 *   angle: 45,
 *   selectable: false
 * });
 */
export function applyImageOptions(img, imageData) {
    // Apply standard Fabric.js properties (excluding positioning and custom properties)
    if (!isNullOrUndefined(imageData.opacity))
        img.set('opacity', imageData.opacity);
    if (!isNullOrUndefined(imageData.width))
        img.set('width', imageData.width);
    if (!isNullOrUndefined(imageData.height))
        img.set('height', imageData.height);
    if (!isNullOrUndefined(imageData.fill))
        img.set('fill', imageData.fill);
    if (!isNullOrUndefined(imageData.stroke))
        img.set('stroke', imageData.stroke);
    if (!isNullOrUndefined(imageData.strokeWidth))
        img.set('strokeWidth', imageData.strokeWidth);
    if (!isNullOrUndefined(imageData.selectable))
        img.set('selectable', imageData.selectable);
    if (!isNullOrUndefined(imageData.evented))
        img.set('evented', imageData.evented);
    if (!isNullOrUndefined(imageData.scaleX))
        img.set('scaleX', imageData.scaleX);
    if (!isNullOrUndefined(imageData.scaleY))
        img.set('scaleY', imageData.scaleY);
    if (!isNullOrUndefined(imageData.angle))
        img.set('angle', imageData.angle);
    return img;
}
//# sourceMappingURL=object-utilities.js.map