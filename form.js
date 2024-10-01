function openForm() {
    document.getElementById("body").style.filter = "blur(6px)";
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
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

        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var hours = date.getHours()
        var min = date.getMinutes()
        var seconds = date.getSeconds()

        var FinalDate = (`${day}/${month}/${year} | ${hours}:${min}:${seconds}`)
        console.log(FinalDate)

        const dados = {
            nome: nome,
            email: email,
            dob: dob,
            status: status,
            hora: FinalDate, 
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