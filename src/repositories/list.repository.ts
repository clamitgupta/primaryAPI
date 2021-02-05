import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {List} from '../models';

export class ListRepository extends DefaultCrudRepository<
  List,
  typeof List.prototype.id
  > {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(List, dataSource);
  }
}
