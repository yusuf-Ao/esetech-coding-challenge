import { IsNotEmpty } from 'class-validator';

export class NoteDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
