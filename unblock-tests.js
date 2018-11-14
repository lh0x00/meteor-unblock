import { Tinytest } from "meteor/tinytest";

import { name as packageName } from "meteor/lamhieu:unblock";

Tinytest.add("unblock - example", function(test) {
  test.equal(packageName, "unblock");
});
