# Todo App

Aplicación de lista de tareas desarrollada con React y Spring Boot, con almacenamiento local y autenticación opcional.  

[Demo](https://todo-spring-boot.vercel.app/)


## 🔧 Instalación y Configuración

### Cliente

```bash
npm i
npm run dev
```

Puedes usar la aplicación con almacenamiento local desde el cliente, pero necesitarás la API para la autenticación.

### API

Antes de ejecutar la API en **IntelliJ IDEA**, sigue estos pasos de configuración previos:

1. **Configuración de la base de datos**:
   - Si usas **PostgreSQL**: crea la base de datos PostgreSQL.
   - Si prefieres una base de datos en memoria: puedes usar **H2** (base de datos en memoria).

2. **Variables de entorno**:
   - Configura las variables de entorno en el archivo `application.properties`, incluyendo los detalles de la base de datos (si usas PostgreSQL) y cualquier otra variable de configuración necesaria.

3. **Ajustes de configuración**:
   - En los archivos `SecurityConfig` y `WebConfig` (del backend), comenta las líneas específicas para producción y descomenta las que están diseñadas para el entorno local.
   - En el cliente (frontend), ajusta los archivos `AuthContext` y `api`: comenta las líneas correspondientes al entorno de producción y descomenta las líneas para el entorno local.

Ejecuta `Run` para iniciar el servidor.

## 📝Desarrollo de la API paso a paso

[Link](https://luisblog.vercel.app/spring-boot-proyecto)
