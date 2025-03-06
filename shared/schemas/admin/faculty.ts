import { z } from 'zod';

import { Status } from '@/shared/enum';
import { adminPageQuerySchema, dateStringSchema } from '../base-schema';
import { schoolSchema } from './school';

export const facultySchema = z.object({
  id: z.string(),
  name: z.string(),
  nameCN: z.string().nullable(),
  shortName: z.string(),
  schoolId: z.string(),
  school: schoolSchema,
  status: z.nativeEnum(Status),
  logoPath: z.string().nullable(),
  weight: z.number().default(0),
  programCount: z.number().default(0),
  createdAt: dateStringSchema,
  updatedAt: dateStringSchema,
});

export const createFacultySchema = z.object({
  name: z.string().min(1, '请输入学院名称'),
  nameCN: z.string().min(1, '请输入中文名'),
  shortName: z.string().min(1, '请输入简称'),
  schoolId: z.string().min(1, '请选择所属学校'),
  logoPath: z.string().optional(),
  weight: z.number().optional(),
  status: z.nativeEnum(Status).optional(),
});

export const updateFacultySchema = createFacultySchema;

export const facultyQuerySchema = z
  .object({
    keyword: z.string().optional(),
    schoolId: z.string().optional(),
    status: z.nativeEnum(Status).optional(),
  })
  .merge(adminPageQuerySchema);

export const listFacultySchema = z.object({
  items: z.array(facultySchema),
  total: z.number(),
});
