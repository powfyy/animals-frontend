import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FindAgeAnimalService {

  constructor() { }

  getAge(birthDateString: string): string {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();

    let ageYear = todayYear - birthYear;
    let ageMonth = todayMonth - birthMonth + 1;
    let ageDay = todayDay - birthDay;

    if (ageDay < 0) {
      ageMonth--;
      const daysInMonth = new Date(todayYear, todayMonth, 0).getDate();
      ageDay += daysInMonth;
    }

    if (ageMonth < 0) {
      ageYear--;
      ageMonth += 12;
    }

    let ageString = '';
    if (ageYear > 0) {
      ageString += ageYear + ' год';
      if (ageYear > 1 && ageYear < 5) {
        ageString += 'а';
      } else if (ageYear >= 5) {
        ageString =ageYear+ ' лет';
      }
    }

    if (ageMonth > 0) {
      if (ageString) {
        ageString += ' ';
      }
      ageString += ageMonth + ' месяц';
      if (ageMonth > 1 && ageMonth < 5) {
        ageString += 'а';
      } else if (ageMonth >= 5) {
        ageString += 'ев';
      }
    }

    if (!ageString) {
      ageString = 'меньше месяца';
    }

    return ageString;
  }
}
