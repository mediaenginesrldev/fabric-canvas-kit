/**
 * Fabric Kit Core - Public API
 * Framework-agnostic Fabric.js canvas wrapper
 */
export { FabricCanvas } from './fabric-canvas';
export { CanvasConfig, KeyboardConfig, MouseConfig, TouchConfig, HistoryConfig, OnChangeConfig, ZoomConfig, PerformanceConfig, DEFAULT_CANVAS_CONFIG, mergeConfig, } from './config';
export { FabricObject, FabricCanvas as FabricCanvasType, FabricRectangle, FabricCircle, FabricTriangle, FabricLine, FabricText, FabricImage, FabricGroup, Point, Size, BoundingBox, ShapeOptions, RectangleOptions, SquareOptions, CircleOptions, TriangleOptions, LineOptions, ArrowOptions, TextOptions, ImageOptions, ImageFilter, SelectionEvent, HistoryState, SerializationOptions, CanvasJSON, ExportOptions, SVGOptions, PDFOptions, ZoomToFitOptions, ArrowKeyOptions, TouchPanOptions, CropOptions, AnimationProperties, AnimationOptions, ResponsiveOptions, EraserOptions, ObjectInspection, ObjectFilter, CustomObjectClass, } from './types';
export { ShapeFactory } from './factories/shape-factory';
export { TextFactory } from './factories/text-factory';
export { ImageFactory } from './factories/image-factory';
export { SelectionManager } from './managers/selection-manager';
export { EventManager } from './managers/event-manager';
export { ObjectManager } from './managers/object-manager';
export { TransformManager } from './managers/transform-manager';
export { ViewportManager } from './managers/viewport-manager';
export { InputManager, InputConfig } from './managers/input-manager';
export { HistoryManager, HistoryManagerConfig } from './managers/history-manager';
export { SerializationManager, ExportFormat, PNGExportOptions, JPEGExportOptions, SVGExportOptions, PDFExportOptions, } from './managers/serialization-manager';
export { PerformanceUtility } from './utilities/performance';
export { Arrow, registerArrowExtension } from './extensions/arrow.extension';
//# sourceMappingURL=index.d.ts.map