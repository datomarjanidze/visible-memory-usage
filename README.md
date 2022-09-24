## visible-memory-usage

### Installation

```console
npm i visible-memory-usage
```

### Description

Display memory usage as bars in the console.
<br>
<br>
![Example](https://github.com/datomarjanidze/visible-memory-usage/blob/main/example.gif?raw=true)

### Usage example

```typescript
const visibleMemoryUsage = new VisibleMemoryUsage();

visibleMemoryUsage.showMemoryUsage();
setTimeout(
  () => visibleMemoryUsage.hideMemoryUsage(),
  4e3 // Hide in 4 seconds
);
```

### Tip

Can be helpful when you are trying to find a memory leak.
