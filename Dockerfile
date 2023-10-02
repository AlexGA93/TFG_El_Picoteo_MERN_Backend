# Define image and version
FROM node:18

RUN mkdir -p /home/app

# We're going to define our code inside a folder inside the docker container
WORKDIR /home/app
# We need to copy our package.json inside the current folder
COPY package*.json .
# Run the command to install our package.json dependencies
RUN npm install
# Copy all of the content inside the container's folder
COPY . .
# PORT
EXPOSE 5000
# Initiate with the package.json command to run the server
CMD [ "node", "/home/app/index.js" ]