import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useState } from "react";

export function AttendeeList() {
  const [valuesSearchInput, setValuesSearchInput] = useState("");

  function onSeachInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setValuesSearchInput(event.target.value);
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
            {Array.from({ length: 10 }).map((_, index) => {
              return (
                <TableRow
                  key={index}
                  className="border-b border-white/10 hover:bg-white/5"
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      className="size-4 bg-black/20 rounded border border-white/10 "
                    />
                  </TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">
                        Best animes cortes
                      </span>
                      <span>Best animes cortes@gmail.com</span>
                    </div>
                  </TableCell>
                  <TableCell>7 dias atrás</TableCell>
                  <TableCell>3 dias atrás</TableCell>
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
              <TableCell colSpan={3}>Mostrando 10 de 228 itens</TableCell>
              <TableCell colSpan={3} className="text-right">
                <div className="inline-flex items-center gap-8">
                  <span>Página 1 de 23</span>
                  <div className="flex gap-1.5">
                    <IconButton>
                      <ChevronsLeft className="size-4" />
                    </IconButton>{" "}
                    <IconButton>
                      <ChevronLeft className="size-4" />
                    </IconButton>{" "}
                    <IconButton>
                      <ChevronRight className="size-4" />
                    </IconButton>{" "}
                    <IconButton>
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
