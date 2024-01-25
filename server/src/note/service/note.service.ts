import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../../../shared/entity/note.entity';
import { User } from '../../../shared/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {
  private readonly logger = new Logger(NoteService.name);

  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async getUserByID(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async createNote(
    title: string,
    description: string,
    userPayload: any,
  ): Promise<Note> {
    const loggedInUser = await this.getUserByID(userPayload.subject);
    if (!loggedInUser) {
      const msg = 'User not found!';
      this.logger.error(msg);
      throw new Error(msg);
    }

    try {
      const note = new Note();
      note.title = title;
      note.description = description;
      note.owner = loggedInUser; //Owner is the logged in User
      note.last_edited_by = loggedInUser; // Initially, the owner is the last person who edited the note.
      const savedNote = await this.noteRepository.save(note);

      //remove sensitive data from response
      delete savedNote.owner.password;
      delete savedNote.last_edited_by.password;
      if (savedNote?.collaborators?.length > 0) {
        savedNote.collaborators.forEach((collaborator) => {
          delete collaborator.password;
        });
      }
      return savedNote;
    } catch (error) {
      const msg = 'Unable to create note';
      this.logger.error(msg);
      throw new Error(msg);
    }
  }

  async editNote(
    noteId: number,
    title: string,
    description: string,
    userPayload: any,
  ): Promise<Note> {
    const loggedInUser = await this.getUserByID(userPayload.subject);
    if (!loggedInUser) {
      const msg = 'User not found!';
      this.logger.error(msg);
      throw new Error(msg);
    }

    //check if note exists
    const note = await this.noteRepository.findOne({
      where: { id: noteId },
      relations: ['collaborators', 'owner', 'last_edited_by'],
    });
    if (!note) {
      const msg = 'Note not found!';
      this.logger.error(msg);
      throw new Error(msg);
    }

    //check if the logged in user is either the author or collaborator of the note
    if (
      loggedInUser.id === note.owner.id ||
      note.collaborators.some(
        (collaborator) => collaborator.id === loggedInUser.id,
      )
    ) {
      try {
        note.title = title;
        note.description = description;
        note.last_edited_by = loggedInUser; // Update the last edited by.

        const savedNote = await this.noteRepository.save(note);

        //remove sensitive data from response
        delete savedNote.owner.password;
        delete savedNote.last_edited_by.password;
        if (savedNote?.collaborators?.length > 0) {
          savedNote.collaborators.forEach((collaborator) => {
            delete collaborator.password;
          });
        }
        return savedNote;
      } catch (error) {
        const msg = 'Unable to edit note';
        this.logger.error(msg);
        throw new Error(msg);
      }
    } else {
      const msg = "You don't have the privileges to edit this note";
      this.logger.error(msg);
      throw new Error(msg);
    }
  }

  async deleteNote(noteId: number, userPayload: any): Promise<void> {
    const loggedInUser = await this.getUserByID(userPayload.subject);
    if (!loggedInUser) {
      const msg = 'User not found!';
      this.logger.error(msg);
      throw new Error(msg);
    }

    //check if note exists
    const note = await this.noteRepository.findOne({
      where: { id: noteId },
      relations: ['collaborators', 'owner', 'last_edited_by'],
    });
    if (!note) {
      const msg = 'Note not found!';
      this.logger.error(msg);
      throw new Error(msg);
    }

    //allow only the note author to be able to delete a note
    if (loggedInUser.id !== note.owner.id) {
      const msg = 'Only the note author is allowed to delete a note';
      this.logger.error(msg);
      throw new Error(msg);
    }

    await this.noteRepository.remove(note);
  }

  async addCollaboratorsToNote(
    noteId: number,
    collaboratorId: number,
    userPayload: any,
  ): Promise<Note> {
    const loggedInUser = await this.getUserByID(userPayload.subject);
    if (!loggedInUser) {
      const msg = 'User not found!';
      this.logger.error(msg);
      throw new Error(msg);
    }

    //check if note exists
    const note = await this.noteRepository.findOne({
      where: { id: noteId },
      relations: ['collaborators', 'owner', 'last_edited_by'],
    });
    if (!note) {
      const msg = 'Note not found!';
      this.logger.error(msg);
      throw new Error(msg);
    }

    try {
      const collaborator = await this.getUserByID(collaboratorId);
      note.collaborators.push(collaborator);
      const savedNote = await this.noteRepository.save(note);

      //remove sensitive data from response
      delete savedNote.owner.password;
      delete savedNote.last_edited_by.password;
      if (savedNote?.collaborators?.length > 0) {
        savedNote.collaborators.forEach((collaborator) => {
          delete collaborator.password;
        });
      }
      return savedNote;
    } catch (error) {
      const msg = 'Unable to add collaborators';
      this.logger.error(msg);
      throw new Error(msg);
    }
  }

  async viewAuthoredNotes(userPayload: any): Promise<Note[]> {
    const loggedInUser = await this.getUserByID(userPayload.subject);
    if (!loggedInUser) {
      const msg = 'User not found!';
      this.logger.error(msg);
      throw new Error(msg);
    }

    const notes = await this.noteRepository.find({
      where: { owner: { id: loggedInUser.id } },
      relations: ['collaborators', 'owner', 'last_edited_by'],
    });

    //remove sensitive data from response
    notes.forEach((note) => {
      delete note.owner.password;
      delete note.last_edited_by.password;
      if (note?.collaborators?.length > 0) {
        note.collaborators.forEach((collaborator) => {
          delete collaborator.password;
        });
      }
    });

    return notes;
  }

  async viewCollaboratedNotes(userPayload: any): Promise<Note[]> {
    const loggedInUser = await this.getUserByID(userPayload.subject);
    if (!loggedInUser) {
      const msg = 'User not found!';
      this.logger.error(msg);
      throw new Error(msg);
    }

    const notes = await this.noteRepository.find({
      where: { collaborators: { id: loggedInUser.id } },
      relations: ['collaborators', 'owner', 'last_edited_by'],
    });

    //remove sensitive data from response
    notes.forEach((note) => {
      delete note.owner.password;
      delete note.last_edited_by.password;
      if (note?.collaborators?.length > 0) {
        note.collaborators.forEach((collaborator) => {
          delete collaborator.password;
        });
      }
    });

    return notes;
  }
}
