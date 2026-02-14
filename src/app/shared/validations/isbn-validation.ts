import {SchemaPath, validate} from '@angular/forms/signals';



export class IsbnValidation {

  static IsValidIsbn(path: SchemaPath<string | null>, options?: {message?: string}) {
    validate(path, ({value}) => {
      if (!IsbnValidation.validateIsbn(value())) {
        return {
          kind: 'isbn',
          message: options?.message || 'Format ISBN-13 invalide',
        };
      }
      return null;
    });
  }



  private static validateIsbn(isbn: string | null): boolean {
    if (!isbn) return false;
    if (isbn.length === 13) {

      return this.isValidISBN13(isbn);
    } else {
      return false;
    }
  }

  private static isValidISBN13(isbn: string): boolean {
    if (!/^97[89]\d{10}$/.test(isbn)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(isbn[i]);
      sum += digit * (i % 2 === 0 ? 1 : 3);
    }

    const checkDigit = (10 - (sum % 10)) % 10;

    return checkDigit === parseInt(isbn[12]);
  }
}

