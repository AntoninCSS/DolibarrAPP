async function getUserID(){ // Création de la function asynchrone pour pouvoir utiliser "await"
    let API_KEY = localStorage.getItem('token'); // Prend le token via le Stockage Local
    let IP = localStorage.getItem('Adresse_IP'); // Pre d L'adresse IP  via le Stockage local 
    let url = `https://${IP}/dolibarr/api/index.php/users/info`; // Stocke l'url avec l'adresse IP du sotkcage local dans la var 'url'
    let userID = ""; // initialise une var vide pour stocker le USer ID
    const data = await fetch (url,{ // contacte L'API
        method: "GET", // Déclaration de la méthode du fetch 
        headers:{ // Décalarion du header 
            "Accept": "application/json",
            "DOLAPIKEY": `${API_KEY}`
    }
    })
    if(data.ok){ // .ok = si la réponse de l'api est 200
     const response = await data.json(); // la fonction await intérompt l'execution du code pour atendre la réponse 
     userID = response['id'] // Prend la valeur 'id' du tableau renvoyer par l'api si la réponse est ok
     localStorage.setItem('userID', userID); // Stocke cette valeur sous le nom 'userID' dans le stockage local 
     createNDF(); // appel la fonction suivante 
    }
    else{
        console.log("ERREUR"); // si il n'y a pas de réponse positive 
    }
    }