FROM node:20

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

EXPOSE 5001
CMD ["npx", "vite", "--host", "0.0.0.0", "--port", "5001"]
