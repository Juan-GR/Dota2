 $.ajax({
    url: "https://api.opendota.com/api/status",
    type: "GET",
    dataType: "json",
    success: function(json){
        let pUsuarios=document.createElement("p");
        let pPartidasAyer=document.createElement("p");
        let pPartidasHora=document.createElement("p");
        let pPeticionesApi=document.createElement("p");
        pUsuarios.textContent=json.user_players;
        pPartidasAyer.textContent=json.matches_last_day;
        pPartidasHora.textContent=json.matches_last_hour;
        pPeticionesApi.textContent=json.api_hits_last_day;
        $("#usuarios").append($(pUsuarios));
        $("#partidasAyer").append($(pPartidasAyer));
        $("#partidasUltimaHora").append($(pPartidasHora));
        $("#peticionesApi").append($(pPeticionesApi));
    },
    error: function () {
      console.log("No se ha podido obtener la información");
    },
  });


  $.ajax({
    url: "https://api.opendota.com/api/live",
    type: "GET",
    dataType: "json",
    success: function(json){
        let p=document.createElement("p");
        p.textContent=json.length;
        document.getElementById("partidasAhora").appendChild(p);
    },
    error: function () {
      console.log("No se ha podido obtener la información");
    },
  });

  $.ajax({
    url: "https://api.opendota.com/api/heroes",
    type: "GET",
    dataType: "json",
    success: function(json){
        let p=document.createElement("p");
        p.textContent=json.length;
        document.getElementById("campeonesTotales").appendChild(p);
    },
    error: function () {
      console.log("No se ha podido obtener la información");
    },
  });