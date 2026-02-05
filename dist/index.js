/**
 * Fabric Kit Core - Public API
 * Framework-agnostic Fabric.js canvas wrapper
 */
// Main class
export { FabricCanvas } from './fabric-canvas';
// Configuration
export { DEFAULT_CANVAS_CONFIG, mergeConfig, } from './config';
// Factories
export { ShapeFactory } from './factories/shape-factory';
export { TextFactory } from './factories/text-factory';
export { ImageFactory } from './factories/image-factory';
// Managers
export { SelectionManager } from './managers/selection-manager';
export { EventManager } from './managers/event-manager';
export { ObjectManager } from './managers/object-manager';
export { TransformManager } from './managers/transform-manager';
export { ViewportManager } from './managers/viewport-manager';
export { InputManager } from './managers/input-manager';
export { HistoryManager } from './managers/history-manager';
export { SerializationManager, } from './managers/serialization-manager';
// Utilities
export { PerformanceUtility } from './utilities/performance';
// Extensions
export { Arrow, registerArrowExtension } from './extensions/arrow.extension';
//# sourceMappingURL=index.js.map