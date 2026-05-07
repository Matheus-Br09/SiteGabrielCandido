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