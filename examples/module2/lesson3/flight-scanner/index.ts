import { ZodError } from 'zod';
import { FormSchema, FormValues } from './validationSchema';

const form = document.querySelector('#flight-form') as HTMLFormElement;
const errorContainer = document.querySelector('#errors') as HTMLUListElement;

const renderErrors = (error: ZodError) => {
  errorContainer.innerHTML = '';
  error.errors.forEach((error) => {
    const listItem = document.createElement('li');
    listItem.textContent = error.message;
    errorContainer.appendChild(listItem);
  });
};

const cleanErrors = () => {
  errorContainer.innerHTML = '';
};

const validateForm = (values: FormValues) => {
  try {
    FormSchema.parse(values);
    cleanErrors();
  } catch (error) {
    if (error instanceof ZodError) {
      renderErrors(error);
    }
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries()) as FormValues;
  validateForm(values);
});
