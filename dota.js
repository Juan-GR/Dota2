//Evento que al clicar ejecuta una peticion AJAX
$("#btnBuscar").on("click", function () {
  $(".seccion3").empty();
  $(".seccion3").append('<img id="loader" src="img/gatito.gif">');
  //Peticion ajax que busca el nombre del jugador y recibe los datos en json
  $.ajax({
    url: `https://api.opendota.com/api/search?q=${$("#jugador").val()}`,
    type: "GET",
    dataType: "json",
    success: cargarPerfil,
    error: function () {
      let p = document.createElement("p");
      p.textContent = "No se ha podido cargar la informacion";
      document.getElementsByClassName("seccion3")[0].appendChild(p);
      $("#loader").hide();
    },
  });
});

//Funcion cargar perfil, recibe como parametro el json y realiza otras dos peticiones Ajax a partir del nombre de usuario de la primera peticion
function cargarPerfil(json) {
  if (json[0] !== undefined) {
    $.ajax({
      url: `https://api.opendota.com/api/players/${json[0].account_id}`,
      type: "GET",
      dataType: "json",
      success: mostrarPerfil,
    });
    $.ajax({
      url: `https://api.opendota.com/api/players/${json[0].account_id}/matches?limit=10`,
      type: "GET",
      dataType: "json",
      success: cargarPartidas,
    });
  } else {
    $("#loader").hide();
    let p = document.createElement("p");
    p.textContent = "Ese jugador no existe";
    document.getElementsByClassName("seccion3")[0].appendChild(p);
  }
}

//Funcion que coge las partidas del archivo json y las imprime en formato tabla
function cargarPartidas(json) {
  console.log(json);
  let div = document.createElement("div");
  div.setAttribute("id", "partidas");
  let tabla = document.createElement("table");
  let tr = "";
  let th = "";
  let td = "";
  let cabecera = [
    "Partida",
    "Resultado",
    "Asesinatos",
    "Muertes",
    "Asistencias",
    "Duracion",
  ];
  tr = document.createElement("tr");
  for (let i = 0; i < cabecera.length; i++) {
    th = document.createElement("th");
    th.textContent = cabecera[i];
    tr.appendChild(th);
  }
  tabla.appendChild(tr);

  json.forEach((partida) => {
    tr = document.createElement("tr");
    for (let i = 0; i < cabecera.length; i++) {
      td = document.createElement("td");
      switch (cabecera[i]) {
        case "Partida":
          td.textContent = partida.match_id;
          break;
        case "Resultado":
          if (partida.radiant_win) {
            td.textContent = "Victoria";
          } else {
            td.textContent = "Derrota";
          }
          break;
        case "Asesinatos":
          td.textContent = partida.kills;
          break;
        case "Muertes":
          td.textContent = partida.deaths;
          break;
        case "Asistencias":
          td.textContent = partida.assists;
          break;
        case "Duracion":
          td.textContent = partida.duration;
          break;
      }
      tr.appendChild(td);
    }
    tabla.appendChild(tr);
  });

  document.getElementsByClassName("seccion3")[0].appendChild(tabla);
}

//Funcion mostrar perfil que llama a otras dos funciones que se encargan de imprimir el perfil en la pagina principal
function mostrarPerfil(json) {
  $("#loader").hide();
  console.log(json);
  crearPerfil(json);
  crearInfoPerfil(json);
}
//Funcion que crea el perfil del usuario con los datos
function crearPerfil(json) {
  let div=document.createElement("div");
  div.setAttribute("id","perfil");
  let pAvatar=document.createElement("p");
  let img=document.createElement("img");
  let a=document.createElement("a");
  a.href=json.profile.profileurl;
  a.target="_blank";
  img.setAttribute("src",json.profile.avatarfull);
  a.appendChild(img);
  pAvatar.appendChild(a);
  let pName=document.createElement("p");
  pName.textContent=json.profile.personaname;
  div.appendChild(pAvatar);
  div.appendChild(pName)
  document.getElementsByClassName("seccion3")[0].appendChild(div);
}
//Funcion que crea el perfil del usuario con mas caracteristicas del mismo
function crearInfoPerfil(json) {
  let div=document.createElement("div");
  div.setAttribute("id","perfilInfo");
  let pId=document.createElement("p");
  pId.textContent=`ID CUENTA: ${json.profile.account_id}`;
  let pLogin=document.createElement("p");
  pLogin.textContent=`Ultimo Login: ${json.profile.last_login}`;
  let pMmr=document.createElement("p");
  pMmr.textContent=`MMR estimado: ${json.mmr_estimate.estimate}`;
  let img=document.createElement("img");
  img.setAttribute("src",imagenMMR(json.mmr_estimate.estimate));
  div.appendChild(img)
  div.appendChild(pId);
  div.appendChild(pLogin);
  div.appendChild(pMmr);
  document.getElementsByClassName("seccion3")[0].appendChild(div);
}
//Funcion que comprueba el mmr (nivel del jugador en el juego) y dependiendo de este, devolverá una imagen u otra
function imagenMMR(mmr) {
  let imagen = "";
  if (mmr >= 0 && mmr < 839) {
    imagen = "img/heraldo.png";
  } else if (mmr >= 840 && mmr < 1679) {
    imagen = "img/guardian.png";
  } else if (mmr >= 1680 && mmr < 2519) {
    imagen = "img/cruzado.png";
  } else if (mmr >= 2520 && mmr < 3359) {
    imagen = "img/arconte.png";
  } else if (mmr >= 3360 && mmr < 4199) {
    imagen = "img/leyenda.png";
  } else if (mmr >= 4200 && mmr < 5039) {
    imagen = "img/ancestral.png";
  } else if (mmr > 5040 && mmr < 5740) {
    imagen = "img/divino.png";
  } else if (mmr > 5741) {
    imagen = "img/inmortal.png";
  }
  return imagen;
}
