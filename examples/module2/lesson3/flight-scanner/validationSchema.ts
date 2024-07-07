import { z } from 'zod';

const ERROR_MESSAGES = {
  ORIGIN_REQUIRED: 'Origin is required',
  DESTINATION_REQUIRED: 'Destination is required',
  START_DATE_FORMAT: 'Start date must have format DD-MM-YYYY',
  END_DATE_FORMAT: 'End date must have format DD-MM-YYYY',
  END_DATE_REQUIRED: 'End date is required',
};

const dateRegex = /^\d{2}-\d{2}-\d{4}$/;

export const FormSchema = z
  .object({
    origin: z.string().min(1, { message: ERROR_MESSAGES.ORIGIN_REQUIRED }),
    destination: z
      .string()
      .min(1, { message: ERROR_MESSAGES.DESTINATION_REQUIRED }),
    startDate: z.string().regex(dateRegex, {
      message: ERROR_MESSAGES.START_DATE_FORMAT,
    }),
    endDate: z.string().regex(dateRegex, {
      message: ERROR_MESSAGES.START_DATE_FORMAT,
    }),
    trip: z.enum(['one-way', 'round-trip']),
  })
  .superRefine((data, ctx) => {
    if (data.trip === 'round-trip') {
      if (new Date(data.endDate) < new Date(data.startDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'End date must be after start date',
          path: ['endDate'],
        });
      }
      if (data.endDate === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'End date is required',
        });
      }
    }
    return {};
  });

export type FormValues = z.infer<typeof FormSchema>;
