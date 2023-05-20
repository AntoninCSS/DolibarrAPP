var Final = [];
var EnModif = -1;

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
    var lignesContainer = document.getElementById("AfficheLigne");
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
  var lignesContainer = document.getElementById("AfficheLigne");
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

function Validation() {
  localStorage.setItem("Tab final", '{"lines":' + JSON.stringify(Final) + ",");
  document.location.href = "createNDF.html";
}
