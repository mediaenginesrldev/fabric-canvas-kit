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
export class Arrow extends Line {
    constructor(points, options = {}) {
        super(points, options);
        this.arrowSize = options.arrowSize || 20;
    }
    /**
     * Renders the arrow with inverse-scaled arrowhead
     */
    _render(ctx) {
        super._render(ctx);
        // Get line coordinates
        const x1 = this.x1 || 0;
        const y1 = this.y1 || 0;
        const x2 = this.x2 || 0;
        const y2 = this.y2 || 0;
        // Calculate arrow angle
        const xDiff = x2 - x1;
        const yDiff = y2 - y1;
        const angle = Math.atan2(yDiff, xDiff);
        // Save context state
        ctx.save();
        // Position at arrow endpoint
        ctx.translate(xDiff / 2, yDiff / 2);
        ctx.rotate(angle);
        // Apply inverse scaling to maintain arrowhead size
        const scaleX = this.scaleX || 1;
        const scaleY = this.scaleY || 1;
        ctx.scale(1 / scaleX, 1 / scaleY);
        // Draw arrowhead
        ctx.beginPath();
        ctx.moveTo(xDiff / 2, 0);
        ctx.lineTo(xDiff / 2 - this.arrowSize, -this.arrowSize / 2);
        ctx.lineTo(xDiff / 2 - this.arrowSize, this.arrowSize / 2);
        ctx.closePath();
        ctx.fillStyle = this.stroke || '#000000';
        ctx.fill();
        // Restore context state
        ctx.restore();
    }
    /**
     * Converts Arrow to object representation
     */
    toObject(propertiesToInclude = []) {
        return super.toObject(propertiesToInclude);
    }
    /**
     * Creates Arrow from object representation
     */
    static fromObject(object) {
        const points = [object.x1, object.y1, object.x2, object.y2];
        return Promise.resolve(new Arrow(points, object));
    }
}
/**
 * Registers the Arrow extension with Fabric.js
 */
export function registerArrowExtension() {
    // Register type for serialization
    if (Arrow.prototype.type === undefined) {
        Arrow.prototype.type = 'arrow';
    }
    // Register custom property for serialization
    if (!Arrow.prototype.stateProperties) {
        Arrow.prototype.stateProperties = [];
    }
    if (!Arrow.prototype.stateProperties.includes('arrowSize')) {
        Arrow.prototype.stateProperties.push('arrowSize');
    }
}
//# sourceMappingURL=arrow.extension.js.map