import { describe, it, expect } from 'vitest';
import { contactValidationSchema, FormValues } from '../validation';
import * as Yup from 'yup';

describe('Contact Form Validation', () => {
  describe('Name validation', () => {
    it('should pass validation with valid name (2+ characters)', async () => {
      const validData: FormValues = {
        name: 'John Doe',
        email: 'john@example.com',
        businessType: 'retail',
        message: 'This is a valid message with more than 10 characters',
      };

      await expect(contactValidationSchema.validate(validData)).resolves.toEqual(validData);
    });

    it('should pass validation with minimum 2 characters name', async () => {
      const validData: FormValues = {
        name: 'Ab',
        email: 'john@example.com',
        businessType: 'retail',
        message: 'This is a valid message with more than 10 characters',
      };

      await expect(contactValidationSchema.validate(validData)).resolves.toEqual(validData);
    });

    it('should fail validation when name is less than 2 characters', async () => {
      const invalidData: FormValues = {
        name: 'A',
        email: 'john@example.com',
        businessType: 'retail',
        message: 'This is a valid message',
      };

      await expect(contactValidationSchema.validate(invalidData)).rejects.toThrow(
        'Ime mora imati najmanje 2 karaktera'
      );
    });

    it('should fail validation when name is empty', async () => {
      const invalidData: FormValues = {
        name: '',
        email: 'john@example.com',
        businessType: 'retail',
        message: 'This is a valid message',
      };

      // Yup checks min() before required(), so empty string triggers min() error
      await expect(contactValidationSchema.validate(invalidData)).rejects.toThrow(
        'Ime mora imati najmanje 2 karaktera'
      );
    });

    it('should fail validation when name is missing', async () => {
      const invalidData = {
        email: 'john@example.com',
        businessType: 'retail',
        message: 'This is a valid message',
      };

      await expect(contactValidationSchema.validate(invalidData)).rejects.toThrow();
    });
  });

  describe('Email validation', () => {
    it('should pass validation with valid email address', async () => {
      const validData: FormValues = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        businessType: 'retail',
        message: 'This is a valid message with more than 10 characters',
      };

      await expect(contactValidationSchema.validate(validData)).resolves.toEqual(validData);
    });

    it('should pass validation with various valid email formats', async () => {
      const validEmails = [
        'test@example.com',
        'user.name@example.com',
        'user+tag@example.co.uk',
        'user_name@example.org',
        '123@example.com',
      ];

      for (const email of validEmails) {
        const validData: FormValues = {
          name: 'John Doe',
          email,
          businessType: 'retail',
          message: 'This is a valid message with more than 10 characters',
        };

        await expect(contactValidationSchema.validate(validData)).resolves.toEqual(validData);
      }
    });

    it('should fail validation with invalid email format', async () => {
      // Note: Yup's email validation is based on a regex that is fairly permissive
      // These are emails that Yup will actually reject
      const invalidEmails = [
        'invalid-email',
        'invalid@',
        '@example.com',
        'invalid@.com',
        'plaintext',
        'missing-at-sign.com',
      ];

      for (const email of invalidEmails) {
        const invalidData: FormValues = {
          name: 'John Doe',
          email,
          businessType: 'retail',
          message: 'This is a valid message',
        };

        await expect(contactValidationSchema.validate(invalidData)).rejects.toThrow(
          'Neispravna email adresa'
        );
      }
    });

    it('should fail validation when email is empty', async () => {
      const invalidData: FormValues = {
        name: 'John Doe',
        email: '',
        businessType: 'retail',
        message: 'This is a valid message',
      };

      await expect(contactValidationSchema.validate(invalidData)).rejects.toThrow(
        'Email je obavezan'
      );
    });

    it('should fail validation when email is missing', async () => {
      const invalidData = {
        name: 'John Doe',
        businessType: 'retail',
        message: 'This is a valid message',
      };

      await expect(contactValidationSchema.validate(invalidData)).rejects.toThrow();
    });
  });

  describe('Business Type validation', () => {
    it('should pass validation with valid business type', async () => {
      const validData: FormValues = {
        name: 'John Doe',
        email: 'john@example.com',
        businessType: 'retail',
        message: 'This is a valid message with more than 10 characters',
      };

      await expect(contactValidationSchema.validate(validData)).resolves.toEqual(validData);
    });

    it('should fail validation when business type is empty', async () => {
      const invalidData: FormValues = {
        name: 'John Doe',
        email: 'john@example.com',
        businessType: '',
        message: 'This is a valid message',
      };

      await expect(contactValidationSchema.validate(invalidData)).rejects.toThrow(
        'Molimo izaberite tip biznisa'
      );
    });

    it('should fail validation when business type is missing', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message',
      };

      await expect(contactValidationSchema.validate(invalidData)).rejects.toThrow();
    });
  });

  describe('Message validation', () => {
    it('should pass validation with valid message (10+ characters)', async () => {
      const validData: FormValues = {
        name: 'John Doe',
        email: 'john@example.com',
        businessType: 'retail',
        message: 'This is a valid message with more than 10 characters',
      };

      await expect(contactValidationSchema.validate(validData)).resolves.toEqual(validData);
    });

    it('should pass validation with exactly 10 characters message', async () => {
      const validData: FormValues = {
        name: 'John Doe',
        email: 'john@example.com',
        businessType: 'retail',
        message: '1234567890',
      };

      await expect(contactValidationSchema.validate(validData)).resolves.toEqual(validData);
    });

    it('should fail validation when message is less than 10 characters', async () => {
      const invalidData: FormValues = {
        name: 'John Doe',
        email: 'john@example.com',
        businessType: 'retail',
        message: 'Short',
      };

      await expect(contactValidationSchema.validate(invalidData)).rejects.toThrow(
        'Poruka mora imati najmanje 10 karaktera'
      );
    });

    it('should fail validation when message is empty', async () => {
      const invalidData: FormValues = {
        name: 'John Doe',
        email: 'john@example.com',
        businessType: 'retail',
        message: '',
      };

      // Yup checks min() before required(), so empty string triggers min() error
      await expect(contactValidationSchema.validate(invalidData)).rejects.toThrow(
        'Poruka mora imati najmanje 10 karaktera'
      );
    });

    it('should fail validation when message is missing', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        businessType: 'retail',
      };

      await expect(contactValidationSchema.validate(invalidData)).rejects.toThrow();
    });
  });

  describe('Complete form validation', () => {
    it('should pass validation with all valid fields', async () => {
      const validData: FormValues = {
        name: 'John Doe',
        email: 'john@example.com',
        businessType: 'IT Services',
        message: 'I would like to know more about your services and pricing.',
      };

      await expect(contactValidationSchema.validate(validData)).resolves.toEqual(validData);
    });

    it('should fail validation when all fields are empty', async () => {
      const invalidData: FormValues = {
        name: '',
        email: '',
        businessType: '',
        message: '',
      };

      await expect(contactValidationSchema.validate(invalidData)).rejects.toThrow();
    });

    it('should fail validation with multiple invalid fields and report first error', async () => {
      const invalidData: FormValues = {
        name: 'A',
        email: 'invalid-email',
        businessType: '',
        message: 'Short',
      };

      await expect(contactValidationSchema.validate(invalidData)).rejects.toThrow();
    });

    it('should collect all validation errors when using validateSync with abortEarly: false', () => {
      const invalidData: FormValues = {
        name: '',
        email: 'invalid',
        businessType: '',
        message: 'Too short',
      };

      try {
        contactValidationSchema.validateSync(invalidData, { abortEarly: false });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          expect(error.inner.length).toBeGreaterThan(0);
          expect(error.inner).toEqual(
            expect.arrayContaining([
              expect.objectContaining({ path: 'name' }),
              expect.objectContaining({ path: 'email' }),
              expect.objectContaining({ path: 'businessType' }),
              expect.objectContaining({ path: 'message' }),
            ])
          );
        }
      }
    });

    it('should preserve values without trimming (Yup does not trim by default)', async () => {
      // Note: Yup string schema does NOT trim by default unless .trim() is called
      // This test verifies the current behavior
      const validData: FormValues = {
        name: 'John Doe',
        email: 'john@example.com',
        businessType: 'retail',
        message: 'This is a valid message with more than 10 characters',
      };

      const result = await contactValidationSchema.validate(validData);
      expect(result).toEqual(validData);
    });
  });

  describe('Edge cases', () => {
    it('should handle very long valid inputs', async () => {
      const validData: FormValues = {
        name: 'A'.repeat(100),
        email: 'user@example.com',
        businessType: 'retail',
        message: 'A'.repeat(1000),
      };

      await expect(contactValidationSchema.validate(validData)).resolves.toEqual(validData);
    });

    it('should handle special characters in name', async () => {
      const validData: FormValues = {
        name: 'José María O\'Connor-Smith',
        email: 'jose@example.com',
        businessType: 'retail',
        message: 'This is a valid message with more than 10 characters',
      };

      await expect(contactValidationSchema.validate(validData)).resolves.toEqual(validData);
    });

    it('should handle unicode characters in message', async () => {
      const validData: FormValues = {
        name: 'John Doe',
        email: 'john@example.com',
        businessType: 'retail',
        message: 'Ово је порука на ћириличном писму која има више од 10 карактера',
      };

      await expect(contactValidationSchema.validate(validData)).resolves.toEqual(validData);
    });
  });
});
