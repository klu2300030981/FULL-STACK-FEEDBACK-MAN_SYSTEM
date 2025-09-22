# Stage 1: Build all necessary dependencies and the main service
FROM maven:3.8.5-openjdk-17 AS builder

# Set the working directory to the root of the project inside the container
WORKDIR /app

# Copy the entire backend project from the host to the container.
COPY . /app/

# Build all projects in a single step using the parent pom.xml.
RUN mvn clean install -DskipTests

# Stage 2: Create a minimal, final image to run the application
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the built fat JAR from the builder stage.
# Correct the path if a different module contains your main class.
COPY --from=builder /app/admin_service/target/admin_service-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose the ports the application runs on
EXPOSE 2001 2002 2003 2004
ENTRYPOINT ["java", "-jar", "app.jar"]