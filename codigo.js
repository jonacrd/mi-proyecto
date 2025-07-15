const obtenerInformacion = (materia)=> {
    materias = {
        fisica: ["perez","pedro","pepito","cofla","maria"],
        programacion: ["dalto","pedro","juan","pepito"],
            logica: ["Hernandez","pedro","juan","pepito","cofla","maria"],
            quimica: ["Rodriguez","pedro","juan","pepito","cofla","maria"]
    }


    if (materias[materia] !== undefined) {
        return [materias[materia],materia];
    }
    else {return materias;
    }
} 

const mostrarInformacion = (materia)=> {
let informacion = obtenerInformacion(materia);
if (informacion !== false) {
let profesor = obtenerInformacion(materia)[0][0];
let alumnos = obtenerInformacion(materia)[0];
alumnos.shift();
document.write(`El profesor de <b>${informacion[1]}<b> es: <b style="color:white">${profesor}<b><br><br>
    los alumnos son: ${alumnos}`);
}
}
mostrarInformacion("fisica")

const listaMaterias = (alumno, materia)=> {
    let informacion = obtenerInformacion(materia); // usamos correctamente el parámetro
    let alumnos = informacion[0].slice(); // copia segura del array
    alumnos.shift(); // quitamos el profesor

    if (alumnos.length >= 20) {
        document.write(`No se puede inscribir ${alumno}, clase llena.<br><br>`);
    } else {
        alumnos.push(alumno); // agregamos alumno
        document.write(`<br>Se inscribió ${alumno} en ${materia}.<br>Lista actual: <b>${alumnos}</b><br><br>`);
    }
}
listaMaterias("pedrito", "fisica");