/**
 * Event Manager
 * RxJS Observable-based event system for canvas events
 * Library-managed debouncing for onChange events
 */
import { Observable } from 'rxjs';
import { FabricObject, FabricCanvas, SelectionEvent, HistoryState } from '../types';
/**
 * Event Manager class
 * Manages all canvas events using RxJS Observables
 */
export declare class EventManager {
    private canvas;
    private debug;
    private debounceMs;
    private objectAddedSubject;
    private objectRemovedSubject;
    private objectModifiedSubject;
    private objectLockedSubject;
    private objectUnlockedSubject;
    private selectionChangedSubject;
    private historyChangedSubject;
    private zoomChangedSubject;
    private beforeRenderSubject;
    private textChangedSubject;
    private eventListeners;
    constructor(canvas: FabricCanvas, debounceMs?: number, debug?: boolean);
    /**
     * Initializes Fabric.js event listeners
     */
    private initializeEventListeners;
    /**
     * Debounced observable that fires after any canvas changes
     * Critical for auto-save integration
     * @returns Observable that emits after canvas changes (debounced)
     */
    onChange(): Observable<void>;
    /**
     * Observable that fires when selection changes
     * @returns Observable of selection events
     */
    onSelectionChanged(): Observable<SelectionEvent>;
    /**
     * Observable that fires when object is added
     * @returns Observable of added objects
     */
    onObjectAdded(): Observable<FabricObject>;
    /**
     * Observable that fires when object is removed
     * @returns Observable of removed objects
     */
    onObjectRemoved(): Observable<FabricObject>;
    /**
     * Observable that fires when object is modified
     * @returns Observable of modified objects
     */
    onObjectModified(): Observable<FabricObject>;
    /**
     * Observable that fires when object is locked
     * @returns Observable of locked objects
     */
    onObjectLocked(): Observable<FabricObject>;
    /**
     * Observable that fires when object is unlocked
     * @returns Observable of unlocked objects
     */
    onObjectUnlocked(): Observable<FabricObject>;
    /**
     * Observable that fires when history state changes
     * @returns Observable of history state
     */
    onHistoryChanged(): Observable<HistoryState>;
    /**
     * Observable that fires when zoom level changes
     * @returns Observable of zoom level
     */
    onZoomChanged(): Observable<number>;
    /**
     * Observable that fires before canvas renders
     * @returns Observable that emits before render
     */
    beforeRender(): Observable<void>;
    /**
     * Observable that fires when text changes (IText editing)
     * @returns Observable of text objects that changed
     */
    onTextChanged(): Observable<FabricObject>;
    /**
     * Emits a history changed event
     * @param state - History state
     */
    emitHistoryChanged(state: HistoryState): void;
    /**
     * Emits a zoom changed event
     * @param zoom - Zoom level
     */
    emitZoomChanged(zoom: number): void;
    /**
     * Emits an object locked event
     * @param object - Locked object
     */
    emitObjectLocked(object: FabricObject): void;
    /**
     * Emits an object unlocked event
     * @param object - Unlocked object
     */
    emitObjectUnlocked(object: FabricObject): void;
    /**
     * Cleans up all event listeners
     */
    destroy(): void;
}
//# sourceMappingURL=event-manager.d.ts.map