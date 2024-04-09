import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useEffect, useState } from "react";

dayjs.locale("pt-br");
dayjs.extend(relativeTime);

interface ResultAttendees {
  attendees: AttendeesProps[];
  total: number;
}

interface AttendeesProps {
  checkedInAt: string | null;
  createdAt: string;
  email: string;
  id: number;
  name: string;
}

export function AttendeeList() {
  const [attendees, setAttendees] = useState<AttendeesProps[]>([]);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page"))
      return Number(url.searchParams.get("page"));

    return 1;
  });

  const [valuesSearchInput, setValuesSearchInput] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("seach"))
      return url.searchParams.get("seach") ?? "";

    return "";
  });

  const totalPages = Math.ceil(total / 10);

  useEffect(() => {
    const url = new URL(
      "http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees"
    );

    url.searchParams.set("pageIndex", String(page - 1));
    url.searchParams.set("query", valuesSearchInput);

    fetch(url)
      .then((response) => response.json())
      .then((data: ResultAttendees) => {
        setAttendees(data.attendees), setTotal(data.total);
      });
  }, [page, valuesSearchInput]);

  function onSeachInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());

    url.searchParams.set("page", String(page));

    window.history.pushState({}, "", url);

    setPage(page);
  }

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());

    url.searchParams.set("seach", String(search));

    window.history.pushState({}, "", url);

    setValuesSearchInput(search);
  }

  function goToFistPage() {
    setCurrentPage(1);
  }

  function goToNextPage() {
    setCurrentPage(page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1);
  }

  function goToLastPage() {
    setCurrentPage(totalPages);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 bg-transparent rounded-lg text-sm flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            onChange={onSeachInputChanged}
            value={valuesSearchInput}
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
            placeholder="Buscar participantes..."
          />
        </div>
      </div>

      <div className="border border-white/10 rounded">
        <Table>
          <thead>
            <TableRow className="border-b border-white/10">
              <TableHeader style={{ width: 48 }}>
                <input
                  type="checkbox"
                  className="size-4 bg-black/20 rounded border border-white/10 focus:ring-0"
                />
              </TableHeader>
              <TableHeader>código</TableHeader>
              <TableHeader>Participante</TableHeader>
              <TableHeader>Data de inscrição</TableHeader>
              <TableHeader>Data do check-in</TableHeader>
              <TableHeader style={{ width: 64 }}></TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {attendees.map((attendee) => {
              return (
                <TableRow
                  key={attendee.id}
                  className="border-b border-white/10 hover:bg-white/5"
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      className="size-4 bg-black/20 rounded border border-white/10 focus:ring-0"
                    />
                  </TableCell>
                  <TableCell>{attendee.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">
                        {attendee.name}
                      </span>
                      <span>{attendee.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                  <TableCell>
                    {attendee.checkedInAt === null ? (
                      <span className="text-zinc-400">Não fez check-in</span>
                    ) : (
                      dayjs().to(attendee.checkedInAt)
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton trasparent>
                      <MoreHorizontal className="size-4" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </tbody>
          <tfoot>
            <TableRow>
              <TableCell colSpan={3}>
                Mostrando {attendees.length} de {total} itens
              </TableCell>
              <TableCell colSpan={3} className="text-right">
                <div className="inline-flex items-center gap-8">
                  <span>
                    Página {page} de {totalPages}
                  </span>
                  <div className="flex gap-1.5">
                    <IconButton disabled={page === 1} onClick={goToFistPage}>
                      <ChevronsLeft className="size-4" />
                    </IconButton>{" "}
                    <IconButton
                      disabled={page === 1}
                      onClick={goToPreviousPage}
                    >
                      <ChevronLeft className="size-4" />
                    </IconButton>{" "}
                    <IconButton
                      disabled={page === totalPages}
                      onClick={goToNextPage}
                    >
                      <ChevronRight className="size-4" />
                    </IconButton>{" "}
                    <IconButton
                      disabled={page === totalPages}
                      onClick={goToLastPage}
                    >
                      <ChevronsRight className="size-4" />
                    </IconButton>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </tfoot>
        </Table>
      </div>
    </div>
  );
}
