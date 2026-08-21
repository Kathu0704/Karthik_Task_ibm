# userservice

A simple User microservice built with Spring Boot, Spring Data JPA, and an
in-memory H2 database.

## Project setup (Steps 1 & 2)

- Generated the way you would from [start.spring.io](https://start.spring.io):
  Maven Project, Java, latest stable Spring Boot (3.3.4), Java 17
- Dependencies: Spring Web, Spring Data JPA, H2 Database
- Group: `com.microservices`, Artifact: `userservice`
- Extract this zip and open the `userservice` folder as a Maven project in
  IntelliJ (or any IDE). It will pick up `pom.xml` automatically and download
  the dependencies.

## What's included

| Step | File |
|------|------|
| 3. User entity | `src/main/java/com/microservices/userservice/model/User.java` |
| 4. Repository | `src/main/java/com/microservices/userservice/repository/UserRepository.java` |
| 5. Service layer | `src/main/java/com/microservices/userservice/service/UserService.java` |
| App entry point | `src/main/java/com/microservices/userservice/UserserviceApplication.java` |
| Config | `src/main/resources/application.properties` |

### User entity
`User` has `id`, `name`, `email`, is annotated `@Entity`, and uses
`@Id` / `@GeneratedValue(strategy = GenerationType.IDENTITY)` for the primary key.

### UserRepository
Extends `JpaRepository<User, Long>` — Spring Data JPA generates the CRUD
implementation at runtime, so no SQL is needed.

### UserService
Autowires `UserRepository` and exposes:
- `createUser(User user)` — saves a new user
- `getAllUsers()` — returns all users
- `getUserById(Long id)` — returns an `Optional<User>` for a single user

## Running it

```bash
mvn spring-boot:run
```

The app starts on `http://localhost:8080`. The H2 console is available at
`http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:userdb`,
user: `sa`, blank password).

There's no REST controller yet — `UserService` is ready to be wired into a
`@RestController` whenever you want to expose HTTP endpoints for
create/list/get-by-id.
