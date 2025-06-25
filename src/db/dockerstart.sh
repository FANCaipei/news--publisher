docker run -d \
  --name noco \
  -v ./data \
  -p 8080:8080 \
  nocodb/nocodb:latest