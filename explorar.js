async function nombrePokemon() {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const datos = await respuesta.json();
    
    //Obtengo los nombres
    for (let i = 0; i < datos.results.length; i++) {
        console.log(datos.results[i].name);
    }

    //Obtengo los tipos
    for (let t = 0; t < datos.results.length; t++) {
        
    }
}

nombrePokemon();



