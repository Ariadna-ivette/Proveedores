<template>
    <div>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rick and Morty</title>
    <link rel="shortcut icon" href="https://rickandmortyapi.com/api">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;700&display=swap" rel="stylesheet">

</head>
<body>

    <div id="card">
        <article class="card">
            <img src="" alt="imagen header card" class="card-header">
            <div class="card-body">
                <img id="img" src="https://rickandmortyapi.com/api/character/avatar/2.jpeg" alt="imagen" class="card-body-img">
                <h1 class="card-body-title">
                   <span id="name">Morty Smith</span>
                    <span id="id" >2</span>
                    <span id="status" >Alive</span>
                </h1>
            </div>
            <div class="card-footer">
                <div class="card-footer-social">
                    <h3 id="gender" >Male</h3>
                    <p>Gender</p>
                </div>
                <div class="card-footer-social">
                    <img id="img" src="https://rickandmortyapi.com/api/location/1" alt="imagen" class="card-body-img">
                    <h3 id="origin" >Earth</h3>
                    <p>Origin</p>
                </div>
            </div>
            <div class="button" id="botones">
            <button id="mostrar-avatar">Mostrar Avatar</button>
            </div>
        </article>
    </div>

</body>
    </div>

</template>


<script>

(() => {
const URL_API = "https://rickandmortyapi.com/api";
  const URL_IMG_RYM =
  "https://rickandmortyapi.com/api/character/avatar/1.jpeg";
  const MAX = 900;
  const MIN = 1;
  const imagen = document.querySelector("#img");
  const nombre = document.querySelector("#name");
  const id = document.querySelector("#id");
  const status = document.querySelector("#status");
  const origin = document.querySelector("#origin"); 
  const gender = document.querySelector("#gender"); 

  document
    .querySelector("#mostrar-avatar")
    .addEventListener("click", obtenerAvatar);

  let getRandomInt = () => {
    return Math.floor(Math.random() * (MAX - MIN)) + MIN;
  }

  const fetchData = async () => {
    try {
      console.log(id);
      id = getRandomInt();
      const res = await fetch(`${URL_API}${id}`);
      const data = await res.json();

      console.log(data);

      const avatar = {
        id: `#${id}`,
        img: `${URL_IMG_RYM}${data.id}.png`,
        nombre: data.name,
        status: data.status,
        origin: data.origin,
        gender: data.gender
      };

      pintarCard(avatar);
    } catch (error) {
      console.log(error);
    }
  };

  function obtenerAvatar() {
    clearInterval(temporizador);
    console.log("Aquí está un Avatar nuevo");
    fetchData();
    temporizador = setInterval(() => fetchData(), 3000);
  }

  const pintarCard = (avatar) => {
    nombre.innerText = avatar.nombre;
    id.innerText = avatar.id;
    status.innerText = avatar.status;
    origin.innerText = avatar.origin;
    gender.innerText = avatar.gender;
    imagen.src = avatar.img;
  };

  fetchData();
})();

</script>


<style>
:root {
    --dark-cyan: hsl(185, 75%, 39%);
    --very-dark-desaturated: hsl(229, 23%, 23%);
    --dark-grayish-blue: hsl(227, 10%, 46%);
    --dark-gray: hsl(0, 0%, 59%);
  }
  
  html {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 62.5%;
  }
  
  *, *:before, *:after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
  }
  
  body {
    font-family: 'Kumbh Sans', sans-serif;
    background-color: pink;
    background-repeat: no-repeat, no-repeat;
    background-position: right 50vw bottom 50vh, left 50vw top 50vh;
  }
  
  .flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 100vh;
  }
  
  .card {
    background-color: white;
    width: 326px;
    border-radius: 16px;
    margin-left: 40%;
    margin-top: 5%;
    overflow: hidden;
    -webkit-box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  }
  
  .card-header {
    width: 100%;
    display: block;
  }
  
  .card-body {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-bottom: 1px solid rgba(153, 153, 153, 0.383);
  }
  
  .card-body-img {
    width: 200px;
    height: 200px;
    border: 5px solid white;
    border-radius: 50%;
    margin-top: calc(-48px - 5px);
    background-color: white;
  }
  
  .card-body-title {
    margin-top: 2rem;
    font-size: 1.8rem;
    text-transform: capitalize;
  }
  
  .card-body-title span {
    color: darkgray;
    font-weight: 400;
  }
  
  .card-body-text {
    color: darkgrey;
    font-size: 1.6rem;
    margin-top: 0;
    margin-bottom: 2rem;
  }
  button {
    color: white;
    background-color: rgb(63, 27, 52);
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
    margin-left: 7rem;
    border-radius: 15%;
  }
  


  .card-footer {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
    justify-content: space-around;
  }
  
  .card-footer-social {
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  
  .card-footer-social p {
    letter-spacing: 1px;
  }
</style>