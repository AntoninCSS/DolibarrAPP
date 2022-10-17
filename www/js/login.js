function getLog(){
   let Ip = document.getElementById("Adresse_IP").value;
   let pass = document.getElementById("Password").value;
   let log  = document.getElementById("Login").value;
   let url = `https://${Ip}/dolibarr/api/index.php/login?login=${log}&password=${pass}`;
    fetch(url) //contacte L'api
    .then (res => {
        if(res.ok){ // si la reponse de l'api est possitive
           const Udata = res.json() // traduit la reponse en format Json
           Udata.then((response) => { // traduit la promesse en reponse
               tokenID = response['success']['token'] // Permet d'invidualiser le token
               //location.replace(`accueil.html`); // Redirige vers l'accueil
               window.location="accueil.html";
               localStorage.setItem('token', tokenID);
               let IP = localStorage.setItem('Adresse_IP',Ip);
           })
        } else {
           console.log("ERREUR"); // si il n'y a pas de réponse possitive
           //document.write("<h2> Test non reussi </h2>");
        }
      })
   }
   