window.addEventListener('load', ()=>{
    const form = document.getElementById('formulario');
    const identificacion = document.getElementById('identificacion');
    const nombre = document.getElementById('nombre');
    const nota1 = document.getElementById('nota1');
    const nota2 = document.getElementById('nota2');

    form.addEventListener('submit', (e) =>{
        e.preventDefault();
        validarCampos();
        operacionAsincronica();
    })

    form.addEventListener('reset',(e) =>{
        e.preventDefault();
        limpiarCampos();
    })

    const limpiarCampos = ()=>{
        identificacion.value = "";
        nombre.value = "";
        nota1.value = "";
        nota2.value = "";
    }

    const validarCampos = ()=>{
        //Capturar los valores por el usuario
        const identificacionValor = identificacion.value.trim();
        const nombreValor = nombre.value.trim();
        const nota1Valor = nota1.value.trim();
        const nota2Valor = nota2.value.trim();

        //validando campo identificacion
        if(!identificacionValor){
            validacionFalla(identificacion, 'Identifiacion Obligatoria')
        }else{
            validacionOk(identificacion)
        }
        //validando campo nombre
        if(!nombreValor){
            validacionFalla(nombre, 'Nombre Obligatorio')
        }else{
            validacionOk(nombre)
        }

        //validando campo nota1
        if(!nota1Valor){
            validacionFalla(nota1, 'Nota 1 Obligatoria')
        }else if(isNaN(nota1Valor)){
            validacionFalla(nota1, 'Ingrese solo numeros')
        }else if(nota1Valor < 0 || nota1Valor > 5){
            validacionFalla(nota1,'Digite numero entre 0 y 5')
        } else{
            validacionOk(nota1)
        }

        //validando campo nota2
        if(!nota2Valor){
            validacionFalla(nota2, 'Nota 2 Obligatoria')
        }else if(isNaN(nota2Valor)){
            validacionFalla(nota2,'Ingrese solo numero')
        }else if(nota2Valor <0 || nota2Valor > 5){
            validacionFalla(nota2,'Digite numero entre 0 y 5')
        }else{
            validacionOk(nota2)
        }  
    }
    const validacionFalla = (input, mensaje) => {
        const formControl = input.parentElement;
        const aviso = formControl.querySelector('p');
        aviso.innerText = mensaje;
        formControl.className = 'form-control error';
    }

    const validacionOk = (input, mensaje) => {
        const formControl = input.parentElement;
        formControl.className = 'form-control ok';
    }

    const operacionAsincronica = () => {
        return setTimeout(() => {
            const numero1 = parseFloat(nota1.value.trim());
            const numero2 = parseFloat(nota2.value.trim());
            const resultado = ((numero1 + numero2) / 2).toFixed(1); 

            const definitiva = document.createElement('h4');
            definitiva.textContent = 'Definitiva: ';
            const nota = document.createElement('p');
            nota.textContent = resultado;
            const comentario = document.createElement('h4')
            comentario.textContent = 'Observacion: '
            const observacion = document.createElement('h4');
            if(resultado >=3 && resultado <= 3.4){
                observacion.textContent = 'Habilita'
            }
            else if(resultado >= 3.5){
                observacion.textContent = 'Gana'
            }
            else{
             observacion.textContent = 'Pierde'
            }

            form.appendChild(definitiva);
            form.appendChild(nota);
            form.appendChild(comentario);
            form.appendChild(observacion);
        }, 2000);
    }


})

