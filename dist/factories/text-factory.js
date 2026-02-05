/**
 * Text Factory
 * Provides methods for creating and formatting text on the canvas
 *
 */
import { IText } from 'fabric';
import { setCustomProperties } from '../utilities/object-utilities';
/**
 * Text Factory class
 * Handles creation and formatting of text objects
 */
export class TextFactory {
    constructor(canvas, debug = false) {
        this.canvas = canvas;
        this.debug = debug;
    }
    /**
     * Adds text to the canvas
     * @param content - Text content
     * @param options - Text options
     * @returns Created text object
     */
    add(content, options = {}) {
        const text = new IText(content, {
            left: options.left ?? 100,
            top: options.top ?? 100,
            fontSize: options.fontSize ?? 24,
            fontFamily: options.fontFamily ?? 'Arial',
            fontWeight: options.fontWeight ?? 'normal',
            fontStyle: (options.fontStyle ?? 'normal'),
            underline: options.underline ?? false,
            fill: options.fill ?? '#000000',
            stroke: options.stroke,
            strokeWidth: options.strokeWidth ?? 0,
            textAlign: options.textAlign ?? 'left',
            lineHeight: options.lineHeight ?? 1,
            opacity: options.opacity ?? 1,
            angle: options.angle ?? 0,
            scaleX: options.scaleX ?? 1,
            scaleY: options.scaleY ?? 1,
            selectable: options.selectable ?? true,
            evented: options.evented ?? true,
        });
        // Set custom properties
        setCustomProperties(text, options);
        this.canvas.add(text);
        this.canvas.setActiveObject(text);
        this.canvas.requestRenderAll();
        if (this.debug) {
            console.log('[FabricKit] Text added', text);
        }
        return text;
    }
    /**
     * Sets underline for text
     * @param text - Text object to modify
     * @param underlined - Whether to underline the text
     */
    setUnderline(text, underlined) {
        text.set('underline', underlined);
        this.canvas.requestRenderAll();
        this.canvas.fire('object:modified', { target: text });
        if (this.debug) {
            console.log('[FabricKit] Text underline set to', underlined);
        }
    }
    /**
     * Sets font size for text
     * @param text - Text object to modify
     * @param size - Font size in pixels
     */
    setFontSize(text, size) {
        text.set('fontSize', size);
        this.canvas.requestRenderAll();
        this.canvas.fire('object:modified', { target: text });
        if (this.debug) {
            console.log('[FabricKit] Text font size set to', size);
        }
    }
    /**
     * Sets font family for text
     * @param text - Text object to modify
     * @param family - Font family name
     */
    setFontFamily(text, family) {
        text.set('fontFamily', family);
        this.canvas.requestRenderAll();
        this.canvas.fire('object:modified', { target: text });
        if (this.debug) {
            console.log('[FabricKit] Text font family set to', family);
        }
    }
    /**
     * Sets text color (fill)
     * @param text - Text object to modify
     * @param color - Color value (hex, rgb, etc.)
     */
    setTextColor(text, color) {
        text.set('fill', color);
        this.canvas.requestRenderAll();
        this.canvas.fire('object:modified', { target: text });
        if (this.debug) {
            console.log('[FabricKit] Text color set to', color);
        }
    }
    /**
     * Aligns text to the left
     * @param text - Text object to modify
     */
    alignLeft(text) {
        text.set('textAlign', 'left');
        this.canvas.requestRenderAll();
        this.canvas.fire('object:modified', { target: text });
        if (this.debug) {
            console.log('[FabricKit] Text aligned left');
        }
    }
    /**
     * Aligns text to center
     * @param text - Text object to modify
     */
    alignCenter(text) {
        text.set('textAlign', 'center');
        this.canvas.requestRenderAll();
        this.canvas.fire('object:modified', { target: text });
        if (this.debug) {
            console.log('[FabricKit] Text aligned center');
        }
    }
    /**
     * Aligns text to the right
     * @param text - Text object to modify
     */
    alignRight(text) {
        text.set('textAlign', 'right');
        this.canvas.requestRenderAll();
        this.canvas.fire('object:modified', { target: text });
        if (this.debug) {
            console.log('[FabricKit] Text aligned right');
        }
    }
    /**
     * Sets text to bold
     * @param text - Text object to modify
     * @param bold - Whether to make text bold
     */
    setBold(text, bold) {
        text.set('fontWeight', bold ? 'bold' : 'normal');
        this.canvas.requestRenderAll();
        this.canvas.fire('object:modified', { target: text });
        if (this.debug) {
            console.log('[FabricKit] Text bold set to', bold);
        }
    }
    /**
     * Sets text to italic
     * @param text - Text object to modify
     * @param italic - Whether to make text italic
     */
    setItalic(text, italic) {
        text.set('fontStyle', italic ? 'italic' : 'normal');
        this.canvas.requestRenderAll();
        this.canvas.fire('object:modified', { target: text });
        if (this.debug) {
            console.log('[FabricKit] Text italic set to', italic);
        }
    }
    /**
     * Checks if text is bold
     * @param text - Text object to check
     * @returns True if text is bold, false otherwise
     */
    isBold(text) {
        return text.fontWeight === 'bold' || text.fontWeight === 700;
    }
    /**
     * Checks if text is italic
     * @param text - Text object to check
     * @returns True if text is italic, false otherwise
     */
    isItalic(text) {
        return text.fontStyle === 'italic';
    }
    /**
     * Checks if text is underlined
     * @param text - Text object to check
     * @returns True if text is underlined, false otherwise
     */
    isUnderlined(text) {
        return text.underline === true;
    }
    /**
     * Gets the current text alignment
     * @param text - Text object to check
     * @returns Current alignment ('left', 'center', 'right', or 'justify')
     */
    getAlignment(text) {
        return text.textAlign || 'left';
    }
}
//# sourceMappingURL=text-factory.js.map