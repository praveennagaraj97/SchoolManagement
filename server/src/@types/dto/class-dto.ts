import { ClassEntity } from '../entity/class.entity';

export interface AddClassDTO extends Omit<ClassEntity, '_id'> {}
