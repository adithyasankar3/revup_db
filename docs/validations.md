<p align="center">
  <a href="https://www.newagesmb.com/" target="_blank"><img src="https://raw.githubusercontent.com/NewAgeSMBDevelopers/smb-logo/main/smb-logo.png" width="320" alt="Newage Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nestjs.com/" target="_blank">NestJs</a> framework for building efficient and scalable server-side applications.</p>

# Form Validations

[Back to docs](./index.md)

### Basic validations

- [class-validator](https://github.com/typestack/class-validator#usage)
  ```js
  @Table
  export class Demo extends Entity<Demo> {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(200)
    num_field: number;
    
    @IsString()
    name: string;

    ...
  } 
  ```

- ValidateIf (Ignore the validators on a property when the provided condition function returns false)
  ```js
  @Table
  export class Demo extends Entity<Demo> {
    @IsString()
    type: string;

    @ValidateIf((o) => o.type === 'message') // body object can be accessed from first argument
    @IsString()
    message: string;

    @ValidateIf((o, v) => o.type === 'image' && typeof v !== 'undefined') // second argument will be the value of active field
    @IsString()
    image: string;

    ...
  }
  ```

### Custom validations
- Validate by comparing another field value
  ```js
  import { IsEqual, IsGreaterThan, IsGreaterThanEqual } from '../../../core/utils/validations';

  @Table
  export class Demo extends Entity<Demo> {
    // validate min and max number fields
    @IsInt()
    @IsPositive()
    min_amount: number;

    @IsInt()
    @IsPositive()
    @IsGreaterThan('min_amount', {
      message: 'Maximum amount should be greater than minimum amount',
    })
    max_amount: number;

    // validate start and end dates
    @IsDateString()
    start_date: Date;

    @IsDateString()
    @IsGreaterThanEqual('start_date')
    end_date: Date;

    // validate confirm password
    @IsString()
    password: string;

    @IsString()
    @IsEqual('password', {
      message: 'Passwords doesn\'t match',
    })
    confirm_password: string;

    ...
  }
  ```

### References
- <a target="_blank" href="https://github.com/typestack/class-validator">class-validator</a>
- <a target="_blank" href="https://docs.nestjs.com/techniques/validation">Nest JS validation</a>