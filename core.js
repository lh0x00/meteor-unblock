import { Random } from "meteor/random";

function exposeSubscription(session, namespace) {
  const subId = Random.id();
  const publicationHandler = function publicationHandler() {
    this.ready();
  };
  const pubName = `__meteorCore_pub_${Random.id()}`;
  session._startSubscription(publicationHandler, subId, [], pubName);
  const isMap = session._namedSubs instanceof Map;
  const subscription = isMap ? session._namedSubs.get(subId) : session._namedSubs[subId];
  namespace.Subscription = subscription.constructor;
  session._stopSubscription(subId);
}

function exposeLivedata(namespace) {
  const fakeSocket = {
    headers: [],
    send: function() {},
    close: function() {},
  };
  const ddpConnectMessage = {
    msg: "connect",
    version: "pre1",
    support: ["pre1"],
  };
  Meteor.default_server._handleConnect(fakeSocket, ddpConnectMessage);
  if (fakeSocket._meteorSession) {
    namespace.Session = fakeSocket._meteorSession.constructor;
    exposeSubscription(fakeSocket._meteorSession, namespace);
    Meteor.default_server._removeSession(fakeSocket._meteorSession);
  } else {
    console.error("Can not expose Meteor Core");
  }
}

MeteorCore = {};
MeteorCore.Server = Meteor.server.constructor;
exposeLivedata(MeteorCore);
