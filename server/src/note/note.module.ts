import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from '../../shared/entity/note.entity';
import { User } from '../../shared/entity/user.entity';
import { NoteController } from './controller/note.controller';
import { NoteService } from './service/note.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note, User])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
