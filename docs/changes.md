<p align="center">
  <a href="https://www.newagesmb.com/" target="_blank"><img src="https://raw.githubusercontent.com/NewAgeSMBDevelopers/smb-logo/main/smb-logo.png" width="320" alt="Newage Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nestjs.com/" target="_blank">NestJs</a> framework for building efficient and scalable server-side applications.</p>

# Change Logs

[Back to docs](./index.md)

## 2021-06-24
- Added docs for CRUD query parameters [CRUD - Query Parameters](./crud.md#query-parameters)
- Added option to customize populate query parameters. [#73148a6](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/73148a6a2b699d3063aef2a3c29e699b0617c85a)

## 2021-06-15
- SocketIO: Authenticated user will be added to room, based on their role. [#9eaa16f](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/9eaa16fe6397665730671e981b147bbed12fe472)
  - Eg: users having ```role_id = 1``` will be added to room ```ROLE_1```
  - Socket emit to room ```ROLE_1```
    ```js
    this.redisPropagatorService.emitToRoom({
      room: 'ROLE_1',
      event: 'message',
      data: {
        text: 'hello',
      },
    });
    ```
- SocketIO: Added option to emit by RoleId and Room name [#d4022bb](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/d4022bb7644952166dd95051c3abca7c63ac1913), [#ac5eec5](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/ac5eec5456003330754d2f8886d36254a2b1b08a)
- Utils: Added function to generate random string [#f48beb5](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/f48beb5eb32da5f1166862f074e72ec203c68d08)
- Bug Fix: Reset password OTP verification issue fixed [#f8df67d](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/f8df67d63036e70a4d7c4ee4553cc0c8dcb53baf)

## 2021-06-07
- New decorator for upload file and set filename to request body [File Upload](./upload.md#upload-and-update-body)
- Added custom form validation decorators [Form Validation](./validations.md#custom-validations)

## 2021-06-04
- Added doc for basic [File Upload](./upload.md) and [S3 upload](./upload.md#upload-to-s3-bucket)
- Added endpoint to get count of all records in table [#5ed2215](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/5ed2215a45450695d74e369d8689a4284154d62e)
- Added CDN_URL env to use external CDNs like S3 buckets [#645a12a](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/645a12ad753668a36ca0f539b2dde5ed011e65ce)
- MS client to use REDIS by default [#330224e](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/330224ee0b6131b7ffc7a345b9509c198a87b96e)

## 2021-06-02
- Added option to generate new modules using CLI
  ```bash
  $ gulp generate -module <MODULE_NAME>

  # Examples:
  $ gulp generate -module product
  $ gulp generate -module product-category
  ```

  Note: To use new module, module need to be imported in ``` AppModule ``` manually. If new module not reflecting in docs, clear ``` dist/ ``` folder and start the server

## 2021-06-01
- Added MsListener decorator to prevent multiple execution of same job in different servers. [#90fff2e](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/90fff2ee94b2a4a519f04b4d6ad5c5104cfd02c4)
  - By default, backgound tasks will be executed by source server itself
    ```js
    await this.msClient.executeJob(
        'controller.demo',
        new Job({
          action: 'test',
          payload: {
            message: 'hello',
          },
        }),
      );
    ```
  - Backgound tasks can be assigned to another server using app property in job object
    ```js
    await this.msClient.executeJob(
        'controller.demo',
        new Job({
          app: 'another-server-name',
          action: 'test',
          payload: {
            message: 'hello',
          },
        }),
      );
    ```
- MS client to use TCP protocol by default [#90fff2e](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/90fff2ee94b2a4a519f04b4d6ad5c5104cfd02c4)
- Added option to set redis db index and prefix [#b280004](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/b2800048e5c338a7162c75481804fcb44456045f)
- Good controller optimized for reducing work while creating new module [#78af373](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/78af3737019824c4d1de3aa556aeac1ec3db9550)
- New helper function isPrimaryInstance is used for fixing issues caused by pm2 cluster mode [#72831bd](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/72831bd63d75761e6901137aad801b1d6e7d85a6)

## 2021-05-17
- Added a new function to get count of available records in database tables [#1849861](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/18498614e49160d2d6e4afe3b5e22c4d343a2c01)
- Fixed issue while authenticating socket connection [#727eafa](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/727eafaedf81bad8eb2ea300a18e1c7654e95cac)

## 2021-05-12
- Firebase push notification integrated [#00fefd0](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/00fefd09a69f725d870f8995a482fe0a43552807)
  ```js
  this.notificationService.sendPush(
    new Job({
      payload: {
        user_id: 1,
        data: { ... },
        notification: {
          title: 'Push title',
          body: 'This is a push message'
        },
      },
    }),
  );
  ```
- Added individual notification config for each user [#1175efc](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/1175efc828ed5d04d1e17f88d9754c104be839ab)

## 2021-05-11
- Added option to enable or disable Socket IO [#1799582](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/1799582c2d9585509ba4c2838950b065f5127076)
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
- Nodemailer integrated [#266e687](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/266e6875806255e619c807a1277aa6e9650ffab9)
- Added token expiry in auth response [#2fabe17](https://github.com/NewAgeSMBDevelopers/nest-core-framework/commit/2fabe17ae1b26c8e843e7abe8573710c1cf8957b)

## 2021-05-06

- Seperate auth guard for firebase auth for using firebase idToken instead of local JWT token
  - Use ``` FirebaseJwtAuthGuard```  instead of ``` JwtAuthGuard```  in ``` AppModule``` 
    ```javascript
    // src/app.module.ts
    import { FirebaseJwtAuthGuard } from './modules/auth/firebase-jwt/firebase-jwt-auth.guard';
    
    @Module({
      ...
      providers: [
        ...
        {
          provide: APP_GUARD,
          /* useClass: JwtAuthGuard, */
          useClass: FirebaseJwtAuthGuard,
        },
        ...
      ],
    })
    export class AppModule {}
    ```
  - Import ``` FirebaseJwtStrategy``` in ``` FirebaseAuthModule``` 
    ```javascript
    // src/modules/auth/firebase/firebase-auth.module.ts
    import { FirebaseJwtStrategy } from '../firebase-jwt/firebase-jwt.strategy';
    
    @Module({
      ...
      providers: [
        ...
        FirebaseJwtStrategy,
        ...
      ],
    })
    export class FirebaseAuthModule {}
    ```
  - Use ``` SocketStateFirebaseAdapter```  instead of ``` SocketStateAdapter```  in ``` AppGateway``` 
    ```javascript
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
- Google recaptcha added
  - Use ``` RecaptchaAuthGuard```  as guard in required api function
    ```javascript
    // src/modules/auth/auth.controller.ts
    @Public()
    @ApiOperation(...)
    @ApiHeader({ name: 'recaptcha' }) // recaptcha response need to send through header
    @ApiOkResponse(...)
    @UseGuards(RecaptchaAuthGuard)
    @Post('password/forgot')
    async forgotPassword(
      ...
    ) {
      ...
    }
    ```