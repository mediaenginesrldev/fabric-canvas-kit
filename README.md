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

```bash
npm install fabric-canvas-kit
```

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

// Add text
canvas.text.add('Hello World', {
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
canvas.text.add(text, options);
canvas.text.setFontSize(size);
canvas.text.setFontFamily(family);
canvas.text.setTextColor(color);
canvas.text.setUnderline(enabled);
canvas.text.alignLeft();
canvas.text.alignCenter();
canvas.text.alignRight();
```

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
    transparentCorners: false, // Filled corners (default: FabricJS default)
    cornerColor: '#FFFFFF', // Corner fill color
    cornerStrokeColor: '#009dff', // Corner stroke color
    cornerStyle: 'circle', // 'circle' or 'rect'
    borderColor: '#009dff', // Selection border color
    cornerSize: 13, // Corner size in pixels
  },

  readOnly: false,
  debug: false,
});
```

## Selection Style Configuration

Control the appearance of object selection controls (corners and borders) globally for all objects:

### Basic Usage

```typescript
const canvas = FabricCanvas.create('canvas-id', {
  selectionStyle: {
    transparentCorners: false, // Filled corners
    cornerColor: '#FFFFFF', // Corner fill color
    cornerStrokeColor: '#009dff', // Corner stroke color
    cornerStyle: 'circle', // 'circle' or 'rect'
    borderColor: '#009dff', // Selection border color
    cornerSize: 13, // Corner size in pixels
  },
});

// All objects automatically inherit these styles
canvas.shapes.addRectangle({ width: 100, height: 100 });
```

### Runtime Updates

Update selection styles after canvas initialization:

```typescript
canvas.updateSelectionStyle({
  cornerColor: '#FF0000',
  borderColor: '#FF0000',
});

// Only affects objects created AFTER this call
canvas.shapes.addCircle({ radius: 50 }); // Has red corners
```

### Individual Object Override

Individual objects can override the global defaults:

```typescript
const rect = canvas.shapes.addRectangle({ width: 100, height: 100 });

// Override just for this object
rect.set({
  cornerColor: '#00FF00', // Green corners
  borderColor: '#00FF00',
});
canvas.getRawCanvas().renderAll();
```

### Available Properties

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

// Combine multiple events
combineLatest([canvas.events.onObjectAdded(), canvas.events.onObjectRemoved()])
  .pipe(debounceTime(500))
  .subscribe(([added, removed]) => {
    console.log('Objects changed:', { added, removed });
  });

// Filter specific events
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

### Export with Cropping

```typescript
// Export specific area
const png = await canvas.serialization.toPNG({
  left: 100,
  top: 100,
  width: 400,
  height: 300,
  quality: 1,
  multiplier: 2, // 2x resolution
});
```

### Access Raw Fabric.js Canvas

```typescript
// For advanced Fabric.js operations
const fabricCanvas = canvas.getRawCanvas();
fabricCanvas.on('custom:event', handler);
```

## Cleanup

```typescript
// Always cleanup when done
canvas.destroy();
```

## Requirements

- **fabric**: ^5.3.0
- **rxjs**: ^7.8.0
- **TypeScript**: ^5.0.0 (for TypeScript projects)

## Development Workflow

This library is currently stored locally in `temp-lib/` until it has a proper npm repository.

### Making Changes to the Library

When you edit the library source code, follow this simple 2-step workflow:

```bash
# Step 1: Edit your library source files
vim temp-lib/src/fabric-canvas.ts

# Step 2: Rebuild the library (compile TypeScript)
cd temp-lib
npm run build
cd ..

# That's it! Changes are immediately available in your app
# (no reinstall needed thanks to symlink)
```

**How it works:**

- Your main project has: `node_modules/fabric-canvas-kit` → `../temp-lib` (symlink)
- After rebuild, your app automatically sees the new compiled code
- No need to run `npm install` again!

### Library Structure

```
temp-lib/
├── src/                    # TypeScript source files (edit these)
├── dist/                   # Compiled JavaScript + types (auto-generated)
├── node_modules/           # Library's own dependencies
│   ├── fabric/
│   ├── hammerjs/
│   └── rxjs/
├── package.json
└── tsconfig.json
```

### First-Time Setup

If you're setting up this library in a new project:

```bash
# In your project's package.json, add:
{
  "dependencies": {
    "fabric-canvas-kit": "file:./temp-lib"
  }
}

# Then install:
npm install

# This will:
# 1. Create symlink: node_modules/fabric-canvas-kit → temp-lib
# 2. Install temp-lib's dependencies into temp-lib/node_modules/
```

### Current Dependency Strategy

The library uses **regular dependencies** (not peerDependencies), making it work exactly like a real npm package:

```json
{
  "dependencies": {
    "fabric": "^6.9.0",
    "hammerjs": "^2.0.8",
    "rxjs": "^7.8.0"
  }
}
```

**What this means:**

- ✅ Library is self-contained with its own dependencies
- ✅ Works identically to a published npm package
- ✅ No manual dependency management needed
- ✅ Fast workflow: edit → rebuild → done!

### Alternative: Using PeerDependencies (Optional)

If you want the library to share dependencies with the parent project (avoiding duplication), you can switch to peerDependencies:

```json
// temp-lib/package.json
{
  "peerDependencies": {
    "fabric": "^6.9.0",
    "hammerjs": "^2.0.8",
    "rxjs": "^7.8.0"
  },
  "devDependencies": {
    "fabric": "^6.9.0",
    "hammerjs": "^2.0.8",
    "rxjs": "^7.8.0",
    "@types/fabric": "^5.3.10",
    "@types/hammerjs": "^2.0.45",
    "@types/jsdom": "^27.0.0",
    "typescript": "^5.2.0"
  }
}
```

**Then:**

1. Ensure parent project has fabric, hammerjs, rxjs in its dependencies
2. Remove temp-lib/node_modules: `rm -rf temp-lib/node_modules`
3. Reinstall: `npm install`

**Pros:**

- Shared dependencies (no duplication)
- Matches typical npm library patterns

**Cons:**

- Slightly more complex workflow
- Need to ensure parent has correct versions

### Publishing to npm (Future)

When ready to publish this library:

1. Create a git repository
2. Update package.json with repository URL
3. Build the library: `npm run build`
4. Publish: `npm publish`
5. Update your project to use: `npm install fabric-canvas-kit`

The library is already structured correctly for npm publishing!
