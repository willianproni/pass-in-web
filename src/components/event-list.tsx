import { Search } from "lucide-react";
import { CardEvent } from "./card-event";
import { EventsProps, events } from "../data/events";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import { ChangeEvent, useEffect, useState } from "react";

dayjs.locale("pt-br");
dayjs.extend(relativeTime);

export function EventList() {
  const [eventList, setEventsList] = useState<EventsProps[]>([]);
  const [valueSearch, setValueSearch] = useState("");

  function getEventsList() {
    setEventsList(events);
  }

  function onSeachInputChanged(value: ChangeEvent<HTMLInputElement>) {
    setValueSearch(value.target.value);
  }

  function filterEventFromValuesSearch() {
    return eventList.filter((event) => event.title.includes(valueSearch));
  }

  useEffect(() => {
    getEventsList();
  }, []);

  return (
    <div className=" flex flex-col gap-4 ">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Eventos</h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 bg-transparent rounded-lg text-sm flex items-center gap-3">
          <Search className="size-4 text-emerald-400" />
          <input
            onChange={onSeachInputChanged}
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
            type="text"
            placeholder="Buscar eventos..."
          />
        </div>
      </div>
      <div className="py-4 flex flex-col gap-4">
        {filterEventFromValuesSearch().map((event) => {
          return (
            <CardEvent
              key={event.id}
              id={event.id}
              title={event.title}
              date={dayjs().to(event.date)}
              location={event.location}
              price={event.price}
              img={event.img}
            />
          );
        })}
      </div>
    </div>
  );
}
