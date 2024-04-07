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
import { ChangeEvent, useState } from "react";
import { attenddes } from "../data/attendees";

dayjs.locale("pt-br");
dayjs.extend(relativeTime);

export function AttendeeList() {
  const [valuesSearchInput, setValuesSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.round(attenddes.length / 10)

  function onSeachInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setValuesSearchInput(event.target.value);
  }

  function goToFistPage() {
    setCurrentPage(1);
  }

  function goToNextPage() {
    setCurrentPage(currentPage + 1);
  }

  function goToPreviousPage() {
    setCurrentPage(currentPage - 1);
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
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"
            placeholder="Buscar participantes..."
          />
        </div>
        {valuesSearchInput}
      </div>

      <div className="border border-white/10 rounded">
        <Table>
          <thead>
            <TableRow className="border-b border-white/10">
              <TableHeader style={{ width: 48 }}>
                <input
                  type="checkbox"
                  className="size-4 bg-black/20 rounded border border-white/10 "
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
            {attenddes
              .slice((currentPage - 1) * 10, currentPage * 10)
              .map((attendee) => {
                return (
                  <TableRow
                    key={attendee.id}
                    className="border-b border-white/10 hover:bg-white/5"
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        className="size-4 bg-black/20 rounded border border-white/10 "
                      />
                    </TableCell>
                    <TableCell>{attendee.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-white">
                          {attendee.attenddesName}
                        </span>
                        <span>{attendee.attenddesEmail}</span>
                      </div>
                    </TableCell>
                    <TableCell>{dayjs().to(attendee.createAt)}</TableCell>
                    <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
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
                Mostrando 10 de {attenddes.length} itens
              </TableCell>
              <TableCell colSpan={3} className="text-right">
                <div className="inline-flex items-center gap-8">
                  <span>
                    Página {currentPage} de {totalPages}
                  </span>
                  <div className="flex gap-1.5">
                    <IconButton
                      disabled={currentPage === 1}
                      onClick={goToFistPage}
                    >
                      <ChevronsLeft className="size-4" />
                    </IconButton>{" "}
                    <IconButton
                      disabled={currentPage === 1}
                      onClick={goToPreviousPage}
                    >
                      <ChevronLeft className="size-4" />
                    </IconButton>{" "}
                    <IconButton
                      disabled={
                        currentPage === totalPages
                      }
                      onClick={goToNextPage}
                    >
                      <ChevronRight className="size-4" />
                    </IconButton>{" "}
                    <IconButton
                      disabled={
                        currentPage === totalPages
                      }
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
