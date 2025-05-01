import { AnimalStatusType } from "../type/AnimalStatusType";
import { GenderType } from "../type/GenderType";

export class AnimalSaveDto {
  id?: number;
  name: string;
  gender: GenderType;
  type: string;
  birthDay: string;
  breed?: string;
  status?: AnimalStatusType;
  description?: string;
  organizationUsername: string;
  userUsername?: string;
  attributes: { [key: string]: string };

  constructor() {}
}