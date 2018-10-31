FROM openjdk:8
ADD target/wwww-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
docker run -d -p 8080:8080 bunicu