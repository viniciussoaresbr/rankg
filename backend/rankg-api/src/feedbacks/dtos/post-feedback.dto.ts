import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class PostFeedbackDto {
  @IsInt({ message: 'O ID do jogo deve ser um número inteiro.' })
  gameId: number;

  @IsString()
  @IsNotEmpty({ message: 'O nome do usuário é obrigatório.' })
  userName: string;

  @IsString()
  @IsNotEmpty({ message: 'O comentário não pode estar vazio.' })
  comment: string;

  @IsInt()
  @Min(1, { message: 'A nota mínima é 1.' })
  @Max(5, { message: 'A nota máxima é 5.' })
  rating: number;
}
