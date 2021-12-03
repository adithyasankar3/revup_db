import { Model } from 'mongoose';
import { MongoService } from './mongo.service';
import { Job, JobResponse } from '../../utils/job';

export abstract class ModelService extends MongoService {
  /**
   * searchFields
   * @property array of fields to include in search
   */
  searchFields: string[] = [];

  constructor(model: Model<any>) {
    super(model);
  }

  /**
   * convertReadPayload
   * @function function will execute before findAll, findById and findOne function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {void}
   */
  async convertReadPayload(job: Job): Promise<void> {
    const options = job.options;
    const select = options.select || [];
    const where = options.where || {};
    if (!!options.search && !!this.searchFields.length) {
      where.$and = where.$and || [];
      const whereOR = [];
      for (let index = 0; index < this.searchFields.length; index++) {
        const field = this.searchFields[index];
        whereOR.push({ [field]: { $regex: new RegExp(options.search, 'i') } });
      }
      where.$and.push({ $or: whereOR });
    }
    const attributes = select.map((x) => x.replace(/[^a-zA-Z0-9_]/g, ''));
    let populate: any = job.options.populate || [];
    populate = populate.map((x) => ({ path: x }));
    let sort = job.options.sort || [];
    if (typeof sort[0] === 'string') {
      sort = [sort];
    }
    sort = sort.map((x) => ({ [x[0]]: x[1] }));
    job.options.where = where;
    job.options.populate = populate;
    job.options.sort = sort;
    job.options.attributes = attributes.length
      ? attributes.join(' ')
      : undefined;
  }

  /**
   * convertWritePayload
   * @function function will execute before findAll, findById and findOne function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {void}
   */
  async convertWritePayload(job: Job): Promise<void> {
    const options = job.options;
    let populate: any = options.populate || [];
    populate = populate.map((x) => ({ path: x }));
    job.options.populate = populate;
    job.options.where = job.options.where || {};
  }

  /**
   * convertDeletePayload
   * @function function will execute before delete function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {void}
   */
  async convertDeletePayload(job: Job): Promise<void> {
    job.options.where = job.options.where || {};
  }

  /**
   * doBeforeRead
   * @function function will execute before findAll, findById and findOne function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {void}
   */
  async doBeforeRead(job: Job): Promise<void> {
    job.response.error = false;
  }

  /**
   * doBeforeWrite
   * @function function will execute before create and update function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {void}
   */
  async doBeforeWrite(job: Job): Promise<void> {
    job.response.error = false;
  }

  /**
   * doBeforeDelete
   * @function function will execute before delete function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {void}
   */
  async doBeforeDelete(job: Job): Promise<void> {
    job.response.error = false;
  }

  /**
   * findAll
   * @function search and get records with total count and pagination
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} job response object
   */
  async findAll(job: Job): Promise<JobResponse> {
    try {
      await this.convertReadPayload(job);
      await this.doBeforeRead(job);
      if (!!job.response.error) return job.response;
      job.response = await this.getAllRecords(job);
      if (!!job.response.error) return job.response;
      await this.doAfterRead(job);
      return job.response;
    } catch (error) {
      return { error };
    }
  }

  /**
   * getCount
   * @function search and get records with total count and pagination
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} job response object
   */
  async getCount(job: Job): Promise<JobResponse> {
    try {
      await this.convertReadPayload(job);
      await this.doBeforeRead(job);
      if (!!job.response.error) return job.response;
      job.response = await this.countAllRecords(job);
      if (!!job.response.error) return job.response;
      await this.doAfterRead(job);
      return job.response;
    } catch (error) {
      return { error };
    }
  }

  /**
   * findById
   * @function get a record using primary key
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} job response object
   */
  async findById(job: Job): Promise<JobResponse> {
    try {
      await this.convertReadPayload(job);
      await this.doBeforeRead(job);
      if (!!job.response.error) return job.response;
      job.response = await this.findRecordById(job);
      if (!!job.response.error) return job.response;
      await this.doAfterRead(job);
      return job.response;
    } catch (error) {
      return { error };
    }
  }

  /**
   * findOne
   * @function search and find a record
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} job response object
   */
  async findOne(job: Job): Promise<JobResponse> {
    try {
      await this.convertReadPayload(job);
      await this.doBeforeRead(job);
      if (!!job.response.error) return job.response;
      job.response = await this.findOneRecord(job);
      if (!!job.response.error) return job.response;
      await this.doAfterRead(job);
      return job.response;
    } catch (error) {
      return { error };
    }
  }

  /**
   * create
   * @function create a new record
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} job response object
   */
  async create(job: Job): Promise<JobResponse> {
    try {
      await this.convertWritePayload(job);
      await this.doBeforeWrite(job);
      if (!!job.response.error) return job.response;
      job.response = await this.createRecord(job);
      if (!!job.response.error) return job.response;
      await this.doAfterWrite(job);
      return job.response;
    } catch (error) {
      return { error };
    }
  }

  /**
   * update
   * @function update a record using primary key
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} job response object
   */
  async update(job: Job): Promise<JobResponse> {
    try {
      await this.convertWritePayload(job);
      await this.doBeforeWrite(job);
      if (!!job.response.error) return job.response;
      job.response = await this.updateRecord(job);
      if (!!job.response.error) return job.response;
      await this.doAfterWrite(job);
      return job.response;
    } catch (error) {
      return { error };
    }
  }

  /**
   * delete
   * @function delete a record using primary key
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} job response object
   */
  async delete(job: Job): Promise<JobResponse> {
    try {
      await this.convertDeletePayload(job);
      await this.doBeforeDelete(job);
      if (!!job.response.error) return job.response;
      job.response = await this.deleteRecord(job);
      if (!!job.response.error) return job.response;
      await this.doAfterDelete(job);
      return job.response;
    } catch (error) {
      return { error };
    }
  }

  /**
   * doAfterRead
   * @function function will execute after findAll, findById and findOne function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {void}
   */
  async doAfterRead(job: Job): Promise<void> {
    job.status = !!job.response.error ? 'Errored' : 'Completed';
  }

  /**
   * doAfterWrite
   * @function function will execute after create and update function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {void}
   */
  async doAfterWrite(job: Job): Promise<void> {
    job.status = !!job.response.error ? 'Errored' : 'Completed';
  }

  /**
   * doAfterDelete
   * @function function will execute after delete function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {void}
   */
  async doAfterDelete(job: Job): Promise<void> {
    job.status = !!job.response.error ? 'Errored' : 'Completed';
  }
}
