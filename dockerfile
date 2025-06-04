# Usamos una imagen base de Node.js
FROM node:22.14.0

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY . .

# Instalar dependencias usando pnpm (según tu package.json)
RUN npm install -g pnpm && pnpm install

# Construir el proyecto para producción
RUN pnpm run build

# Exponer el puerto en el que la aplicación escucha
EXPOSE 4321

# Comando para iniciar la aplicación en modo producción
CMD ["pnpm", "run", "preview"]