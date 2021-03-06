var LocalStorage = {

  DEFAULT_SETTINGS: {
    // TODO display version number somewhere
    storage_app_version: "1.1",
    // boolean values
    receive_smell_notifications: true,
    receive_pghaqi_notifications: false,
    firsttime_startup: true,
    firsttime_home: true,
    firsttime_map: true,
    // JSON
    smell_notification_values: {"4": true, "5": true},
    // strings
    user_hash: "",
    email: "",
    name: "",
    phone: "",
    address: ""
  },


  initialize: function() {
    if (this.get("storage_app_version") == null) {
      window.localStorage.clear();
    }
    for (key in this.DEFAULT_SETTINGS) {
      if (this.get(key) == null) this.set(key, this.DEFAULT_SETTINGS[key]);
    }
    if (this.DEFAULT_SETTINGS["user_hash"] == null || this.DEFAULT_SETTINGS["user_hash"] == "") {
      this.set("user_hash", this.generateUserHash());
    }
  },


  get: function(key) {
    return JSON.parse(window.localStorage.getItem(key));
  },


  set: function(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },


  // generate a hash for the user
  generateUserHash: function() {
    var userHash;
    var bayAreaPrefix = "BA"
    var random = Math.floor(Math.random()*9007199254740991);
    var date = new Date();
    var epoch = ((date.getTime()-date.getMilliseconds())/1000);
    var input = random + " " + epoch;
    userHash = bayAreaPrefix + md5(input);

    return userHash;
  },

}

LocalStorage.initialize();
