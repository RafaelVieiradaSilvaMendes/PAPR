function openForm() {
    document.getElementById("myForm").style.display = "blur(6px)";
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("body").style.filter = "blur(0px)";
}

document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".form-container");
    const inputNome_completo = document.querySelector("#nome_completo");
    const inputEmail = document.querySelector("#email");
    const inputTelefone = document.querySelector("#telefone")
    const inputMorada = document.querySelector("#morada")
    const inputdata_de_nascimento = document.querySelector("#data_de_nascimento")
    const inputcartão_de_cidadão = document.querySelector("#cartão_de_cidadão")
    const inputContribuinte = document.querySelector("#contribuinte")
    const inputAno = document.querySelector("#ano")
    const inputCurso = document.querySelector("#id_curso")
    const inputHabilitações = document.querySelector("#habilitações")
    const status = "pendente"
    const alert = document.querySelector(".alert")

    function SendCand(nome_completo, email, telefone, morada, data_de_nascimento, cartão_de_cidadão, contribuinte, ano, id_curso, habilitações) {
        console.log(nome_completo, email, telefone, morada, data_de_nascimento, cartão_de_cidadão, contribuinte, ano, id_curso, habilitações)

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
            nome_completo: nome_completo,
            email: email,
            telefone: telefone,
            morada: morada,
            data_de_nascimento: data_de_nascimento,
            cartão_de_cidadão: cartão_de_cidadão,
            contribuinte: contribuinte,
            ano: ano,
            id_curso: id_curso,
            habilitações: habilitações,
            status: status,
            hora: FinalDate, 
        };

        fetch('http://localhost:3000/api/inscrever', {
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

        const nome_completo = inputNome_completo.value;
        const email = inputEmail.value;
        const telefone = inputTelefone.value;
        const morada = inputMorada.value;
        const data_de_nascimento = inputdata_de_nascimento.value;
        const cartão_de_cidadão = inputcartão_de_cidadão.value;
        const contribuinte = inputContribuinte.value;
        const ano = inputAno.value;
        const id_curso = inputCurso.value;
        const habilitações = inputHabilitações.value;

        SendCand(nome_completo, email, telefone, morada, data_de_nascimento, cartão_de_cidadão, contribuinte, ano, id_curso, habilitações)
    });
})

function closeNotification() {
    document.querySelector("#success-box").style.display = "none";
    document.querySelector("#error-box").style.display = "none";
}