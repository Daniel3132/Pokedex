const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.querySelector('#main')

const getPokes  = async (url, inicio, busqueda)=>{
    let pokeArray = [];
    for (let i = inicio; i<=(inicio+20); i++){
        try{
            const res  = await fetch(url+i)
            const data = await res.json()
            pokeArray.push(data)
        }catch (error){
            return console.log(error);
        }
                
    }
    showPokes(pokeArray);
    if(pokeArray.length == 0){
        swal.fire({
            title: 'Error!',
            text: `No se encontro nada referente a ${busqueda} `,
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    }     
}

getPokes(API_URL,1)
 
const showPokes = (Pokes) =>{
    main.innerHTML=``
    Pokes.forEach(Poke => {
        const {name,sprites,types,id, moves,height,weight,base_experience} = Poke
        const PokeDiv = document.createElement('div')
        PokeDiv.classList.add('Poke')
        PokeDiv.innerHTML+=`
        <img src="${sprites.front_default}" alt="">
        <div class="Poke-info">
            <h3>${name}</h3>        
            <span class="green">No.${id}</span>
        </div>
        <p class="type">Type: ${types[0].type.name}</p> 
        <div class="overview">
                <h5 style=color:orange>Moves</h5>
                <lu>
                    <li>${moves[0].move.name}</li>
                    <li>${moves[1]?.move.name}</li>
                    <li>${moves[2]?.move.name}</li>
                    <li>${moves[3]?.move.name}</li>
                </lu>
                <h5 style=color:orange>Base exp.</h5>
                <lu>
                   <li>${base_experience}</li>
                   
                </lu>
                <h5 style=color:orange>Height</h5>
                <lu>
                   <li>${height/10} m</li>
                </lu>
                <h5 style=color:orange>Weight</h5>
                <lu>
                    <li>${weight/10} Kg</li>
                </lu>
        </div>  
        `
        main.appendChild(PokeDiv)
    });
}

form.addEventListener('submit', e => {
    e.preventDefault()

    const searchTerm = search.value.toLocaleLowerCase()
    if (searchTerm && searchTerm !== '') {
        pokeBusqueda(searchTerm)
        search.value = ''
    } else {
        swal.fire({
            title: 'Error!',
            text: 'Debe escribir algo en la barra de busqueda',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }

    async function pokeBusqueda(searchTerm){
        let buscado = []
        try{
            const res = await fetch(API_URL+ searchTerm)
            buscado = [await res.json()]
            showPokes(buscado)
        }catch (error){
            console.log(error);
            swal.fire({
                title: 'Error!',
                text: `No se encontro nada referente a ${searchTerm} `,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }        
    }
})