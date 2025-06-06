import { AnimalStatusType } from "../type/animal/AnimalStatusType";
import { GenderType } from "../type/animal/GenderType";

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
  adoptionRequestUserUsernames: string[]
  constructor() {}
}
