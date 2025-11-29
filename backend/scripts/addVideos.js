const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main(){
  console.log('Adding demo video URLs to lessons...');
  const lessons = await prisma.lesson.findMany();
  if(lessons.length === 0){
    console.log('No lessons found.');
    return;
  }
  const demoUrl = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
  for(const l of lessons){
    if(!l.videoUrl){
      await prisma.lesson.update({ where: { id: l.id }, data: { videoUrl: demoUrl } });
      console.log('Set video for lesson', l.id);
    } else {
      console.log('Lesson already has video:', l.id);
    }
  }
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
