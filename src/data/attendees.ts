import { faker } from "@faker-js/faker";

interface attenddesProps {
  id: number;
  attenddesName: string;
  attenddesEmail: string;
  createAt: Date;
  checkedInAt: Date;
}

export const attenddes: attenddesProps[] = Array.from({ length: 234 }).map(
  () => {
    return {
      id: faker.number.int({ min: 10000, max: 20000 }),
      attenddesName: faker.person.firstName(),
      attenddesEmail: faker.internet.email().toLocaleLowerCase(),
      createAt: faker.date.recent({ days: 30 }),
      checkedInAt: faker.date.recent({ days: 7 }),
    };
  }
);
