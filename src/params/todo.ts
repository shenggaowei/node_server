import { IsDateString, IsNotEmpty } from 'class-validator';

export class TodoBody {
    @IsNotEmpty()
    content: string;

    description: string;

    @IsDateString()
    endTime: string;

    tagsId: string;

    groupId: number;
}