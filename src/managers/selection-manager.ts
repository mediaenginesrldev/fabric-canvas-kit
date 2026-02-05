/**
 * Selection Manager
 * Handles object selection operations on the canvas
 * Core Fabric.js operations used throughout components
 */

import { FabricCanvas, FabricObject, ObjectFilter } from '../types';

/**
 * Selection Manager class
 * Manages selection of objects on the canvas
 */
export class SelectionManager {
  private canvas: FabricCanvas;
  private debug: boolean;

  constructor(canvas: FabricCanvas, debug: boolean = false) {
    this.canvas = canvas;
    this.debug = debug;
  }

  /**
   * Returns all objects on the canvas
   * @param filter - Optional filter function
   * @returns Array of objects
   */
  getObjects(filter?: ObjectFilter): FabricObject[] {
    const objects = this.canvas.getObjects();

    if (filter) {
      return objects.filter(filter);
    }

    return objects;
  }

  /**
   * Returns currently active/selected object
   * @returns Active object or null
   */
  getActiveObject(): FabricObject | null {
    return this.canvas.getActiveObject() || null;
  }

  /**
   * Returns all selected objects (multiple selection)
   * @returns Array of selected objects
   */
  getActiveObjects(): FabricObject[] {
    const activeObject = this.canvas.getActiveObject();

    if (!activeObject) {
      return [];
    }

    // Check if it's a group selection (ActiveSelection)
    if (activeObject.type === 'activeSelection') {
      return (activeObject as any).getObjects() || [];
    }

    // Single object selection
    return [activeObject];
  }

  /**
   * Sets an object as active/selected
   * @param object - Object to select
   */
  setActiveObject(object: FabricObject): void {
    this.canvas.setActiveObject(object);
    this.canvas.requestRenderAll();

    if (this.debug) {
      console.log('[FabricKit] Object selected', object);
    }
  }

  /**
   * Selects all objects on the canvas
   */
  selectAll(): void {
    const objects = this.canvas.getObjects();

    if (objects.length === 0) {
      return;
    }

    // Create active selection with all objects
    const selection = new (window as any).fabric.ActiveSelection(objects, {
      canvas: this.canvas,
    });

    this.canvas.setActiveObject(selection);
    this.canvas.requestRenderAll();

    if (this.debug) {
      console.log('[FabricKit] All objects selected', objects.length);
    }
  }

  /**
   * Clears all selections
   */
  clearSelection(): void {
    this.canvas.discardActiveObject();
    this.canvas.requestRenderAll();

    if (this.debug) {
      console.log('[FabricKit] Selection cleared');
    }
  }

  /**
   * Alias for clearSelection - Fabric.js native method name
   */
  discardActiveObject(): void {
    this.clearSelection();
  }

  /**
   * Cleans up any event listeners or resources
   * Currently no cleanup needed
   */
  destroy(): void {
    // No cleanup needed - this manager has no event listeners
    if (this.debug) {
      console.log('[FabricKit] Selection manager destroyed');
    }
  }
}
