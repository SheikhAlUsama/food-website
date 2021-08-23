// Main Index File
let uploadFiles = (file) => {
  return new Promise((resolve, reject) => {
      let storageRef = firebase.storage().ref(`myfolder/todayImages/${file.name}`);

      let uploading = storageRef.put(file)
      uploading.on('state_changed',
          (snapshot) => {
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED:
                      console.log('Upload is paused');
                      break;
                  case firebase.storage.TaskState.RUNNING:
                      console.log('Upload is running');
                      break;
              }
          },
          (error) => {
              reject(error)
          },
          () => {
              uploading.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  resolve(downloadURL)
              });
          }
      );
  })
}


// For Restautrant Registration
async function store() {
  var userName = document.getElementById("username").value;
  var name = document.getElementById("email").value;
  var pw = document.getElementById("password").value;
  var country = document.getElementById("country").value;
  var phone = document.getElementById("phone").value;
  var imageRes = document.getElementById("imageRes")
  let image = await uploadFiles(imageRes.files[0]);
  let success = document.getElementById("success")
    let failure = document.getElementById("error")
    let text = document.getElementById("text")
    let loader = document.getElementById("loader")
    loader.style.display = "block"
    text.style.display = "none"

  var email_validator_regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var nameMatch = /^[a-zA-Z]+/g;
  var passMatch = /^[A-Za-z]\w{7,14}$/g;
  let data = {
    userName: userName,
    email: name,
    password: pw,
    country: country,
    phone: phone,
    pic: image,

    role: "Restaurant"
  };

  if (!userName.match(nameMatch) || userName.length < 6) {
    failure.innerText = "Your Username must be 6 characters long"
    failure.style.display = "block"

  } else if (!name.match(email_validator_regex)) {
    failure.innerText = "Please fill correct email"

    loader.style.display = "none"
  } else if (!pw.match(passMatch)) {
    failure.innerText = "Password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
    failure.style.display = "block"
  } else {
    
    firebase
      .auth()
      .createUserWithEmailAndPassword(name, pw)
      .then((userCredential) => {
        // Signed in
          
        var user = userCredential.user;
        firebase.database().ref(`users/${user.uid}`).set(data).then(() => {
          // alert("Your account has been created");
          //   window.location.href = "login.html"

          success.style.display = "block"
          failure.style.display = "none"
          text.style.display = "block"
          loader.style.display = "none"
          console.log(user);
          setTimeout(() => {
            window.location = "login.html"
          }, 1000);
          // ...
        })
      }
      )

      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
        failure.innerText = errorMessage
        
        success.style.display = "none"
          failure.style.display = "block"
          text.style.display = "block"
          loader.style.display = "none"
        // ..
      });
  }
}

// For Customer Registration
function storeCustomer() {
  var userName = document.getElementById("username").value;
  var name = document.getElementById("email").value;
  var pw = document.getElementById("password").value;
  var country = document.getElementById("country").value;
  var phone = document.getElementById("phone").value;
  let success = document.getElementById("success")
    let failure = document.getElementById("error")
    let text = document.getElementById("text")
    let loader = document.getElementById("loader")
    loader.style.display = "block"
    text.style.display = "none"

  var email_validator_regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var nameMatch = /^[a-zA-Z]+/g;
  var passMatch = /^[A-Za-z]\w{7,14}$/g;
  let data = {
    userName: userName,
    email: name,
    password: pw,
    country: country,
    phone: phone,
    role: "Customer"
  };

    
    firebase
      .auth()
      .createUserWithEmailAndPassword(name, pw)
      .then((userCredential) => {
        // Signed in
          
        var user = userCredential.user;
        firebase.database().ref(`users/${user.uid}`).set(data).then(() => {
          success.style.display = "block"
          failure.style.display = "none"
          text.style.display = "block"
          loader.style.display = "none"
          console.log(user);
          setTimeout(() => {
            window.location = "login.html"
          }, 1000);
          // ...
        })
      }
      )

      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
        failure.innerText = errorMessage
        
        success.style.display = "none"
          failure.style.display = "block"
          text.style.display = "block"
          loader.style.display = "none"
        // ..
      });
  }
//}

//checking
function check() {
  var userName = document.getElementById("emailcheck").value;
  var userPw = document.getElementById("passwordcheck").value;
  let success = document.getElementById("success")
    let failure = document.getElementById("error")
    let text = document.getElementById("text")
    let loader = document.getElementById("loader")
    loader.style.display = "block"
    text.style.display = "none"
  firebase
    .auth()
    .signInWithEmailAndPassword(userName, userPw)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      success.style.display = "block"
          failure.style.display = "none"
          text.style.display = "block"
          loader.style.display = "none"
      firebase
        .database()
        .ref(`users/${user.uid}`)
        .once("value", (data) => {
          console.log(user);
          success.style.display = "block"
          failure.style.display = "none"
          setTimeout(() => {
            if(data.val().role == "Restaurant"){
              window.location = "home1.html"
            }else {
              window.location == "../index.html"
            }
          }, 1000);
        })
     

    })
    .catch((error) => {
      var errorMessage = error.message;
      failure.innerText - "PLEASE SIGNUP FIRST"
      success.style.display = "none"
        failure.style.display = "block"
        text.style.display = "block"
        loader.style.display = "none"
    });
}

function back() {
  window.location.href = "signup.html";
}
