import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schema/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

// TODO: el codigo de relacion con el comentario sera el id y este se enviara de manera codificada atravez de mensajes de texto
// y servira como modelo de referencia para el comentario inactived -> pending

// TODO: se creara el comentario con status inactived y se enviara un mensaje de texto al usuario para que active el comentario
// si el comentario no es activado en un tiempo determinado se eliminara el comentario

// TODO: el comentario se pasara a pending unicamente cuando el comentario sea hecho por el usuario y este estara pendiente de revision por el administrador

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async requestComment(createCommentDto: CreateCommentDto, patientId: string) {
    try {
      //TODO: create comment with userid and send this comment id to user by text message
    } catch (error) {
      return error;
    }
  }

  async create(createCommentDto: CreateCommentDto) {
    try {
      const createComment = await new this.commentModel(createCommentDto);
      console.log(createComment);

      return createComment.save();
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const comments = await this.commentModel
        .find({
          $or: [{ status: 'Active' }, { status: 'Pending' }],
        })
        .populate('author')
        .exec();
      return comments;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      const comment = await this.commentModel
        .findById(id)
        .populate('author')
        .exec();
      return comment;
    } catch (error) {
      return error;
    }
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      const updateComment = this.commentModel.findByIdAndUpdate(
        id,
        updateCommentDto,
        { new: true },
      );
      return updateComment;
    } catch (error) {
      return error;
    }
  }

  remove(id: string) {
    try {
      const removeComment = this.commentModel.deleteOne({ _id: id });
      return removeComment;
    } catch (error) {
      return error;
    }
  }
}
