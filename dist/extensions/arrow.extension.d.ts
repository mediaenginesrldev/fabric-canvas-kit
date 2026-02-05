/**
 * Custom Arrow object for Fabric.js
 * Extends Line with arrowhead that has inverse scaling
 *
 */
import { Line } from 'fabric';
/**
 * Arrow class - extends Fabric.js Line with arrowhead
 * The arrowhead uses inverse scaling to maintain consistent size
 */
export declare class Arrow extends Line {
    arrowSize: number;
    constructor(points: [number, number, number, number], options?: any);
    /**
     * Renders the arrow with inverse-scaled arrowhead
     */
    _render(ctx: CanvasRenderingContext2D): void;
    /**
     * Converts Arrow to object representation
     */
    toObject(propertiesToInclude?: any[]): any;
    /**
     * Creates Arrow from object representation
     */
    static fromObject(object: any): Promise<Arrow>;
}
/**
 * Registers the Arrow extension with Fabric.js
 */
export declare function registerArrowExtension(): void;
//# sourceMappingURL=arrow.extension.d.ts.map