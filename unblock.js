export const name = 'unblock';

function emptyFunction() {}

let cachedUnblock;
const originalSub = MeteorCore.Session.prototype.protocol_handlers.sub;
const originalRunHandler = MeteorCore.Subscription.prototype._runHandler;

function subHandler(msg, unblock) {
  const self = this;
  cachedUnblock = unblock;
  originalSub.call(self, msg, unblock);
  cachedUnblock = null;
}
MeteorCore.Session.prototype.protocol_handlers.sub = subHandler;

function startSubscription(handler, subId, params, name) {
  const self = this;
  const sub = new MeteorCore.Subscription(self, handler, subId, params, name);

  sub.unblock = cachedUnblock || emptyFunction;
  if (subId) {
    const isMap = self._namedSubs instanceof Map;
    if (isMap) {
      self._namedSubs.set(subId, sub);
    } else {
      self._namedSubs[subId] = sub;
    }
  } else {
    self._universalSubs.push(sub);
  }

  sub._runHandler();
}
MeteorCore.Session.prototype._startSubscription = startSubscription;

function runHandler() {
  if (!this.unblock) {
    this.unblock = emptyFunction;
  }
  originalRunHandler.call(this);
}
MeteorCore.Subscription.prototype._runHandler = runHandler;
