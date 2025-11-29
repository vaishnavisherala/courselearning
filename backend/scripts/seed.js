const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const instructor = await prisma.user.create({
    data: {
      email: 'instructor@example.com',
      passwordHash: 'changeme',
      name: 'Instructor One',
      role: 'INSTRUCTOR'
    }
  });

  const course1 = await prisma.course.create({
    data: {
      title: 'React for Beginners',
      slug: 'react-for-beginners',
      description: 'Learn the basics of React and build components.',
      shortDesc: 'Intro to React',
      priceCents: 0,
      instructorId: instructor.id,
      lessons: {
        create: [
          { title: 'Introduction', content: 'Welcome to the course', order: 1 },
          { title: 'Components', content: 'Building components', order: 2 }
        ]
      }
    }
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'Node.js Essentials',
      slug: 'nodejs-essentials',
      description: 'Server-side JavaScript with Node.js',
      shortDesc: 'Backend basics',
      priceCents: 1999,
      instructorId: instructor.id,
      lessons: {
        create: [
          { title: 'Setup', content: 'Install Node', order: 1 },
          { title: 'APIs', content: 'Create REST APIs', order: 2 }
        ]
      }
    }
  });

  console.log('Seed complete. Instructor id:', instructor.id);
  console.log('Courses created:', course1.id, course2.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
