import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'text',
  })
  title: string;

  @Column({
    type: 'text',
  })
  description: string;

  @ManyToOne(() => User) // Many notes can belong to one owner
  @JoinColumn({
    name: 'owner_id',
  })
  owner: User;

  @ManyToOne(() => User) // Many notes can have the same user as the last editor
  @JoinColumn({
    name: 'last_edited_by_id',
  })
  last_edited_by: User;

  @ManyToMany(() => User) // Many users can collaborate on many notes
  @JoinTable({
    name: 'note_collaborators', // Create an intermediary table for collaborators
    joinColumn: {
      name: 'note_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  collaborators: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
