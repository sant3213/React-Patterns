<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Local Strategy (local.strategy.ts)
The local.strategy.ts file defines how your application verifies a user's credentials. When using Passport's local strategy, this typically involves checking a username (or email) and password against your database.

The LocalStrategy class extends PassportStrategy, which is a part of @nestjs/passport that, in turn, uses Passport under the hood. Here, you tell Passport how to validate a user:

You receive the username (or email) and password from a login request.
You use these credentials to look up and verify the user in your database.
If the user exists and the password matches, you return the user object; otherwise, you throw an error.

## Local Auth Guard (local-auth.guard.ts)
The local-auth.guard.ts file implements a guard using the LocalStrategy. In NestJS, guards have the responsibility of determining whether a given request will be handled by the route handler or not, based on some logic (in this case, authentication).

The LocalAuthGuard extends AuthGuard('local'), which internally uses the LocalStrategy. When you decorate a route with @UseGuards(LocalAuthGuard), NestJS executes the guard before the route handler. The guard then uses the LocalStrategy to validate the user's credentials. If the validation is successful, the request proceeds to the route handler; otherwise, it's denied.

## How They Work Together
Here’s a simplified flow of what happens when a login request is made:

Client sends login credentials: A request with login credentials (email and password) is sent to a protected route, say /auth/login.

LocalAuthGuard is engaged: Because the route is decorated with @UseGuards(LocalAuthGuard), NestJS invokes the LocalAuthGuard. This guard leverages Passport to use the LocalStrategy.

LocalStrategy validates the user: The LocalStrategy's validate method is automatically called with the credentials. If the credentials are correct, the validate method returns the user object; otherwise, it throws an exception.

User object is attached to request: If the LocalStrategy successfully returns a user, Passport attaches the user object to the request object (req.user).

Route handler executes: If authentication succeeds, control passes to the route handler, which can now use req.user for further processing, such as generating and sending a JWT or simply returning a success response.


## Authentication information

Using @Body(): When you access the request body directly using @Body(), you're getting the raw data sent by the client, which includes the email and password fields exactly as submitted.

Using @Request() After Authentication: After successful authentication, the user object attached to the request often has the password removed or never included to begin with. This is a security measure to prevent accidental exposure of passwords. Authentication processes, especially those following best practices, typically extract and verify the password, then discard it before attaching the user's details to the session or request.

In a NestJS application, when a request comes in, it goes through several layers before it reaches the controller:

- Middleware: These are functions that have access to the request and response objects and the next() function in the application’s request-response cycle. Middleware can execute any code, make changes to the request and response objects, end the request-response cycle, and call the next middleware in the stack. If you have any global or route-specific middleware configured, they will be executed before the request reaches the controller.

- Guards: After middleware, Guards are executed. Guards are responsible for authentication and authorization and determine whether a request should be processed by the handler or not. If a guard blocks a request, it will not reach the controller.

- Interceptors: Interceptors are executed after guards and before the controller. They can transform the response from the controller or extend its behavior. They can also be used to transform the response sent back to the client.

- Pipes: Pipes have two typical use cases: transformation and validation. They can transform input data to the desired form or validate input data and throw an exception if the data is incorrect. Pipes execute immediately before the method handler in the controller and can be applied globally, to a controller, or to specific handler methods.

- Controller: Once the request has passed through any configured middleware, guards, and pipes without being stopped or rejected, it finally reaches the controller. The controller then processes the request by executing the corresponding handler method based on the route and HTTP method (e.g., GET, POST).

- Exception Filters: After the controller has handled the request, any exceptions thrown during the process can be caught and processed by exception filters. This allows for custom error handling and response formatting.

- Response: The response generated by the controller, potentially modified by interceptors, is sent back to the client.

After Middleware: While NestJS itself does not have a concept of "after" middleware executed after the response is sent, you can use interceptors to perform any cleanup or post-processing tasks that do not need to modify the response.

In the case of this application, the order would be: 

- Middleware (if any relevant middleware is configured to run before routes): Middleware functions run first but are generally not directly involved in the authentication process itself. They might perform logging, set headers, or perform other pre-processing tasks.

- Guard (LocalAuthGuard): Before reaching the controller, the guard associated with the route is executed. In your case, when a request hits an endpoint protected by the LocalAuthGuard, this guard is triggered first. The LocalAuthGuard extends Passport's AuthGuard and utilizes the LocalStrategy under the hood.

The LocalAuthGuard initiates the Passport authentication process, which in turn invokes the LocalStrategy.

- Strategy (LocalStrategy): The LocalStrategy is where the actual authentication logic resides. It's responsible for extracting credentials (e.g., email and password) from the request and validating them. This often involves:

- Calling a service, such as your AuthService, which might then use another service like UsersService to retrieve user information from a database.
Using the provided credentials to validate the user, typically by comparing the provided password with a hashed password stored in the database.
Service (AuthService and potentially UsersService): Within the LocalStrategy, you'll typically inject and use services like AuthService to encapsulate the business logic of authentication. The AuthService might:

- Use UsersService to find the user by email.
Compare the provided password against the stored hash (this might happen directly in the LocalStrategy or within a method of AuthService).
Once the user is validated, the LocalStrategy returns the user object (or throws an error if authentication fails), effectively "logging in" the user for the scope of this request.

- Controller: If the LocalAuthGuard successfully validates the user, the request then proceeds to the controller. The controller's handler method associated with the route is executed, where you can access the authenticated user object via Request and perform your business logic.

- Response: Finally, the controller returns a response, which might include sending a JWT token, user information, or simply a success status, back to the client.


## Steps to create authentication:

We need to use config module to 
npm install @nestjs/config