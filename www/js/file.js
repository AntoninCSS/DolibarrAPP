function encodeImageFileAsURL(element) { // Crée la function avec comme argument un Fichier ici
    var file = element.files[0]; // Crée une varibale avec l'image(l'élément) et le .file[0]
    let nom_Image = file.name;
    localStorage.setItem("Nom_img", nom_Image);
    var reader = new FileReader();// Transforme L'image sous format base64 et met la réponse sous forme de tableau
    reader.onloadend = function() { // permet de lire levement "onchange" dans le html et execute ce
    let img64 = reader.result.split(','); // Prend lobjet "result" dans le tableau et je séparer par "," le base64 et la phrase de début
    localStorage.setItem("BASE64",img64[1]); // Stocke le base64 de l'image dans le stockage local 
    }
    
    reader.readAsDataURL(file); // permet de lire le contenue du fichier et dès que cest fait déclanche la fontion "onloadend"
}

async function post_file(){
    let NDF__ID = localStorage.getItem('NDF_ID');
    let API_KEY = localStorage.getItem('token');
    let image_64 = localStorage.getItem('BASE64');
    let nom_img = localStorage.getItem('Nom_img');
    let IP = localStorage.getItem('Adresse_IP');
    let url = `https://${IP}/dolibarr/api/index.php/documents/upload`;

const data = await fetch(url,{
        method: "POST",
        body:  JSON.stringify({
            "filename": `${nom_img}`, 
            "modulepart": "expensereport", 
            "ref": `(PROV${NDF__ID})`, 
            "filecontent": `${image_64}`,
            "fileencoding": "base64", 
            "overwriteifexists": "1"
        }),
        headers:{
        "Content-Type": "application/json",
        "Accept": "application/json",
        "DOLAPIKEY": `${API_KEY}`
        }
    })
    if(data.ok){
        const response = await data.json();
        console.log("Done");
    }
    else{
        console.log("ERREUR");
    }
    }

 document.getElementById('takepicture').addEventListener('click', cameraApp); //si il y a l'evenement click sur le bouton alors ilo lance la fonction "cameraApp"
  function cameraApp(){
    navigator.camera.getPicture(onSucess,onFail,{ //syntaxe ppour prendre la photo en natif 
        //option de la photo :
        quality:100,
        saveToPhotoAlbum:true,
        destinationType:Camera.DestinationType.DATA_URL // .DATA_URL permet directement de traduire l'image en base64
    });
    function onSucess(imageURI){
    //console.log(imageURI);
    localStorage.setItem("BASE64", imageURI);
    localStorage.setItem("Nom_img", "Preuve.png");
    }
    function onFail(message) {
        alert('Failed because : ' + message);
    }
  }