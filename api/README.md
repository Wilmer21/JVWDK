# Requisitos

Este ambiente es para Back, lo cual es necesario que tenga instalado mysql, en este caso se puede usar 
el que nos suministra el XAMPP, lo pueden instalar por aqui

xampp -> https://www.apachefriends.org/es/download.html

cuando ya este instalado, modificar el .env para cambiar los puertos que se indican
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=localhost

el name indica el nombre de la base de datos, se puede dejar como esta "tiempo" o "JVWDK"
es el nombre de la base de datos que ya esta creada, en usuario se puede dejar como esta o el que crea necesario,
contraseña del usuario si tiene o no, dejar como defaul el host


# Instalacion

Dentro de la carpeta de api ejecutar el comando "npm install", esperar a que se instale todos los complementos

# Uso

una ves instalado los complementos, ejecutamos la base de datos en este caso "XAMPP" y crear una base de datos llamada "jvwdk" y ya
luego con el editor de codigo favorito, cambiar el nombre de la base de datos que esta en el archivo ".env" "DB_NAME=", cambiarla
por el nombre de la base de datos que se creo

ya hecho estos cambios 
ejecutar en la terminal favorita "node, git, powershell, etc" el comando "npm start", esperar a que se ejecute y liso
