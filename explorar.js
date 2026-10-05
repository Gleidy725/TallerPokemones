//Parte I
async function nombrePokemon() {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/mewtwo");
    const datos = await respuesta.json();
  
    //Obtengo nombre de los tipos 
    for(let t=0; t<datos.types.length;t++){
        console.log("Tipos:",datos.types[t].type.name);
    }

    //Stats con nombre y valor
    for(let s=0; s<datos.stats.length;s++){
        console.log("Nombre stat:",datos.stats[s].stat.name, "Valor stat:",datos.stats[s].base_stat);
    }

    //Habilidades
    for(let a=0; a<datos.abilities.length;a++){
        console.log("Habilidades:",datos.abilities[a].ability.name);
    } 
}

nombrePokemon();



