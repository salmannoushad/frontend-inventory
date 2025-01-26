FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Define the environment variable for the backend URL
ENV REACT_APP_BACKEND_URL=http://localhost:5000

# Start the React app
CMD ["npm", "run", "start"]