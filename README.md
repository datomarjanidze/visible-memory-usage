## Visible Memory Usage v1.2.0 Documentation

<p align="center">
  <a href="https://www.npmjs.com/package/visible-memory-usage" target="_blank"><img src="https://img.shields.io/npm/v/visible-memory-usage.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/visible-memory-usage" target="_blank"><img src="https://img.shields.io/npm/l/visible-memory-usage.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/package/visible-memory-usage" target="_blank"><img src="https://img.shields.io/npm/dm/visible-memory-usage.svg" alt="NPM Downloads" /></a>
</p>

### Table of contents

- [Description](#Description)
- [Installation](#Installation)
- [Usage example](#Usage-example)
- [API](#API)
  - [class VisibleMemoryUsage](#class-VisibleMemoryUsage)
- [Tip](#Tip)

### Description

Node.js package for displaying memory usage as bars in the console. In
order to make this library work, it is necessary to pass a Node.js cli
argument `--max-old-space-size`.
<br>
<br>
![Example](https://github.com/datomarjanidze/visible-memory-usage/blob/main/example.gif?raw=true)

### Installation

```console
npm i -D visible-memory-usage
```

### Usage example

```typescript
import { VisibleMemoryUsage } from 'visible-memory-usage'
const visibleMemoryUsage = new VisibleMemoryUsage()

visibleMemoryUsage.showMemoryUsage()
setTimeout(
  () => visibleMemoryUsage.hideMemoryUsage(),
  4e3 // Hide in 4 seconds
)
```

### API

### `class VisibleMemoryUsage`

- `constructor(fps: number = 60, memoryType: MemoryType = "rss")`
  - **fps (number):** (Frames Per Second) is the frequency at which memory
    usage will be updated. Its value can be from `1` to `60`. Lower the
    value, lower the CPU load will be. Default is `60`.
  - **memoryType (string):** memory types are the keys of the Node.js
    `process.memoryUsage()` returned object and those are:
    `'rss' | 'heapTotal' | 'heapUsed' | 'external' | 'arrayBuffers'`.
    Default value is `'rss'`
- **showMemoryUsage():** method is used to display the memory.
- **hideMemoryUsage():** method is used to hide the memory.

### Tip

Can be helpful when you are trying to find a memory leak.
