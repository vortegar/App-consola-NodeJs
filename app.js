require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarDB');
const { inquireMenu,
        pausa, 
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList,
    } = require('./helpers/inquire');

const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

require('colors');
console.clear();


const main = async() => {

    let opt = '';
    const tareas = new Tareas();
    const tareaaDB  = leerDB();

    if ( tareaaDB ) {
        tareas.cargarTareasFromArray( tareaaDB );
    }

    do {
        opt = await inquireMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: ')
                tareas.crearTarea( desc )
                break;
        
            case '2':
                tareas.listadoCompleto();
                break;

            case '3':
                tareas.listarPendientesCompletadas( true );
                break;

            case '4':
                tareas.listarPendientesCompletadas( false );
                break;
            
            case '5':
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                break;
            
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0' ) {
                    const ok = await confirmar('¿Está seguro?');
                    if( ok ) {
                        tareas.borrarTarea( id );
                    }
                    console.log('Tarea borrada');
                }
                break;
        }

        guardarDB( tareas.listadoArr);
        await pausa();

    } while ( opt !== '0');
}


main();