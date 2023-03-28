import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

enum CommentTypeDTO {
  PRIVATE = 'private',
  MODERATION = 'moderation',
}

export class CommentDto {
  @IsNotEmpty()
  @IsNumber()
  line: number;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsString()
  text: string;
  @IsNotEmpty()
  @IsString()
  @IsEnum(CommentTypeDTO)
  type: CommentTypeDTO;
  @IsNotEmpty()
  @IsString()
  tractate: string;
  @IsNotEmpty()
  @IsNumber()
  subline: number;
}

export class UpdateCommentDto extends CommentDto {
  @IsNotEmpty()
  @IsString()
  commentID: string;
}
