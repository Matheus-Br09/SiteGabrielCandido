const modal = document.getElementById("modal")
const abrir = document.getElementById("abrirModal")
const fechar = document.getElementById("fecharModal")

abrir.addEventListener('click', () => {
    modal.style.transition = "0.3s ease";
    modal.showModal();
})

fechar.addEventListener('click', () => {
    modal.style.transition = "0.3s ease"
    modal.close();
})

let idAtual = null;

function abrirEditarModal(id, tarefa_atual, urgency_atual) {

    idAtual = id;

    document.getElementById("edit_task").value = tarefa_atual;

    const radios = document.querySelectorAll('input[name="edit_categoria"]')

    radios.forEach(radio => {

        radio.checked =
            radio.value === urgency_atual

    })

    editarModal.showModal();
}

function add_tarefa() {
    const tarefa = document.getElementById('task').value.trim();
    const radioSelecionado = document.querySelector('input[name="categoria"]:checked').value;

    fetch('./database/add_tarefa.php', {
        method: "POST",
        headers: { 'Content-type': "application/x-www-form-urlencoded" },
        body: `task=${encodeURIComponent(tarefa)}&categoria=${encodeURIComponent(radioSelecionado)}`
    })
        .then(response => response.text())
        .catch(error => console.log('Erro: ', error))

    location.reload();
}

function editar_tarefa() {

    const nova_tarefa = document.getElementById("edit_task").value.trim()

    const nova_urgency = document.querySelector('input[name="edit_categoria"]:checked').value

    if (!nova_urgency) {
        alert("Selecione uma categoria");
        return;
    }

    fetch("./database/editar_tarefa.php", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id_task=${idAtual}&task=${encodeURIComponent(nova_tarefa)}&urgency_level=${encodeURIComponent(nova_urgency)}
            `
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            location.reload();
        })
}

document.addEventListener("click", function (event) {
    const menus =
        document.querySelectorAll(".menu-opcoes");

    const botoes =
        document.querySelectorAll(".menu-btn");

    let clicouNoBotao = false;

    botoes.forEach(botao => {

        if (botao.contains(event.target)) {

            clicouNoBotao = true;

        }

    });

    if (!clicouNoBotao) {

        menus.forEach(menu => {

            menu.style.display = "none";

        });

    }

});

function toggleMenu(botao) {
    const menu = botao.nextElementSibling;

    document.querySelectorAll(".menu-opcoes").forEach(item => {
        if (item !== menu) {
            item.style.display = "none";
        }
    })

    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex"
    }
}


function buscarTarefa() {
    fetch("./database/mostrar_tarefas.php")
        .then(response => response.json())
        .then(dados => {
            const cards = document.getElementById("cards")
            const button = document.createElement("button")

            cards.innerHTML = "";

            dados.forEach(item => {

                cards.innerHTML += `<div id="card">

            <button class="menu-btn" onclick="toggleMenu(this)">
                ⋮
            </button>

            <div class="menu-opcoes">
                <button 
                    id="exclude"
                    onclick="excluir_tarefa(${item.id_task})"
                >

                    &#x1F5D1 Excluir Tarefa

                </button>

                <button onclick='abrirEditarModal(${item.id_task},
                ${JSON.stringify(item.task)},
                ${JSON.stringify(item.urgency_level)})'>

                    Editar Tarefa

                </button>
            </div>

                <h3 class="tarefa-display">${item.task}</h3> 

                <br>

                <h3 id="category">
                   Categoria: ${item.urgency_level}
                </h3>

                <br>
            
        </div>
            `

            });
        })
        .catch(error => { console.error("Erro: ", error) })


}

const form = document.getElementById("form")

form.addEventListener("keyup", (event) => {


    pesquisar_tarefas();
    event.preventDefault();
})

function pesquisar_tarefas() {
    let texto_pesquisado = document.getElementById("pesquisa_tarefa").value.trim().toLowerCase();

    let cards = document.querySelectorAll("#card")

    cards.forEach(item => {
        let titulo = item.querySelector("h3").innerHTML.toLowerCase();

        if (titulo.startsWith(texto_pesquisado)) {
            item.style.display = "block"
        } else {
            item.style.display = "none";
        }
    })

}

const editarModal = document.getElementById("editarModal");
const abrirEditModal = document.getElementById("abrirEditarModal");
const fecharEditarModal = document.getElementById("fecharEditarModal");

fecharEditarModal.addEventListener('click', () => {
    editarModal.style.transition = "0.3 ease";
    editarModal.close();
})

function excluir_tarefa(id) {
    if (!confirm("Tem certeza que quer excluir? ")) return;

    fetch("./database/excluir_tarefa.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id=${id}`
    })
        .then(response => response.text())
        .then(data => {
            location.reload()
        })
}

buscarTarefa()