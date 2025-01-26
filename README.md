# Barcode-Driven Inventory System with Kanban Board (Frontend)

## Description

This project is a responsive inventory management system developed using React for the frontend. It allows users to scan product barcodes to retrieve product details from an external API and manage the inventory via a Kanban board.

### Core Features:

1. **Barcode Scanning**:
    - Users can scan a barcode to fetch product details from the external API.
    - The product details are displayed on the UI and saved to the MongoDB database under the 'Uncategorized' category.

2. **Kanban Board**:
    - A responsive Kanban board is used to categorize products.
    - Users can drag and drop products between categories.
    - Users can dynamically create new categories.
    - The UI is fully responsive, ensuring a smooth experience on both mobile and desktop devices.

3. **Frontend Features**:
    - **Barcode Scanning**: The barcode scanner is integrated using a suitable library.
    - **Drag-and-Drop Kanban Board**: The Kanban board leverages a drag-and-drop library for smooth categorization of products.
    - **Responsive UI**: The UI is responsive for both mobile and desktop users.
    - **Analytics**
    - **Search functionality**

---

## Setup and Installation

To run this application locally, follow these steps:

# Technologies Used
- React.js
- Material-UI
- dnd-kit
- tesseract

## Prerequisites
Ensure you have the following installed:
- node: v18.20.4
- npm: 10.7.0

### Installation:

1. Clone the repository:
   ```bash
   git clone https://github.com/salmannoushad/frontend-inventory.git
   cd frontend-inventory

# Environment Variables
- Create a .env file in the root directory with the following variables:
    ```bash
    REACT_APP_BACKEND_URL=http://localhost:5000
    ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage
1. Start the development server:
   ```bash
   npm run start
   ```
2. Open the application in your browser at:
   ```
   http://localhost:3000
   ```

## Dockerfile for React Frontend with Runtime Environment Variable

Below is the Dockerfile used to run the React.js application in a containerized environment. It uses the Node.js runtime and allows dynamic configuration of the backend URL via the `REACT_APP_BACKEND_URL` environment variable.

```dockerfile
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
```

#Build and Run the Docker Image:
1. Build the Docker image:

```
docker build -t frontend-inventory .
```
2. Run the container and pass the REACT_APP_BACKEND_URL value if needed:

```
docker run -p 3000:3000 -e REACT_APP_BACKEND_URL=http://api.example.com frontend-inventory
```

Feel free to contribute or open issues for improvements! Happy coding! 🎉
