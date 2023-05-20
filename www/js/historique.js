async function getHistorique() {
  let IP = localStorage.getItem("Adresse_IP");
  let API_KEY = localStorage.getItem("token");
  let url = `https://${IP}/dolibarr/api/index.php/expensereports?sortfield=t.rowid&sortorder=ASC&limit=100`;

  // Creation de l'affichage
  var gridItem = document.createElement("div");
  var gridContainer = document.getElementById("Grid-Contain");
  gridItem.classList.add("grid-item");

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
    response.forEach((element) => {
      //récupation de l'id qui ce situe dans la reponce générale de l'api
      console.log(element);

      let NoteID = document.createElement("h1");
      NoteID.textContent = `Note de frais : ${element["id"]}`;

      gridContainer.appendChild(NoteID);

      element.lines.forEach((element) => {
        let Div = document.createElement("div");

        let NoteQTY = document.createElement("h2");
        NoteQTY.textContent = ` Quantité : ${element["qty"]}`;

        let NoteDATE = document.createElement("h2");
        NoteDATE.textContent = ` Date : ${element["date"]}`;

        let NoteTYPE = document.createElement("h2");
        NoteTYPE.textContent = `Type : ${element["fk_c_type_fees"]}`;

        let NoteValeur = document.createElement("h2");
        NoteValeur.textContent = `Valeur: ${element["value_unit"]}`;

        let NoteTTC = document.createElement("h2");
        NoteTTC.textContent = `Total TTC: ${element["total_ttc"]}`;

        Div.appendChild(NoteQTY);
        Div.appendChild(NoteDATE);
        Div.appendChild(NoteTYPE);
        Div.appendChild(NoteValeur);
        Div.appendChild(NoteTTC);

        gridContainer.appendChild(Div);
      });
    });
  } else {
    console.log("ERREUR"); // si il n'y a pas de réponse positive
  }
}
