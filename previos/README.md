# El Picoteo .SL

## Indice
---
## 1. Modelo de datos J.S.O.N

- Modelo basico de datos en formato 'clave-valor'

    Para este caso, configuraremos una base de datos no relacional mediante archivos en formato de subconjunto de objetos clave-valor de javascrit, o **J.S.O.N** (Javascript Object Notation).

    La estructura de este tipo de archivo, como hemos mencionado anteriormente, precisa de una estructura sencilla basada en el par 'clave-valor'. Esta estructura precisa de los nombres identificativos ('claves'), los cuales poseeran asignaciones de una gran variedad de tipos de datos asociados a los mismos ('valores').

    Los tipos de datos disponibles con JSON son:

    - 'Números': Se permiten números negativos y opcionalmente pueden contener parte fraccional separada por puntos. 

    - 'Cadenas': Representan secuencias de cero o más caracteres. Se ponen entre doble comilla y se permiten cadenas de escape.

    - 'Booleanos': Representan valores booleanos y pueden tener dos valores: true y false.

    - 'Null': Representan el valor nulo.

    - 'Array': Representa una lista ordenada de cero o más valores los cuales pueden ser de cualquier tipo. Los valores se separan por comas y el vector se mete entre corchetes.

    - 'Objetos': Son colecciones no ordenadas de pares de la forma <nombre>:<valor> separados por comas y puestas entre llaves. El nombre tiene que ser una cadena entre comillas dobles. El valor puede ser de cualquier tipo. 

    **[FUENTE: WIKIPEDIA](https://es.wikipedia.org/wiki/JSON)**

    A continuacion podemos obervar un ejemplo que reuna todos los casos anteriormente mencionados para la creacion de un objeto en formato JSON:

    ```
    {
        "id":"25ffe321-f1b0-4638-a61b-5c64b1bfb6b3", 
        "name":"John Doe jr.",
        "age": 49,
        "isHired": true,
        "favorite_food": ["Icecream", "Jam", "Potato chips", "pasta"],
        "parents": 
        {
            {
                "id":"840b8b43-ef5d-49a3-9c44-45d08c005620", 
                "name":"John Doe",
                "age": 88,
                "isHired": false,
                "favorite_food": ["Salad", "Jam", "", "pasta"],
            },
            {
                "id":"f057de41-5675-408a-9305-583722220709", 
                "name":"Mary Goodweather",
                "age": 89,
                "isHired": false,
                "favorite_food": ["Sandwitch", "Ham", "Potato chips", "pasta"],
            }
        }
    }
    ```

    Podemos observar que el objeto que hace referencia al modelo de un usuario contiene una serie de campos de todo tipo los cuales hacen referencia a los datos o valores de dicho usuario. Notese que este formato  permite la isnercion de objetos dentro de objetos siempre y cuando se siga la estructura de enlazarloa una clave propia.


---
## 2. Instalacion y configuracion

A continuacion procedemos a describir las tencologias utilizadas para instalar, gestionar  y manipular tanto el contenido como las mismas bases de datos del siquiente proyecto. A la hora de tramitar archivos JSON, haremos uso de una cliente modelo de base de datos no relacional que admita este formato. En este caso hacemos uso de [MongoDB](https://www.mongodb.com/).

Este cliente,en lugar de guardar la informacion en tablas como otros modelos, guarda la informacion en estructuras similares al formato JSON ([BSON](https://es.wikipedia.org/wiki/BSON)). Para este proyecto haremos uso de las siguienes herramientas en nuestro equipo, asi como su posterior configuracion:

- [MongoDB Community Server](https://www.mongodb.com/try/download/community-kubernetes-operator)

    Cliente de MongoDB para integrar de forma local distintas bases de datos y colecciones en un equipo haciendo uso de un puerto a definir por el usuario(Por defecto se asigna el puerto **27017**). A la hora de realizar la instalacion en el sistema podemos localizar el directorio en la siguiente ruta: **C:\Program Files\MongoDB\Server\6.0\bin**

- [MongoDB Shell](https://www.mongodb.com/try/download/shell)

    Herramienta de terminal para la insercion de comandos de MongoDB. Habiendo descargado el zip con el archivo ejecutable, debemos copiar y pegar dicho arcivo en el directorio anteriormente mencionado en el punto anterior. Adicionalmente deberemos crear el siguiente conjunto de carpetas para almacenar los datos de nuestro proyecto: **C:\data\db**.
    

- [MongoDB Compass](https://www.mongodb.com/try/download/compass)

    Herramienta grafica para la manipulacion de datos de Mongo. Usado como alternativa a MongoDB Shell.

---
## 3. Comandos basicos MongoDB

A continuacion nos disponemos a mostrar los [comandos basicos](https://www.mongodb.com/developer/products/mongodb/cheat-sheet/) para interactuar con nuestras colecciones:

- Mostrar todas las bases de datos creadas:
    ```
    show dbs
    ```

- Seleccionar una base de datos determinada:
    ```
    use <database_name>
    ```

- Mostrar colecciones dentro de la base de datos
    ```
    show collections
    ```
- Eliminar una coleccion
    ```
    db.coll.drop()   
    db.dropDatabase()
    ```
- Creacion de coleccion mediante esquema json
    ```
    db.createCollection("contacts", {
        validator: {$jsonSchema: {
            bsonType: "object",
            required: ["phone"],
            properties: {
                phone: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                email: {
                    bsonType: "string",
                    pattern: "@mongodb\.com$",
                    description: "must be a string and match the regular expression pattern"
                },
                status: {
                    enum: [ "Unknown", "Incomplete" ],
                    description: "can only be one of the enum values"
                }
            }
        }}
    })
    ```


- Comandos de Coleccion

    - Crear coleccion insertando contenido
        ```
        db.coll.insertOne({test:"test"});
        db.coll.insert([{name: "Max"}, {name:"Alex"}]) 
        db.coll.insert([{name: "Max"}, {name:"Alex"}], {ordered: false})
        ```

    - Lectura de datos
        ```
        db.coll.findOne() 
        db.coll.find()    
        db.coll.find().pretty()

        db.coll.find({name: "Max", age: 32}) // internamente asociado un  "AND" logico 
        ```
    - Conteo
        ```
        db.coll.count({age: 32})          // estimacion basada en los metadatos de la coleccion
        db.coll.estimatedDocumentCount()  
        db.coll.countDocuments({age: 32}) 
        ```
    - Comparaciones
        ```
        db.coll.find({"year": {$gt: 1970}}) // selecciona los datos cuyo valor sea mayor que el dato introducido ( > )
        db.coll.find({"year": {$gte: 1970}}) // selecciona los datos cuyo valor sea mayor o igual que el dato introducido ( >= )
        db.coll.find({"year": {$lt: 1970}}) // selecciona los datos cuyo valor sea menor que el dato introducido ( < )
        db.coll.find({"year": {$lte: 1970}}) // selecciona los datos cuyo valor sea menor o igual que el dato introducido ( <= )
        db.coll.find({"year": {$ne: 1970}}) // selecciona los datos cuyo valor no sea igual que el dato introducido ( != )
        db.coll.find({"year": {$in: [1958, 1959]}}) // selecciona todo aquel dato cuyo valor se encuentre en el conjunto de datos
        db.coll.find({"year": {$nin: [1958, 1959]}}) // selecciona todo aquel dato cuyo valor no se encuentre en el conjunto de datos
        ```
    - Valores Logicos
        ```
        db.coll.find({name:{$not: {$eq: "Max"}}})
        db.coll.find({$or: [{"year" : 1958}, {"year" : 1959}]})
        db.coll.find({$nor: [{price: 1.99}, {sale: true}]})
        db.coll.find({
        $and: [
            {$or: [{qty: {$lt :10}}, {qty :{$gt: 50}}]},
            {$or: [{sale: true}, {price: {$lt: 5 }}]}
        ]
        })
        ```
    - Actualizacion de datos
        ```
        db.coll.update({"_id": 1}, {"year": 2016}) // WARNING! Replaces the entire document
        db.coll.update({"_id": 1}, {$set: {"year": 2016, name: "Max"}})
        db.coll.update({"_id": 1}, {$unset: {"year": 1}})
        db.coll.update({"_id": 1}, {$rename: {"year": "date"} })
        db.coll.update({"_id": 1}, {$inc: {"year": 5}})
        db.coll.update({"_id": 1}, {$mul: {price: NumberDecimal("1.25"), qty: 2}})
        db.coll.update({"_id": 1}, {$min: {"imdb": 5}})
        db.coll.update({"_id": 1}, {$max: {"imdb": 8}})
        db.coll.update({"_id": 1}, {$currentDate: {"lastModified": true}})
        db.coll.update({"_id": 1}, {$currentDate: {"lastModified": {$type: "timestamp"}}})
        ```

    - Borrado de datos
        ```
        db.coll.remove({name: "Max"})
        db.coll.remove({name: "Max"}, {justOne: true})
        db.coll.remove({}) // WARNING! Deletes all the docs but not the collection itself and its index definitions
        db.coll.remove({name: "Max"}, {"writeConcern": {"w": "majority", "wtimeout": 5000}})
        db.coll.findOneAndDelete({"name": "Max"})
        ```
## 4. Creacion Entorno Node.js

Habiendo instalado y configurado el entorno propicio para nuestras bases de datos, debemos centrarnos en la creacion del entorno que servira de servidor web para operar con dichas bases. Para este caso, haremos uso de **Node.js**, entorno de javascript para lacapa de servidor. 

En este proyecto haremos uso de dicha tecnologia adaptada para [Typescript](https://www.typescriptlang.org/) siendo este lenguaje un superconjunto de javascript creado por Microsoft, el cual añade tipos estáticos y objetos basados en clases.

