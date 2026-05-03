// Polyfills for Node.js globals required by gramjs in browser environment
// This must be imported FIRST before any other code

if (typeof window !== 'undefined') {
  // process polyfill
  if (typeof window.process === 'undefined') {
    window.process = {
      env: {},
      version: '',
      versions: {},
      platform: 'browser',
      nextTick: (fn, ...args) => setTimeout(() => fn(...args), 0),
      browser: true,
    };
  }

  // Buffer polyfill - use the one webpack provides or a minimal shim
  if (typeof window.Buffer === 'undefined') {
    try {
      const { Buffer: Buf } = require('buffer');
      window.Buffer = Buf;
    } catch (e) {
      // minimal Buffer shim
      window.Buffer = {
        from: (data, encoding) => new Uint8Array(typeof data === 'string' ? [...data].map(c => c.charCodeAt(0)) : data),
        isBuffer: () => false,
        alloc: (size) => new Uint8Array(size),
      };
    }
  }

  // global shim
  if (typeof window.global === 'undefined') {
    window.global = window;
  }
}
