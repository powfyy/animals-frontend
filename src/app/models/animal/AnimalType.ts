export interface AnimalTypeDto {
  name: string;
  priority: number;
  attributes: { [key: string]: Set<string> };
}
