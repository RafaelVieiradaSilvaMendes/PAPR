function openForm1() {
    document.getElementById("body").style.filter = "blur(6px)";
    document.getElementById("myForm").style.display = "block";
}

function closeForm1() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("body").style.filter = "blur(0px)";
}

document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".form-container");
    const inputEmail = document.querySelector("#email");
    const inputNome = document.querySelector("#nome");
    const inputDOB = document.querySelector("#dob")
    const status = "pendente"
    const alert = document.querySelector(".alert")

    function SendCand(email, nome, dob) {
        console.log(email, nome, dob)

        const dados = {
            nome: nome,
            email: email,
            dob: dob,
            status: status,
        };

        fetch('http://localhost:3000/api/enviar-dados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
        })
        .then(response => response.json())
        .then(data => {
            console.log(`Resposta do servidor: ${data.mensagem}`);
            document.querySelector("#success-box").style.display = "block";
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
            document.querySelector("error-box").style.display = "block";
        });
        
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = inputEmail.value;
        const nome = inputNome.value;
        const dob = inputDOB.value;

        SendCand(email, nome, dob)
    });
})

function closeNotification() {
    document.querySelector("#success-box").style.display = "none";
    document.querySelector("#error-box").style.display = "none";
}