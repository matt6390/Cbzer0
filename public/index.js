/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!"
    };
  },
  created: function() {},
  methods: {},
  computed: {}
};

var SongUploadPage = {
  template: "#song-upload-page",
  data: function() {
    return {
      message: "",
      name: null,
      downloadUrl: null,
      errors: []
    };
  },
  created: function() {},
  methods: {
    saveUrl: function(url) {
      var params = {
        storage_url: url,
        user_id: 1,
        name: this.name
      };

      axios.post("/songs", params).then(function(response) {
        console.log(response.data);
      }.bind(this)).catch(function(errors) {
        this.errors = errors.response.data.error;
        console.log(errors.response.data.error);
      }.bind(this));
      console.log(url);
    },

    uploadSong: function() {
      if (this.name) {
        // find the file a user adds
        var item = document.getElementById("newSong").files[0];
        // create reference so that the item can be uploaded
        var storageRef = firebase.storage().ref().child('songs/' + item.name);
        // Begins upload process
        storageRef = storageRef.put(item);
        // Monitors upload progress
        storageRef.on('state_changed', function(snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }.bind(this), function(error) {
          // for unsuccessful uploads
        }.bind(this), function() {
          // completed upload
          var song = storageRef.snapshot.ref.getDownloadURL().then(function(downloadUrl) {
            // console.log("Available for download at " + downloadUrl);
            this.downloadUrl = downloadUrl;
            // create a function that will then take this URL, and create a SONG reference in the postgresql database
            this.saveUrl(downloadUrl);

          }.bind(this));
        }.bind(this));
      } else {
        this.errors = [];
        this.errors = {error: "No Name Entered, Try Again"};
        console.log("No Name");
      }

    }
  },
  computed: {}
};

var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: null,
      password: null,
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};

var SignupPage = {
  template: "#signup-page",
  data: function() {
    return {
      name: null,
      email: null,
      password: null,
      passwordConfirmation: null,
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/users", params)
        .then(function(response) {
          router.push("/login");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var LogoutPage = {
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    router.push("/");
  }
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage },
    { path: "/song/upload", component: SongUploadPage },
    { path: "/login", component: LoginPage },
    { path: "/signup", component: SignupPage },
    { path: "/logout", component: LogoutPage }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router,
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }
});