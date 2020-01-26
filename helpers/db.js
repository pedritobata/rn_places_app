import * as  SQLite from 'expo-sqlite';

//SQLite crea una database places si aun no existiera
const db = SQLite.openDatabase("places.db");

export const init = () => {
    //Hacemos que esta funcion init devuelva una promesa para ejecutar la logica de crear la tabla places
    const promise = new Promise((resolve, reject) => {
        //una transaction es una operacion sobre la base de datos que agrupa varios querys
        //Y si uno falla , se hace rollback de todo!!
        db.transaction(tx => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS places(
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
            );`,
            [],//en este argumento se puede mandar argumentos dinamicos a insertar en el query
            () => {//success calback
                resolve();
            },
            (_, err) => {//failure callback. el primer argumento es el query que se creó arriba
                //pero como no nos interesa, le ponemos underscore
                reject(err);
            });
        });
    });

    return promise;
    
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`INSERT INTO places (title, imageUri, address, lat, lng) 
            values (?,?,?,?,?);`,//usamos placeholders para evitar sql injection
            [title,imageUri,address,lat,lng],
            (_, result) => {// primer argumento es el query, el segundo es el resultado que nos da SQLite
                resolve(result);
            },
            (_, err) => {
                reject(err);
            });
        });
    });

    return promise;
    
};

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM places;`,
            [],
            (_, result) => {
                resolve(result);
            },
            (_, err) => {
                reject(err);
            });
        });
    });

    return promise;
    
}