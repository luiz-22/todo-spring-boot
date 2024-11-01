#FROM openjdk:17-jdk-slim
#COPY target/api-0.0.1.jar api.jar
#EXPOSE 8080
#ENTRYPOINT ["java", "-jar", "api.jar"]

# Usar una imagen base con Java 17
FROM openjdk:17-slim

# Directorio donde se colocará la aplicación en el contenedor
WORKDIR /app

# Copiar el archivo jar del proyecto al directorio /app en el contenedor
COPY target/api-todo-sp-0.0.1.jar /app/api-todo-sp.jar

# Exponer el puerto que usa la aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "/app/api-todo-sp.jar"]