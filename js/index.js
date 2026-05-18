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

function add_tarefa(){
    const tarefa = document.getElementById('task').value.trim();
    const radioSelecionado = document.querySelector('input[name="categoria"]:checked').value;

    fetch('./database/add_tarefa.php', {
        method: "POST",
        headers: {'Content-type': "application/x-www-form-urlencoded"},
        body: `task=${encodeURIComponent(tarefa)}&categoria=${encodeURIComponent(radioSelecionado)}`
    })
    .then(response => response.text())
    .catch(error => console.log('Erro: ', error))

    location.reload();
}

function editar_tarefa(id, tarefa_atual, urgency_atual){
        
        const nova_tarefa = prompt("Nova tarefa: ", tarefa_atual);

        const nova_urgency = prompt("Nova Categoria (Urgente, Normal, Qualquer momento): ", urgency_atual);

        fetch("./database/editar_tarefa.php", {
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `id_task=${id}&task=${encodeURIComponent(nova_tarefa)}&urgency_level=${encodeURIComponent(nova_urgency)}
            `
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            location.reload();
        })
    }


function buscarTarefa(){
    fetch("./database/mostrar_tarefas.php")
    .then(response => response.json())
    .then(dados => {
        console.log(dados)
        const cards = document.getElementById("cards")
        const button = document.createElement("button")

        cards.innerHTML = "";

        dados.forEach(item => {
            cards.innerHTML += `<div id="card">
        
            <h3>Tarefa: ${item.task}</h3> 

            <br>

            <h3 id="category">
                ${item.urgency_level}
            </h3>

            <br>

            <button 
                id="exclude"
                onclick="excluir_tarefa(${item.id_task})"
            >

                &#x1F5D1 Excluir Tarefa

            </button>

            <button onclick='editar_tarefa(${item.id_task}, ${JSON.stringify(item.task)}, ${JSON.stringify(item.urgency_level)})'>

                Editar Tarefa

            </button>

        </div>
            `
            
        });
    })
    .catch(error => {console.error("Erro: ", error)})

    
}

function excluir_tarefa(id){
    if (!confirm("Tem certeza que quer excluir? ")) return;

    fetch("./database/excluir_tarefa.php",{
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: `id=${id}`
    })
    .then(response => response.text())
    .then(data => {
        console.log(data)
        location.reload()
    })
}

buscarTarefa()