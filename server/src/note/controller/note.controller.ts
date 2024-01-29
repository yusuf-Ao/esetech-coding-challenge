import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from '../service/note.service';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { Response } from 'express';
import { NoteDto } from '../../../shared/dtos/note.dto';
import { CustomResponseDto } from '../../../shared/utils/custom-response.dto';
import { GetUser } from '../../../shared/decorator/user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}
  private readonly logger = new Logger(NoteController.name);

  @UseGuards(JwtAuthGuard)
  @Post('/new')
  async createNote(
    @Res() res: Response,
    @Body() noteDto: NoteDto,
    @Request() req,
    @GetUser() user,
  ) {
    const customResponse = new CustomResponseDto();
    try {
      customResponse.message = 'Note created success!';
      customResponse.statusCode = 201;
      customResponse.success = true;
      customResponse.data = await this.noteService.createNote(
        noteDto.title,
        noteDto.description,
        user,
      );
      this.logger.log(`creating new note`);
      return res.status(201).json(customResponse);
    } catch (error) {
      this.logger.error(`Unable to create new note`, error.message);
      customResponse.success = false;
      customResponse.message = error.message;
      customResponse.statusCode = 417;
      return res.status(417).json(customResponse);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:noteId/edit')
  async editNote(
    @Res() res: Response,
    @Param('noteId') noteId: number,
    @Body() noteDto: NoteDto,
    @Request() req,
    @GetUser() user,
  ) {
    const customResponse = new CustomResponseDto();
    try {
      customResponse.message = 'Note Edited success!';
      customResponse.statusCode = 200;
      customResponse.success = true;
      customResponse.data = await this.noteService.editNote(
        noteId,
        noteDto.title,
        noteDto.description,
        user,
      );
      this.logger.log(`Editing note`);
      return res.status(200).json(customResponse);
    } catch (error) {
      this.logger.error(`Unable to edit note`, error.message);
      customResponse.success = false;
      customResponse.message = error.message;
      customResponse.statusCode = 417;
      return res.status(417).json(customResponse);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/fetch-authored')
  async fetchAuthoredNotes(
    @Res() res: Response,
    @Request() req,
    @GetUser() user,
  ) {
    const customResponse = new CustomResponseDto();
    try {
      customResponse.message = 'Notes fetched success!';
      customResponse.statusCode = 200;
      customResponse.success = true;
      customResponse.data = await this.noteService.viewAuthoredNotes(user);
      this.logger.log(`Fetching notes`);
      return res.status(200).json(customResponse);
    } catch (error) {
      this.logger.error(`Unable to fetch note`, error.message);
      customResponse.success = false;
      customResponse.message = error.message;
      customResponse.statusCode = 417;
      return res.status(417).json(customResponse);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/fetch-collaborated')
  async fetchCollaboratedNotes(
    @Res() res: Response,
    @Request() req,
    @GetUser() user,
  ) {
    const customResponse = new CustomResponseDto();
    try {
      customResponse.message = 'Notes fetched success!';
      customResponse.statusCode = 200;
      customResponse.success = true;
      customResponse.data = await this.noteService.viewCollaboratedNotes(user);
      this.logger.log(`Fetching notes`);
      return res.status(200).json(customResponse);
    } catch (error) {
      this.logger.error(`Unable to fetch note`, error.message);
      customResponse.success = false;
      customResponse.message = error.message;
      customResponse.statusCode = 417;
      return res.status(417).json(customResponse);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:noteId/remove')
  async deleteNote(
    @Res() res: Response,
    @Request() req,
    @Param('noteId') noteId: number,
    @GetUser() user,
  ) {
    const customResponse = new CustomResponseDto();
    try {
      customResponse.message = 'Note Deleted success!';
      customResponse.statusCode = 200;
      customResponse.success = true;
      customResponse.data = await this.noteService.deleteNote(noteId, user);
      this.logger.log(`Deleting note`);
      return res.status(200).json(customResponse);
    } catch (error) {
      this.logger.error(`Unable to delete notes`, error.message);
      customResponse.success = false;
      customResponse.message = error.message;
      customResponse.statusCode = 417;
      return res.status(417).json(customResponse);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:noteId/add-collaborator')
  async addCollaborator(
    @Res() res: Response,
    @Request() req,
    @Param('noteId') noteId: number,
    @Query('collaboratorEmail') collaboratorEmail: string,
    @GetUser() user,
  ) {
    const customResponse = new CustomResponseDto();
    try {
      customResponse.message = 'Collaborator Added success!';
      customResponse.statusCode = 200;
      customResponse.success = true;
      console.log(collaboratorEmail);
      customResponse.data = await this.noteService.addCollaboratorsToNote(
        noteId,
        collaboratorEmail,
        user,
      );
      this.logger.log(`Adding collaborator`);
      return res.status(200).json(customResponse);
    } catch (error) {
      this.logger.error(`Unable to add collaborator`, error.message);
      customResponse.success = false;
      customResponse.message = error.message;
      customResponse.statusCode = 417;
      return res.status(417).json(customResponse);
    }
  }
}
