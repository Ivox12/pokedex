
let current = 1
async function get_poke() {
    dex_txt.innerHTML = ``;
    rodape.innerHTML = ``;
    poketao.innerHTML = ``;
    let pokedex = document.getElementById("pokedex_bd")
    let limit = current + 20;
    if (limit > 151)
        limit = 151;
    for (let id = current; id <= limit; id++) {

        await fetch('https://pokeapi.co/api/v2/pokemon/' + id)
            .then(response => response.json())
            .then(function (get_poke) {

                pokedex.innerHTML +=
                    `<div class="poke_card" data-url="${'https://pokeapi.co/api/v2/pokemon-species/' + id}">
                    <div class="poke_top">
                        <h1 class="poke_id">#${get_poke.id}</h1>
                        <h1 class="poke_name">${get_poke.name}</h1>
                    </div>
                    <div class="poke_photo"> 
                        <img class="poke_view" src="${get_poke.sprites.other["official-artwork"].front_default}"\> 
                    </div>
                    <div class="poke_tipo">
                        ${get_poketype(get_poke)}
                    </div> 
                </div>`
                listenerClickPoke()
            })
    }
    current += 21
    if (current > 151)
        current = 151;

    more_poke()

}
function get_poketype(get_poke) {

    let tagsRow = []

    let poke_type = get_poke.types.map(item => " " + item.type.name)

    poke_type.forEach(typeElement => {

        let type_html =
            `<div class="${typeElement}">
                <p>${typeElement}</p>
            </div>`

        tagsRow.push(type_html);

    })

    return tagsRow.join(['']);
}
function more_poke() {
    let poke_more = document.getElementById("poke_more")
    if (current == 151) {
        poke_more.style.display = "none"
    }
    else {
        poke_more.innerHTML =
            `<div class="btn_poke">
                <button id="btn_poke" onclick="get_poke()">+poke</button>
            </div>`
    }
}
const listenerClickPoke = () => {
    const pokes = document.querySelectorAll(".poke_card")
    pokes.forEach(poke => poke.addEventListener("click", get_flavor))
}

function get_flavor(event) {
    const target = event.currentTarget
    const poke_flavor = target.getAttribute("data-url")
    let detail_div = document.getElementById("poke_detail")

    fetch(poke_flavor)
        .then(response => response.json())
        .then(function (get_flavor) {

            detail_div.style.display = "block"

            detail_div.innerHTML =
                `<div class="poke_card_det">
                <img src="img/UnownX.png" title="Close" id="close" onclick="close_det()"></img>
                <div class="poke_top_det">
                    <h1 class="poke_id_det">#${get_flavor.id}</h1>
                    <h1 class="poke_name_det">${get_flavor.name}</h1>
                </div>
                <div id="poke_photo">  
                </div>
                <div id="details">
                </div>
                <div class="details_flavor">
                    <p>${get_flavor.flavor_text_entries[1].flavor_text}</p>
                </div>
            </div>`
            get_poke_det(get_flavor)
        })
}
async function get_poke_det(get_flavor) {
    let poke_det = document.getElementById("details")
    let poke_foto = document.getElementById("poke_photo")

    let dex_bd = document.getElementById("pokedex_bd")
    dex_bd.style.filter = "blur(10px)"

    await fetch('https://pokeapi.co/api/v2/pokemon/' + get_flavor.id)
        .then(response => response.json())
        .then(function (get_poke) {

            poke_foto.innerHTML = `<img class="poke_view" src="${get_poke.sprites.other["official-artwork"].front_default}"\>`

            poke_det.innerHTML = `
            <p>Height: ${get_poke.height}</p>
            <p>Weight: ${get_poke.weight}</p>
            <p>Habitat: ${get_flavor.habitat.name}</p>
            <div class="poke_tipo">
                ${get_poketype(get_poke)}
            </div>`
        })
}

function close_det() {
    let close_window = document.getElementById("poke_detail")
    let dex_bd = document.getElementById("pokedex_bd")

    dex_bd.style.filter = "blur(0px)"

    close_window.innerHTML = ``
}
