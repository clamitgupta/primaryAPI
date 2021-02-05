import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {List} from '../models';
import {ListRepository} from '../repositories';

export class ListController {
  constructor(
    @repository(ListRepository)
    public repository: ListRepository,
  ) {}

  @post('/list', {
    summary: "Create a new list records.",
    responses: {
      '200': {
        description: 'List model instance',
        content: {'application/json': {schema: getModelSchemaRef(List)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(List, {
            title: 'NewList',
            exclude: ['id'],
          }),
        },
      },
    })
    list: Omit<List, 'id'>,
  ): Promise<List> {
    return this.repository.create(list);
  }

  @get('/list', {
    summary: "Get all list records.",
    responses: {
      '200': {
        description: 'Array of List model instances',
        content: {
          'application/json': {
          },
        },
      },
    },
  })
  async find(): Promise<List[]> {
    return this.repository.find();
  }

  @post('/fetch', {
    summary: "Create a new list record and return all list records.",
    responses: {
      '200': {
        description: 'Array of List model instances',
        content: {'application/json': {schema: getModelSchemaRef(List)}},
      },
    },
  })
  async fetch(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(List, {
            title: 'NewList',
            exclude: ['id'],
          }),
        },
      },
    })
    list: Omit<List, 'id'>,
  ) {
    await this.repository.create(list);
    return this.find();
  }

}
