import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  // Clear existing data
  await prisma.playlist.deleteMany();
  await prisma.user.deleteMany();

  for (let i = 0; i < 3; i++) {
    const user = await prisma.user.create({
      data: {
        username: faker.animal.type(),
        playlists: {
          create: Array.from({ length: 5 }).map(() => ({
            name: faker.lorem.words(1),
            description: faker.lorem.lines(2),
          })),
        },
      },
    });
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
