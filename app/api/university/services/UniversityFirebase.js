import firebase from '../../Firebase';
import Auth from '../../auth/index';
import {$} from 'jquery';

import {mergeArrayObjectWithKey, mergeObjectWithKey} from '../../../utils/firebaseUtils';

export default class PostFirebase {

    /**
     * Get post lists
     * @returns {Promise}
     */
    getUniversityList() {
        let universitiesFirebase = firebase.child('universities');
        let promise = new Promise((resolve, reject) => {
            try {
                universitiesFirebase.on('value', function (snapshot) {
                    let universities = mergeArrayObjectWithKey(snapshot.val());
                    let loopGetUser = (postIndex) => {
                        if (universityIndex == universities.length) {
                            resolve(universities.reverse())
                        } else {
                            Auth.getProfile(universities[universityIndex].uid).then((profile)=> {
                                universities[universityIndex].user = profile;
                                loopGetUser(universityIndex + 1)
                            });
                        }
                    }
                    loopGetUser(0);
                });
            }
            catch (err) {
                reject(err.message);
            }
        });
        return promise;
    }

    /**
     * Get Post
     * @param id | string
     * @returns {Promise}
     */
    getUniversity(id) {
        let universityFirebase = firebase.child('universities').child(id);
        let promise = new Promise((resolve, reject) => {
            try {
                universityFirebase.on('value', function (snapshot) {
                    let university = snapshot.val();
                    if (university) {
                      var url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&indexpageids&exintro=&explaintext=&titles=' + university.name.split(' ').join('%20') + '&redirects=true';
                      var xhr = new XMLHttpRequest();
                      xhr.addEventListener("readystatechange", function () {
                        if (this.readyState === 4) {
                          var jj = JSON.parse(this.responseText);
                          var extract = jj.query.pages[jj.query.pageids[0]].extract
                          university.info = extract;
                          resolve(mergeObjectWithKey(university, id))
                        }
                      });

                      xhr.open("GET", url);
                      xhr.setRequestHeader("content-type", "application/json");
                      xhr.send();                          
                    }
                    else {
                        reject('university\'s not exists');
                    }
                });
            }
            catch (e) {
                reject(e.message);
            }
        });
        return promise;
    }

    getResultSummary(id) {
        return new Promise(resolve => {
          setTimeout(() => {
            let profile = {first_name:"amrit"};
            let post = {title:"Fiat", user:profile, color:"white", content: "hihi content"};
            resolve(post);
          }, 1000);
        });
    }

    getUnilist() {
        let universitiesFirebase = firebase.child('universities');
        let promise = new Promise((resolve, reject) => {
            try {
                universitiesFirebase.on('value', function (snapshot) {
                    let universities = mergeArrayObjectWithKey(snapshot.val());
                    resolve(universities);
                });
            }
            catch (err) {
                reject(err.message);
            }
        });
        return promise;
    }

}
