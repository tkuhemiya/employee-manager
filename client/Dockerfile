FROM node:22 as client

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=client /client/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]