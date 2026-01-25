# Contact Form Validation Tests

This directory contains comprehensive validation tests for the contact form using Vitest.

## Test Coverage

The validation tests cover all form fields with the following validation rules:

### Name Field
- ✅ Minimum 2 characters required
- ✅ Field is required
- ✅ Handles special characters and unicode
- ✅ Empty string validation

### Email Field
- ✅ Valid email format required
- ✅ Field is required
- ✅ Tests multiple valid email formats
- ✅ Rejects invalid email formats
- ✅ Empty string validation

### Business Type Field
- ✅ Field is required
- ✅ Cannot be empty

### Message Field
- ✅ Minimum 10 characters required
- ✅ Field is required
- ✅ Empty string validation
- ✅ Handles unicode characters

### Complete Form Tests
- ✅ All valid fields pass validation
- ✅ All empty fields fail validation
- ✅ Multiple validation errors collected
- ✅ Edge cases (very long inputs, special characters)

## Running Tests

```bash
# Run tests in watch mode
yarn test

# Run tests once
yarn test:run

# Run tests with UI
yarn test:ui

# Run tests with coverage
yarn test:coverage
```

## Test Statistics

- **Total Tests**: 26
- **Test Suites**: 7 describe blocks
- **Coverage**: All validation rules from `src/contact/validation.ts`

## Notes

- Yup validates `min()` before `required()`, so empty strings trigger minimum length errors
- Yup's email validation is permissive and follows standard email regex patterns
- Tests verify actual Yup behavior, not theoretical edge cases
