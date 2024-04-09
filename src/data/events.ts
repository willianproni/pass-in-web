import { faker } from "@faker-js/faker";

interface EventsProps {
  id: string;
  title: string;
  location: string;
  date: Date;
  img: string;
  price: string;
}

export const events: EventsProps[] = Array.from({ length: 10 }).map(() => {
  return {
    id: String(faker.number.int({ min: 1000000 })),
    title: faker.person.fullName(),
    location: faker.location.country(),
    date: faker.date.future(),
    img: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
    price: faker.finance.amount(),
  };
});
