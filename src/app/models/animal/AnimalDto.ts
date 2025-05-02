export class AnimalDto {
  id: number;
  name: string;
  gender: string;
  type: string;
  birthDay: string;
  breed: string;
  description: string;
  status: string;
  photoRefs: string[];
  city: string;
  organizationName: string;
  organizationUsername: string;
  attributes: Map<string, string>;
}
