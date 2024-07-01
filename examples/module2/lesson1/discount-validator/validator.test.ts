import { describe, expect, test } from 'vitest';
import { formValidator } from './validator';

describe('Form validation', () => {
  test('should return an error if first name is missing', () => {
    const errors = formValidator('', 'Doe', 30);
    expect(errors).toContain('First name is required');
  });

  test('should return an error if last name is missing', () => {
    const errors = formValidator('John', '', 30);
    expect(errors).toContain('Last name is required');
  });

  test('should return an error if age is negative', () => {
    const errors = formValidator('John', 'Doe', -1);
    expect(errors).toContain('Age must be a positive number');
  });

  test('should return no errors if all fields are valid', () => {
    const errors = formValidator('John', 'Doe', 30);
    expect(errors).toEqual([]);
  });

  test('should return error if first name or last name is not at least 1 character long', () => {
    const errors = formValidator('', '', 30);
    expect(errors).toContain('First name must be at least 1 character long');
    expect(errors).toContain('Last name must be at least 1 character long');

    const noErrors = formValidator('J', 'D', 30);
    expect(noErrors).not.contain(
      'First name must be at least 1 character long'
    );
    expect(noErrors).not.contain('Last name must be at least 1 character long');
  });

  test('should return an error if age is not a number', () => {
    const errors = formValidator('John', 'Doe', NaN);
    expect(errors).toContain('Age must be a number');
  });
});
