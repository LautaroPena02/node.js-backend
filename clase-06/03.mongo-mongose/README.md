# Base de datos MONGO

Son bases de datos no relacionales (mal llamadas SQL) a bases de datos que no usan tablas relacionales con claves foraneas. Sirven para resolver problemas del modelo relacional cuando se manejan grandes volumenes de datos, estructuras cambiantes y velocidad.

En lugar de tablas, usan otros modelos de datos 

* Documentos (Mongo) -> JSON/BSON
* Clave-Valor (Redis)
* Columnas 
* Grafos


## Diferencias entre Relacionales y no relacionales (maneras de persistencia de datos)

Relacionales. (Fija|Schema) 
(Explicitas FK, JOIN)
Escalabilidad -> Vertical (principalmente)
Cambio de estructura -> Costoso y lento
Control de datos -> Estricto


No Relacionales. (Flexibles o inexistente |Schemaless)
(Implicitas o manuales)
Escalabilidad -> Horizontal (nativa)
Cambio de la estructura -> Rapido y sencillo
Control de datos -> Mas laxo (Gestionable)


documento = {
    "nombre": "Lautaro",
    "apellido": "Pena",
}

documento = {
    "nombre": "Lautaro",
    "apellido": "Pena",
}

documento = {
    "nombre": "Lautaro",
    "apellido": "Pena",
}

// Nuevos
documento = {
    "nombre": "Lautaro",
    "apellido": "Pena",
    "edad": 25
}

// Nuevos
documento = {
    "nombre": "Lautaro",
    "apellido": "Pena",
    "edad": 25
    "activo": true
}