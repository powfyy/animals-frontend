import { GenderType } from "../type/GenderType";

export class AnimalFilterDto {

  name: string | null = null;
  type: string | null = null;
  gender: GenderType | null = null;
  city: string | null = null;
  organizationName: string | null = null;
}