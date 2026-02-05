/**
 * Serialization Manager
 * Handles canvas serialization and export functionality
 *
 *
 * IMPORTANT: Exports use cloned canvas to avoid blocking UI thread
 */
/**
 * Serialization Manager class
 * Manages canvas serialization, loading, and export operations
 */
export class SerializationManager {
    constructor(canvas, debug = false) {
        this.canvas = canvas;
        this.debug = debug;
    }
    /**
     * Serializes canvas to JSON
     * Extracted from presentation-editor line 1791
     * @param propertiesToInclude - Additional properties to include
     * @returns Canvas as JSON object
     */
    toJSON(propertiesToInclude) {
        // Always include custom properties in serialization
        const properties = ['id', 'data', 'locked', ...(propertiesToInclude || [])];
        const json = this.canvas.toObject(properties);
        if (this.debug) {
            console.log('[FabricKit] Canvas serialized to JSON', {
                objectCount: json.objects?.length || 0,
            });
        }
        return json;
    }
    /**
     * Loads canvas from JSON
     * Extracted from presentation-editor line 1883
     * @param json - Canvas JSON data
     * @param callback - Callback after loading completes
     */
    async fromJSON(json, callback) {
        const jsonData = typeof json === 'string' ? JSON.parse(json) : json;
        await this.canvas.loadFromJSON(jsonData);
        this.canvas.requestRenderAll();
        if (callback) {
            callback();
        }
        if (this.debug) {
            console.log('[FabricKit] Canvas loaded from JSON', {
                objectCount: this.canvas.getObjects().length,
            });
        }
    }
    /**
     * Exports canvas to PNG using cloned canvas (non-blocking)
     * Extracted from presentation-editor lines 1845-1918
     * @param options - PNG export options
     * @returns Promise resolving to data URL
     */
    async toPNG(options = {}) {
        // Clone canvas to avoid blocking UI
        const clonedCanvas = await this.canvas.clone(['data']);
        // Reset zoom to 1 for export
        const center = clonedCanvas.getCenter();
        const centerPoint = new (await import('fabric')).Point(center.left, center.top);
        clonedCanvas.zoomToPoint(centerPoint, 1);
        // Reset viewport transform
        const vpt = [1, 0, 0, 1, 0, 0];
        clonedCanvas.setViewportTransform(vpt);
        // Export to PNG
        const dataURL = clonedCanvas.toDataURL({
            format: 'png',
            quality: options.quality ?? 1,
            multiplier: options.multiplier ?? 1,
            left: options.left,
            top: options.top,
            width: options.width,
            height: options.height,
        });
        if (this.debug) {
            console.log('[FabricKit] Canvas exported to PNG', {
                dataURLLength: dataURL.length,
            });
        }
        return dataURL;
    }
    /**
     * Exports canvas to JPEG using cloned canvas (non-blocking)
     * @param options - JPEG export options
     * @returns Promise resolving to data URL
     */
    async toJPEG(options = {}) {
        // Clone canvas to avoid blocking UI
        const clonedCanvas = await this.canvas.clone(['data']);
        // Reset zoom to 1 for export
        const center = clonedCanvas.getCenter();
        const centerPoint = new (await import('fabric')).Point(center.left, center.top);
        clonedCanvas.zoomToPoint(centerPoint, 1);
        // Reset viewport transform
        const vpt = [1, 0, 0, 1, 0, 0];
        clonedCanvas.setViewportTransform(vpt);
        // Export to JPEG
        const dataURL = clonedCanvas.toDataURL({
            format: 'jpeg',
            quality: options.quality ?? 0.8,
            multiplier: options.multiplier ?? 1,
            left: options.left,
            top: options.top,
            width: options.width,
            height: options.height,
        });
        if (this.debug) {
            console.log('[FabricKit] Canvas exported to JPEG', {
                dataURLLength: dataURL.length,
            });
        }
        return dataURL;
    }
    /**
     * Exports canvas to SVG
     * Extracted from presentation-editor lines 1771-1788
     * @param options - SVG export options
     * @returns SVG string
     */
    toSVG(options = {}) {
        const svg = this.canvas.toSVG({
            suppressPreamble: options.suppressPreamble,
            viewBox: options.viewBox,
            width: options.width?.toString(),
            height: options.height?.toString(),
        });
        if (this.debug) {
            console.log('[FabricKit] Canvas exported to SVG', {
                svgLength: svg.length,
            });
        }
        return svg;
    }
    /**
     * Exports canvas to PDF using cloned canvas (non-blocking)
     * Requires jsPDF library to be available globally
     * Extracted from presentation-editor lines 1843-1918
     * @param options - PDF export options
     * @returns Promise resolving to PDF blob
     */
    async toPDF(options = {}) {
        // Check if jsPDF is available
        if (typeof window.jspdf === 'undefined' &&
            typeof window.jsPDF === 'undefined') {
            throw new Error('jsPDF library not found. Please include jsPDF in your project.');
        }
        // Get jsPDF constructor
        const jsPDF = window.jspdf?.jsPDF || window.jsPDF;
        // Clone canvas to avoid blocking UI
        const clonedCanvas = await this.canvas.clone(['data']);
        // Reset zoom to 1 for export
        const center = clonedCanvas.getCenter();
        const centerPoint = new (await import('fabric')).Point(center.left, center.top);
        clonedCanvas.zoomToPoint(centerPoint, 1);
        // Reset viewport transform
        const vpt = [1, 0, 0, 1, 0, 0];
        clonedCanvas.setViewportTransform(vpt);
        // Get canvas dimensions
        const width = options.width ?? clonedCanvas.getWidth();
        const height = options.height ?? clonedCanvas.getHeight();
        // Create PDF
        const pdf = new jsPDF(options.orientation ?? 'portrait', options.unit ?? 'px', options.format ?? [width, height], false);
        // Export to PNG first
        const dataURL = clonedCanvas.toDataURL({
            format: 'png',
            quality: 1,
            multiplier: 1,
            left: options.left,
            top: options.top,
            width: options.width,
            height: options.height,
        });
        // Add image to PDF
        pdf.addImage(dataURL, 'PNG', 0, 0, width, height);
        // Convert to blob
        const blob = pdf.output('blob');
        if (this.debug) {
            console.log('[FabricKit] Canvas exported to PDF', {
                blobSize: blob.size,
            });
        }
        return blob;
    }
    /**
     * Downloads canvas as file
     * @param format - Export format
     * @param filename - Output filename (without extension)
     * @param options - Export options
     */
    async download(format, filename = 'canvas', options = {}) {
        let dataURL;
        let blob;
        switch (format) {
            case 'png':
                dataURL = await this.toPNG(options);
                blob = this.dataURLToBlob(dataURL);
                this.downloadBlob(blob, `${filename}.png`);
                break;
            case 'jpeg':
                dataURL = await this.toJPEG(options);
                blob = this.dataURLToBlob(dataURL);
                this.downloadBlob(blob, `${filename}.jpg`);
                break;
            case 'svg':
                const svg = this.toSVG(options);
                blob = new Blob([svg], { type: 'image/svg+xml' });
                this.downloadBlob(blob, `${filename}.svg`);
                break;
            case 'pdf':
                blob = await this.toPDF(options);
                this.downloadBlob(blob, `${filename}.pdf`);
                break;
            default:
                throw new Error(`Unsupported format: ${format}`);
        }
        if (this.debug) {
            console.log('[FabricKit] Canvas downloaded', { format, filename });
        }
    }
    /**
     * Converts data URL to Blob
     */
    dataURLToBlob(dataURL) {
        const parts = dataURL.split(',');
        const mime = parts[0].match(/:(.*?);/)?.[1] || 'image/png';
        const bstr = atob(parts[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }
    /**
     * Downloads blob as file
     */
    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    /**
     * Cleans up resources
     */
    destroy() {
        if (this.debug) {
            console.log('[FabricKit] SerializationManager destroyed');
        }
    }
}
//# sourceMappingURL=serialization-manager.js.map