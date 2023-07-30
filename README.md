# Docker Commands

## 1. Docker Images Commands

- Docker images list
    ```
    docker images
    ```
- Docker download a single images
    ```
    docker pull image_name

    or

    docker pull image_name:version_number
    ```
- Delete Docker Image
    ```
    docker image rm image_name
    ```

## 2. Docker Image's Containers

- Create a container by image (It returns container's ID)
    ```
    docker container create image_name
    
    or

    docker create image_name

    or

    docker create --name container_name image_name

    or

    docker create -pmachine_port:contianer_port --name container_name image_name
    ```
- Start Container
    ```
    docker start container_ID
    ```
- Stop Container
    ```
    docker stop container_ID
    ```
- List of the containers
    ```
    docker ps

    or

    docker ps -a
    ```
- Delete container
    ```
    docker rm container_name

    or

    docker rm container_ID
    ```
- Logs
    ```
    docker logs container_name

    or

    docker logs --follow container_name
    ```
## 3. Run Docker Command "docker run"

It will make three steps:

- Check for downloaded images (If it doesn't find any, it will download them).
- Create a container
- Init container
    ```
    docker run image_name

    or

    docker run -d image_name

    or

    docker run -pmachine_port:container_port --name container_name -d image_name
    ```
## 4. Network

- List networks
    ```
    docker network ls
    ```

- Create a newtwork
    ```
    docker network create network_name
    ```
- Delete a newtwork
    ```
    docker network rm network_name
    ```
## 5. Create Docker Images by Dockerfile

```
docker build -t image_name:version route
```
- example:
```
docker build -t myserver:latest .
```

## 6. Create two containers and enable communication between them
- Create a network to operate with.
```
docker network create my_network
```
- Create App image using Dockerfile
```
docker build -t myserver:latest .
```

- Create database container (example mongoDB)
```
docker create -p 27017:27017 --name mongo_container --network my_network -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=password mongo
```

- Create app container
```
docker create -p 3000:3000 --name my_app_container --network my_network myserver:latest
```
- Check logs
```
docker logs my_app_container
```
## 7. Automation with Docker Compose

- Init our setup
```
docker compose up
```
- Delete containers and newtorks
```
docker compose down
```

- Use dockerfile for development environment
```
docker compose -f docker-compose-dev.yml up
```