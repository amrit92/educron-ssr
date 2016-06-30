import firebase from '../../Firebase';

export default class AuthFirebase {
    constructor(context) {
        this.context = context;
        this.user = {};
        this.profile = {};
    }

    /**
     * Register user
     * @param email | string
     * @param password | string
     * @returns {Promise}
     */
    register(email, password, profile = {}) {
        let context = this;
        let promise = new Promise(function (resolve, reject) {
            firebase.createUser({email, password}, function (err, user) {
                if (err) {
                    reject(err.message);
                }
                else {
                    context.updateProfile(profile, user.uid).then((profile)=> {
                        resolve({email, password});
                    });
                }
            });
        });
        return promise;
    }

    /**
     * Clean user from requesst
     * @param user
     * @returns {{email: *, token: (*|token|{isFetching}|{token, isFetching, error}|string), uid: (*|number)}}
     */
    cleanUser(user) {
        return {
            email: user.password.email,
            token: user.token,
            uid: user.uid
        }
    }

    /**
     * Login
     * @param email | string
     * @param password | password
     * @returns {Promise}
     */
    login(email, password) {
        let promise = new Promise(function (resolve, reject) {
            firebase.authWithPassword({email: email, password: password}, function (err, user) {
                if (err) {
                    reject(err.message);
                }
                else {
                    resolve(this.cleanUser(user));
                }
            }.bind(this));
        }.bind(this));
        return promise;
    }

    /**
     * Check is Authenticated
     * @returns {Promise}
     */
    isAuthenticated() {
        let user = firebase.getAuth();
        let promise = new Promise(function (resolve, reject) {
            if (user) {
                resolve(this.cleanUser(user));
            }
            else reject('not auth token');
        }.bind(this));
        return promise;
    }

    /**
     * Logout
     * @returns {Promise}
     */
    logout() {
        return new Promise(function (relsove, reject) {
            firebase.unauth();
            relsove();
        })
    }

    clearCookies() {
      this.deleteCookie("flarum_remember");
      this.deleteCookie("flarum_userId");
    }

    /**
     * Update profile
     * @param profile | object
     * @param uid | string (eg: user_id)
     * @returns {Promise}
     */
    updateProfile(profile = {}, uid) {
        
        let promise = new Promise(function (resolve, reject) {
          try {
             let userProfile = firebase.child('users').child(uid);
         } catch (e) {
          reject(e);
         }
          
            userProfile.set(profile, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(profile);
                }
            });
        });
        return promise;
    }

    /**
     * Get profile
     * @param uid
     * @returns {Promise}
     */
    getProfile(uid) {
        let promise = new Promise(function (resolve, reject) {
          try {
             let userProfile = firebase.child('users').child(uid);
         } catch (e) {
          reject(e);
         }
            userProfile.on("value", (snapshot)=> {
                let profile = snapshot.val();
                resolve(profile);
            }, (error)=> {
                reject(error);
            });
        });
        return promise;
    }

    setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      var path_domain = "path=/;domain=.educron.com";
      document.cookie = cname + "=" + cvalue + ";" + expires + ";" + path_domain;
    }

     deleteCookie(name, path='/', domain='.educron.com') {
        // document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = name + "=" +
        ((path) ? ";path="+path:"")+
        ((domain)?";domain="+domain:"") +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    };

    forumLogin(email, password) {
      var data = JSON.stringify({
        "identification": email,
        "password": password
      });

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      var rt = this;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          console.log(this.responseText);
          rt.setCookie("flarum_remember", JSON.parse(this.responseText).token,1);
          rt.setCookie("flarum_userId", JSON.parse(this.responseText).userId,1);
        }
      });
      var full = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
      xhr.open("POST", full + "/me");
      xhr.setRequestHeader("content-type", "application/json");
      xhr.setRequestHeader("cache-control", "no-cache");

      xhr.send(data);
      var resp = xhr.responseText
      return resp
    }

}
