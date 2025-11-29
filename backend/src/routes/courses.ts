import { Router } from 'express';
import { listCourses, getCourse, createCourse } from '../controllers/courseController';
const router = Router();
router.get('/', listCourses);
router.get('/:slug', getCourse);
router.post('/', createCourse);
export default router;
