const formulario = document.querySelector('#formulario');
const cardHolderName = document.querySelector('#cardHolderName');
const cardNumber = document.querySelector('#CardNumber');
const cvc = document.querySelector('#cvc');
const selectArr = document.querySelectorAll('select');
const inputArr = document.querySelectorAll('input');
const inputYSelectArr = [...selectArr, ...inputArr];
const ultimaRespuesta = document.querySelector('#ultima-respuesta');

const cardHolderNameImg = document.querySelector('#card-holder-name-img');
const cardNumberImg = document.querySelector('#card-number-img');
const ExpDateMonth = document.querySelector('#ExpDateMonth');
const ExpDateYear = document.querySelector('#ExpDateYear');
const cardCvcImg = document.querySelector('#card-cvc-img');

let detectarNumeros = /\d/
let detectarLetras = /[a-zA-Z]+/;

function validarCardHolderName(input, e) {
    if (input.value == '' || detectarNumeros.test(input.value) ) {
        input.classList.add('is-invalid');
        e.stopPropagation();
        e.preventDefault();
        input.classList.remove('is-valid')
        input.classList.add('is-invalid');
    }else{input.classList.remove('is-invalid');
        input.classList.add('is-valid')};
};

function validarCardNumber(input, e) {
    if (detectarLetras.test(input.value) || input.value.length !== 20) {
        e.stopPropagation();
        e.preventDefault();
        input.classList.remove('is-valid')
        input.classList.add('is-invalid');
    }else{input.classList.remove('is-invalid')
        input.classList.add('is-valid')
    };
};

function validarOptions(select, e) {
    select.forEach(select => {
        if (select.value === '') {
            e.stopPropagation();
            e.preventDefault();
            select.classList.remove('is-valid');
            select.classList.add('is-invalid');
        }else{select.classList.remove('is-invalid')
            select.classList.add('is-valid');};
    });
};

function validarCvc(input, e) {
    if (detectarLetras.test(input.value) || input.value.length !== 3) {
        e.stopPropagation();
        e.preventDefault();
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }else{input.classList.remove('is-invalid');
        input.classList.add('is-valid');};
};



function aprobarFormulario(e) {
    validarCardHolderName(cardHolderName, e);

    validarCardNumber(cardNumber, e);

    validarOptions(selectArr, e);

    validarCvc(cvc, e);
    if (!inputYSelectArr.some(elem => elem.classList.contains('is-invalid'))) {
        formulario.classList.add('d-none');
        ultimaRespuesta.classList.remove('d-none');
        e.stopPropagation();
        e.preventDefault();
    };
};

function mostrarNombreTarjeta() {

    cardHolderNameImg.textContent = cardHolderName.value;
};


function mostrarNumeroTarjeta() {
    cardNumber.value = cardNumber.value.replace(/\D/g, "");
    cardNumber.value = cardNumber.value.replace(/(\d{4})/g, "$1 ");
    cardNumberImg.textContent = cardNumber.value;
};

function mostrarMesVencimientoTarjeta() {
    ExpDateMonth.textContent = selectArr[0].value;
};

function mostrarAñoVencimientoTarjeta() {
    ExpDateYear.textContent = selectArr[1].value;
};

function mostrarCvcTarjeta() {
    cardCvcImg.textContent = cvc.value;
};

formulario.addEventListener('submit', (e) => {

    validarCardHolderName(cardHolderName, e);

    validarCardNumber(cardNumber, e);

    validarOptions(selectArr, e);

    validarCvc(cvc, e);

    // Tengo que usar un callback y si no me anda probar una funcion asincrona
    aprobarFormulario(e);
});

ultimaRespuesta.addEventListener('click', () =>{
    window.location.reload();
});