async function createNDF(){
        let IP = localStorage.getItem('Adresse_IP');
        let ref_NOTE = document.getElementById("Nom-Note").value;
        let U_ID = localStorage.getItem('userID');
        let API_KEY = localStorage.getItem('token');
        let url = `https://${IP}/dolibarr/api/index.php/expensereports`;
    
        let dataL = localStorage.getItem("Tab final");
        let data2 = JSON.stringify({"date_debut":`${Date.now()/1000}`,"date_fin": `${Date.now()/1000}`,"fk_user_author": `${U_ID}`,"note_public": `${ref_NOTE}`});
        data2 = data2.substring(1);
        dataL= dataL.concat(data2);
        console.log(dataL);

      const data = await fetch(url,{
            method: "POST",
            body: dataL,
        headers:{

            "Content-Type": "application/json",
            "Accept": "application/json",
            "DOLAPIKEY": `${API_KEY}`

            },
        })

        if(data.ok){
            
            const response = await data.json();
            localStorage.setItem('NDF_ID', response);
            post_file();
        }

        else{
            console.log("ERREUR");
        }
        }
