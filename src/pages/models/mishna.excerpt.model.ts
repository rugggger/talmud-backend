import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export interface iSelection {
  fromLine: number;
  fromSubline?: number;
  fromWord: string;
  fromOffset: number;
  toLine: number;
  toSubline?: number;
  toWord: string;
  toOffset: number;
}
export class MishnaExcerpt {
  key: number;
  type: string;
  @IsBoolean()
  seeReference: boolean;
  @IsNotEmpty()
  @IsString()
  source: Record<string, unknown>;;
  @IsString()
  sourceLocation: string;
  editorStateFullQuote: Record<string, unknown>;
  editorStateShortQuote : Record<string, unknown>;
  @IsString()
  synopsis: string;
  editorStateComments:Record<string, unknown>;
  selection: iSelection;
  automaticImport?: boolean;

};


