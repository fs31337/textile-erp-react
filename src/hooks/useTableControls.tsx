import { useState, useMemo } from "react";

interface UseTableControlsConfig<T> {
  initialRowsPerPage?: number;
  columns: (keyof T)[];
}

interface UseTableControlsResult<T> {
  searchText: string;
  setSearchText: (text: string) => void;
  paginatedData: T[];
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filteredCount: number;
}

export const useTableControls = <T,>(
  data: T[],
  config: UseTableControlsConfig<T>
): UseTableControlsResult<T> => {
  const { initialRowsPerPage = 5, columns } = config;
  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(initialRowsPerPage);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      columns.some((column) => {
        const cellValue = item[column];
        return (
          cellValue &&
          cellValue.toString().toLowerCase().includes(searchText.toLowerCase())
        );
      })
    );
  }, [data, columns, searchText]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredData, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    searchText,
    setSearchText,
    paginatedData,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    filteredCount: filteredData.length,
  };
};
