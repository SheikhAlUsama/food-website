// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         var uid = user.uid;
//         firebase.database().ref(`users/${uid}`).once('value', (data) => {
//             let username = document.getElementById('name')
//             let email = document.getElementById('email')
//             let country = document.getElementById('country')
//             let phone = document.getElementById('phone')
//             username.innerHTML = (`Name : ${data.val().userName}`)
//             email.innerHTML = (`Email : ${data.val().email}`)
//             phone.innerHTML = (`Phone : ${data.val().phone}`)
//             country.innerHTML = (`Country : ${data.val().country}`)
//         })
//         // ...
//     } else {
//         window.location = "signup.html"

//     }
// });

// let userFromFirebase = new Promise((res, rej) => {
//     firebase.auth().onAuthStateChanged((user) => {
//         if (user) {
//             res(user.uid)
           
//         }
//     })
// })
// let getUserId = async () => {
//     let uid = await userFromFirebase;
//     console.log(uid)
//     return uid
// }
// getUserId();


// let logOut = () => {
//     firebase.auth().signOut().then(function () {
//         console.log('Signed Out');
//     }, function (error) {
//         console.error('Sign Out Error', error);
//     });
// }

// let deleteAccount = () => {
//     var proceed = confirm("Are you sure you want to delete your account");
// if (proceed) {
//     const user = firebase.auth().currentUser;

//     user.delete().then(() => {
//         var ref = firebase.database().ref(
//             "users/".concat(user.uid, "/")
//         )
//         ref.remove();
//     }).catch((error) => {
//         console.log("Error" + error )
//     });
// } else {
//   console.log("continue")
// }
// }