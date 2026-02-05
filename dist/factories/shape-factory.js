/**
 * Shape Factory
 * Provides methods for creating geometric shapes on the canvas
 *
 */
import { Arrow, registerArrowExtension } from '../extensions/arrow.extension';
import { Circle, Line, Rect, Triangle } from 'fabric';
import { setCustomProperties } from '../utilities/object-utilities';
/**
 * Helper function to determine if an object should be set as selected after creation
 * @param selectable - Whether the object is selectable
 * @param setAsSelected - Whether to set as selected (default: true)
 * @returns true if object should be set as active, false otherwise
 */
function shouldSetAsSelected(selectable = true, setAsSelected = true) {
    // If object is not selectable, it cannot be selected
    if (!selectable) {
        return false;
    }
    // Otherwise, respect the setAsSelected parameter
    return setAsSelected;
}
/**
 * Shape Factory class
 * Handles creation of geometric shapes
 */
export class ShapeFactory {
    constructor(canvas, debug = false) {
        this.canvas = canvas;
        this.debug = debug;
        // Register Arrow extension on first use
        registerArrowExtension();
    }
    /**
     * Adds a rectangle to the canvas
     * @param options - Rectangle options
     * @returns Created rectangle object
     */
    addRectangle(options = {}) {
        const rect = new Rect({
            left: options.left ?? 100,
            top: options.top ?? 100,
            width: options.width ?? 200,
            height: options.height ?? 100,
            fill: options.fill ?? '#cccccc',
            stroke: options.stroke ?? '#000000',
            strokeWidth: options.strokeWidth ?? 1,
            opacity: options.opacity ?? 1,
            angle: options.angle ?? 0,
            scaleX: options.scaleX ?? 1,
            scaleY: options.scaleY ?? 1,
            selectable: options.selectable ?? true,
            evented: options.evented ?? true,
            rx: options.rx ?? 0,
            ry: options.ry ?? 0,
        });
        // Set custom properties
        setCustomProperties(rect, options);
        this.canvas.add(rect);
        // Only set as selected if selectable and setAsSelected allows it
        if (shouldSetAsSelected(options.selectable, options.setAsSelected)) {
            this.canvas.setActiveObject(rect);
        }
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Rectangle added', rect);
        }
        return rect;
    }
    /**
     * Adds a square to the canvas
     * @param options - Square options
     * @returns Created square object (Rect with equal width/height)
     */
    addSquare(options = {}) {
        const size = options.size ?? 100;
        const square = new Rect({
            left: options.left ?? 100,
            top: options.top ?? 100,
            width: size,
            height: size,
            fill: options.fill ?? '#cccccc',
            stroke: options.stroke ?? '#000000',
            strokeWidth: options.strokeWidth ?? 1,
            opacity: options.opacity ?? 1,
            angle: options.angle ?? 0,
            scaleX: options.scaleX ?? 1,
            scaleY: options.scaleY ?? 1,
            selectable: options.selectable ?? true,
            evented: options.evented ?? true,
        });
        // Set custom properties
        setCustomProperties(square, options);
        this.canvas.add(square);
        // Only set as selected if selectable and setAsSelected allows it
        if (shouldSetAsSelected(options.selectable, options.setAsSelected)) {
            this.canvas.setActiveObject(square);
        }
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Square added', square);
        }
        return square;
    }
    /**
     * Adds a circle to the canvas
     * @param options - Circle options
     * @returns Created circle object
     */
    addCircle(options = {}) {
        const circle = new Circle({
            left: options.left ?? 100,
            top: options.top ?? 100,
            radius: options.radius ?? 50,
            fill: options.fill ?? '#cccccc',
            stroke: options.stroke ?? '#000000',
            strokeWidth: options.strokeWidth ?? 1,
            opacity: options.opacity ?? 1,
            angle: options.angle ?? 0,
            scaleX: options.scaleX ?? 1,
            scaleY: options.scaleY ?? 1,
            selectable: options.selectable ?? true,
            evented: options.evented ?? true,
        });
        // Set custom properties
        setCustomProperties(circle, options);
        this.canvas.add(circle);
        // Only set as selected if selectable and setAsSelected allows it
        if (shouldSetAsSelected(options.selectable, options.setAsSelected)) {
            this.canvas.setActiveObject(circle);
        }
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Circle added', circle);
        }
        return circle;
    }
    /**
     * Adds a triangle to the canvas
     * @param options - Triangle options
     * @returns Created triangle object
     */
    addTriangle(options = {}) {
        const triangle = new Triangle({
            left: options.left ?? 100,
            top: options.top ?? 100,
            width: options.width ?? 100,
            height: options.height ?? 100,
            fill: options.fill ?? '#cccccc',
            stroke: options.stroke ?? '#000000',
            strokeWidth: options.strokeWidth ?? 1,
            opacity: options.opacity ?? 1,
            angle: options.angle ?? 0,
            scaleX: options.scaleX ?? 1,
            scaleY: options.scaleY ?? 1,
            selectable: options.selectable ?? true,
            evented: options.evented ?? true,
        });
        // Set custom properties
        setCustomProperties(triangle, options);
        this.canvas.add(triangle);
        // Only set as selected if selectable and setAsSelected allows it
        if (shouldSetAsSelected(options.selectable, options.setAsSelected)) {
            this.canvas.setActiveObject(triangle);
        }
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Triangle added', triangle);
        }
        return triangle;
    }
    /**
     * Adds a line to the canvas
     * @param options - Line options
     * @returns Created line object
     */
    addLine(options = {}) {
        const x1 = options.x1 ?? 50;
        const y1 = options.y1 ?? 50;
        const x2 = options.x2 ?? 200;
        const y2 = options.y2 ?? 200;
        const line = new Line([x1, y1, x2, y2], {
            left: options.left ?? x1,
            top: options.top ?? y1,
            stroke: options.stroke ?? '#000000',
            strokeWidth: options.strokeWidth ?? 2,
            opacity: options.opacity ?? 1,
            angle: options.angle ?? 0,
            scaleX: options.scaleX ?? 1,
            scaleY: options.scaleY ?? 1,
            selectable: options.selectable ?? true,
            evented: options.evented ?? true,
        });
        // Set custom properties
        setCustomProperties(line, options);
        this.canvas.add(line);
        // Only set as selected if selectable and setAsSelected allows it
        if (shouldSetAsSelected(options.selectable, options.setAsSelected)) {
            this.canvas.setActiveObject(line);
        }
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Line added', line);
        }
        return line;
    }
    /**
     * Adds an arrow to the canvas using custom Arrow extension
     * @param options - Arrow options
     * @returns Created arrow object
     */
    addArrow(options = {}) {
        const x1 = options.x1 ?? 50;
        const y1 = options.y1 ?? 50;
        const x2 = options.x2 ?? 200;
        const y2 = options.y2 ?? 200;
        const arrow = new Arrow([x1, y1, x2, y2], {
            left: options.left ?? x1,
            top: options.top ?? y1,
            stroke: options.stroke ?? '#000000',
            strokeWidth: options.strokeWidth ?? 2,
            opacity: options.opacity ?? 1,
            angle: options.angle ?? 0,
            scaleX: options.scaleX ?? 1,
            scaleY: options.scaleY ?? 1,
            selectable: options.selectable ?? true,
            evented: options.evented ?? true,
            arrowSize: options.arrowSize ?? 20,
        });
        // Set custom properties
        setCustomProperties(arrow, options);
        this.canvas.add(arrow);
        // Only set as selected if selectable and setAsSelected allows it
        if (shouldSetAsSelected(options.selectable, options.setAsSelected)) {
            this.canvas.setActiveObject(arrow);
        }
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Arrow added', arrow);
        }
        return arrow;
    }
}
//# sourceMappingURL=shape-factory.js.map