async function modifNDF(){
        //initialisation des variable utiliser dans la fonction 
        let U_ID = localStorage.getItem('userID'); 
        let API_KEY = localStorage.getItem('token');
        let IP = localStorage.getItem('Adresse_IP');
        let NDF__ID = localStorage.getItem('NDF_ID');
        let ref_NOTE = document.getElementById("Note").value;
        let prix = document.getElementById("Prix").value;
        let prix_ht = document.getElementById("Prix_ht").value;
        let url = `https://${IP}/dolibarr/api/index.php/expensereports/${NDF__ID}`;

        const data = await fetch(url,{
            method: "PUT", // method "PUT"
            body:  JSON.stringify({
             "id": `${NDF__ID}`,
             "total_ttc": `${prix}`,
             "total_ht": `${prix_ht}`,
             "note_public": `${ref_NOTE}`
            }),
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "DOLAPIKEY": `${API_KEY}`
        }
    })
    if(data.ok){
        const response = await data.json();
        post_file();
    }
    else{
        console.log("Erreur");
    }
}
    

async function createNDF(){
    let IP = localStorage.getItem('Adresse_IP');
    let Date_Debut = new Date(document.getElementById("d_debut").value).getTime(); //.getTime permet de traduire la date en nombre;
    let Date_Fin = new Date(document.getElementById("dd_fin").value).getTime();   
    let U_ID = localStorage.getItem('userID');
    let API_KEY = localStorage.getItem('token');
    let url = `https://${IP}/dolibarr/api/index.php/expensereports`;

  const data = await fetch(url,{
        method: "POST",
        body:  JSON.stringify({
            "fk_user_author": `${U_ID}`,
            "date_debut":  `${Date_Debut/1000}`,
            "date_fin":    `${Date_Fin/1000}`
        }),
        headers:{
        "Content-Type": "application/json",
        "Accept": "application/json",
        "DOLAPIKEY": `${API_KEY}`
        }
    })
    if(data.ok){
        const response = await data.json();
        localStorage.setItem('NDF_ID', response);
        modifNDF();
    }
    else{
        console.log("ERREUR");
    }
    }
