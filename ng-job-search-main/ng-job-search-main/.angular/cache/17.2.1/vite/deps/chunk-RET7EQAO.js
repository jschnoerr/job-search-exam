import {
  __async,
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-J4B6MK7R.js";

// node_modules/outvariant/lib/index.mjs
var POSITIONALS_EXP = /(%?)(%([sdijo]))/g;
function serializePositional(positional, flag) {
  switch (flag) {
    case "s":
      return positional;
    case "d":
    case "i":
      return Number(positional);
    case "j":
      return JSON.stringify(positional);
    case "o": {
      if (typeof positional === "string") {
        return positional;
      }
      const json = JSON.stringify(positional);
      if (json === "{}" || json === "[]" || /^\[object .+?\]$/.test(json)) {
        return positional;
      }
      return json;
    }
  }
}
function format(message, ...positionals) {
  if (positionals.length === 0) {
    return message;
  }
  let positionalIndex = 0;
  let formattedMessage = message.replace(
    POSITIONALS_EXP,
    (match, isEscaped, _, flag) => {
      const positional = positionals[positionalIndex];
      const value = serializePositional(positional, flag);
      if (!isEscaped) {
        positionalIndex++;
        return value;
      }
      return match;
    }
  );
  if (positionalIndex < positionals.length) {
    formattedMessage += ` ${positionals.slice(positionalIndex).join(" ")}`;
  }
  formattedMessage = formattedMessage.replace(/%{2,2}/g, "%");
  return formattedMessage;
}
var STACK_FRAMES_TO_IGNORE = 2;
function cleanErrorStack(error2) {
  if (!error2.stack) {
    return;
  }
  const nextStack = error2.stack.split("\n");
  nextStack.splice(1, STACK_FRAMES_TO_IGNORE);
  error2.stack = nextStack.join("\n");
}
var InvariantError = class extends Error {
  constructor(message, ...positionals) {
    super(message);
    this.message = message;
    this.name = "Invariant Violation";
    this.message = format(message, ...positionals);
    cleanErrorStack(this);
  }
};
var invariant = (predicate, message, ...positionals) => {
  if (!predicate) {
    throw new InvariantError(message, ...positionals);
  }
};
invariant.as = (ErrorConstructor, predicate, message, ...positionals) => {
  if (!predicate) {
    const formatMessage2 = positionals.length === 0 ? message : format(message, positionals);
    let error2;
    try {
      error2 = Reflect.construct(ErrorConstructor, [formatMessage2]);
    } catch (err) {
      error2 = ErrorConstructor(formatMessage2);
    }
    throw error2;
  }
};

// node_modules/msw/lib/core/utils/internal/devUtils.mjs
var LIBRARY_PREFIX = "[MSW]";
function formatMessage(message, ...positionals) {
  const interpolatedMessage = format(message, ...positionals);
  return `${LIBRARY_PREFIX} ${interpolatedMessage}`;
}
function warn(message, ...positionals) {
  console.warn(formatMessage(message, ...positionals));
}
function error(message, ...positionals) {
  console.error(formatMessage(message, ...positionals));
}
var devUtils = {
  formatMessage,
  warn,
  error
};

// node_modules/strict-event-emitter/lib/index.mjs
var MemoryLeakError = class extends Error {
  constructor(emitter, type, count) {
    super(
      `Possible EventEmitter memory leak detected. ${count} ${type.toString()} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    this.emitter = emitter;
    this.type = type;
    this.count = count;
    this.name = "MaxListenersExceededWarning";
  }
};
var _Emitter = class {
  static listenerCount(emitter, eventName) {
    return emitter.listenerCount(eventName);
  }
  constructor() {
    this.events = /* @__PURE__ */ new Map();
    this.maxListeners = _Emitter.defaultMaxListeners;
    this.hasWarnedAboutPotentialMemoryLeak = false;
  }
  _emitInternalEvent(internalEventName, eventName, listener) {
    this.emit(
      internalEventName,
      ...[eventName, listener]
    );
  }
  _getListeners(eventName) {
    return Array.prototype.concat.apply([], this.events.get(eventName)) || [];
  }
  _removeListener(listeners, listener) {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
    return [];
  }
  _wrapOnceListener(eventName, listener) {
    const onceListener = (...data) => {
      this.removeListener(eventName, onceListener);
      return listener.apply(this, data);
    };
    Object.defineProperty(onceListener, "name", { value: listener.name });
    return onceListener;
  }
  setMaxListeners(maxListeners) {
    this.maxListeners = maxListeners;
    return this;
  }
  /**
   * Returns the current max listener value for the `Emitter` which is
   * either set by `emitter.setMaxListeners(n)` or defaults to
   * `Emitter.defaultMaxListeners`.
   */
  getMaxListeners() {
    return this.maxListeners;
  }
  /**
   * Returns an array listing the events for which the emitter has registered listeners.
   * The values in the array will be strings or Symbols.
   */
  eventNames() {
    return Array.from(this.events.keys());
  }
  /**
   * Synchronously calls each of the listeners registered for the event named `eventName`,
   * in the order they were registered, passing the supplied arguments to each.
   * Returns `true` if the event has listeners, `false` otherwise.
   *
   * @example
   * const emitter = new Emitter<{ hello: [string] }>()
   * emitter.emit('hello', 'John')
   */
  emit(eventName, ...data) {
    const listeners = this._getListeners(eventName);
    listeners.forEach((listener) => {
      listener.apply(this, data);
    });
    return listeners.length > 0;
  }
  addListener(eventName, listener) {
    this._emitInternalEvent("newListener", eventName, listener);
    const nextListeners = this._getListeners(eventName).concat(listener);
    this.events.set(eventName, nextListeners);
    if (this.maxListeners > 0 && this.listenerCount(eventName) > this.maxListeners && !this.hasWarnedAboutPotentialMemoryLeak) {
      this.hasWarnedAboutPotentialMemoryLeak = true;
      const memoryLeakWarning = new MemoryLeakError(
        this,
        eventName,
        this.listenerCount(eventName)
      );
      console.warn(memoryLeakWarning);
    }
    return this;
  }
  on(eventName, listener) {
    return this.addListener(eventName, listener);
  }
  once(eventName, listener) {
    return this.addListener(
      eventName,
      this._wrapOnceListener(eventName, listener)
    );
  }
  prependListener(eventName, listener) {
    const listeners = this._getListeners(eventName);
    if (listeners.length > 0) {
      const nextListeners = [listener].concat(listeners);
      this.events.set(eventName, nextListeners);
    } else {
      this.events.set(eventName, listeners.concat(listener));
    }
    return this;
  }
  prependOnceListener(eventName, listener) {
    return this.prependListener(
      eventName,
      this._wrapOnceListener(eventName, listener)
    );
  }
  removeListener(eventName, listener) {
    const listeners = this._getListeners(eventName);
    if (listeners.length > 0) {
      this._removeListener(listeners, listener);
      this.events.set(eventName, listeners);
      this._emitInternalEvent("removeListener", eventName, listener);
    }
    return this;
  }
  /**
   * Alias for `emitter.removeListener()`.
   *
   * @example
   * emitter.off('hello', listener)
   */
  off(eventName, listener) {
    return this.removeListener(eventName, listener);
  }
  removeAllListeners(eventName) {
    if (eventName) {
      this.events.delete(eventName);
    } else {
      this.events.clear();
    }
    return this;
  }
  /**
   * Returns a copy of the array of listeners for the event named `eventName`.
   */
  listeners(eventName) {
    return Array.from(this._getListeners(eventName));
  }
  /**
   * Returns the number of listeners listening to the event named `eventName`.
   */
  listenerCount(eventName) {
    return this._getListeners(eventName).length;
  }
  rawListeners(eventName) {
    return this.listeners(eventName);
  }
};
var Emitter = _Emitter;
Emitter.defaultMaxListeners = 10;

// node_modules/msw/lib/core/utils/internal/pipeEvents.mjs
function pipeEvents(source, destination) {
  const rawEmit = source.emit;
  if (rawEmit._isPiped) {
    return;
  }
  const sourceEmit = function sourceEmit2(event, ...data) {
    destination.emit(event, ...data);
    return rawEmit.call(this, event, ...data);
  };
  sourceEmit._isPiped = true;
  source.emit = sourceEmit;
}

// node_modules/msw/lib/core/utils/internal/toReadonlyArray.mjs
function toReadonlyArray(source) {
  const clone = [...source];
  Object.freeze(clone);
  return clone;
}

// node_modules/msw/lib/core/utils/internal/Disposable.mjs
var Disposable = class {
  subscriptions = [];
  dispose() {
    return __async(this, null, function* () {
      yield Promise.all(this.subscriptions.map((subscription) => subscription()));
    });
  }
};

// node_modules/msw/lib/core/SetupApi.mjs
var InMemoryHandlersController = class {
  constructor(initialHandlers) {
    this.initialHandlers = initialHandlers;
    this.handlers = [...initialHandlers];
  }
  handlers;
  prepend(runtimeHandles) {
    this.handlers.unshift(...runtimeHandles);
  }
  reset(nextHandlers) {
    this.handlers = nextHandlers.length > 0 ? [...nextHandlers] : [...this.initialHandlers];
  }
  currentHandlers() {
    return this.handlers;
  }
};
var SetupApi = class extends Disposable {
  handlersController;
  emitter;
  publicEmitter;
  events;
  constructor(...initialHandlers) {
    super();
    invariant(
      this.validateHandlers(initialHandlers),
      devUtils.formatMessage(
        `Failed to apply given request handlers: invalid input. Did you forget to spread the request handlers Array?`
      )
    );
    this.handlersController = new InMemoryHandlersController(initialHandlers);
    this.emitter = new Emitter();
    this.publicEmitter = new Emitter();
    pipeEvents(this.emitter, this.publicEmitter);
    this.events = this.createLifeCycleEvents();
    this.subscriptions.push(() => {
      this.emitter.removeAllListeners();
      this.publicEmitter.removeAllListeners();
    });
  }
  validateHandlers(handlers) {
    return handlers.every((handler) => !Array.isArray(handler));
  }
  use(...runtimeHandlers) {
    invariant(
      this.validateHandlers(runtimeHandlers),
      devUtils.formatMessage(
        `Failed to call "use()" with the given request handlers: invalid input. Did you forget to spread the array of request handlers?`
      )
    );
    this.handlersController.prepend(runtimeHandlers);
  }
  restoreHandlers() {
    this.handlersController.currentHandlers().forEach((handler) => {
      handler.isUsed = false;
    });
  }
  resetHandlers(...nextHandlers) {
    this.handlersController.reset(nextHandlers);
  }
  listHandlers() {
    return toReadonlyArray(this.handlersController.currentHandlers());
  }
  createLifeCycleEvents() {
    return {
      on: (...args) => {
        return this.publicEmitter.on(...args);
      },
      removeListener: (...args) => {
        return this.publicEmitter.removeListener(...args);
      },
      removeAllListeners: (...args) => {
        return this.publicEmitter.removeAllListeners(...args);
      }
    };
  }
};

// node_modules/msw/lib/core/utils/internal/getCallFrame.mjs
var SOURCE_FRAME = /[\/\\]msw[\/\\]src[\/\\](.+)/;
var BUILD_FRAME = /(node_modules)?[\/\\]lib[\/\\](core|browser|node|native|iife)[\/\\]|^[^\/\\]*$/;
function getCallFrame(error2) {
  const stack = error2.stack;
  if (!stack) {
    return;
  }
  const frames = stack.split("\n").slice(1);
  const declarationFrame = frames.find((frame) => {
    return !(SOURCE_FRAME.test(frame) || BUILD_FRAME.test(frame));
  });
  if (!declarationFrame) {
    return;
  }
  const declarationPath = declarationFrame.replace(/\s*at [^()]*\(([^)]+)\)/, "$1").replace(/^@/, "");
  return declarationPath;
}

// node_modules/msw/lib/core/utils/internal/isIterable.mjs
function isIterable(fn) {
  if (!fn) {
    return false;
  }
  return typeof fn[Symbol.iterator] == "function";
}

// node_modules/msw/lib/core/handlers/RequestHandler.mjs
var RequestHandler = class _RequestHandler {
  static cache = /* @__PURE__ */ new WeakMap();
  info;
  /**
   * Indicates whether this request handler has been used
   * (its resolver has successfully executed).
   */
  isUsed;
  resolver;
  resolverGenerator;
  resolverGeneratorResult;
  options;
  constructor(args) {
    this.resolver = args.resolver;
    this.options = args.options;
    const callFrame = getCallFrame(new Error());
    this.info = __spreadProps(__spreadValues({}, args.info), {
      callFrame
    });
    this.isUsed = false;
  }
  /**
   * Parse the intercepted request to extract additional information from it.
   * Parsed result is then exposed to other methods of this request handler.
   */
  parse(_args) {
    return __async(this, null, function* () {
      return {};
    });
  }
  /**
   * Test if this handler matches the given request.
   *
   * This method is not used internally but is exposed
   * as a convenience method for consumers writing custom
   * handlers.
   */
  test(args) {
    return __async(this, null, function* () {
      const parsedResult = yield this.parse({
        request: args.request,
        resolutionContext: args.resolutionContext
      });
      return this.predicate({
        request: args.request,
        parsedResult,
        resolutionContext: args.resolutionContext
      });
    });
  }
  extendResolverArgs(_args) {
    return {};
  }
  // Clone the request instance before it's passed to the handler phases
  // and the response resolver so we can always read it for logging.
  // We only clone it once per request to avoid unnecessary overhead.
  cloneRequestOrGetFromCache(request) {
    const existingClone = _RequestHandler.cache.get(request);
    if (typeof existingClone !== "undefined") {
      return existingClone;
    }
    const clonedRequest = request.clone();
    _RequestHandler.cache.set(request, clonedRequest);
    return clonedRequest;
  }
  /**
   * Execute this request handler and produce a mocked response
   * using the given resolver function.
   */
  run(args) {
    return __async(this, null, function* () {
      if (this.isUsed && this.options?.once) {
        return null;
      }
      const requestClone = this.cloneRequestOrGetFromCache(args.request);
      const parsedResult = yield this.parse({
        request: args.request,
        resolutionContext: args.resolutionContext
      });
      const shouldInterceptRequest = this.predicate({
        request: args.request,
        parsedResult,
        resolutionContext: args.resolutionContext
      });
      if (!shouldInterceptRequest) {
        return null;
      }
      if (this.isUsed && this.options?.once) {
        return null;
      }
      this.isUsed = true;
      const executeResolver = this.wrapResolver(this.resolver);
      const resolverExtras = this.extendResolverArgs({
        request: args.request,
        parsedResult
      });
      const mockedResponsePromise = executeResolver(__spreadProps(__spreadValues({}, resolverExtras), {
        requestId: args.requestId,
        request: args.request
      })).catch((errorOrResponse) => {
        if (errorOrResponse instanceof Response) {
          return errorOrResponse;
        }
        throw errorOrResponse;
      });
      const mockedResponse = yield mockedResponsePromise;
      const executionResult = this.createExecutionResult({
        // Pass the cloned request to the result so that logging
        // and other consumers could read its body once more.
        request: requestClone,
        requestId: args.requestId,
        response: mockedResponse,
        parsedResult
      });
      return executionResult;
    });
  }
  wrapResolver(resolver) {
    return (info) => __async(this, null, function* () {
      const result = this.resolverGenerator || (yield resolver(info));
      if (isIterable(result)) {
        this.isUsed = false;
        const { value, done } = result[Symbol.iterator]().next();
        const nextResponse = yield value;
        if (done) {
          this.isUsed = true;
        }
        if (!nextResponse && done) {
          invariant(
            this.resolverGeneratorResult,
            "Failed to returned a previously stored generator response: the value is not a valid Response."
          );
          return this.resolverGeneratorResult.clone();
        }
        if (!this.resolverGenerator) {
          this.resolverGenerator = result;
        }
        if (nextResponse) {
          this.resolverGeneratorResult = nextResponse?.clone();
        }
        return nextResponse;
      }
      return result;
    });
  }
  createExecutionResult(args) {
    return {
      handler: this,
      request: args.request,
      requestId: args.requestId,
      response: args.response,
      parsedResult: args.parsedResult
    };
  }
};

// node_modules/@open-draft/until/lib/index.mjs
var until = (promise) => __async(void 0, null, function* () {
  try {
    const data = yield promise().catch((error2) => {
      throw error2;
    });
    return { error: null, data };
  } catch (error2) {
    return { error: error2, data: null };
  }
});

// node_modules/msw/lib/core/utils/executeHandlers.mjs
var executeHandlers = (_0) => __async(void 0, [_0], function* ({
  request,
  requestId,
  handlers,
  resolutionContext
}) {
  let matchingHandler = null;
  let result = null;
  for (const handler of handlers) {
    result = yield handler.run({ request, requestId, resolutionContext });
    if (result !== null) {
      matchingHandler = handler;
    }
    if (result?.response) {
      break;
    }
  }
  if (matchingHandler) {
    return {
      handler: matchingHandler,
      parsedResult: result?.parsedResult,
      response: result?.response
    };
  }
  return null;
});

// node_modules/msw/lib/core/utils/request/toPublicUrl.mjs
function toPublicUrl(url) {
  if (typeof location === "undefined") {
    return url.toString();
  }
  const urlInstance = url instanceof URL ? url : new URL(url);
  return urlInstance.origin === location.origin ? urlInstance.pathname : urlInstance.origin + urlInstance.pathname;
}

// node_modules/msw/lib/core/utils/request/onUnhandledRequest.mjs
function onUnhandledRequest(request, strategy = "warn") {
  return __async(this, null, function* () {
    const url = new URL(request.url);
    const publicUrl = toPublicUrl(url);
    const unhandledRequestMessage = `intercepted a request without a matching request handler:

  • ${request.method} ${publicUrl}

If you still wish to intercept this unhandled request, please create a request handler for it.
Read more: https://mswjs.io/docs/getting-started/mocks`;
    function applyStrategy(strategy2) {
      switch (strategy2) {
        case "error": {
          devUtils.error("Error: %s", unhandledRequestMessage);
          throw new Error(
            devUtils.formatMessage(
              'Cannot bypass a request when using the "error" strategy for the "onUnhandledRequest" option.'
            )
          );
        }
        case "warn": {
          devUtils.warn("Warning: %s", unhandledRequestMessage);
          break;
        }
        case "bypass":
          break;
        default:
          throw new Error(
            devUtils.formatMessage(
              'Failed to react to an unhandled request: unknown strategy "%s". Please provide one of the supported strategies ("bypass", "warn", "error") or a custom callback function as the value of the "onUnhandledRequest" option.',
              strategy2
            )
          );
      }
    }
    if (typeof strategy === "function") {
      strategy(request, {
        warning: applyStrategy.bind(null, "warn"),
        error: applyStrategy.bind(null, "error")
      });
      return;
    }
    if (url.protocol === "file:") {
      return;
    }
    applyStrategy(strategy);
  });
}

// node_modules/@mswjs/cookies/lib/index.mjs
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString(setCookieValue, options) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      try {
        value = options.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key === "expires") {
          cookie.expires = new Date(value2);
        } else if (key === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key === "secure") {
          cookie.secure = true;
        } else if (key === "httponly") {
          cookie.httpOnly = true;
        } else if (key === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse(input, options) {
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      if (!input) {
        if (!options.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key) {
            return key.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      if (!options.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString(str, options);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString(str, options);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse;
    module.exports.parse = parse;
    module.exports.parseString = parseString;
    module.exports.splitCookiesString = splitCookiesString;
  }
});
var import_set_cookie_parser = __toESM(require_set_cookie());
var PERSISTENCY_KEY = "MSW_COOKIE_STORE";
function supportsLocalStorage() {
  try {
    if (localStorage == null) {
      return false;
    }
    const testKey = PERSISTENCY_KEY + "_test";
    localStorage.setItem(testKey, "test");
    localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (error2) {
    return false;
  }
}
function isPropertyAccessible(object, method) {
  try {
    object[method];
    return true;
  } catch {
    return false;
  }
}
var CookieStore = class {
  constructor() {
    this.store = /* @__PURE__ */ new Map();
  }
  add(request, response) {
    if (isPropertyAccessible(request, "credentials") && request.credentials === "omit") {
      return;
    }
    const requestUrl = new URL(request.url);
    const responseCookies = response.headers.get("set-cookie");
    if (!responseCookies) {
      return;
    }
    const now = Date.now();
    const parsedResponseCookies = (0, import_set_cookie_parser.parse)(responseCookies).map(
      (_a) => {
        var _b = _a, { maxAge } = _b, cookie = __objRest(_b, ["maxAge"]);
        return __spreadProps(__spreadValues({}, cookie), {
          expires: maxAge === void 0 ? cookie.expires : new Date(now + maxAge * 1e3),
          maxAge
        });
      }
    );
    const prevCookies = this.store.get(requestUrl.origin) || /* @__PURE__ */ new Map();
    parsedResponseCookies.forEach((cookie) => {
      this.store.set(requestUrl.origin, prevCookies.set(cookie.name, cookie));
    });
  }
  get(request) {
    this.deleteExpiredCookies();
    const requestUrl = new URL(request.url);
    const originCookies = this.store.get(requestUrl.origin) || /* @__PURE__ */ new Map();
    if (!isPropertyAccessible(request, "credentials")) {
      return originCookies;
    }
    switch (request.credentials) {
      case "include": {
        if (typeof document === "undefined") {
          return originCookies;
        }
        const documentCookies = (0, import_set_cookie_parser.parse)(document.cookie);
        documentCookies.forEach((cookie) => {
          originCookies.set(cookie.name, cookie);
        });
        return originCookies;
      }
      case "same-origin": {
        return originCookies;
      }
      default:
        return /* @__PURE__ */ new Map();
    }
  }
  getAll() {
    this.deleteExpiredCookies();
    return this.store;
  }
  deleteAll(request) {
    const requestUrl = new URL(request.url);
    this.store.delete(requestUrl.origin);
  }
  clear() {
    this.store.clear();
  }
  hydrate() {
    if (!supportsLocalStorage()) {
      return;
    }
    const persistedCookies = localStorage.getItem(PERSISTENCY_KEY);
    if (!persistedCookies) {
      return;
    }
    try {
      const parsedCookies = JSON.parse(persistedCookies);
      parsedCookies.forEach(([origin, cookies]) => {
        this.store.set(
          origin,
          new Map(
            cookies.map((_a) => {
              var [token, _b] = _a, _c = _b, { expires } = _c, cookie = __objRest(_c, ["expires"]);
              return [
                token,
                expires === void 0 ? cookie : __spreadProps(__spreadValues({}, cookie), { expires: new Date(expires) })
              ];
            })
          )
        );
      });
    } catch (error2) {
      console.warn(`
[virtual-cookie] Failed to parse a stored cookie from the localStorage (key "${PERSISTENCY_KEY}").

Stored value:
${localStorage.getItem(PERSISTENCY_KEY)}

Thrown exception:
${error2}

Invalid value has been removed from localStorage to prevent subsequent failed parsing attempts.`);
      localStorage.removeItem(PERSISTENCY_KEY);
    }
  }
  persist() {
    if (!supportsLocalStorage()) {
      return;
    }
    const serializedCookies = Array.from(this.store.entries()).map(
      ([origin, cookies]) => {
        return [origin, Array.from(cookies.entries())];
      }
    );
    localStorage.setItem(PERSISTENCY_KEY, JSON.stringify(serializedCookies));
  }
  deleteExpiredCookies() {
    const now = Date.now();
    this.store.forEach((originCookies, origin) => {
      originCookies.forEach(({ expires, name }) => {
        if (expires !== void 0 && expires.getTime() <= now) {
          originCookies.delete(name);
        }
      });
      if (originCookies.size === 0) {
        this.store.delete(origin);
      }
    });
  }
};
var store = new CookieStore();

// node_modules/msw/lib/core/utils/request/readResponseCookies.mjs
function readResponseCookies(request, response) {
  store.add(__spreadProps(__spreadValues({}, request), { url: request.url.toString() }), response);
  store.persist();
}

// node_modules/msw/lib/core/utils/handleRequest.mjs
function handleRequest(request, requestId, handlers, options, emitter, handleRequestOptions) {
  return __async(this, null, function* () {
    emitter.emit("request:start", { request, requestId });
    if (request.headers.get("x-msw-intention") === "bypass") {
      emitter.emit("request:end", { request, requestId });
      handleRequestOptions?.onPassthroughResponse?.(request);
      return;
    }
    const lookupResult = yield until(() => {
      return executeHandlers({
        request,
        requestId,
        handlers,
        resolutionContext: handleRequestOptions?.resolutionContext
      });
    });
    if (lookupResult.error) {
      emitter.emit("unhandledException", {
        error: lookupResult.error,
        request,
        requestId
      });
      throw lookupResult.error;
    }
    if (!lookupResult.data) {
      yield onUnhandledRequest(request, options.onUnhandledRequest);
      emitter.emit("request:unhandled", { request, requestId });
      emitter.emit("request:end", { request, requestId });
      handleRequestOptions?.onPassthroughResponse?.(request);
      return;
    }
    const { response } = lookupResult.data;
    if (!response) {
      emitter.emit("request:end", { request, requestId });
      handleRequestOptions?.onPassthroughResponse?.(request);
      return;
    }
    if (response.status === 302 && response.headers.get("x-msw-intention") === "passthrough") {
      emitter.emit("request:end", { request, requestId });
      handleRequestOptions?.onPassthroughResponse?.(request);
      return;
    }
    readResponseCookies(request, response);
    emitter.emit("request:match", { request, requestId });
    const requiredLookupResult = lookupResult.data;
    const transformedResponse = handleRequestOptions?.transformResponse?.(response) || response;
    handleRequestOptions?.onMockedResponse?.(
      transformedResponse,
      requiredLookupResult
    );
    emitter.emit("request:end", { request, requestId });
    return transformedResponse;
  });
}

export {
  invariant,
  devUtils,
  SetupApi,
  RequestHandler,
  toPublicUrl,
  store,
  executeHandlers,
  handleRequest
};
//# sourceMappingURL=chunk-RET7EQAO.js.map
