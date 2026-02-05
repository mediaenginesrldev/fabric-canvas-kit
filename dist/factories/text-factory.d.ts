/**
 * Text Factory
 * Provides methods for creating and formatting text on the canvas
 *
 */
import { FabricCanvas, FabricText, TextOptions } from '../types';
/**
 * Text Factory class
 * Handles creation and formatting of text objects
 */
export declare class TextFactory {
    private canvas;
    private debug;
    constructor(canvas: FabricCanvas, debug?: boolean);
    /**
     * Adds text to the canvas
     * @param content - Text content
     * @param options - Text options
     * @returns Created text object
     */
    add(content: string, options?: TextOptions): FabricText;
    /**
     * Sets underline for text
     * @param text - Text object to modify
     * @param underlined - Whether to underline the text
     */
    setUnderline(text: FabricText, underlined: boolean): void;
    /**
     * Sets font size for text
     * @param text - Text object to modify
     * @param size - Font size in pixels
     */
    setFontSize(text: FabricText, size: number): void;
    /**
     * Sets font family for text
     * @param text - Text object to modify
     * @param family - Font family name
     */
    setFontFamily(text: FabricText, family: string): void;
    /**
     * Sets text color (fill)
     * @param text - Text object to modify
     * @param color - Color value (hex, rgb, etc.)
     */
    setTextColor(text: FabricText, color: string): void;
    /**
     * Aligns text to the left
     * @param text - Text object to modify
     */
    alignLeft(text: FabricText): void;
    /**
     * Aligns text to center
     * @param text - Text object to modify
     */
    alignCenter(text: FabricText): void;
    /**
     * Aligns text to the right
     * @param text - Text object to modify
     */
    alignRight(text: FabricText): void;
    /**
     * Sets text to bold
     * @param text - Text object to modify
     * @param bold - Whether to make text bold
     */
    setBold(text: FabricText, bold: boolean): void;
    /**
     * Sets text to italic
     * @param text - Text object to modify
     * @param italic - Whether to make text italic
     */
    setItalic(text: FabricText, italic: boolean): void;
    /**
     * Checks if text is bold
     * @param text - Text object to check
     * @returns True if text is bold, false otherwise
     */
    isBold(text: FabricText): boolean;
    /**
     * Checks if text is italic
     * @param text - Text object to check
     * @returns True if text is italic, false otherwise
     */
    isItalic(text: FabricText): boolean;
    /**
     * Checks if text is underlined
     * @param text - Text object to check
     * @returns True if text is underlined, false otherwise
     */
    isUnderlined(text: FabricText): boolean;
    /**
     * Gets the current text alignment
     * @param text - Text object to check
     * @returns Current alignment ('left', 'center', 'right', or 'justify')
     */
    getAlignment(text: FabricText): string;
}
//# sourceMappingURL=text-factory.d.ts.map