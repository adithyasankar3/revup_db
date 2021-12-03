<p align="center">
  <a href="https://www.newagesmb.com/" target="_blank"><img src="https://raw.githubusercontent.com/NewAgeSMBDevelopers/smb-logo/main/smb-logo.png" width="320" alt="Newage Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nestjs.com/" target="_blank">NestJs</a> framework for building efficient and scalable server-side applications.</p>

# Socket IO

[Back to docs](./index.md)

### How to setup?

- Enable Socket IO in config
  ```js
  // src/config/index.ts
  export default () => ({
    ...
    /**
     * @property {boolean} useSocketIO
     * Enable Socket IO
     * @default false
     */
    useSocketIO: true,
    ...
  })
  ```
- If using firebase token, use ` SocketStateFirebaseAdapter` instead of ` SocketStateAdapter` in ` AppGateway`

  ```js
  // src/app.gateway.ts
  import { SocketStateFirebaseAdapter } from './core/modules/socket/socket-state/socket-state-firebase.adapter';

  export const initAdapters = (app: INestApplication): INestApplication => {
    ...
    const fireAuthService = app.select(FireAuthModule).get(FireAuthService);

    app.useWebSocketAdapter(
      new SocketStateFirebaseAdapter(
        app,
        socketStateService,
        redisPropagatorService,
        userService,
        fireAuthService,
      ),
    );

    ...
  }
  ```

### Working with SocketIO

- Connected user details can be accessed from auth property

  ````js
  // src/app.gateway.ts
  export class AppGateway {
    ...
    handleConnection(client: AuthenticatedSocket) {
      console.log(client.auth);
    }
    ...
  }
  ````
- Listen for an event
  ````js
  // src/app.gateway.ts
  export class AppGateway {
    ...
    @SubscribeMessage('hello-world') // listening hello-world event
    helloWorld(client: AuthenticatedSocket, data: any): any {
      console.log(client);
      console.log(data);
    }
    ...
  }
  ````
- Emit events to clients
  ```js
  import { RedisPropagatorService } from './core/modules/socket/redis-propagator/redis-propagator.service';

  export class DemoService {

    constructor(private redisPropagatorService: RedisPropagatorService) {}

    /* Emit to single user using userId */
    sendHello(): string {
      this.redisPropagatorService.propagateEvent({
        userId: `${userId}`,
        event: 'message',
        data: {
          text: 'hello',
        },
      });
    }

    /* Emit to all authenticated users  */
    sendHelloToAuthenticated(): string {
      this.redisPropagatorService.emitToAuthenticated({
        event: 'message',
        data: {
          text: 'hello',
        },
      });
    }

    /* Emit to all users  */
    sendHelloToAll(): string {
      this.redisPropagatorService.emitToAll({
        event: 'message',
        data: {
          text: 'hello',
        },
      });
    }

    /* Emit to all users with Role Admin  */
    sendHelloToAll(): string {
      this.redisPropagatorService.emitToRole({
        roleId: 1, // user.role_id
        event: 'message',
        data: {
          text: 'hello',
        },
      });
    }

    // or 
    /* Emit to admin room  */
    sendHelloToAll(): string {
      this.redisPropagatorService.emitToRoom({
        room: 'ROLE_1', // user.role_id
        event: 'message',
        data: {
          text: 'hello',
        },
      });
    }
  }
  ```