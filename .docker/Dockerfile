# Dockerfile para React Frontend
FROM node:16

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos y configurar
COPY . .

# Instalar dependencias y construir la aplicación
RUN npm install && npm run build

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
