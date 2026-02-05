/**
 * Serialization Manager
 * Handles canvas serialization and export functionality
 *
 *
 * IMPORTANT: Exports use cloned canvas to avoid blocking UI thread
 */
import { CanvasJSON, FabricCanvas } from '../types';
/**
 * Export format type
 */
export type ExportFormat = 'png' | 'jpeg' | 'svg' | 'pdf';
/**
 * PNG export options
 */
export interface PNGExportOptions {
    /** Image quality (0-1, default: 1) */
    quality?: number;
    /** Multiplier for canvas dimensions (default: 1) */
    multiplier?: number;
    /** Left offset for cropping */
    left?: number;
    /** Top offset for cropping */
    top?: number;
    /** Width for cropping */
    width?: number;
    /** Height for cropping */
    height?: number;
}
/**
 * JPEG export options
 */
export interface JPEGExportOptions {
    /** Image quality (0-1, default: 0.8) */
    quality?: number;
    /** Multiplier for canvas dimensions (default: 1) */
    multiplier?: number;
    /** Left offset for cropping */
    left?: number;
    /** Top offset for cropping */
    top?: number;
    /** Width for cropping */
    width?: number;
    /** Height for cropping */
    height?: number;
}
/**
 * SVG export options
 */
export interface SVGExportOptions {
    /** Suppress SVG preamble (default: false) */
    suppressPreamble?: boolean;
    /** ViewBox configuration */
    viewBox?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /** SVG width (default: canvas width) */
    width?: string | number;
    /** SVG height (default: canvas height) */
    height?: string | number;
}
/**
 * PDF export options
 */
export interface PDFExportOptions {
    /** PDF orientation (default: 'portrait') */
    orientation?: 'portrait' | 'landscape';
    /** PDF unit (default: 'px') */
    unit?: 'pt' | 'px' | 'mm' | 'cm' | 'in';
    /** PDF format/size (default: 'a4') */
    format?: string | [number, number];
    /** Left offset for cropping */
    left?: number;
    /** Top offset for cropping */
    top?: number;
    /** Width for export */
    width?: number;
    /** Height for export */
    height?: number;
}
/**
 * Serialization Manager class
 * Manages canvas serialization, loading, and export operations
 */
export declare class SerializationManager {
    private canvas;
    private debug;
    constructor(canvas: FabricCanvas, debug?: boolean);
    /**
     * Serializes canvas to JSON
     * Extracted from presentation-editor line 1791
     * @param propertiesToInclude - Additional properties to include
     * @returns Canvas as JSON object
     */
    toJSON(propertiesToInclude?: string[]): CanvasJSON;
    /**
     * Loads canvas from JSON
     * Extracted from presentation-editor line 1883
     * @param json - Canvas JSON data
     * @param callback - Callback after loading completes
     */
    fromJSON(json: string | CanvasJSON, callback?: () => void): Promise<void>;
    /**
     * Exports canvas to PNG using cloned canvas (non-blocking)
     * Extracted from presentation-editor lines 1845-1918
     * @param options - PNG export options
     * @returns Promise resolving to data URL
     */
    toPNG(options?: PNGExportOptions): Promise<string>;
    /**
     * Exports canvas to JPEG using cloned canvas (non-blocking)
     * @param options - JPEG export options
     * @returns Promise resolving to data URL
     */
    toJPEG(options?: JPEGExportOptions): Promise<string>;
    /**
     * Exports canvas to SVG
     * Extracted from presentation-editor lines 1771-1788
     * @param options - SVG export options
     * @returns SVG string
     */
    toSVG(options?: SVGExportOptions): string;
    /**
     * Exports canvas to PDF using cloned canvas (non-blocking)
     * Requires jsPDF library to be available globally
     * Extracted from presentation-editor lines 1843-1918
     * @param options - PDF export options
     * @returns Promise resolving to PDF blob
     */
    toPDF(options?: PDFExportOptions): Promise<Blob>;
    /**
     * Downloads canvas as file
     * @param format - Export format
     * @param filename - Output filename (without extension)
     * @param options - Export options
     */
    download(format: ExportFormat, filename?: string, options?: any): Promise<void>;
    /**
     * Converts data URL to Blob
     */
    private dataURLToBlob;
    /**
     * Downloads blob as file
     */
    private downloadBlob;
    /**
     * Cleans up resources
     */
    destroy(): void;
}
//# sourceMappingURL=serialization-manager.d.ts.map