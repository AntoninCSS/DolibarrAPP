var Final = [];
var EnModif = -1;

async function getNDF() {
  //Section de netoyage

  //permet de suprimer le tableau de l'ancien fetch
  Final = [];
  //permet de suprimer les ancienne donnée affiché
  var lignesContainer = document.getElementById("LignesAFF");
  lignesContainer.innerHTML = "";

  let IP = localStorage.getItem("Adresse_IP");
  let API_KEY = localStorage.getItem("token");
  let NDF = document.getElementById("IDNDF").value;
  let url = `https://${IP}/dolibarr/api/index.php/expensereports/${NDF}`;

  //récuperation des div sur la vue
  let infoG = document.getElementById("InfoG");
  let infoL = document.getElementById("InfoL");

  const data = await fetch(url, {
    // contacte L'API
    method: "GET", // Déclaration de la méthode du fetch
    headers: {
      // Décalarion du header
      Accept: "application/json",
      DOLAPIKEY: `${API_KEY}`,
    },
  });
  if (data.ok) {
    // .ok = si la réponse de l'api est 200

    const response = await data.json(); // la fonction await intérompt l'execution du code pour atendre la réponse

    // infoG
    infoG.innerHTML = `Nom de la note : <input type="text" id="inputNOTE" value="${response.note_public}">
    <button id="modif">Modifier </button>
    `;
    //Affichage des champs générique de modification
    infoL.innerHTML = `
      <h2>Champs de modification de ligne : </h2>
      <div id="contain-LDF" class="contain-LDF">
      <label class="note-label" for="date">Date : </label>
      <input name="date" id="date" type="date" >

      <label class="note-label" for="Type">Type de Note De Frais : </label>
      <select  name="Type" id="TypeNDF">
        <option value="">--Veillez Choisir une options--</option>
        <option value="1">Frais kilométriques</option>
        <option value="2">Repas</option>
        <option value="3">Transport</option>
        <option value="4">Autre</option>
      </select>

      <label>T.V.A: 0% | Quantité : 1 | </label>
      <label class="note-label" for="prix">  Prix : <input name="prix" id="Prix" type="number" >
      </label>
      <button class="Btn" onclick="AjoutLigne()">Ajouter la ligne</button>
      <button class="Btn" onclick="Validation()"> Valider la selection</button>
      `;

    response.lines.forEach((element) => {
      var Ligne = {
        qty: "1",
        date: element.date,
        fk_c_type_fees: element.fk_c_type_fees,
        value_unit: element.value_unit,
        total_ttc: element.total_ttc,
      };
      //Sauvegarde de la Ligne
      Final.push(Ligne);

      AfficherLigne(Ligne, Final.length - 1);
      console.log(Final);
    });
  } else {
    console.log("ERREUR"); // si il n'y a pas de réponse positive
  }
}

//Réutilisation des fonction de AjoutLigne.js mais modifier pour s'adapter a la modification

function AjoutLigne() {
  // Récupérer les valeurs des champs
  var date = document.getElementById("date").value;
  var type = document.getElementById("TypeNDF").value;
  var prix = document.getElementById("Prix").value;

  if (EnModif !== -1) {
    // Mettre à jour la ligne existante dans le tableau lignes
    var ligneModifiee = Final[EnModif];
    ligneModifiee.date = date;
    ligneModifiee.fk_c_type_fees = type;
    ligneModifiee.value_unit = prix;
    ligneModifiee.total_ttc = prix;
    ligneModifiee.qty = "1";
  } else {
    var Ligne = {
      qty: "1",
      date: date,
      fk_c_type_fees: type,
      value_unit: prix,
      total_ttc: prix,
    };
    //Sauvegarde de la Ligne
    Final.push(Ligne);
  }

  // Réinitialiser les champs du formulaire
  document.getElementById("date").value = "";
  document.getElementById("TypeNDF").value = "";
  document.getElementById("Prix").value = "";

  AfficherLigne(Ligne, Final.length - 1); // -1 car on retombe sur le numero de ligne du JSON pour l'option suprimer
}

function AfficherLigne(Ligne, index) {
  //ajout des données

  let div = document.createElement("div");
  div.setAttribute("id", index);
  if (EnModif === -1) {
    div.innerHTML = `
    Quantité : ${Ligne.qty}
    Date : ${Ligne.date}
    Type : ${Ligne.fk_c_type_fees}
    Valeur :  ${Ligne.value_unit}
    Total TTC : ${Ligne.total_ttc}`;

    //ajout du bouton surpimer
    var SuppButton = document.createElement("button");
    SuppButton.innerHTML = "Supprimer";
    SuppButton.onclick = function () {
      supprimerLigne(index);
    };
    // Ajouter du boutton modif
    var ModifButton = document.createElement("button");
    ModifButton.innerHTML = "Modifier";
    ModifButton.onclick = function () {
      modifierLigne(index);
    };

    div.appendChild(ModifButton);
    div.appendChild(SuppButton);

    // Ajouter la ligne au conteneur
    var lignesContainer = document.getElementById("LignesAFF");
    lignesContainer.appendChild(div);
  } else {
    var elementModif = document.getElementById(EnModif);
    // console.log(elementModif);

    var ligneModifiee = Final[EnModif];

    elementModif.innerHTML = `
    Quantité : ${ligneModifiee.qty}
    Date : ${ligneModifiee.date}
    Type : ${ligneModifiee.fk_c_type_fees}
    Valeur :  ${ligneModifiee.value_unit}
    Total TTC : ${ligneModifiee.total_ttc}`;

    //ajout du bouton surpimer
    var SuppButton = document.createElement("button");
    SuppButton.innerHTML = "Supprimer";
    SuppButton.onclick = function () {
      supprimerLigne(index);
    };
    // Ajouter du boutton modif
    var ModifButton = document.createElement("button");
    ModifButton.innerHTML = "Modifier";
    ModifButton.onclick = function () {
      modifierLigne(index);
    };

    elementModif.appendChild(ModifButton);
    elementModif.appendChild(SuppButton);
    EnModif = -1;
  }
}

function supprimerLigne(index) {
  // Supprimer la ligne du tableau
  Final.splice(index, 1);

  // Mettre à jour l'affichage des lignes
  UpdateLignes();
}

function UpdateLignes() {
  var lignesContainer = document.getElementById("LignesAFF");
  lignesContainer.innerHTML = "";

  for (var i = 0; i < Final.length; i++) {
    AfficherLigne(Final[i], i);
  }
}

function modifierLigne(index) {
  //recup de la ligne modifier
  var modif = Final[index];

  //Mise a jour des donnée des inputs

  document.getElementById("date").value = modif.date;
  document.getElementById("TypeNDF").value = modif.fk_c_type_fees;
  document.getElementById("Prix").value = modif.value_unit;

  EnModif = index;
}

async function Validation() {

  let IP = localStorage.getItem("Adresse_IP");
  let ref_NOTE = document.getElementById("inputNOTE").value;
  let U_ID = localStorage.getItem("userID");
  let API_KEY = localStorage.getItem("token");
  let SUPP = document.getElementById("IDNDF").value;
  let url = `https://${IP}/dolibarr/api/index.php/expensereports`;
  let urlDelete = `https://${IP}/dolibarr/api/index.php/expensereports/${SUPP}`;

  let dataL = '{"lines":' + JSON.stringify(Final) + ",";
  let data2 = JSON.stringify({"date_debut":`${Date.now()/1000}`,"date_fin": `${Date.now()/1000}`,"fk_user_author": `${U_ID}`,"note_public": `${ref_NOTE}`});
  data2 = data2.substring(1);
  dataL = dataL.concat(data2);
  console.log(dataL);

  const data = await fetch(url, {
    method: "POST",
    body: dataL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      DOLAPIKEY: `${API_KEY}`,
    },
  });

  if (data.ok) {
    const response = await data.json();
    localStorage.setItem("NDF_ID", response);
    // post_file();

    const data2 = await fetch(urlDelete, {
      method: "DELETE",
      headers: {
        // Décalarion du header
        Accept: "application/json",
        DOLAPIKEY: `${API_KEY}`,
      },
    });
    if (data2.ok) {
      document.location.href = "accueil.html";
    } else {
      console.log("Erreur l'hors de la suppresion");
    }
  } else {
    console.log("ERREUR");
  }
}
