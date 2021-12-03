<p align="center">
  <a href="https://www.newagesmb.com/" target="_blank"><img src="https://raw.githubusercontent.com/NewAgeSMBDevelopers/smb-logo/main/smb-logo.png" width="320" alt="Newage Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nestjs.com/" target="_blank">NestJs</a> framework for building efficient and scalable server-side applications.</p>

# Working with Service

[Back to docs](./index.md)

### Configure search query  

- Search records from single table
  ```js
  // src/modules/demo/demo.service.ts
  export class DemoService extends ModelService {
    ...
    /**
     * searchFields
    * @property array of fields to include in search
    */
    searchFields: string[] = ['name', 'description'];
    ...
  }
  ```
- Search records from joined table
  ```js
  // src/modules/demo/demo.service.ts
  export class DemoService extends ModelService {
    ...
    /**
     * searchFields
    * @property array of fields to include in search
    */
    searchFields: string[] = ['name', '$table2.name$'];
    /**
     * searchPopulate
     * @property array of associations to include for search
     */
    searchPopulate: string[] = ['table2'];
    ...
  }
  ```

### Customize job before read or write 
- Customize job for all read functions (findAll, getCount, findOne and findById)
  ```js
  // src/modules/demo/demo.service.ts
  export class DemoService extends ModelService {
    ...
    /**
     * doBeforeRead
     * @function function will execute before findAll, findById and findOne function
     * @param {object} job - mandatory - a job object representing the job information
     * @return {void}
     */
    async doBeforeRead(job: Job): Promise<void> {
      await super.doBeforeRead(job);
      // customize job here
    }
    ...
  }
  ```
- Customize job for specific function
  ```js
  // src/modules/demo/demo.service.ts
  export class DemoService extends ModelService {
    ...
    /**
     * doBeforeRead
     * @function function will execute before findAll, findById and findOne function
     * @param {object} job - mandatory - a job object representing the job information
     * @return {void}
     */
    async doBeforeRead(job: Job): Promise<void> {
      await super.doBeforeRead(job);
      if (job.action === 'findAll') {
        // customize job here
      }
    }
    ...
  }
  ```
- Update where condition to restict job, to access only loggedIn user's records
  ```js
  // src/modules/demo/demo.service.ts
  export class DemoService extends ModelService {
    ...
    /**
     * doBeforeRead
     * @function function will execute before findAll, findById and findOne function
     * @param {object} job - mandatory - a job object representing the job information
     * @return {void}
     */
    async doBeforeRead(job: Job): Promise<void> {
      await super.doBeforeRead(job);
      job.options.where.user_id = job.owner.id;
    }
    ...
  }
  ```
- Customize job for all write functions (create and update)
  ```js
  // src/modules/demo/demo.service.ts
  export class DemoService extends ModelService {
    ...
    /**
     * doBeforeWrite
     * @function function will execute before create and update function
     * @param {object} job - mandatory - a job object representing the job information
     * @return {void}
     */
    async doBeforeWrite(job: Job): Promise<void> {
      await super.doBeforeWrite(job);
      // customize job here
    }
    ...
  }
  ```
- Update job body to create record against loggedIn user
  ```js
  // src/modules/demo/demo.service.ts
  export class DemoService extends ModelService {
    ...
    /**
     * doBeforeWrite
     * @function function will execute before create and update function
     * @param {object} job - mandatory - a job object representing the job information
     * @return {void}
     */
    async doBeforeWrite(job: Job): Promise<void> {
      await super.doBeforeWrite(job);
      job.body.user_id = job.owner.id;
    }
    ...
  }
  ```
- Customize job for delete function
  ```js
  // src/modules/demo/demo.service.ts
  export class DemoService extends ModelService {
    ...
    /**
     * doBeforeDelete
     * @function function will execute before delete function
     * @param {object} job - mandatory - a job object representing the job information
     * @return {void}
     */
    async doBeforeDelete(job: Job): Promise<void> {
      await super.doBeforeDelete(job);
      // customize job here
    }
    ...
  }
  ```
### Customize job response after read or write 
- Customize job response for all read functions (findAll, getCount, findOne and findById)
  ```js
  // src/modules/demo/demo.service.ts
  export class DemoService extends ModelService {
    ...
    /**
     * doAfterRead
     * @function function will execute after findAll, findById and findOne function
     * @param {object} job - mandatory - a job object representing the job information
     * @return {void}
     */
    async doAfterRead(job: Job): Promise<void> {
      await super.doAfterRead(job);
      // customize job response here
    }
    ...
  }
  ```
- Delete a specific key from each records for findAll function
  ```js
  // src/modules/demo/demo.service.ts
  export class DemoService extends ModelService {
    ...
    /**
     * doAfterRead
     * @function function will execute after findAll, findById and findOne function
     * @param {object} job - mandatory - a job object representing the job information
     * @return {void}
     */
    async doAfterRead(job: Job): Promise<void> {
      await super.doAfterRead(job);
      if (job.action === 'findAll') {
        job.response.data = job.response.data.map((x) => {
          delete x.unwanted;
          return x;
        })
      }
    }
    ...
  }
  ```