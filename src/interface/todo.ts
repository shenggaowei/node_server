import type { IVerifyAuthInfo } from "./auth";

export interface ITodoModel {
    content: string;
    description: string;
    end_time: string;
    tag_ids: string;
    group_id: number
}

export interface ITodoCreateParams extends IVerifyAuthInfo {
    content: string;
    description: string;
    endTime: string;
    tagIds: string;
    groupId: number;
}