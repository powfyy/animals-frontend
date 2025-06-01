export class AnimalTypeDto {
  name: string;
  priority: number;
  attributes: { [key: string]: string[] };
}
