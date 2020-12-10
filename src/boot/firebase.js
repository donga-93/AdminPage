import firebase from 'firebase'

// "async" is optional
export default async ({ router/* app, router, Vue, ... */ }) => {
  // something to do
  // Your web app's Firebase configuration

  var firebaseConfig = {
    apiKey: "AIzaSyD71DAMxi_2PA83bBBzmnT5QRoZrsZHGQU",
    authDomain: "employees-69020.firebaseapp.com",
    databaseURL: "https://employees-69020.firebaseio.com",
    projectId: "employees-69020",
    storageBucket: "employees-69020.appspot.com",
    messagingSenderId: "358236632605",
    appId: "1:358236632605:web:440e832221fed5dd2cf8f4",
    measurementId: "G-J8KW0D5PHS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log('boot firebase:', firebase.auth());

  router.beforeEach((to, from, next) => {

    firebase.auth().onAuthStateChanged(userAuth => {

      if (userAuth) {
        firebase.auth().currentUser.getIdTokenResult()
          .then(function ({
                            claims
                          }) {

            if (claims.customer) {
              if (to.path !== '/customer')
                return next({
                  path: '/customer',
                })
            } else if (claims.admin) {
              if (to.path !== '/admin')
                return next({
                  path: '/admin',
                })
            } else if (claims.driver) {
              if (to.path !== '/driver')
                return next({
                  path: '/driver',
                })
            }

          })
      } else {
        if (to.matched.some(record => record.meta.auth)) {
          next({
            path: '/login',
            query: {
              redirect: to.fullPath
            }
          })
        } else {
          next()
        }
      }

    });

    next()

  });

}
