var __async = (__this, __arguments, generator) => {
  return new Promise((resolve2, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve2(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map[key] = 1;
  return (val) => val in map;
}
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate = (val) => toTypeString(val) === "[object Date]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return ((str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  });
};
const camelizeRE = /-\w/g;
const camelize = cacheStringFunction(
  (str) => {
    return str.replace(camelizeRE, (c) => c.slice(1).toUpperCase());
  }
);
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction(
  (str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  }
);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, ...arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](...arg);
  }
};
const def = (obj, key, value, writable = false) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable,
    value
  });
};
const looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
const toNumber = (val) => {
  const n = isString(val) ? Number(val) : NaN;
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
function looseCompareArrays(a, b) {
  if (a.length !== b.length) return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}
function looseEqual(a, b) {
  if (a === b) return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isSymbol(a);
  bValidType = isSymbol(b);
  if (aValidType || bValidType) {
    return a === b;
  }
  aValidType = isArray$1(a);
  bValidType = isArray$1(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = isObject(a);
  bValidType = isObject(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}
const isRef$1 = (val) => {
  return !!(val && val["__v_isRef"] === true);
};
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray$1(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (isRef$1(val)) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject(val) && !isArray$1(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v, i = "") => {
  var _a;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
  );
};
let activeEffectScope;
class EffectScope {
  // TODO isolatedDeclarations "__v_skip"
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this._on = 0;
    this.effects = [];
    this.cleanups = [];
    this._isPaused = false;
    this.__v_skip = true;
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let i, l;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].pause();
        }
      }
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].pause();
      }
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active) {
      if (this._isPaused) {
        this._isPaused = false;
        let i, l;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].resume();
          }
        }
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].resume();
        }
      }
    }
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    if (++this._on === 1) {
      this.prevScope = activeEffectScope;
      activeEffectScope = this;
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      activeEffectScope = this.prevScope;
      this.prevScope = void 0;
    }
  }
  stop(fromParent) {
    if (this._active) {
      this._active = false;
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      this.effects.length = 0;
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      this.cleanups.length = 0;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function getCurrentScope() {
  return activeEffectScope;
}
let activeSub;
const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 1 | 4;
    this.next = void 0;
    this.cleanup = void 0;
    this.scheduler = void 0;
    if (activeEffectScope && activeEffectScope.active) {
      activeEffectScope.effects.push(this);
    }
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    if (this.flags & 64) {
      this.flags &= -65;
      if (pausedQueueEffects.has(this)) {
        pausedQueueEffects.delete(this);
        this.trigger();
      }
    }
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags & 2 && !(this.flags & 32)) {
      return;
    }
    if (!(this.flags & 8)) {
      batch(this);
    }
  }
  run() {
    if (!(this.flags & 1)) {
      return this.fn();
    }
    this.flags |= 2;
    cleanupEffect(this);
    prepareDeps(this);
    const prevEffect = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = this;
    shouldTrack = true;
    try {
      return this.fn();
    } finally {
      cleanupDeps(this);
      activeSub = prevEffect;
      shouldTrack = prevShouldTrack;
      this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let link = this.deps; link; link = link.nextDep) {
        removeSub(link);
      }
      this.deps = this.depsTail = void 0;
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags &= -2;
    }
  }
  trigger() {
    if (this.flags & 64) {
      pausedQueueEffects.add(this);
    } else if (this.scheduler) {
      this.scheduler();
    } else {
      this.runIfDirty();
    }
  }
  /**
   * @internal
   */
  runIfDirty() {
    if (isDirty(this)) {
      this.run();
    }
  }
  get dirty() {
    return isDirty(this);
  }
}
let batchDepth = 0;
let batchedSub;
let batchedComputed;
function batch(sub, isComputed = false) {
  sub.flags |= 8;
  if (isComputed) {
    sub.next = batchedComputed;
    batchedComputed = sub;
    return;
  }
  sub.next = batchedSub;
  batchedSub = sub;
}
function startBatch() {
  batchDepth++;
}
function endBatch() {
  if (--batchDepth > 0) {
    return;
  }
  if (batchedComputed) {
    let e = batchedComputed;
    batchedComputed = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      e = next;
    }
  }
  let error;
  while (batchedSub) {
    let e = batchedSub;
    batchedSub = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      if (e.flags & 1) {
        try {
          ;
          e.trigger();
        } catch (err) {
          if (!error) error = err;
        }
      }
      e = next;
    }
  }
  if (error) throw error;
}
function prepareDeps(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    link.version = -1;
    link.prevActiveLink = link.dep.activeLink;
    link.dep.activeLink = link;
  }
}
function cleanupDeps(sub) {
  let head;
  let tail = sub.depsTail;
  let link = tail;
  while (link) {
    const prev = link.prevDep;
    if (link.version === -1) {
      if (link === tail) tail = prev;
      removeSub(link);
      removeDep(link);
    } else {
      head = link;
    }
    link.dep.activeLink = link.prevActiveLink;
    link.prevActiveLink = void 0;
    link = prev;
  }
  sub.deps = head;
  sub.depsTail = tail;
}
function isDirty(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
      return true;
    }
  }
  if (sub._dirty) {
    return true;
  }
  return false;
}
function refreshComputed(computed2) {
  if (computed2.flags & 4 && !(computed2.flags & 16)) {
    return;
  }
  computed2.flags &= -17;
  if (computed2.globalVersion === globalVersion) {
    return;
  }
  computed2.globalVersion = globalVersion;
  if (!computed2.isSSR && computed2.flags & 128 && (!computed2.deps && !computed2._dirty || !isDirty(computed2))) {
    return;
  }
  computed2.flags |= 2;
  const dep = computed2.dep;
  const prevSub = activeSub;
  const prevShouldTrack = shouldTrack;
  activeSub = computed2;
  shouldTrack = true;
  try {
    prepareDeps(computed2);
    const value = computed2.fn(computed2._value);
    if (dep.version === 0 || hasChanged(value, computed2._value)) {
      computed2.flags |= 128;
      computed2._value = value;
      dep.version++;
    }
  } catch (err) {
    dep.version++;
    throw err;
  } finally {
    activeSub = prevSub;
    shouldTrack = prevShouldTrack;
    cleanupDeps(computed2);
    computed2.flags &= -3;
  }
}
function removeSub(link, soft = false) {
  const { dep, prevSub, nextSub } = link;
  if (prevSub) {
    prevSub.nextSub = nextSub;
    link.prevSub = void 0;
  }
  if (nextSub) {
    nextSub.prevSub = prevSub;
    link.nextSub = void 0;
  }
  if (dep.subs === link) {
    dep.subs = prevSub;
    if (!prevSub && dep.computed) {
      dep.computed.flags &= -5;
      for (let l = dep.computed.deps; l; l = l.nextDep) {
        removeSub(l, true);
      }
    }
  }
  if (!soft && !--dep.sc && dep.map) {
    dep.map.delete(dep.key);
  }
}
function removeDep(link) {
  const { prevDep, nextDep } = link;
  if (prevDep) {
    prevDep.nextDep = nextDep;
    link.prevDep = void 0;
  }
  if (nextDep) {
    nextDep.prevDep = prevDep;
    link.nextDep = void 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function cleanupEffect(e) {
  const { cleanup } = e;
  e.cleanup = void 0;
  if (cleanup) {
    const prevSub = activeSub;
    activeSub = void 0;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}
let globalVersion = 0;
class Link {
  constructor(sub, dep) {
    this.sub = sub;
    this.dep = dep;
    this.version = dep.version;
    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Dep {
  // TODO isolatedDeclarations "__v_skip"
  constructor(computed2) {
    this.computed = computed2;
    this.version = 0;
    this.activeLink = void 0;
    this.subs = void 0;
    this.map = void 0;
    this.key = void 0;
    this.sc = 0;
    this.__v_skip = true;
  }
  track(debugInfo) {
    if (!activeSub || !shouldTrack || activeSub === this.computed) {
      return;
    }
    let link = this.activeLink;
    if (link === void 0 || link.sub !== activeSub) {
      link = this.activeLink = new Link(activeSub, this);
      if (!activeSub.deps) {
        activeSub.deps = activeSub.depsTail = link;
      } else {
        link.prevDep = activeSub.depsTail;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
      }
      addSub(link);
    } else if (link.version === -1) {
      link.version = this.version;
      if (link.nextDep) {
        const next = link.nextDep;
        next.prevDep = link.prevDep;
        if (link.prevDep) {
          link.prevDep.nextDep = next;
        }
        link.prevDep = activeSub.depsTail;
        link.nextDep = void 0;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
        if (activeSub.deps === link) {
          activeSub.deps = next;
        }
      }
    }
    return link;
  }
  trigger(debugInfo) {
    this.version++;
    globalVersion++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      if (false) ;
      for (let link = this.subs; link; link = link.prevSub) {
        if (link.sub.notify()) {
          ;
          link.sub.dep.notify();
        }
      }
    } finally {
      endBatch();
    }
  }
}
function addSub(link) {
  link.dep.sc++;
  if (link.sub.flags & 4) {
    const computed2 = link.dep.computed;
    if (computed2 && !link.dep.subs) {
      computed2.flags |= 4 | 16;
      for (let l = computed2.deps; l; l = l.nextDep) {
        addSub(l);
      }
    }
    const currentTail = link.dep.subs;
    if (currentTail !== link) {
      link.prevSub = currentTail;
      if (currentTail) currentTail.nextSub = link;
    }
    link.dep.subs = link;
  }
}
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = /* @__PURE__ */ Symbol(
  ""
);
const MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol(
  ""
);
const ARRAY_ITERATE_KEY = /* @__PURE__ */ Symbol(
  ""
);
function track(target, type, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep());
      dep.map = depsMap;
      dep.key = key;
    }
    {
      dep.track();
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    globalVersion++;
    return;
  }
  const run = (dep) => {
    if (dep) {
      {
        dep.trigger();
      }
    }
  };
  startBatch();
  if (type === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray$1(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
          run(dep);
        }
      });
    } else {
      if (key !== void 0 || depsMap.has(void 0)) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
}
function reactiveReadArray(array) {
  const raw = /* @__PURE__ */ toRaw(array);
  if (raw === array) return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return /* @__PURE__ */ isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
  track(arr = /* @__PURE__ */ toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
function toWrapped(target, item) {
  if (/* @__PURE__ */ isReadonly(target)) {
    return /* @__PURE__ */ isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
  }
  return toReactive(item);
}
const arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
  },
  concat(...args) {
    return reactiveReadArray(this).concat(
      ...args.map((x) => isArray$1(x) ? reactiveReadArray(x) : x)
    );
  },
  entries() {
    return iterator(this, "entries", (value) => {
      value[1] = toWrapped(this, value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply(
      this,
      "filter",
      fn,
      thisArg,
      (v) => v.map((item) => toWrapped(this, item)),
      arguments
    );
  },
  find(fn, thisArg) {
    return apply(
      this,
      "find",
      fn,
      thisArg,
      (item) => toWrapped(this, item),
      arguments
    );
  },
  findIndex(fn, thisArg) {
    return apply(this, "findIndex", fn, thisArg, void 0, arguments);
  },
  findLast(fn, thisArg) {
    return apply(
      this,
      "findLast",
      fn,
      thisArg,
      (item) => toWrapped(this, item),
      arguments
    );
  },
  findLastIndex(fn, thisArg) {
    return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(fn, thisArg) {
    return apply(this, "forEach", fn, thisArg, void 0, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, void 0, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", (item) => toWrapped(this, item));
  }
};
function iterator(self2, method, wrapValue) {
  const arr = shallowReadArray(self2);
  const iter = arr[method]();
  if (arr !== self2 && !/* @__PURE__ */ isShallow(self2)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (!result.done) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
}
const arrayProto = Array.prototype;
function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self2, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self2) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toWrapped(self2, item), index, self2);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self2);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self2, method, fn, args) {
  const arr = shallowReadArray(self2);
  let wrappedFn = fn;
  if (arr !== self2) {
    if (!/* @__PURE__ */ isShallow(self2)) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, toWrapped(self2, item), index, self2);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self2);
      };
    }
  }
  return arr[method](wrappedFn, ...args);
}
function searchProxy(self2, method, args) {
  const arr = /* @__PURE__ */ toRaw(self2);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && /* @__PURE__ */ isProxy(args[0])) {
    args[0] = /* @__PURE__ */ toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self2, method, args = []) {
  pauseTracking();
  startBatch();
  const res = (/* @__PURE__ */ toRaw(self2))[method].apply(self2, args);
  endBatch();
  resetTracking();
  return res;
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
function hasOwnProperty(key) {
  if (!isSymbol(key)) key = String(key);
  const obj = /* @__PURE__ */ toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === "__v_skip") return target["__v_skip"];
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(
      target,
      key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ isRef(target) ? target : receiver
    );
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (/* @__PURE__ */ isRef(res)) {
      const value = targetIsArray && isIntegerKey(key) ? res : res.value;
      return isReadonly2 && isObject(value) ? /* @__PURE__ */ readonly(value) : value;
    }
    if (isObject(res)) {
      return isReadonly2 ? /* @__PURE__ */ readonly(res) : /* @__PURE__ */ reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    const isArrayWithIntegerKey = isArray$1(target) && isIntegerKey(key);
    if (!this._isShallow) {
      const isOldValueReadonly = /* @__PURE__ */ isReadonly(oldValue);
      if (!/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
        oldValue = /* @__PURE__ */ toRaw(oldValue);
        value = /* @__PURE__ */ toRaw(value);
      }
      if (!isArrayWithIntegerKey && /* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
        if (isOldValueReadonly) {
          return true;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(
      target,
      key,
      value,
      /* @__PURE__ */ isRef(target) ? target : receiver
    );
    if (target === /* @__PURE__ */ toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray$1(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    return true;
  }
  deleteProperty(target, key) {
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = /* @__PURE__ */ toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return extend(
      // inheriting all iterator properties
      Object.create(innerIterator),
      {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        }
      }
    );
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations(readonly2, shallow) {
  const instrumentations = {
    get(key) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const rawKey = /* @__PURE__ */ toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
      }
      const { has } = getProto(rawTarget);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    },
    get size() {
      const target = this["__v_raw"];
      !readonly2 && track(/* @__PURE__ */ toRaw(target), "iterate", ITERATE_KEY);
      return target.size;
    },
    has(key) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const rawKey = /* @__PURE__ */ toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }
  };
  extend(
    instrumentations,
    readonly2 ? {
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear")
    } : {
      add(value) {
        if (!shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
          value = /* @__PURE__ */ toRaw(value);
        }
        const target = /* @__PURE__ */ toRaw(this);
        const proto = getProto(target);
        const hadKey = proto.has.call(target, value);
        if (!hadKey) {
          target.add(value);
          trigger(target, "add", value, value);
        }
        return this;
      },
      set(key, value) {
        if (!shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
          value = /* @__PURE__ */ toRaw(value);
        }
        const target = /* @__PURE__ */ toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = /* @__PURE__ */ toRaw(key);
          hadKey = has.call(target, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value);
        }
        return this;
      },
      delete(key) {
        const target = /* @__PURE__ */ toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = /* @__PURE__ */ toRaw(key);
          hadKey = has.call(target, key);
        }
        get ? get.call(target, key) : void 0;
        const result = target.delete(key);
        if (hadKey) {
          trigger(target, "delete", key, void 0);
        }
        return result;
      },
      clear() {
        const target = /* @__PURE__ */ toRaw(this);
        const hadItems = target.size !== 0;
        const result = target.clear();
        if (hadItems) {
          trigger(
            target,
            "clear",
            void 0,
            void 0
          );
        }
        return result;
      }
    }
  );
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    instrumentations[method] = createIterableMethod(method, readonly2, shallow);
  });
  return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = createInstrumentations(isReadonly2, shallow);
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
// @__NO_SIDE_EFFECTS__
function reactive(target) {
  if (/* @__PURE__ */ isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
// @__NO_SIDE_EFFECTS__
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
// @__NO_SIDE_EFFECTS__
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
// @__NO_SIDE_EFFECTS__
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
// @__NO_SIDE_EFFECTS__
function isReactive(value) {
  if (/* @__PURE__ */ isReadonly(value)) {
    return /* @__PURE__ */ isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
// @__NO_SIDE_EFFECTS__
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
// @__NO_SIDE_EFFECTS__
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
// @__NO_SIDE_EFFECTS__
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
// @__NO_SIDE_EFFECTS__
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? /* @__PURE__ */ toRaw(raw) : observed;
}
function markRaw(value) {
  if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject(value) ? /* @__PURE__ */ reactive(value) : value;
const toReadonly = (value) => isObject(value) ? /* @__PURE__ */ readonly(value) : value;
// @__NO_SIDE_EFFECTS__
function isRef(r) {
  return r ? r["__v_isRef"] === true : false;
}
// @__NO_SIDE_EFFECTS__
function ref(value) {
  return createRef(value, false);
}
// @__NO_SIDE_EFFECTS__
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (/* @__PURE__ */ isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, isShallow2) {
    this.dep = new Dep();
    this["__v_isRef"] = true;
    this["__v_isShallow"] = false;
    this._rawValue = isShallow2 ? value : /* @__PURE__ */ toRaw(value);
    this._value = isShallow2 ? value : toReactive(value);
    this["__v_isShallow"] = isShallow2;
  }
  get value() {
    {
      this.dep.track();
    }
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || /* @__PURE__ */ isShallow(newValue) || /* @__PURE__ */ isReadonly(newValue);
    newValue = useDirectValue ? newValue : /* @__PURE__ */ toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = useDirectValue ? newValue : toReactive(newValue);
      {
        this.dep.trigger();
      }
    }
  }
}
function unref(ref2) {
  return /* @__PURE__ */ isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (/* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return /* @__PURE__ */ isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ComputedRefImpl {
  constructor(fn, setter, isSSR) {
    this.fn = fn;
    this.setter = setter;
    this._value = void 0;
    this.dep = new Dep(this);
    this.__v_isRef = true;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 16;
    this.globalVersion = globalVersion - 1;
    this.next = void 0;
    this.effect = this;
    this["__v_isReadonly"] = !setter;
    this.isSSR = isSSR;
  }
  /**
   * @internal
   */
  notify() {
    this.flags |= 16;
    if (!(this.flags & 8) && // avoid infinite self recursion
    activeSub !== this) {
      batch(this, true);
      return true;
    }
  }
  get value() {
    const link = this.dep.track();
    refreshComputed(this);
    if (link) {
      link.version = this.dep.version;
    }
    return this._value;
  }
  set value(newValue) {
    if (this.setter) {
      this.setter(newValue);
    }
  }
}
// @__NO_SIDE_EFFECTS__
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, isSSR);
  return cRef;
}
const INITIAL_WATCHER_VALUE = {};
const cleanupMap = /* @__PURE__ */ new WeakMap();
let activeWatcher = void 0;
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
  if (owner) {
    let cleanups = cleanupMap.get(owner);
    if (!cleanups) cleanupMap.set(owner, cleanups = []);
    cleanups.push(cleanupFn);
  }
}
function watch$1(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, once, scheduler, augmentJob, call } = options;
  const reactiveGetter = (source2) => {
    if (deep) return source2;
    if (/* @__PURE__ */ isShallow(source2) || deep === false || deep === 0)
      return traverse(source2, 1);
    return traverse(source2);
  };
  let effect2;
  let getter;
  let cleanup;
  let boundCleanup;
  let forceTrigger = false;
  let isMultiSource = false;
  if (/* @__PURE__ */ isRef(source)) {
    getter = () => source.value;
    forceTrigger = /* @__PURE__ */ isShallow(source);
  } else if (/* @__PURE__ */ isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => /* @__PURE__ */ isReactive(s) || /* @__PURE__ */ isShallow(s));
    getter = () => source.map((s) => {
      if (/* @__PURE__ */ isRef(s)) {
        return s.value;
      } else if (/* @__PURE__ */ isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction(s)) {
        return call ? call(s, 2) : s();
      } else ;
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = call ? () => call(source, 2) : source;
    } else {
      getter = () => {
        if (cleanup) {
          pauseTracking();
          try {
            cleanup();
          } finally {
            resetTracking();
          }
        }
        const currentEffect = activeWatcher;
        activeWatcher = effect2;
        try {
          return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
        } finally {
          activeWatcher = currentEffect;
        }
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    const depth = deep === true ? Infinity : deep;
    getter = () => traverse(baseGetter(), depth);
  }
  const scope = getCurrentScope();
  const watchHandle = () => {
    effect2.stop();
    if (scope && scope.active) {
      remove(scope.effects, effect2);
    }
  };
  if (once && cb) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      watchHandle();
    };
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = (immediateFirstRun) => {
    if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
        if (cleanup) {
          cleanup();
        }
        const currentWatcher = activeWatcher;
        activeWatcher = effect2;
        try {
          const args = [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            boundCleanup
          ];
          oldValue = newValue;
          call ? call(cb, 3, args) : (
            // @ts-expect-error
            cb(...args)
          );
        } finally {
          activeWatcher = currentWatcher;
        }
      }
    } else {
      effect2.run();
    }
  };
  if (augmentJob) {
    augmentJob(job);
  }
  effect2 = new ReactiveEffect(getter);
  effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
  boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
  cleanup = effect2.onStop = () => {
    const cleanups = cleanupMap.get(effect2);
    if (cleanups) {
      if (call) {
        call(cleanups, 4);
      } else {
        for (const cleanup2 of cleanups) cleanup2();
      }
      cleanupMap.delete(effect2);
    }
  };
  if (cb) {
    if (immediate) {
      job(true);
    } else {
      oldValue = effect2.run();
    }
  } else if (scheduler) {
    scheduler(job.bind(null, true), true);
  } else {
    effect2.run();
  }
  watchHandle.pause = effect2.pause.bind(effect2);
  watchHandle.resume = effect2.resume.bind(effect2);
  watchHandle.stop = watchHandle;
  return watchHandle;
}
function traverse(value, depth = Infinity, seen) {
  if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Map();
  if ((seen.get(value) || 0) >= depth) {
    return value;
  }
  seen.set(value, depth);
  depth--;
  if (/* @__PURE__ */ isRef(value)) {
    traverse(value.value, depth, seen);
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, seen);
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key], depth, seen);
      }
    }
  }
  return value;
}
const stack = [];
let isWarning = false;
function warn$1(msg, ...args) {
  if (isWarning) return;
  isWarning = true;
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
  isWarning = false;
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (/* @__PURE__ */ isRef(value)) {
    value = formatProp(key, /* @__PURE__ */ toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = /* @__PURE__ */ toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  if (isArray$1(fn)) {
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  }
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    if (errorHandler) {
      pauseTracking();
      callWithErrorHandling(errorHandler, null, 10, [
        err,
        exposedInstance,
        errorInfo
      ]);
      resetTracking();
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
  if (throwInProd) {
    throw err;
  } else {
    console.error(err);
  }
}
const queue = [];
let flushIndex = -1;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex$1(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!(job.flags & 1)) {
    const jobId = getId(job);
    const lastJob = queue[queue.length - 1];
    if (!lastJob || // fast path when the job id is larger than the tail
    !(job.flags & 2) && jobId >= getId(lastJob)) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex$1(jobId), 0, job);
    }
    job.flags |= 1;
    queueFlush();
  }
}
function queueFlush() {
  if (!currentFlushPromise) {
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$1(cb)) {
    if (activePostFlushCbs && cb.id === -1) {
      activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
    } else if (!(cb.flags & 1)) {
      pendingPostFlushCbs.push(cb);
      cb.flags |= 1;
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.flags & 2) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      cb();
      if (!(cb.flags & 4)) {
        cb.flags &= -2;
      }
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      const cb = activePostFlushCbs[postFlushIndex];
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      if (!(cb.flags & 8)) cb();
      cb.flags &= -2;
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
function flushJobs(seen) {
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && !(job.flags & 8)) {
        if (false) ;
        if (job.flags & 4) {
          job.flags &= ~1;
        }
        callWithErrorHandling(
          job,
          job.i,
          job.i ? 15 : 14
        );
        if (!(job.flags & 4)) {
          job.flags &= ~1;
        }
      }
    }
  } finally {
    for (; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job) {
        job.flags &= -2;
      }
    }
    flushIndex = -1;
    queue.length = 0;
    flushPostFlushCbs();
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx) return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function withDirectives(vnode, directives) {
  if (currentRenderingInstance === null) {
    return vnode;
  }
  const instance = getComponentPublicInstance(currentRenderingInstance);
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
function provide(key, value) {
  if (currentInstance) {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = getCurrentInstance();
  if (instance || currentApp) {
    let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else ;
  }
}
const ssrContextKey = /* @__PURE__ */ Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, flush, once } = options;
  const baseWatchOptions = extend({}, options);
  const runsImmediately = cb && immediate || !cb && flush !== "post";
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else if (!runsImmediately) {
      const watchStopHandle = () => {
      };
      watchStopHandle.stop = NOOP;
      watchStopHandle.resume = NOOP;
      watchStopHandle.pause = NOOP;
      return watchStopHandle;
    }
  }
  const instance = currentInstance;
  baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
  let isPre = false;
  if (flush === "post") {
    baseWatchOptions.scheduler = (job) => {
      queuePostRenderEffect(job, instance && instance.suspense);
    };
  } else if (flush !== "sync") {
    isPre = true;
    baseWatchOptions.scheduler = (job, isFirstRun) => {
      if (isFirstRun) {
        job();
      } else {
        queueJob(job);
      }
    };
  }
  baseWatchOptions.augmentJob = (job) => {
    if (cb) {
      job.flags |= 4;
    }
    if (isPre) {
      job.flags |= 2;
      if (instance) {
        job.id = instance.uid;
        job.i = instance;
      }
    }
  };
  const watchHandle = watch$1(source, cb, baseWatchOptions);
  if (isInSSRComponentSetup) {
    if (ssrCleanup) {
      ssrCleanup.push(watchHandle);
    } else if (runsImmediately) {
      watchHandle();
    }
  }
  return watchHandle;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
const TeleportEndKey = /* @__PURE__ */ Symbol("_vte");
const isTeleport = (type) => type.__isTeleport;
const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
const isTeleportDeferred = (props) => props && (props.defer || props.defer === "");
const isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
const isTargetMathML = (target) => typeof MathMLElement === "function" && target instanceof MathMLElement;
const resolveTarget = (props, select) => {
  const targetSelector = props && props.to;
  if (isString(targetSelector)) {
    if (!select) {
      return null;
    } else {
      const target = select(targetSelector);
      return target;
    }
  } else {
    return targetSelector;
  }
};
const TeleportImpl = {
  name: "Teleport",
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals) {
    const {
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      o: { insert, querySelector, createText, createComment }
    } = internals;
    const disabled = isTeleportDisabled(n2.props);
    let { shapeFlag, children, dynamicChildren } = n2;
    if (n1 == null) {
      const placeholder = n2.el = createText("");
      const mainAnchor = n2.anchor = createText("");
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      const mount = (container2, anchor2) => {
        if (shapeFlag & 16) {
          mountChildren(
            children,
            container2,
            anchor2,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      };
      const mountToTarget = () => {
        const target = n2.target = resolveTarget(n2.props, querySelector);
        const targetAnchor = prepareAnchor(target, n2, createText, insert);
        if (target) {
          if (namespace !== "svg" && isTargetSVG(target)) {
            namespace = "svg";
          } else if (namespace !== "mathml" && isTargetMathML(target)) {
            namespace = "mathml";
          }
          if (parentComponent && parentComponent.isCE) {
            (parentComponent.ce._teleportTargets || (parentComponent.ce._teleportTargets = /* @__PURE__ */ new Set())).add(target);
          }
          if (!disabled) {
            mount(target, targetAnchor);
            updateCssVars(n2, false);
          }
        }
      };
      if (disabled) {
        mount(container, mainAnchor);
        updateCssVars(n2, true);
      }
      if (isTeleportDeferred(n2.props)) {
        n2.el.__isMounted = false;
        queuePostRenderEffect(() => {
          mountToTarget();
          delete n2.el.__isMounted;
        }, parentSuspense);
      } else {
        mountToTarget();
      }
    } else {
      if (isTeleportDeferred(n2.props) && n1.el.__isMounted === false) {
        queuePostRenderEffect(() => {
          TeleportImpl.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        }, parentSuspense);
        return;
      }
      n2.el = n1.el;
      n2.targetStart = n1.targetStart;
      const mainAnchor = n2.anchor = n1.anchor;
      const target = n2.target = n1.target;
      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container : target;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      if (namespace === "svg" || isTargetSVG(target)) {
        namespace = "svg";
      } else if (namespace === "mathml" || isTargetMathML(target)) {
        namespace = "mathml";
      }
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          currentContainer,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        traverseStaticChildren(n1, n2, true);
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          currentContainer,
          currentAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          false
        );
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(
            n2,
            container,
            mainAnchor,
            internals,
            1
          );
        } else {
          if (n2.props && n1.props && n2.props.to !== n1.props.to) {
            n2.props.to = n1.props.to;
          }
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = n2.target = resolveTarget(
            n2.props,
            querySelector
          );
          if (nextTarget) {
            moveTeleport(
              n2,
              nextTarget,
              null,
              internals,
              0
            );
          }
        } else if (wasDisabled) {
          moveTeleport(
            n2,
            target,
            targetAnchor,
            internals,
            1
          );
        }
      }
      updateCssVars(n2, disabled);
    }
  },
  remove(vnode, parentComponent, parentSuspense, { um: unmount, o: { remove: hostRemove } }, doRemove) {
    const {
      shapeFlag,
      children,
      anchor,
      targetStart,
      targetAnchor,
      target,
      props
    } = vnode;
    if (target) {
      hostRemove(targetStart);
      hostRemove(targetAnchor);
    }
    doRemove && hostRemove(anchor);
    if (shapeFlag & 16) {
      const shouldRemove = doRemove || !isTeleportDisabled(props);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        unmount(
          child,
          parentComponent,
          parentSuspense,
          shouldRemove,
          !!child.dynamicChildren
        );
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
  if (moveType === 0) {
    insert(vnode.targetAnchor, container, parentAnchor);
  }
  const { el, anchor, shapeFlag, children, props } = vnode;
  const isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container, parentAnchor);
  }
  if (!isReorder || isTeleportDisabled(props)) {
    if (shapeFlag & 16) {
      for (let i = 0; i < children.length; i++) {
        move(
          children[i],
          container,
          parentAnchor,
          2
        );
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {
  o: { nextSibling, parentNode, querySelector, insert, createText }
}, hydrateChildren) {
  function hydrateAnchor(target2, targetNode) {
    let targetAnchor = targetNode;
    while (targetAnchor) {
      if (targetAnchor && targetAnchor.nodeType === 8) {
        if (targetAnchor.data === "teleport start anchor") {
          vnode.targetStart = targetAnchor;
        } else if (targetAnchor.data === "teleport anchor") {
          vnode.targetAnchor = targetAnchor;
          target2._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
          break;
        }
      }
      targetAnchor = nextSibling(targetAnchor);
    }
  }
  function hydrateDisabledTeleport(node2, vnode2) {
    vnode2.anchor = hydrateChildren(
      nextSibling(node2),
      vnode2,
      parentNode(node2),
      parentComponent,
      parentSuspense,
      slotScopeIds,
      optimized
    );
  }
  const target = vnode.target = resolveTarget(
    vnode.props,
    querySelector
  );
  const disabled = isTeleportDisabled(vnode.props);
  if (target) {
    const targetNode = target._lpa || target.firstChild;
    if (vnode.shapeFlag & 16) {
      if (disabled) {
        hydrateDisabledTeleport(node, vnode);
        hydrateAnchor(target, targetNode);
        if (!vnode.targetAnchor) {
          prepareAnchor(
            target,
            vnode,
            createText,
            insert,
            // if target is the same as the main view, insert anchors before current node
            // to avoid hydrating mismatch
            parentNode(node) === target ? node : null
          );
        }
      } else {
        vnode.anchor = nextSibling(node);
        hydrateAnchor(target, targetNode);
        if (!vnode.targetAnchor) {
          prepareAnchor(target, vnode, createText, insert);
        }
        hydrateChildren(
          targetNode && nextSibling(targetNode),
          vnode,
          target,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
      }
    }
    updateCssVars(vnode, disabled);
  } else if (disabled) {
    if (vnode.shapeFlag & 16) {
      hydrateDisabledTeleport(node, vnode);
      vnode.targetStart = node;
      vnode.targetAnchor = nextSibling(node);
    }
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
const Teleport = TeleportImpl;
function updateCssVars(vnode, isDisabled) {
  const ctx = vnode.ctx;
  if (ctx && ctx.ut) {
    let node, anchor;
    if (isDisabled) {
      node = vnode.el;
      anchor = vnode.anchor;
    } else {
      node = vnode.targetStart;
      anchor = vnode.targetAnchor;
    }
    while (node && node !== anchor) {
      if (node.nodeType === 1) node.setAttribute("data-v-owner", ctx.uid);
      node = node.nextSibling;
    }
    ctx.ut();
  }
}
function prepareAnchor(target, vnode, createText, insert, anchor = null) {
  const targetStart = vnode.targetStart = createText("");
  const targetAnchor = vnode.targetAnchor = createText("");
  targetStart[TeleportEndKey] = targetAnchor;
  if (target) {
    insert(targetStart, target, anchor);
    insert(targetAnchor, target, anchor);
  }
  return targetAnchor;
}
const leaveCbKey = /* @__PURE__ */ Symbol("_leaveCb");
const enterCbKey = /* @__PURE__ */ Symbol("_enterCb");
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionPropsValidators = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: TransitionHookValidator,
  onEnter: TransitionHookValidator,
  onAfterEnter: TransitionHookValidator,
  onEnterCancelled: TransitionHookValidator,
  // leave
  onBeforeLeave: TransitionHookValidator,
  onLeave: TransitionHookValidator,
  onAfterLeave: TransitionHookValidator,
  onLeaveCancelled: TransitionHookValidator,
  // appear
  onBeforeAppear: TransitionHookValidator,
  onAppear: TransitionHookValidator,
  onAfterAppear: TransitionHookValidator,
  onAppearCancelled: TransitionHookValidator
};
const recursiveGetSubtree = (instance) => {
  const subTree = instance.subTree;
  return subTree.component ? recursiveGetSubtree(subTree.component) : subTree;
};
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: BaseTransitionPropsValidators,
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      const child = findNonCommentChild(children);
      const rawProps = /* @__PURE__ */ toRaw(props);
      const { mode } = rawProps;
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getInnerChild$1(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      let enterHooks = resolveTransitionHooks(
        innerChild,
        rawProps,
        state,
        instance,
        // #11061, ensure enterHooks is fresh after clone
        (hooks) => enterHooks = hooks
      );
      if (innerChild.type !== Comment) {
        setTransitionHooks(innerChild, enterHooks);
      }
      let oldInnerChild = instance.subTree && getInnerChild$1(instance.subTree);
      if (oldInnerChild && oldInnerChild.type !== Comment && !isSameVNodeType(oldInnerChild, innerChild) && recursiveGetSubtree(instance).type !== Comment) {
        let leavingHooks = resolveTransitionHooks(
          oldInnerChild,
          rawProps,
          state,
          instance
        );
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in" && innerChild.type !== Comment) {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (!(instance.job.flags & 8)) {
              instance.update();
            }
            delete leavingHooks.afterLeave;
            oldInnerChild = void 0;
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(
              state,
              oldInnerChild
            );
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el[leaveCbKey] = () => {
              earlyRemove();
              el[leaveCbKey] = void 0;
              delete enterHooks.delayedLeave;
              oldInnerChild = void 0;
            };
            enterHooks.delayedLeave = () => {
              delayedLeave();
              delete enterHooks.delayedLeave;
              oldInnerChild = void 0;
            };
          };
        } else {
          oldInnerChild = void 0;
        }
      } else if (oldInnerChild) {
        oldInnerChild = void 0;
      }
      return child;
    };
  }
};
function findNonCommentChild(children) {
  let child = children[0];
  if (children.length > 1) {
    for (const c of children) {
      if (c.type !== Comment) {
        child = c;
        break;
      }
    }
  }
  return child;
}
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance, postClone) {
  const {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled
  } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(
      hook,
      instance,
      9,
      args
    );
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook2(hook, args);
    if (isArray$1(hook)) {
      if (hook.every((hook2) => hook2.length <= 1)) done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el[leaveCbKey]) {
        el[leaveCbKey](
          true
          /* cancelled */
        );
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) {
        leavingVNode.el[leaveCbKey]();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      if (leavingVNodesCache[key] === vnode) return;
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      el[enterCbKey] = (cancelled) => {
        if (called) return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el[enterCbKey] = void 0;
      };
      const done = el[enterCbKey].bind(null, false);
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el[enterCbKey]) {
        el[enterCbKey](
          true
          /* cancelled */
        );
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      el[leaveCbKey] = (cancelled) => {
        if (called) return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el[leaveCbKey] = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      const done = el[leaveCbKey].bind(null, false);
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      const hooks2 = resolveTransitionHooks(
        vnode2,
        props,
        state,
        instance,
        postClone
      );
      if (postClone) postClone(hooks2);
      return hooks2;
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getInnerChild$1(vnode) {
  if (!isKeepAlive(vnode)) {
    if (isTeleport(vnode.type) && vnode.children) {
      return findNonCommentChild(vnode.children);
    }
    return vnode;
  }
  if (vnode.component) {
    return vnode.component.subTree;
  }
  const { shapeFlag, children } = vnode;
  if (children) {
    if (shapeFlag & 16) {
      return children[0];
    }
    if (shapeFlag & 32 && isFunction(children.default)) {
      return children.default();
    }
  }
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    vnode.transition = hooks;
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128) keyedFragmentCount++;
      ret = ret.concat(
        getTransitionRawChildren(child.children, keepComment, key)
      );
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction(options) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
function markAsyncBoundary(instance) {
  instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
}
function isTemplateRefKey(refs, key) {
  let desc;
  return !!((desc = Object.getOwnPropertyDescriptor(refs, key)) && !desc.configurable);
}
const pendingSetRefMap = /* @__PURE__ */ new WeakMap();
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$1(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
      setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
    }
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref3 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  const rawSetupState = /* @__PURE__ */ toRaw(setupState);
  const canSetSetupRef = setupState === EMPTY_OBJ ? NO : (key) => {
    if (isTemplateRefKey(refs, key)) {
      return false;
    }
    return hasOwn(rawSetupState, key);
  };
  const canSetRef = (ref22, key) => {
    if (key && isTemplateRefKey(refs, key)) {
      return false;
    }
    return true;
  };
  if (oldRef != null && oldRef !== ref3) {
    invalidatePendingSetRef(oldRawRef);
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (canSetSetupRef(oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (/* @__PURE__ */ isRef(oldRef)) {
      const oldRawRefAtom = oldRawRef;
      if (canSetRef(oldRef, oldRawRefAtom.k)) {
        oldRef.value = null;
      }
      if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
    }
  }
  if (isFunction(ref3)) {
    callWithErrorHandling(ref3, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref3);
    const _isRef = /* @__PURE__ */ isRef(ref3);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? canSetSetupRef(ref3) ? setupState[ref3] : refs[ref3] : canSetRef() || !rawRef.k ? ref3.value : refs[rawRef.k];
          if (isUnmount) {
            isArray$1(existing) && remove(existing, refValue);
          } else {
            if (!isArray$1(existing)) {
              if (_isString) {
                refs[ref3] = [refValue];
                if (canSetSetupRef(ref3)) {
                  setupState[ref3] = refs[ref3];
                }
              } else {
                const newVal = [refValue];
                if (canSetRef(ref3, rawRef.k)) {
                  ref3.value = newVal;
                }
                if (rawRef.k) refs[rawRef.k] = newVal;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref3] = value;
          if (canSetSetupRef(ref3)) {
            setupState[ref3] = value;
          }
        } else if (_isRef) {
          if (canSetRef(ref3, rawRef.k)) {
            ref3.value = value;
          }
          if (rawRef.k) refs[rawRef.k] = value;
        } else ;
      };
      if (value) {
        const job = () => {
          doSet();
          pendingSetRefMap.delete(rawRef);
        };
        job.id = -1;
        pendingSetRefMap.set(rawRef, job);
        queuePostRenderEffect(job, parentSuspense);
      } else {
        invalidatePendingSetRef(rawRef);
        doSet();
      }
    }
  }
}
function invalidatePendingSetRef(rawRef) {
  const pendingSetRef = pendingSetRefMap.get(rawRef);
  if (pendingSetRef) {
    pendingSetRef.flags |= 8;
    pendingSetRefMap.delete(rawRef);
  }
}
getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => {
  if (!isInSSRComponentSetup || lifecycle === "sp") {
    injectHook(lifecycle, (...args) => hook(...args), target);
  }
};
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook(
  "bu"
);
const onUpdated = createHook("u");
const onBeforeUnmount = createHook(
  "bum"
);
const onUnmounted = createHook("um");
const onServerPrefetch = createHook(
  "sp"
);
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = /* @__PURE__ */ Symbol.for("v-ndc");
function resolveDynamicComponent(component) {
  if (isString(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    {
      const selfName = getComponentName(
        Component,
        false
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache;
  const sourceIsArray = isArray$1(source);
  if (sourceIsArray || isString(source)) {
    const sourceIsReactiveArray = sourceIsArray && /* @__PURE__ */ isReactive(source);
    let needsWrap = false;
    let isReadonlySource = false;
    if (sourceIsReactiveArray) {
      needsWrap = !/* @__PURE__ */ isShallow(source);
      isReadonlySource = /* @__PURE__ */ isReadonly(source);
      source = shallowReadArray(source);
    }
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(
        needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i])) : toReactive(source[i]) : source[i],
        i,
        void 0,
        cached
      );
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached)
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
const getPublicInstance = (i) => {
  if (!i) return null;
  if (isStatefulComponent(i)) return getComponentPublicInstance(i);
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => i.props,
    $attrs: (i) => i.attrs,
    $slots: (i) => i.slots,
    $refs: (i) => i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $host: (i) => i.ce,
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => {
      queueJob(i.update);
    }),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i)
  })
);
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    if (key === "__v_skip") {
      return true;
    }
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (hasOwn(props, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance.attrs, "get", "");
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, props, type }
  }, key) {
    let cssModules;
    return !!(accessCache[key] || data !== EMPTY_OBJ && key[0] !== "$" && hasOwn(data, key) || hasSetupBinding(setupState, key) || hasOwn(props, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
function normalizePropsOrEmits(props) {
  return isArray$1(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject(data)) ;
    else {
      instance.data = /* @__PURE__ */ reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get,
        set
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val,
          enumerable: true
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components) instance.components = components;
  if (directives) instance.directives = directives;
  if (serverPrefetch) {
    markAsyncBoundary(instance);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (/* @__PURE__ */ isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      {
        watch(getter, handler);
      }
    }
  } else if (isFunction(raw)) {
    {
      watch(getter, raw.bind(publicThis));
    }
  } else if (isObject(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions$1(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions$1(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions$1(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions$1(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray$1(to) && isArray$1(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const pluginCleanupFns = [];
    let isMounted = false;
    const app2 = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) ;
        else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app2, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app2, ...options);
        } else ;
        return app2;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app2;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app2;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app2;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          const vnode = app2._ceVNode || createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (namespace === true) {
            namespace = "svg";
          } else if (namespace === false) {
            namespace = void 0;
          }
          {
            render(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app2._container = rootContainer;
          rootContainer.__vue_app__ = app2;
          return getComponentPublicInstance(vnode.component);
        }
      },
      onUnmount(cleanupFn) {
        pluginCleanupFns.push(cleanupFn);
      },
      unmount() {
        if (isMounted) {
          callWithAsyncErrorHandling(
            pluginCleanupFns,
            app2._instance,
            16
          );
          render(null, app2._container);
          delete app2._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app2;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app2;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app2;
  };
}
let currentApp = null;
const getModelModifiers = (props, modelName) => {
  return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
};
function emit(instance, event2, ...rawArgs) {
  if (instance.isUnmounted) return;
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event2.startsWith("update:");
  const modifiers = isModelListener2 && getModelModifiers(props, event2.slice(7));
  if (modifiers) {
    if (modifiers.trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (modifiers.number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event2)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event2))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event2))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
const mixinEmitsCache = /* @__PURE__ */ new WeakMap();
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinEmitsCache : appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    props,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  const prev = setCurrentRenderingInstance(instance);
  let result;
  let fallthroughAttrs;
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = false ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn$1(
            `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          );
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode(
        render.call(
          thisProxy,
          proxyToUse,
          renderCache,
          false ? /* @__PURE__ */ shallowReadonly(props) : props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false) ;
      result = normalizeVNode(
        render2.length > 1 ? render2(
          false ? /* @__PURE__ */ shallowReadonly(props) : props,
          false ? {
            get attrs() {
              markAttrsAccessed();
              return /* @__PURE__ */ shallowReadonly(attrs);
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render2(
          false ? /* @__PURE__ */ shallowReadonly(props) : props,
          null
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs, false, true);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root, null, false, true);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    setTransitionHooks(root, vnode.transition);
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function hasPropValueChanged(nextProps, prevProps, key) {
  const nextProp = nextProps[key];
  const prevProp = prevProps[key];
  if (key === "style" && isObject(nextProp) && isObject(prevProp)) {
    return !looseEqual(nextProp, prevProp);
  }
  return nextProp !== prevProp;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.el = vnode.el;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
}
const internalObjectProto = {};
const createInternalObject = () => Object.create(internalObjectProto);
const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = createInternalObject();
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : /* @__PURE__ */ shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = /* @__PURE__ */ toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance.attrs, "set", "");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = /* @__PURE__ */ toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
      if (instance.ce) {
        instance.ce._setProp(key, value);
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
const mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinPropsCache : appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys) needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        const propType = prop.type;
        let shouldCast = false;
        let shouldCastTrue = true;
        if (isArray$1(propType)) {
          for (let index = 0; index < propType.length; ++index) {
            const type = propType[index];
            const typeName = isFunction(type) && type.name;
            if (typeName === "Boolean") {
              shouldCast = true;
              break;
            } else if (typeName === "String") {
              shouldCastTrue = false;
            }
          }
        } else {
          shouldCast = isFunction(propType) && propType.name === "Boolean";
        }
        prop[
          0
          /* shouldCast */
        ] = shouldCast;
        prop[
          1
          /* shouldCastTrue */
        ] = shouldCastTrue;
        if (shouldCast || hasOwn(prop, "default")) {
          needCastKeys.push(normalizedKey);
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  }
  return false;
}
const isInternalKey = (key) => key === "_" || key === "_ctx" || key === "$stable";
const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot$1 = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false) ;
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key)) continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot$1(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const assignSlots = (slots, children, optimized) => {
  for (const key in children) {
    if (optimized || !isInternalKey(key)) {
      slots[key] = children[key];
    }
  }
};
const initSlots = (instance, children, optimized) => {
  const slots = instance.slots = createInternalObject();
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      assignSlots(slots, children, optimized);
      if (optimized) {
        def(slots, "_", type, true);
      }
    } else {
      normalizeObjectSlots(children, slots);
    }
  } else if (children) {
    normalizeVNodeSlots(instance, children);
  }
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        assignSlots(slots, children, optimized);
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref3, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else ;
    }
    if (ref3 != null && parentComponent) {
      setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    } else if (ref3 == null && n1 && n1.ref != null) {
      setRef(n1.ref, null, parentSuspense, n1, true);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      namespace,
      n2.el,
      n2.anchor
    );
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") {
      namespace = "svg";
    } else if (n2.type === "math") {
      namespace = "mathml";
    }
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      const customElement = n1.el && n1.el._isVueCE ? n1.el : null;
      try {
        if (customElement) {
          customElement._beginPatch();
        }
        patchElement(
          n1,
          n2,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } finally {
        if (customElement) {
          customElement._endPatch();
        }
      }
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      namespace,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(vnode, namespace),
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], namespace, parentComponent);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
      hostSetElementText(el, "");
    }
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds
      );
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, namespace, parentComponent);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, oldProps, newProps, parentComponent, namespace);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64 | 128)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              namespace,
              parentComponent
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key)) continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, namespace, parentComponent);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [],
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren && n1.dynamicChildren.length === dynamicChildren.length) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          namespace,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance, false, optimized);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
        initialVNode.placeholder = placeholder.el;
      }
    } else {
      setupRenderEffect(
        instance,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized
      );
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent, root, type } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        {
          if (root.ce && root.ce._hasShadowRoot()) {
            root.ce._injectChildStyle(type);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            namespace
          );
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              queuePostRenderEffect(() => {
                if (!instance.isUnmounted) update();
              }, parentSuspense);
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          namespace
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
      }
    };
    instance.scope.on();
    const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
    instance.scope.off();
    const update = instance.update = effect2.run.bind(effect2);
    const job = instance.job = effect2.runIfDirty.bind(effect2);
    job.i = instance;
    job.id = instance.uid;
    effect2.scheduler = () => queueJob(job);
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(instance);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchorVNode = c2[nextIndex + 1];
        const anchor = nextIndex + 1 < l2 ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          anchorVNode.el || resolveAsyncComponentPlaceholder(anchorVNode)
        ) : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => {
          if (vnode.ctx.isUnmounted) {
            hostRemove(el);
          } else {
            hostInsert(el, container, anchor);
          }
        };
        const performLeave = () => {
          if (el._isLeaving) {
            el[leaveCbKey](
              true
              /* cancelled */
            );
          }
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref: ref3,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs,
      cacheIndex
    } = vnode;
    if (patchFlag === -2) {
      optimized = false;
    }
    if (ref3 != null) {
      pauseTracking();
      setRef(ref3, null, parentSuspense, vnode, true);
      resetTracking();
    }
    if (cacheIndex != null) {
      parentComponent.renderCache[cacheIndex] = void 0;
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, job, subTree, um, m, a } = instance;
    invalidateMount(m);
    invalidateMount(a);
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (job) {
      job.flags |= 8;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    const el = hostNextSibling(vnode.anchor || vnode.el);
    const teleportEnd = el && el[TeleportEndKey];
    return teleportEnd ? hostNextSibling(teleportEnd) : el;
  };
  let isFlushing = false;
  const render = (vnode, container, namespace) => {
    let instance;
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
        instance = container._vnode.component;
      }
    } else {
      patch(
        container._vnode || null,
        vnode,
        container,
        null,
        null,
        null,
        namespace
      );
    }
    container._vnode = vnode;
    if (!isFlushing) {
      isFlushing = true;
      flushPreFlushCbs(instance);
      flushPostFlushCbs();
      isFlushing = false;
    }
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  return {
    render,
    hydrate,
    createApp: createAppAPI(render)
  };
}
function resolveChildrenNamespace({ type, props }, currentNamespace) {
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect: effect2, job }, allowed) {
  if (allowed) {
    effect2.flags |= 32;
    job.flags |= 4;
  } else {
    effect2.flags &= -33;
    job.flags &= -5;
  }
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow && c2.patchFlag !== -2)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        if (c2.patchFlag === -1) {
          c2 = ch2[i] = cloneIfMounted(c2);
        }
        c2.el = c1.el;
      }
      if (c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
function locateNonHydratedAsyncRoot(instance) {
  const subComponent = instance.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
}
function invalidateMount(hooks) {
  if (hooks) {
    for (let i = 0; i < hooks.length; i++)
      hooks[i].flags |= 8;
  }
}
function resolveAsyncComponentPlaceholder(anchorVnode) {
  if (anchorVnode.placeholder) {
    return anchorVnode.placeholder;
  }
  const instance = anchorVnode.component;
  if (instance) {
    return resolveAsyncComponentPlaceholder(instance.subTree);
  }
  return null;
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$1(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
const Fragment = /* @__PURE__ */ Symbol.for("v-fgt");
const Text = /* @__PURE__ */ Symbol.for("v-txt");
const Comment = /* @__PURE__ */ Symbol.for("v-cmt");
const Static = /* @__PURE__ */ Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value, inVOnce = false) {
  isBlockTreeEnabled += value;
  if (value < 0 && currentBlock && inVOnce) {
    currentBlock.hasOnce = true;
  }
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref: ref3,
  ref_key,
  ref_for
}) => {
  if (typeof ref3 === "number") {
    ref3 = "" + ref3;
  }
  return ref3 != null ? isString(ref3) || /* @__PURE__ */ isRef(ref3) || isFunction(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag = -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (/* @__PURE__ */ isProxy(style) && !isArray$1(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props) return null;
  return /* @__PURE__ */ isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
  const { props, ref: ref3, patchFlag, children, transition } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref3 ? isArray$1(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref3,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetStart: vnode.targetStart,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    placeholder: vnode.placeholder,
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  if (transition && cloneTransition) {
    setTransitionHooks(
      cloned,
      transition.clone(cloned)
    );
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$1(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (isVNode(child)) {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$1(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !isInternalObject(children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    ids: parent ? parent.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key])) setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1) setters.forEach((set) => set(v));
      else setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v) => currentInstance = v
  );
  setInSSRSetupState = registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v) => isInSSRComponentSetup = v
  );
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false, optimized = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children, optimized || isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  const { setup } = Component;
  if (setup) {
    pauseTracking();
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        instance.props,
        setupContext
      ]
    );
    const isAsyncSetup = isPromise(setupResult);
    resetTracking();
    reset();
    if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
      markAsyncBoundary(instance);
    }
    if (isAsyncSetup) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult);
    }
  } else {
    finishComponentSetup(instance);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else ;
  finishComponentSetup(instance);
}
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    instance.render = Component.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
}
const attrsProxyHandlers = {
  get(target, key) {
    track(target, "get", "");
    return target[key];
  }
};
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  {
    return {
      attrs: new Proxy(instance.attrs, attrsProxyHandlers),
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getComponentPublicInstance(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  } else {
    return instance.proxy;
  }
}
const classifyRE = /(?:^|[-_])\w/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components) || instance.parent && inferFromRegistry(
      instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  const c = /* @__PURE__ */ computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  return c;
};
function h(type, propsOrChildren, children) {
  try {
    setBlockTracking(-1);
    const l = arguments.length;
    if (l === 2) {
      if (isObject(propsOrChildren) && !isArray$1(propsOrChildren)) {
        if (isVNode(propsOrChildren)) {
          return createVNode(type, null, [propsOrChildren]);
        }
        return createVNode(type, propsOrChildren);
      } else {
        return createVNode(type, null, propsOrChildren);
      }
    } else {
      if (l > 3) {
        children = Array.prototype.slice.call(arguments, 2);
      } else if (l === 3 && isVNode(children)) {
        children = [children];
      }
      return createVNode(type, propsOrChildren, children);
    }
  } finally {
    setBlockTracking(1);
  }
}
const version = "3.5.29";
let policy = void 0;
const tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) {
  try {
    policy = /* @__PURE__ */ tt.createPolicy("vue", {
      createHTML: (val) => val
    });
  } catch (e) {
  }
}
const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
const svgNS = "http://www.w3.org/2000/svg";
const mathmlNS = "http://www.w3.org/1998/Math/MathML";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling)) break;
      }
    } else {
      templateContainer.innerHTML = unsafeToTrustedHTML(
        namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
      );
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
const TRANSITION = "transition";
const ANIMATION = "animation";
const vtcKey = /* @__PURE__ */ Symbol("_vtc");
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
const TransitionPropsValidators = /* @__PURE__ */ extend(
  {},
  BaseTransitionPropsValidators,
  DOMTransitionPropsValidators
);
const decorate$1 = (t) => {
  t.displayName = "Transition";
  t.props = TransitionPropsValidators;
  return t;
};
const Transition = /* @__PURE__ */ decorate$1(
  (props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots)
);
const callHook = (hook, args = []) => {
  if (isArray$1(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray$1(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const {
    name = "v",
    type,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`
  } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;
  const finishEnter = (el, isAppear, done, isCancelled) => {
    el._enterCancelled = isCancelled;
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve2 = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      if (!el._enterCancelled) {
        forceReflow(el);
        addTransitionClass(el, leaveActiveClass);
      } else {
        addTransitionClass(el, leaveActiveClass);
        forceReflow(el);
      }
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false, void 0, true);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true, void 0, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  return res;
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const _vtc = el[vtcKey];
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el[vtcKey] = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout != null) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(?:transform|all)(?:,|$)/.test(
    getStyleProperties(`${TRANSITION}Property`).toString()
  );
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  if (s === "auto") return 0;
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow(el) {
  const targetDocument = el ? el.ownerDocument : document;
  return targetDocument.body.offsetHeight;
}
function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
const vShowOriginalDisplay = /* @__PURE__ */ Symbol("_vod");
const vShowHidden = /* @__PURE__ */ Symbol("_vsh");
const vShow = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(el, { value }, { transition }) {
    el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue) return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el[vShowOriginalDisplay] : "none";
  el[vShowHidden] = !value;
}
const CSS_VAR_TEXT = /* @__PURE__ */ Symbol("");
const displayRE = /(?:^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) {
      style.display = "none";
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$1(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null) val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(
        key,
        isBoolean ? "" : isSymbol(value) ? String(value) : value
      );
    }
  }
}
function patchDOMProp(el, key, value, parentComponent, attrName) {
  if (key === "innerHTML" || key === "textContent") {
    if (value != null) {
      el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
    }
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      el.type === "checkbox" ? "on" : ""
    ) : String(value);
    if (oldValue !== newValue || !("_value" in el)) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    el._value = value;
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
  needRemove && el.removeAttribute(attrName || key);
}
function addEventListener(el, event2, handler, options) {
  el.addEventListener(event2, handler, options);
}
function removeEventListener(el, event2, handler, options) {
  el.removeEventListener(event2, handler, options);
}
const veiKey = /* @__PURE__ */ Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(
        nextValue,
        instance
      );
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event2 = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event2, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray$1(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map(
      (fn) => (e2) => !e2._stopped && fn && fn(e2)
    );
  } else {
    return value;
  }
}
const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue);
    if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
      patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
    }
  } else if (
    // #11081 force set props for possible async custom element
    el._isVueCE && (/[A-Z]/.test(key) || !isString(nextValue))
  ) {
    patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") {
    return false;
  }
  if (key === "sandbox" && el.tagName === "IFRAME") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && isString(value)) {
    return false;
  }
  return key in el;
}
const getModelAssigner = (vnode) => {
  const fn = vnode.props["onUpdate:modelValue"] || false;
  return isArray$1(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  const target = e.target;
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
const assignKey = /* @__PURE__ */ Symbol("_assign");
function castValue(value, trim, number) {
  if (trim) value = value.trim();
  if (number) value = looseToNumber(value);
  return value;
}
const vModelText = {
  created(el, { modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    const castToNumber = number || vnode.props && vnode.props.type === "number";
    addEventListener(el, lazy ? "change" : "input", (e) => {
      if (e.target.composing) return;
      el[assignKey](castValue(el.value, trim, castToNumber));
    });
    if (trim || castToNumber) {
      addEventListener(el, "change", () => {
        el.value = castValue(el.value, trim, castToNumber);
      });
    }
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    if (el.composing) return;
    const elValue = (number || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value;
    const newValue = value == null ? "" : value;
    if (elValue === newValue) {
      return;
    }
    if (document.activeElement === el && el.type !== "range") {
      if (lazy && value === oldValue) {
        return;
      }
      if (trim && el.value.trim() === newValue) {
        return;
      }
    }
    el.value = newValue;
  }
};
const vModelSelect = {
  // <select multiple> value need to be deep traversed
  deep: true,
  created(el, { value, modifiers: { number } }, vnode) {
    const isSetModel = isSet(value);
    addEventListener(el, "change", () => {
      const selectedVal = Array.prototype.filter.call(el.options, (o) => o.selected).map(
        (o) => number ? looseToNumber(getValue(o)) : getValue(o)
      );
      el[assignKey](
        el.multiple ? isSetModel ? new Set(selectedVal) : selectedVal : selectedVal[0]
      );
      el._assigning = true;
      nextTick(() => {
        el._assigning = false;
      });
    });
    el[assignKey] = getModelAssigner(vnode);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(el, { value }) {
    setSelected(el, value);
  },
  beforeUpdate(el, _binding, vnode) {
    el[assignKey] = getModelAssigner(vnode);
  },
  updated(el, { value }) {
    if (!el._assigning) {
      setSelected(el, value);
    }
  }
};
function setSelected(el, value) {
  const isMultiple = el.multiple;
  const isArrayValue = isArray$1(value);
  if (isMultiple && !isArrayValue && !isSet(value)) {
    return;
  }
  for (let i = 0, l = el.options.length; i < l; i++) {
    const option = el.options[i];
    const optionValue = getValue(option);
    if (isMultiple) {
      if (isArrayValue) {
        const optionType = typeof optionValue;
        if (optionType === "string" || optionType === "number") {
          option.selected = value.some((v) => String(v) === String(optionValue));
        } else {
          option.selected = looseIndexOf(value, optionValue) > -1;
        }
      } else {
        option.selected = value.has(optionValue);
      }
    } else if (looseEqual(getValue(option), value)) {
      if (el.selectedIndex !== i) el.selectedIndex = i;
      return;
    }
  }
  if (!isMultiple && el.selectedIndex !== -1) {
    el.selectedIndex = -1;
  }
}
function getValue(el) {
  return "_value" in el ? el._value : el.value;
}
const systemModifiers = ["ctrl", "shift", "alt", "meta"];
const modifierGuards = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
const withModifiers = (fn, modifiers) => {
  if (!fn) return fn;
  const cache = fn._withMods || (fn._withMods = {});
  const cacheKey = modifiers.join(".");
  return cache[cacheKey] || (cache[cacheKey] = ((event2, ...args) => {
    for (let i = 0; i < modifiers.length; i++) {
      const guard = modifierGuards[modifiers[i]];
      if (guard && guard(event2, modifiers)) return;
    }
    return fn(event2, ...args);
  }));
};
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = ((...args) => {
  const app2 = ensureRenderer().createApp(...args);
  const { mount } = app2;
  app2.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const component = app2._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    if (container.nodeType === 1) {
      container.textContent = "";
    }
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app2;
});
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
}
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
const piniaSymbol = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => /* @__PURE__ */ ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia2 = markRaw({
    install(app2) {
      pinia2._a = app2;
      app2.provide(piniaSymbol, pinia2);
      app2.config.globalProperties.$pinia = pinia2;
      toBeInstalled.forEach((plugin) => _p.push(plugin));
      toBeInstalled = [];
    },
    use(plugin) {
      if (!this._a) {
        toBeInstalled.push(plugin);
      } else {
        _p.push(plugin);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia2;
}
const isBrowser = typeof document !== "undefined";
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module" || obj.default && isRouteComponent(obj.default);
}
const assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop = () => {
};
const isArray = Array.isArray;
function mergeOptions(defaults, partialOptions) {
  const options = {};
  for (const key in defaults) options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  return options;
}
let ErrorTypes = /* @__PURE__ */ (function(ErrorTypes2) {
  ErrorTypes2[ErrorTypes2["MATCHER_NOT_FOUND"] = 1] = "MATCHER_NOT_FOUND";
  ErrorTypes2[ErrorTypes2["NAVIGATION_GUARD_REDIRECT"] = 2] = "NAVIGATION_GUARD_REDIRECT";
  ErrorTypes2[ErrorTypes2["NAVIGATION_ABORTED"] = 4] = "NAVIGATION_ABORTED";
  ErrorTypes2[ErrorTypes2["NAVIGATION_CANCELLED"] = 8] = "NAVIGATION_CANCELLED";
  ErrorTypes2[ErrorTypes2["NAVIGATION_DUPLICATED"] = 16] = "NAVIGATION_DUPLICATED";
  return ErrorTypes2;
})({});
const NavigationFailureSymbol = /* @__PURE__ */ Symbol("");
({
  [ErrorTypes.MATCHER_NOT_FOUND]({ location: location2, currentLocation }) {
    return `No match for
 ${JSON.stringify(location2)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
  },
  [ErrorTypes.NAVIGATION_GUARD_REDIRECT]({ from, to }) {
    return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
  },
  [ErrorTypes.NAVIGATION_ABORTED]({ from, to }) {
    return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
  },
  [ErrorTypes.NAVIGATION_CANCELLED]({ from, to }) {
    return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
  },
  [ErrorTypes.NAVIGATION_DUPLICATED]({ from, to }) {
    return `Avoided redundant navigation to current location: "${from.fullPath}".`;
  }
});
function createRouterError(type, params) {
  return assign(/* @__PURE__ */ new Error(), {
    type,
    [NavigationFailureSymbol]: true
  }, params);
}
function isNavigationFailure(error, type) {
  return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
const propertiesToLog = [
  "params",
  "query",
  "hash"
];
function stringifyRoute(to) {
  if (typeof to === "string") return to;
  if (to.path != null) return to.path;
  const location2 = {};
  for (const key of propertiesToLog) if (key in to) location2[key] = to[key];
  return JSON.stringify(location2, null, 2);
}
const matchedRouteKey = /* @__PURE__ */ Symbol("");
const viewDepthKey = /* @__PURE__ */ Symbol("");
const routerKey = /* @__PURE__ */ Symbol("");
const routeLocationKey = /* @__PURE__ */ Symbol("");
const routerViewLocationKey = /* @__PURE__ */ Symbol("");
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return text == null ? "" : encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
  if (text == null) return null;
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
  }
  return "" + text;
}
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const hashPos = location2.indexOf("#");
  let searchPos = location2.indexOf("?");
  searchPos = hashPos >= 0 && searchPos > hashPos ? -1 : searchPos;
  if (searchPos >= 0) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos, hashPos > 0 ? hashPos : location2.length);
    query = parseQuery2(searchString.slice(1));
  }
  if (hashPos >= 0) {
    path = path || location2.slice(0, hashPos);
    hash = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + searchString + hash,
    path,
    query,
    hash: decode(hash)
  };
}
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function stripBase(pathname, base) {
  if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase())) return pathname;
  return pathname.slice(base.length) || "/";
}
function isSameRouteLocation(stringifyQuery2, a, b) {
  const aLastIndex = a.matched.length - 1;
  const bLastIndex = b.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery2(a.query) === stringifyQuery2(b.query) && a.hash === b.hash;
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  for (var key in a) if (!isSameRouteLocationParamsValue(a[key], b[key])) return false;
  return true;
}
function isSameRouteLocationParamsValue(a, b) {
  return isArray(a) ? isEquivalentArray(a, b) : isArray(b) ? isEquivalentArray(b, a) : (a && a.valueOf()) === (b && b.valueOf());
}
function isEquivalentArray(a, b) {
  return isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/")) return to;
  if (!to) return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  const lastToSegment = toSegments[toSegments.length - 1];
  if (lastToSegment === ".." || lastToSegment === ".") toSegments.push("");
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".") continue;
    if (segment === "..") {
      if (position > 1) position--;
    } else break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition).join("/");
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
let NavigationType = /* @__PURE__ */ (function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
  return NavigationType2;
})({});
let NavigationDirection = /* @__PURE__ */ (function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
  return NavigationDirection2;
})({});
function normalizeBase(base) {
  if (!base) if (isBrowser) {
    const baseEl = document.querySelector("base");
    base = baseEl && baseEl.getAttribute("href") || "/";
    base = base.replace(/^\w+:\/\/[^\/]+/, "");
  } else base = "/";
  if (base[0] !== "/" && base[0] !== "#") base = "/" + base;
  return removeTrailingSlash(base);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location2) {
  return base.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset.behavior,
    left: elRect.left - docRect.left - (offset.left || 0),
    top: elRect.top - docRect.top - (offset.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else scrollToOptions = position;
  if ("scrollBehavior" in document.documentElement.style) window.scrollTo(scrollToOptions);
  else window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.scrollX, scrollToOptions.top != null ? scrollToOptions.top : window.scrollY);
}
function getScrollKey(path, delta) {
  return (history.state ? history.state.position - delta : -1) + path;
}
const scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?") return query;
  const searchParams = (search[0] === "?" ? search.slice(1) : search).split("&");
  for (let i = 0; i < searchParams.length; ++i) {
    const searchParam = searchParams[i].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray(currentValue)) currentValue = query[key] = [currentValue];
      currentValue.push(value);
    } else query[key] = value;
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) search += (search.length ? "&" : "") + key;
      continue;
    }
    (isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)]).forEach((value2) => {
      if (value2 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value2 != null) search += "=" + value2;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) normalizedQuery[key] = isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
  }
  return normalizedQuery;
}
function useCallbacks() {
  let handlers = [];
  function add(handler) {
    handlers.push(handler);
    return () => {
      const i = handlers.indexOf(handler);
      if (i > -1) handlers.splice(i, 1);
    };
  }
  function reset() {
    handlers = [];
  }
  return {
    add,
    list: () => handlers.slice(),
    reset
  };
}
function guardToPromiseFn(guard, to, from, record, name, runWithContext = (fn) => fn()) {
  const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve2, reject) => {
    const next = (valid) => {
      if (valid === false) reject(createRouterError(ErrorTypes.NAVIGATION_ABORTED, {
        from,
        to
      }));
      else if (valid instanceof Error) reject(valid);
      else if (isRouteLocation(valid)) reject(createRouterError(ErrorTypes.NAVIGATION_GUARD_REDIRECT, {
        from: to,
        to: valid
      }));
      else {
        if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") enterCallbackArray.push(valid);
        resolve2();
      }
    };
    const guardReturn = runWithContext(() => guard.call(record && record.instances[name], to, from, next));
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3) guardCall = guardCall.then(next);
    guardCall.catch((err) => reject(err));
  });
}
function extractComponentsGuards(matched, guardType, to, from, runWithContext = (fn) => fn()) {
  const guards = [];
  for (const record of matched) {
    for (const name in record.components) {
      let rawComponent = record.components[name];
      if (guardType !== "beforeRouteEnter" && !record.instances[name]) continue;
      if (isRouteComponent(rawComponent)) {
        const guard = (rawComponent.__vccOpts || rawComponent)[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name, runWithContext));
      } else {
        let componentPromise = rawComponent();
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved) throw new Error(`Couldn't resolve component "${name}" at "${record.path}"`);
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.mods[name] = resolved;
          record.components[name] = resolvedComponent;
          const guard = (resolvedComponent.__vccOpts || resolvedComponent)[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name, runWithContext)();
        }));
      }
    }
  }
  return guards;
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i = 0; i < len; i++) {
    const recordFrom = from.matched[i];
    if (recordFrom) if (to.matched.find((record) => isSameRouteRecord(record, recordFrom))) updatingRecords.push(recordFrom);
    else leavingRecords.push(recordFrom);
    const recordTo = to.matched[i];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) enteringRecords.push(recordTo);
    }
  }
  return [
    leavingRecords,
    updatingRecords,
    enteringRecords
  ];
}
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation(base, location2) {
  const { pathname, search, hash } = location2;
  const hashPos = base.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/") pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  return stripBase(pathname, base) + search + hash;
}
function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else replace(to);
    listeners.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index = listeners.indexOf(callback);
      if (index > -1) listeners.splice(index, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    if (document.visibilityState === "hidden") {
      const { history: history2 } = window;
      if (!history2.state) return;
      history2.replaceState(assign({}, history2.state, { scroll: computeScrollPosition() }), "");
    }
  }
  function destroy() {
    for (const teardown of teardowns) teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("pagehide", beforeUnloadListener);
    document.removeEventListener("visibilitychange", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("pagehide", beforeUnloadListener);
  document.addEventListener("visibilitychange", beforeUnloadListener);
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base) {
  const { history: history2, location: location2 } = window;
  const currentLocation = { value: createCurrentLocation(base, location2) };
  const historyState = { value: history2.state };
  if (!historyState.value) changeLocation(currentLocation.value, {
    back: null,
    current: currentLocation.value,
    forward: null,
    position: history2.length - 1,
    replaced: true,
    scroll: null
  }, true);
  function changeLocation(to, state, replace2) {
    const hashIndex = base.indexOf("#");
    const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
    try {
      history2[replace2 ? "replaceState" : "pushState"](state, "", url);
      historyState.value = state;
    } catch (err) {
      console.error(err);
      location2[replace2 ? "replace" : "assign"](url);
    }
  }
  function replace(to, data) {
    changeLocation(to, assign({}, history2.state, buildState(historyState.value.back, to, historyState.value.forward, true), data, { position: historyState.value.position }), true);
    currentLocation.value = to;
  }
  function push(to, data) {
    const currentState = assign({}, historyState.value, history2.state, {
      forward: to,
      scroll: computeScrollPosition()
    });
    changeLocation(currentState.current, currentState, true);
    changeLocation(to, assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data), false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
function createWebHistory(base) {
  base = normalizeBase(base);
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners) historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign({
    location: "",
    base,
    go,
    createHref: createHref.bind(null, base)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
function createWebHashHistory(base) {
  base = location.host ? base || location.pathname + location.search : "";
  if (!base.includes("#")) base += "#";
  return createWebHistory(base);
}
let TokenType = /* @__PURE__ */ (function(TokenType2) {
  TokenType2[TokenType2["Static"] = 0] = "Static";
  TokenType2[TokenType2["Param"] = 1] = "Param";
  TokenType2[TokenType2["Group"] = 2] = "Group";
  return TokenType2;
})({});
var TokenizerState = /* @__PURE__ */ (function(TokenizerState2) {
  TokenizerState2[TokenizerState2["Static"] = 0] = "Static";
  TokenizerState2[TokenizerState2["Param"] = 1] = "Param";
  TokenizerState2[TokenizerState2["ParamRegExp"] = 2] = "ParamRegExp";
  TokenizerState2[TokenizerState2["ParamRegExpEnd"] = 3] = "ParamRegExpEnd";
  TokenizerState2[TokenizerState2["EscapeNext"] = 4] = "EscapeNext";
  return TokenizerState2;
})(TokenizerState || {});
const ROOT_TOKEN = {
  type: TokenType.Static,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path) return [[]];
  if (path === "/") return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) throw new Error(`Invalid path "${path}"`);
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer}": ${message}`);
  }
  let state = TokenizerState.Static;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment) tokens.push(segment);
    segment = [];
  }
  let i = 0;
  let char;
  let buffer = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer) return;
    if (state === TokenizerState.Static) segment.push({
      type: TokenType.Static,
      value: buffer
    });
    else if (state === TokenizerState.Param || state === TokenizerState.ParamRegExp || state === TokenizerState.ParamRegExpEnd) {
      if (segment.length > 1 && (char === "*" || char === "+")) crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: TokenType.Param,
        value: buffer,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else crash("Invalid state to consume buffer");
    buffer = "";
  }
  function addCharToBuffer() {
    buffer += char;
  }
  while (i < path.length) {
    char = path[i++];
    if (char === "\\" && state !== TokenizerState.ParamRegExp) {
      previousState = state;
      state = TokenizerState.EscapeNext;
      continue;
    }
    switch (state) {
      case TokenizerState.Static:
        if (char === "/") {
          if (buffer) consumeBuffer();
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = TokenizerState.Param;
        } else addCharToBuffer();
        break;
      case TokenizerState.EscapeNext:
        addCharToBuffer();
        state = previousState;
        break;
      case TokenizerState.Param:
        if (char === "(") state = TokenizerState.ParamRegExp;
        else if (VALID_PARAM_RE.test(char)) addCharToBuffer();
        else {
          consumeBuffer();
          state = TokenizerState.Static;
          if (char !== "*" && char !== "?" && char !== "+") i--;
        }
        break;
      case TokenizerState.ParamRegExp:
        if (char === ")") if (customRe[customRe.length - 1] == "\\") customRe = customRe.slice(0, -1) + char;
        else state = TokenizerState.ParamRegExpEnd;
        else customRe += char;
        break;
      case TokenizerState.ParamRegExpEnd:
        consumeBuffer();
        state = TokenizerState.Static;
        if (char !== "*" && char !== "?" && char !== "+") i--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === TokenizerState.ParamRegExp) crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
var PathScore = /* @__PURE__ */ (function(PathScore2) {
  PathScore2[PathScore2["_multiplier"] = 10] = "_multiplier";
  PathScore2[PathScore2["Root"] = 90] = "Root";
  PathScore2[PathScore2["Segment"] = 40] = "Segment";
  PathScore2[PathScore2["SubSegment"] = 30] = "SubSegment";
  PathScore2[PathScore2["Static"] = 40] = "Static";
  PathScore2[PathScore2["Dynamic"] = 20] = "Dynamic";
  PathScore2[PathScore2["BonusCustomRegExp"] = 10] = "BonusCustomRegExp";
  PathScore2[PathScore2["BonusWildcard"] = -50] = "BonusWildcard";
  PathScore2[PathScore2["BonusRepeatable"] = -20] = "BonusRepeatable";
  PathScore2[PathScore2["BonusOptional"] = -8] = "BonusOptional";
  PathScore2[PathScore2["BonusStrict"] = 0.7000000000000001] = "BonusStrict";
  PathScore2[PathScore2["BonusCaseSensitive"] = 0.25] = "BonusCaseSensitive";
  return PathScore2;
})(PathScore || {});
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [PathScore.Root];
    if (options.strict && !segment.length) pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = PathScore.Segment + (options.sensitive ? PathScore.BonusCaseSensitive : 0);
      if (token.type === TokenType.Static) {
        if (!tokenIndex) pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += PathScore.Static;
      } else if (token.type === TokenType.Param) {
        const { value, repeatable, optional, regexp } = token;
        keys.push({
          name: value,
          repeatable,
          optional
        });
        const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re2 !== BASE_PARAM_PATTERN) {
          subSegmentScore += PathScore.BonusCustomRegExp;
          try {
            new RegExp(`(${re2})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
        if (!tokenIndex) subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional) subPattern += "?";
        pattern += subPattern;
        subSegmentScore += PathScore.Dynamic;
        if (optional) subSegmentScore += PathScore.BonusOptional;
        if (repeatable) subSegmentScore += PathScore.BonusRepeatable;
        if (re2 === ".*") subSegmentScore += PathScore.BonusWildcard;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i = score.length - 1;
    score[i][score[i].length - 1] += PathScore.BonusStrict;
  }
  if (!options.strict) pattern += "/?";
  if (options.end) pattern += "$";
  else if (options.strict && !pattern.endsWith("/")) pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse(path) {
    const match = path.match(re);
    const params = {};
    if (!match) return null;
    for (let i = 1; i < match.length; i++) {
      const value = match[i] || "";
      const key = keys[i - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/")) path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) if (token.type === TokenType.Static) path += token.value;
      else if (token.type === TokenType.Param) {
        const { value, repeatable, optional } = token;
        const param = value in params ? params[value] : "";
        if (isArray(param) && !repeatable) throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
        const text = isArray(param) ? param.join("/") : param;
        if (!text) if (optional) {
          if (segment.length < 2) if (path.endsWith("/")) path = path.slice(0, -1);
          else avoidDuplicatedSlash = true;
        } else throw new Error(`Missing required param "${value}"`);
        path += text;
      }
    }
    return path || "/";
  }
  return {
    re,
    score,
    keys,
    parse,
    stringify
  };
}
function compareScoreArray(a, b) {
  let i = 0;
  while (i < a.length && i < b.length) {
    const diff = b[i] - a[i];
    if (diff) return diff;
    i++;
  }
  if (a.length < b.length) return a.length === 1 && a[0] === PathScore.Static + PathScore.Segment ? -1 : 1;
  else if (a.length > b.length) return b.length === 1 && b[0] === PathScore.Static + PathScore.Segment ? 1 : -1;
  return 0;
}
function comparePathParserScore(a, b) {
  let i = 0;
  const aScore = a.score;
  const bScore = b.score;
  while (i < aScore.length && i < bScore.length) {
    const comp = compareScoreArray(aScore[i], bScore[i]);
    if (comp) return comp;
    i++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore)) return 1;
    if (isLastScoreNegative(bScore)) return -1;
  }
  return bScore.length - aScore.length;
}
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
const PATH_PARSER_OPTIONS_DEFAULTS = {
  strict: false,
  end: true,
  sensitive: false
};
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  const matcher = assign(parser, {
    record,
    parent,
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf) parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes2, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions(PATH_PARSER_OPTIONS_DEFAULTS, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [mainNormalizedRecord];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) normalizedRecords.push(normalizeRouteRecord(assign({}, mainNormalizedRecord, {
        components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
        path: alias,
        aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
      })));
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher) originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher)) {
          removeRoute(record.name);
        }
      }
      if (isMatchable(matcher)) insertMatcher(matcher);
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i = 0; i < children.length; i++) addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
      }
      originalRecord = originalRecord || matcher;
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index = matchers.indexOf(matcherRef);
      if (index > -1) {
        matchers.splice(index, 1);
        if (matcherRef.record.name) matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    const index = findInsertionIndex(matcher, matchers);
    matchers.splice(index, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher)) matcherMap.set(matcher.record.name, matcher);
  }
  function resolve2(location2, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher) throw createRouterError(ErrorTypes.MATCHER_NOT_FOUND, { location: location2 });
      name = matcher.record.name;
      params = assign(pickParams(currentLocation.params, matcher.keys.filter((k) => !k.optional).concat(matcher.parent ? matcher.parent.keys.filter((k) => k.optional) : []).map((k) => k.name)), location2.params && pickParams(location2.params, matcher.keys.map((k) => k.name)));
      path = matcher.stringify(params);
    } else if (location2.path != null) {
      path = location2.path;
      matcher = matchers.find((m) => m.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
      if (!matcher) throw createRouterError(ErrorTypes.MATCHER_NOT_FOUND, {
        location: location2,
        currentLocation
      });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location2.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes2.forEach((route) => addRoute(route));
  function clearRoutes() {
    matchers.length = 0;
    matcherMap.clear();
  }
  return {
    addRoute,
    resolve: resolve2,
    removeRoute,
    clearRoutes,
    getRoutes,
    getRecordMatcher
  };
}
function pickParams(params, keys) {
  const newParams = {};
  for (const key of keys) if (key in params) newParams[key] = params[key];
  return newParams;
}
function normalizeRouteRecord(record) {
  const normalized = {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: record.aliasOf,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
  Object.defineProperty(normalized, "mods", { value: {} });
  return normalized;
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) propsObject.default = props;
  else for (const name in record.components) propsObject[name] = typeof props === "object" ? props[name] : props;
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf) return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function findInsertionIndex(matcher, matchers) {
  let lower = 0;
  let upper = matchers.length;
  while (lower !== upper) {
    const mid = lower + upper >> 1;
    if (comparePathParserScore(matcher, matchers[mid]) < 0) upper = mid;
    else lower = mid + 1;
  }
  const insertionAncestor = getInsertionAncestor(matcher);
  if (insertionAncestor) {
    upper = matchers.lastIndexOf(insertionAncestor, upper - 1);
  }
  return upper;
}
function getInsertionAncestor(matcher) {
  let ancestor = matcher;
  while (ancestor = ancestor.parent) if (isMatchable(ancestor) && comparePathParserScore(matcher, ancestor) === 0) return ancestor;
}
function isMatchable({ record }) {
  return !!(record.name || record.components && Object.keys(record.components).length || record.redirect);
}
function useLink(props) {
  const router2 = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  const route = computed(() => {
    const to = unref(props.to);
    return router2.resolve(to);
  });
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length) return -1;
    const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1) return index;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e = {}) {
    if (guardEvent(e)) {
      const p2 = router2[unref(props.replace) ? "replace" : "push"](unref(props.to)).catch(noop);
      if (props.viewTransition && typeof document !== "undefined" && "startViewTransition" in document) document.startViewTransition(() => p2);
      return p2;
    }
    return Promise.resolve();
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
function preferSingleVNode(vnodes) {
  return vnodes.length === 1 ? vnodes[0] : vnodes;
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink,
  setup(props, { slots }) {
    const link = /* @__PURE__ */ reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && preferSingleVNode(slots.default(link));
      return props.custom ? children : h("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
  if (e.defaultPrevented) return;
  if (e.button !== void 0 && e.button !== 0) return;
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target)) return;
  }
  if (e.preventDefault) e.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue) return false;
    } else if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value.valueOf() !== outerValue[i].valueOf())) return false;
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: { MODE: 3 },
  setup(props, { attrs, slots }) {
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const injectedDepth = inject(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) initialDepth++;
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = /* @__PURE__ */ ref();
    watch(() => [
      viewRef.value,
      matchedRouteRef.value,
      props.name
    ], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) to.leaveGuards = from.leaveGuards;
          if (!to.updateGuards.size) to.updateGuards = from.updateGuards;
        }
      }
      if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) return normalizeSlot(slots.default, {
        Component: ViewComponent,
        route
      });
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) matchedRoute.instances[currentName] = null;
      };
      const component = h(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      return normalizeSlot(slots.default, {
        Component: component,
        route
      }) || component;
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot) return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = /* @__PURE__ */ shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) history.scrollRestoration = "manual";
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = applyToParams.bind(null, decode);
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route;
    } else record = parentOrRoute;
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) matcher.removeRoute(recordMatcher);
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve2(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href2 = routerHistory.createHref(locationNormalized.fullPath);
      return assign(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href2
      });
    }
    let matcherLocation;
    if (rawLocation.path != null) {
      matcherLocation = assign({}, rawLocation, { path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path });
    } else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) if (targetParams[key] == null) delete targetParams[key];
      matcherLocation = assign({}, rawLocation, { params: encodeParams(targetParams) });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    return assign({
      fullPath,
      hash,
      query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) return createRouterError(ErrorTypes.NAVIGATION_CANCELLED, {
      from,
      to
    });
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to, from) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to, from) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
        newTargetLocation.params = {};
      }
      return assign({
        query: to.query,
        hash: to.hash,
        params: newTargetLocation.path != null ? {} : to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve2(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace2 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation, from);
    if (shouldRedirect) return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
      state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
      force,
      replace: replace2
    }), redirectedFrom || targetLocation);
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(ErrorTypes.NAVIGATION_DUPLICATED, {
        to: toLocation,
        from
      });
      handleScroll(from, from, true, false);
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? isNavigationFailure(error, ErrorTypes.NAVIGATION_GUARD_REDIRECT) ? error : markAsReady(error) : triggerError(error, toLocation, from)).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(failure2, ErrorTypes.NAVIGATION_GUARD_REDIRECT)) {
          return pushWithRedirect(assign({ replace: replace2 }, locationAsObject(failure2.to), {
            state: typeof failure2.to === "object" ? assign({}, data, failure2.to.state) : data,
            force
          }), redirectedFrom || toLocation);
        }
      } else failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
      triggerAfterEach(toLocation, from, failure2);
      return failure2;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function runWithContext(fn) {
    const app2 = installedApps.values().next().value;
    return app2 && typeof app2.runWithContext === "function" ? app2.runWithContext(fn) : fn();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) record.leaveGuards.forEach((guard) => {
      guards.push(guardToPromiseFn(guard, to, from));
    });
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) record.updateGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of enteringRecords) if (record.beforeEnter) if (isArray(record.beforeEnter)) for (const beforeEnter of record.beforeEnter) guards.push(guardToPromiseFn(beforeEnter, to, from));
      else guards.push(guardToPromiseFn(record.beforeEnter, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from, runWithContext);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(err, ErrorTypes.NAVIGATION_CANCELLED) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    afterGuards.list().forEach((guard) => runWithContext(() => guard(to, from, failure)));
  }
  function finalizeNavigation(toLocation, from, isPush, replace2, data) {
    const error = checkCanceledNavigation(toLocation, from);
    if (error) return error;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) if (replace2 || isFirstNavigation) routerHistory.replace(toLocation.fullPath, assign({ scroll: isFirstNavigation && state && state.scroll }, data));
    else routerHistory.push(toLocation.fullPath, data);
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener) return;
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      if (!router2.listening) return;
      const toLocation = resolve2(to);
      const shouldRedirect = handleRedirectRecord(toLocation, router2.currentRoute.value);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, {
          replace: true,
          force: true
        }), toLocation).catch(noop);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      navigate(toLocation, from).catch((error) => {
        if (isNavigationFailure(error, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_CANCELLED)) return error;
        if (isNavigationFailure(error, ErrorTypes.NAVIGATION_GUARD_REDIRECT)) {
          pushWithRedirect(assign(locationAsObject(error.to), { force: true }), toLocation).then((failure) => {
            if (isNavigationFailure(failure, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_DUPLICATED) && !info.delta && info.type === NavigationType.pop) routerHistory.go(-1, false);
          }).catch(noop);
          return Promise.reject();
        }
        if (info.delta) routerHistory.go(-info.delta, false);
        return triggerError(error, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(toLocation, from, false);
        if (failure) {
          if (info.delta && !isNavigationFailure(failure, ErrorTypes.NAVIGATION_CANCELLED)) routerHistory.go(-info.delta, false);
          else if (info.type === NavigationType.pop && isNavigationFailure(failure, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_DUPLICATED)) routerHistory.go(-1, false);
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop);
    });
  }
  let readyHandlers = useCallbacks();
  let errorListeners = useCallbacks();
  let ready;
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorListeners.list();
    if (list.length) list.forEach((handler) => handler(error, to, from));
    else {
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED) return Promise.resolve();
    return new Promise((resolve22, reject) => {
      readyHandlers.add([resolve22, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve22, reject]) => err ? reject(err) : resolve22());
      readyHandlers.reset();
    }
    return err;
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior) return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router2 = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    clearRoutes: matcher.clearRoutes,
    hasRoute,
    getRoutes,
    resolve: resolve2,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorListeners.add,
    isReady,
    install(app2) {
      app2.component("RouterLink", RouterLink);
      app2.component("RouterView", RouterView);
      app2.config.globalProperties.$router = router2;
      Object.defineProperty(app2.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) Object.defineProperty(reactiveRoute, key, {
        get: () => currentRoute.value[key],
        enumerable: true
      });
      app2.provide(routerKey, router2);
      app2.provide(routeLocationKey, /* @__PURE__ */ shallowReactive(reactiveRoute));
      app2.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app2.unmount;
      installedApps.add(app2);
      app2.unmount = function() {
        installedApps.delete(app2);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
    }
  };
  function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
  }
  return router2;
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$p = {
  name: "TypewriterText",
  props: {
    text: {
      type: String,
      required: true
    },
    speed: {
      type: Number,
      default: 150
    },
    startDelay: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      fullText: "",
      currentIndex: 0,
      isTyping: true
    };
  },
  mounted() {
    this.fullText = this.text;
    setTimeout(() => {
      this.typeWriter();
    }, this.startDelay);
  },
  methods: {
    typeWriter() {
      if (this.currentIndex <= this.fullText.length) {
        this.currentIndex++;
        const randomSpeed = this.speed + Math.random() * 100 - 50;
        setTimeout(() => {
          this.typeWriter();
        }, randomSpeed);
      } else {
        this.isTyping = false;
      }
    }
  },
  watch: {
    text(newText) {
      this.fullText = newText;
      this.currentIndex = 0;
      this.isTyping = true;
      setTimeout(() => {
        this.typeWriter();
      }, this.startDelay);
    }
  }
};
const _hoisted_1$p = { class: "typewriter" };
const _hoisted_2$o = { class: "text-wrapper" };
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", _hoisted_1$p, [
    createBaseVNode("span", _hoisted_2$o, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.fullText, (char, index) => {
        return openBlock(), createElementBlock("span", {
          key: index,
          class: normalizeClass(["char", {
            "visible": index < $data.currentIndex,
            "cursor": index === $data.currentIndex && $data.isTyping
          }])
        }, toDisplayString(char), 3);
      }), 128))
    ])
  ]);
}
const TypewriterText = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$e], ["__scopeId", "data-v-a1e3153d"]]);
const _sfc_main$o = {
  name: "BackgroundTags",
  data() {
    return {
      rows: 4,
      tags: [
        "AI",
        "Delta Force",
        "VALORANT",
        "Arena Breakout",
        "Ave Mujica",
        "MyGO!!!!!",
        "けいおん！",
        "OpenClaw",
        "Trae",
        "GLM",
        "Qwen3.5-Plus",
        "DeepSeek",
        "ニセコイ"
      ]
    };
  },
  computed: {
    extendedTags() {
      return [...this.tags, ...this.tags];
    }
  }
};
const _hoisted_1$o = { class: "background-tags" };
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$o, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($data.rows, (row, rowIndex) => {
      return openBlock(), createElementBlock("div", {
        key: rowIndex,
        class: "tag-row",
        style: normalizeStyle({
          top: `${rowIndex * 25}%`,
          animationDelay: `${rowIndex * -15}s`,
          animationDirection: rowIndex % 2 === 0 ? "normal" : "reverse"
        })
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.extendedTags, (tag, index) => {
          return openBlock(), createElementBlock("span", {
            key: `${rowIndex}-${index}`,
            class: "floating-tag"
          }, toDisplayString(tag), 1);
        }), 128))
      ], 4);
    }), 128))
  ]);
}
const BackgroundTags = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$d], ["__scopeId", "data-v-1a074f2f"]]);
const _imports_0 = "/avatar.jpg";
const _sfc_main$n = {
  name: "Home",
  components: {
    TypewriterText,
    BackgroundTags
  },
  data() {
    return {
      subtitleText: "正在学习前沿 AI，探索技术与创意的交汇点",
      mouseX: 0,
      mouseY: 0,
      particles: [],
      containerRef: null,
      // 游戏对话框
      showDialog: false,
      loading: false,
      progress: 0,
      gameUrl: "/games/chENZE-game/index.html",
      featuredProjects: [
        {
          id: 1,
          title: "云端 OpenClaw 部署",
          description: "在云端服务器部署 OpenClaw AI 代理框架，实现 24/7 在线服务",
          image: "/images/ai-robot.jpg",
          category: "AI",
          link: "/openclaw-deploy?from=home"
        },
        {
          id: 2,
          title: "个人网站搭建",
          description: "从零开始搭建深色科技风个人网站，Vue 3 + Tailwind CSS",
          image: "/images/cyberpunk-city.jpg",
          category: "Web",
          link: "/website-build?from=home"
        }
      ],
      skills: [
        "Vue.js",
        "React",
        "TypeScript",
        "Node.js",
        "Python",
        "AI/LLM",
        "Figma",
        "Tailwind CSS",
        "Vercel",
        "Git"
      ],
      stats: [
        { label: "项目经验", value: 50, suffix: "+" },
        { label: "代码行数", value: 100, suffix: "K+" },
        { label: "杯咖啡", value: 999, suffix: "+" },
        { label: "AI 对话", value: 10, suffix: "K+" }
      ],
      animatedStats: [0, 0, 0, 0],
      statsVisible: false,
      // 终端动态效果
      terminalLines: [false, false, false, false, false],
      currentCommand: "",
      fullCommand: 'echo "Welcome to my world! 🚀"'
    };
  },
  computed: {
    cursorGlowStyle() {
      return {
        left: `${this.mouseX}px`,
        top: `${this.mouseY}px`
      };
    },
    dynamicGridStyle() {
      const offsetX = (this.mouseX / window.innerWidth - 0.5) * 20;
      const offsetY = (this.mouseY / window.innerHeight - 0.5) * 20;
      return {
        transform: `translate(${offsetX}px, ${offsetY}px)`
      };
    }
  },
  mounted() {
    this.initParticles();
    this.$nextTick(() => {
      setTimeout(() => {
        this.initScrollObserver();
        this.initTerminalObserver();
      }, 100);
    });
    this.animatedStats = this.stats.map(() => 0);
  },
  beforeUnmount() {
    if (this.terminalTimer) clearInterval(this.terminalTimer);
  },
  methods: {
    // 游戏对话框方法
    showGameDialog() {
      this.showDialog = true;
      this.loading = false;
      this.progress = 0;
    },
    closeDialog() {
      this.showDialog = false;
    },
    openDirect() {
      window.open(this.gameUrl, "_blank");
      this.closeDialog();
    },
    preloadAndOpen() {
      return __async(this, null, function* () {
        this.loading = true;
        this.progress = 0;
        try {
          const resources = [
            "/games/chENZE-game/assets/index-6863a3b8.js",
            "/games/chENZE-game/assets/index-59bffd35.css",
            "/games/chENZE-game/assets/index.es-c7c86e4e.js",
            "/games/chENZE-game/assets/conentsCash-75763c1a.js"
          ];
          const loadedResources = [];
          const total = resources.length;
          for (let i = 0; i < resources.length; i++) {
            try {
              yield this.loadResource(resources[i]);
              loadedResources.push(resources[i]);
              this.progress = Math.round((i + 1) / total * 100);
            } catch (e) {
              console.warn(`Failed to preload: ${resources[i]}`, e);
            }
          }
          window.open(this.gameUrl, "_blank");
          this.closeDialog();
        } catch (e) {
          console.error("Preload error:", e);
          window.open(this.gameUrl, "_blank");
          this.closeDialog();
        }
      });
    },
    loadResource(url) {
      return __async(this, null, function* () {
        return new Promise((resolve2, reject) => {
          const ext = url.split(".").pop();
          if (ext === "js") {
            const script = document.createElement("script");
            script.src = url;
            script.onload = resolve2;
            script.onerror = reject;
            document.head.appendChild(script);
          } else if (ext === "css") {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = url;
            link.onload = resolve2;
            link.onerror = reject;
            document.head.appendChild(link);
          } else {
            fetch(url, { mode: "no-cors" }).then(() => resolve2()).catch(reject);
          }
        });
      });
    },
    handleMouseMove(e) {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    },
    initParticles() {
      const colors = ["#667eea", "#764ba2", "#f093fb", "#4facfe", "#00f2fe", "#a78bfa"];
      const particleCount = 60;
      for (let i = 0; i < particleCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * -20;
        this.particles.push({
          id: i,
          style: {
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            boxShadow: `0 0 ${size * 3}px ${color}`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`
          }
        });
      }
    },
    initScrollObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.statsVisible) {
            this.statsVisible = true;
            this.animateStats();
          }
        });
      }, { threshold: 0.3 });
      const statsSection = document.querySelector(".stats-section");
      if (statsSection) {
        observer.observe(statsSection);
      }
    },
    initTerminalObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.startTerminalAnimation();
            observer.disconnect();
          }
        });
      }, { threshold: 0.5 });
      const terminalSection = this.$refs.terminalSection;
      if (terminalSection) {
        observer.observe(terminalSection);
      }
    },
    startTerminalAnimation() {
      const delays = [0, 300, 800, 1100, 1800];
      delays.forEach((delay, index) => {
        setTimeout(() => {
          this.terminalLines[index] = true;
          if (index === 4) {
            this.startTypingEffect();
          }
        }, delay);
      });
    },
    startTypingEffect() {
      let charIndex = 0;
      this.terminalTimer = setInterval(() => {
        if (charIndex < this.fullCommand.length) {
          this.currentCommand += this.fullCommand[charIndex];
          charIndex++;
        } else {
          clearInterval(this.terminalTimer);
          setTimeout(() => {
            this.currentCommand = "";
            this.startTypingEffect();
          }, 3e3);
        }
      }, 80);
    },
    animateStats() {
      const duration = 2e3;
      const steps = 60;
      const interval = duration / steps;
      this.stats.forEach((stat, index) => {
        let step = 0;
        const timer = setInterval(() => {
          step++;
          const progress = step / steps;
          const easeOut = 1 - Math.pow(1 - progress, 3);
          this.animatedStats[index] = Math.floor(stat.value * easeOut);
          if (step >= steps) {
            clearInterval(timer);
            this.animatedStats[index] = stat.value;
          }
        }, interval);
      });
    },
    handleCardTilt(e, cardId) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    },
    resetCardTilt(e) {
      const card = e.currentTarget;
      card.style.transform = "";
    },
    getSkillIcon(skill) {
      const icons = {
        "Vue.js": "⚡",
        "React": "⚛️",
        "TypeScript": "📘",
        "Node.js": "🟢",
        "Python": "🐍",
        "AI/LLM": "🤖",
        "Figma": "🎨",
        "Tailwind CSS": "💨",
        "Vercel": "▲",
        "Git": "📦"
      };
      return icons[skill] || "💡";
    }
  }
};
const _hoisted_1$n = { class: "particles-container" };
const _hoisted_2$n = { class: "bg-decoration" };
const _hoisted_3$m = { class: "hero-section" };
const _hoisted_4$m = { class: "max-w-5xl mx-auto px-6 py-20" };
const _hoisted_5$l = { class: "title-section" };
const _hoisted_6$k = { class: "hero-title" };
const _hoisted_7$j = { class: "hero-subtitle" };
const _hoisted_8$j = { class: "cta-buttons" };
const _hoisted_9$i = { class: "dialog-buttons" };
const _hoisted_10$i = { key: 0 };
const _hoisted_11$h = { key: 1 };
const _hoisted_12$f = {
  key: 0,
  class: "progress-bar"
};
const _hoisted_13$c = {
  key: 1,
  class: "progress-text"
};
const _hoisted_14$c = { class: "projects-section" };
const _hoisted_15$c = { class: "max-w-5xl mx-auto px-6" };
const _hoisted_16$c = { class: "projects-grid" };
const _hoisted_17$c = ["onClick"];
const _hoisted_18$b = { class: "card-image" };
const _hoisted_19$a = ["src", "alt"];
const _hoisted_20$9 = { class: "card-content" };
const _hoisted_21$8 = { class: "card-category" };
const _hoisted_22$8 = { class: "card-title" };
const _hoisted_23$8 = { class: "card-desc" };
const _hoisted_24$8 = { class: "section-footer" };
const _hoisted_25$8 = { class: "skills-section" };
const _hoisted_26$8 = { class: "max-w-5xl mx-auto px-6" };
const _hoisted_27$7 = { class: "skills-grid" };
const _hoisted_28$7 = { class: "skill-icon" };
const _hoisted_29$7 = { class: "stats-section" };
const _hoisted_30$7 = { class: "max-w-5xl mx-auto px-6" };
const _hoisted_31$7 = { class: "stats-grid" };
const _hoisted_32$7 = { class: "stat-value" };
const _hoisted_33$7 = { class: "stat-number" };
const _hoisted_34$7 = { class: "stat-suffix" };
const _hoisted_35$7 = { class: "stat-label" };
const _hoisted_36$6 = { class: "stat-bar" };
const _hoisted_37$6 = {
  class: "terminal-section",
  ref: "terminalSection"
};
const _hoisted_38$6 = { class: "max-w-5xl mx-auto px-6" };
const _hoisted_39$6 = { class: "terminal-window" };
const _hoisted_40$6 = { class: "terminal-body" };
const _hoisted_41$6 = { class: "command" };
const _hoisted_42$5 = { class: "cta-section" };
const _hoisted_43$5 = { class: "cta-card" };
const _hoisted_44$5 = { class: "cta-content" };
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_BackgroundTags = resolveComponent("BackgroundTags");
  const _component_TypewriterText = resolveComponent("TypewriterText");
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("div", {
    class: "home-container",
    ref: "containerRef",
    onMousemove: _cache[7] || (_cache[7] = (...args) => $options.handleMouseMove && $options.handleMouseMove(...args))
  }, [
    _cache[34] || (_cache[34] = createBaseVNode("div", { class: "scanlines" }, null, -1)),
    createBaseVNode("div", _hoisted_1$n, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.particles, (particle) => {
        return openBlock(), createElementBlock("div", {
          key: particle.id,
          class: "particle",
          style: normalizeStyle(particle.style)
        }, null, 4);
      }), 128))
    ]),
    createBaseVNode("div", {
      class: "cursor-glow",
      style: normalizeStyle($options.cursorGlowStyle)
    }, null, 4),
    createBaseVNode("div", _hoisted_2$n, [
      _cache[8] || (_cache[8] = createBaseVNode("div", { class: "glow-orb orb-1" }, null, -1)),
      _cache[9] || (_cache[9] = createBaseVNode("div", { class: "glow-orb orb-2" }, null, -1)),
      _cache[10] || (_cache[10] = createBaseVNode("div", { class: "glow-orb orb-3" }, null, -1)),
      _cache[11] || (_cache[11] = createBaseVNode("div", { class: "grid-overlay" }, null, -1)),
      createBaseVNode("div", {
        class: "dynamic-grid",
        style: normalizeStyle($options.dynamicGridStyle)
      }, null, 4)
    ]),
    createVNode(_component_BackgroundTags),
    createBaseVNode("section", _hoisted_3$m, [
      createBaseVNode("div", _hoisted_4$m, [
        _cache[18] || (_cache[18] = createStaticVNode('<div class="avatar-wrapper" data-v-ab63eeb4><div class="avatar-ring" data-v-ab63eeb4></div><div class="avatar-glow" data-v-ab63eeb4></div><img src="' + _imports_0 + '" alt="Avatar" class="avatar-img" data-v-ab63eeb4><div class="status-dot" data-v-ab63eeb4></div></div>', 1)),
        createBaseVNode("div", _hoisted_5$l, [
          createBaseVNode("h1", _hoisted_6$k, [
            createVNode(_component_TypewriterText, {
              text: "Hello, I'm 栗子",
              speed: 150,
              startDelay: 300
            })
          ]),
          createBaseVNode("p", _hoisted_7$j, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($data.subtitleText, (char, index) => {
              return openBlock(), createElementBlock("span", {
                key: index,
                style: normalizeStyle({ animationDelay: `${2 + index * 0.05}s` }),
                class: "char-animate"
              }, toDisplayString(char), 5);
            }), 128))
          ])
        ]),
        createBaseVNode("div", _hoisted_8$j, [
          createVNode(_component_router_link, {
            to: "/templates",
            class: "btn btn-primary"
          }, {
            default: withCtx(() => [..._cache[12] || (_cache[12] = [
              createBaseVNode("span", null, "浏览模板", -1),
              createBaseVNode("svg", {
                class: "btn-icon",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createBaseVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M17 8l4 4m0 0l-4 4m4-4H3"
                })
              ], -1)
            ])]),
            _: 1
          }),
          createVNode(_component_router_link, {
            to: "/about",
            class: "btn btn-secondary"
          }, {
            default: withCtx(() => [..._cache[13] || (_cache[13] = [
              createBaseVNode("span", null, "关于我", -1)
            ])]),
            _: 1
          }),
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = (...args) => $options.showGameDialog && $options.showGameDialog(...args)),
            class: "btn btn-game"
          }, [..._cache[14] || (_cache[14] = [
            createBaseVNode("svg", {
              class: "btn-icon-sm",
              fill: "currentColor",
              viewBox: "0 0 24 24"
            }, [
              createBaseVNode("path", { d: "M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0-2-.9-2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" })
            ], -1),
            createBaseVNode("span", null, "开始游戏", -1)
          ])]),
          _cache[15] || (_cache[15] = createBaseVNode("a", {
            href: "https://v.douyin.com/di64-2AO-WM/",
            target: "_blank",
            class: "btn btn-glass"
          }, [
            createBaseVNode("svg", {
              class: "btn-icon-sm",
              fill: "currentColor",
              viewBox: "0 0 24 24"
            }, [
              createBaseVNode("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" })
            ]),
            createBaseVNode("span", null, "抖音")
          ], -1))
        ]),
        $data.showDialog ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dialog-overlay",
          onClick: _cache[4] || (_cache[4] = (...args) => $options.closeDialog && $options.closeDialog(...args))
        }, [
          createBaseVNode("div", {
            class: "dialog-content",
            onClick: _cache[3] || (_cache[3] = withModifiers(() => {
            }, ["stop"]))
          }, [
            _cache[16] || (_cache[16] = createBaseVNode("h3", { class: "dialog-title" }, "🎮 游戏加载提示", -1)),
            _cache[17] || (_cache[17] = createBaseVNode("p", { class: "dialog-text" }, [
              createTextVNode(" 游戏资源较大（约 380MB），首次加载可能需要一些时间。"),
              createBaseVNode("br"),
              createTextVNode(" 是否现在预加载游戏资源？ ")
            ], -1)),
            createBaseVNode("div", _hoisted_9$i, [
              createBaseVNode("button", {
                onClick: _cache[1] || (_cache[1] = (...args) => $options.preloadAndOpen && $options.preloadAndOpen(...args)),
                class: "dialog-btn primary"
              }, [
                !$data.loading ? (openBlock(), createElementBlock("span", _hoisted_10$i, "是，预加载并打开")) : (openBlock(), createElementBlock("span", _hoisted_11$h, "加载中... " + toDisplayString($data.progress) + "%", 1))
              ]),
              createBaseVNode("button", {
                onClick: _cache[2] || (_cache[2] = (...args) => $options.openDirect && $options.openDirect(...args)),
                class: "dialog-btn secondary"
              }, "否，直接打开")
            ]),
            $data.loading ? (openBlock(), createElementBlock("div", _hoisted_12$f, [
              createBaseVNode("div", {
                class: "progress-fill",
                style: normalizeStyle({ width: $data.progress + "%" })
              }, null, 4)
            ])) : createCommentVNode("", true),
            $data.loading ? (openBlock(), createElementBlock("p", _hoisted_13$c, "正在预加载资源，请稍候...")) : createCommentVNode("", true)
          ])
        ])) : createCommentVNode("", true),
        _cache[19] || (_cache[19] = createBaseVNode("div", { class: "scroll-indicator" }, [
          createBaseVNode("div", { class: "mouse" }, [
            createBaseVNode("div", { class: "wheel" })
          ]),
          createBaseVNode("span", null, "向下滚动")
        ], -1))
      ])
    ]),
    createBaseVNode("section", _hoisted_14$c, [
      createBaseVNode("div", _hoisted_15$c, [
        _cache[23] || (_cache[23] = createBaseVNode("div", { class: "section-header" }, [
          createBaseVNode("span", { class: "section-tag" }, "Portfolio"),
          createBaseVNode("h2", { class: "section-title" }, "精选项目"),
          createBaseVNode("p", { class: "section-desc" }, "探索我的最新作品")
        ], -1)),
        createBaseVNode("div", _hoisted_16$c, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($data.featuredProjects, (project) => {
            return openBlock(), createElementBlock("div", {
              key: project.id,
              class: "project-card group",
              onMousemove: _cache[5] || (_cache[5] = (...args) => $options.handleCardTilt && $options.handleCardTilt(...args)),
              onMouseleave: _cache[6] || (_cache[6] = (...args) => $options.resetCardTilt && $options.resetCardTilt(...args)),
              onClick: ($event) => _ctx.$router.push(project.link)
            }, [
              _cache[21] || (_cache[21] = createBaseVNode("div", { class: "card-shine" }, null, -1)),
              createBaseVNode("div", _hoisted_18$b, [
                createBaseVNode("img", {
                  src: project.image,
                  alt: project.title
                }, null, 8, _hoisted_19$a),
                _cache[20] || (_cache[20] = createBaseVNode("div", { class: "card-overlay" }, [
                  createBaseVNode("span", { class: "view-btn" }, "查看详情")
                ], -1))
              ]),
              createBaseVNode("div", _hoisted_20$9, [
                createBaseVNode("span", _hoisted_21$8, toDisplayString(project.category), 1),
                createBaseVNode("h3", _hoisted_22$8, toDisplayString(project.title), 1),
                createBaseVNode("p", _hoisted_23$8, toDisplayString(project.description), 1)
              ])
            ], 40, _hoisted_17$c);
          }), 128))
        ]),
        createBaseVNode("div", _hoisted_24$8, [
          createVNode(_component_router_link, {
            to: "/projects",
            class: "link-more"
          }, {
            default: withCtx(() => [..._cache[22] || (_cache[22] = [
              createTextVNode(" 查看全部项目 ", -1),
              createBaseVNode("svg", {
                class: "link-icon",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createBaseVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M17 8l4 4m0 0l-4 4m4-4H3"
                })
              ], -1)
            ])]),
            _: 1
          })
        ])
      ])
    ]),
    createBaseVNode("section", _hoisted_25$8, [
      createBaseVNode("div", _hoisted_26$8, [
        _cache[24] || (_cache[24] = createBaseVNode("div", { class: "section-header" }, [
          createBaseVNode("span", { class: "section-tag" }, "Tech Stack"),
          createBaseVNode("h2", {
            class: "section-title glitch-text",
            "data-text": "技能栈"
          }, "技能栈"),
          createBaseVNode("p", { class: "section-desc" }, "我熟悉的技术与工具")
        ], -1)),
        createBaseVNode("div", _hoisted_27$7, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($data.skills, (skill, index) => {
            return openBlock(), createElementBlock("div", {
              key: skill,
              class: "skill-tag",
              style: normalizeStyle({ animationDelay: `${index * 0.05}s` })
            }, [
              createBaseVNode("span", _hoisted_28$7, toDisplayString($options.getSkillIcon(skill)), 1),
              createTextVNode(" " + toDisplayString(skill), 1)
            ], 4);
          }), 128))
        ])
      ])
    ]),
    createBaseVNode("section", _hoisted_29$7, [
      createBaseVNode("div", _hoisted_30$7, [
        createBaseVNode("div", _hoisted_31$7, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($data.stats, (stat, index) => {
            return openBlock(), createElementBlock("div", {
              key: stat.label,
              class: "stat-card"
            }, [
              createBaseVNode("div", _hoisted_32$7, [
                createBaseVNode("span", _hoisted_33$7, toDisplayString($data.animatedStats[index]), 1),
                createBaseVNode("span", _hoisted_34$7, toDisplayString(stat.suffix), 1)
              ]),
              createBaseVNode("div", _hoisted_35$7, toDisplayString(stat.label), 1),
              createBaseVNode("div", _hoisted_36$6, [
                createBaseVNode("div", {
                  class: "stat-bar-fill",
                  style: normalizeStyle({ width: `${$data.animatedStats[index] / stat.value * 100}%` })
                }, null, 4)
              ])
            ]);
          }), 128))
        ])
      ])
    ]),
    createBaseVNode("section", _hoisted_37$6, [
      createBaseVNode("div", _hoisted_38$6, [
        createBaseVNode("div", _hoisted_39$6, [
          _cache[30] || (_cache[30] = createStaticVNode('<div class="terminal-header" data-v-ab63eeb4><div class="terminal-dots" data-v-ab63eeb4><span class="dot red" data-v-ab63eeb4></span><span class="dot yellow" data-v-ab63eeb4></span><span class="dot green" data-v-ab63eeb4></span></div><span class="terminal-title" data-v-ab63eeb4>zsh ~ 栗子的终端</span></div>', 1)),
          createBaseVNode("div", _hoisted_40$6, [
            createBaseVNode("div", {
              class: normalizeClass(["terminal-line", { "visible": $data.terminalLines[0] }])
            }, [..._cache[25] || (_cache[25] = [
              createBaseVNode("span", { class: "prompt" }, "$", -1),
              createBaseVNode("span", { class: "command" }, "whoami", -1)
            ])], 2),
            createBaseVNode("div", {
              class: normalizeClass(["terminal-output", { "visible": $data.terminalLines[1] }])
            }, [..._cache[26] || (_cache[26] = [
              createBaseVNode("span", { class: "output-highlight" }, "栗子", -1),
              createTextVNode(" - 前端开发者 & AI 探索者 ", -1)
            ])], 2),
            createBaseVNode("div", {
              class: normalizeClass(["terminal-line", { "visible": $data.terminalLines[2] }])
            }, [..._cache[27] || (_cache[27] = [
              createBaseVNode("span", { class: "prompt" }, "$", -1),
              createBaseVNode("span", { class: "command" }, "cat skills.txt", -1)
            ])], 2),
            createBaseVNode("div", {
              class: normalizeClass(["terminal-output skills-output", { "visible": $data.terminalLines[3] }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList($data.skills, (skill, i) => {
                return openBlock(), createElementBlock("span", {
                  key: skill,
                  class: "skill-chip",
                  style: normalizeStyle({ animationDelay: `${i * 0.1}s` })
                }, toDisplayString(skill), 5);
              }), 128))
            ], 2),
            createBaseVNode("div", {
              class: normalizeClass(["terminal-line", { "visible": $data.terminalLines[4] }])
            }, [
              _cache[28] || (_cache[28] = createBaseVNode("span", { class: "prompt" }, "$", -1)),
              createBaseVNode("span", _hoisted_41$6, toDisplayString($data.currentCommand), 1),
              _cache[29] || (_cache[29] = createBaseVNode("span", { class: "cursor-blink" }, "▊", -1))
            ], 2)
          ])
        ])
      ])
    ], 512),
    createBaseVNode("section", _hoisted_42$5, [
      createBaseVNode("div", _hoisted_43$5, [
        createBaseVNode("div", _hoisted_44$5, [
          _cache[32] || (_cache[32] = createBaseVNode("h2", { class: "cta-title" }, "有想法？让我们一起实现", -1)),
          _cache[33] || (_cache[33] = createBaseVNode("p", { class: "cta-desc" }, "从想法到落地，栗子工作室陪你走完全程", -1)),
          createVNode(_component_router_link, {
            to: "/contact-info",
            class: "btn btn-primary btn-lg"
          }, {
            default: withCtx(() => [..._cache[31] || (_cache[31] = [
              createTextVNode(" 开始合作 ", -1),
              createBaseVNode("svg", {
                class: "btn-icon",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createBaseVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M17 8l4 4m0 0l-4 4m4-4H3"
                })
              ], -1)
            ])]),
            _: 1
          })
        ])
      ])
    ])
  ], 544);
}
const Home = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$c], ["__scopeId", "data-v-ab63eeb4"]]);
const _sfc_main$m = {
  name: "About",
  data() {
    return {
      timeline: [
        {
          period: "2026 - Present",
          role: "栗子工作室创始人",
          company: "独立工作室",
          description: "专注于 AI 驱动的创意落地，提供从想法到产品的完整旅程。不出售软件，出售打动人心的作品。",
          current: true
        },
        {
          period: "2025",
          role: "AI 应用开发者",
          company: "自由职业",
          description: "深入探索 AI Agent 开发，部署云端 OpenClaw 框架，为客户提供 AI 解决方案定制服务。"
        },
        {
          period: "2024",
          role: "AI 技术学习者",
          company: "自学研究",
          description: "开始系统学习 AI 代理技术与 Prompt Engineering，探索 LLM 在实际场景中的应用可能。"
        },
        {
          period: "2023",
          role: "AI 探索起步",
          company: "兴趣驱动",
          description: "初次接触 AI 技术，被其无限可能所吸引，开始了 AI 学习之旅的第一步。"
        }
      ],
      skillsCategories: [
        {
          name: "AI 技术",
          skills: ["OpenClaw", "AI Agent", "Prompt Engineering", "LLM 应用", "Claude API"],
          gradient: "from-purple-500 to-pink-500",
          icon: "svg"
        },
        {
          name: "开发工具",
          skills: ["Vue.js", "Node.js", "Git", "VS Code", "Vite"],
          gradient: "from-blue-500 to-cyan-500",
          icon: "svg"
        },
        {
          name: "部署运维",
          skills: ["云端部署", "Docker", "Linux", "Vercel", "GitHub Actions"],
          gradient: "from-green-500 to-emerald-500",
          icon: "svg"
        }
      ]
    };
  }
};
const _hoisted_1$m = { class: "about-page" };
const _hoisted_2$m = { class: "max-w-5xl mx-auto px-6 py-20 relative z-10" };
const _hoisted_3$l = { class: "mb-12" };
const _hoisted_4$l = { class: "timeline-container" };
const _hoisted_5$k = { class: "timeline-content glass-card p-6" };
const _hoisted_6$j = { class: "flex items-start justify-between mb-3" };
const _hoisted_7$i = { class: "text-sm font-medium text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full" };
const _hoisted_8$i = {
  key: 0,
  class: "text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full"
};
const _hoisted_9$h = { class: "text-xl font-bold text-white mb-1" };
const _hoisted_10$h = { class: "text-purple-300 text-sm mb-3" };
const _hoisted_11$g = { class: "text-gray-400 text-sm leading-relaxed" };
const _hoisted_12$e = { class: "mb-12" };
const _hoisted_13$b = { class: "grid md:grid-cols-3 gap-6" };
const _hoisted_14$b = { class: "flex items-center gap-3 mb-4" };
const _hoisted_15$b = { class: "font-semibold text-white" };
const _hoisted_16$b = { class: "flex flex-wrap gap-2" };
const _hoisted_17$b = { class: "glass-card p-8 md:p-10" };
const _hoisted_18$a = { class: "flex flex-wrap gap-4" };
const _hoisted_19$9 = { class: "text-center mt-12 pb-8" };
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("div", _hoisted_1$m, [
    _cache[9] || (_cache[9] = createBaseVNode("div", { class: "bg-decoration" }, [
      createBaseVNode("div", { class: "glow-orb orb-1" }),
      createBaseVNode("div", { class: "glow-orb orb-2" }),
      createBaseVNode("div", { class: "grid-overlay" })
    ], -1)),
    createBaseVNode("div", _hoisted_2$m, [
      _cache[7] || (_cache[7] = createStaticVNode('<div class="hero-section text-center mb-20" data-v-8f7b9695><div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8" data-v-8f7b9695><span class="w-2 h-2 rounded-full bg-purple-400 animate-pulse" data-v-8f7b9695></span><span class="text-sm text-gray-400" data-v-8f7b9695>About Me</span></div><div class="avatar-container mb-8" data-v-8f7b9695><div class="avatar-ring" data-v-8f7b9695><img src="' + _imports_0 + '" alt="栗子" class="avatar-img" loading="eager" data-v-8f7b9695></div><div class="avatar-glow" data-v-8f7b9695></div></div><h1 class="text-5xl md:text-6xl font-bold mb-4" data-v-8f7b9695><span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400" data-v-8f7b9695>栗子</span></h1><p class="text-xl text-gray-400 mb-6" data-v-8f7b9695>AI 技术探索者 · 栗子工作室创始人</p><div class="flex items-center justify-center gap-2 text-gray-500" data-v-8f7b9695><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8f7b9695><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-v-8f7b9695></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-8f7b9695></path></svg><span data-v-8f7b9695>山东，中国</span></div></div><div class="glass-card p-8 md:p-10 mb-12" data-v-8f7b9695><h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-8f7b9695><span class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center" data-v-8f7b9695><svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8f7b9695><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-8f7b9695></path></svg></span> 我的故事 </h2><div class="story-content space-y-5" data-v-8f7b9695><p class="text-gray-300 leading-relaxed text-lg" data-v-8f7b9695> 你好！我是栗子，一名 AI 技术探索者，也是 <span class="text-purple-400 font-medium" data-v-8f7b9695>栗子工作室</span> 的创始人。 </p><p class="text-gray-300 leading-relaxed text-lg" data-v-8f7b9695> 站在 2026 年的今天，AI 已经深深融入了软件开发的每一个环节。我专注于学习与实践前沿 AI 技术，致力于将 AI 能力与创意落地相结合。 </p><p class="text-gray-300 leading-relaxed text-lg" data-v-8f7b9695> 栗子工作室不出售冷冰冰的软件——我们出售的是一段 <span class="text-pink-400 font-medium" data-v-8f7b9695>从想法到落地的完整旅程</span>。从一个模糊的想法，到清晰的需求定义；从概念设计，到精心打磨的交互细节；从功能实现，到持续迭代优化。 </p><p class="text-gray-300 leading-relaxed text-lg" data-v-8f7b9695> AI 是我们的工具，但真正引导一切的，是对 <span class="text-blue-400 font-medium" data-v-8f7b9695>「打动人心」</span> 这个目标的坚持。 </p></div></div>', 2)),
      createBaseVNode("div", _hoisted_3$l, [
        _cache[1] || (_cache[1] = createBaseVNode("h2", { class: "text-2xl font-bold text-white mb-8 flex items-center gap-3" }, [
          createBaseVNode("span", { class: "w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center" }, [
            createBaseVNode("svg", {
              class: "w-4 h-4 text-white",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24"
            }, [
              createBaseVNode("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              })
            ])
          ]),
          createTextVNode(" 成长历程 ")
        ], -1)),
        createBaseVNode("div", _hoisted_4$l, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($data.timeline, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "timeline-item",
              style: normalizeStyle({ animationDelay: `${index * 0.15}s` })
            }, [
              _cache[0] || (_cache[0] = createBaseVNode("div", { class: "timeline-marker" }, [
                createBaseVNode("div", { class: "marker-dot" }),
                createBaseVNode("div", { class: "marker-line" })
              ], -1)),
              createBaseVNode("div", _hoisted_5$k, [
                createBaseVNode("div", _hoisted_6$j, [
                  createBaseVNode("span", _hoisted_7$i, toDisplayString(item.period), 1),
                  item.current ? (openBlock(), createElementBlock("span", _hoisted_8$i, "Current")) : createCommentVNode("", true)
                ]),
                createBaseVNode("h3", _hoisted_9$h, toDisplayString(item.role), 1),
                createBaseVNode("p", _hoisted_10$h, toDisplayString(item.company), 1),
                createBaseVNode("p", _hoisted_11$g, toDisplayString(item.description), 1)
              ])
            ], 4);
          }), 128))
        ])
      ]),
      createBaseVNode("div", _hoisted_12$e, [
        _cache[2] || (_cache[2] = createBaseVNode("h2", { class: "text-2xl font-bold text-white mb-8 flex items-center gap-3" }, [
          createBaseVNode("span", { class: "w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center" }, [
            createBaseVNode("svg", {
              class: "w-4 h-4 text-white",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24"
            }, [
              createBaseVNode("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              })
            ])
          ]),
          createTextVNode(" 技术栈 ")
        ], -1)),
        createBaseVNode("div", _hoisted_13$b, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($data.skillsCategories, (category, catIndex) => {
            return openBlock(), createElementBlock("div", {
              key: catIndex,
              class: "glass-card p-6 group hover:border-purple-500/50 transition-all duration-300"
            }, [
              createBaseVNode("div", _hoisted_14$b, [
                createBaseVNode("span", {
                  class: normalizeClass(["w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center", category.gradient])
                }, [
                  (openBlock(), createBlock(resolveDynamicComponent(category.icon), { class: "w-5 h-5 text-white" }))
                ], 2),
                createBaseVNode("h3", _hoisted_15$b, toDisplayString(category.name), 1)
              ]),
              createBaseVNode("div", _hoisted_16$b, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(category.skills, (skill) => {
                  return openBlock(), createElementBlock("span", {
                    key: skill,
                    class: "skill-tag"
                  }, toDisplayString(skill), 1);
                }), 128))
              ])
            ]);
          }), 128))
        ])
      ]),
      _cache[8] || (_cache[8] = createStaticVNode('<div class="philosophy-section glass-card p-8 md:p-10 mb-12" data-v-8f7b9695><div class="flex items-center gap-3 mb-6" data-v-8f7b9695><span class="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center" data-v-8f7b9695><svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" data-v-8f7b9695><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" data-v-8f7b9695></path></svg></span><h2 class="text-2xl font-bold text-white" data-v-8f7b9695>核心理念</h2></div><blockquote class="text-xl text-gray-300 italic leading-relaxed pl-6 border-l-4 border-purple-500" data-v-8f7b9695> &quot;门槛的降低，从来都不意味着价值的贬损。在人人都能做的时代，做得足够好已经不够了——你必须做得足够独特、足够动人、足够让人记住。&quot; </blockquote><p class="text-right text-gray-500 mt-4" data-v-8f7b9695>—— 栗子，2026</p></div>', 1)),
      createBaseVNode("div", _hoisted_17$b, [
        _cache[5] || (_cache[5] = createStaticVNode('<h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-8f7b9695><span class="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center" data-v-8f7b9695><svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8f7b9695><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-8f7b9695></path></svg></span> 联系我 </h2><p class="text-gray-400 mb-6" data-v-8f7b9695>期待与你一起探索 AI 的无限可能，欢迎志同道合的朋友联系交流！</p>', 2)),
        createBaseVNode("div", _hoisted_18$a, [
          _cache[4] || (_cache[4] = createStaticVNode('<a href="tencent://message/?uin=3471023785" class="contact-btn bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-blue-500/30" data-v-8f7b9695><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" data-v-8f7b9695><path d="M12.003 2c-1.699 0-3.26.32-4.683.903-5.867 2.407-6.066 9.397.199 11.836v2.72c0 1.279-1.081 2.33-2.367 2.33-1.285 0-2.329-1.051-2.329-2.33V16.3c0-.552-.448-1-1-1s-1 .448-1 1v1.159c0 1.852 1.501 3.359 3.352 3.359 1.851 0 3.351-1.507 3.351-3.359v-2.72c6.265-2.439 6.066-9.429.199-11.836C15.263 2.32 13.702 2 12.003 2zM9.003 20.003c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2zm6.003 0c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z" data-v-8f7b9695></path></svg><span data-v-8f7b9695>QQ: 3471023785</span></a><a href="https://v.douyin.com/di64-2AO-WM/" target="_blank" class="contact-btn bg-gradient-to-r from-gray-800 to-black hover:shadow-gray-800/30" data-v-8f7b9695><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" data-v-8f7b9695><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" data-v-8f7b9695></path></svg><span data-v-8f7b9695>抖音</span></a><a href="https://m.tb.cn/h.iXXX6S4?tk=78fdUHnev25" target="_blank" class="contact-btn bg-gradient-to-r from-yellow-600 to-amber-500 hover:shadow-yellow-500/30" data-v-8f7b9695><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" data-v-8f7b9695><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" data-v-8f7b9695></path></svg><span data-v-8f7b9695>闲鱼</span></a>', 3)),
          createVNode(_component_router_link, {
            to: "/shop",
            class: "contact-btn bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-purple-500/30"
          }, {
            default: withCtx(() => [..._cache[3] || (_cache[3] = [
              createBaseVNode("svg", {
                class: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createBaseVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                })
              ], -1),
              createBaseVNode("span", null, "栗子工作室", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      createBaseVNode("div", _hoisted_19$9, [
        createVNode(_component_router_link, {
          to: "/",
          class: "inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group"
        }, {
          default: withCtx(() => [..._cache[6] || (_cache[6] = [
            createBaseVNode("svg", {
              class: "w-5 h-5 group-hover:-translate-x-1 transition-transform",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24"
            }, [
              createBaseVNode("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M10 19l-7-7m0 0l7-7m-7 7h18"
              })
            ], -1),
            createBaseVNode("span", null, "返回首页", -1)
          ])]),
          _: 1
        })
      ])
    ])
  ]);
}
const About = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$b], ["__scopeId", "data-v-8f7b9695"]]);
const _sfc_main$l = {
  name: "Projects",
  data() {
    return {
      activeFilter: "All",
      filters: ["All", "Web", "Mobile", "Design", "AI"],
      projects: [
        {
          id: 1,
          title: "VPS 部署 OpenClaw",
          description: "阿里云学生机 9.9 元/月 + Coding Plan 7 元/月，总费用 17 元/月的 AI 代理部署方案",
          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
          tags: ["OpenClaw", "阿里云", "VPS", "学生优惠"],
          category: "AI",
          link: "/openclaw-deploy?from=projects"
        },
        {
          id: 2,
          title: "个人网站搭建全记录",
          description: "从零开始搭建深色科技风个人网站，包含 OpenClaw + 千问 3.5Plus 完整开发过程",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
          tags: ["Vue.js", "OpenClaw", "Qwen3.5", "GitHub Pages"],
          category: "Web",
          link: "/website-build?from=projects"
        },
        {
          id: 3,
          title: "山信黑红榜",
          description: "校园点评平台（仅展示，已暂停运营）",
          image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
          tags: ["Vue3", "Node.js", "Cloudflare D1", "Vercel"],
          category: "Web",
          link: "/shanxin-heihongbang?from=projects"
        }
      ]
    };
  },
  computed: {
    filteredProjects() {
      if (this.activeFilter === "All") {
        return this.projects;
      }
      return this.projects.filter((p2) => p2.category === this.activeFilter);
    }
  }
};
const _hoisted_1$l = { class: "projects-page" };
const _hoisted_2$l = { class: "max-w-5xl mx-auto px-6 py-24" };
const _hoisted_3$k = { class: "flex flex-wrap justify-center gap-3 mb-12" };
const _hoisted_4$k = ["onClick"];
const _hoisted_5$j = { class: "grid md:grid-cols-2 gap-8" };
const _hoisted_6$i = ["onClick"];
const _hoisted_7$h = { class: "bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-2xl overflow-hidden aspect-[4/3] mb-4 border border-purple-500/20 hover:border-purple-400 transition-all shadow-lg" };
const _hoisted_8$h = ["src", "alt"];
const _hoisted_9$g = { class: "flex items-center gap-2 mb-2" };
const _hoisted_10$g = { class: "text-xl font-bold text-white mb-2" };
const _hoisted_11$f = { class: "text-gray-200 text-base" };
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$l, [
    createBaseVNode("div", _hoisted_2$l, [
      _cache[1] || (_cache[1] = createBaseVNode("div", { class: "text-center mb-16" }, [
        createBaseVNode("h1", { class: "text-5xl font-bold text-white mb-6" }, "Projects"),
        createBaseVNode("p", { class: "text-xl text-gray-400" }, "A collection of my recent work")
      ], -1)),
      createBaseVNode("div", _hoisted_3$k, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.filters, (filter) => {
          return openBlock(), createElementBlock("button", {
            key: filter,
            onClick: ($event) => $data.activeFilter = filter,
            class: normalizeClass([
              "px-6 py-2 rounded-full text-sm font-medium transition-all",
              $data.activeFilter === filter ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : "bg-[#2a2a3e] text-gray-300 border border-white/10 hover:border-purple-500/50"
            ])
          }, toDisplayString(filter), 11, _hoisted_4$k);
        }), 128))
      ]),
      createBaseVNode("div", _hoisted_5$j, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.filteredProjects, (project) => {
          return openBlock(), createElementBlock("div", {
            key: project.id,
            class: "group cursor-pointer",
            onClick: ($event) => _ctx.$router.push(project.link)
          }, [
            createBaseVNode("div", _hoisted_7$h, [
              createBaseVNode("img", {
                src: project.image,
                alt: project.title,
                class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
                loading: "lazy",
                decoding: "async"
              }, null, 8, _hoisted_8$h)
            ]),
            createBaseVNode("div", _hoisted_9$g, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(project.tags, (tag) => {
                return openBlock(), createElementBlock("span", {
                  key: tag,
                  class: "text-xs text-white bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/40"
                }, toDisplayString(tag), 1);
              }), 128))
            ]),
            createBaseVNode("h3", _hoisted_10$g, toDisplayString(project.title), 1),
            createBaseVNode("p", _hoisted_11$f, toDisplayString(project.description), 1),
            _cache[0] || (_cache[0] = createBaseVNode("span", { class: "inline-flex items-center mt-4 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors" }, " View Project → ", -1))
          ], 8, _hoisted_6$i);
        }), 128))
      ])
    ])
  ]);
}
const Projects = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$a], ["__scopeId", "data-v-4144e6fc"]]);
const _sfc_main$k = {
  name: "Blog",
  data() {
    return {
      selectedPost: null,
      posts: [
        {
          id: 1,
          title: "AI时代的软件创作：门槛降低了，但价值永存",
          excerpt: "每个人都有使用AI写软件的权利，但这不代表软件变得廉价。当作品足以打动人心，那才是最重要的。栗子工作室的态度：出售的不是软件，而是从想法到落地的完整旅程。",
          category: "思考随笔",
          date: "Mar 6, 2026",
          image: "/images/ai-brain.jpg",
          content: `
            <p>站在2026年的今天，AI已经深深融入了软件开发的每一个环节。无论是代码生成、界面设计，还是架构规划，AI都在以前所未有的方式降低着创作的门槛。一个从未写过代码的人，只要能够清晰表达自己的想法，就能在AI的帮助下完成一个可用的软件原型。</p>

            <p>有人说，这会让软件变得廉价。当人人都能开发，程序员的价值何在？当AI能写出完美的代码，软件开发这个职业是否终将消失？</p>

            <p>我的答案是否定的。</p>

            <p>门槛的降低，从来都不意味着价值的贬损。就像相机的普及没有让摄影变得廉价——真正打动人心的照片，依然需要摄影师对光影的理解、对瞬间的捕捉、对情感的诠释。同理，AI让代码变得触手可及，但让作品真正"活"起来的，依然是创作者对用户需求的理解、对美的追求、对细节的执着。</p>

            <p>这也是栗子工作室的态度。</p>

            <p>我们不出售一个冷冰冰的软件或网站。我们出售的是一整个流程——从一个模糊的想法，到清晰的需求定义；从最初的概念设计，到精心打磨的交互细节；从功能实现，到部署上线，再到持续的迭代优化。在这个过程中，AI是我们的工具，但真正引导一切的，是我们对"打动人心"这个目标的坚持。</p>

            <p>当我为一个客户开发网站时，我不会问"你想要什么功能"。我会问"你希望访问者感受到什么"、"你想传达什么样的故事"。这些问题，AI暂时还无法真正理解。它可以帮助我实现想法，但想法本身，来自于对人的理解、对场景的洞察。</p>

            <p>门槛变低了，这很好。这意味着更多人有能力将自己的想法变为现实。但服务的标准，只会越来越高。因为在人人都能做的时代，做得足够好已经不够了——你必须做得足够独特、足够动人、足够让人记住。</p>

            <p>所以，未来的软件开发会是什么样？</p>

            <p>我认为，它更像是一场共创。AI负责执行层面的繁重工作，而人类专注于创意、情感、价值的传递。我们不再是"写代码的人"，我们是"用技术与AI，帮助人们实现想法的人"。</p>

            <p>每个人都有使用AI写软件的权利，这没错。但当你希望你的作品不仅仅是"能用"，而是"好用"、"好看"、"好感动"，那就是我们可以帮助你的地方。</p>

            <p>栗子工作室，出售的不是终点，而是一段从想法到落地的完整旅程。</p>

            <p class="signature">—— 栗子，2026年3月</p>
          `
        }
      ]
    };
  },
  methods: {
    openPost(post) {
      if (post.content) {
        this.selectedPost = post;
        document.body.style.overflow = "hidden";
      } else if (post.link) {
        this.$router.push(post.link);
      }
    },
    closePost() {
      this.selectedPost = null;
      document.body.style.overflow = "";
    }
  }
};
const _hoisted_1$k = { class: "blog-page" };
const _hoisted_2$k = { class: "max-w-5xl mx-auto px-6 py-20 relative z-10" };
const _hoisted_3$j = { class: "glass-card overflow-hidden" };
const _hoisted_4$j = { class: "flex flex-col lg:flex-row" };
const _hoisted_5$i = { class: "lg:w-1/2 relative overflow-hidden" };
const _hoisted_6$h = ["src", "alt"];
const _hoisted_7$g = { class: "absolute top-4 left-4" };
const _hoisted_8$g = { class: "px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30" };
const _hoisted_9$f = { class: "lg:w-1/2 p-8 flex flex-col justify-center" };
const _hoisted_10$f = { class: "flex items-center gap-3 mb-4" };
const _hoisted_11$e = { class: "text-gray-400 text-sm" };
const _hoisted_12$d = { class: "text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300" };
const _hoisted_13$a = { class: "text-gray-400 mb-6 line-clamp-3" };
const _hoisted_14$a = { class: "grid md:grid-cols-2 gap-6" };
const _hoisted_15$a = ["onClick"];
const _hoisted_16$a = { class: "glass-card h-full overflow-hidden" };
const _hoisted_17$a = { class: "relative overflow-hidden" };
const _hoisted_18$9 = ["src", "alt"];
const _hoisted_19$8 = { class: "absolute top-3 left-3" };
const _hoisted_20$8 = { class: "px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300 border border-white/10 backdrop-blur-sm" };
const _hoisted_21$7 = { class: "p-6" };
const _hoisted_22$7 = { class: "flex items-center gap-2 mb-3" };
const _hoisted_23$7 = { class: "text-gray-500 text-xs" };
const _hoisted_24$7 = { class: "text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-2" };
const _hoisted_25$7 = { class: "text-gray-400 text-sm line-clamp-2 mb-4" };
const _hoisted_26$7 = { class: "modal-content relative bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/10 shadow-2xl" };
const _hoisted_27$6 = { class: "relative h-56 overflow-hidden" };
const _hoisted_28$6 = ["src", "alt"];
const _hoisted_29$6 = { class: "absolute bottom-4 left-6" };
const _hoisted_30$6 = { class: "px-4 py-1.5 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm" };
const _hoisted_31$6 = { class: "p-8 overflow-y-auto max-h-[calc(90vh-14rem)]" };
const _hoisted_32$6 = { class: "flex items-center gap-3 mb-4" };
const _hoisted_33$6 = { class: "text-gray-400 text-sm" };
const _hoisted_34$6 = { class: "text-3xl md:text-4xl font-bold text-white mb-8 leading-tight" };
const _hoisted_35$6 = ["innerHTML"];
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$k, [
    _cache[15] || (_cache[15] = createBaseVNode("div", { class: "bg-decoration" }, [
      createBaseVNode("div", { class: "glow-orb orb-1" }),
      createBaseVNode("div", { class: "glow-orb orb-2" }),
      createBaseVNode("div", { class: "grid-overlay" })
    ], -1)),
    createBaseVNode("div", _hoisted_2$k, [
      _cache[9] || (_cache[9] = createStaticVNode('<div class="text-center mb-20" data-v-85f9eeef><div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6" data-v-85f9eeef><span class="w-2 h-2 rounded-full bg-purple-400 animate-pulse" data-v-85f9eeef></span><span class="text-sm text-gray-400" data-v-85f9eeef>Latest Posts</span></div><h1 class="text-6xl md:text-7xl font-bold mb-6" data-v-85f9eeef><span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400" data-v-85f9eeef>Blog</span></h1><p class="text-xl text-gray-400 max-w-2xl mx-auto" data-v-85f9eeef>思考、教程与洞见 — 记录技术与创意的交汇</p></div>', 1)),
      $data.posts.length ? (openBlock(), createElementBlock("article", {
        key: 0,
        class: "featured-post group cursor-pointer mb-16",
        onClick: _cache[0] || (_cache[0] = ($event) => $options.openPost($data.posts[0]))
      }, [
        createBaseVNode("div", _hoisted_3$j, [
          createBaseVNode("div", _hoisted_4$j, [
            createBaseVNode("div", _hoisted_5$i, [
              createBaseVNode("img", {
                src: $data.posts[0].image,
                alt: $data.posts[0].title,
                class: "w-full h-64 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              }, null, 8, _hoisted_6$h),
              _cache[3] || (_cache[3] = createBaseVNode("div", { class: "absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1a2e]/90 lg:block hidden" }, null, -1)),
              createBaseVNode("div", _hoisted_7$g, [
                createBaseVNode("span", _hoisted_8$g, toDisplayString($data.posts[0].category), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_9$f, [
              createBaseVNode("div", _hoisted_10$f, [
                createBaseVNode("span", _hoisted_11$e, toDisplayString($data.posts[0].date), 1),
                _cache[4] || (_cache[4] = createBaseVNode("span", { class: "text-gray-600" }, "•", -1)),
                _cache[5] || (_cache[5] = createBaseVNode("span", { class: "text-gray-400 text-sm" }, "5 min read", -1))
              ]),
              createBaseVNode("h2", _hoisted_12$d, toDisplayString($data.posts[0].title), 1),
              createBaseVNode("p", _hoisted_13$a, toDisplayString($data.posts[0].excerpt), 1),
              _cache[6] || (_cache[6] = createBaseVNode("div", { class: "flex items-center gap-2 text-purple-400 group-hover:gap-4 transition-all duration-300" }, [
                createBaseVNode("span", { class: "font-medium" }, "阅读全文"),
                createBaseVNode("svg", {
                  class: "w-5 h-5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createBaseVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M17 8l4 4m0 0l-4 4m4-4H3"
                  })
                ])
              ], -1))
            ])
          ])
        ])
      ])) : createCommentVNode("", true),
      createBaseVNode("div", _hoisted_14$a, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.posts.slice(1), (post, index) => {
          return openBlock(), createElementBlock("article", {
            key: post.id,
            class: "post-card group cursor-pointer",
            style: normalizeStyle({ animationDelay: `${index * 0.1}s` }),
            onClick: ($event) => $options.openPost(post)
          }, [
            createBaseVNode("div", _hoisted_16$a, [
              createBaseVNode("div", _hoisted_17$a, [
                createBaseVNode("img", {
                  src: post.image,
                  alt: post.title,
                  class: "w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                }, null, 8, _hoisted_18$9),
                _cache[7] || (_cache[7] = createBaseVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent opacity-60" }, null, -1)),
                createBaseVNode("div", _hoisted_19$8, [
                  createBaseVNode("span", _hoisted_20$8, toDisplayString(post.category), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_21$7, [
                createBaseVNode("div", _hoisted_22$7, [
                  createBaseVNode("span", _hoisted_23$7, toDisplayString(post.date), 1)
                ]),
                createBaseVNode("h3", _hoisted_24$7, toDisplayString(post.title), 1),
                createBaseVNode("p", _hoisted_25$7, toDisplayString(post.excerpt), 1),
                _cache[8] || (_cache[8] = createBaseVNode("div", { class: "flex items-center gap-2 text-sm text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" }, [
                  createBaseVNode("span", null, "了解更多"),
                  createBaseVNode("svg", {
                    class: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 5l7 7-7 7"
                    })
                  ])
                ], -1))
              ])
            ])
          ], 12, _hoisted_15$a);
        }), 128))
      ])
    ]),
    (openBlock(), createBlock(Teleport, { to: "body" }, [
      createVNode(Transition, { name: "modal" }, {
        default: withCtx(() => [
          $data.selectedPost ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "fixed inset-0 z-50 flex items-center justify-center p-4",
            onClick: _cache[2] || (_cache[2] = withModifiers((...args) => $options.closePost && $options.closePost(...args), ["self"]))
          }, [
            _cache[14] || (_cache[14] = createBaseVNode("div", { class: "absolute inset-0 bg-black/80 backdrop-blur-xl" }, null, -1)),
            createBaseVNode("div", _hoisted_26$7, [
              createBaseVNode("div", _hoisted_27$6, [
                createBaseVNode("img", {
                  src: $data.selectedPost.image,
                  alt: $data.selectedPost.title,
                  class: "w-full h-full object-cover"
                }, null, 8, _hoisted_28$6),
                _cache[11] || (_cache[11] = createBaseVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/50 to-transparent" }, null, -1)),
                createBaseVNode("button", {
                  onClick: _cache[1] || (_cache[1] = (...args) => $options.closePost && $options.closePost(...args)),
                  class: "absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:rotate-90 duration-300"
                }, [..._cache[10] || (_cache[10] = [
                  createBaseVNode("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])]),
                createBaseVNode("div", _hoisted_29$6, [
                  createBaseVNode("span", _hoisted_30$6, toDisplayString($data.selectedPost.category), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_31$6, [
                createBaseVNode("div", _hoisted_32$6, [
                  createBaseVNode("span", _hoisted_33$6, toDisplayString($data.selectedPost.date), 1),
                  _cache[12] || (_cache[12] = createBaseVNode("span", { class: "text-gray-600" }, "•", -1)),
                  _cache[13] || (_cache[13] = createBaseVNode("span", { class: "text-gray-400 text-sm" }, "5 min read", -1))
                ]),
                createBaseVNode("h2", _hoisted_34$6, toDisplayString($data.selectedPost.title), 1),
                createBaseVNode("div", {
                  class: "article-content",
                  innerHTML: $data.selectedPost.content
                }, null, 8, _hoisted_35$6)
              ])
            ])
          ])) : createCommentVNode("", true)
        ]),
        _: 1
      })
    ]))
  ]);
}
const Blog = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$9], ["__scopeId", "data-v-85f9eeef"]]);
const _sfc_main$j = {
  name: "Shop",
  data() {
    return {
      services: [
        {
          title: "网页创作",
          desc: "定制化网站开发，包含响应式设计、现代化 UI/UX、性能优化",
          features: ["企业官网 / 个人作品集", "电商页面 / 落地页", "后台管理系统"],
          iconBg: "bg-purple-100",
          iconColor: "text-purple-600",
          iconPath: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
          dotColor: "bg-purple-600",
          btnClass: "bg-purple-600 hover:bg-purple-700",
          borderClass: "border border-white/10 hover:border-purple-400",
          xianyuUrl: "https://m.tb.cn/h.iXXX6S4",
          showOptions: false
        },
        {
          title: "代码创作",
          desc: "高质量代码编写与优化，支持多种编程语言和框架",
          features: ["前端/后端开发", "API 集成与开发", "代码优化与重构"],
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          iconPath: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4M7 12l4 4 4-4m-4-4a4 4 0 100-8 4 4 0 000 8z",
          dotColor: "bg-blue-600",
          btnClass: "bg-blue-600 hover:bg-blue-700",
          borderClass: "border-2 border-purple-500 hover:shadow-2xl",
          xianyuUrl: "https://m.tb.cn/h.iXXX6S4",
          showOptions: false
        },
        {
          title: "AI 思路分享",
          desc: "AI 应用开发经验分享，包含提示词工程、自动化流程设计",
          features: ["提示词模板分享", "自动化工作流设计", "1 对 1 咨询服务"],
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          iconPath: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
          dotColor: "bg-green-600",
          btnClass: "bg-green-600 hover:bg-green-700",
          borderClass: "border border-white/10 hover:border-green-400",
          xianyuUrl: "https://m.tb.cn/h.iXXX6S4",
          showOptions: false
        }
      ]
    };
  }
};
const _hoisted_1$j = { class: "shop-page" };
const _hoisted_2$j = { class: "max-w-6xl mx-auto px-6 py-24" };
const _hoisted_3$i = { class: "grid md:grid-cols-3 gap-8 mb-16" };
const _hoisted_4$i = { class: "card-icon mb-6" };
const _hoisted_5$h = ["d"];
const _hoisted_6$g = { class: "text-2xl font-bold text-white mb-3" };
const _hoisted_7$f = { class: "text-gray-300 mb-6" };
const _hoisted_8$f = { class: "space-y-3 mb-8" };
const _hoisted_9$e = { class: "relative" };
const _hoisted_10$e = ["onClick"];
const _hoisted_11$d = {
  key: 0,
  class: "absolute z-10 w-full mt-2 bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-white/10"
};
const _hoisted_12$c = ["href"];
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("div", _hoisted_1$j, [
    createBaseVNode("div", _hoisted_2$j, [
      _cache[1] || (_cache[1] = createBaseVNode("div", { class: "text-center mb-16" }, [
        createBaseVNode("h1", { class: "text-5xl md:text-6xl font-bold text-white mb-6" }, "Services & Shop"),
        createBaseVNode("p", { class: "text-xl text-gray-300 max-w-2xl mx-auto" }, "提供网页开发、代码创作、AI 应用定制等服务")
      ], -1)),
      createBaseVNode("div", _hoisted_3$i, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.services, (service, idx) => {
          return openBlock(), createElementBlock("div", {
            key: idx,
            class: normalizeClass(["service-card group rounded-2xl p-8 border hover:shadow-xl transition-all duration-300", service.borderClass])
          }, [
            createBaseVNode("div", _hoisted_4$i, [
              createBaseVNode("div", {
                class: normalizeClass(["w-16 h-16 rounded-xl flex items-center justify-center", service.iconBg])
              }, [
                (openBlock(), createElementBlock("svg", {
                  class: normalizeClass(["w-8 h-8", service.iconColor]),
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createBaseVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "1.5",
                    d: service.iconPath
                  }, null, 8, _hoisted_5$h)
                ], 2))
              ], 2)
            ]),
            createBaseVNode("h3", _hoisted_6$g, toDisplayString(service.title), 1),
            createBaseVNode("p", _hoisted_7$f, toDisplayString(service.desc), 1),
            createBaseVNode("ul", _hoisted_8$f, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(service.features, (item, i) => {
                return openBlock(), createElementBlock("li", {
                  key: i,
                  class: "flex items-center gap-3 text-gray-200"
                }, [
                  createBaseVNode("span", {
                    class: normalizeClass(["w-2 h-2 rounded-full", service.dotColor])
                  }, null, 2),
                  createBaseVNode("span", null, toDisplayString(item), 1)
                ]);
              }), 128))
            ]),
            createBaseVNode("div", _hoisted_9$e, [
              createBaseVNode("button", {
                onClick: ($event) => service.showOptions = !service.showOptions,
                class: normalizeClass(["block w-full py-3 px-6 text-white text-center font-semibold rounded-xl transition-colors", service.btnClass])
              }, "购买 ▼", 10, _hoisted_10$e),
              service.showOptions ? (openBlock(), createElementBlock("div", _hoisted_11$d, [
                createVNode(_component_router_link, {
                  to: "/contact-info",
                  class: "block px-6 py-3 text-white hover:bg-gray-700 transition-colors"
                }, {
                  default: withCtx(() => [..._cache[0] || (_cache[0] = [
                    createTextVNode("📱 联系方式", -1)
                  ])]),
                  _: 1
                }),
                createBaseVNode("a", {
                  href: service.xianyuUrl,
                  target: "_blank",
                  class: "block px-6 py-3 text-white hover:bg-gray-700 transition-colors border-t border-gray-700"
                }, "🐟 闲鱼主页", 8, _hoisted_12$c)
              ])) : createCommentVNode("", true)
            ])
          ], 2);
        }), 128))
      ]),
      _cache[2] || (_cache[2] = createStaticVNode('<div class="text-center py-16 bg-white/5 rounded-2xl" data-v-82077832><h2 class="text-3xl font-bold text-white mb-4" data-v-82077832>需要定制服务？</h2><p class="text-gray-300 mb-8" data-v-82077832>告诉我你的需求，我会为你提供详细的方案和报价</p><a href="tencent://message/?uin=3471023785" class="inline-flex items-center gap-2 py-3 px-8 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors" data-v-82077832><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" data-v-82077832><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.774 9.214c-.13.65-.506.813-1.037.52l-2.875-2.116-1.388 1.335c-.153.153-.283.283-.58.283l.207-2.932 5.33-4.813c.23-.204-.052-.318-.356-.108l-6.601 4.156-2.846-.89c-.62-.195-.633-.623.13-.925l11.11-4.275c.515-.195.964.12.816.852z" data-v-82077832></path></svg> 联系购买 </a></div>', 1))
    ])
  ]);
}
const Shop = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$8], ["__scopeId", "data-v-82077832"]]);
const _sfc_main$i = {
  name: "Templates",
  data() {
    return {
      templates: [
        {
          id: 1,
          name: "购物商城",
          path: "/shopping",
          icon: "🛒",
          description: "现代化电商模板，支持商品展示、分类导航、促销活动",
          gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          tags: ["电商", "响应式"]
        },
        {
          id: 2,
          name: "企业官网",
          path: "/corporate",
          icon: "🏢",
          description: "专业企业形象展示，适合公司介绍、团队展示",
          gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
          tags: ["企业", "专业"]
        },
        {
          id: 3,
          name: "社区论坛",
          path: "/forum",
          icon: "💬",
          description: "社区交流平台模板，支持帖子列表、用户互动",
          gradient: "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)",
          tags: ["社区", "互动"]
        },
        {
          id: 4,
          name: "在线教育",
          path: "/education",
          icon: "📚",
          description: "教育平台模板，课程展示、学习进度追踪",
          gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          tags: ["教育", "课程"]
        },
        {
          id: 5,
          name: "音乐播放",
          path: "/music",
          icon: "🎵",
          description: "音乐主题模板，专辑展示、播放列表",
          gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
          tags: ["音乐", "娱乐"]
        },
        {
          id: 6,
          name: "健身运动",
          path: "/fitness",
          icon: "💪",
          description: "健身主题模板，课程安排、教练介绍",
          gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          tags: ["健身", "运动"]
        },
        {
          id: 7,
          name: "宠物之家",
          path: "/pet",
          icon: "🐾",
          description: "宠物主题模板，宠物展示、服务介绍",
          gradient: "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
          tags: ["宠物", "可爱"]
        },
        {
          id: 8,
          name: "个人作品集",
          path: "/portfolio",
          icon: "🎨",
          description: "作品展示模板，项目案例、技能展示",
          gradient: "linear-gradient(135deg, #f5af19 0%, #f12711 100%)",
          tags: ["作品", "创意"]
        },
        {
          id: 9,
          name: "餐厅美食",
          path: "/restaurant",
          icon: "🍽️",
          description: "餐厅主题模板，菜品展示、在线预订",
          gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
          tags: ["餐饮", "美食"]
        },
        {
          id: 10,
          name: "旅游出行",
          path: "/travel",
          icon: "✈️",
          description: "旅游主题模板，目的地展示、行程规划",
          gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
          tags: ["旅游", "探索"]
        },
        {
          id: 11,
          name: "极简风格",
          path: "/minimal",
          icon: "✨",
          description: "极简设计模板，简洁优雅、专注内容",
          gradient: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
          tags: ["极简", "优雅"]
        }
      ]
    };
  },
  methods: {
    goToTemplate(path) {
      this.$router.push(path);
    }
  }
};
const _hoisted_1$i = { class: "templates-page" };
const _hoisted_2$i = { class: "max-w-6xl mx-auto px-6 py-16" };
const _hoisted_3$h = { class: "mb-12" };
const _hoisted_4$h = { class: "grid md:grid-cols-2 lg:grid-cols-3 gap-8" };
const _hoisted_5$g = ["onClick"];
const _hoisted_6$f = { class: "card-image-wrapper" };
const _hoisted_7$e = { class: "template-icon" };
const _hoisted_8$e = { class: "card-content" };
const _hoisted_9$d = { class: "card-title" };
const _hoisted_10$d = { class: "card-desc" };
const _hoisted_11$c = { class: "card-tags" };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$i, [
    createBaseVNode("div", _hoisted_2$i, [
      _cache[3] || (_cache[3] = createBaseVNode("div", { class: "text-center mb-16" }, [
        createBaseVNode("h1", { class: "text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4" }, " Website Templates "),
        createBaseVNode("p", { class: "text-gray-400 text-lg" }, "选择您喜欢的模板，快速搭建您的网站")
      ], -1)),
      createBaseVNode("div", _hoisted_3$h, [
        createBaseVNode("div", {
          class: "ui-showcase-entry",
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$router.push("/ui-showcase"))
        }, [..._cache[1] || (_cache[1] = [
          createStaticVNode('<div class="entry-content" data-v-c2eab7bd><span class="entry-icon" data-v-c2eab7bd>✨</span><div class="entry-text" data-v-c2eab7bd><h3 class="entry-title" data-v-c2eab7bd>创意 UI 实验室</h3><p class="entry-desc" data-v-c2eab7bd>探索精致的交互组件 · 磁吸按钮 · 3D 表单 · 液态进度条 · 粒子效果</p></div><svg class="entry-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c2eab7bd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-c2eab7bd></path></svg></div><div class="entry-decoration" data-v-c2eab7bd><div class="floating-shape shape-1" data-v-c2eab7bd></div><div class="floating-shape shape-2" data-v-c2eab7bd></div><div class="floating-shape shape-3" data-v-c2eab7bd></div></div>', 2)
        ])])
      ]),
      createBaseVNode("div", _hoisted_4$h, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.templates, (template) => {
          return openBlock(), createElementBlock("div", {
            key: template.id,
            class: "template-card group cursor-pointer",
            onClick: ($event) => $options.goToTemplate(template.path)
          }, [
            createBaseVNode("div", _hoisted_6$f, [
              createBaseVNode("div", {
                class: "card-image",
                style: normalizeStyle({ background: template.gradient })
              }, [
                createBaseVNode("span", _hoisted_7$e, toDisplayString(template.icon), 1)
              ], 4),
              _cache[2] || (_cache[2] = createBaseVNode("div", { class: "card-overlay" }, [
                createBaseVNode("span", { class: "view-btn" }, "查看模板")
              ], -1))
            ]),
            createBaseVNode("div", _hoisted_8$e, [
              createBaseVNode("h3", _hoisted_9$d, toDisplayString(template.name), 1),
              createBaseVNode("p", _hoisted_10$d, toDisplayString(template.description), 1),
              createBaseVNode("div", _hoisted_11$c, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(template.tags, (tag) => {
                  return openBlock(), createElementBlock("span", {
                    key: tag,
                    class: "tag"
                  }, toDisplayString(tag), 1);
                }), 128))
              ])
            ])
          ], 8, _hoisted_5$g);
        }), 128))
      ])
    ])
  ]);
}
const Templates = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$7], ["__scopeId", "data-v-c2eab7bd"]]);
const _sfc_main$h = {
  name: "UIShowcase",
  data() {
    return {
      showLoginForm: false,
      magnetStyle: {},
      progress: 65,
      particles: [],
      particleId: 0,
      ripples: [],
      rippleId: 0,
      glowStyle: {},
      toggleOn: false,
      typewriterText: "",
      hoveredCard: null,
      activeCard: 1,
      isFlipping: false,
      // 表单输入
      inputValue: "",
      emailValue: ""
    };
  },
  mounted() {
    this.rippleBtn = this.$refs.rippleBtn;
  },
  methods: {
    // 卡片点击循环
    clickCard() {
      if (this.isFlipping) return;
      this.isFlipping = true;
      this.activeCard;
      this.activeCard = this.activeCard === 3 ? 1 : this.activeCard + 1;
      setTimeout(() => {
        this.isFlipping = false;
      }, 600);
    },
    // 磁吸按钮
    handleMagnetMove(e) {
      const container = e.currentTarget;
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const maxX = 80;
      const maxY = 80;
      const deltaX = (e.clientX - centerX) / (rect.width / 2) * maxX;
      const deltaY = (e.clientY - centerY) / (rect.height / 2) * maxY;
      this.magnetStyle = {
        transform: `translate(${deltaX}px, ${deltaY}px)`
      };
    },
    handleMagnetLeave() {
      this.magnetStyle = {};
    },
    // 粒子爆炸
    explodeParticles() {
      const btn = event.currentTarget;
      const rect = btn.getBoundingClientRect();
      rect.left + rect.width / 2;
      rect.top + rect.height / 2;
      for (let i = 0; i < 20; i++) {
        const angle = Math.PI * 2 * i / 20;
        const velocity = 80 + Math.random() * 40;
        this.particles.push({
          id: this.particleId++,
          style: {
            left: "50%",
            top: "50%",
            backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
            "--tx": `${Math.cos(angle) * velocity}px`,
            "--ty": `${Math.sin(angle) * velocity}px`
          }
        });
      }
      setTimeout(() => {
        this.particles = [];
      }, 600);
    },
    // 波纹效果
    createRipple(e) {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.ripples.push({
        id: this.rippleId++,
        style: {
          left: `${x}px`,
          top: `${y}px`
        }
      });
      setTimeout(() => {
        this.ripples.shift();
      }, 600);
    },
    // 光标追踪
    handleTrackMove(e) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.glowStyle = {
        left: `${x}px`,
        top: `${y}px`
      };
    },
    handleTrackLeave() {
      this.glowStyle = { opacity: 0 };
    },
    // 打字机输入
    handleTypewriter(e) {
      this.typewriterText = e.target.textContent;
    },
    // 卡片堆叠
    getCardStyle(n) {
      const getRelativePos = (cardIndex) => {
        const diff = cardIndex - this.activeCard;
        if (diff === 0) {
          return { y: 0, z: 40, scale: 1.1, opacity: 1, rotate: 0, isTop: true };
        } else if (diff > 0) {
          return {
            y: diff * 10,
            z: 40 - diff * 15,
            scale: Math.max(0.85, 1.1 - diff * 0.12),
            opacity: Math.max(0.5, 1 - diff * 0.2),
            rotate: diff * 2,
            isTop: false
          };
        } else {
          const absDiff = Math.abs(diff);
          return {
            y: -absDiff * 10 - 20,
            z: -absDiff * 20,
            scale: Math.max(0.75, 1 - absDiff * 0.15),
            opacity: Math.max(0.3, 0.7 - absDiff * 0.2),
            rotate: diff * 3,
            isTop: false
          };
        }
      };
      const style = getRelativePos(n);
      return {
        transform: `translateY(${style.y}px) translateZ(${style.z}px) scale(${style.scale}) rotate(${style.rotate}deg)`,
        opacity: style.opacity,
        zIndex: style.isTop ? 100 : n,
        boxShadow: style.isTop ? "0 25px 80px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)" : "0 10px 30px rgba(0, 0, 0, 0.2)",
        borderColor: style.isTop ? "rgba(139, 92, 246, 0.9)" : "rgba(139, 92, 246, 0.2)",
        cursor: style.isTop ? "pointer" : "default"
      };
    }
  }
};
const _hoisted_1$h = { class: "ui-showcase" };
const _hoisted_2$h = { class: "components-grid" };
const _hoisted_3$g = {
  class: "component-card",
  ref: "magnetCard"
};
const _hoisted_4$g = { class: "card-body" };
const _hoisted_5$f = { class: "component-card" };
const _hoisted_6$e = { class: "card-body" };
const _hoisted_7$d = { class: "flipper" };
const _hoisted_8$d = { class: "front" };
const _hoisted_9$c = { class: "form-card login" };
const _hoisted_10$c = { class: "form-tip" };
const _hoisted_11$b = { class: "back" };
const _hoisted_12$b = { class: "form-card register" };
const _hoisted_13$9 = { class: "form-tip" };
const _hoisted_14$9 = { class: "component-card" };
const _hoisted_15$9 = { class: "card-body" };
const _hoisted_16$9 = { class: "progress-section" };
const _hoisted_17$9 = { class: "liquid-progress" };
const _hoisted_18$8 = { class: "progress-text" };
const _hoisted_19$7 = { class: "progress-controls" };
const _hoisted_20$7 = { class: "component-card" };
const _hoisted_21$6 = { class: "card-body" };
const _hoisted_22$6 = { class: "particle-btn-container" };
const _hoisted_23$6 = { class: "component-card" };
const _hoisted_24$6 = { class: "card-body" };
const _hoisted_25$6 = { class: "component-card" };
const _hoisted_26$6 = { class: "card-body" };
const _hoisted_27$5 = { class: "component-card" };
const _hoisted_28$5 = { class: "card-body" };
const _hoisted_29$5 = { class: "toggle-container" };
const _hoisted_30$5 = { class: "toggle-status" };
const _hoisted_31$5 = { class: "component-card" };
const _hoisted_32$5 = { class: "card-body" };
const _hoisted_33$5 = { class: "input-group" };
const _hoisted_34$5 = { class: "floating-input" };
const _hoisted_35$5 = { class: "floating-input" };
const _hoisted_36$5 = {
  key: 0,
  class: "input-hint"
};
const _hoisted_37$5 = { class: "component-card" };
const _hoisted_38$5 = { class: "card-body" };
const _hoisted_39$5 = { class: "card-stack" };
const _hoisted_40$5 = ["onMouseenter"];
const _hoisted_41$5 = { class: "card-indicator" };
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$h, [
    _cache[44] || (_cache[44] = createBaseVNode("div", { class: "showcase-header" }, [
      createBaseVNode("h1", { class: "title" }, [
        createBaseVNode("span", { class: "gradient-text" }, "UI Components Lab")
      ]),
      createBaseVNode("p", { class: "subtitle" }, "简洁 · 创意 · 交互")
    ], -1)),
    createBaseVNode("div", _hoisted_2$h, [
      createBaseVNode("div", _hoisted_3$g, [
        _cache[17] || (_cache[17] = createBaseVNode("div", { class: "card-header" }, [
          createBaseVNode("span", { class: "card-icon" }, "🧲"),
          createBaseVNode("span", { class: "card-title" }, "磁吸按钮")
        ], -1)),
        createBaseVNode("div", _hoisted_4$g, [
          createBaseVNode("div", {
            class: "magnet-container",
            onMousemove: _cache[0] || (_cache[0] = (...args) => $options.handleMagnetMove && $options.handleMagnetMove(...args)),
            onMouseleave: _cache[1] || (_cache[1] = (...args) => $options.handleMagnetLeave && $options.handleMagnetLeave(...args))
          }, [
            createBaseVNode("button", {
              class: "magnet-btn",
              style: normalizeStyle($data.magnetStyle)
            }, [..._cache[16] || (_cache[16] = [
              createBaseVNode("span", null, "Hover Me", -1)
            ])], 4)
          ], 32)
        ])
      ], 512),
      createBaseVNode("div", _hoisted_5$f, [
        _cache[24] || (_cache[24] = createBaseVNode("div", { class: "card-header" }, [
          createBaseVNode("span", { class: "card-icon" }, "🔐"),
          createBaseVNode("span", { class: "card-title" }, "3D 翻转表单")
        ], -1)),
        createBaseVNode("div", _hoisted_6$e, [
          createBaseVNode("div", {
            class: normalizeClass(["flip-container", { flipped: $data.showLoginForm }])
          }, [
            createBaseVNode("div", _hoisted_7$d, [
              createBaseVNode("div", _hoisted_8$d, [
                createBaseVNode("div", _hoisted_9$c, [
                  _cache[20] || (_cache[20] = createStaticVNode('<div class="form-decoration" data-v-4883ae6b><div class="glow-orb orb-1" data-v-4883ae6b></div><div class="glow-orb orb-2" data-v-4883ae6b></div></div><div class="form-icon" data-v-4883ae6b>🔑</div><h3 data-v-4883ae6b>欢迎回来</h3><input type="text" placeholder="用户名" class="form-input" data-v-4883ae6b><input type="password" placeholder="密码" class="form-input" data-v-4883ae6b>', 5)),
                  createBaseVNode("button", {
                    class: "submit-btn",
                    onClick: _cache[2] || (_cache[2] = withModifiers(($event) => $data.showLoginForm = !$data.showLoginForm, ["stop"]))
                  }, [..._cache[18] || (_cache[18] = [
                    createBaseVNode("span", null, "登录", -1),
                    createBaseVNode("svg", {
                      class: "btn-arrow",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createBaseVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M14 5l7 7m0 0l-7 7m7-7H3"
                      })
                    ], -1)
                  ])]),
                  createBaseVNode("p", _hoisted_10$c, [
                    _cache[19] || (_cache[19] = createTextVNode("没有账号？", -1)),
                    createBaseVNode("span", {
                      onClick: _cache[3] || (_cache[3] = withModifiers(($event) => $data.showLoginForm = !$data.showLoginForm, ["stop"])),
                      class: "link"
                    }, "去注册")
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_11$b, [
                createBaseVNode("div", _hoisted_12$b, [
                  _cache[23] || (_cache[23] = createStaticVNode('<div class="form-decoration" data-v-4883ae6b><div class="glow-orb orb-3" data-v-4883ae6b></div><div class="glow-orb orb-4" data-v-4883ae6b></div></div><div class="form-icon" data-v-4883ae6b>✨</div><h3 data-v-4883ae6b>创建账号</h3><input type="email" placeholder="邮箱" class="form-input" data-v-4883ae6b><input type="password" placeholder="密码" class="form-input" data-v-4883ae6b><input type="password" placeholder="确认密码" class="form-input" data-v-4883ae6b>', 6)),
                  createBaseVNode("button", {
                    class: "submit-btn",
                    onClick: _cache[4] || (_cache[4] = withModifiers(($event) => $data.showLoginForm = !$data.showLoginForm, ["stop"]))
                  }, [..._cache[21] || (_cache[21] = [
                    createBaseVNode("span", null, "注册", -1),
                    createBaseVNode("svg", {
                      class: "btn-arrow",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createBaseVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M14 5l7 7m0 0l-7 7m7-7H3"
                      })
                    ], -1)
                  ])]),
                  createBaseVNode("p", _hoisted_13$9, [
                    _cache[22] || (_cache[22] = createTextVNode("已有账号？", -1)),
                    createBaseVNode("span", {
                      onClick: _cache[5] || (_cache[5] = withModifiers(($event) => $data.showLoginForm = !$data.showLoginForm, ["stop"])),
                      class: "link"
                    }, "去登录")
                  ])
                ])
              ])
            ])
          ], 2)
        ])
      ]),
      createBaseVNode("div", _hoisted_14$9, [
        _cache[26] || (_cache[26] = createBaseVNode("div", { class: "card-header" }, [
          createBaseVNode("span", { class: "card-icon" }, "📊"),
          createBaseVNode("span", { class: "card-title" }, "液态进度条")
        ], -1)),
        createBaseVNode("div", _hoisted_15$9, [
          createBaseVNode("div", _hoisted_16$9, [
            createBaseVNode("div", _hoisted_17$9, [
              createBaseVNode("div", {
                class: "liquid-fill",
                style: normalizeStyle({ height: `${$data.progress}%` })
              }, [..._cache[25] || (_cache[25] = [
                createBaseVNode("div", { class: "wave wave-1" }, null, -1),
                createBaseVNode("div", { class: "wave wave-2" }, null, -1),
                createBaseVNode("div", { class: "wave wave-3" }, null, -1)
              ])], 4),
              createBaseVNode("span", _hoisted_18$8, toDisplayString($data.progress) + "%", 1)
            ]),
            createBaseVNode("div", _hoisted_19$7, [
              withDirectives(createBaseVNode("input", {
                type: "range",
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.progress = $event),
                min: "0",
                max: "100",
                class: "slider"
              }, null, 512), [
                [vModelText, $data.progress]
              ])
            ])
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_20$7, [
        _cache[28] || (_cache[28] = createBaseVNode("div", { class: "card-header" }, [
          createBaseVNode("span", { class: "card-icon" }, "✨"),
          createBaseVNode("span", { class: "card-title" }, "粒子爆炸按钮")
        ], -1)),
        createBaseVNode("div", _hoisted_21$6, [
          createBaseVNode("div", _hoisted_22$6, [
            createBaseVNode("button", {
              class: "particle-btn",
              onClick: _cache[7] || (_cache[7] = (...args) => $options.explodeParticles && $options.explodeParticles(...args))
            }, [..._cache[27] || (_cache[27] = [
              createBaseVNode("span", null, "点击爆炸", -1)
            ])]),
            (openBlock(true), createElementBlock(Fragment, null, renderList($data.particles, (particle) => {
              return openBlock(), createElementBlock("div", {
                key: particle.id,
                class: "particle",
                style: normalizeStyle(particle.style)
              }, null, 4);
            }), 128))
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_23$6, [
        _cache[30] || (_cache[30] = createBaseVNode("div", { class: "card-header" }, [
          createBaseVNode("span", { class: "card-icon" }, "🌊"),
          createBaseVNode("span", { class: "card-title" }, "波纹扩散")
        ], -1)),
        createBaseVNode("div", _hoisted_24$6, [
          createBaseVNode("button", {
            class: "ripple-btn",
            onClick: _cache[8] || (_cache[8] = (...args) => $options.createRipple && $options.createRipple(...args)),
            ref: "rippleBtn"
          }, [
            _cache[29] || (_cache[29] = createTextVNode(" 点击我 ", -1)),
            (openBlock(true), createElementBlock(Fragment, null, renderList($data.ripples, (ripple) => {
              return openBlock(), createElementBlock("span", {
                key: ripple.id,
                class: "ripple",
                style: normalizeStyle(ripple.style)
              }, null, 4);
            }), 128))
          ], 512)
        ])
      ]),
      createBaseVNode("div", _hoisted_25$6, [
        _cache[32] || (_cache[32] = createBaseVNode("div", { class: "card-header" }, [
          createBaseVNode("span", { class: "card-icon" }, "🎯"),
          createBaseVNode("span", { class: "card-title" }, "光标追踪")
        ], -1)),
        createBaseVNode("div", _hoisted_26$6, [
          createBaseVNode("div", {
            class: "tracker-card",
            onMousemove: _cache[9] || (_cache[9] = (...args) => $options.handleTrackMove && $options.handleTrackMove(...args)),
            onMouseleave: _cache[10] || (_cache[10] = (...args) => $options.handleTrackLeave && $options.handleTrackLeave(...args))
          }, [
            createBaseVNode("div", {
              class: "tracker-glow",
              style: normalizeStyle($data.glowStyle)
            }, null, 4),
            _cache[31] || (_cache[31] = createBaseVNode("div", { class: "tracker-content" }, [
              createBaseVNode("span", null, "移动鼠标查看效果")
            ], -1))
          ], 32)
        ])
      ]),
      _cache[41] || (_cache[41] = createStaticVNode('<div class="component-card" data-v-4883ae6b><div class="card-header" data-v-4883ae6b><span class="card-icon" data-v-4883ae6b>🔮</span><span class="card-title" data-v-4883ae6b>玻璃态</span></div><div class="card-body" data-v-4883ae6b><div class="glass-card" data-v-4883ae6b><div class="glass-content" data-v-4883ae6b><span class="glass-icon" data-v-4883ae6b>💎</span><span class="glass-text" data-v-4883ae6b>Glassmorphism</span></div></div></div></div>', 1)),
      createBaseVNode("div", _hoisted_27$5, [
        _cache[34] || (_cache[34] = createBaseVNode("div", { class: "card-header" }, [
          createBaseVNode("span", { class: "card-icon" }, "🔘"),
          createBaseVNode("span", { class: "card-title" }, "弹性开关")
        ], -1)),
        createBaseVNode("div", _hoisted_28$5, [
          createBaseVNode("div", _hoisted_29$5, [
            createBaseVNode("label", {
              class: normalizeClass(["toggle", { active: $data.toggleOn }]),
              onClick: _cache[11] || (_cache[11] = ($event) => $data.toggleOn = !$data.toggleOn)
            }, [..._cache[33] || (_cache[33] = [
              createBaseVNode("span", { class: "toggle-slider" }, null, -1)
            ])], 2),
            createBaseVNode("span", _hoisted_30$5, toDisplayString($data.toggleOn ? "ON" : "OFF"), 1)
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_31$5, [
        _cache[39] || (_cache[39] = createBaseVNode("div", { class: "card-header" }, [
          createBaseVNode("span", { class: "card-icon" }, "📝"),
          createBaseVNode("span", { class: "card-title" }, "浮动标签输入")
        ], -1)),
        createBaseVNode("div", _hoisted_32$5, [
          createBaseVNode("div", _hoisted_33$5, [
            createBaseVNode("div", _hoisted_34$5, [
              withDirectives(createBaseVNode("input", {
                type: "text",
                id: "username",
                "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $data.inputValue = $event),
                placeholder: " "
              }, null, 512), [
                [vModelText, $data.inputValue]
              ]),
              _cache[35] || (_cache[35] = createBaseVNode("label", { for: "username" }, "用户名", -1)),
              _cache[36] || (_cache[36] = createBaseVNode("div", { class: "input-line" }, null, -1))
            ]),
            createBaseVNode("div", _hoisted_35$5, [
              withDirectives(createBaseVNode("input", {
                type: "email",
                id: "email",
                "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $data.emailValue = $event),
                placeholder: " "
              }, null, 512), [
                [vModelText, $data.emailValue]
              ]),
              _cache[37] || (_cache[37] = createBaseVNode("label", { for: "email" }, "邮箱地址", -1)),
              _cache[38] || (_cache[38] = createBaseVNode("div", { class: "input-line" }, null, -1))
            ]),
            $data.inputValue ? (openBlock(), createElementBlock("p", _hoisted_36$5, "已输入：" + toDisplayString($data.inputValue), 1)) : createCommentVNode("", true)
          ])
        ])
      ]),
      _cache[42] || (_cache[42] = createStaticVNode('<div class="component-card" data-v-4883ae6b><div class="card-header" data-v-4883ae6b><span class="card-icon" data-v-4883ae6b>🌈</span><span class="card-title" data-v-4883ae6b>旋转渐变边框</span></div><div class="card-body" data-v-4883ae6b><div class="gradient-border-btn" data-v-4883ae6b><div class="gradient-bg" data-v-4883ae6b></div><span class="btn-text" data-v-4883ae6b>Hover Effect</span></div></div></div>', 1)),
      createBaseVNode("div", _hoisted_37$5, [
        _cache[40] || (_cache[40] = createBaseVNode("div", { class: "card-header" }, [
          createBaseVNode("span", { class: "card-icon" }, "🎴"),
          createBaseVNode("span", { class: "card-title" }, "悬浮卡片"),
          createBaseVNode("span", { class: "card-hint" }, "点击翻转")
        ], -1)),
        createBaseVNode("div", _hoisted_38$5, [
          createBaseVNode("div", _hoisted_39$5, [
            (openBlock(), createElementBlock(Fragment, null, renderList(3, (n) => {
              return createBaseVNode("div", {
                key: n,
                class: normalizeClass(["stack-card", { "active": $data.activeCard === n }]),
                style: normalizeStyle($options.getCardStyle(n)),
                onMouseenter: ($event) => $data.hoveredCard = n,
                onMouseleave: _cache[14] || (_cache[14] = ($event) => $data.hoveredCard = null),
                onClick: _cache[15] || (_cache[15] = (...args) => $options.clickCard && $options.clickCard(...args))
              }, [
                createBaseVNode("span", null, "Card " + toDisplayString(n), 1)
              ], 46, _hoisted_40$5);
            }), 64))
          ]),
          createBaseVNode("div", _hoisted_41$5, [
            (openBlock(), createElementBlock(Fragment, null, renderList(3, (n) => {
              return createBaseVNode("span", {
                key: n,
                class: normalizeClass({ active: $data.activeCard === n })
              }, null, 2);
            }), 64))
          ])
        ])
      ]),
      _cache[43] || (_cache[43] = createStaticVNode('<div class="component-card" data-v-4883ae6b><div class="card-header" data-v-4883ae6b><span class="card-icon" data-v-4883ae6b>⏳</span><span class="card-title" data-v-4883ae6b>创意加载</span></div><div class="card-body" data-v-4883ae6b><div class="loader-container" data-v-4883ae6b><div class="dot-loader" data-v-4883ae6b><span class="dot" data-v-4883ae6b></span><span class="dot" data-v-4883ae6b></span><span class="dot" data-v-4883ae6b></span></div></div></div></div>', 1))
    ]),
    _cache[45] || (_cache[45] = createBaseVNode("div", { class: "showcase-footer" }, [
      createBaseVNode("p", null, "More components coming soon...")
    ], -1))
  ]);
}
const UIShowcase = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$6], ["__scopeId", "data-v-4883ae6b"]]);
const _sfc_main$g = {
  name: "OpenClawDeploy",
  computed: {
    backText() {
      const from = this.$route.query.from;
      return from === "blog" ? "Back to Blog" : "Back to Projects";
    }
  },
  methods: {
    goBack() {
      const from = this.$route.query.from;
      if (from === "blog") {
        this.$router.push("/blog");
      } else {
        this.$router.push("/projects");
      }
    }
  }
};
const _hoisted_1$g = { class: "deploy-page" };
const _hoisted_2$g = { class: "max-w-4xl mx-auto px-6 py-24" };
const _hoisted_3$f = { class: "mb-16" };
const _hoisted_4$f = { class: "text-center mt-16 pb-12" };
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("div", _hoisted_1$g, [
    createBaseVNode("div", _hoisted_2$g, [
      createBaseVNode("div", _hoisted_3$f, [
        createBaseVNode("a", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.goBack && $options.goBack(...args)),
          class: "inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors cursor-pointer"
        }, [
          _cache[1] || (_cache[1] = createBaseVNode("svg", {
            class: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24"
          }, [
            createBaseVNode("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M10 19l-7-7m0 0l7-7m-7 7h18"
            })
          ], -1)),
          createBaseVNode("span", null, toDisplayString($options.backText), 1)
        ]),
        _cache[2] || (_cache[2] = createStaticVNode('<h1 class="text-4xl md:text-5xl font-bold text-white mb-6" data-v-7d7aacf0>VPS 部署 OpenClaw 完整教程</h1><div class="flex items-center gap-4 text-gray-400" data-v-7d7aacf0><span class="flex items-center gap-2" data-v-7d7aacf0><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7d7aacf0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-7d7aacf0></path></svg> 2024 年 3 月 </span><span class="flex items-center gap-2" data-v-7d7aacf0><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7d7aacf0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-7d7aacf0></path></svg> 10 分钟阅读 </span></div>', 2))
      ]),
      _cache[4] || (_cache[4] = createStaticVNode('<div class="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-8 mb-12 border border-purple-500/30" data-v-7d7aacf0><h2 class="text-2xl font-bold text-white mb-4" data-v-7d7aacf0>💰 成本总结</h2><div class="grid md:grid-cols-2 gap-6" data-v-7d7aacf0><div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10" data-v-7d7aacf0><h3 class="text-lg font-semibold text-white mb-2" data-v-7d7aacf0>阿里云学生服务器</h3><p class="text-3xl font-bold text-purple-400" data-v-7d7aacf0>¥9.9</p><p class="text-gray-400 text-sm mt-2" data-v-7d7aacf0>每月 / 学生优惠</p></div><div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10" data-v-7d7aacf0><h3 class="text-lg font-semibold text-white mb-2" data-v-7d7aacf0>Coding Plan</h3><p class="text-3xl font-bold text-blue-400" data-v-7d7aacf0>¥7</p><p class="text-gray-400 text-sm mt-2" data-v-7d7aacf0>每月 / 内网穿透</p></div></div><div class="mt-6 bg-[#0a0a0f] rounded-xl p-6 border border-purple-500/50" data-v-7d7aacf0><p class="text-gray-400" data-v-7d7aacf0>总费用</p><p class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400" data-v-7d7aacf0>¥17/月</p></div></div><div class="prose prose-invert max-w-none" data-v-7d7aacf0><section class="mb-12" data-v-7d7aacf0><h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-7d7aacf0><span class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400" data-v-7d7aacf0>1</span> 准备工作 </h2><div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10" data-v-7d7aacf0><h3 class="text-lg font-semibold text-white mb-4" data-v-7d7aacf0>所需材料</h3><ul class="space-y-3 text-gray-300" data-v-7d7aacf0><li class="flex items-start gap-3" data-v-7d7aacf0><span class="text-purple-400 mt-1" data-v-7d7aacf0>✓</span><span data-v-7d7aacf0>阿里云学生账号（需要学生认证）</span></li><li class="flex items-start gap-3" data-v-7d7aacf0><span class="text-purple-400 mt-1" data-v-7d7aacf0>✓</span><span data-v-7d7aacf0>Coding.net 账号</span></li><li class="flex items-start gap-3" data-v-7d7aacf0><span class="text-purple-400 mt-1" data-v-7d7aacf0>✓</span><span data-v-7d7aacf0>SSH 客户端（Windows 推荐 PowerShell，Mac/Linux 用终端）</span></li><li class="flex items-start gap-3" data-v-7d7aacf0><span class="text-purple-400 mt-1" data-v-7d7aacf0>✓</span><span data-v-7d7aacf0>Git（用于代码管理）</span></li></ul></div></section><section class="mb-12" data-v-7d7aacf0><h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-7d7aacf0><span class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400" data-v-7d7aacf0>2</span> 购买阿里云学生服务器 </h2><div class="space-y-6" data-v-7d7aacf0><div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10" data-v-7d7aacf0><h3 class="text-lg font-semibold text-white mb-4" data-v-7d7aacf0>步骤</h3><ol class="space-y-4 text-gray-300" data-v-7d7aacf0><li class="flex items-start gap-3" data-v-7d7aacf0><span class="text-purple-400 font-bold" data-v-7d7aacf0>2.1</span><span data-v-7d7aacf0>访问 <a href="https://www.aliyun.com/" target="_blank" class="text-purple-400 hover:underline" data-v-7d7aacf0>阿里云官网</a>，完成学生认证</span></li><li class="flex items-start gap-3" data-v-7d7aacf0><span class="text-purple-400 font-bold" data-v-7d7aacf0>2.2</span><span data-v-7d7aacf0>进入&quot;云翼计划&quot;或&quot;学生机&quot;页面</span></li><li class="flex items-start gap-3" data-v-7d7aacf0><span class="text-purple-400 font-bold" data-v-7d7aacf0>2.3</span><span data-v-7d7aacf0>选择最便宜的配置（通常 2 核 2G 或 2 核 4G）</span></li><li class="flex items-start gap-3" data-v-7d7aacf0><span class="text-purple-400 font-bold" data-v-7d7aacf0>2.4</span><span data-v-7d7aacf0>选择操作系统：推荐 Ubuntu 22.04 LTS</span></li><li class="flex items-start gap-3" data-v-7d7aacf0><span class="text-purple-400 font-bold" data-v-7d7aacf0>2.5</span><span data-v-7d7aacf0>完成支付，记录公网 IP、账号密码</span></li></ol></div></div></section><section class="mb-12" data-v-7d7aacf0><h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-7d7aacf0><span class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400" data-v-7d7aacf0>3</span> 配置 Coding Plan 内网穿透 </h2><div class="space-y-6" data-v-7d7aacf0><div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10" data-v-7d7aacf0><h3 class="text-lg font-semibold text-white mb-4" data-v-7d7aacf0>步骤</h3><ol class="space-y-4 text-gray-300" data-v-7d7aacf0><li class="flex items-start gap-3" data-v-7d7aacf0><span class="text-blue-400 font-bold" data-v-7d7aacf0>3.1</span><span data-v-7d7aacf0>访问 <a href="https://coding.net/" target="_blank" class="text-blue-400 hover:underline" data-v-7d7aacf0>Coding.net</a> 注册账号</span></li><li class="flex items-start gap-3" data-v-7d7aacf0><span class="text-blue-400 font-bold" data-v-7d7aacf0>3.2</span><span data-v-7d7aacf0>购买 Coding Plan（7 元/月）</span></li><li class="flex items-start gap-3" data-v-7d7aacf0><span class="text-blue-400 font-bold" data-v-7d7aacf0>3.3</span><span data-v-7d7aacf0>在 Coding 控制台配置内网穿透规则</span></li><li class="flex items-start gap-3" data-v-7d7aacf0><span class="text-blue-400 font-bold" data-v-7d7aacf0>3.4</span><span data-v-7d7aacf0>获取穿透域名和配置信息</span></li></ol></div></div></section><section class="mb-12" data-v-7d7aacf0><h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-7d7aacf0><span class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400" data-v-7d7aacf0>4</span> 连接 VPS 服务器 </h2><div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10" data-v-7d7aacf0><h3 class="text-lg font-semibold text-white mb-4" data-v-7d7aacf0>SSH 连接命令</h3><div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto" data-v-7d7aacf0><code class="text-green-400 text-sm" data-v-7d7aacf0>ssh root@你的服务器 IP</code></div><p class="text-gray-400 text-sm mt-3" data-v-7d7aacf0>首次连接会询问是否信任，输入 yes 即可</p></div></section><section class="mb-12" data-v-7d7aacf0><h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-7d7aacf0><span class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400" data-v-7d7aacf0>5</span> 安装 OpenClaw </h2><div class="space-y-6" data-v-7d7aacf0><div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10" data-v-7d7aacf0><h3 class="text-lg font-semibold text-white mb-4" data-v-7d7aacf0>安装步骤</h3><div class="space-y-4" data-v-7d7aacf0><div data-v-7d7aacf0><p class="text-gray-400 text-sm mb-2" data-v-7d7aacf0>1. 更新系统包</p><div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto" data-v-7d7aacf0><code class="text-green-400 text-sm" data-v-7d7aacf0>apt update &amp;&amp; apt upgrade -y</code></div></div><div data-v-7d7aacf0><p class="text-gray-400 text-sm mb-2" data-v-7d7aacf0>2. 安装 Node.js</p><div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto" data-v-7d7aacf0><code class="text-green-400 text-sm" data-v-7d7aacf0>curl -fsSL https://deb.nodesource.com/setup_20.x | bash -<br data-v-7d7aacf0>apt install -y nodejs</code></div></div><div data-v-7d7aacf0><p class="text-gray-400 text-sm mb-2" data-v-7d7aacf0>3. 克隆 OpenClaw 仓库</p><div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto" data-v-7d7aacf0><code class="text-green-400 text-sm" data-v-7d7aacf0>git clone https://github.com/openclaw/openclaw.git<br data-v-7d7aacf0>cd openclaw</code></div></div><div data-v-7d7aacf0><p class="text-gray-400 text-sm mb-2" data-v-7d7aacf0>4. 安装依赖</p><div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto" data-v-7d7aacf0><code class="text-green-400 text-sm" data-v-7d7aacf0>npm install</code></div></div><div data-v-7d7aacf0><p class="text-gray-400 text-sm mb-2" data-v-7d7aacf0>5. 配置环境变量</p><div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto" data-v-7d7aacf0><code class="text-green-400 text-sm" data-v-7d7aacf0>cp .env.example .env<br data-v-7d7aacf0>nano .env # 编辑配置</code></div></div></div></div></div></section><section class="mb-12" data-v-7d7aacf0><h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-7d7aacf0><span class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400" data-v-7d7aacf0>6</span> 配置 QQ 机器人 </h2><div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10" data-v-7d7aacf0><h3 class="text-lg font-semibold text-white mb-4" data-v-7d7aacf0>QQ 机器人配置</h3><ol class="space-y-4 text-gray-300" data-v-7d7aacf0><li class="flex items-start gap-3" data-v-7d7aacf0><span class="text-purple-400 font-bold" data-v-7d7aacf0>6.1</span><span data-v-7d7aacf0>访问 <a href="https://bot.q.qq.com/" target="_blank" class="text-purple-400 hover:underline" data-v-7d7aacf0>QQ 机器人开放平台</a></span></li><li class="flex items-start gap-3" data-v-7d7aacf0><span class="text-purple-400 font-bold" data-v-7d7aacf0>6.2</span><span data-v-7d7aacf0>创建机器人应用，获取 AppID 和 Token</span></li><li class="flex items-start gap-3" data-v-7d7aacf0><span class="text-purple-400 font-bold" data-v-7d7aacf0>6.3</span><span data-v-7d7aacf0>在 OpenClaw 配置文件中填入 QQ 机器人信息</span></li><li class="flex items-start gap-3" data-v-7d7aacf0><span class="text-purple-400 font-bold" data-v-7d7aacf0>6.4</span><span data-v-7d7aacf0>邀请机器人加入你的 QQ 群</span></li></ol></div></section><section class="mb-12" data-v-7d7aacf0><h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-7d7aacf0><span class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400" data-v-7d7aacf0>7</span> 启动服务 </h2><div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10" data-v-7d7aacf0><h3 class="text-lg font-semibold text-white mb-4" data-v-7d7aacf0>启动命令</h3><div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto" data-v-7d7aacf0><code class="text-green-400 text-sm" data-v-7d7aacf0>npm run start</code></div><p class="text-gray-400 text-sm mt-3" data-v-7d7aacf0>建议使用 PM2 保持服务运行：</p><div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto mt-2" data-v-7d7aacf0><code class="text-green-400 text-sm" data-v-7d7aacf0>npm install -g pm2<br data-v-7d7aacf0>pm2 start npm --name &quot;openclaw&quot; -- run start<br data-v-7d7aacf0>pm2 save<br data-v-7d7aacf0>pm2 startup</code></div></div></section><section class="mb-12" data-v-7d7aacf0><h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-7d7aacf0><span class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400" data-v-7d7aacf0>8</span> 常见问题 </h2><div class="space-y-4" data-v-7d7aacf0><div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10" data-v-7d7aacf0><h3 class="text-lg font-semibold text-white mb-3" data-v-7d7aacf0>Q: 学生认证失败怎么办？</h3><p class="text-gray-300" data-v-7d7aacf0>A: 确保使用学信网可查的学籍信息，如果是大专/本科在读应该都能通过。</p></div><div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10" data-v-7d7aacf0><h3 class="text-lg font-semibold text-white mb-3" data-v-7d7aacf0>Q: SSH 连接不上？</h3><p class="text-gray-300" data-v-7d7aacf0>A: 检查安全组是否开放了 22 端口，确认公网 IP 是否正确。</p></div><div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10" data-v-7d7aacf0><h3 class="text-lg font-semibold text-white mb-3" data-v-7d7aacf0>Q: OpenClaw 启动报错？</h3><p class="text-gray-300" data-v-7d7aacf0>A: 查看日志文件，通常是配置错误或端口被占用，检查.env 文件配置。</p></div></div></section><section class="mb-12" data-v-7d7aacf0><div class="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 border border-purple-500/30" data-v-7d7aacf0><h2 class="text-2xl font-bold text-white mb-4" data-v-7d7aacf0>🎉 完成！</h2><p class="text-gray-300 mb-4" data-v-7d7aacf0>恭喜你成功部署 OpenClaw！现在你的 AI 代理已经 24/7 在线运行了。</p><p class="text-gray-300" data-v-7d7aacf0>总成本：<span class="text-purple-400 font-bold" data-v-7d7aacf0>¥17/月</span>，享受你的 AI 助手吧！</p></div></section></div>', 2)),
      createBaseVNode("div", _hoisted_4$f, [
        createVNode(_component_router_link, {
          to: "/projects",
          class: "inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        }, {
          default: withCtx(() => [..._cache[3] || (_cache[3] = [
            createBaseVNode("svg", {
              class: "w-5 h-5",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24"
            }, [
              createBaseVNode("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M10 19l-7-7m0 0l7-7m-7 7h18"
              })
            ], -1),
            createBaseVNode("span", null, "返回项目列表", -1)
          ])]),
          _: 1
        })
      ])
    ])
  ]);
}
const OpenClawDeploy = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$5], ["__scopeId", "data-v-7d7aacf0"]]);
const _sfc_main$f = {
  name: "WebsiteBuild",
  computed: {
    backText() {
      const from = this.$route.query.from;
      return from === "projects" ? "Back to Projects" : "Back to Blog";
    }
  },
  methods: {
    goBack() {
      const from = this.$route.query.from;
      if (from === "projects") {
        this.$router.push("/projects");
      } else {
        this.$router.push("/blog");
      }
    }
  }
};
const _hoisted_1$f = { class: "build-page" };
const _hoisted_2$f = { class: "max-w-4xl mx-auto px-6 py-24" };
const _hoisted_3$e = { class: "mb-16" };
const _hoisted_4$e = { class: "prose prose-invert max-w-none" };
const _hoisted_5$e = { class: "text-center mt-16 pb-12" };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("div", _hoisted_1$f, [
    createBaseVNode("div", _hoisted_2$f, [
      createBaseVNode("div", _hoisted_3$e, [
        createBaseVNode("a", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.goBack && $options.goBack(...args)),
          class: "inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors cursor-pointer"
        }, [
          _cache[1] || (_cache[1] = createBaseVNode("svg", {
            class: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24"
          }, [
            createBaseVNode("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M10 19l-7-7m0 0l7-7m-7 7h18"
            })
          ], -1)),
          createBaseVNode("span", null, toDisplayString($options.backText), 1)
        ]),
        _cache[2] || (_cache[2] = createStaticVNode('<h1 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-6" data-v-f5d4c21b> 个人网站搭建全记录 </h1><div class="flex items-center gap-4 text-gray-400" data-v-f5d4c21b><span class="flex items-center gap-2" data-v-f5d4c21b><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f5d4c21b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-f5d4c21b></path></svg> 2024 年 3 月 4 日 </span><span class="flex items-center gap-2" data-v-f5d4c21b><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f5d4c21b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-f5d4c21b></path></svg> 15 分钟阅读 </span></div>', 2))
      ]),
      createBaseVNode("div", _hoisted_4$e, [
        _cache[4] || (_cache[4] = createStaticVNode('<div class="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 border border-purple-500/30 mb-12" data-v-f5d4c21b><h2 class="text-2xl font-bold text-white mb-4" data-v-f5d4c21b>📋 项目概述</h2><p class="text-gray-300 mb-4" data-v-f5d4c21b> 使用 OpenClaw AI 代理框架 + 千问 3.5Plus，从零开始搭建深色科技风个人网站。 包含完整的需求分析、设计决策、代码实现和部署流程。 </p><div class="grid md:grid-cols-3 gap-4 mt-6" data-v-f5d4c21b><div class="bg-[#1a1a2e] rounded-xl p-4 border border-white/10" data-v-f5d4c21b><p class="text-gray-400 text-sm" data-v-f5d4c21b>技术栈</p><p class="text-white font-medium" data-v-f5d4c21b>Vue 3 + Vite + Tailwind</p></div><div class="bg-[#1a1a2e] rounded-xl p-4 border border-white/10" data-v-f5d4c21b><p class="text-gray-400 text-sm" data-v-f5d4c21b>AI 工具</p><p class="text-white font-medium" data-v-f5d4c21b>OpenClaw + Qwen3.5-Plus</p></div><div class="bg-[#1a1a2e] rounded-xl p-4 border border-white/10" data-v-f5d4c21b><p class="text-gray-400 text-sm" data-v-f5d4c21b>部署平台</p><p class="text-white font-medium" data-v-f5d4c21b>GitHub Pages</p></div></div></div><section class="mb-12" data-v-f5d4c21b><h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-f5d4c21b><span class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold" data-v-f5d4c21b>1</span> 需求分析 </h2><div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10" data-v-f5d4c21b><h3 class="text-lg font-semibold text-white mb-4" data-v-f5d4c21b>目标</h3><ul class="space-y-3 text-gray-300" data-v-f5d4c21b><li class="flex items-start gap-3" data-v-f5d4c21b><span class="text-purple-400 mt-1" data-v-f5d4c21b>✓</span><span data-v-f5d4c21b>深色科技风设计，区别于常见的白色背景网站</span></li><li class="flex items-start gap-3" data-v-f5d4c21b><span class="text-purple-400 mt-1" data-v-f5d4c21b>✓</span><span data-v-f5d4c21b>响应式布局，完美适配手机和桌面端</span></li><li class="flex items-start gap-3" data-v-f5d4c21b><span class="text-purple-400 mt-1" data-v-f5d4c21b>✓</span><span data-v-f5d4c21b>包含个人介绍、项目展示、博客文章等核心功能</span></li><li class="flex items-start gap-3" data-v-f5d4c21b><span class="text-purple-400 mt-1" data-v-f5d4c21b>✓</span><span data-v-f5d4c21b>免费部署到 GitHub Pages，零成本运维</span></li></ul></div></section><section class="mb-12" data-v-f5d4c21b><h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-f5d4c21b><span class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold" data-v-f5d4c21b>2</span> 技术选型 </h2><div class="space-y-6" data-v-f5d4c21b><div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10" data-v-f5d4c21b><h3 class="text-lg font-semibold text-white mb-4" data-v-f5d4c21b>前端框架</h3><div class="grid md:grid-cols-2 gap-4" data-v-f5d4c21b><div data-v-f5d4c21b><p class="text-purple-400 font-medium mb-2" data-v-f5d4c21b>✅ 最终选择</p><p class="text-gray-300" data-v-f5d4c21b>Vue 3 + Vite + Tailwind CSS v4</p><p class="text-gray-400 text-sm mt-2" data-v-f5d4c21b>理由：快速开发、热更新、现代化工作流</p></div><div data-v-f5d4c21b><p class="text-gray-500 font-medium mb-2" data-v-f5d4c21b>❌ 备选方案</p><p class="text-gray-400" data-v-f5d4c21b>React / Next.js / Nuxt</p></div></div></div><div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10" data-v-f5d4c21b><h3 class="text-lg font-semibold text-white mb-4" data-v-f5d4c21b>AI 辅助</h3><p class="text-gray-300 mb-3" data-v-f5d4c21b>使用 OpenClaw 框架部署在 VPS 上，通过千问 3.5Plus 模型辅助：</p><ul class="space-y-2 text-gray-400" data-v-f5d4c21b><li data-v-f5d4c21b>• 代码生成和优化</li><li data-v-f5d4c21b>• Bug 排查和修复</li><li data-v-f5d4c21b>• 设计建议和文案撰写</li><li data-v-f5d4c21b>• 实时对话式开发</li></ul></div></div></section><section class="mb-12" data-v-f5d4c21b><h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-f5d4c21b><span class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold" data-v-f5d4c21b>3</span> 设计过程 </h2><div class="space-y-6" data-v-f5d4c21b><div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10" data-v-f5d4c21b><h3 class="text-lg font-semibold text-white mb-4" data-v-f5d4c21b>配色方案</h3><div class="grid grid-cols-5 gap-4 mb-4" data-v-f5d4c21b><div class="text-center" data-v-f5d4c21b><div class="w-full aspect-square rounded-lg bg-[#0a0a0f] mb-2 border border-white/10" data-v-f5d4c21b></div><p class="text-xs text-gray-400" data-v-f5d4c21b>#0a0a0f<br data-v-f5d4c21b>主背景</p></div><div class="text-center" data-v-f5d4c21b><div class="w-full aspect-square rounded-lg bg-[#1a1a2e] mb-2 border border-white/10" data-v-f5d4c21b></div><p class="text-xs text-gray-400" data-v-f5d4c21b>#1a1a2e<br data-v-f5d4c21b>次级背景</p></div><div class="text-center" data-v-f5d4c21b><div class="w-full aspect-square rounded-lg bg-[#2a2a3e] mb-2 border border-white/10" data-v-f5d4c21b></div><p class="text-xs text-gray-400" data-v-f5d4c21b>#2a2a3e<br data-v-f5d4c21b>卡片背景</p></div><div class="text-center" data-v-f5d4c21b><div class="w-full aspect-square rounded-lg bg-gradient-to-r from-[#667eea] to-[#764ba2] mb-2" data-v-f5d4c21b></div><p class="text-xs text-gray-400" data-v-f5d4c21b>#667eea<br data-v-f5d4c21b>强调色</p></div><div class="text-center" data-v-f5d4c21b><div class="w-full aspect-square rounded-lg bg-white mb-2" data-v-f5d4c21b></div><p class="text-xs text-gray-400" data-v-f5d4c21b>#ffffff<br data-v-f5d4c21b>文字</p></div></div></div><div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10" data-v-f5d4c21b><h3 class="text-lg font-semibold text-white mb-4" data-v-f5d4c21b>核心设计原则</h3><ul class="space-y-3 text-gray-300" data-v-f5d4c21b><li class="flex items-start gap-3" data-v-f5d4c21b><span class="text-purple-400 font-bold" data-v-f5d4c21b>1.</span><span data-v-f5d4c21b>深色背景 + 高对比度文字，确保可读性</span></li><li class="flex items-start gap-3" data-v-f5d4c21b><span class="text-purple-400 font-bold" data-v-f5d4c21b>2.</span><span data-v-f5d4c21b>紫色渐变作为强调色，营造科技感</span></li><li class="flex items-start gap-3" data-v-f5d4c21b><span class="text-purple-400 font-bold" data-v-f5d4c21b>3.</span><span data-v-f5d4c21b>毛玻璃效果和渐变边框增加层次感</span></li><li class="flex items-start gap-3" data-v-f5d4c21b><span class="text-purple-400 font-bold" data-v-f5d4c21b>4.</span><span data-v-f5d4c21b>流畅的动画和过渡效果提升体验</span></li></ul></div></div></section><section class="mb-12" data-v-f5d4c21b><h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-f5d4c21b><span class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold" data-v-f5d4c21b>4</span> 开发流程 </h2><div class="space-y-6" data-v-f5d4c21b><div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10" data-v-f5d4c21b><h3 class="text-lg font-semibold text-white mb-4" data-v-f5d4c21b>关键步骤</h3><ol class="space-y-4 text-gray-300" data-v-f5d4c21b><li class="flex items-start gap-3" data-v-f5d4c21b><span class="text-purple-400 font-bold" data-v-f5d4c21b>4.1</span><div data-v-f5d4c21b><p class="font-medium" data-v-f5d4c21b>初始化项目</p><p class="text-gray-400 text-sm" data-v-f5d4c21b>npm create vite@latest my-portfolio -- --template vue</p></div></li><li class="flex items-start gap-3" data-v-f5d4c21b><span class="text-purple-400 font-bold" data-v-f5d4c21b>4.2</span><div data-v-f5d4c21b><p class="font-medium" data-v-f5d4c21b>配置 Tailwind CSS v4</p><p class="text-gray-400 text-sm" data-v-f5d4c21b>使用 @import &quot;tailwindcss&quot; 新语法</p></div></li><li class="flex items-start gap-3" data-v-f5d4c21b><span class="text-purple-400 font-bold" data-v-f5d4c21b>4.3</span><div data-v-f5d4c21b><p class="font-medium" data-v-f5d4c21b>创建核心组件</p><p class="text-gray-400 text-sm" data-v-f5d4c21b>导航栏、音乐播放器、背景弹幕等</p></div></li><li class="flex items-start gap-3" data-v-f5d4c21b><span class="text-purple-400 font-bold" data-v-f5d4c21b>4.4</span><div data-v-f5d4c21b><p class="font-medium" data-v-f5d4c21b>实现页面路由</p><p class="text-gray-400 text-sm" data-v-f5d4c21b>Home / About / Projects / Blog</p></div></li><li class="flex items-start gap-3" data-v-f5d4c21b><span class="text-purple-400 font-bold" data-v-f5d4c21b>4.5</span><div data-v-f5d4c21b><p class="font-medium" data-v-f5d4c21b>优化手机端 UI</p><p class="text-gray-400 text-sm" data-v-f5d4c21b>汉堡菜单、响应式布局、触摸优化</p></div></li></ol></div></div></section><section class="mb-12" data-v-f5d4c21b><h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-f5d4c21b><span class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold" data-v-f5d4c21b>5</span> 部署上线 </h2><div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10" data-v-f5d4c21b><h3 class="text-lg font-semibold text-white mb-4" data-v-f5d4c21b>GitHub Pages 部署</h3><div class="space-y-4 text-gray-300" data-v-f5d4c21b><p data-v-f5d4c21b>1. 配置 vite.config.js 设置 base 路径</p><div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto" data-v-f5d4c21b><code class="text-green-400 text-sm" data-v-f5d4c21b>export default defineConfig({<br data-v-f5d4c21b> base: &#39;/myweb/&#39;,<br data-v-f5d4c21b> // ...<br data-v-f5d4c21b>})</code></div><p data-v-f5d4c21b>2. 创建 GitHub Actions 工作流</p><div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto" data-v-f5d4c21b><code class="text-green-400 text-sm" data-v-f5d4c21b>.github/workflows/deploy.yml</code></div><p data-v-f5d4c21b>3. 推送到 GitHub 自动部署</p><div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto" data-v-f5d4c21b><code class="text-green-400 text-sm" data-v-f5d4c21b>git push origin main</code></div><p class="text-purple-400 mt-4" data-v-f5d4c21b>✨ 访问地址：https://superlizi114514.github.io/myweb/</p></div></div></section><section class="mb-12" data-v-f5d4c21b><div class="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 border border-purple-500/30" data-v-f5d4c21b><h2 class="text-2xl font-bold text-white mb-4" data-v-f5d4c21b>🎉 项目总结</h2><p class="text-gray-300 mb-4" data-v-f5d4c21b> 通过 OpenClaw + 千问 3.5Plus 的辅助，从零开始完成了个人网站的搭建。 整个开发过程高效流畅，AI 在代码生成、Bug 修复、设计建议等方面提供了巨大帮助。 </p><div class="grid md:grid-cols-2 gap-4 mt-6" data-v-f5d4c21b><div class="bg-[#1a1a2e] rounded-xl p-4 border border-white/10" data-v-f5d4c21b><p class="text-gray-400 text-sm mb-2" data-v-f5d4c21b>💡 关键收获</p><p class="text-white" data-v-f5d4c21b>AI 辅助开发可以显著提升效率，但需要准确表达需求</p></div><div class="bg-[#1a1a2e] rounded-xl p-4 border border-white/10" data-v-f5d4c21b><p class="text-gray-400 text-sm mb-2" data-v-f5d4c21b>⚠️ 注意事项</p><p class="text-white" data-v-f5d4c21b>深色主题需要特别注意文字对比度，确保可读性</p></div></div></div></section>', 7)),
        createBaseVNode("div", _hoisted_5$e, [
          createVNode(_component_router_link, {
            to: "/blog",
            class: "inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          }, {
            default: withCtx(() => [..._cache[3] || (_cache[3] = [
              createBaseVNode("svg", {
                class: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createBaseVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                })
              ], -1),
              createBaseVNode("span", null, "返回博客列表", -1)
            ])]),
            _: 1
          })
        ])
      ])
    ])
  ]);
}
const WebsiteBuild = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$4], ["__scopeId", "data-v-f5d4c21b"]]);
const _sfc_main$e = {
  name: "ContactInfo",
  data() {
    return {
      qqCopied: false,
      wechatCopied: false,
      qqNumber: "3471023785",
      wechatId: "SiNianNiQWQ",
      mouseX: 0,
      mouseY: 0,
      hoveredCard: null,
      particles: []
    };
  },
  computed: {
    cursorGlowStyle() {
      return {
        left: `${this.mouseX}px`,
        top: `${this.mouseY}px`
      };
    }
  },
  mounted() {
    this.initParticles();
  },
  methods: {
    handleMouseMove(e) {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    },
    initParticles() {
      const colors = ["#22c55e", "#10b981", "#34d399", "#6ee7b7"];
      for (let i = 0; i < 30; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 3 + 1;
        this.particles.push({
          id: i,
          style: {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            boxShadow: `0 0 ${size * 3}px ${color}`,
            animationDuration: `${Math.random() * 20 + 15}s`,
            animationDelay: `${Math.random() * -20}s`
          }
        });
      }
    },
    copyQQ() {
      navigator.clipboard.writeText(this.qqNumber).then(() => {
        this.qqCopied = true;
        setTimeout(() => {
          this.qqCopied = false;
        }, 2e3);
      });
    },
    copyWechat() {
      navigator.clipboard.writeText(this.wechatId).then(() => {
        this.wechatCopied = true;
        setTimeout(() => {
          this.wechatCopied = false;
        }, 2e3);
      });
    }
  }
};
const _hoisted_1$e = { class: "particles-container" };
const _hoisted_2$e = { class: "max-w-2xl mx-auto px-6 py-24 relative z-10" };
const _hoisted_3$d = { class: "space-y-6" };
const _hoisted_4$d = { class: "card-content" };
const _hoisted_5$d = { class: "card-header" };
const _hoisted_6$d = { key: 0 };
const _hoisted_7$c = {
  key: 1,
  class: "copied-text"
};
const _hoisted_8$c = { class: "card-content" };
const _hoisted_9$b = { class: "card-header" };
const _hoisted_10$b = { key: 0 };
const _hoisted_11$a = {
  key: 1,
  class: "copied-text"
};
const _hoisted_12$a = { class: "text-center mt-12" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("div", {
    class: "contact-page",
    onMousemove: _cache[6] || (_cache[6] = (...args) => $options.handleMouseMove && $options.handleMouseMove(...args))
  }, [
    createBaseVNode("div", _hoisted_1$e, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.particles, (particle) => {
        return openBlock(), createElementBlock("div", {
          key: particle.id,
          class: "particle",
          style: normalizeStyle(particle.style)
        }, null, 4);
      }), 128))
    ]),
    createBaseVNode("div", {
      class: "cursor-glow",
      style: normalizeStyle($options.cursorGlowStyle)
    }, null, 4),
    _cache[18] || (_cache[18] = createBaseVNode("div", { class: "bg-decoration" }, [
      createBaseVNode("div", { class: "glow-orb orb-1" }),
      createBaseVNode("div", { class: "glow-orb orb-2" })
    ], -1)),
    createBaseVNode("div", _hoisted_2$e, [
      _cache[16] || (_cache[16] = createStaticVNode('<div class="text-center mb-16" data-v-7ed37f75><div class="inline-block mb-6" data-v-7ed37f75><div class="contact-icon-wrapper" data-v-7ed37f75><div class="contact-icon-ring" data-v-7ed37f75></div><svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7ed37f75><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-7ed37f75></path></svg></div></div><h1 class="text-5xl font-bold mb-4 contact-title" data-v-7ed37f75><span class="title-gradient" data-v-7ed37f75>联系我</span></h1><p class="text-xl text-gray-400" data-v-7ed37f75>有任何需求都可以联系我，期待与你合作</p></div>', 1)),
      createBaseVNode("div", _hoisted_3$d, [
        createBaseVNode("div", {
          class: normalizeClass(["contact-card", { "copied": $data.wechatCopied }]),
          onMouseenter: _cache[1] || (_cache[1] = ($event) => $data.hoveredCard = "wechat"),
          onMouseleave: _cache[2] || (_cache[2] = ($event) => $data.hoveredCard = null)
        }, [
          _cache[10] || (_cache[10] = createBaseVNode("div", { class: "card-glow" }, null, -1)),
          createBaseVNode("div", _hoisted_4$d, [
            createBaseVNode("div", _hoisted_5$d, [
              _cache[7] || (_cache[7] = createStaticVNode('<div class="icon-wrapper wechat" data-v-7ed37f75><svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" data-v-7ed37f75><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .406.33.733.733.733a.816.816 0 0 0 .378-.095l2.597-1.5a.86.86 0 0 1 .695-.095 10.157 10.157 0 0 0 2.511.314c.244 0 .484-.018.724-.035-.733-2.196.144-4.153 1.518-5.355 1.142-1.002 2.855-1.435 4.534-1.435h.012c-.48-2.855-3.475-5.122-7.188-5.122zm-2.54 3.845c.84 0 1.523.684 1.523 1.523 0 .84-.684 1.524-1.523 1.524-.84 0-1.524-.683-1.524-1.523 0-.84.683-1.524 1.524-1.524zm5.575 0c.84 0 1.523.684 1.523 1.523 0 .84-.683 1.524-1.523 1.524-.84 0-1.523-.683-1.523-1.523 0-.84.683-1.524 1.523-1.524zm6.982-.906c-3.801 0-6.885 2.614-6.885 5.838 0 1.763.926 3.35 2.403 4.47a.466.466 0 0 1 .17.528l-.31 1.173c-.015.056-.038.112-.038.169 0 .322.262.582.583.582a.65.65 0 0 0 .3-.075l2.064-1.19a.682.682 0 0 1 .552-.075 8.063 8.063 0 0 0 1.994.249c.194 0 .384-.014.575-.028-.582-1.743.114-3.297 1.205-4.252.907-.795 2.267-1.139 3.601-1.139h.01c-.382-2.266-2.761-4.063-5.709-4.063zm-2.016 3.05c.667 0 1.209.542 1.209 1.209s-.542 1.209-1.209 1.209-1.209-.542-1.209-1.209.542-1.209 1.209-1.209zm4.425 0c.667 0 1.209.542 1.209 1.209s-.542 1.209-1.209 1.209-1.209-.542-1.209-1.209.542-1.209 1.209-1.209z" data-v-7ed37f75></path></svg></div><div class="card-info" data-v-7ed37f75><h2 class="card-title" data-v-7ed37f75>微信</h2><p class="card-subtitle" data-v-7ed37f75>推荐首选</p></div>', 2)),
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = (...args) => $options.copyWechat && $options.copyWechat(...args)),
                class: "copy-btn wechat-btn"
              }, [
                !$data.wechatCopied ? (openBlock(), createElementBlock("span", _hoisted_6$d, "复制")) : (openBlock(), createElementBlock("span", _hoisted_7$c, "✓ 已复制"))
              ])
            ]),
            _cache[8] || (_cache[8] = createBaseVNode("div", { class: "id-display" }, [
              createBaseVNode("span", { class: "id-text" }, "SiNianNiQWQ")
            ], -1)),
            _cache[9] || (_cache[9] = createBaseVNode("div", { class: "card-hint" }, [
              createBaseVNode("span", { class: "hint-icon" }, "💡"),
              createBaseVNode("span", null, "添加时请备注来意，我会尽快通过")
            ], -1))
          ])
        ], 34),
        createBaseVNode("div", {
          class: normalizeClass(["contact-card", { "copied": $data.qqCopied }]),
          onMouseenter: _cache[4] || (_cache[4] = ($event) => $data.hoveredCard = "qq"),
          onMouseleave: _cache[5] || (_cache[5] = ($event) => $data.hoveredCard = null)
        }, [
          _cache[14] || (_cache[14] = createBaseVNode("div", { class: "card-glow" }, null, -1)),
          createBaseVNode("div", _hoisted_8$c, [
            createBaseVNode("div", _hoisted_9$b, [
              _cache[11] || (_cache[11] = createStaticVNode('<div class="icon-wrapper qq" data-v-7ed37f75><svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" data-v-7ed37f75><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.774 9.214c-.13.65-.506.813-1.037.52l-2.875-2.116-1.388 1.335c-.153.153-.283.283-.58.283l.207-2.932 5.33-4.813c.23-.204-.052-.318-.356-.108l-6.601 4.156-2.846-.89c-.62-.195-.633-.623.13-.925l11.11-4.275c.515-.195.964.12.816.852z" data-v-7ed37f75></path></svg></div><div class="card-info" data-v-7ed37f75><h2 class="card-title" data-v-7ed37f75>QQ</h2><p class="card-subtitle" data-v-7ed37f75>在线时间较长</p></div>', 2)),
              createBaseVNode("button", {
                onClick: _cache[3] || (_cache[3] = (...args) => $options.copyQQ && $options.copyQQ(...args)),
                class: "copy-btn qq-btn"
              }, [
                !$data.qqCopied ? (openBlock(), createElementBlock("span", _hoisted_10$b, "复制")) : (openBlock(), createElementBlock("span", _hoisted_11$a, "✓ 已复制"))
              ])
            ]),
            _cache[12] || (_cache[12] = createBaseVNode("div", { class: "id-display" }, [
              createBaseVNode("span", { class: "id-text" }, "3471023785")
            ], -1)),
            _cache[13] || (_cache[13] = createBaseVNode("div", { class: "card-hint" }, [
              createBaseVNode("span", { class: "hint-icon" }, "💡"),
              createBaseVNode("span", null, "QQ在线时间更长，消息回复更及时")
            ], -1))
          ])
        ], 34)
      ]),
      _cache[17] || (_cache[17] = createStaticVNode('<div class="tips-section" data-v-7ed37f75><div class="tips-card" data-v-7ed37f75><h3 class="tips-title" data-v-7ed37f75><span class="tips-icon" data-v-7ed37f75>⚡</span> 快速响应 </h3><div class="tips-grid" data-v-7ed37f75><div class="tip-item" data-v-7ed37f75><span class="tip-emoji" data-v-7ed37f75>🎨</span><span data-v-7ed37f75>网页开发</span></div><div class="tip-item" data-v-7ed37f75><span class="tip-emoji" data-v-7ed37f75>🤖</span><span data-v-7ed37f75>AI 定制</span></div><div class="tip-item" data-v-7ed37f75><span class="tip-emoji" data-v-7ed37f75>💻</span><span data-v-7ed37f75>代码服务</span></div><div class="tip-item" data-v-7ed37f75><span class="tip-emoji" data-v-7ed37f75>🚀</span><span data-v-7ed37f75>技术咨询</span></div></div></div></div>', 1)),
      createBaseVNode("div", _hoisted_12$a, [
        createVNode(_component_router_link, {
          to: "/",
          class: "back-link"
        }, {
          default: withCtx(() => [..._cache[15] || (_cache[15] = [
            createBaseVNode("svg", {
              class: "w-5 h-5",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24"
            }, [
              createBaseVNode("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M10 19l-7-7m0 0l7-7m-7 7h18"
              })
            ], -1),
            createBaseVNode("span", null, "返回首页", -1)
          ])]),
          _: 1
        })
      ])
    ])
  ], 32);
}
const ContactInfo = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$3], ["__scopeId", "data-v-7ed37f75"]]);
const _sfc_main$d = {
  name: "ShanxinHeihongbang"
};
const _hoisted_1$d = { class: "shanxin-page" };
const _hoisted_2$d = { class: "max-w-6xl mx-auto px-6 py-24" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$d, [
    createBaseVNode("div", _hoisted_2$d, [
      createBaseVNode("button", {
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$router.back()),
        class: "mb-8 inline-flex items-center text-gray-400 hover:text-white transition-colors"
      }, " ← 返回 "),
      _cache[1] || (_cache[1] = createStaticVNode('<div class="text-center mb-16" data-v-c810b680><div class="inline-flex items-center gap-3 mb-6" data-v-c810b680><span class="text-5xl" data-v-c810b680>🎯</span><h1 class="text-5xl font-bold text-white" data-v-c810b680>山信黑红榜</h1><span class="text-5xl" data-v-c810b680>🏆</span></div><p class="text-xl text-gray-400 mb-2" data-v-c810b680>山东信息职业技术学院红黑榜平台</p><div class="inline-block bg-yellow-500/20 border border-yellow-500/40 rounded-full px-4 py-1 mb-4" data-v-c810b680><span class="text-yellow-400 text-sm" data-v-c810b680>⚠️ 仅展示，已暂停运营</span></div><div class="flex justify-center gap-4 flex-wrap" data-v-c810b680><a href="https://github.com/superlizi114514/shanxin-heihongbang" target="_blank" class="inline-flex items-center gap-2 bg-[#2a2a3e] text-white px-6 py-3 rounded-full font-medium border border-white/10 hover:border-purple-500/50 transition-colors" data-v-c810b680> ⭐ 查看源代码 </a></div></div><div class="grid md:grid-cols-3 gap-6 mb-16" data-v-c810b680><div class="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-2xl p-6 border border-purple-500/20" data-v-c810b680><div class="text-3xl mb-3" data-v-c810b680>📱</div><h3 class="text-white font-bold mb-2" data-v-c810b680>技术栈</h3><p class="text-gray-400 text-sm" data-v-c810b680>Vue3 + Vite + Node.js + TypeScript + Cloudflare D1</p></div><div class="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-2xl p-6 border border-purple-500/20" data-v-c810b680><div class="text-3xl mb-3" data-v-c810b680>🚀</div><h3 class="text-white font-bold mb-2" data-v-c810b680>部署平台</h3><p class="text-gray-400 text-sm" data-v-c810b680>Vercel 全球边缘网络 + Cloudflare Pages</p></div><div class="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-2xl p-6 border border-purple-500/20" data-v-c810b680><div class="text-3xl mb-3" data-v-c810b680>💾</div><h3 class="text-white font-bold mb-2" data-v-c810b680>数据库</h3><p class="text-gray-400 text-sm" data-v-c810b680>Cloudflare D1 (SQLite) + Vercel Blob 图片存储</p></div></div><div class="mb-16" data-v-c810b680><h2 class="text-3xl font-bold text-white mb-8 text-center" data-v-c810b680>核心功能</h2><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-c810b680><div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10" data-v-c810b680><div class="text-2xl mb-3" data-v-c810b680>👤</div><h3 class="text-white font-bold mb-2" data-v-c810b680>人员点评</h3><p class="text-gray-400 text-sm" data-v-c810b680>支持学生/老师身份选择，红榜黑榜分类点评，可上传图片</p></div><div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10" data-v-c810b680><div class="text-2xl mb-3" data-v-c810b680>🏪</div><h3 class="text-white font-bold mb-2" data-v-c810b680>商家点评</h3><p class="text-gray-400 text-sm" data-v-c810b680>学校周边商家评价系统，帮助同学避坑选好店</p></div><div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10" data-v-c810b680><div class="text-2xl mb-3" data-v-c810b680>👍</div><h3 class="text-white font-bold mb-2" data-v-c810b680>点赞互动</h3><p class="text-gray-400 text-sm" data-v-c810b680>点评点赞功能，1 赞=1 小票，防重复点赞设计</p></div><div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10" data-v-c810b680><div class="text-2xl mb-3" data-v-c810b680>📊</div><h3 class="text-white font-bold mb-2" data-v-c810b680>排行榜</h3><p class="text-gray-400 text-sm" data-v-c810b680>人员/商家热度榜单，按点评数和点赞数排序</p></div><div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10" data-v-c810b680><div class="text-2xl mb-3" data-v-c810b680>💰</div><h3 class="text-white font-bold mb-2" data-v-c810b680>赞助系统</h3><p class="text-gray-400 text-sm" data-v-c810b680>VIP/SVIP/MVIP 会员赞助，支持自定义赞助展示</p></div><div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10" data-v-c810b680><div class="text-2xl mb-3" data-v-c810b680>🎁</div><h3 class="text-white font-bold mb-2" data-v-c810b680>兑换码</h3><p class="text-gray-400 text-sm" data-v-c810b680>兑换码奖励系统，支持 VIP 天数、点评次数等奖励</p></div><div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10" data-v-c810b680><div class="text-2xl mb-3" data-v-c810b680>📸</div><h3 class="text-white font-bold mb-2" data-v-c810b680>图片上传</h3><p class="text-gray-400 text-sm" data-v-c810b680>点评支持配图，Vercel Blob 存储，支持放大预览</p></div><div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10" data-v-c810b680><div class="text-2xl mb-3" data-v-c810b680>🔍</div><h3 class="text-white font-bold mb-2" data-v-c810b680>搜索功能</h3><p class="text-gray-400 text-sm" data-v-c810b680>支持按关键词、类型搜索人员和商家</p></div><div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10" data-v-c810b680><div class="text-2xl mb-3" data-v-c810b680>🛡️</div><h3 class="text-white font-bold mb-2" data-v-c810b680>举报管理</h3><p class="text-gray-400 text-sm" data-v-c810b680>用户举报 + 管理员审核机制，维护社区环境</p></div></div></div><div class="mb-16" data-v-c810b680><h2 class="text-3xl font-bold text-white mb-8 text-center" data-v-c810b680>更新日志</h2><div class="space-y-4" data-v-c810b680><div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10" data-v-c810b680><div class="flex items-center gap-4 mb-3" data-v-c810b680><span class="text-purple-400 font-bold" data-v-c810b680>2026-03-14</span><span class="text-xs text-gray-500" data-v-c810b680>最新版本</span></div><ul class="text-gray-400 text-sm space-y-1" data-v-c810b680><li data-v-c810b680>✨ 新增兑换码功能：VIP 天数、SVIP 天数、MVIP 天数、重置点评次数、自定义称号</li><li data-v-c810b680>✨ 管理后台兑换码管理：批量生成、使用限制、有效期设置</li><li data-v-c810b680>✨ 图片上传功能：点评支持配图，Vercel Blob 存储</li></ul></div><div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10" data-v-c810b680><div class="flex items-center gap-4 mb-3" data-v-c810b680><span class="text-purple-400 font-bold" data-v-c810b680>2026-03-13</span></div><ul class="text-gray-400 text-sm space-y-1" data-v-c810b680><li data-v-c810b680>✨ 人员点评点赞功能：防重复点赞，1 赞=1 小票</li><li data-v-c810b680>✨ 人员身份选项：学生/老师分类</li><li data-v-c810b680>🐛 修复票数扣减时区 BUG</li></ul></div><div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10" data-v-c810b680><div class="flex items-center gap-4 mb-3" data-v-c810b680><span class="text-purple-400 font-bold" data-v-c810b680>2026-03-12</span></div><ul class="text-gray-400 text-sm space-y-1" data-v-c810b680><li data-v-c810b680>🐛 修复 D1 SQLite 兼容性问题</li><li data-v-c810b680>🐛 修复赞助管理加载失败</li><li data-v-c810b680>✨ 添加页面加载状态提示</li></ul></div></div></div><div class="mb-16" data-v-c810b680><h2 class="text-3xl font-bold text-white mb-8 text-center" data-v-c810b680>项目介绍</h2><div class="bg-[#1a1a2e] rounded-xl p-8 border border-purple-500/10" data-v-c810b680><p class="text-gray-300 text-lg leading-relaxed mb-4" data-v-c810b680> 山信黑红榜是一个校园点评平台，为山东信息职业技术学院师生提供人员点评、商家评价、排行榜等互动功能。 </p><p class="text-gray-400 text-base leading-relaxed" data-v-c810b680> 本项目采用前后端分离架构，前端使用 Vue3 + Vite + Vant UI，后端使用 Node.js + TypeScript， 数据库采用 Cloudflare D1 (SQLite)，图片存储使用 Vercel Blob。项目已暂停运营，此处仅作技术展示。 </p></div></div><div class="mb-16" data-v-c810b680><h2 class="text-3xl font-bold text-white mb-8 text-center" data-v-c810b680>技术亮点</h2><div class="grid md:grid-cols-2 gap-6" data-v-c810b680><div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10" data-v-c810b680><h3 class="text-white font-bold mb-3" data-v-c810b680>🚀 Cloudflare D1 数据库</h3><p class="text-gray-400 text-sm" data-v-c810b680>使用 Cloudflare D1 边缘数据库，解决 SQLite 兼容性问题，支持 RETURNING 语法适配，时区处理优化（UTC+8）</p></div><div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10" data-v-c810b680><h3 class="text-white font-bold mb-3" data-v-c810b680>☁️ Vercel 全球部署</h3><p class="text-gray-400 text-sm" data-v-c810b680>前后端分离部署，使用 Vercel Token 自动化部署，边缘网络加速全球访问</p></div><div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10" data-v-c810b680><h3 class="text-white font-bold mb-3" data-v-c810b680>📦 Vercel Blob 图片存储</h3><p class="text-gray-400 text-sm" data-v-c810b680>人员点评支持上传图片，最大 5MB，支持 JPG/PNG/GIF/WEBP 格式，公共访问配置</p></div><div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10" data-v-c810b680><h3 class="text-white font-bold mb-3" data-v-c810b680>🔐 邮箱验证码登录</h3><p class="text-gray-400 text-sm" data-v-c810b680>图形验证码 + 邮箱验证码双重验证，支持手机号可选绑定，邀请码系统</p></div></div></div><div class="text-center" data-v-c810b680><h2 class="text-2xl font-bold text-white mb-4" data-v-c810b680>感兴趣吗？</h2><p class="text-gray-400 mb-6" data-v-c810b680>查看源代码了解更多技术细节</p><div class="flex justify-center gap-4 flex-wrap" data-v-c810b680><a href="https://github.com/superlizi114514/shanxin-heihongbang" target="_blank" class="inline-flex items-center gap-2 bg-[#2a2a3e] text-white px-8 py-4 rounded-full font-medium border border-white/10 hover:border-purple-500/50 transition-colors" data-v-c810b680> 📄 查看源代码 </a></div></div>', 7))
    ])
  ]);
}
const ShanxinHeihongbang = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$2], ["__scopeId", "data-v-c810b680"]]);
const _hoisted_1$c = { class: "shopping-template" };
const _hoisted_2$c = { class: "category-nav" };
const _hoisted_3$c = { class: "products" };
const _hoisted_4$c = { class: "product-grid" };
const _hoisted_5$c = {
  key: 0,
  class: "product-tag"
};
const _hoisted_6$c = { class: "product-info" };
const _hoisted_7$b = { class: "product-name" };
const _hoisted_8$b = { class: "product-desc" };
const _hoisted_9$a = { class: "product-price" };
const _hoisted_10$a = { class: "current-price" };
const _hoisted_11$9 = {
  key: 0,
  class: "original-price"
};
const _hoisted_12$9 = { class: "product-sales" };
const _sfc_main$c = {
  __name: "ShoppingTemplate",
  setup(__props) {
    const categories = /* @__PURE__ */ ref([
      { name: "全部" },
      { name: "上装" },
      { name: "下装" },
      { name: "鞋靴" },
      { name: "箱包" },
      { name: "配饰" }
    ]);
    const products = /* @__PURE__ */ ref([
      { name: "简约纯棉T恤 透气舒适多色可选", desc: "春季新款", price: 99, originalPrice: 159, sales: 2341, color: "linear-gradient(135deg, #667eea, #764ba2)", tag: "热卖" },
      { name: "休闲工装裤 耐磨面料宽松版型", desc: "工装风", price: 189, sales: 1856, color: "linear-gradient(135deg, #f093fb, #f5576c)" },
      { name: "复古运动鞋 轻便舒适百搭款式", desc: "复古风", price: 299, originalPrice: 399, sales: 3421, color: "linear-gradient(135deg, #4facfe, #00f2fe)", tag: "新品" },
      { name: "帆布双肩包 大容量防水面料", desc: "学生款", price: 159, sales: 987, color: "linear-gradient(135deg, #43e97b, #38f9d7)" },
      { name: "简约帆布带手表 日系风格防水", desc: "日系风", price: 199, sales: 1543, color: "linear-gradient(135deg, #fa709a, #fee140)" },
      { name: "棒球帽 防晒透气可调节", desc: "四季款", price: 69, sales: 2156, color: "linear-gradient(135deg, #a18cd1, #fbc2eb)" },
      { name: "针织开衫 春秋薄款百搭", desc: "春秋款", price: 149, originalPrice: 199, sales: 876, color: "linear-gradient(135deg, #ffecd2, #fcb69f)", tag: "折扣" },
      { name: "牛仔裤 修身显瘦弹力", desc: "修身款", price: 179, sales: 1234, color: "linear-gradient(135deg, #2c3e50, #4a69bd)" }
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$c, [
        _cache[1] || (_cache[1] = createStaticVNode('<nav class="navbar" data-v-f3187bd9><div class="logo" data-v-f3187bd9>潮流商城</div><div class="search-bar" data-v-f3187bd9><input type="text" placeholder="搜索商品..." data-v-f3187bd9><button data-v-f3187bd9>搜索</button></div><div class="nav-actions" data-v-f3187bd9><a data-v-f3187bd9>登录</a><a data-v-f3187bd9>购物车(0)</a></div></nav>', 1)),
        createBaseVNode("div", _hoisted_2$c, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(categories.value, (cat, i) => {
            return openBlock(), createElementBlock("a", {
              key: i,
              class: normalizeClass(["cat-link", { active: i === 0 }])
            }, toDisplayString(cat.name), 3);
          }), 128))
        ]),
        _cache[2] || (_cache[2] = createBaseVNode("section", { class: "promo-banner" }, [
          createBaseVNode("div", { class: "promo-content" }, [
            createBaseVNode("span", { class: "promo-tag" }, "限时特惠"),
            createBaseVNode("span", { class: "promo-text" }, "春季新品上市 全场满299包邮")
          ])
        ], -1)),
        createBaseVNode("section", _hoisted_3$c, [
          _cache[0] || (_cache[0] = createBaseVNode("div", { class: "products-header" }, [
            createBaseVNode("h2", null, "全部商品"),
            createBaseVNode("div", { class: "sort-options" }, [
              createBaseVNode("span", { class: "sort-label" }, "排序："),
              createBaseVNode("a", { class: "active" }, "综合"),
              createBaseVNode("a", null, "销量"),
              createBaseVNode("a", null, "价格"),
              createBaseVNode("a", null, "新品")
            ])
          ], -1)),
          createBaseVNode("div", _hoisted_4$c, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(products.value, (product, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "product-card",
                style: normalizeStyle({ animationDelay: i * 0.05 + "s" })
              }, [
                createBaseVNode("div", {
                  class: "product-image",
                  style: normalizeStyle({ background: product.color })
                }, [
                  product.tag ? (openBlock(), createElementBlock("span", _hoisted_5$c, toDisplayString(product.tag), 1)) : createCommentVNode("", true)
                ], 4),
                createBaseVNode("div", _hoisted_6$c, [
                  createBaseVNode("h3", _hoisted_7$b, toDisplayString(product.name), 1),
                  createBaseVNode("p", _hoisted_8$b, toDisplayString(product.desc), 1),
                  createBaseVNode("div", _hoisted_9$a, [
                    createBaseVNode("span", _hoisted_10$a, "¥" + toDisplayString(product.price), 1),
                    product.originalPrice ? (openBlock(), createElementBlock("span", _hoisted_11$9, "¥" + toDisplayString(product.originalPrice), 1)) : createCommentVNode("", true)
                  ]),
                  createBaseVNode("div", _hoisted_12$9, "已售 " + toDisplayString(product.sales) + "+", 1)
                ])
              ], 4);
            }), 128))
          ])
        ]),
        _cache[3] || (_cache[3] = createBaseVNode("footer", { class: "footer" }, [
          createBaseVNode("div", { class: "footer-content" }, [
            createBaseVNode("p", null, "© 2024 潮流商城"),
            createBaseVNode("div", { class: "footer-links" }, [
              createBaseVNode("a", null, "关于我们"),
              createBaseVNode("a", null, "联系客服"),
              createBaseVNode("a", null, "退换货政策")
            ])
          ])
        ], -1))
      ]);
    };
  }
};
const ShoppingTemplate = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-f3187bd9"]]);
const _hoisted_1$b = { class: "corporate-template" };
const _hoisted_2$b = { class: "navbar" };
const _hoisted_3$b = { class: "nav-container" };
const _hoisted_4$b = { class: "nav-menu" };
const _hoisted_5$b = { class: "hero" };
const _hoisted_6$b = { class: "hero-content" };
const _hoisted_7$a = { class: "hero-buttons animate-scale-in" };
const _hoisted_8$a = { class: "hero-stats animate-slide-up" };
const _hoisted_9$9 = { class: "stat-value" };
const _hoisted_10$9 = { class: "stat-label" };
const _hoisted_11$8 = { class: "partners" };
const _hoisted_12$8 = { class: "partner-logos" };
const _hoisted_13$8 = { class: "services" };
const _hoisted_14$8 = { class: "services-grid" };
const _hoisted_15$8 = { class: "service-icon" };
const _hoisted_16$8 = { class: "service-features" };
const _hoisted_17$8 = { class: "solutions" };
const _hoisted_18$7 = { class: "solutions-grid" };
const _hoisted_19$6 = { class: "sol-icon" };
const _hoisted_20$6 = { class: "cases" };
const _hoisted_21$5 = { class: "cases-grid" };
const _hoisted_22$5 = { class: "case-icon" };
const _hoisted_23$5 = { class: "case-body" };
const _hoisted_24$5 = { class: "case-industry" };
const _hoisted_25$5 = { class: "case-results" };
const _hoisted_26$5 = { class: "result-value" };
const _hoisted_27$4 = { class: "result-label" };
const _hoisted_28$4 = { class: "tech-stack" };
const _hoisted_29$4 = { class: "tech-grid" };
const _hoisted_30$4 = { class: "tech-icon" };
const _hoisted_31$4 = { class: "tech-name" };
const _hoisted_32$4 = { class: "about" };
const _hoisted_33$4 = { class: "about-content" };
const _hoisted_34$4 = { class: "about-text" };
const _hoisted_35$4 = { class: "about-features" };
const _hoisted_36$4 = { class: "about-visual" };
const _hoisted_37$4 = { class: "visual-card" };
const _hoisted_38$4 = { class: "visual-value" };
const _hoisted_39$4 = { class: "visual-label" };
const _hoisted_40$4 = { class: "team" };
const _hoisted_41$4 = { class: "team-grid" };
const _hoisted_42$4 = { class: "member-avatar" };
const _hoisted_43$4 = { class: "member-role" };
const _hoisted_44$4 = { class: "member-desc" };
const _hoisted_45$4 = { class: "footer" };
const _hoisted_46$3 = { class: "footer-main" };
const _hoisted_47$3 = { class: "footer-links" };
const _sfc_main$b = {
  __name: "CorporateTemplate",
  setup(__props) {
    const navItems = ["首页", "服务", "案例", "关于", "联系"];
    const showConsult = /* @__PURE__ */ ref(false);
    const stats = /* @__PURE__ */ ref([
      { value: "200+", label: "服务客户" },
      { value: "50+", label: "技术团队" },
      { value: "98%", label: "客户满意度" },
      { value: "5年", label: "行业经验" }
    ]);
    const partners = /* @__PURE__ */ ref(["华为", "阿里", "腾讯", "百度", "京东", "字节"]);
    const services = /* @__PURE__ */ ref([
      { icon: "💻", title: "软件开发", desc: "定制化软件开发，满足企业个性化需求", features: ["需求分析", "架构设计", "开发测试", "运维支持"] },
      { icon: "🔗", title: "系统集成", desc: "打通企业各系统，实现数据互联互通", features: ["数据对接", "流程优化", "平台整合", "统一门户"] },
      { icon: "📊", title: "数据分析", desc: "数据采集、清洗、可视化一站式服务", features: ["数据采集", "数据治理", "可视化大屏", "BI报表"] },
      { icon: "☁️", title: "云服务", desc: "云架构设计、迁移、运维全流程支持", features: ["云架构设计", "系统迁移", "云原生改造", "运维托管"] },
      { icon: "🔒", title: "安全服务", desc: "网络安全评估、防护体系建设", features: ["安全评估", "渗透测试", "安全加固", "应急响应"] },
      { icon: "🛠️", title: "技术支持", desc: "7×24小时技术支持，快速响应", features: ["技术咨询", "故障处理", "性能优化", "驻场服务"] }
    ]);
    const solutions = /* @__PURE__ */ ref([
      { icon: "🏦", title: "金融科技", desc: "数字银行、智能风控、支付系统", bg: "linear-gradient(135deg, #1a1a2e, #16213e)" },
      { icon: "🏭", title: "智能制造", desc: "MES系统、工业物联网、数字工厂", bg: "linear-gradient(135deg, #0f3460, #16213e)" },
      { icon: "🛒", title: "新零售", desc: "电商系统、会员营销、供应链管理", bg: "linear-gradient(135deg, #2c3e50, #3498db)" },
      { icon: "🏥", title: "医疗健康", desc: "HIS系统、远程医疗、健康管理", bg: "linear-gradient(135deg, #27ae60, #2ecc71)" }
    ]);
    const cases = /* @__PURE__ */ ref([
      { icon: "🏦", industry: "金融", title: "某银行数字化转型项目", desc: "为客户提供完整的数字化银行解决方案，实现业务线上化、智能化。", bg: "linear-gradient(135deg, #1a1a2e, #16213e)", results: [{ value: "60%", label: "效率提升" }, { value: "40%", label: "成本降低" }] },
      { icon: "🏭", industry: "制造", title: "某汽车厂商MES系统", desc: "打造智能化生产管理系统，实现生产过程可视化和质量追溯。", bg: "linear-gradient(135deg, #0f3460, #16213e)", results: [{ value: "30%", label: "产能提升" }, { value: "50%", label: "缺陷降低" }] },
      { icon: "🛒", industry: "零售", title: "某连锁品牌电商系统", desc: "构建全渠道零售平台，打通线上线下业务闭环。", bg: "linear-gradient(135deg, #2c3e50, #3498db)", results: [{ value: "200%", label: "销售增长" }, { value: "80%", label: "复购提升" }] }
    ]);
    const techStack = /* @__PURE__ */ ref([
      { icon: "⚛️", name: "React/Vue" },
      { icon: "🟢", name: "Node.js" },
      { icon: "☕", name: "Java" },
      { icon: "🐍", name: "Python" },
      { icon: "🔷", name: "Go" },
      { icon: "🗄️", name: "MySQL" },
      { icon: "🍃", name: "MongoDB" },
      { icon: "🔴", name: "Redis" },
      { icon: "🐳", name: "Docker" },
      { icon: "☸️", name: "K8s" },
      { icon: "☁️", name: "AWS/阿里云" },
      { icon: "📡", name: "微服务" }
    ]);
    const features = /* @__PURE__ */ ref(["K8s原生支持", "自动运维", "按量计费", "7×24技术支持"]);
    const visualStats = /* @__PURE__ */ ref([
      { value: "50+", label: "技术专家" },
      { value: "200+", label: "成功案例" },
      { value: "98%", label: "满意度" }
    ]);
    const team = /* @__PURE__ */ ref([
      { avatar: "👨‍💼", name: "张明", role: "创始人 & CEO", desc: "前阿里技术总监，15年技术管理经验" },
      { avatar: "👨‍💻", name: "李强", role: "CTO", desc: "前华为架构师，专注分布式系统" },
      { avatar: "👩‍💼", name: "王芳", role: "产品总监", desc: "10年产品经验，擅长企业服务" }
    ]);
    const footerGroups = /* @__PURE__ */ ref([
      { title: "服务项目", links: ["软件开发", "系统集成", "数据分析", "云服务"] },
      { title: "解决方案", links: ["金融科技", "智能制造", "新零售", "医疗健康"] },
      { title: "关于我们", links: ["公司介绍", "团队成员", "发展历程", "加入我们"] }
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$b, [
        createBaseVNode("nav", _hoisted_2$b, [
          createBaseVNode("div", _hoisted_3$b, [
            _cache[1] || (_cache[1] = createBaseVNode("div", { class: "logo" }, [
              createBaseVNode("span", { class: "logo-icon" }, "◈"),
              createBaseVNode("span", { class: "logo-text" }, "智领科技")
            ], -1)),
            createBaseVNode("div", _hoisted_4$b, [
              (openBlock(), createElementBlock(Fragment, null, renderList(navItems, (item, i) => {
                return createBaseVNode("a", {
                  key: i,
                  class: normalizeClass({ active: i === 0 })
                }, toDisplayString(item), 3);
              }), 64))
            ]),
            _cache[2] || (_cache[2] = createBaseVNode("button", { class: "cta-btn" }, "免费咨询", -1))
          ])
        ]),
        createBaseVNode("section", _hoisted_5$b, [
          _cache[5] || (_cache[5] = createBaseVNode("div", { class: "hero-visual" }, [
            createBaseVNode("div", { class: "grid-bg" }),
            createBaseVNode("div", { class: "glow-orb orb-1" }),
            createBaseVNode("div", { class: "glow-orb orb-2" })
          ], -1)),
          createBaseVNode("div", _hoisted_6$b, [
            _cache[4] || (_cache[4] = createStaticVNode('<div class="hero-badge animate-slide-down" data-v-c4efc03a>企业级解决方案提供商</div><h1 class="animate-slide-up" data-v-c4efc03a><span class="line1" data-v-c4efc03a>数字化转型</span><span class="line2" data-v-c4efc03a>技术服务商</span></h1><p class="animate-fade-in" data-v-c4efc03a>为企业提供软件开发、系统集成、技术咨询等一站式服务</p>', 3)),
            createBaseVNode("div", _hoisted_7$a, [
              createBaseVNode("button", {
                class: "btn-primary",
                onClick: _cache[0] || (_cache[0] = ($event) => showConsult.value = true)
              }, "免费咨询"),
              _cache[3] || (_cache[3] = createBaseVNode("button", { class: "btn-outline" }, "查看案例", -1))
            ])
          ]),
          createBaseVNode("div", _hoisted_8$a, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(stats.value, (stat, i) => {
              return openBlock(), createElementBlock("div", {
                class: "stat",
                key: i
              }, [
                createBaseVNode("span", _hoisted_9$9, toDisplayString(stat.value), 1),
                createBaseVNode("span", _hoisted_10$9, toDisplayString(stat.label), 1)
              ]);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_11$8, [
          _cache[6] || (_cache[6] = createBaseVNode("p", null, "信赖我们的企业", -1)),
          createBaseVNode("div", _hoisted_12$8, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(partners.value, (p2, i) => {
              return openBlock(), createElementBlock("span", {
                key: i,
                class: "partner-logo"
              }, toDisplayString(p2), 1);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_13$8, [
          _cache[8] || (_cache[8] = createBaseVNode("div", { class: "section-header" }, [
            createBaseVNode("span", { class: "section-label" }, "Services"),
            createBaseVNode("h2", null, "核心服务"),
            createBaseVNode("p", null, "全方位的技术解决方案，助力企业数字化升级")
          ], -1)),
          createBaseVNode("div", _hoisted_14$8, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(services.value, (service, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "service-card",
                style: normalizeStyle({ animationDelay: i * 0.1 + "s" })
              }, [
                createBaseVNode("div", _hoisted_15$8, toDisplayString(service.icon), 1),
                createBaseVNode("h3", null, toDisplayString(service.title), 1),
                createBaseVNode("p", null, toDisplayString(service.desc), 1),
                createBaseVNode("ul", _hoisted_16$8, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(service.features, (f, j) => {
                    return openBlock(), createElementBlock("li", { key: j }, toDisplayString(f), 1);
                  }), 128))
                ]),
                _cache[7] || (_cache[7] = createBaseVNode("button", { class: "service-btn" }, "了解详情", -1))
              ], 4);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_17$8, [
          _cache[10] || (_cache[10] = createBaseVNode("div", { class: "section-header" }, [
            createBaseVNode("span", { class: "section-label" }, "Solutions"),
            createBaseVNode("h2", null, "行业解决方案")
          ], -1)),
          createBaseVNode("div", _hoisted_18$7, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(solutions.value, (sol, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "solution-card",
                style: normalizeStyle({ background: sol.bg })
              }, [
                createBaseVNode("span", _hoisted_19$6, toDisplayString(sol.icon), 1),
                createBaseVNode("h3", null, toDisplayString(sol.title), 1),
                createBaseVNode("p", null, toDisplayString(sol.desc), 1),
                _cache[9] || (_cache[9] = createBaseVNode("a", { class: "sol-link" }, "查看方案 →", -1))
              ], 4);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_20$6, [
          _cache[11] || (_cache[11] = createBaseVNode("div", { class: "section-header" }, [
            createBaseVNode("span", { class: "section-label" }, "Cases"),
            createBaseVNode("h2", null, "成功案例")
          ], -1)),
          createBaseVNode("div", _hoisted_21$5, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(cases.value, (c, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "case-card",
                style: normalizeStyle({ animationDelay: i * 0.1 + "s" })
              }, [
                createBaseVNode("div", {
                  class: "case-header",
                  style: normalizeStyle({ background: c.bg })
                }, [
                  createBaseVNode("span", _hoisted_22$5, toDisplayString(c.icon), 1)
                ], 4),
                createBaseVNode("div", _hoisted_23$5, [
                  createBaseVNode("span", _hoisted_24$5, toDisplayString(c.industry), 1),
                  createBaseVNode("h3", null, toDisplayString(c.title), 1),
                  createBaseVNode("p", null, toDisplayString(c.desc), 1),
                  createBaseVNode("div", _hoisted_25$5, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(c.results, (r, j) => {
                      return openBlock(), createElementBlock("div", {
                        key: j,
                        class: "result-item"
                      }, [
                        createBaseVNode("span", _hoisted_26$5, toDisplayString(r.value), 1),
                        createBaseVNode("span", _hoisted_27$4, toDisplayString(r.label), 1)
                      ]);
                    }), 128))
                  ])
                ])
              ], 4);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_28$4, [
          _cache[12] || (_cache[12] = createBaseVNode("div", { class: "section-header" }, [
            createBaseVNode("span", { class: "section-label" }, "Tech Stack"),
            createBaseVNode("h2", null, "技术能力")
          ], -1)),
          createBaseVNode("div", _hoisted_29$4, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(techStack.value, (tech, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "tech-item"
              }, [
                createBaseVNode("span", _hoisted_30$4, toDisplayString(tech.icon), 1),
                createBaseVNode("span", _hoisted_31$4, toDisplayString(tech.name), 1)
              ]);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_32$4, [
          createBaseVNode("div", _hoisted_33$4, [
            createBaseVNode("div", _hoisted_34$4, [
              _cache[14] || (_cache[14] = createBaseVNode("span", { class: "section-label" }, "About Us", -1)),
              _cache[15] || (_cache[15] = createBaseVNode("h2", null, "关于智领科技", -1)),
              _cache[16] || (_cache[16] = createBaseVNode("p", null, "智领科技成立于2018年，是一家专注于企业数字化转型的技术服务公司。我们拥有50+技术工程师，服务超过200家企业客户，覆盖金融、制造、零售、医疗等多个行业。", -1)),
              createBaseVNode("div", _hoisted_35$4, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(features.value, (f, i) => {
                  return openBlock(), createElementBlock("div", {
                    class: "feature",
                    key: i
                  }, [
                    _cache[13] || (_cache[13] = createBaseVNode("span", { class: "check" }, "✓", -1)),
                    createBaseVNode("span", null, toDisplayString(f), 1)
                  ]);
                }), 128))
              ]),
              _cache[17] || (_cache[17] = createBaseVNode("button", { class: "about-btn" }, "了解更多", -1))
            ]),
            createBaseVNode("div", _hoisted_36$4, [
              createBaseVNode("div", _hoisted_37$4, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(visualStats.value, (s, i) => {
                  return openBlock(), createElementBlock("div", {
                    class: "visual-stat",
                    key: i
                  }, [
                    createBaseVNode("span", _hoisted_38$4, toDisplayString(s.value), 1),
                    createBaseVNode("span", _hoisted_39$4, toDisplayString(s.label), 1)
                  ]);
                }), 128))
              ])
            ])
          ])
        ]),
        createBaseVNode("section", _hoisted_40$4, [
          _cache[18] || (_cache[18] = createBaseVNode("div", { class: "section-header" }, [
            createBaseVNode("span", { class: "section-label" }, "Team"),
            createBaseVNode("h2", null, "核心团队")
          ], -1)),
          createBaseVNode("div", _hoisted_41$4, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(team.value, (member, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "team-card"
              }, [
                createBaseVNode("div", _hoisted_42$4, toDisplayString(member.avatar), 1),
                createBaseVNode("h3", null, toDisplayString(member.name), 1),
                createBaseVNode("p", _hoisted_43$4, toDisplayString(member.role), 1),
                createBaseVNode("p", _hoisted_44$4, toDisplayString(member.desc), 1)
              ]);
            }), 128))
          ])
        ]),
        createBaseVNode("footer", _hoisted_45$4, [
          createBaseVNode("div", _hoisted_46$3, [
            _cache[19] || (_cache[19] = createBaseVNode("div", { class: "footer-info" }, [
              createBaseVNode("div", { class: "footer-brand" }, [
                createBaseVNode("span", { class: "brand-icon" }, "◈"),
                createBaseVNode("span", null, "智领科技")
              ]),
              createBaseVNode("p", null, "专业的企业数字化转型服务商"),
              createBaseVNode("div", { class: "footer-contact" }, [
                createBaseVNode("p", null, "📞 400-000-0000"),
                createBaseVNode("p", null, "📧 contact@zhiling.tech"),
                createBaseVNode("p", null, "📍 北京市海淀区中关村科技园")
              ])
            ], -1)),
            createBaseVNode("div", _hoisted_47$3, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(footerGroups.value, (group, i) => {
                return openBlock(), createElementBlock("div", {
                  class: "link-group",
                  key: i
                }, [
                  createBaseVNode("h4", null, toDisplayString(group.title), 1),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(group.links, (link, j) => {
                    return openBlock(), createElementBlock("a", { key: j }, toDisplayString(link), 1);
                  }), 128))
                ]);
              }), 128))
            ])
          ]),
          _cache[20] || (_cache[20] = createBaseVNode("p", { class: "copyright" }, "© 2024 智领科技 版权所有 | 京ICP备00000000号", -1))
        ])
      ]);
    };
  }
};
const CorporateTemplate = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-c4efc03a"]]);
const _hoisted_1$a = { class: "forum-template" };
const _hoisted_2$a = { class: "header" };
const _hoisted_3$a = { class: "header-left" };
const _hoisted_4$a = { class: "nav" };
const _hoisted_5$a = { class: "main-content" };
const _hoisted_6$a = { class: "sidebar" };
const _hoisted_7$9 = { class: "hot-topics" };
const _hoisted_8$9 = ["onClick"];
const _hoisted_9$8 = { class: "topic-info" };
const _hoisted_10$8 = { class: "topic-name" };
const _hoisted_11$7 = { class: "topic-count" };
const _hoisted_12$7 = { class: "recommend-authors" };
const _hoisted_13$7 = { class: "author-avatar" };
const _hoisted_14$7 = { class: "author-info" };
const _hoisted_15$7 = { class: "author-name" };
const _hoisted_16$7 = { class: "author-desc" };
const _hoisted_17$7 = ["onClick"];
const _hoisted_18$6 = { class: "content-area" };
const _hoisted_19$5 = { class: "category-tabs" };
const _hoisted_20$5 = ["onClick"];
const _hoisted_21$4 = {
  key: 0,
  class: "tab-count"
};
const _hoisted_22$4 = { class: "posts-list" };
const _hoisted_23$4 = { class: "post-header" };
const _hoisted_24$4 = { class: "author-info" };
const _hoisted_25$4 = { class: "author-name" };
const _hoisted_26$4 = {
  key: 0,
  class: "author-badge"
};
const _hoisted_27$3 = { class: "post-time" };
const _hoisted_28$3 = { class: "post-tags" };
const _hoisted_29$3 = ["onClick"];
const _hoisted_30$3 = { class: "post-preview" };
const _hoisted_31$3 = {
  key: 0,
  class: "post-images"
};
const _hoisted_32$3 = { class: "post-footer" };
const _hoisted_33$3 = { class: "post-actions" };
const _hoisted_34$3 = ["onClick"];
const _hoisted_35$3 = ["onClick"];
const _hoisted_36$3 = { class: "action" };
const _hoisted_37$3 = ["onClick"];
const _hoisted_38$3 = { class: "right-sidebar" };
const _hoisted_39$3 = { class: "activity-card" };
const _hoisted_40$3 = { class: "rank-card" };
const _hoisted_41$3 = { class: "rank-tabs" };
const _hoisted_42$3 = { class: "rank-list" };
const _hoisted_43$3 = { class: "rank-avatar" };
const _hoisted_44$3 = { class: "rank-name" };
const _hoisted_45$3 = { class: "rank-score" };
const _sfc_main$a = {
  __name: "ForumTemplate",
  setup(__props) {
    const navItems = ["首页", "关注", "消息", "收藏", "历史"];
    const activeCat = /* @__PURE__ */ ref(0);
    const selectedTopic = /* @__PURE__ */ ref(null);
    const isSigned = /* @__PURE__ */ ref(false);
    const rankTab = /* @__PURE__ */ ref("daily");
    const showBackTop = /* @__PURE__ */ ref(false);
    const categories = /* @__PURE__ */ ref([
      { name: "推荐", count: "" },
      { name: "最新", count: "NEW" },
      { name: "热门", count: "🔥" },
      { name: "精华", count: "" },
      { name: "问答", count: "" },
      { name: "分享", count: "" }
    ]);
    const tagColors = ["#e8f4fd", "#fff3e0", "#f3e5f5", "#e8f5e9", "#fce4ec"];
    const hotTopics = /* @__PURE__ */ ref([
      { name: "Vue3 组合式API", count: 2356 },
      { name: "前端性能优化", count: 1892 },
      { name: "TypeScript实战", count: 1654 },
      { name: "面试经验分享", count: 1432 },
      { name: "开源项目推荐", count: 1287 }
    ]);
    const recommendAuthors = /* @__PURE__ */ ref([
      { avatar: "👨", name: "前端小哥", desc: "专注Vue生态", followed: false },
      { avatar: "👩", name: "全栈小姐姐", desc: "Node.js专家", followed: true },
      { avatar: "🧑", name: "架构师老王", desc: "10年经验", followed: false }
    ]);
    const posts = /* @__PURE__ */ ref([
      {
        avatar: "👨",
        avatarBg: "#e3f2fd",
        author: "前端小哥",
        badge: "优质作者",
        time: "2小时前",
        tags: ["Vue", "前端"],
        title: "Vue3 项目实战经验分享，从入门到精通的完整指南",
        preview: "最近完成了一个Vue3项目，分享一些开发过程中的心得体会，包括组合式API的最佳实践、性能优化技巧等...",
        likes: 256,
        comments: 89,
        views: "2.3k",
        liked: false,
        collected: false
      },
      {
        avatar: "👩",
        avatarBg: "#fce4ec",
        author: "全栈小姐姐",
        time: "5小时前",
        tags: ["Node.js", "后端"],
        title: "Node.js 后端架构设计：如何构建高并发服务",
        preview: "分享一下个人在Node.js后端项目中的架构设计思路，包括微服务拆分、数据库优化、缓存策略等...",
        likes: 189,
        comments: 56,
        views: "1.8k",
        liked: true,
        collected: true,
        images: ["#f5f5f5", "#e0e0e0", "#f0f0f0"]
      },
      {
        avatar: "🧑",
        avatarBg: "#e8f5e9",
        author: "架构师老王",
        badge: "认证专家",
        time: "昨天",
        tags: ["架构", "微前端"],
        title: "微前端架构实践总结：从 qiankun 到 Module Federation",
        preview: "在大型项目中实践微前端的一些经验，对比了多种技术方案的优缺点...",
        likes: 423,
        comments: 134,
        views: "5.6k",
        liked: false,
        collected: false
      },
      {
        avatar: "👨",
        avatarBg: "#fff3e0",
        author: "算法工程师",
        time: "昨天",
        tags: ["算法", "面试"],
        title: "大厂面试必问的数据结构与算法题总结",
        preview: "整理了近期面试中遇到的高频算法题，附带详细解答和优化思路...",
        likes: 567,
        comments: 178,
        views: "8.2k",
        liked: false,
        collected: true
      },
      {
        avatar: "👩",
        avatarBg: "#f3e5f5",
        author: "UI设计师",
        time: "2天前",
        tags: ["设计", "CSS"],
        title: "2024年前端必知的CSS新特性，建议收藏！",
        preview: "CSS这些年新增了很多强大的特性，本文盘点那些实用的CSS新功能...",
        likes: 312,
        comments: 67,
        views: "4.1k",
        liked: false,
        collected: false
      }
    ]);
    const rankUsers = /* @__PURE__ */ ref([
      { avatar: "👨", name: "前端小哥", score: 1256 },
      { avatar: "👩", name: "全栈小姐姐", score: 987 },
      { avatar: "🧑", name: "架构师老王", score: 876 },
      { avatar: "👨", name: "算法达人", score: 654 },
      { avatar: "👩", name: "后端专家", score: 543 }
    ]);
    const filteredPosts = computed(() => posts.value);
    const toggleLike = (post) => {
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
    };
    const collectPost = (post) => {
      post.collected = !post.collected;
    };
    const showComments = (post) => {
      alert(`查看 ${post.title} 的评论`);
    };
    const viewPost = (post) => {
      alert(`打开文章：${post.title}`);
    };
    const loadMore = () => {
      alert("加载更多帖子...");
    };
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleScroll = () => {
      showBackTop.value = window.scrollY > 300;
    };
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$a, [
        createBaseVNode("header", _hoisted_2$a, [
          createBaseVNode("div", _hoisted_3$a, [
            _cache[4] || (_cache[4] = createBaseVNode("div", { class: "logo" }, [
              createBaseVNode("span", { class: "logo-icon" }, "C"),
              createBaseVNode("span", { class: "logo-text" }, "码农社区")
            ], -1)),
            createBaseVNode("nav", _hoisted_4$a, [
              (openBlock(), createElementBlock(Fragment, null, renderList(navItems, (item, i) => {
                return createBaseVNode("a", {
                  key: i,
                  class: normalizeClass({ active: i === 0 })
                }, toDisplayString(item), 3);
              }), 64))
            ])
          ]),
          _cache[5] || (_cache[5] = createStaticVNode('<div class="header-actions" data-v-33e59aae><div class="search-box" data-v-33e59aae><input type="text" placeholder="搜索帖子、用户、话题..." class="search-input" data-v-33e59aae><button class="search-btn" data-v-33e59aae>🔍</button></div><button class="btn-create" data-v-33e59aae>✏️ 发帖</button><div class="user-menu" data-v-33e59aae><span class="avatar" data-v-33e59aae>👤</span><span class="notif-badge" data-v-33e59aae>3</span></div></div>', 1))
        ]),
        createBaseVNode("main", _hoisted_5$a, [
          createBaseVNode("div", _hoisted_6$a, [
            _cache[8] || (_cache[8] = createStaticVNode('<div class="user-card" data-v-33e59aae><div class="user-header" data-v-33e59aae><div class="avatar-lg" data-v-33e59aae>👤</div><div class="user-info" data-v-33e59aae><h3 data-v-33e59aae>码农小王</h3><p class="user-title" data-v-33e59aae>全栈工程师</p></div></div><div class="user-stats" data-v-33e59aae><div class="stat" data-v-33e59aae><strong data-v-33e59aae>128</strong><span data-v-33e59aae>帖子</span></div><div class="stat" data-v-33e59aae><strong data-v-33e59aae>1.2k</strong><span data-v-33e59aae>粉丝</span></div><div class="stat" data-v-33e59aae><strong data-v-33e59aae>356</strong><span data-v-33e59aae>关注</span></div></div><div class="user-level" data-v-33e59aae><span class="level-badge" data-v-33e59aae>Lv.5</span><div class="level-bar" data-v-33e59aae><div class="level-progress" style="width:65%;" data-v-33e59aae></div></div><span class="level-text" data-v-33e59aae>距下一等级还需350经验</span></div></div>', 1)),
            createBaseVNode("div", _hoisted_7$9, [
              _cache[6] || (_cache[6] = createBaseVNode("h4", null, "🔥 热门话题", -1)),
              createBaseVNode("ul", null, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(hotTopics.value, (topic, i) => {
                  return openBlock(), createElementBlock("li", {
                    key: i,
                    class: "topic-item",
                    onClick: ($event) => selectedTopic.value = topic
                  }, [
                    createBaseVNode("span", {
                      class: normalizeClass(["rank", "rank-" + (i + 1)])
                    }, toDisplayString(i + 1), 3),
                    createBaseVNode("div", _hoisted_9$8, [
                      createBaseVNode("span", _hoisted_10$8, toDisplayString(topic.name), 1),
                      createBaseVNode("span", _hoisted_11$7, toDisplayString(topic.count) + "讨论", 1)
                    ])
                  ], 8, _hoisted_8$9);
                }), 128))
              ])
            ]),
            createBaseVNode("div", _hoisted_12$7, [
              _cache[7] || (_cache[7] = createBaseVNode("h4", null, "⭐ 推荐关注", -1)),
              (openBlock(true), createElementBlock(Fragment, null, renderList(recommendAuthors.value, (author, i) => {
                return openBlock(), createElementBlock("div", {
                  key: i,
                  class: "author-item"
                }, [
                  createBaseVNode("span", _hoisted_13$7, toDisplayString(author.avatar), 1),
                  createBaseVNode("div", _hoisted_14$7, [
                    createBaseVNode("span", _hoisted_15$7, toDisplayString(author.name), 1),
                    createBaseVNode("span", _hoisted_16$7, toDisplayString(author.desc), 1)
                  ]),
                  createBaseVNode("button", {
                    class: normalizeClass(["follow-btn", { followed: author.followed }]),
                    onClick: ($event) => author.followed = !author.followed
                  }, toDisplayString(author.followed ? "已关注" : "关注"), 11, _hoisted_17$7)
                ]);
              }), 128))
            ])
          ]),
          createBaseVNode("div", _hoisted_18$6, [
            createBaseVNode("div", _hoisted_19$5, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(categories.value, (cat, i) => {
                return openBlock(), createElementBlock("button", {
                  key: i,
                  class: normalizeClass(["tab", { active: activeCat.value === i }]),
                  onClick: ($event) => activeCat.value = i
                }, [
                  createTextVNode(toDisplayString(cat.name) + " ", 1),
                  cat.count ? (openBlock(), createElementBlock("span", _hoisted_21$4, toDisplayString(cat.count), 1)) : createCommentVNode("", true)
                ], 10, _hoisted_20$5);
              }), 128))
            ]),
            createBaseVNode("div", _hoisted_22$4, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(filteredPosts.value, (post, i) => {
                return openBlock(), createElementBlock("article", {
                  key: i,
                  class: "post-card",
                  style: normalizeStyle({ animationDelay: i * 0.05 + "s" })
                }, [
                  createBaseVNode("div", _hoisted_23$4, [
                    createBaseVNode("div", _hoisted_24$4, [
                      createBaseVNode("div", {
                        class: "author-avatar",
                        style: normalizeStyle({ background: post.avatarBg })
                      }, toDisplayString(post.avatar), 5),
                      createBaseVNode("div", null, [
                        createBaseVNode("span", _hoisted_25$4, toDisplayString(post.author), 1),
                        post.badge ? (openBlock(), createElementBlock("span", _hoisted_26$4, toDisplayString(post.badge), 1)) : createCommentVNode("", true),
                        createBaseVNode("span", _hoisted_27$3, toDisplayString(post.time), 1)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_28$3, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(post.tags, (tag, ti) => {
                        return openBlock(), createElementBlock("span", {
                          class: "post-tag",
                          key: ti,
                          style: normalizeStyle({ background: tagColors[ti % tagColors.length] })
                        }, toDisplayString(tag), 5);
                      }), 128))
                    ])
                  ]),
                  createBaseVNode("h3", {
                    class: "post-title",
                    onClick: ($event) => viewPost(post)
                  }, toDisplayString(post.title), 9, _hoisted_29$3),
                  createBaseVNode("p", _hoisted_30$3, toDisplayString(post.preview), 1),
                  post.images ? (openBlock(), createElementBlock("div", _hoisted_31$3, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(post.images, (img, ii) => {
                      return openBlock(), createElementBlock("div", {
                        key: ii,
                        class: "post-img",
                        style: normalizeStyle({ background: img })
                      }, null, 4);
                    }), 128))
                  ])) : createCommentVNode("", true),
                  createBaseVNode("div", _hoisted_32$3, [
                    createBaseVNode("div", _hoisted_33$3, [
                      createBaseVNode("span", {
                        class: normalizeClass(["action", { liked: post.liked }]),
                        onClick: ($event) => toggleLike(post)
                      }, toDisplayString(post.liked ? "❤️" : "🤍") + " " + toDisplayString(post.likes), 11, _hoisted_34$3),
                      createBaseVNode("span", {
                        class: "action",
                        onClick: ($event) => showComments(post)
                      }, "💬 " + toDisplayString(post.comments), 9, _hoisted_35$3),
                      createBaseVNode("span", _hoisted_36$3, "👁 " + toDisplayString(post.views), 1),
                      createBaseVNode("span", {
                        class: "action",
                        onClick: ($event) => collectPost(post)
                      }, toDisplayString(post.collected ? "⭐" : "☆") + " 收藏 ", 9, _hoisted_37$3)
                    ]),
                    _cache[9] || (_cache[9] = createBaseVNode("span", { class: "post-share" }, "分享 →", -1))
                  ])
                ], 4);
              }), 128))
            ]),
            createBaseVNode("div", { class: "load-more" }, [
              createBaseVNode("button", {
                class: "load-btn",
                onClick: loadMore
              }, "加载更多")
            ])
          ]),
          createBaseVNode("div", _hoisted_38$3, [
            _cache[14] || (_cache[14] = createBaseVNode("div", { class: "announcement" }, [
              createBaseVNode("h4", null, "📢 公告"),
              createBaseVNode("ul", null, [
                createBaseVNode("li", null, "• 社区发帖规范更新"),
                createBaseVNode("li", null, "• 优秀创作者激励计划"),
                createBaseVNode("li", null, "• 春节活动获奖名单公布")
              ])
            ], -1)),
            createBaseVNode("div", _hoisted_39$3, [
              _cache[10] || (_cache[10] = createBaseVNode("h4", null, "🎯 每日签到", -1)),
              _cache[11] || (_cache[11] = createBaseVNode("p", null, "连续签到可获得积分奖励", -1)),
              createBaseVNode("button", {
                class: normalizeClass(["signin-btn", { signed: isSigned.value }]),
                onClick: _cache[0] || (_cache[0] = ($event) => isSigned.value = true)
              }, toDisplayString(isSigned.value ? "✓ 已签到" : "立即签到"), 3),
              _cache[12] || (_cache[12] = createBaseVNode("div", { class: "signin-streak" }, [
                createTextVNode("已连续签到 "),
                createBaseVNode("strong", null, "7"),
                createTextVNode(" 天")
              ], -1))
            ]),
            createBaseVNode("div", _hoisted_40$3, [
              _cache[13] || (_cache[13] = createBaseVNode("h4", null, "🏆 活跃榜", -1)),
              createBaseVNode("div", _hoisted_41$3, [
                createBaseVNode("span", {
                  class: normalizeClass({ active: rankTab.value === "daily" }),
                  onClick: _cache[1] || (_cache[1] = ($event) => rankTab.value = "daily")
                }, "日榜", 2),
                createBaseVNode("span", {
                  class: normalizeClass({ active: rankTab.value === "weekly" }),
                  onClick: _cache[2] || (_cache[2] = ($event) => rankTab.value = "weekly")
                }, "周榜", 2),
                createBaseVNode("span", {
                  class: normalizeClass({ active: rankTab.value === "monthly" }),
                  onClick: _cache[3] || (_cache[3] = ($event) => rankTab.value = "monthly")
                }, "月榜", 2)
              ]),
              createBaseVNode("div", _hoisted_42$3, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(rankUsers.value, (user, i) => {
                  return openBlock(), createElementBlock("div", {
                    key: i,
                    class: "rank-item"
                  }, [
                    createBaseVNode("span", {
                      class: normalizeClass(["rank-num", "top-" + (i + 1)])
                    }, toDisplayString(i + 1), 3),
                    createBaseVNode("span", _hoisted_43$3, toDisplayString(user.avatar), 1),
                    createBaseVNode("span", _hoisted_44$3, toDisplayString(user.name), 1),
                    createBaseVNode("span", _hoisted_45$3, toDisplayString(user.score) + "分", 1)
                  ]);
                }), 128))
              ])
            ])
          ])
        ]),
        withDirectives(createBaseVNode("div", {
          class: "back-top",
          onClick: scrollToTop
        }, "↑", 512), [
          [vShow, showBackTop.value]
        ]),
        _cache[15] || (_cache[15] = createBaseVNode("footer", { class: "footer" }, [
          createBaseVNode("p", null, "© 2024 码农社区 | 关于我们 | 用户协议 | 隐私政策")
        ], -1))
      ]);
    };
  }
};
const ForumTemplate = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-33e59aae"]]);
const _hoisted_1$9 = { class: "education-template" };
const _hoisted_2$9 = { class: "navbar" };
const _hoisted_3$9 = { class: "nav-links" };
const _hoisted_4$9 = { class: "hero" };
const _hoisted_5$9 = { class: "hero-content" };
const _hoisted_6$9 = { class: "hero-stats animate-slide-up" };
const _hoisted_7$8 = { class: "stat-value" };
const _hoisted_8$8 = { class: "stat-label" };
const _hoisted_9$7 = { class: "categories" };
const _hoisted_10$7 = { class: "cat-grid" };
const _hoisted_11$6 = { class: "popular-courses" };
const _hoisted_12$6 = { class: "courses-grid" };
const _hoisted_13$6 = { class: "course-emoji" };
const _hoisted_14$6 = { class: "course-level" };
const _hoisted_15$6 = { class: "course-body" };
const _hoisted_16$6 = { class: "instructor" };
const _hoisted_17$6 = { class: "course-meta" };
const _hoisted_18$5 = { class: "course-footer" };
const _hoisted_19$4 = { class: "rating" };
const _hoisted_20$4 = { class: "price" };
const _sfc_main$9 = {
  __name: "EducationTemplate",
  setup(__props) {
    const navLinks = ["首页", "课程", "讲师", "关于"];
    const heroStats = /* @__PURE__ */ ref([
      { value: "1000+", label: "在线课程" },
      { value: "50万+", label: "注册学员" },
      { value: "200+", label: "认证讲师" }
    ]);
    const categories = /* @__PURE__ */ ref([
      { icon: "💻", name: "编程开发", count: 128, bg: "linear-gradient(135deg, #667eea, #764ba2)" },
      { icon: "🎨", name: "设计创意", count: 86, bg: "linear-gradient(135deg, #f093fb, #f5576c)" },
      { icon: "📊", name: "数据分析", count: 64, bg: "linear-gradient(135deg, #4facfe, #00f2fe)" },
      { icon: "📈", name: "商业管理", count: 52, bg: "linear-gradient(135deg, #43e97b, #38f9d7)" },
      { icon: "🗣️", name: "语言学习", count: 78, bg: "linear-gradient(135deg, #fa709a, #fee140)" },
      { icon: "🎬", name: "影视制作", count: 45, bg: "linear-gradient(135deg, #a18cd1, #fbc2eb)" }
    ]);
    const courses = /* @__PURE__ */ ref([
      { emoji: "⚛️", title: "Vue3 从入门到实战", instructor: "张老师", level: "进阶", duration: "36课时", students: "12.5k", rating: 4.9, price: 299, bg: "linear-gradient(135deg, #42b883, #35495e)" },
      { emoji: "🐍", title: "Python 数据分析", instructor: "李老师", level: "入门", duration: "48课时", students: "28.3k", rating: 4.8, price: 399, bg: "linear-gradient(135deg, #3776ab, #ffd43b)" },
      { emoji: "🎯", title: "UI设计实战课程", instructor: "王老师", level: "进阶", duration: "24课时", students: "8.7k", rating: 4.9, price: 249, bg: "linear-gradient(135deg, #e74c3c, #c0392b)" },
      { emoji: "📱", title: "React Native 开发", instructor: "刘老师", level: "进阶", duration: "32课时", students: "6.2k", rating: 4.7, price: 349, bg: "linear-gradient(135deg, #61dafb, #21a1f1)" }
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$9, [
        createBaseVNode("nav", _hoisted_2$9, [
          _cache[0] || (_cache[0] = createBaseVNode("div", { class: "logo" }, "在线学习平台", -1)),
          createBaseVNode("div", _hoisted_3$9, [
            (openBlock(), createElementBlock(Fragment, null, renderList(navLinks, (link, i) => {
              return createBaseVNode("a", { key: i }, toDisplayString(link), 1);
            }), 64))
          ]),
          _cache[1] || (_cache[1] = createBaseVNode("div", { class: "auth-btns" }, [
            createBaseVNode("button", { class: "btn-login" }, "登录"),
            createBaseVNode("button", { class: "btn-signup" }, "免费注册")
          ], -1))
        ]),
        createBaseVNode("section", _hoisted_4$9, [
          _cache[5] || (_cache[5] = createBaseVNode("div", { class: "hero-visual" }, [
            createBaseVNode("div", { class: "particle p1" }),
            createBaseVNode("div", { class: "particle p2" }),
            createBaseVNode("div", { class: "particle p3" })
          ], -1)),
          createBaseVNode("div", _hoisted_5$9, [
            _cache[2] || (_cache[2] = createBaseVNode("h1", { class: "animate-slide-up" }, "在线学习，随时随地", -1)),
            _cache[3] || (_cache[3] = createBaseVNode("p", { class: "animate-fade-in" }, "覆盖编程、设计、商业等多个领域", -1)),
            createBaseVNode("div", _hoisted_6$9, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(heroStats.value, (stat, i) => {
                return openBlock(), createElementBlock("div", {
                  class: "stat",
                  key: i,
                  style: normalizeStyle({ animationDelay: i * 0.1 + "s" })
                }, [
                  createBaseVNode("span", _hoisted_7$8, toDisplayString(stat.value), 1),
                  createBaseVNode("span", _hoisted_8$8, toDisplayString(stat.label), 1)
                ], 4);
              }), 128))
            ]),
            _cache[4] || (_cache[4] = createBaseVNode("button", { class: "start-btn animate-scale-in" }, "开始学习", -1))
          ])
        ]),
        createBaseVNode("section", _hoisted_9$7, [
          _cache[6] || (_cache[6] = createBaseVNode("h2", null, "课程分类", -1)),
          createBaseVNode("div", _hoisted_10$7, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(categories.value, (cat, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "cat-card",
                style: normalizeStyle({ animationDelay: i * 0.1 + "s" })
              }, [
                createBaseVNode("div", {
                  class: "cat-icon",
                  style: normalizeStyle({ background: cat.bg })
                }, toDisplayString(cat.icon), 5),
                createBaseVNode("h3", null, toDisplayString(cat.name), 1),
                createBaseVNode("p", null, toDisplayString(cat.count) + " 门课程", 1)
              ], 4);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_11$6, [
          _cache[7] || (_cache[7] = createBaseVNode("h2", null, "热门课程", -1)),
          createBaseVNode("div", _hoisted_12$6, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(courses.value, (course, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "course-card",
                style: normalizeStyle({ animationDelay: i * 0.1 + "s" })
              }, [
                createBaseVNode("div", {
                  class: "course-header",
                  style: normalizeStyle({ background: course.bg })
                }, [
                  createBaseVNode("span", _hoisted_13$6, toDisplayString(course.emoji), 1),
                  createBaseVNode("span", _hoisted_14$6, toDisplayString(course.level), 1)
                ], 4),
                createBaseVNode("div", _hoisted_15$6, [
                  createBaseVNode("h3", null, toDisplayString(course.title), 1),
                  createBaseVNode("p", _hoisted_16$6, toDisplayString(course.instructor), 1),
                  createBaseVNode("div", _hoisted_17$6, [
                    createBaseVNode("span", null, toDisplayString(course.duration), 1),
                    createBaseVNode("span", null, toDisplayString(course.students) + "人学习", 1)
                  ]),
                  createBaseVNode("div", _hoisted_18$5, [
                    createBaseVNode("div", _hoisted_19$4, "⭐ " + toDisplayString(course.rating), 1),
                    createBaseVNode("div", _hoisted_20$4, "¥" + toDisplayString(course.price), 1)
                  ])
                ])
              ], 4);
            }), 128))
          ])
        ]),
        _cache[8] || (_cache[8] = createStaticVNode('<footer class="footer" data-v-828e9508><div class="footer-main" data-v-828e9508><div class="footer-brand" data-v-828e9508>在线学习平台</div><div class="footer-links" data-v-828e9508><a data-v-828e9508>关于我们</a><a data-v-828e9508>帮助中心</a><a data-v-828e9508>联系我们</a></div></div><p class="copyright" data-v-828e9508>© 2024 在线学习平台</p></footer>', 1))
      ]);
    };
  }
};
const EducationTemplate = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-828e9508"]]);
const _hoisted_1$8 = { class: "music-template" };
const _hoisted_2$8 = { class: "navbar" };
const _hoisted_3$8 = { class: "nav-links" };
const _hoisted_4$8 = { class: "hero" };
const _hoisted_5$8 = { class: "visualizer" };
const _hoisted_6$8 = { class: "now-playing" };
const _hoisted_7$7 = { class: "player-card" };
const _hoisted_8$7 = { class: "song-emoji" };
const _hoisted_9$6 = { class: "song-info" };
const _hoisted_10$6 = { class: "artist" };
const _hoisted_11$5 = { class: "playlists" };
const _hoisted_12$5 = { class: "playlist-grid" };
const _hoisted_13$5 = { class: "pl-emoji" };
const _hoisted_14$5 = { class: "top-songs" };
const _hoisted_15$5 = { class: "songs-list" };
const _hoisted_16$5 = { class: "rank" };
const _hoisted_17$5 = { class: "song-details" };
const _hoisted_18$4 = { class: "duration" };
const _sfc_main$8 = {
  __name: "MusicTemplate",
  setup(__props) {
    const navLinks = ["首页", "发现", "歌单", "歌手", "我的"];
    const currentSong = /* @__PURE__ */ ref({
      emoji: "🎸",
      title: "夜空中最亮的星",
      artist: "逃跑计划",
      bg: "linear-gradient(135deg, #667eea, #764ba2)"
    });
    const playlists = /* @__PURE__ */ ref([
      { emoji: "🌙", name: "深夜听歌", tracks: 50, bg: "linear-gradient(135deg, #2c3e50, #4a69bd)" },
      { emoji: "🏃", name: "运动健身", tracks: 35, bg: "linear-gradient(135deg, #e74c3c, #c0392b)" },
      { emoji: "☕", name: "咖啡时光", tracks: 42, bg: "linear-gradient(135deg, #8b4513, #a0522d)" },
      { emoji: "🌈", name: "治愈系", tracks: 60, bg: "linear-gradient(135deg, #3498db, #2980b9)" },
      { emoji: "🎸", name: "摇滚精选", tracks: 38, bg: "linear-gradient(135deg, #1a1a2e, #16213e)" },
      { emoji: "🎹", name: "古典音乐", tracks: 45, bg: "linear-gradient(135deg, #9b59b6, #8e44ad)" }
    ]);
    const topSongs = /* @__PURE__ */ ref([
      { emoji: "🎤", title: "起风了", artist: "买辣椒也用券", duration: "5:22", bg: "linear-gradient(135deg, #667eea, #764ba2)" },
      { emoji: "🎸", title: "平凡之路", artist: "朴树", duration: "4:46", bg: "linear-gradient(135deg, #f093fb, #f5576c)" },
      { emoji: "🎹", title: "晴天", artist: "周杰伦", duration: "4:29", bg: "linear-gradient(135deg, #4facfe, #00f2fe)" },
      { emoji: "🎻", title: "夜曲", artist: "周杰伦", duration: "3:46", bg: "linear-gradient(135deg, #43e97b, #38f9d7)" },
      { emoji: "🥁", title: "海阔天空", artist: "Beyond", duration: "5:25", bg: "linear-gradient(135deg, #fa709a, #fee140)" }
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        createBaseVNode("nav", _hoisted_2$8, [
          _cache[0] || (_cache[0] = createBaseVNode("div", { class: "logo" }, "音乐平台", -1)),
          createBaseVNode("div", _hoisted_3$8, [
            (openBlock(), createElementBlock(Fragment, null, renderList(navLinks, (link, i) => {
              return createBaseVNode("a", { key: i }, toDisplayString(link), 1);
            }), 64))
          ]),
          _cache[1] || (_cache[1] = createBaseVNode("div", { class: "search-box" }, [
            createBaseVNode("input", {
              type: "text",
              placeholder: "搜索音乐、歌手..."
            })
          ], -1))
        ]),
        createBaseVNode("section", _hoisted_4$8, [
          createBaseVNode("div", _hoisted_5$8, [
            (openBlock(), createElementBlock(Fragment, null, renderList(20, (n) => {
              return createBaseVNode("div", {
                key: n,
                class: "bar",
                style: normalizeStyle({ animationDelay: n * 0.05 + "s" })
              }, null, 4);
            }), 64))
          ]),
          _cache[2] || (_cache[2] = createStaticVNode('<div class="hero-content" data-v-5113061a><h1 class="animate-slide-up" data-v-5113061a>发现好音乐</h1><p class="animate-fade-in" data-v-5113061a>海量正版音乐，高品质在线试听</p><div class="hero-buttons animate-scale-in" data-v-5113061a><button class="btn-primary" data-v-5113061a>开始听歌</button><button class="btn-outline" data-v-5113061a>浏览歌单</button></div></div>', 1))
        ]),
        createBaseVNode("section", _hoisted_6$8, [
          createBaseVNode("div", _hoisted_7$7, [
            createBaseVNode("div", {
              class: "album-art",
              style: normalizeStyle({ background: currentSong.value.bg })
            }, [
              createBaseVNode("span", _hoisted_8$7, toDisplayString(currentSong.value.emoji), 1)
            ], 4),
            createBaseVNode("div", _hoisted_9$6, [
              createBaseVNode("h2", null, toDisplayString(currentSong.value.title), 1),
              createBaseVNode("p", _hoisted_10$6, toDisplayString(currentSong.value.artist), 1),
              _cache[3] || (_cache[3] = createStaticVNode('<div class="progress-bar" data-v-5113061a><div class="progress" style="width:35%;" data-v-5113061a></div></div><div class="time" data-v-5113061a><span data-v-5113061a>1:23</span><span data-v-5113061a>3:45</span></div><div class="controls" data-v-5113061a><button class="ctrl-btn" data-v-5113061a>⏮</button><button class="ctrl-btn play" data-v-5113061a>▶</button><button class="ctrl-btn" data-v-5113061a>⏭</button></div>', 3))
            ])
          ])
        ]),
        createBaseVNode("section", _hoisted_11$5, [
          _cache[4] || (_cache[4] = createBaseVNode("h2", null, "热门歌单", -1)),
          createBaseVNode("div", _hoisted_12$5, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(playlists.value, (pl, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "playlist-card",
                style: normalizeStyle({ animationDelay: i * 0.1 + "s" })
              }, [
                createBaseVNode("div", {
                  class: "pl-cover",
                  style: normalizeStyle({ background: pl.bg })
                }, [
                  createBaseVNode("span", _hoisted_13$5, toDisplayString(pl.emoji), 1)
                ], 4),
                createBaseVNode("h3", null, toDisplayString(pl.name), 1),
                createBaseVNode("p", null, toDisplayString(pl.tracks) + "首", 1)
              ], 4);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_14$5, [
          _cache[6] || (_cache[6] = createBaseVNode("h2", null, "热门歌曲", -1)),
          createBaseVNode("div", _hoisted_15$5, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(topSongs.value, (song, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "song-item",
                style: normalizeStyle({ animationDelay: i * 0.1 + "s" })
              }, [
                createBaseVNode("span", _hoisted_16$5, toDisplayString(i + 1), 1),
                createBaseVNode("div", {
                  class: "song-cover",
                  style: normalizeStyle({ background: song.bg })
                }, [
                  createBaseVNode("span", null, toDisplayString(song.emoji), 1)
                ], 4),
                createBaseVNode("div", _hoisted_17$5, [
                  createBaseVNode("h3", null, toDisplayString(song.title), 1),
                  createBaseVNode("p", null, toDisplayString(song.artist), 1)
                ]),
                createBaseVNode("span", _hoisted_18$4, toDisplayString(song.duration), 1),
                _cache[5] || (_cache[5] = createBaseVNode("button", { class: "play-btn" }, "▶", -1))
              ], 4);
            }), 128))
          ])
        ]),
        _cache[7] || (_cache[7] = createBaseVNode("footer", { class: "footer" }, [
          createBaseVNode("div", { class: "footer-links" }, [
            createBaseVNode("a", null, "关于我们"),
            createBaseVNode("a", null, "用户协议"),
            createBaseVNode("a", null, "隐私政策"),
            createBaseVNode("a", null, "联系我们")
          ]),
          createBaseVNode("p", { class: "copyright" }, "© 2024 音乐平台 版权所有")
        ], -1))
      ]);
    };
  }
};
const MusicTemplate = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-5113061a"]]);
const _hoisted_1$7 = { class: "fitness-template" };
const _hoisted_2$7 = { class: "navbar" };
const _hoisted_3$7 = { class: "nav-container" };
const _hoisted_4$7 = { class: "nav-links" };
const _hoisted_5$7 = { class: "hero" };
const _hoisted_6$7 = { class: "hero-content" };
const _hoisted_7$6 = { class: "hero-buttons animate-scale-in" };
const _hoisted_8$6 = { class: "schedule" };
const _hoisted_9$5 = { class: "schedule-header" };
const _hoisted_10$5 = { class: "date-selector" };
const _hoisted_11$4 = ["onClick"];
const _hoisted_12$4 = { class: "schedule-grid" };
const _hoisted_13$4 = { class: "class-time" };
const _hoisted_14$4 = { class: "time" };
const _hoisted_15$4 = { class: "duration" };
const _hoisted_16$4 = { class: "class-info" };
const _hoisted_17$4 = { class: "instructor" };
const _hoisted_18$3 = { class: "class-meta" };
const _hoisted_19$3 = { class: "spots" };
const _hoisted_20$3 = ["disabled", "onClick"];
const _hoisted_21$3 = { class: "programs" };
const _hoisted_22$3 = { class: "program-grid" };
const _hoisted_23$3 = { class: "prog-meta" };
const _hoisted_24$3 = { class: "trainers" };
const _hoisted_25$3 = { class: "trainers-grid" };
const _hoisted_26$3 = { class: "trainer-avatar" };
const _hoisted_27$2 = { class: "trainer-info" };
const _hoisted_28$2 = { class: "title" };
const _hoisted_29$2 = { class: "spec" };
const _hoisted_30$2 = { class: "trainer-stats" };
const _hoisted_31$2 = { class: "pricing" };
const _hoisted_32$2 = { class: "pricing-grid" };
const _hoisted_33$2 = {
  key: 0,
  class: "plan-badge"
};
const _hoisted_34$2 = { class: "price" };
const _hoisted_35$2 = { class: "amount" };
const _hoisted_36$2 = { class: "period" };
const _hoisted_37$2 = { class: "features-list" };
const _hoisted_38$2 = { class: "gallery" };
const _hoisted_39$2 = { class: "gallery-grid" };
const _hoisted_40$2 = { class: "gallery-icon" };
const _hoisted_41$2 = { class: "gallery-name" };
const _hoisted_42$2 = { class: "reviews" };
const _hoisted_43$2 = { class: "reviews-slider" };
const _hoisted_44$2 = { class: "review-header" };
const _hoisted_45$2 = { class: "review-avatar" };
const _hoisted_46$2 = { class: "review-name" };
const _hoisted_47$2 = { class: "review-rating" };
const _hoisted_48$2 = { class: "review-content" };
const _hoisted_49$2 = { class: "review-date" };
const _hoisted_50$2 = { class: "modal-content" };
const _sfc_main$7 = {
  __name: "FitnessTemplate",
  setup(__props) {
    const navLinks = ["首页", "课程", "教练", "价格", "环境", "关于"];
    const selectedDay = /* @__PURE__ */ ref(0);
    const showBooking = /* @__PURE__ */ ref(false);
    const weekDays = ["今天", "明天", "周三", "周四", "周五", "周六", "周日"];
    const booking = /* @__PURE__ */ ref({
      name: "",
      phone: "",
      type: "",
      date: ""
    });
    const todayClasses = /* @__PURE__ */ ref([
      { time: "07:00", duration: "60分钟", name: "晨间瑜伽", instructor: "李老师", level: "入门", levelColor: "#52c41a", spots: 5 },
      { time: "09:00", duration: "45分钟", name: "动感单车", instructor: "王教练", level: "中级", levelColor: "#faad14", spots: 3 },
      { time: "10:30", duration: "50分钟", name: "普拉提", instructor: "张老师", level: "入门", levelColor: "#52c41a", spots: 8 },
      { time: "14:00", duration: "60分钟", name: "力量训练", instructor: "陈教练", level: "高级", levelColor: "#f5222d", spots: 2 },
      { time: "16:00", duration: "45分钟", name: "有氧搏击", instructor: "刘教练", level: "中级", levelColor: "#faad14", spots: 6 },
      { time: "19:00", duration: "50分钟", name: "拉丁舞", instructor: "赵老师", level: "入门", levelColor: "#52c41a", spots: 0 }
    ]);
    const bookClass = (cls) => {
      alert(`已预约：${cls.name} ${cls.time}`);
    };
    const programs = /* @__PURE__ */ ref([
      { icon: "🏃", name: "有氧训练", desc: "燃脂塑形，提升心肺功能", duration: "45分钟", calories: 500, bg: "#e74c3c" },
      { icon: "💪", name: "力量训练", desc: "增肌塑形，打造完美身材", duration: "60分钟", calories: 400, bg: "#f39c12" },
      { icon: "🧘", name: "瑜伽课程", desc: "身心放松，提升柔韧性", duration: "50分钟", calories: 200, bg: "#9b59b6" },
      { icon: "🚴", name: "动感单车", desc: "高效燃脂，释放压力", duration: "40分钟", calories: 450, bg: "#27ae60" }
    ]);
    const trainers = /* @__PURE__ */ ref([
      { avatar: "👨", name: "张伟", title: "高级私人教练", spec: "增肌减脂", students: 350, rating: 4.9 },
      { avatar: "👩", name: "李娜", title: "瑜伽导师", spec: "瑜伽普拉提", students: 280, rating: 4.8 },
      { avatar: "🧑", name: "王强", title: "体能教练", spec: "功能性训练", students: 420, rating: 4.9 },
      { avatar: "👨", name: "刘洋", title: "搏击教练", spec: "拳击散打", students: 200, rating: 4.7 }
    ]);
    const pricing = /* @__PURE__ */ ref([
      {
        name: "月卡",
        price: 299,
        period: "月",
        popular: false,
        features: [
          { name: "器械使用", included: true },
          { name: "团课不限", included: true },
          { name: "更衣柜", included: true },
          { name: "私教课程", included: false },
          { name: "营养指导", included: false }
        ]
      },
      {
        name: "季卡",
        price: 699,
        period: "季",
        popular: true,
        features: [
          { name: "器械使用", included: true },
          { name: "团课不限", included: true },
          { name: "更衣柜", included: true },
          { name: "私教2节", included: true },
          { name: "营养指导", included: true }
        ]
      },
      {
        name: "年卡",
        price: 1999,
        period: "年",
        popular: false,
        features: [
          { name: "器械使用", included: true },
          { name: "团课不限", included: true },
          { name: "专属衣柜", included: true },
          { name: "私教10节", included: true },
          { name: "营养指导", included: true }
        ]
      }
    ]);
    const gallery = /* @__PURE__ */ ref([
      { icon: "🏋️", name: "器械区", bg: "linear-gradient(135deg, #2c3e50, #3498db)" },
      { icon: "🏃", name: "有氧区", bg: "linear-gradient(135deg, #e74c3c, #c0392b)" },
      { icon: "🧘", name: "瑜伽室", bg: "linear-gradient(135deg, #9b59b6, #8e44ad)" },
      { icon: "🚴", name: "单车房", bg: "linear-gradient(135deg, #27ae60, #2ecc71)" },
      { icon: "🏊", name: "游泳区", bg: "linear-gradient(135deg, #3498db, #2980b9)" },
      { icon: "🧖", name: "休息区", bg: "linear-gradient(135deg, #f39c12, #e67e22)" }
    ]);
    const reviews = /* @__PURE__ */ ref([
      { avatar: "👨", name: "张先生", rating: 4.9, content: "教练非常专业，设备也很齐全，环境干净整洁，强烈推荐！", date: "2024-01-15" },
      { avatar: "👩", name: "李女士", rating: 4.8, content: "瑜伽课氛围很好，老师很有耐心，每次来都很放松。", date: "2024-01-12" },
      { avatar: "🧑", name: "王先生", rating: 5, content: "三个月减重15斤，感谢教练的指导，继续坚持！", date: "2024-01-10" }
    ]);
    const submitBooking = () => {
      alert(`预约成功！我们将尽快联系您。`);
      showBooking.value = false;
      booking.value = { name: "", phone: "", type: "", date: "" };
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        createBaseVNode("nav", _hoisted_2$7, [
          createBaseVNode("div", _hoisted_3$7, [
            _cache[7] || (_cache[7] = createBaseVNode("div", { class: "logo" }, [
              createBaseVNode("span", { class: "logo-icon" }, "💪"),
              createBaseVNode("span", { class: "logo-text" }, "SuperFit健身")
            ], -1)),
            createBaseVNode("div", _hoisted_4$7, [
              (openBlock(), createElementBlock(Fragment, null, renderList(navLinks, (link, i) => {
                return createBaseVNode("a", {
                  key: i,
                  class: normalizeClass({ active: i === 0 })
                }, toDisplayString(link), 3);
              }), 64))
            ]),
            _cache[8] || (_cache[8] = createBaseVNode("div", { class: "nav-right" }, [
              createBaseVNode("a", { class: "phone" }, "📞 400-888-8888"),
              createBaseVNode("button", { class: "trial-btn" }, "免费体验")
            ], -1))
          ])
        ]),
        createBaseVNode("section", _hoisted_5$7, [
          _cache[11] || (_cache[11] = createBaseVNode("div", { class: "hero-bg" }, [
            createBaseVNode("div", { class: "pulse-circle" }),
            createBaseVNode("div", { class: "pulse-circle delay" })
          ], -1)),
          createBaseVNode("div", _hoisted_6$7, [
            _cache[10] || (_cache[10] = createStaticVNode('<span class="hero-tag animate-slide-down" data-v-51b92a09>🏆 城市最佳健身俱乐部</span><h1 class="animate-slide-up" data-v-51b92a09>专业健身<br data-v-51b92a09>科学训练</h1><p class="animate-fade-in" data-v-51b92a09>先进设备 · 专业教练 · 舒适环境 · 科学饮食</p><div class="hero-stats animate-scale-in" data-v-51b92a09><div class="stat" data-v-51b92a09><span class="stat-value" data-v-51b92a09>5000+</span><span class="stat-label" data-v-51b92a09>会员</span></div><div class="stat" data-v-51b92a09><span class="stat-value" data-v-51b92a09>50+</span><span class="stat-label" data-v-51b92a09>课程</span></div><div class="stat" data-v-51b92a09><span class="stat-value" data-v-51b92a09>30+</span><span class="stat-label" data-v-51b92a09>教练</span></div></div>', 4)),
            createBaseVNode("div", _hoisted_7$6, [
              createBaseVNode("button", {
                class: "btn-primary",
                onClick: _cache[0] || (_cache[0] = ($event) => showBooking.value = true)
              }, "预约体验"),
              _cache[9] || (_cache[9] = createBaseVNode("button", { class: "btn-outline" }, "了解更多", -1))
            ])
          ])
        ]),
        createBaseVNode("section", _hoisted_8$6, [
          createBaseVNode("div", _hoisted_9$5, [
            _cache[12] || (_cache[12] = createBaseVNode("h2", null, "📅 今日课程", -1)),
            createBaseVNode("div", _hoisted_10$5, [
              (openBlock(), createElementBlock(Fragment, null, renderList(weekDays, (day, i) => {
                return createBaseVNode("span", {
                  key: i,
                  class: normalizeClass({ active: selectedDay.value === i }),
                  onClick: ($event) => selectedDay.value = i
                }, toDisplayString(day), 11, _hoisted_11$4);
              }), 64))
            ])
          ]),
          createBaseVNode("div", _hoisted_12$4, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(todayClasses.value, (cls, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "class-card",
                style: normalizeStyle({ animationDelay: i * 0.1 + "s" })
              }, [
                createBaseVNode("div", _hoisted_13$4, [
                  createBaseVNode("span", _hoisted_14$4, toDisplayString(cls.time), 1),
                  createBaseVNode("span", _hoisted_15$4, toDisplayString(cls.duration), 1)
                ]),
                createBaseVNode("div", _hoisted_16$4, [
                  createBaseVNode("h3", null, toDisplayString(cls.name), 1),
                  createBaseVNode("p", _hoisted_17$4, "教练：" + toDisplayString(cls.instructor), 1),
                  createBaseVNode("div", _hoisted_18$3, [
                    createBaseVNode("span", {
                      class: "level",
                      style: normalizeStyle({ background: cls.levelColor })
                    }, toDisplayString(cls.level), 5),
                    createBaseVNode("span", _hoisted_19$3, "剩余" + toDisplayString(cls.spots) + "位", 1)
                  ])
                ]),
                createBaseVNode("button", {
                  class: "book-btn",
                  disabled: cls.spots === 0,
                  onClick: ($event) => bookClass(cls)
                }, toDisplayString(cls.spots > 0 ? "预约" : "已满"), 9, _hoisted_20$3)
              ], 4);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_21$3, [
          _cache[14] || (_cache[14] = createBaseVNode("div", { class: "section-header" }, [
            createBaseVNode("h2", null, "🎯 课程体系"),
            createBaseVNode("a", { class: "more-link" }, "查看全部 >")
          ], -1)),
          createBaseVNode("div", _hoisted_22$3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(programs.value, (prog, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "program-card",
                style: normalizeStyle({ animationDelay: i * 0.1 + "s" })
              }, [
                createBaseVNode("div", {
                  class: "prog-icon",
                  style: normalizeStyle({ background: prog.bg })
                }, toDisplayString(prog.icon), 5),
                createBaseVNode("h3", null, toDisplayString(prog.name), 1),
                createBaseVNode("p", null, toDisplayString(prog.desc), 1),
                createBaseVNode("div", _hoisted_23$3, [
                  createBaseVNode("span", null, toDisplayString(prog.duration), 1),
                  createBaseVNode("span", null, toDisplayString(prog.calories) + "卡/课时", 1)
                ]),
                _cache[13] || (_cache[13] = createBaseVNode("button", { class: "learn-btn" }, "了解详情", -1))
              ], 4);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_24$3, [
          _cache[16] || (_cache[16] = createBaseVNode("div", { class: "section-header" }, [
            createBaseVNode("h2", null, "⭐ 明星教练"),
            createBaseVNode("a", { class: "more-link" }, "全部教练 >")
          ], -1)),
          createBaseVNode("div", _hoisted_25$3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(trainers.value, (trainer, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "trainer-card",
                style: normalizeStyle({ animationDelay: i * 0.1 + "s" })
              }, [
                createBaseVNode("div", _hoisted_26$3, toDisplayString(trainer.avatar), 1),
                createBaseVNode("div", _hoisted_27$2, [
                  createBaseVNode("h3", null, toDisplayString(trainer.name), 1),
                  createBaseVNode("p", _hoisted_28$2, toDisplayString(trainer.title), 1),
                  createBaseVNode("p", _hoisted_29$2, "擅长：" + toDisplayString(trainer.spec), 1),
                  createBaseVNode("div", _hoisted_30$2, [
                    createBaseVNode("span", null, "学员 " + toDisplayString(trainer.students) + "+", 1),
                    createBaseVNode("span", null, "评分 " + toDisplayString(trainer.rating), 1)
                  ]),
                  _cache[15] || (_cache[15] = createBaseVNode("button", { class: "appoint-btn" }, "预约私教", -1))
                ])
              ], 4);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_31$2, [
          _cache[17] || (_cache[17] = createBaseVNode("div", { class: "section-header center" }, [
            createBaseVNode("h2", null, "💰 会员套餐"),
            createBaseVNode("p", null, "选择适合你的健身方案")
          ], -1)),
          createBaseVNode("div", _hoisted_32$2, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(pricing.value, (plan, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: normalizeClass(["pricing-card", { popular: plan.popular }]),
                style: normalizeStyle({ animationDelay: i * 0.15 + "s" })
              }, [
                plan.popular ? (openBlock(), createElementBlock("div", _hoisted_33$2, "最受欢迎")) : createCommentVNode("", true),
                createBaseVNode("h3", null, toDisplayString(plan.name), 1),
                createBaseVNode("div", _hoisted_34$2, [
                  createBaseVNode("span", _hoisted_35$2, "¥" + toDisplayString(plan.price), 1),
                  createBaseVNode("span", _hoisted_36$2, "/" + toDisplayString(plan.period), 1)
                ]),
                createBaseVNode("ul", _hoisted_37$2, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(plan.features, (f, j) => {
                    return openBlock(), createElementBlock("li", {
                      key: j,
                      class: normalizeClass({ check: f.included })
                    }, toDisplayString(f.included ? "✓" : "✗") + " " + toDisplayString(f.name), 3);
                  }), 128))
                ]),
                createBaseVNode("button", {
                  class: normalizeClass(["buy-btn", { primary: plan.popular }])
                }, "立即购买", 2)
              ], 6);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_38$2, [
          _cache[18] || (_cache[18] = createBaseVNode("h2", null, "🏠 场馆环境", -1)),
          createBaseVNode("div", _hoisted_39$2, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(gallery.value, (item, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "gallery-item",
                style: normalizeStyle({ background: item.bg })
              }, [
                createBaseVNode("span", _hoisted_40$2, toDisplayString(item.icon), 1),
                createBaseVNode("span", _hoisted_41$2, toDisplayString(item.name), 1)
              ], 4);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_42$2, [
          _cache[19] || (_cache[19] = createBaseVNode("h2", null, "💬 会员评价", -1)),
          createBaseVNode("div", _hoisted_43$2, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(reviews.value, (review, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "review-card"
              }, [
                createBaseVNode("div", _hoisted_44$2, [
                  createBaseVNode("span", _hoisted_45$2, toDisplayString(review.avatar), 1),
                  createBaseVNode("div", null, [
                    createBaseVNode("span", _hoisted_46$2, toDisplayString(review.name), 1),
                    createBaseVNode("span", _hoisted_47$2, "⭐ " + toDisplayString(review.rating), 1)
                  ])
                ]),
                createBaseVNode("p", _hoisted_48$2, '"' + toDisplayString(review.content) + '"', 1),
                createBaseVNode("span", _hoisted_49$2, toDisplayString(review.date), 1)
              ]);
            }), 128))
          ])
        ]),
        _cache[23] || (_cache[23] = createStaticVNode('<footer class="footer" data-v-51b92a09><div class="footer-main" data-v-51b92a09><div class="footer-info" data-v-51b92a09><div class="footer-brand" data-v-51b92a09>💪 SuperFit健身</div><p data-v-51b92a09>营业时间：6:00 - 23:00</p><p data-v-51b92a09>地址：城市中心广场3楼</p><p data-v-51b92a09>电话：400-888-8888</p></div><div class="footer-links" data-v-51b92a09><a data-v-51b92a09>关于我们</a><a data-v-51b92a09>课程介绍</a><a data-v-51b92a09>教练团队</a><a data-v-51b92a09>常见问题</a></div><div class="footer-qr" data-v-51b92a09><div class="qr-placeholder" data-v-51b92a09>📱</div><p data-v-51b92a09>扫码预约体验</p></div></div><p class="copyright" data-v-51b92a09>© 2024 SuperFit健身 版权所有</p></footer>', 1)),
        showBooking.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal",
          onClick: _cache[6] || (_cache[6] = withModifiers(($event) => showBooking.value = false, ["self"]))
        }, [
          createBaseVNode("div", _hoisted_50$2, [
            _cache[22] || (_cache[22] = createBaseVNode("h3", null, "预约免费体验", -1)),
            createBaseVNode("form", {
              onSubmit: withModifiers(submitBooking, ["prevent"])
            }, [
              withDirectives(createBaseVNode("input", {
                type: "text",
                placeholder: "您的姓名",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => booking.value.name = $event),
                required: ""
              }, null, 512), [
                [vModelText, booking.value.name]
              ]),
              withDirectives(createBaseVNode("input", {
                type: "tel",
                placeholder: "联系电话",
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => booking.value.phone = $event),
                required: ""
              }, null, 512), [
                [vModelText, booking.value.phone]
              ]),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => booking.value.type = $event)
              }, [..._cache[20] || (_cache[20] = [
                createBaseVNode("option", { value: "" }, "选择体验项目", -1),
                createBaseVNode("option", null, "器械训练", -1),
                createBaseVNode("option", null, "瑜伽课程", -1),
                createBaseVNode("option", null, "动感单车", -1),
                createBaseVNode("option", null, "拳击训练", -1)
              ])], 512), [
                [vModelSelect, booking.value.type]
              ]),
              withDirectives(createBaseVNode("input", {
                type: "date",
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => booking.value.date = $event),
                required: ""
              }, null, 512), [
                [vModelText, booking.value.date]
              ]),
              _cache[21] || (_cache[21] = createBaseVNode("button", {
                type: "submit",
                class: "submit-btn"
              }, "确认预约", -1))
            ], 32),
            createBaseVNode("button", {
              class: "close-btn",
              onClick: _cache[5] || (_cache[5] = ($event) => showBooking.value = false)
            }, "×")
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
};
const FitnessTemplate = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-51b92a09"]]);
const _hoisted_1$6 = { class: "tech-template" };
const _hoisted_2$6 = { class: "navbar" };
const _hoisted_3$6 = { class: "nav-left" };
const _hoisted_4$6 = { class: "nav-links" };
const _hoisted_5$6 = { class: "category-nav" };
const _hoisted_6$6 = { class: "category-container" };
const _hoisted_7$5 = { class: "category-list" };
const _hoisted_8$5 = { class: "hero-banner" };
const _hoisted_9$4 = { class: "banner-container" };
const _hoisted_10$4 = { class: "banner-content" };
const _hoisted_11$3 = {
  key: 0,
  class: "banner-tag"
};
const _hoisted_12$3 = { class: "banner-price" };
const _hoisted_13$3 = { class: "price-value" };
const _hoisted_14$3 = { class: "banner-visual" };
const _hoisted_15$3 = { class: "banner-emoji" };
const _hoisted_16$3 = { class: "banner-dots" };
const _hoisted_17$3 = ["onClick"];
const _hoisted_18$2 = { class: "banner-side" };
const _hoisted_19$2 = { class: "side-info" };
const _hoisted_20$2 = { class: "side-title" };
const _hoisted_21$2 = { class: "side-price" };
const _hoisted_22$2 = { class: "side-emoji" };
const _hoisted_23$2 = { class: "hot-products" };
const _hoisted_24$2 = { class: "products-grid" };
const _hoisted_25$2 = { class: "product-emoji" };
const _hoisted_26$2 = {
  key: 0,
  class: "product-tag"
};
const _hoisted_27$1 = { class: "product-info" };
const _hoisted_28$1 = { class: "product-desc" };
const _hoisted_29$1 = { class: "product-price" };
const _hoisted_30$1 = { class: "current" };
const _hoisted_31$1 = {
  key: 0,
  class: "original"
};
const _hoisted_32$1 = { class: "product-sales" };
const _hoisted_33$1 = { class: "new-releases" };
const _hoisted_34$1 = { class: "releases-grid" };
const _hoisted_35$1 = { class: "release-emoji" };
const _hoisted_36$1 = { class: "release-body" };
const _hoisted_37$1 = { class: "release-specs" };
const _hoisted_38$1 = { class: "release-features" };
const _hoisted_39$1 = { class: "release-footer" };
const _hoisted_40$1 = { class: "release-price" };
const _hoisted_41$1 = { class: "services" };
const _hoisted_42$1 = { class: "service-icon" };
const _hoisted_43$1 = { class: "service-info" };
const _hoisted_44$1 = { class: "service-title" };
const _hoisted_45$1 = { class: "service-desc" };
const _hoisted_46$1 = { class: "smart-home" };
const _hoisted_47$1 = { class: "home-grid" };
const _hoisted_48$1 = { class: "home-emoji" };
const _hoisted_49$1 = { class: "home-info" };
const _hoisted_50$1 = { class: "home-price" };
const _hoisted_51$1 = { class: "home-side" };
const _hoisted_52$1 = { class: "home-item-info" };
const _hoisted_53$1 = { class: "home-item-name" };
const _hoisted_54$1 = { class: "home-item-price" };
const _hoisted_55$1 = { class: "home-item-emoji" };
const _hoisted_56$1 = { class: "footer" };
const _hoisted_57$1 = { class: "footer-main" };
const _hoisted_58$1 = { class: "footer-links" };
const _sfc_main$6 = {
  __name: "PetTemplate",
  setup(__props) {
    const navLinks = ["手机", "电视", "笔记本", "平板", "穿戴", "音频", "路由", "智能家居"];
    const categories = ["手机通讯", "电视影音", "电脑平板", "智能穿戴", "智能家居", "生活电器", "出行户外"];
    const currentBanner = /* @__PURE__ */ ref(0);
    const banners = /* @__PURE__ */ ref([
      { emoji: "📱", title: "米14 Pro", desc: "骁龙8 Gen3 | 徕卡影像 | IP68防水", price: 4999, tag: "热卖", bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" },
      { emoji: "📺", title: '米电视 大师 86"', desc: "Mini LED | 4K 144Hz | 杜比全景声", price: 12999, tag: "旗舰", bg: "linear-gradient(135deg, #0f3460 0%, #16213e 100%)" },
      { emoji: "⌚", title: "米手表 S3", desc: "AMOLED屏幕 | eSIM独立通话 | 14天续航", price: 1299, tag: "新品", bg: "linear-gradient(135deg, #1a1a2e 0%, #2c3e50 100%)" }
    ]);
    const sideItems = /* @__PURE__ */ ref([
      { emoji: "🎧", title: "降噪耳机4 Pro", price: 999, bg: "linear-gradient(135deg, #667eea, #764ba2)" },
      { emoji: "💻", title: "米笔记本Pro 16", price: 6499, bg: "linear-gradient(135deg, #f093fb, #f5576c)" },
      { emoji: "🎮", title: "游戏手柄Pro", price: 299, bg: "linear-gradient(135deg, #4facfe, #00f2fe)" }
    ]);
    const hotProducts = /* @__PURE__ */ ref([
      { emoji: "📱", name: "米14", desc: "骁龙8 Gen3 | 徕卡专业光学", price: 3999, original: 4299, sales: 12580, tag: "热卖", bg: "linear-gradient(135deg, #2c3e50, #3498db)" },
      { emoji: "⌚", name: "手环8 Pro", desc: "AMOLED屏 | 血氧监测 | 15天续航", price: 349, sales: 8920, bg: "linear-gradient(135deg, #e74c3c, #c0392b)" },
      { emoji: "🔊", name: "米音箱Pro", desc: "HIFI音质 | 智能语音 | 全屋控制", price: 399, sales: 6750, bg: "linear-gradient(135deg, #f39c12, #e67e22)" },
      { emoji: "🔌", name: "智能插座2", desc: "远程控制 | 功率统计 | 过载保护", price: 49, sales: 23450, bg: "linear-gradient(135deg, #27ae60, #2ecc71)" },
      { emoji: "💡", name: "智能台灯Pro", desc: "护眼光源 | APP控制 | 定时开关", price: 199, sales: 11230, tag: "爆款", bg: "linear-gradient(135deg, #9b59b6, #8e44ad)" }
    ]);
    const newReleases = /* @__PURE__ */ ref([
      { emoji: "📱", name: "米14 Ultra", specs: "骁龙8 Gen3 | 16GB+512GB", features: ["徕卡四摄", "卫星通信", "钛合金机身"], price: 6499, bg: "linear-gradient(135deg, #1a1a2e, #2c3e50)" },
      { emoji: "💻", name: "米笔记本Air 14", specs: "酷睿Ultra7 | 16GB+512GB", features: ["2.8K OLED", "轻薄机身", "长续航"], price: 5499, bg: "linear-gradient(135deg, #34495e, #2c3e50)" },
      { emoji: "⌚", name: "米手表S3 eSIM", specs: "独立通话 | 14天续航", features: ["钛金属", "蓝宝石镜面", "健康监测"], price: 1999, bg: "linear-gradient(135deg, #2c3e50, #4a69bd)" }
    ]);
    const services = /* @__PURE__ */ ref([
      { icon: "🚚", title: "全国配送", desc: "满99包邮，急速送达" },
      { icon: "🔄", title: "7天无理由", desc: "退换无忧，售后保障" },
      { icon: "🛠️", title: "专业维修", desc: "官方售后，品质保障" },
      { icon: "💬", title: "在线客服", desc: "7x24小时，随时解答" }
    ]);
    const smartHome = /* @__PURE__ */ ref({
      main: { emoji: "🏠", name: "全屋智能套装", desc: "一键控制全屋智能设备", price: 2999, bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" },
      items: [
        { emoji: "💡", name: "智能吸顶灯", price: 299, bg: "linear-gradient(135deg, #f39c12, #e67e22)" },
        { emoji: "🌡️", name: "温湿度传感器", price: 79, bg: "linear-gradient(135deg, #3498db, #2980b9)" },
        { emoji: "🔒", name: "智能门锁X", price: 1299, bg: "linear-gradient(135deg, #2c3e50, #34495e)" },
        { emoji: "📹", name: "摄像头Pro", price: 399, bg: "linear-gradient(135deg, #e74c3c, #c0392b)" }
      ]
    });
    const footerLinks = /* @__PURE__ */ ref([
      { title: "帮助中心", links: ["账户管理", "购物指南", "订单操作"] },
      { title: "服务支持", links: ["售后政策", "自助服务", "相关下载"] },
      { title: "线下门店", links: ["米之家", "服务网点", "授权体验店"] },
      { title: "关于米科技", links: ["了解我们", "加入我们", "联系我们"] }
    ]);
    let bannerTimer = null;
    onMounted(() => {
      bannerTimer = setInterval(() => {
        currentBanner.value = (currentBanner.value + 1) % banners.value.length;
      }, 4e3);
    });
    onUnmounted(() => {
      if (bannerTimer) clearInterval(bannerTimer);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        _cache[12] || (_cache[12] = createBaseVNode("div", { class: "top-bar" }, [
          createBaseVNode("div", { class: "top-content" }, [
            createBaseVNode("span", null, "新品首发 | 智能手表Pro 限时立减200元"),
            createBaseVNode("a", null, "立即查看 >")
          ])
        ], -1)),
        createBaseVNode("nav", _hoisted_2$6, [
          createBaseVNode("div", _hoisted_3$6, [
            _cache[0] || (_cache[0] = createBaseVNode("div", { class: "logo" }, [
              createBaseVNode("span", { class: "logo-icon" }, "MI"),
              createBaseVNode("span", { class: "logo-text" }, "米科技")
            ], -1)),
            createBaseVNode("div", _hoisted_4$6, [
              (openBlock(), createElementBlock(Fragment, null, renderList(navLinks, (link, i) => {
                return createBaseVNode("a", {
                  key: i,
                  class: normalizeClass(["nav-link", { active: i === 0 }])
                }, toDisplayString(link), 3);
              }), 64))
            ])
          ]),
          _cache[1] || (_cache[1] = createStaticVNode('<div class="nav-right" data-v-156d92ec><div class="search-box" data-v-156d92ec><input type="text" placeholder="搜索商品" data-v-156d92ec><button class="search-btn" data-v-156d92ec>🔍</button></div><div class="user-actions" data-v-156d92ec><a class="user-link" data-v-156d92ec>登录</a><a class="user-link" data-v-156d92ec>注册</a><a class="cart-link" data-v-156d92ec><span data-v-156d92ec>🛒</span><span class="cart-count" data-v-156d92ec>2</span></a></div></div>', 1))
        ]),
        createBaseVNode("div", _hoisted_5$6, [
          createBaseVNode("div", _hoisted_6$6, [
            _cache[2] || (_cache[2] = createBaseVNode("div", { class: "category-menu" }, [
              createBaseVNode("span", { class: "menu-title" }, "全部商品分类")
            ], -1)),
            createBaseVNode("div", _hoisted_7$5, [
              (openBlock(), createElementBlock(Fragment, null, renderList(categories, (cat, i) => {
                return createBaseVNode("a", {
                  key: i,
                  class: "cat-item"
                }, toDisplayString(cat), 1);
              }), 64))
            ])
          ])
        ]),
        createBaseVNode("section", _hoisted_8$5, [
          createBaseVNode("div", _hoisted_9$4, [
            createBaseVNode("div", {
              class: "banner-slide",
              style: normalizeStyle({ background: banners.value[currentBanner.value].bg })
            }, [
              createBaseVNode("div", _hoisted_10$4, [
                banners.value[currentBanner.value].tag ? (openBlock(), createElementBlock("div", _hoisted_11$3, toDisplayString(banners.value[currentBanner.value].tag), 1)) : createCommentVNode("", true),
                createBaseVNode("h2", null, toDisplayString(banners.value[currentBanner.value].title), 1),
                createBaseVNode("p", null, toDisplayString(banners.value[currentBanner.value].desc), 1),
                createBaseVNode("div", _hoisted_12$3, [
                  _cache[3] || (_cache[3] = createBaseVNode("span", { class: "price-label" }, "起售价", -1)),
                  createBaseVNode("span", _hoisted_13$3, "¥" + toDisplayString(banners.value[currentBanner.value].price), 1)
                ]),
                _cache[4] || (_cache[4] = createBaseVNode("button", { class: "banner-btn" }, "立即购买", -1))
              ]),
              createBaseVNode("div", _hoisted_14$3, [
                createBaseVNode("span", _hoisted_15$3, toDisplayString(banners.value[currentBanner.value].emoji), 1)
              ])
            ], 4),
            createBaseVNode("div", _hoisted_16$3, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(banners.value, (b, i) => {
                return openBlock(), createElementBlock("span", {
                  key: i,
                  class: normalizeClass(["dot", { active: i === currentBanner.value }]),
                  onClick: ($event) => currentBanner.value = i
                }, null, 10, _hoisted_17$3);
              }), 128))
            ]),
            createBaseVNode("div", _hoisted_18$2, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(sideItems.value, (item, i) => {
                return openBlock(), createElementBlock("div", {
                  key: i,
                  class: "side-item",
                  style: normalizeStyle({ background: item.bg })
                }, [
                  createBaseVNode("div", _hoisted_19$2, [
                    createBaseVNode("span", _hoisted_20$2, toDisplayString(item.title), 1),
                    createBaseVNode("span", _hoisted_21$2, "¥" + toDisplayString(item.price) + "起", 1)
                  ]),
                  createBaseVNode("span", _hoisted_22$2, toDisplayString(item.emoji), 1)
                ], 4);
              }), 128))
            ])
          ])
        ]),
        createBaseVNode("section", _hoisted_23$2, [
          _cache[5] || (_cache[5] = createBaseVNode("div", { class: "section-header" }, [
            createBaseVNode("h2", null, "热门商品"),
            createBaseVNode("a", { class: "more-link" }, "查看全部 >")
          ], -1)),
          createBaseVNode("div", _hoisted_24$2, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(hotProducts.value, (product, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "product-card",
                style: normalizeStyle({ animationDelay: i * 0.1 + "s" })
              }, [
                createBaseVNode("div", {
                  class: "product-image",
                  style: normalizeStyle({ background: product.bg })
                }, [
                  createBaseVNode("span", _hoisted_25$2, toDisplayString(product.emoji), 1),
                  product.tag ? (openBlock(), createElementBlock("span", _hoisted_26$2, toDisplayString(product.tag), 1)) : createCommentVNode("", true)
                ], 4),
                createBaseVNode("div", _hoisted_27$1, [
                  createBaseVNode("h3", null, toDisplayString(product.name), 1),
                  createBaseVNode("p", _hoisted_28$1, toDisplayString(product.desc), 1),
                  createBaseVNode("div", _hoisted_29$1, [
                    createBaseVNode("span", _hoisted_30$1, "¥" + toDisplayString(product.price), 1),
                    product.original ? (openBlock(), createElementBlock("span", _hoisted_31$1, "¥" + toDisplayString(product.original), 1)) : createCommentVNode("", true)
                  ]),
                  createBaseVNode("div", _hoisted_32$1, "已售" + toDisplayString(product.sales) + "+", 1)
                ])
              ], 4);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_33$1, [
          _cache[8] || (_cache[8] = createBaseVNode("div", { class: "section-header" }, [
            createBaseVNode("h2", null, "新品发布"),
            createBaseVNode("a", { class: "more-link" }, "更多新品 >")
          ], -1)),
          createBaseVNode("div", _hoisted_34$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(newReleases.value, (item, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "release-card",
                style: normalizeStyle({ animationDelay: i * 0.15 + "s" })
              }, [
                createBaseVNode("div", {
                  class: "release-header",
                  style: normalizeStyle({ background: item.bg })
                }, [
                  createBaseVNode("span", _hoisted_35$1, toDisplayString(item.emoji), 1),
                  _cache[6] || (_cache[6] = createBaseVNode("span", { class: "release-badge" }, "新品", -1))
                ], 4),
                createBaseVNode("div", _hoisted_36$1, [
                  createBaseVNode("h3", null, toDisplayString(item.name), 1),
                  createBaseVNode("p", _hoisted_37$1, toDisplayString(item.specs), 1),
                  createBaseVNode("div", _hoisted_38$1, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.features, (f, fi) => {
                      return openBlock(), createElementBlock("span", { key: fi }, toDisplayString(f), 1);
                    }), 128))
                  ]),
                  createBaseVNode("div", _hoisted_39$1, [
                    createBaseVNode("span", _hoisted_40$1, "¥" + toDisplayString(item.price) + "起", 1),
                    _cache[7] || (_cache[7] = createBaseVNode("button", { class: "buy-btn" }, "了解详情", -1))
                  ])
                ])
              ], 4);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_41$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(services.value, (s, i) => {
            return openBlock(), createElementBlock("div", {
              class: "service-item",
              key: i
            }, [
              createBaseVNode("span", _hoisted_42$1, toDisplayString(s.icon), 1),
              createBaseVNode("div", _hoisted_43$1, [
                createBaseVNode("span", _hoisted_44$1, toDisplayString(s.title), 1),
                createBaseVNode("span", _hoisted_45$1, toDisplayString(s.desc), 1)
              ])
            ]);
          }), 128))
        ]),
        createBaseVNode("section", _hoisted_46$1, [
          _cache[9] || (_cache[9] = createBaseVNode("div", { class: "section-header" }, [
            createBaseVNode("h2", null, "智能家居"),
            createBaseVNode("a", { class: "more-link" }, "探索更多 >")
          ], -1)),
          createBaseVNode("div", _hoisted_47$1, [
            createBaseVNode("div", {
              class: "home-main",
              style: normalizeStyle({ background: smartHome.value.main.bg })
            }, [
              createBaseVNode("span", _hoisted_48$1, toDisplayString(smartHome.value.main.emoji), 1),
              createBaseVNode("div", _hoisted_49$1, [
                createBaseVNode("h3", null, toDisplayString(smartHome.value.main.name), 1),
                createBaseVNode("p", null, toDisplayString(smartHome.value.main.desc), 1),
                createBaseVNode("span", _hoisted_50$1, "¥" + toDisplayString(smartHome.value.main.price) + "起", 1)
              ])
            ], 4),
            createBaseVNode("div", _hoisted_51$1, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(smartHome.value.items, (item, i) => {
                return openBlock(), createElementBlock("div", {
                  key: i,
                  class: "home-item",
                  style: normalizeStyle({ background: item.bg, animationDelay: i * 0.1 + "s" })
                }, [
                  createBaseVNode("div", _hoisted_52$1, [
                    createBaseVNode("span", _hoisted_53$1, toDisplayString(item.name), 1),
                    createBaseVNode("span", _hoisted_54$1, "¥" + toDisplayString(item.price), 1)
                  ]),
                  createBaseVNode("span", _hoisted_55$1, toDisplayString(item.emoji), 1)
                ], 4);
              }), 128))
            ])
          ])
        ]),
        createBaseVNode("footer", _hoisted_56$1, [
          createBaseVNode("div", _hoisted_57$1, [
            createBaseVNode("div", _hoisted_58$1, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(footerLinks.value, (group, i) => {
                return openBlock(), createElementBlock("div", {
                  class: "link-group",
                  key: i
                }, [
                  createBaseVNode("h4", null, toDisplayString(group.title), 1),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(group.links, (link, li) => {
                    return openBlock(), createElementBlock("a", { key: li }, toDisplayString(link), 1);
                  }), 128))
                ]);
              }), 128))
            ]),
            _cache[10] || (_cache[10] = createStaticVNode('<div class="footer-contact" data-v-156d92ec><div class="hotline" data-v-156d92ec><span class="hotline-label" data-v-156d92ec>客服热线</span><span class="hotline-number" data-v-156d92ec>400-100-5678</span></div><div class="contact-btns" data-v-156d92ec><button class="contact-btn" data-v-156d92ec>人工客服</button><button class="contact-btn outline" data-v-156d92ec>在线反馈</button></div></div>', 1))
          ]),
          _cache[11] || (_cache[11] = createBaseVNode("div", { class: "footer-bottom" }, [
            createBaseVNode("p", null, "© 2024 米科技 版权所有 | 京ICP备10046444号")
          ], -1))
        ])
      ]);
    };
  }
};
const PetTemplate = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-156d92ec"]]);
const _hoisted_1$5 = { class: "portfolio-template" };
const _hoisted_2$5 = { class: "navbar" };
const _hoisted_3$5 = { class: "nav-links" };
const _hoisted_4$5 = { class: "skills-section" };
const _hoisted_5$5 = { class: "skills-grid" };
const _hoisted_6$5 = { class: "skill-name" };
const _hoisted_7$4 = { class: "skill-bar" };
const _hoisted_8$4 = { class: "works" };
const _hoisted_9$3 = { class: "works-grid" };
const _hoisted_10$3 = { class: "work-icon" };
const _hoisted_11$2 = { class: "work-info" };
const _hoisted_12$2 = { class: "experience" };
const _hoisted_13$2 = { class: "exp-timeline" };
const _hoisted_14$2 = { class: "exp-period" };
const _hoisted_15$2 = { class: "exp-content" };
const _hoisted_16$2 = { class: "exp-role" };
const _hoisted_17$2 = { class: "exp-desc" };
const _sfc_main$5 = {
  __name: "PortfolioTemplate",
  setup(__props) {
    const navLinks = ["首页", "作品", "经历", "联系"];
    const skills = /* @__PURE__ */ ref([
      { name: "UI设计", level: 95 },
      { name: "UX设计", level: 90 },
      { name: "Figma", level: 95 },
      { name: "Sketch", level: 85 },
      { name: "Photoshop", level: 80 },
      { name: "After Effects", level: 70 }
    ]);
    const works = /* @__PURE__ */ ref([
      { icon: "📱", title: "电商App重设计", category: "移动端UI", bg: "linear-gradient(135deg, #667eea, #764ba2)" },
      { icon: "💻", title: "企业管理后台", category: "Web端UI", bg: "linear-gradient(135deg, #f093fb, #f5576c)" },
      { icon: "🏦", title: "金融理财App", category: "移动端UI", bg: "linear-gradient(135deg, #4facfe, #00f2fe)" },
      { icon: "🏥", title: "医疗预约系统", category: "产品设计", bg: "linear-gradient(135deg, #43e97b, #38f9d7)" },
      { icon: "🛒", title: "新零售小程序", category: "小程序UI", bg: "linear-gradient(135deg, #fa709a, #fee140)" },
      { icon: "📊", title: "数据可视化大屏", category: "数据可视化", bg: "linear-gradient(135deg, #a18cd1, #fbc2eb)" }
    ]);
    const experience = /* @__PURE__ */ ref([
      { period: "2022 - 至今", company: "某科技公司", role: "高级UI设计师", desc: "负责公司核心产品的UI设计工作" },
      { period: "2020 - 2022", company: "某设计工作室", role: "UI设计师", desc: "为客户提供品牌和界面设计服务" },
      { period: "2019 - 2020", company: "某互联网公司", role: "UI设计师", desc: "参与多个Web和移动项目设计" }
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        createBaseVNode("nav", _hoisted_2$5, [
          _cache[0] || (_cache[0] = createBaseVNode("div", { class: "logo" }, "张明 / 设计师", -1)),
          createBaseVNode("div", _hoisted_3$5, [
            (openBlock(), createElementBlock(Fragment, null, renderList(navLinks, (link, i) => {
              return createBaseVNode("a", {
                key: i,
                class: "nav-link"
              }, toDisplayString(link), 1);
            }), 64))
          ])
        ]),
        _cache[4] || (_cache[4] = createStaticVNode('<section class="hero" data-v-9de3576b><div class="hero-visual" data-v-9de3576b><div class="floating-shape shape1" data-v-9de3576b></div><div class="floating-shape shape2" data-v-9de3576b></div></div><div class="hero-content" data-v-9de3576b><span class="greeting animate-slide-down" data-v-9de3576b>你好，我是</span><h1 class="animate-slide-up" data-v-9de3576b><span class="name" data-v-9de3576b>张明</span><span class="role" data-v-9de3576b>UI/UX Designer</span></h1><p class="hero-desc animate-fade-in" data-v-9de3576b>5年设计经验，专注于移动端产品设计和企业级应用</p><div class="hero-buttons animate-scale-in" data-v-9de3576b><button class="btn-primary" data-v-9de3576b>查看作品</button><button class="btn-outline" data-v-9de3576b>下载简历</button></div></div></section>', 1)),
        createBaseVNode("section", _hoisted_4$5, [
          _cache[1] || (_cache[1] = createBaseVNode("h2", null, "专业技能", -1)),
          createBaseVNode("div", _hoisted_5$5, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(skills.value, (skill, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "skill-item",
                style: normalizeStyle({ animationDelay: i * 0.1 + "s" })
              }, [
                createBaseVNode("span", _hoisted_6$5, toDisplayString(skill.name), 1),
                createBaseVNode("div", _hoisted_7$4, [
                  createBaseVNode("div", {
                    class: "skill-level",
                    style: normalizeStyle({ width: skill.level + "%" })
                  }, null, 4)
                ])
              ], 4);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_8$4, [
          _cache[2] || (_cache[2] = createBaseVNode("h2", null, "代表作品", -1)),
          createBaseVNode("div", _hoisted_9$3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(works.value, (work, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "work-card",
                style: normalizeStyle({ animationDelay: i * 0.15 + "s" })
              }, [
                createBaseVNode("div", {
                  class: "work-image",
                  style: normalizeStyle({ background: work.bg })
                }, [
                  createBaseVNode("span", _hoisted_10$3, toDisplayString(work.icon), 1)
                ], 4),
                createBaseVNode("div", _hoisted_11$2, [
                  createBaseVNode("h3", null, toDisplayString(work.title), 1),
                  createBaseVNode("p", null, toDisplayString(work.category), 1)
                ])
              ], 4);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_12$2, [
          _cache[3] || (_cache[3] = createBaseVNode("h2", null, "工作经历", -1)),
          createBaseVNode("div", _hoisted_13$2, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(experience.value, (exp, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "exp-item",
                style: normalizeStyle({ animationDelay: i * 0.2 + "s" })
              }, [
                createBaseVNode("div", _hoisted_14$2, toDisplayString(exp.period), 1),
                createBaseVNode("div", _hoisted_15$2, [
                  createBaseVNode("h3", null, toDisplayString(exp.company), 1),
                  createBaseVNode("p", _hoisted_16$2, toDisplayString(exp.role), 1),
                  createBaseVNode("p", _hoisted_17$2, toDisplayString(exp.desc), 1)
                ])
              ], 4);
            }), 128))
          ])
        ]),
        _cache[5] || (_cache[5] = createStaticVNode('<section class="contact animate-scale-in" data-v-9de3576b><h2 data-v-9de3576b>联系我</h2><div class="contact-info" data-v-9de3576b><div class="contact-item" data-v-9de3576b><span class="label" data-v-9de3576b>邮箱</span><span data-v-9de3576b>zhangming@example.com</span></div><div class="contact-item" data-v-9de3576b><span class="label" data-v-9de3576b>电话</span><span data-v-9de3576b>138-0000-0000</span></div></div></section><footer class="footer" data-v-9de3576b><p data-v-9de3576b>© 2024 张明 - UI/UX设计师</p></footer>', 2))
      ]);
    };
  }
};
const PortfolioTemplate = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-9de3576b"]]);
const _hoisted_1$4 = { class: "restaurant-template" };
const _hoisted_2$4 = { class: "navbar" };
const _hoisted_3$4 = { class: "nav-links" };
const _hoisted_4$4 = { class: "specials" };
const _hoisted_5$4 = { class: "dishes-grid" };
const _hoisted_6$4 = { class: "dish-emoji" };
const _hoisted_7$3 = {
  key: 0,
  class: "dish-tag"
};
const _hoisted_8$3 = { class: "dish-info" };
const _hoisted_9$2 = { class: "dish-footer" };
const _hoisted_10$2 = { class: "price" };
const _sfc_main$4 = {
  __name: "RestaurantTemplate",
  setup(__props) {
    const navLinks = ["首页", "菜单", "关于", "联系"];
    const dishes = /* @__PURE__ */ ref([
      { emoji: "🐟", name: "西湖醋鱼", desc: "正宗杭帮菜，酸甜适口", price: 88, tag: "招牌", bg: "linear-gradient(135deg, #c0392b, #e74c3c)" },
      { emoji: "🥩", name: "东坡肉", desc: "肥而不腻，入口即化", price: 78, tag: "推荐", bg: "linear-gradient(135deg, #8b4513, #a0522d)" },
      { emoji: "🍜", name: "片儿川", desc: "杭州传统面食", price: 28, bg: "linear-gradient(135deg, #d4a574, #deb887)" },
      { emoji: "🥬", name: "龙井虾仁", desc: "明前龙井配鲜虾", price: 98, bg: "linear-gradient(135deg, #2e8b57, #3cb371)" },
      { emoji: "🍲", name: "老鸭煲", desc: "文火慢炖，滋补养生", price: 128, bg: "linear-gradient(135deg, #4a4a4a, #666)" },
      { emoji: "🍰", name: "桂花糖藕", desc: "应季甜品，清香软糯", price: 38, bg: "linear-gradient(135deg, #deb887, #f5deb3)" }
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        createBaseVNode("nav", _hoisted_2$4, [
          _cache[0] || (_cache[0] = createBaseVNode("div", { class: "logo" }, "江南小馆", -1)),
          createBaseVNode("div", _hoisted_3$4, [
            (openBlock(), createElementBlock(Fragment, null, renderList(navLinks, (link, i) => {
              return createBaseVNode("a", { key: i }, toDisplayString(link), 1);
            }), 64))
          ]),
          _cache[1] || (_cache[1] = createBaseVNode("button", { class: "reserve-btn" }, "预约订座", -1))
        ]),
        _cache[4] || (_cache[4] = createStaticVNode('<section class="hero" data-v-641a5a5d><div class="hero-bg" data-v-641a5a5d><div class="steam steam1" data-v-641a5a5d></div><div class="steam steam2" data-v-641a5a5d></div></div><div class="hero-content" data-v-641a5a5d><span class="badge animate-scale-in" data-v-641a5a5d>地道江南风味</span><h1 class="animate-slide-up" data-v-641a5a5d>江南小馆</h1><p class="animate-fade-in" data-v-641a5a5d>传承百年工艺，精选本地食材</p><div class="hero-buttons animate-scale-in" data-v-641a5a5d><button class="btn-primary" data-v-641a5a5d>查看菜单</button><button class="btn-outline" data-v-641a5a5d>在线预订</button></div></div></section>', 1)),
        createBaseVNode("section", _hoisted_4$4, [
          _cache[3] || (_cache[3] = createBaseVNode("h2", null, "招牌菜品", -1)),
          createBaseVNode("div", _hoisted_5$4, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(dishes.value, (dish, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "dish-card",
                style: normalizeStyle({ animationDelay: i * 0.1 + "s" })
              }, [
                createBaseVNode("div", {
                  class: "dish-image",
                  style: normalizeStyle({ background: dish.bg })
                }, [
                  createBaseVNode("span", _hoisted_6$4, toDisplayString(dish.emoji), 1),
                  dish.tag ? (openBlock(), createElementBlock("span", _hoisted_7$3, toDisplayString(dish.tag), 1)) : createCommentVNode("", true)
                ], 4),
                createBaseVNode("div", _hoisted_8$3, [
                  createBaseVNode("h3", null, toDisplayString(dish.name), 1),
                  createBaseVNode("p", null, toDisplayString(dish.desc), 1),
                  createBaseVNode("div", _hoisted_9$2, [
                    createBaseVNode("span", _hoisted_10$2, "¥" + toDisplayString(dish.price), 1),
                    _cache[2] || (_cache[2] = createBaseVNode("button", { class: "add-btn" }, "点餐", -1))
                  ])
                ])
              ], 4);
            }), 128))
          ])
        ]),
        _cache[5] || (_cache[5] = createStaticVNode('<section class="about" data-v-641a5a5d><div class="about-content" data-v-641a5a5d><h2 data-v-641a5a5d>关于我们</h2><p data-v-641a5a5d>江南小馆创立于2010年，主打正宗江浙菜系。我们坚持选用当季新鲜食材，传承传统烹饪工艺，为食客呈现地道的江南风味。</p><div class="features" data-v-641a5a5d><div class="feature" data-v-641a5a5d><span class="feature-icon" data-v-641a5a5d>🏠</span><span data-v-641a5a5d>私密包厢</span></div><div class="feature" data-v-641a5a5d><span class="feature-icon" data-v-641a5a5d>🅿️</span><span data-v-641a5a5d>免费停车</span></div><div class="feature" data-v-641a5a5d><span class="feature-icon" data-v-641a5a5d>👶</span><span data-v-641a5a5d>儿童座椅</span></div></div></div></section><section class="reservation" data-v-641a5a5d><h2 data-v-641a5a5d>在线预订</h2><div class="res-form" data-v-641a5a5d><input type="text" placeholder="您的姓名" data-v-641a5a5d><input type="tel" placeholder="联系电话" data-v-641a5a5d><input type="date" data-v-641a5a5d><select data-v-641a5a5d><option data-v-641a5a5d>选择时间</option><option data-v-641a5a5d>11:00</option><option data-v-641a5a5d>12:00</option><option data-v-641a5a5d>18:00</option></select><select data-v-641a5a5d><option data-v-641a5a5d>用餐人数</option><option data-v-641a5a5d>2人</option><option data-v-641a5a5d>4人</option><option data-v-641a5a5d>6人</option></select><button class="submit-btn" data-v-641a5a5d>确认预订</button></div></section><footer class="footer" data-v-641a5a5d><div class="footer-info" data-v-641a5a5d><div class="footer-brand" data-v-641a5a5d>江南小馆</div><p data-v-641a5a5d>营业时间: 周一至周日 11:00 - 22:00</p><p data-v-641a5a5d>地址: 城市中心大道88号</p><p data-v-641a5a5d>电话: 400-888-8888</p></div><p class="copyright" data-v-641a5a5d>© 2024 江南小馆</p></footer>', 3))
      ]);
    };
  }
};
const RestaurantTemplate = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-641a5a5d"]]);
const _hoisted_1$3 = { class: "travel-template" };
const _hoisted_2$3 = { class: "navbar" };
const _hoisted_3$3 = { class: "nav-container" };
const _hoisted_4$3 = { class: "nav-links" };
const _hoisted_5$3 = { class: "hero" };
const _hoisted_6$3 = { class: "hero-content" };
const _hoisted_7$2 = { class: "search-panel" };
const _hoisted_8$2 = { class: "search-tabs" };
const _hoisted_9$1 = ["onClick"];
const _hoisted_10$1 = { class: "search-form" };
const _hoisted_11$1 = { class: "search-row" };
const _hoisted_12$1 = { class: "search-item large" };
const _hoisted_13$1 = { class: "search-item large" };
const _hoisted_14$1 = { class: "search-item" };
const _hoisted_15$1 = {
  key: 0,
  class: "search-item"
};
const _hoisted_16$1 = { class: "quick-entry" };
const _hoisted_17$1 = { class: "entry-grid" };
const _hoisted_18$1 = ["onClick"];
const _hoisted_19$1 = { class: "entry-icon" };
const _hoisted_20$1 = { class: "entry-name" };
const _hoisted_21$1 = { class: "deals" };
const _hoisted_22$1 = { class: "deals-grid" };
const _hoisted_23$1 = { class: "deal-emoji" };
const _hoisted_24$1 = {
  key: 0,
  class: "deal-tag"
};
const _hoisted_25$1 = { class: "deal-info" };
const _hoisted_26$1 = { class: "deal-desc" };
const _hoisted_27 = { class: "deal-price" };
const _hoisted_28 = { class: "current" };
const _hoisted_29 = { class: "original" };
const _hoisted_30 = { class: "deal-meta" };
const _hoisted_31 = { class: "countdown" };
const _hoisted_32 = { class: "destinations" };
const _hoisted_33 = { class: "section-header" };
const _hoisted_34 = { class: "dest-tabs" };
const _hoisted_35 = ["onClick"];
const _hoisted_36 = { class: "dest-grid" };
const _hoisted_37 = { class: "dest-emoji" };
const _hoisted_38 = { class: "dest-info" };
const _hoisted_39 = { class: "dest-meta" };
const _hoisted_40 = { class: "rating" };
const _hoisted_41 = { class: "price" };
const _hoisted_42 = { class: "hotels" };
const _hoisted_43 = { class: "hotel-grid" };
const _hoisted_44 = { class: "hotel-emoji" };
const _hoisted_45 = { class: "hotel-tags" };
const _hoisted_46 = { class: "hotel-info" };
const _hoisted_47 = { class: "hotel-location" };
const _hoisted_48 = { class: "hotel-features" };
const _hoisted_49 = { class: "hotel-footer" };
const _hoisted_50 = { class: "hotel-rating" };
const _hoisted_51 = { class: "score" };
const _hoisted_52 = { class: "reviews" };
const _hoisted_53 = { class: "hotel-price" };
const _hoisted_54 = { class: "amount" };
const _hoisted_55 = { class: "services" };
const _hoisted_56 = { class: "service-icon" };
const _hoisted_57 = { class: "service-info" };
const _hoisted_58 = { class: "service-title" };
const _hoisted_59 = { class: "service-desc" };
const _hoisted_60 = { class: "footer" };
const _hoisted_61 = { class: "footer-main" };
const _hoisted_62 = { class: "footer-links" };
const _sfc_main$3 = {
  __name: "TravelTemplate",
  setup(__props) {
    const navLinks = ["首页", "酒店", "机票", "火车票", "旅游", "景点门票"];
    const activeTab = /* @__PURE__ */ ref(0);
    const activeDest = /* @__PURE__ */ ref(0);
    const searchTabs = [
      { name: "机票", icon: "✈️" },
      { name: "酒店", icon: "🏨" },
      { name: "火车票", icon: "🚄" },
      { name: "旅游", icon: "🎒" }
    ];
    const search = /* @__PURE__ */ ref({
      from: "北京",
      to: "",
      date: "",
      returnDate: ""
    });
    const swapCity = () => {
      const temp = search.value.from;
      search.value.from = search.value.to;
      search.value.to = temp;
    };
    const quickEntries = /* @__PURE__ */ ref([
      { icon: "🏖️", name: "海岛游" },
      { icon: "🏔️", name: "山水游" },
      { icon: "🏰", name: "古镇游" },
      { icon: "🎢", name: "乐园游" },
      { icon: "🌸", name: "赏花游" },
      { icon: "⛷️", name: "滑雪游" },
      { icon: "🚗", name: "自驾游" },
      { icon: "🎪", name: "亲子游" }
    ]);
    const goEntry = (entry) => {
      alert(`进入：${entry.name}`);
    };
    const deals = /* @__PURE__ */ ref([
      { emoji: "🏖️", title: "三亚5天4晚自由行", desc: "含往返机票+海边酒店", price: 1999, original: 3999, sales: 2356, time: "剩余2天", tag: "限时", bg: "linear-gradient(135deg, #00b4db, #0083b0)" },
      { emoji: "🗼", title: "日本东京7日游", desc: "含机票+酒店+签证", price: 4999, original: 6999, sales: 1892, time: "剩余3天", tag: "爆款", bg: "linear-gradient(135deg, #ff758c, #ff7eb3)" },
      { emoji: "🏝️", title: "马尔代夫6天4晚", desc: "水上屋+含早晚餐", price: 12999, original: 19999, sales: 876, time: "剩余5天", bg: "linear-gradient(135deg, #667eea, #764ba2)" },
      { emoji: "🗽", title: "美国西海岸10日游", desc: "洛杉矶+拉斯维加斯", price: 9999, original: 14999, sales: 654, time: "剩余7天", bg: "linear-gradient(135deg, #f093fb, #f5576c)" }
    ]);
    const destTabs = ["国内", "亚洲", "欧洲", "美洲", "海岛"];
    const destinations = /* @__PURE__ */ ref([
      { emoji: "🏔️", name: "云南", country: "中国", rating: 4.9, price: 1299, bg: "linear-gradient(135deg, #11998e, #38ef7d)" },
      { emoji: "🌸", name: "日本", country: "亚洲", rating: 4.8, price: 3999, bg: "linear-gradient(135deg, #ff758c, #ff7eb3)" },
      { emoji: "🏛️", name: "希腊", country: "欧洲", rating: 4.9, price: 8999, bg: "linear-gradient(135deg, #00b4db, #0083b0)" },
      { emoji: "🏖️", name: "巴厘岛", country: "印尼", rating: 4.7, price: 4999, bg: "linear-gradient(135deg, #f5af19, #f12711)" },
      { emoji: "🗽", name: "纽约", country: "美国", rating: 4.8, price: 9999, bg: "linear-gradient(135deg, #232526, #414345)" },
      { emoji: "🗼", name: "巴黎", country: "法国", rating: 4.9, price: 7999, bg: "linear-gradient(135deg, #667eea, #764ba2)" }
    ]);
    const hotels = /* @__PURE__ */ ref([
      { emoji: "🏨", name: "上海外滩华尔道夫酒店", location: "外滩/陆家嘴", tags: ["豪华", "江景"], features: ["免费WiFi", "健身房", "泳池"], score: 4.9, reviews: 2356, price: 2588, bg: "linear-gradient(135deg, #2c3e50, #3498db)" },
      { emoji: "🏨", name: "北京王府井希尔顿酒店", location: "王府井/东单", tags: ["商务", "地标"], features: ["免费停车", "行政酒廊"], score: 4.8, reviews: 1892, price: 1288, bg: "linear-gradient(135deg, #c0392b, #e74c3c)" },
      { emoji: "🏨", name: "三亚亚特兰蒂斯酒店", location: "海棠湾", tags: ["亲子", "水上乐园"], features: ["水族馆", "水上乐园"], score: 4.9, reviews: 5678, price: 2188, bg: "linear-gradient(135deg, #00b4db, #0083b0)" }
    ]);
    const services = /* @__PURE__ */ ref([
      { icon: "🔒", title: "支付安全", desc: "多重加密保障" },
      { icon: "🔄", title: "退改无忧", desc: "7天无理由退款" },
      { icon: "📞", title: "24小时客服", desc: "随时为您服务" },
      { icon: "💰", title: "价格保证", desc: "买贵退差价" }
    ]);
    const footerGroups = /* @__PURE__ */ ref([
      { title: "关于我们", links: ["公司介绍", "联系我们", "加入我们", "媒体报道"] },
      { title: "帮助中心", links: ["常见问题", "预订指南", "退订政策", "支付说明"] },
      { title: "合作伙伴", links: ["酒店加盟", "旅行社合作", "广告合作", "代理加盟"] }
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("nav", _hoisted_2$3, [
          createBaseVNode("div", _hoisted_3$3, [
            _cache[4] || (_cache[4] = createBaseVNode("div", { class: "logo" }, [
              createBaseVNode("span", { class: "logo-icon" }, "✈️"),
              createBaseVNode("span", { class: "logo-text" }, "携程旅行")
            ], -1)),
            createBaseVNode("div", _hoisted_4$3, [
              (openBlock(), createElementBlock(Fragment, null, renderList(navLinks, (link, i) => {
                return createBaseVNode("a", {
                  key: i,
                  class: normalizeClass({ active: i === 0 })
                }, toDisplayString(link), 3);
              }), 64))
            ]),
            _cache[5] || (_cache[5] = createBaseVNode("div", { class: "nav-right" }, [
              createBaseVNode("span", { class: "nav-phone" }, "📞 400-888-8888"),
              createBaseVNode("a", { class: "login-link" }, "登录"),
              createBaseVNode("a", { class: "register-link" }, "注册")
            ], -1))
          ])
        ]),
        createBaseVNode("section", _hoisted_5$3, [
          _cache[13] || (_cache[13] = createBaseVNode("div", { class: "hero-bg" }, null, -1)),
          createBaseVNode("div", _hoisted_6$3, [
            _cache[11] || (_cache[11] = createBaseVNode("h1", null, "发现你的下一次旅行", -1)),
            _cache[12] || (_cache[12] = createBaseVNode("p", null, "全球精选酒店、机票、景点门票，一站式预订", -1)),
            createBaseVNode("div", _hoisted_7$2, [
              createBaseVNode("div", _hoisted_8$2, [
                (openBlock(), createElementBlock(Fragment, null, renderList(searchTabs, (tab, i) => {
                  return createBaseVNode("span", {
                    key: i,
                    class: normalizeClass({ active: activeTab.value === i }),
                    onClick: ($event) => activeTab.value = i
                  }, toDisplayString(tab.icon) + " " + toDisplayString(tab.name), 11, _hoisted_9$1);
                }), 64))
              ]),
              createBaseVNode("div", _hoisted_10$1, [
                createBaseVNode("div", _hoisted_11$1, [
                  createBaseVNode("div", _hoisted_12$1, [
                    _cache[6] || (_cache[6] = createBaseVNode("label", null, "出发城市", -1)),
                    withDirectives(createBaseVNode("input", {
                      type: "text",
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => search.value.from = $event),
                      placeholder: "请输入出发城市"
                    }, null, 512), [
                      [vModelText, search.value.from]
                    ])
                  ]),
                  createBaseVNode("div", {
                    class: "swap-btn",
                    onClick: swapCity
                  }, "⇄"),
                  createBaseVNode("div", _hoisted_13$1, [
                    _cache[7] || (_cache[7] = createBaseVNode("label", null, "目的城市", -1)),
                    withDirectives(createBaseVNode("input", {
                      type: "text",
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => search.value.to = $event),
                      placeholder: "请输入目的城市"
                    }, null, 512), [
                      [vModelText, search.value.to]
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_14$1, [
                    _cache[8] || (_cache[8] = createBaseVNode("label", null, "出发日期", -1)),
                    withDirectives(createBaseVNode("input", {
                      type: "date",
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => search.value.date = $event)
                    }, null, 512), [
                      [vModelText, search.value.date]
                    ])
                  ]),
                  activeTab.value !== 2 ? (openBlock(), createElementBlock("div", _hoisted_15$1, [
                    _cache[9] || (_cache[9] = createBaseVNode("label", null, "返回日期", -1)),
                    withDirectives(createBaseVNode("input", {
                      type: "date",
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => search.value.returnDate = $event)
                    }, null, 512), [
                      [vModelText, search.value.returnDate]
                    ])
                  ])) : createCommentVNode("", true),
                  _cache[10] || (_cache[10] = createBaseVNode("button", { class: "search-btn" }, "搜索", -1))
                ])
              ])
            ])
          ])
        ]),
        createBaseVNode("section", _hoisted_16$1, [
          createBaseVNode("div", _hoisted_17$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(quickEntries.value, (entry, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "entry-item",
                onClick: ($event) => goEntry(entry)
              }, [
                createBaseVNode("span", _hoisted_19$1, toDisplayString(entry.icon), 1),
                createBaseVNode("span", _hoisted_20$1, toDisplayString(entry.name), 1)
              ], 8, _hoisted_18$1);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_21$1, [
          _cache[14] || (_cache[14] = createBaseVNode("div", { class: "section-header" }, [
            createBaseVNode("h2", null, "🔥 限时特惠"),
            createBaseVNode("a", { class: "more-link" }, "更多优惠 >")
          ], -1)),
          createBaseVNode("div", _hoisted_22$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(deals.value, (deal, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "deal-card",
                style: normalizeStyle({ animationDelay: i * 0.1 + "s" })
              }, [
                createBaseVNode("div", {
                  class: "deal-image",
                  style: normalizeStyle({ background: deal.bg })
                }, [
                  createBaseVNode("span", _hoisted_23$1, toDisplayString(deal.emoji), 1),
                  deal.tag ? (openBlock(), createElementBlock("span", _hoisted_24$1, toDisplayString(deal.tag), 1)) : createCommentVNode("", true)
                ], 4),
                createBaseVNode("div", _hoisted_25$1, [
                  createBaseVNode("h3", null, toDisplayString(deal.title), 1),
                  createBaseVNode("p", _hoisted_26$1, toDisplayString(deal.desc), 1),
                  createBaseVNode("div", _hoisted_27, [
                    createBaseVNode("span", _hoisted_28, "¥" + toDisplayString(deal.price), 1),
                    createBaseVNode("span", _hoisted_29, "¥" + toDisplayString(deal.original), 1)
                  ]),
                  createBaseVNode("div", _hoisted_30, [
                    createBaseVNode("span", null, toDisplayString(deal.sales) + "人已购", 1),
                    createBaseVNode("span", _hoisted_31, toDisplayString(deal.time), 1)
                  ])
                ])
              ], 4);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_32, [
          createBaseVNode("div", _hoisted_33, [
            _cache[15] || (_cache[15] = createBaseVNode("h2", null, "🗺️ 热门目的地", -1)),
            createBaseVNode("div", _hoisted_34, [
              (openBlock(), createElementBlock(Fragment, null, renderList(destTabs, (tab, i) => {
                return createBaseVNode("span", {
                  key: i,
                  class: normalizeClass({ active: activeDest.value === i }),
                  onClick: ($event) => activeDest.value = i
                }, toDisplayString(tab), 11, _hoisted_35);
              }), 64))
            ])
          ]),
          createBaseVNode("div", _hoisted_36, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(destinations.value, (dest, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "dest-card",
                style: normalizeStyle({ animationDelay: i * 0.1 + "s" })
              }, [
                createBaseVNode("div", {
                  class: "dest-image",
                  style: normalizeStyle({ background: dest.bg })
                }, [
                  createBaseVNode("span", _hoisted_37, toDisplayString(dest.emoji), 1)
                ], 4),
                createBaseVNode("div", _hoisted_38, [
                  createBaseVNode("h3", null, toDisplayString(dest.name), 1),
                  createBaseVNode("p", null, toDisplayString(dest.country), 1),
                  createBaseVNode("div", _hoisted_39, [
                    createBaseVNode("span", _hoisted_40, "⭐ " + toDisplayString(dest.rating), 1),
                    createBaseVNode("span", _hoisted_41, "¥" + toDisplayString(dest.price) + "起", 1)
                  ])
                ])
              ], 4);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_42, [
          _cache[17] || (_cache[17] = createBaseVNode("div", { class: "section-header" }, [
            createBaseVNode("h2", null, "🏨 精选酒店"),
            createBaseVNode("a", { class: "more-link" }, "查看全部 >")
          ], -1)),
          createBaseVNode("div", _hoisted_43, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(hotels.value, (hotel, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "hotel-card",
                style: normalizeStyle({ animationDelay: i * 0.1 + "s" })
              }, [
                createBaseVNode("div", {
                  class: "hotel-image",
                  style: normalizeStyle({ background: hotel.bg })
                }, [
                  createBaseVNode("span", _hoisted_44, toDisplayString(hotel.emoji), 1),
                  createBaseVNode("div", _hoisted_45, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(hotel.tags, (tag, ti) => {
                      return openBlock(), createElementBlock("span", { key: ti }, toDisplayString(tag), 1);
                    }), 128))
                  ])
                ], 4),
                createBaseVNode("div", _hoisted_46, [
                  createBaseVNode("h3", null, toDisplayString(hotel.name), 1),
                  createBaseVNode("p", _hoisted_47, "📍 " + toDisplayString(hotel.location), 1),
                  createBaseVNode("div", _hoisted_48, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(hotel.features, (f, fi) => {
                      return openBlock(), createElementBlock("span", { key: fi }, toDisplayString(f), 1);
                    }), 128))
                  ]),
                  createBaseVNode("div", _hoisted_49, [
                    createBaseVNode("div", _hoisted_50, [
                      createBaseVNode("span", _hoisted_51, toDisplayString(hotel.score), 1),
                      createBaseVNode("span", _hoisted_52, toDisplayString(hotel.reviews) + "条评价", 1)
                    ]),
                    createBaseVNode("div", _hoisted_53, [
                      _cache[16] || (_cache[16] = createBaseVNode("span", { class: "label" }, "起", -1)),
                      createBaseVNode("span", _hoisted_54, "¥" + toDisplayString(hotel.price), 1)
                    ])
                  ])
                ])
              ], 4);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_55, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(services.value, (s, i) => {
            return openBlock(), createElementBlock("div", {
              class: "service-item",
              key: i
            }, [
              createBaseVNode("span", _hoisted_56, toDisplayString(s.icon), 1),
              createBaseVNode("div", _hoisted_57, [
                createBaseVNode("span", _hoisted_58, toDisplayString(s.title), 1),
                createBaseVNode("span", _hoisted_59, toDisplayString(s.desc), 1)
              ])
            ]);
          }), 128))
        ]),
        createBaseVNode("footer", _hoisted_60, [
          createBaseVNode("div", _hoisted_61, [
            createBaseVNode("div", _hoisted_62, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(footerGroups.value, (group, i) => {
                return openBlock(), createElementBlock("div", {
                  class: "link-group",
                  key: i
                }, [
                  createBaseVNode("h4", null, toDisplayString(group.title), 1),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(group.links, (link, li) => {
                    return openBlock(), createElementBlock("a", { key: li }, toDisplayString(link), 1);
                  }), 128))
                ]);
              }), 128))
            ]),
            _cache[18] || (_cache[18] = createBaseVNode("div", { class: "footer-contact" }, [
              createBaseVNode("h4", null, "客服热线"),
              createBaseVNode("p", { class: "hotline" }, "400-888-8888"),
              createBaseVNode("p", null, "服务时间：全天24小时"),
              createBaseVNode("div", { class: "contact-btns" }, [
                createBaseVNode("button", null, "在线客服"),
                createBaseVNode("button", null, "意见反馈")
              ])
            ], -1))
          ]),
          _cache[19] || (_cache[19] = createBaseVNode("p", { class: "copyright" }, "© 2024 携程旅行 | 京ICP备00000000号", -1))
        ])
      ]);
    };
  }
};
const TravelTemplate = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-506cfa2d"]]);
const _hoisted_1$2 = { class: "minimal-template" };
const _hoisted_2$2 = { class: "navbar" };
const _hoisted_3$2 = { class: "nav-container" };
const _hoisted_4$2 = { class: "nav-links" };
const _hoisted_5$2 = { class: "services" };
const _hoisted_6$2 = { class: "services-grid" };
const _hoisted_7$1 = { class: "service-num" };
const _hoisted_8$1 = { class: "service-list" };
const _hoisted_9 = { class: "works" };
const _hoisted_10 = { class: "works-filter" };
const _hoisted_11 = ["onClick"];
const _hoisted_12 = { class: "works-grid" };
const _hoisted_13 = { class: "work-icon" };
const _hoisted_14 = { class: "work-info" };
const _hoisted_15 = { class: "process" };
const _hoisted_16 = { class: "process-grid" };
const _hoisted_17 = { class: "step-num" };
const _hoisted_18 = { class: "clients" };
const _hoisted_19 = { class: "clients-grid" };
const _hoisted_20 = { class: "client-logo" };
const _hoisted_21 = { class: "client-name" };
const _hoisted_22 = { class: "stats" };
const _hoisted_23 = { class: "stat-value" };
const _hoisted_24 = { class: "stat-label" };
const _hoisted_25 = { class: "contact" };
const _hoisted_26 = { class: "contact-content" };
const _sfc_main$2 = {
  __name: "MinimalTemplate",
  setup(__props) {
    const navLinks = ["作品", "服务", "关于", "联系"];
    const activeFilter = /* @__PURE__ */ ref(0);
    const filters = ["全部", "品牌设计", "UI设计", "网页设计"];
    const form = /* @__PURE__ */ ref({
      name: "",
      email: "",
      project: "",
      message: ""
    });
    const services = /* @__PURE__ */ ref([
      { title: "品牌设计", desc: "塑造独特的品牌形象", items: ["Logo设计", "VI系统", "品牌策略", "品牌命名"] },
      { title: "UI设计", desc: "打造优质的用户体验", items: ["网页设计", "移动应用", "后台系统", "设计系统"] },
      { title: "体验设计", desc: "以用户为中心的设计", items: ["用户研究", "交互设计", "原型设计", "可用性测试"] }
    ]);
    const works = /* @__PURE__ */ ref([
      { title: "云端科技", category: "品牌设计", icon: "☁️", bg: "#f8f9fa", type: "品牌设计" },
      { title: "智能助手App", category: "UI设计", icon: "📱", bg: "#e9ecef", type: "UI设计" },
      { title: "创意工作室", category: "网页设计", icon: "🎨", bg: "#f1f3f4", type: "网页设计" },
      { title: "金融服务平台", category: "UI设计", icon: "💰", bg: "#e8eaed", type: "UI设计" },
      { title: "艺术画廊", category: "品牌设计", icon: "🖼️", bg: "#f5f5f5", type: "品牌设计" },
      { title: "电商平台", category: "网页设计", icon: "🛒", bg: "#eceff1", type: "网页设计" }
    ]);
    const filteredWorks = computed(() => {
      if (activeFilter.value === 0) return works.value;
      return works.value.filter((w) => w.type === filters[activeFilter.value]);
    });
    const processSteps = /* @__PURE__ */ ref([
      { title: "发现", desc: "深入了解客户需求与目标" },
      { title: "策略", desc: "制定项目方向与设计策略" },
      { title: "设计", desc: "创意设计与视觉呈现" },
      { title: "交付", desc: "最终交付与持续支持" }
    ]);
    const clients = /* @__PURE__ */ ref([
      { logo: "A", name: "Alpha Tech" },
      { logo: "B", name: "Beta Corp" },
      { logo: "C", name: "Cloud Inc" },
      { logo: "D", name: "Delta Ltd" },
      { logo: "E", name: "Echo Design" },
      { logo: "F", name: "Future Lab" }
    ]);
    const stats = /* @__PURE__ */ ref([
      { value: "150+", label: "完成项目" },
      { value: "50+", label: "服务客户" },
      { value: "8", label: "年经验" },
      { value: "15", label: "设计奖项" }
    ]);
    const submitForm = () => {
      alert("消息已发送，我们会尽快联系您！");
      form.value = { name: "", email: "", project: "", message: "" };
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("nav", _hoisted_2$2, [
          createBaseVNode("div", _hoisted_3$2, [
            _cache[4] || (_cache[4] = createBaseVNode("div", { class: "logo" }, "MUJI Studio", -1)),
            createBaseVNode("div", _hoisted_4$2, [
              (openBlock(), createElementBlock(Fragment, null, renderList(navLinks, (link, i) => {
                return createBaseVNode("a", {
                  key: i,
                  class: normalizeClass({ active: i === 0 })
                }, toDisplayString(link), 3);
              }), 64))
            ]),
            _cache[5] || (_cache[5] = createBaseVNode("button", { class: "contact-btn" }, "联系我们", -1))
          ])
        ]),
        _cache[15] || (_cache[15] = createStaticVNode('<section class="hero" data-v-88516dbc><div class="hero-content" data-v-88516dbc><span class="hero-label" data-v-88516dbc>Design Studio</span><h1 data-v-88516dbc>简约设计<br data-v-88516dbc>专注体验</h1><p data-v-88516dbc>我们相信好的设计应该是简单的、有意义的、持久的</p><div class="hero-buttons" data-v-88516dbc><button class="btn-primary" data-v-88516dbc>查看作品</button><button class="btn-outline" data-v-88516dbc>了解更多</button></div></div><div class="hero-visual" data-v-88516dbc><div class="floating-block b1" data-v-88516dbc></div><div class="floating-block b2" data-v-88516dbc></div><div class="floating-block b3" data-v-88516dbc></div></div></section>', 1)),
        createBaseVNode("section", _hoisted_5$2, [
          _cache[7] || (_cache[7] = createBaseVNode("div", { class: "section-header" }, [
            createBaseVNode("span", { class: "section-label" }, "Services"),
            createBaseVNode("h2", null, "服务项目")
          ], -1)),
          createBaseVNode("div", _hoisted_6$2, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(services.value, (service, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "service-card",
                style: normalizeStyle({ animationDelay: i * 0.1 + "s" })
              }, [
                createBaseVNode("span", _hoisted_7$1, "0" + toDisplayString(i + 1), 1),
                createBaseVNode("h3", null, toDisplayString(service.title), 1),
                createBaseVNode("p", null, toDisplayString(service.desc), 1),
                createBaseVNode("ul", _hoisted_8$1, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(service.items, (item, j) => {
                    return openBlock(), createElementBlock("li", { key: j }, toDisplayString(item), 1);
                  }), 128))
                ]),
                _cache[6] || (_cache[6] = createBaseVNode("button", { class: "service-btn" }, "了解详情", -1))
              ], 4);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_9, [
          _cache[9] || (_cache[9] = createBaseVNode("div", { class: "section-header" }, [
            createBaseVNode("span", { class: "section-label" }, "Works"),
            createBaseVNode("h2", null, "精选作品")
          ], -1)),
          createBaseVNode("div", _hoisted_10, [
            (openBlock(), createElementBlock(Fragment, null, renderList(filters, (filter, i) => {
              return createBaseVNode("span", {
                key: i,
                class: normalizeClass({ active: activeFilter.value === i }),
                onClick: ($event) => activeFilter.value = i
              }, toDisplayString(filter), 11, _hoisted_11);
            }), 64))
          ]),
          createBaseVNode("div", _hoisted_12, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(filteredWorks.value, (item, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "work-item",
                style: normalizeStyle({ animationDelay: i * 0.1 + "s" })
              }, [
                createBaseVNode("div", {
                  class: "work-image",
                  style: normalizeStyle({ background: item.bg })
                }, [
                  createBaseVNode("span", _hoisted_13, toDisplayString(item.icon), 1),
                  _cache[8] || (_cache[8] = createBaseVNode("div", { class: "work-overlay" }, [
                    createBaseVNode("button", { class: "view-btn" }, "查看项目")
                  ], -1))
                ], 4),
                createBaseVNode("div", _hoisted_14, [
                  createBaseVNode("h3", null, toDisplayString(item.title), 1),
                  createBaseVNode("p", null, toDisplayString(item.category), 1)
                ])
              ], 4);
            }), 128))
          ]),
          _cache[10] || (_cache[10] = createBaseVNode("div", { class: "works-more" }, [
            createBaseVNode("button", { class: "more-btn" }, "查看全部作品")
          ], -1))
        ]),
        createBaseVNode("section", _hoisted_15, [
          _cache[11] || (_cache[11] = createBaseVNode("div", { class: "section-header" }, [
            createBaseVNode("span", { class: "section-label" }, "Process"),
            createBaseVNode("h2", null, "工作流程")
          ], -1)),
          createBaseVNode("div", _hoisted_16, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(processSteps.value, (step, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "process-step"
              }, [
                createBaseVNode("div", _hoisted_17, toDisplayString(i + 1), 1),
                createBaseVNode("h3", null, toDisplayString(step.title), 1),
                createBaseVNode("p", null, toDisplayString(step.desc), 1)
              ]);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_18, [
          _cache[12] || (_cache[12] = createBaseVNode("div", { class: "section-header" }, [
            createBaseVNode("span", { class: "section-label" }, "Clients"),
            createBaseVNode("h2", null, "合作伙伴")
          ], -1)),
          createBaseVNode("div", _hoisted_19, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(clients.value, (client, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "client-item"
              }, [
                createBaseVNode("span", _hoisted_20, toDisplayString(client.logo), 1),
                createBaseVNode("span", _hoisted_21, toDisplayString(client.name), 1)
              ]);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_22, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(stats.value, (stat, i) => {
            return openBlock(), createElementBlock("div", {
              class: "stat-item",
              key: i
            }, [
              createBaseVNode("span", _hoisted_23, toDisplayString(stat.value), 1),
              createBaseVNode("span", _hoisted_24, toDisplayString(stat.label), 1)
            ]);
          }), 128))
        ]),
        createBaseVNode("section", _hoisted_25, [
          createBaseVNode("div", _hoisted_26, [
            _cache[14] || (_cache[14] = createStaticVNode('<div class="contact-info" data-v-88516dbc><h2 data-v-88516dbc>开始合作</h2><p data-v-88516dbc>如果您有项目想要咨询，欢迎随时联系我们</p><div class="contact-details" data-v-88516dbc><div class="contact-item" data-v-88516dbc><span class="label" data-v-88516dbc>邮箱</span><span data-v-88516dbc>hello@muji.studio</span></div><div class="contact-item" data-v-88516dbc><span class="label" data-v-88516dbc>电话</span><span data-v-88516dbc>010-88888888</span></div><div class="contact-item" data-v-88516dbc><span class="label" data-v-88516dbc>地址</span><span data-v-88516dbc>北京市朝阳区建国路88号</span></div></div></div>', 1)),
            createBaseVNode("form", {
              class: "contact-form",
              onSubmit: withModifiers(submitForm, ["prevent"])
            }, [
              withDirectives(createBaseVNode("input", {
                type: "text",
                placeholder: "您的姓名",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.value.name = $event),
                required: ""
              }, null, 512), [
                [vModelText, form.value.name]
              ]),
              withDirectives(createBaseVNode("input", {
                type: "email",
                placeholder: "电子邮箱",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.value.email = $event),
                required: ""
              }, null, 512), [
                [vModelText, form.value.email]
              ]),
              withDirectives(createBaseVNode("input", {
                type: "text",
                placeholder: "项目名称",
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.value.project = $event)
              }, null, 512), [
                [vModelText, form.value.project]
              ]),
              withDirectives(createBaseVNode("textarea", {
                placeholder: "项目描述",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => form.value.message = $event),
                rows: "4"
              }, null, 512), [
                [vModelText, form.value.message]
              ]),
              _cache[13] || (_cache[13] = createBaseVNode("button", {
                type: "submit",
                class: "submit-btn"
              }, "发送消息", -1))
            ], 32)
          ])
        ]),
        _cache[16] || (_cache[16] = createStaticVNode('<footer class="footer" data-v-88516dbc><div class="footer-content" data-v-88516dbc><div class="footer-brand" data-v-88516dbc><span class="brand-logo" data-v-88516dbc>MUJI</span><span class="brand-text" data-v-88516dbc>Studio</span></div><div class="footer-links" data-v-88516dbc><a data-v-88516dbc>作品</a><a data-v-88516dbc>服务</a><a data-v-88516dbc>关于</a><a data-v-88516dbc>联系</a></div><p class="copyright" data-v-88516dbc>© 2024 MUJI Studio. All rights reserved.</p></div></footer>', 1))
      ]);
    };
  }
};
const MinimalTemplate = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-88516dbc"]]);
const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/projects", name: "Projects", component: Projects },
  { path: "/blog", name: "Blog", component: Blog },
  { path: "/shop", name: "Shop", component: Shop },
  { path: "/templates", name: "Templates", component: Templates },
  { path: "/ui-showcase", name: "UIShowcase", component: UIShowcase },
  { path: "/openclaw-deploy", name: "OpenClawDeploy", component: OpenClawDeploy },
  { path: "/website-build", name: "WebsiteBuild", component: WebsiteBuild },
  { path: "/contact-info", name: "ContactInfo", component: ContactInfo },
  { path: "/shanxin-heihongbang", name: "ShanxinHeihongbang", component: ShanxinHeihongbang },
  // 模板网站子页面
  { path: "/shopping", name: "Shopping", component: ShoppingTemplate },
  { path: "/corporate", name: "Corporate", component: CorporateTemplate },
  { path: "/forum", name: "Forum", component: ForumTemplate },
  { path: "/education", name: "Education", component: EducationTemplate },
  { path: "/music", name: "Music", component: MusicTemplate },
  { path: "/fitness", name: "Fitness", component: FitnessTemplate },
  { path: "/pet", name: "Pet", component: PetTemplate },
  { path: "/portfolio", name: "Portfolio", component: PortfolioTemplate },
  { path: "/restaurant", name: "Restaurant", component: RestaurantTemplate },
  { path: "/travel", name: "Travel", component: TravelTemplate },
  { path: "/minimal", name: "Minimal", component: MinimalTemplate }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  }
});
const _sfc_main$1 = {
  name: "MusicPlayer",
  data() {
    return {
      isPlaying: false,
      currentIndex: 0,
      volume: 0.7,
      showVolume: false,
      songs: [
        { name: "零距离的思念", url: "/music2.mp3" },
        { name: "太聪明", url: "/music1.mp3" }
      ]
    };
  },
  mounted() {
    const savedState = localStorage.getItem("musicState");
    if (savedState) {
      const state = JSON.parse(savedState);
      this.currentIndex = state.currentIndex || 0;
      this.volume = state.volume || 0.7;
    }
    const audio = this.$refs.audio;
    if (audio) {
      audio.addEventListener("error", (e) => {
        var _a;
        console.error("Audio error:", ((_a = audio.error) == null ? void 0 : _a.message) || "Unknown error");
      });
    }
  },
  methods: {
    changeVolume() {
      const audio = this.$refs.audio;
      if (audio) {
        audio.volume = this.volume;
        this.saveState();
      }
    },
    saveState() {
      localStorage.setItem("musicState", JSON.stringify({
        currentIndex: this.currentIndex,
        volume: this.volume
      }));
    },
    togglePlay() {
      return __async(this, null, function* () {
        const audio = this.$refs.audio;
        if (!audio) return;
        const currentSong = this.songs[this.currentIndex];
        try {
          if (this.isPlaying) {
            audio.pause();
            this.isPlaying = false;
          } else {
            audio.src = currentSong.url;
            audio.volume = this.volume;
            audio.load();
            yield new Promise((resolve2, reject) => {
              const timeout = setTimeout(() => reject(new Error("加载超时")), 1e4);
              audio.addEventListener("canplaythrough", () => {
                clearTimeout(timeout);
                resolve2();
              }, { once: true });
              audio.addEventListener("error", () => {
                clearTimeout(timeout);
                reject(new Error("加载失败"));
              }, { once: true });
            });
            yield audio.play();
            this.isPlaying = true;
            this.saveState();
          }
        } catch (e) {
          console.error("播放失败:", e.message);
        }
      });
    },
    nextSong() {
      this.currentIndex = (this.currentIndex + 1) % this.songs.length;
      this.saveState();
      this.togglePlay();
    }
  },
  watch: {
    currentIndex() {
      this.saveState();
    }
  }
};
const _hoisted_1$1 = {
  key: 0,
  class: "icon",
  viewBox: "0 0 24 24",
  fill: "currentColor"
};
const _hoisted_2$1 = {
  key: 1,
  class: "icon",
  viewBox: "0 0 24 24",
  fill: "currentColor"
};
const _hoisted_3$1 = {
  key: 0,
  class: "music-info"
};
const _hoisted_4$1 = { class: "music-text" };
const _hoisted_5$1 = { class: "volume-control" };
const _hoisted_6$1 = {
  key: 0,
  class: "icon",
  viewBox: "0 0 24 24",
  fill: "currentColor"
};
const _hoisted_7 = {
  key: 1,
  class: "icon",
  viewBox: "0 0 24 24",
  fill: "currentColor"
};
const _hoisted_8 = ["src", "volume"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["music-player", { expanded: $data.showVolume }])
  }, [
    createBaseVNode("button", {
      onClick: _cache[0] || (_cache[0] = withModifiers((...args) => $options.togglePlay && $options.togglePlay(...args), ["stop"])),
      class: normalizeClass(["play-btn", { playing: $data.isPlaying }])
    }, [
      !$data.isPlaying ? (openBlock(), createElementBlock("svg", _hoisted_1$1, [..._cache[8] || (_cache[8] = [
        createBaseVNode("path", { d: "M8 5v14l11-7z" }, null, -1)
      ])])) : (openBlock(), createElementBlock("svg", _hoisted_2$1, [..._cache[9] || (_cache[9] = [
        createBaseVNode("path", { d: "M6 4h4v16H6V4zm8 0h4v16h-4V4z" }, null, -1)
      ])]))
    ], 2),
    $data.isPlaying ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
      _cache[10] || (_cache[10] = createBaseVNode("span", { class: "music-note" }, "♪", -1)),
      createBaseVNode("span", _hoisted_4$1, toDisplayString($data.songs[$data.currentIndex].name), 1)
    ])) : createCommentVNode("", true),
    withDirectives(createBaseVNode("div", _hoisted_5$1, [
      withDirectives(createBaseVNode("input", {
        type: "range",
        min: "0",
        max: "1",
        step: "0.1",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.volume = $event),
        onInput: _cache[2] || (_cache[2] = (...args) => $options.changeVolume && $options.changeVolume(...args)),
        class: "volume-slider"
      }, null, 544), [
        [vModelText, $data.volume]
      ])
    ], 512), [
      [vShow, $data.showVolume]
    ]),
    createBaseVNode("button", {
      onClick: _cache[3] || (_cache[3] = withModifiers(($event) => $data.showVolume = !$data.showVolume, ["stop"])),
      class: normalizeClass(["volume-btn", { active: $data.showVolume }]),
      title: "音量"
    }, [
      $data.volume > 0 ? (openBlock(), createElementBlock("svg", _hoisted_6$1, [..._cache[11] || (_cache[11] = [
        createBaseVNode("path", { d: "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" }, null, -1)
      ])])) : (openBlock(), createElementBlock("svg", _hoisted_7, [..._cache[12] || (_cache[12] = [
        createBaseVNode("path", { d: "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" }, null, -1)
      ])]))
    ], 2),
    createBaseVNode("button", {
      onClick: _cache[4] || (_cache[4] = withModifiers((...args) => $options.nextSong && $options.nextSong(...args), ["stop"])),
      class: "volume-btn",
      title: "下一首"
    }, [..._cache[13] || (_cache[13] = [
      createBaseVNode("svg", {
        class: "icon",
        viewBox: "0 0 24 24",
        fill: "currentColor"
      }, [
        createBaseVNode("path", { d: "M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" })
      ], -1)
    ])]),
    createBaseVNode("audio", {
      ref: "audio",
      src: $data.songs[$data.currentIndex].url,
      onEnded: _cache[5] || (_cache[5] = (...args) => $options.nextSong && $options.nextSong(...args)),
      onPlay: _cache[6] || (_cache[6] = ($event) => $data.isPlaying = true),
      onPause: _cache[7] || (_cache[7] = ($event) => $data.isPlaying = false),
      preload: "auto",
      crossorigin: "anonymous",
      volume: $data.volume
    }, null, 40, _hoisted_8)
  ], 2);
}
const MusicPlayer = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-23335791"]]);
const _sfc_main = {
  name: "App",
  components: {
    MusicPlayer
  }
};
const _hoisted_1 = { class: "min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]" };
const _hoisted_2 = { class: "fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-white/10 border-b border-apple-gray-100" };
const _hoisted_3 = { class: "max-w-5xl mx-auto px-6" };
const _hoisted_4 = { class: "flex items-center justify-between h-12" };
const _hoisted_5 = { class: "flex items-center space-x-6" };
const _hoisted_6 = { class: "pt-12" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_router_view = resolveComponent("router-view");
  const _component_MusicPlayer = resolveComponent("MusicPlayer");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("nav", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          createVNode(_component_router_link, {
            to: "/",
            class: "text-white font-bold text-base hover:text-apple-gray-600 transition-colors"
          }, {
            default: withCtx(() => [..._cache[0] || (_cache[0] = [
              createTextVNode(" Welcome ", -1)
            ])]),
            _: 1
          }),
          createBaseVNode("div", _hoisted_5, [
            createVNode(_component_router_link, {
              to: "/about",
              class: "text-gray-300 text-sm hover:text-white hover:scale-105 hover:text-purple-400 transition-all duration-300"
            }, {
              default: withCtx(() => [..._cache[1] || (_cache[1] = [
                createTextVNode(" About ", -1)
              ])]),
              _: 1
            }),
            createVNode(_component_router_link, {
              to: "/projects",
              class: "text-gray-300 text-sm hover:text-white hover:scale-105 hover:text-purple-400 transition-all duration-300"
            }, {
              default: withCtx(() => [..._cache[2] || (_cache[2] = [
                createTextVNode(" Projects ", -1)
              ])]),
              _: 1
            }),
            createVNode(_component_router_link, {
              to: "/blog",
              class: "text-gray-300 text-sm hover:text-white hover:scale-105 hover:text-purple-400 transition-all duration-300"
            }, {
              default: withCtx(() => [..._cache[3] || (_cache[3] = [
                createTextVNode(" Blog ", -1)
              ])]),
              _: 1
            }),
            createVNode(_component_router_link, {
              to: "/shop",
              class: "text-gray-300 text-sm hover:text-white hover:scale-105 hover:text-purple-400 transition-all duration-300"
            }, {
              default: withCtx(() => [..._cache[4] || (_cache[4] = [
                createTextVNode(" Shop ", -1)
              ])]),
              _: 1
            }),
            createVNode(_component_router_link, {
              to: "/templates",
              class: "text-gray-300 text-sm hover:text-white hover:scale-105 hover:text-purple-400 transition-all duration-300"
            }, {
              default: withCtx(() => [..._cache[5] || (_cache[5] = [
                createTextVNode(" Templates ", -1)
              ])]),
              _: 1
            })
          ])
        ])
      ])
    ]),
    createBaseVNode("main", _hoisted_6, [
      createVNode(_component_router_view)
    ]),
    _cache[6] || (_cache[6] = createStaticVNode('<footer class="bg-apple-gray-50 border-t border-apple-gray-100 py-8"><div class="max-w-5xl mx-auto px-6"><div class="flex items-center justify-between"><p class="text-apple-gray-400 text-xs"> © 2026 栗子。Powered by OpenClaw + Qwen3.5-Plus </p><div class="flex items-center space-x-4"><a href="#" class="text-apple-gray-400 hover:text-apple-gray-600 transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-4.442 0-.981.351-1.782.922-2.405-.924-.115-1.897-.466-1.897-1.964 0-.435.155-.862.414-1.232.833-.252 2.737.31 2.737.31.798-.222 1.662-.335 2.531-.335.868 0 1.733.113 2.531.335 0 0 1.904-.562 2.737-.31.259.37.414.797.414 1.232 0 1.498-.974 1.849-1.897 1.964.571.623.922 1.424.922 2.405 0 3.113-2.802 4.136-5.467 4.442.344.299.655.829.762 1.604.685.307 2.422.837 3.492-.997.695-1.304 2.422-1.834 3.492-1.237 0 0 .791-.371 1.333 1.756 0 0-.695 2.142-4.033 1.416v2.234c0 .316.194.688.793.577C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"></path></svg></a><a href="#" class="text-apple-gray-400 hover:text-apple-gray-600 transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.92 4.92 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg></a></div></div></div></footer>', 1)),
    createVNode(_component_MusicPlayer)
  ]);
}
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount("#app");
