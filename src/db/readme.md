# Nocodb
## github
https://github.com/nocodb/nocodb
run with SQLite
```
docker run -d \
  --name noco \
  -v ./data \
  -p 8080:8080 \
  nocodb/nocodb:latest
```

# Database folder
./data

# Run with sh
```
./dockerstart.sh
```