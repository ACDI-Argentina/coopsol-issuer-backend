# Coopsol Issuer Backend

Backend para la gestión de productores, usuarios y emisión automática de credenciales del proyecto [Identidad Digital](https://github.com/ACDI-Argentina/identidad-digital).

## Cómo ejecutar este repositorio

1. Instalar dependencias  
 `npm install`
 
2. Establecer variables de entorno necesarias en el archivo .env
````
MONGO_URI
ISSUER_URI
JWT_SECRET
DIDI_USER
DIDI_PASSWORD
````

3. Iniciar el proceso  
`npm start`


También este componente se encuentra disponible en [Docker Hub](https://hub.docker.com/repository/docker/didicoopsol/issuer-backend)
