function openForm() {
    
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("body").style.filter = "blur(0px)";
}

document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".form-container");
    const inputNome = document.querySelector("#nome");
    const inputEmail = document.querySelector("#email");
    const inputTelefone = document.querySelector("#telefone")
    const inputMorada = document.querySelector("#morada")
    const inputDOB = document.querySelector("#dob")
    const inputCC = document.querySelector("#cc")
    const inputContribuinte = document.querySelector("#contribuinte")
    const inputAno = document.querySelector("#ano")
    const inputCurso = document.querySelector("#curso")
    const inputHabilitações = document.querySelector("#habilitações")
    const status = "pendente"
    const alert = document.querySelector(".alert")

    function SendCand(nome, email, telefone, morada, dob, cc, contribuinte, ano, curso, habilitações) {
        console.log(nome, email, telefone, morada, dob, cc, contribuinte, ano, curso, habilitações)

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
            telefone: telefone,
            morada: morada,
            dob: dob,
            cc: cc,
            contribuinte: contribuinte,
            ano: ano,
            curso: curso,
            habilitações: habilitações,
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

        const nome = inputNome.value;
        const email = inputEmail.value;
        const telefone = inputTelefone.value;
        const morada = inputMorada.value;
        const dob = inputDOB.value;
        const cc = inputCC.value;
        const contribuinte = inputContribuinte.value;
        const ano = inputAno.value;
        const curso = inputCurso.value;
        const habilitações = inputHabilitações.value;

        SendCand(nome, email, telefone, morada, dob, cc, contribuinte, ano, curso, habilitações)
    });
})

function closeNotification() {
    document.querySelector("#success-box").style.display = "none";
    document.querySelector("#error-box").style.display = "none";
}