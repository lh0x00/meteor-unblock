# Unblock helper inside Meteor Publications

[![build status][travis-image]][github-url]

This package provides `this.unblock` inside Meteor publications. Unblock publications are one of most(may be a little bit less) [requested](https://github.com/meteor/meteor/issues/853) feature and but it hasn't been implemented yet!

This package is like a new version of [meteorhacks/unblock](https://github.com/meteorhacks/unblock) for Meteor the **version 1.7** or later.

In this package, we also use the same way as **meteorhacks/unblock** to unblock the publications.


## Why unblock?

Meteor executes DDP messages for a single client in a sequence. So, if one message takes a lot of time to process, that time will add up to all the messages. Fortunately, there is an API called as this.unblock help for other messages can start processing without waiting for the above method. But this is not available for Publications and **this package is support for that feature**.

## Usage

### Install

```bash
meteor add lamhieu:unblock
```

### Use inside publications

```javascript
Meteor.publish('publicationName', function() {
  this.unblock();
  // do somethings
});
```

[github-url]: https://github.com/lamhieu-vk/meteor-unblock
[travis-image]: https://travis-ci.com/lamhieu-vk/meteor-unblock.svg?branch=master
