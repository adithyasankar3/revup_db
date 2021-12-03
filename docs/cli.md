<p align="center">
  <a href="https://www.newagesmb.com/" target="_blank"><img src="https://raw.githubusercontent.com/NewAgeSMBDevelopers/smb-logo/main/smb-logo.png" width="320" alt="Newage Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nestjs.com/" target="_blank">NestJs</a> framework for building efficient and scalable server-side applications.</p>

# CLI

[Back to docs](./index.md)

## Generate
- Generate a new module (SQL)
  ```bash
  $ gulp generate -module <MODULE_NAME>

  # Examples:
  $ gulp generate -module product
  $ gulp generate -module product-category
  ```

  Note: To use new module, module need to be imported in ``` AppModule ``` manually. If new module not reflecting in docs, clear ``` dist/ ``` folder and start the server

- Generate a new module (MongoDB)
  ```bash
  $ gulp generate -module <MODULE_NAME> -mongo

  # Examples:
  $ gulp generate -module product -mongo
