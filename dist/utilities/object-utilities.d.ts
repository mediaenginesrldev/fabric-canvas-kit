/**
 * Object Utilities
 * Centralized helpers for setting properties on Fabric.js objects
 * This ensures consistent initialization across all object types
 */
import { FabricImage, ImageToAdd } from '../types';
type FabricObject = any;
/**
 * Options interface for custom properties
 */
export interface CustomPropertiesOptions {
    id?: string;
    data?: any;
    locked?: boolean;
}
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
export declare function setCustomProperties<T extends FabricObject>(obj: any, options?: CustomPropertiesOptions): T;
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
export declare function applyImageOptions(img: FabricImage, imageData: ImageToAdd): FabricImage;
export {};
//# sourceMappingURL=object-utilities.d.ts.map