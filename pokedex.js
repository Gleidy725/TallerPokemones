const prompt = require('prompt-sync')();
//Parte II
//busca pokemon específico
async function buscarPokemon(nombre) {
    let URL = "https://pokeapi.co/api/v2/pokemon/";
    URL = URL + (nombre.toLowerCase());
    const respuesta = await fetch(URL);

    //const datos = await respuesta.json();
    if (!respuesta.ok) {
        console.log(respuesta.status);
        console.log("El pokemon:", nombre.toUpperCase(), "no existe :(");
        return null;
    } else {
        let infoPokemon = await respuesta.json();
        console.log("Nombre pokemon:",infoPokemon.name, "ID:",infoPokemon.id);
        return infoPokemon;
    }
}

//Parte III
//Imprime la ficha del pokemon
function mostrarFicha(datos) {
    let tipos = [];
    if (datos == null) {
        console.log("No hay datos para mostrar");
        return;
    } else {
        console.log("\n**********************************");
        console.log("NOMBRE:", datos.name.toUpperCase(), "POKEDEX:", datos.id);
        for (let t = 0; t < datos.types.length; t++) {
            tipos.push(datos.types[t].type.name);
        }
        console.log("TIPOS:", tipos.join(" / "));
        console.log("ALTURA", datos.height * 10, "cm");
        console.log("PESO:", datos.weight / 10, "kg");

        for (let s = 0; s < datos.stats.length; s++) {
            console.log("STAT:", datos.stats[s].stat.name, datos.stats[s].base_stat);
        }

        for (let a = 0; a < datos.abilities.length; a++) {
            if (datos.abilities[a].is_hidden == true) {
                console.log("HABILIDAD:", datos.abilities[a].ability.name, "(oculta)");
            } else {
                console.log("HABILIDAD:", datos.abilities[a].ability.name);
            }
        }
        console.log("**********************************");
    }
}

//Parte IV
//Comparar stats de pokemones
//Función auxiliar
function obtenerStat(datos, nombreStat) {
    if (datos == null) {
        console.log("No se puede obtener el stat");
    } else {
        for (let s = 0; s < datos.stats.length; s++) {
            if (datos.stats[s].stat.name === nombreStat) {
                console.log("Valor de", nombreStat, "de", datos.name, ":", datos.stats[s].base_stat);
                return datos.stats[s].base_stat;
            }
        }
    }

    return null;
}

//Función Principal
async function compararPokemon(nombre1, nombre2, stat) {
    let infoPokemon1 = await buscarPokemon(nombre1);
    let infoPokemon2 = await buscarPokemon(nombre2);
    if (infoPokemon1 == null || infoPokemon2 == null) {
        console.log("No se puede comparar, alguno de los pokemones no existe");
        return null;
    } else {
        let statPokemon1 = obtenerStat(infoPokemon1, stat);
        let statPokemon2 = obtenerStat(infoPokemon2, stat);
        if (statPokemon1 == null || statPokemon2 == null) {
            console.log("No se obtuvo el valor de algún stat, las stats válidas son:");
            for (let s = 0; s < infoPokemon1.stats.length; s++) {
                console.log(infoPokemon1.stats[s].stat.name);
            }
            return;
        } else {
            if (statPokemon1 > statPokemon2) {
                console.log("¡", infoPokemon1.name, "le gana a", infoPokemon2.name, "!");
            } else if (statPokemon1 == statPokemon2) {
                console.log("¡Es un empate entre", infoPokemon1.name, "y", infoPokemon2.name, "!");
            } else {
                console.log("¡", infoPokemon2.name, "le gana a", infoPokemon1.name, "!");
            }
        }

    }
}

//Parte V
//Pokemón más fuerte
async function pokemonMasFuerte(listaNombres,stat){
    let mejorNombre="";
    let mejorValor=-1;
    let valorStat;
    let infoPokemon;
    for (let l=0;l<listaNombres.length;l++){
        infoPokemon= await buscarPokemon(listaNombres[l]);
        if(infoPokemon==null){
            continue;
        }
        //console.log(infoPokemon);
        valorStat=obtenerStat(infoPokemon,stat);
        if(valorStat==null){
            continue;
        }else if(mejorValor<valorStat){
            mejorValor=valorStat;
            mejorNombre=infoPokemon.name;
        }
    }
    if(mejorNombre==""){
        console.log("No hay ganador");
        return;
    }else{
        let ganador= await buscarPokemon(mejorNombre);
        console.log("¡El ganador es",mejorNombre,"!");
        mostrarFicha(ganador);
        return mejorNombre;
    }
}

async function menu(){
    let nombre;
    let infoPokemon;
    let stat;
    let respuesta;
    console.log("****************POKEDEX*****************");
    console.log("\n1.Buscar un Pokemon",
        "\n2.Mostrar Ficha de un Pokemon",
        "\n3.Comparar la stat de dos pokemones específicos",
        "\n4.Buscar en una lista cuál pokemon es más fuerte en un stat específico"
    )
    respuesta = prompt("Respuesta:");
    if(respuesta==1){
        nombre=prompt("Nombre del pokemon: ");
        infoPokemon=await buscarPokemon(nombre);
    }else if(respuesta==2){
        nombre=prompt("Nombre del pokemon:");
        infoPokemon=await buscarPokemon(nombre);
        mostrarFicha(infoPokemon);
    }else if(respuesta==3){
        let nombre1=prompt("Nombre del primer pokemon: ");
        let nombre2=prompt("Nombre del segundo pokemon: ");
        stat=prompt("Stat a comparar:");
        compararPokemon(nombre1,nombre2,stat);
    }else if(respuesta==4){
        let arreglo=[];
        for(let l=0;l<6;l++){
            console.log("Nombre #",l+1)
            nombre=prompt();
            arreglo.push(nombre);
        }
        stat=prompt("Stat a comparar:");
        pokemonMasFuerte(arreglo,stat);
    }else{
        console.log("El valor no es válido");
    }
}

menu();

//Estructura llamado a buscarPokemon
//let infoPokemon1 = await buscarPokemon("snorlax");

//Estructura llamado para mostrar ficha
//mostrarFicha(infoPokemon1);

//Estructura llamado para comparar pokemones
//compararPokemon("snorlax", "macham", "defense");

//Estructura llamado para elegir pokemon más fuerte
//pokemonMasFuerte(["pikachu","charizard","Bulbasaur","Squirtle","Lucario","Gengar"],"defense");


