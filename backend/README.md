# Backend - Mini Webshop

Spring Boot REST API for the mini-webshop application.

## Prerequisites

- Java 21 or higher
- Maven 3.6+

## Installation

No additional installation required. Maven dependencies are managed automatically.

## Development

Start the Spring Boot server:

```bash
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080` by default.

## Build

Build the project:

```bash
./mvnw clean package
```

## Project Structure

- `src/main/java` - Java source code
- `src/main/resources` - Configuration files and static resources
- `src/test` - Test classes
- `pom.xml` - Maven configuration and dependencies

## Configuration

Application properties can be configured in:
- `src/main/resources/application.properties` or
- `src/main/resources/application.yml`
