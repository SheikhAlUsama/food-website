
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



let addDish = async ()=>{
    let itemName = document.getElementById("item-name")
    let itemPrice = document.getElementById("item-price")
    let deliveryType = document.getElementById("delivery")
    let profile = document.getElementById("image");
    console.log(profile)
    let image = await uploadFiles(profile.files[0]);
    firebase.auth().onAuthStateChanged(function (user) {
    firebase.database().ref(`users/${user.uid}/products`).push({
        itemName: itemName.value,
        itemPrice: itemPrice.value,
        deliveryType:deliveryType.value,
        profile: image
        
    })
    alert("Dish Added")
})
}