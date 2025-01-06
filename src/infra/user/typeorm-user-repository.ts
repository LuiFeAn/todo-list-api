import { User } from '@domain/user/user.domain';
import { UserGateway } from '@domain/user/user.repository.gateway';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './user.model';
import { Repository } from 'typeorm';
import { UserMapper } from '@domain/user/user.mapper';

export class TypeOrmUserRepository implements UserGateway {
  constructor(
    @InjectRepository(UserModel)
    private readonly repository: Repository<UserModel>,
  ) {}

  async create(entity: User): Promise<void> {
    await this.repository.save(UserMapper.toOutput(entity));
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
    });
    return UserMapper.typeOrmToDomain(user);
  }
  findByEmail(email: string): Promise<boolean> {
    return this.repository.exists({
      where: {
        email,
      },
    });
  }
}
