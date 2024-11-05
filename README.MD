<h1 align="center">Todo App</h1>

Aplicación de lista de tareas desarrollada con React y Spring Boot, con almacenamiento local y autenticación opcional.

## Instalación y Configuración

### client

Ejecuta `npm install` para instalar las dependencias.

Con la instalación del cliente, puedes empezar a usar la aplicación de manera local, aunque no podrás interactuar con la API.

###  api

Antes de ejecutar la API en **IntelliJ IDEA**, sigue estos pasos de configuración previos:

1. **Configuración de la base de datos**:
   - Si usas **PostgreSQL**: crea la base de datos en tu servidor de PostgreSQL.
   - Si prefieres una base de datos en memoria: puedes omitir la creación de una base de datos y usar **H2** (base de datos en memoria).

2. **Variables de entorno**:
   - Configura las variables de entorno en el archivo `application.properties`, incluyendo los detalles de la base de datos (si usas PostgreSQL) y cualquier otra variable de configuración necesaria.

3. **Ajustes de configuración para desarrollo local**:
   - En los archivos `SecurityConfig` y `WebConfig` (del backend), comenta las líneas específicas para producción y descomenta las que están diseñadas para el entorno local.
   - En el cliente (frontend), ajusta los archivos `AuthContext` y `api`: comenta las líneas correspondientes al entorno de producción y descomenta las líneas para el entorno local.

Con estos ajustes, la API estará lista para ejecutarse en modo de desarrollo local en IntelliJ IDEA.

## Cómo Probar el Proyecto

### client

1. Ejecuta `npm run dev` para iniciar el servidor de desarrollo.
2. Abre el navegador y navega a `http://localhost:5173`.

###  api

1. Ejecuta `Run` para iniciar el servidor de desarrollo.
2. Puedes abrir el navegador y navega a `http://localhost:8080` para ver si está funcionando correctamente.

## 