/**
 * Event Manager
 * RxJS Observable-based event system for canvas events
 * Library-managed debouncing for onChange events
 */
import { Subject, merge } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
/**
 * Event Manager class
 * Manages all canvas events using RxJS Observables
 */
export class EventManager {
    constructor(canvas, debounceMs = 1000, debug = false) {
        // Event subjects
        this.objectAddedSubject = new Subject();
        this.objectRemovedSubject = new Subject();
        this.objectModifiedSubject = new Subject();
        this.objectLockedSubject = new Subject();
        this.objectUnlockedSubject = new Subject();
        this.selectionChangedSubject = new Subject();
        this.historyChangedSubject = new Subject();
        this.zoomChangedSubject = new Subject();
        this.beforeRenderSubject = new Subject();
        this.textChangedSubject = new Subject();
        // Cleanup functions
        this.eventListeners = [];
        this.canvas = canvas;
        this.debounceMs = debounceMs;
        this.debug = debug;
        this.initializeEventListeners();
    }
    /**
     * Initializes Fabric.js event listeners
     */
    initializeEventListeners() {
        // Object added
        const objectAddedHandler = (e) => {
            if (e.target) {
                this.objectAddedSubject.next(e.target);
                if (this.debug) {
                    console.log('[FabricKit] Object added', e.target);
                }
            }
        };
        this.canvas.on('object:added', objectAddedHandler);
        this.eventListeners.push(() => this.canvas.off('object:added', objectAddedHandler));
        // Object removed
        const objectRemovedHandler = (e) => {
            if (e.target) {
                this.objectRemovedSubject.next(e.target);
                if (this.debug) {
                    console.log('[FabricKit] Object removed', e.target);
                }
            }
        };
        this.canvas.on('object:removed', objectRemovedHandler);
        this.eventListeners.push(() => this.canvas.off('object:removed', objectRemovedHandler));
        // Object modified
        const objectModifiedHandler = (e) => {
            if (e.target) {
                this.objectModifiedSubject.next(e.target);
                if (this.debug) {
                    console.log('[FabricKit] Object modified', e.target);
                }
            }
        };
        this.canvas.on('object:modified', objectModifiedHandler);
        this.eventListeners.push(() => this.canvas.off('object:modified', objectModifiedHandler));
        // Selection created
        const selectionCreatedHandler = (e) => {
            const selected = e.selected || [];
            this.selectionChangedSubject.next({
                selected,
                deselected: [],
            });
            if (this.debug) {
                console.log('[FabricKit] Selection created', selected);
            }
        };
        this.canvas.on('selection:created', selectionCreatedHandler);
        this.eventListeners.push(() => this.canvas.off('selection:created', selectionCreatedHandler));
        // Selection updated
        const selectionUpdatedHandler = (e) => {
            const selected = e.selected || [];
            const deselected = e.deselected || [];
            this.selectionChangedSubject.next({
                selected,
                deselected,
            });
            if (this.debug) {
                console.log('[FabricKit] Selection updated', { selected, deselected });
            }
        };
        this.canvas.on('selection:updated', selectionUpdatedHandler);
        this.eventListeners.push(() => this.canvas.off('selection:updated', selectionUpdatedHandler));
        // Selection cleared
        const selectionClearedHandler = (e) => {
            const deselected = e.deselected || [];
            this.selectionChangedSubject.next({
                selected: [],
                deselected,
            });
            if (this.debug) {
                console.log('[FabricKit] Selection cleared', deselected);
            }
        };
        this.canvas.on('selection:cleared', selectionClearedHandler);
        this.eventListeners.push(() => this.canvas.off('selection:cleared', selectionClearedHandler));
        // Before render
        const beforeRenderHandler = () => {
            this.beforeRenderSubject.next();
        };
        this.canvas.on('before:render', beforeRenderHandler);
        this.eventListeners.push(() => this.canvas.off('before:render', beforeRenderHandler));
        // Text changed (IText)
        const textChangedHandler = (e) => {
            if (e.target) {
                this.textChangedSubject.next(e.target);
                if (this.debug) {
                    console.log('[FabricKit] Text changed', e.target);
                }
            }
        };
        this.canvas.on('text:changed', textChangedHandler);
        this.eventListeners.push(() => this.canvas.off('text:changed', textChangedHandler));
    }
    /**
     * Debounced observable that fires after any canvas changes
     * Critical for auto-save integration
     * @returns Observable that emits after canvas changes (debounced)
     */
    onChange() {
        return merge(this.objectAddedSubject, this.objectRemovedSubject, this.objectModifiedSubject, this.objectLockedSubject, this.objectUnlockedSubject, this.textChangedSubject).pipe(debounceTime(this.debounceMs), map(() => undefined));
    }
    /**
     * Observable that fires when selection changes
     * @returns Observable of selection events
     */
    onSelectionChanged() {
        return this.selectionChangedSubject.asObservable();
    }
    /**
     * Observable that fires when object is added
     * @returns Observable of added objects
     */
    onObjectAdded() {
        return this.objectAddedSubject.asObservable();
    }
    /**
     * Observable that fires when object is removed
     * @returns Observable of removed objects
     */
    onObjectRemoved() {
        return this.objectRemovedSubject.asObservable();
    }
    /**
     * Observable that fires when object is modified
     * @returns Observable of modified objects
     */
    onObjectModified() {
        return this.objectModifiedSubject.asObservable();
    }
    /**
     * Observable that fires when object is locked
     * @returns Observable of locked objects
     */
    onObjectLocked() {
        return this.objectLockedSubject.asObservable();
    }
    /**
     * Observable that fires when object is unlocked
     * @returns Observable of unlocked objects
     */
    onObjectUnlocked() {
        return this.objectUnlockedSubject.asObservable();
    }
    /**
     * Observable that fires when history state changes
     * @returns Observable of history state
     */
    onHistoryChanged() {
        return this.historyChangedSubject.asObservable();
    }
    /**
     * Observable that fires when zoom level changes
     * @returns Observable of zoom level
     */
    onZoomChanged() {
        return this.zoomChangedSubject.asObservable();
    }
    /**
     * Observable that fires before canvas renders
     * @returns Observable that emits before render
     */
    beforeRender() {
        return this.beforeRenderSubject.asObservable();
    }
    /**
     * Observable that fires when text changes (IText editing)
     * @returns Observable of text objects that changed
     */
    onTextChanged() {
        return this.textChangedSubject.asObservable();
    }
    /**
     * Emits a history changed event
     * @param state - History state
     */
    emitHistoryChanged(state) {
        this.historyChangedSubject.next(state);
    }
    /**
     * Emits a zoom changed event
     * @param zoom - Zoom level
     */
    emitZoomChanged(zoom) {
        this.zoomChangedSubject.next(zoom);
    }
    /**
     * Emits an object locked event
     * @param object - Locked object
     */
    emitObjectLocked(object) {
        this.objectLockedSubject.next(object);
        if (this.debug) {
            console.log('[FabricKit] Object locked event emitted', object);
        }
    }
    /**
     * Emits an object unlocked event
     * @param object - Unlocked object
     */
    emitObjectUnlocked(object) {
        this.objectUnlockedSubject.next(object);
        if (this.debug) {
            console.log('[FabricKit] Object unlocked event emitted', object);
        }
    }
    /**
     * Cleans up all event listeners
     */
    destroy() {
        this.eventListeners.forEach((cleanup) => cleanup());
        this.eventListeners = [];
        // Complete all subjects
        this.objectAddedSubject.complete();
        this.objectRemovedSubject.complete();
        this.objectModifiedSubject.complete();
        this.objectLockedSubject.complete();
        this.objectUnlockedSubject.complete();
        this.selectionChangedSubject.complete();
        this.historyChangedSubject.complete();
        this.zoomChangedSubject.complete();
        this.beforeRenderSubject.complete();
        this.textChangedSubject.complete();
        if (this.debug) {
            console.log('[FabricKit] Event manager destroyed');
        }
    }
}
//# sourceMappingURL=event-manager.js.map