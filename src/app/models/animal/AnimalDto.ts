import { AnimalStatusType } from "../type/animal/AnimalStatusType";
import { GenderType } from "../type/animal/GenderType";

export class AnimalDto {
  id: number;
  name: string;
  gender: GenderType;
  type: string;
  birthDay: string;
  breed: string;
  description: string;
  status: AnimalStatusType;
  photoRefs: string[];
  city: string;
  organizationName: string;
  organizationUsername: string;
  attributes: { [key: string]: string };
}
