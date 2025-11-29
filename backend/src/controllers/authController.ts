import { Request, Response } from 'express';
import prisma from '../prismaClient';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';
export async function register(req:Request,res:Response){
  const { email, password, name } = req.body;
  if(!email || !password) return res.status(400).json({ message:'email+password required' });
  const existing = await prisma.user.findUnique({ where: { email } });
  if(existing) return res.status(400).json({ message:'User exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, passwordHash, name }});
  return res.json({ id: user.id, email: user.email, name: user.name });
}
export async function login(req:Request,res:Response){
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if(!user) return res.status(401).json({ message:'Invalid' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if(!ok) return res.status(401).json({ message:'Invalid' });
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  return res.json({ token, user: { id:user.id, email:user.email, name:user.name }});
}
