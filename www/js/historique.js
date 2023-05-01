async function getHistorique(){
    let IP = localStorage.getItem('Adresse_IP');
    let API_KEY = localStorage.getItem('token');
    let url = `https://${IP}/dolibarr/api/index.php/expensereports?sortfield=t.rowid&sortorder=ASC&limit=100`;
    const data = await fetch (url,{ // contacte L'API
        method: "GET", // Déclaration de la méthode du fetch 
        headers:{ // Décalarion du header 
            "Accept": "application/json",
            "DOLAPIKEY": `${API_KEY}`
    }
    })
    if(data.ok){ // .ok = si la réponse de l'api est 200
        const response = await data.json(); // la fonction await intérompt l'execution du code pour atendre la réponse 

        response.forEach(element => {

            let ID_NDF = element["lines"]["0"]["id"];
            let Line_Quantity = element["lines"]["0"]["qty"];
            let Line_Date = element["lines"]["0"]["date"];
            let Line_Type = element["lines"]["0"]["fk_c_type_fees"];
            let Line_Value = element["lines"]["0"]["value_unit"];
            let Line_Total_TTC = element["lines"]["0"]["total_ttc"];
            let Date_Debut = element["date_debut"];
            let Date_Fin = element["date_fin"];
            let Note_public = element["note_public"];

            const NDF_H = {
                Ligne: {
                    qty: Line_Quantity,
                    date: Line_Date,
                    type: Line_Type,
                    value: Line_Value,
                    value_unit: Line_Value,
                    total_ttc: Line_Total_TTC
                },
                date_debut: Date_Debut,
                date_fin: Date_Fin,
                note_prublic: Note_public,
                id : ID_NDF   
            };

            const NDF_JSON = JSON.stringify(NDF_H);
            console.log(NDF_JSON);

            //Création de l'affichage de ces objets JSON 

            const gridItem = document.createElement('div');
            const gridContainer = document.getElementById('Grid-Contain');

            gridItem.classList.add('grid-item'); // Ajout de la classe 'grid-item' à l'élément HTML

            gridItem.innerHTML = `
            
            <h1>Note de frais : ${NDF_H["id"]}</h1>
            <h2> Quantité : ${NDF_H["Ligne"]["qty"]}</h2>
            <h2> Date : ${NDF_H["Ligne"]["date"]}</h2>
            <h2> Type : ${NDF_H["Ligne"]["type"]}</h2>
            <h2> Valeur: ${NDF_H["Ligne"]["value"]}</h2>
            <h2> Total TTC: ${NDF_H["Ligne"]["total_ttc"]}</h2>
            `; // Ajout du contenu HTML à l'élément HTML créé
            console.log(gridItem);
            gridContainer.appendChild(gridItem); // Ajout de l'élément HTML à la grille
        });
       }
       else{
           console.log("ERREUR"); // si il n'y a pas de réponse positive 
       }
    }