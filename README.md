# CRUD app made using mysql, node and react

# How to install and run
- install docker
- download the files: run in terminal `git clone https://github.com/tkuhemiya/employee-manager.git` or download and unzip the zipfile
- go into the folder: `cd employee-manager`
- build and run the docker image: `docker-compose up --build`
- the app will be hosted on localhost:80, visit localhost:80

the docker build might fail if port 3306, 8080, 80 are already occupied. if the docker build fails clear anything that might be running on those ports and restart the docker container 
