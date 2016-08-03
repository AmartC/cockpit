require([
    "jquery",
    "base1/cockpit",
], function($, cockpit) {

  function AtomicClient() {
    var self = this;
    var service = cockpit.dbus("org.atomic");
    var proxy = service.proxy("org.atomic", "/org/atomic/object");
    var data = {};

    proxy.wait(function () {

      if(proxy.valid) {
        var call = proxy.VulnerableInfo()
        call.done(function(result) {
          data = JSON.parse(result)
          $(self).trigger("change");
        });
      }
    });

    self.GetImageVulnerableObject = function(id) {
      if(id in data) {
        return data[id];
      }
    };
  }
    return new AtomicClient();
});
