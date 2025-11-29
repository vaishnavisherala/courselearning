import { Request, Response } from 'express';
import prisma from '../prismaClient';
function slugify(s:string){ return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
export async function listCourses(req:Request,res:Response){
  const courses = await prisma.course.findMany({ include: { instructor: true } });
  const out = courses.map(c=>({ id:c.id, title:c.title, shortDesc:c.shortDesc, slug:c.slug, instructorName: c.instructor?.name }));
  res.json(out);
}
export async function getCourse(req:Request,res:Response){
  const slug = req.params.slug;
  const course = await prisma.course.findUnique({ where: { slug }, include: { lessons: true, instructor: true } });
  if(!course) return res.status(404).json({ message:'Not found' });
  res.json(course);
}
export async function createCourse(req:Request,res:Response){
  const { title, description, shortDesc } = req.body;
  if(!title) return res.status(400).json({ message:'title required' });
  const slug = slugify(title) + '-' + Math.random().toString(36).slice(2,7);
  const course = await prisma.course.create({ data: {
    title, description: description || '', shortDesc: shortDesc || '', slug, instructorId: req.body.instructorId || '00000000-0000-0000-0000-000000000000'
  }});
  res.json(course);
}
