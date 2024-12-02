async function atualizarTime(){
    try {
        const response = await fetch("/horario-atual");
        const data = await response.json();
        const campoTime = document.querySelector('input[name="arrivalTime"]');
        if (campoTime) {
            campoTime.value = data.horarioAtual
            }
        } catch(error) {
            console.error("Erro ao buscar horario atual:", error)
        }
    }

atualizarTime();

setInterval(atualizarTime, 60000);

function linkActive(){

    function setActiveLink() {
        const currentPath = window.location.pathname;

        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.classList.remove('active');

            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }

    window.onload = setActiveLink;

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            setActiveLink();
        });
    });
}

linkActive();

function apagarMensagem(){
const btnDestroy = document.querySelector(".destroy");
const mensagem = document.querySelector(".mensagem");

function destruirH1(){
    mensagem.remove();
}

btnDestroy.addEventListener("click", destruirH1)
}

apagarMensagem()
