# Fabric Canvas Kit

Modern TypeScript wrapper for Fabric.js with RxJS event system, history management, and advanced canvas operations.

## Features

✨ **Comprehensive API** - 110+ methods across factories, managers, and utilities
🎯 **Type-Safe** - Full TypeScript support with strict mode
📦 **Framework Agnostic** - Works with any JavaScript/TypeScript project
🚀 **Performance Optimized** - Batch rendering, cloned canvas exports, viewport exclusion
⏱️ **RxJS Events** - Observable-based event system with debouncing
↩️ **History Management** - Full undo/redo with smart viewport exclusion
💾 **Export Support** - PNG, JPEG, SVG, PDF with non-blocking operations
⌨️ **Input Handling** - Keyboard shortcuts, panning modes (spacebar, wheel, touch)

## Installation

This is a private package. Add it to your `package.json` via GitHub:

```json
"fabric-canvas-kit": "github:mediaenginesrldev/fabric-canvas-kit#v1.1.0"
```

Then run `npm install`.

## Quick Start

```typescript
import { FabricCanvas } from 'fabric-canvas-kit';

// Create canvas
const canvas = FabricCanvas.create('my-canvas', {
  width: 800,
  height: 600,
  backgroundColor: '#ffffff',
});

// Add shapes
canvas.shapes.addRectangle({
  width: 100,
  height: 100,
  fill: 'red',
});

canvas.shapes.addCircle({
  radius: 50,
  fill: 'blue',
});

// Add text (single line, no wrap)
canvas.text.add('Hello World', {
  fontSize: 24,
  fill: '#000000',
});

// Add word-wrapping textbox
canvas.text.addTextbox('Hello World', {
  width: 400,
  fontSize: 24,
  fill: '#000000',
});

// Enable keyboard shortcuts and history
canvas.input.enableKeyboard();
canvas.history.enable();

// Subscribe to events
canvas.events.onChange().subscribe(() => {
  console.log('Canvas changed!');
});

// Export
const png = await canvas.serialization.toPNG({ quality: 1 });
```

## API Overview

### Factories

#### Shape Factory

```typescript
canvas.shapes.addRectangle(options);
canvas.shapes.addSquare(options);
canvas.shapes.addCircle(options);
canvas.shapes.addTriangle(options);
canvas.shapes.addLine(options);
canvas.shapes.addArrow(options);
```

#### Text Factory

```typescript
// Single-line editable text (IText)
canvas.text.add(text, options);

// Word-wrapping textbox (Textbox)
canvas.text.addTextbox(text, options);  // requires width option

// Formatting (works on both IText and Textbox)
canvas.text.setFontSize(obj, size);
canvas.text.setFontFamily(obj, family);
canvas.text.setTextColor(obj, color);
canvas.text.setUnderline(obj, enabled);
canvas.text.setBold(obj, enabled);
canvas.text.setItalic(obj, enabled);
canvas.text.alignLeft(obj);
canvas.text.alignCenter(obj);
canvas.text.alignRight(obj);
canvas.text.isBold(obj);
canvas.text.isItalic(obj);
canvas.text.isUnderlined(obj);
canvas.text.getAlignment(obj);
```

**`addTextbox` options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `width` | `number` | `300` | Wrap boundary width (required for wrapping to take effect) |
| `splitByGrapheme` | `boolean` | `false` | `false` = word-level wrap, `true` = character-level wrap |

#### Image Factory

```typescript
canvas.images.addFromUrl(url, options);
canvas.images.addFromFile(file, options);
canvas.images.addFromBase64(base64, options);
canvas.images.flip('horizontal' | 'vertical');
canvas.images.crop(options);
canvas.images.applyFilter(type, options);
canvas.images.removeFilters();
canvas.images.resize(width, height);
```

### Managers

#### Selection Manager

```typescript
canvas.selection.getObjects();
canvas.selection.getActiveObject();
canvas.selection.getActiveObjects();
canvas.selection.setActiveObject(obj);
canvas.selection.selectAll();
canvas.selection.clearSelection();
```

#### Object Manager

```typescript
canvas.objects.bringToFront(obj);
canvas.objects.sendToBack(obj);
canvas.objects.bringForward(obj);
canvas.objects.sendBackward(obj);
canvas.objects.clone(obj);
canvas.objects.delete(obj);
canvas.objects.deleteSelected();
canvas.objects.clear();
canvas.objects.lock(obj);
canvas.objects.unlock(obj);
canvas.objects.setFill(obj, color);
canvas.objects.setStroke(obj, color, width);
canvas.objects.setOpacity(obj, opacity);
canvas.objects.rotate(obj, angle);
```

#### Transform Manager

```typescript
canvas.transform.centerObject(obj);
canvas.transform.centerObjectH(obj);
canvas.transform.centerObjectV(obj);
canvas.transform.position(obj, x, y);
canvas.transform.moveBy(obj, deltaX, deltaY);
canvas.transform.scale(obj, factor);
canvas.transform.setSize(obj, width, height);
canvas.transform.getBounds(obj);
canvas.transform.getCenter(obj);
```

#### Viewport Manager

```typescript
canvas.viewport.getZoom()
canvas.viewport.setZoom(level)
canvas.viewport.zoomIn(step?)
canvas.viewport.zoomOut(step?)
canvas.viewport.resetZoom()
canvas.viewport.fitToScreen(options?)
canvas.viewport.pan(offset)
canvas.viewport.resetPan()
canvas.viewport.absolutePan(position)
canvas.viewport.centerOn(object)
```

#### Input Manager

```typescript
canvas.input.enableKeyboard();
canvas.input.disableKeyboard();
canvas.input.enableSpacebarPan();
canvas.input.disableSpacebarPan();
canvas.input.onUndo(callback);
canvas.input.onRedo(callback);
```

**Keyboard Shortcuts:**

- Arrow keys: Move selected object (zoom-aware)
- Ctrl/Cmd + C: Copy
- Ctrl/Cmd + V: Paste
- Ctrl/Cmd + Z: Undo
- Ctrl/Cmd + Shift + Z: Redo
- Delete/Backspace: Delete selected

**Panning Modes:**

- Spacebar + drag
- Mouse wheel / trackpad scroll
- Two-finger touch (with 200px jump limit)

#### History Manager

```typescript
canvas.history.undo();
canvas.history.redo();
canvas.history.canUndo();
canvas.history.canRedo();
canvas.history.clearHistory();
canvas.history.enable();
canvas.history.disable();
canvas.history.getUndoStackSize();
canvas.history.getRedoStackSize();
```

> **Note:** History automatically excludes viewport changes (zoom/pan)

#### Serialization Manager

```typescript
// JSON
const json = canvas.serialization.toJSON()
canvas.serialization.fromJSON(json, callback?)

// Image exports (non-blocking)
const png = await canvas.serialization.toPNG(options?)
const jpeg = await canvas.serialization.toJPEG(options?)
const svg = canvas.serialization.toSVG(options?)
const pdf = await canvas.serialization.toPDF(options?)

// Direct download
await canvas.serialization.download('png', 'my-canvas', options?)
```

#### Event Manager

```typescript
canvas.events.onChange().subscribe(handler);
canvas.events.onSelectionChanged().subscribe(handler);
canvas.events.onObjectAdded().subscribe(handler);
canvas.events.onObjectRemoved().subscribe(handler);
canvas.events.onObjectModified().subscribe(handler);
canvas.events.onHistoryChanged().subscribe(handler);
canvas.events.onZoomChanged().subscribe(handler);
canvas.events.beforeRender().subscribe(handler);
```

### Performance Utilities

```typescript
// Batch operations (single render)
canvas.performance.batchUpdate(() => {
  canvas.shapes.addRectangle({ width: 100, height: 100 });
  canvas.shapes.addCircle({ radius: 50 });
  canvas.text.add('Text');
  // ... many more operations
}); // Renders only once!

// Force immediate render
canvas.performance.renderAll();

// Async render (deduplicates multiple requests)
canvas.performance.requestRenderAll();
```

### Canvas Methods

Core canvas-level methods:

```typescript
// Configuration
canvas.configure(config); // Update canvas config at runtime
canvas.getConfig(); // Get current configuration

// Selection styles
canvas.updateSelectionStyle(styles); // Update selection control styles

// Background
canvas.setBackgroundImage(url); // Set background image
canvas.setBackgroundColor(color); // Set background color

// Canvas state
canvas.setReadOnly(enabled); // Enable/disable read-only mode
canvas.isReadOnly(); // Check if read-only
canvas.setSelectionEnabled(enabled); // Enable/disable selection

// Viewport
canvas.fitToContainer(width, height, mode); // Fit canvas to container

// Cleanup
canvas.destroy(); // Clean up resources
canvas.getRawCanvas(); // Access raw Fabric.js canvas
```

## Configuration

```typescript
const canvas = FabricCanvas.create('canvas-id', {
  width: 800,
  height: 600,
  backgroundColor: '#ffffff',
  selection: true,

  keyboard: {
    enabled: true,
    arrowKeyDistance: 5,
    scaleArrowKeysWithZoom: true,
    copyPaste: true,
    undo: true,
    redo: true,
    delete: true,
  },

  mouse: {
    spacebarPan: true,
    wheelPan: true,
    preventPageScroll: true,
  },

  touch: {
    enabled: true,
    pan: true,
    maxJumpDistance: 200,
  },

  history: {
    enabled: true,
    maxSize: 50,
    recordViewport: false, // Viewport changes excluded by default
  },

  onChange: {
    enabled: true,
    debounce: 1000, // ms
  },

  zoom: {
    min: 0.1,
    max: 10,
    step: 1.1,
  },

  performance: {
    renderOnAddRemove: true,
    statefulCache: true,
  },

  selectionStyle: {
    transparentCorners: false,
    cornerColor: '#FFFFFF',
    cornerStrokeColor: '#009dff',
    cornerStyle: 'circle',
    borderColor: '#009dff',
    cornerSize: 13,
  },

  readOnly: false,
  debug: false,
});
```

## Selection Style Configuration

| Property             | Type                 | Description                               | Default          |
| -------------------- | -------------------- | ----------------------------------------- | ---------------- |
| `transparentCorners` | `boolean`            | Whether corners are transparent or filled | FabricJS default |
| `cornerColor`        | `string`             | Fill color of corner controls             | FabricJS default |
| `cornerStrokeColor`  | `string`             | Stroke color of corner controls           | FabricJS default |
| `cornerStyle`        | `'circle' \| 'rect'` | Shape of corner controls                  | FabricJS default |
| `borderColor`        | `string`             | Color of selection border                 | FabricJS default |
| `cornerSize`         | `number`             | Size of corners in pixels                 | FabricJS default |

## Advanced Usage

### Custom Event Handling

```typescript
import { combineLatest } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

combineLatest([canvas.events.onObjectAdded(), canvas.events.onObjectRemoved()])
  .pipe(debounceTime(500))
  .subscribe(([added, removed]) => {
    console.log('Objects changed:', { added, removed });
  });

canvas.events
  .onSelectionChanged()
  .pipe(filter(event => event.selected.length > 0))
  .subscribe(event => {
    console.log('Object selected:', event.selected[0]);
  });
```

### Batch Operations for Performance

```typescript
// BAD: Each operation triggers a render (100 renders!)
for (let i = 0; i < 100; i++) {
  canvas.shapes.addRectangle({ width: 10, height: 10 });
}

// GOOD: Batch update (1 render!)
canvas.performance.batchUpdate(() => {
  for (let i = 0; i < 100; i++) {
    canvas.shapes.addRectangle({ width: 10, height: 10 });
  }
});
```

### Access Raw Fabric.js Canvas

```typescript
const fabricCanvas = canvas.getRawCanvas();
fabricCanvas.on('custom:event', handler);
```

## Cleanup

```typescript
canvas.destroy();
```

## Requirements

- **fabric**: ^6.9.0
- **rxjs**: ^7.8.0
- **TypeScript**: ^5.0.0
