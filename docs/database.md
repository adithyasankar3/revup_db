<p align="center">
  <a href="https://www.newagesmb.com/" target="_blank"><img src="https://raw.githubusercontent.com/NewAgeSMBDevelopers/smb-logo/main/smb-logo.png" width="320" alt="Newage Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nestjs.com/" target="_blank">NestJs</a> framework for building efficient and scalable server-side applications.</p>

# Database

[Back to docs](./index.md)


## Config

- Set database config as env variables. *Eg: add below env variables to .env file (Not recommended in production)*
  - ``` DATABASE_HOST=localhost ```
  - ``` DATABASE_PORT=3306 ``` 
  - ``` DATABASE_USERNAME=root ``` 
  - ``` DATABASE_PASSWORD= ``` 
  - ``` DATABASE_NAME=db_name ``` 
- Additional config can be done in ``` src\config\database.ts ```
  - Disable query logs -  ``` logging: false ``` 
  - Create tables automatically -  ``` synchronize: true ``` 
  - Alter tables with field changes -   ``` sync.alter: true ```  *(Not recommended in production)*

## References
- <a target="_blank" href="https://sequelize.org/master/">Sequelize (SQL ORM)</a>
- <a target="_blank" href="https://github.com/RobinBuschmann/sequelize-typescript">Sequelize TypeScript</a>
- <a target="_blank" href="https://docs.nestjs.com/techniques/database#sequelize-integration">Sequelize Nest JS</a>