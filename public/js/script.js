async function atualizarTime() {
    try {
        const response = await fetch("/horario-atual");

        if (!response.ok) {
            throw new Error("Falha ao obter o horário atual");
        }

        const data = await response.json();

        const campoTime = document.querySelector('input[name="arrivalTime"]');

        if (campoTime && data.horarioAtual) {
            campoTime.value = data.horarioAtual;
        }
    } catch (error) {
        console.error("Erro ao buscar horário atual:", error);
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
