import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { useSelector, useDispatch } from 'react-redux';
import style from './Table.module.scss';
import {
  setSearch,
  setPerPage,
  setPage,
  setSortColum,
} from '../store/searchSlics';
import { setRepositoryInfo } from '../store/repositorySlice';
import getSearch from '../store/apiSearch'; // Интерфейс для свойств компонента EnhancedTable
interface EnhancedTableProps {
  // Количество выбранных строк
  numSelected: number;
  // Функция, вызываемая при запросе сортировки
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  // Порядок сортировки (возрастающий или убывающий)
  order: Order;
  // Свойство, по которому производится сортировка
  orderBy: string;
  // Общее количество строк в таблице
  rowCount: number;
}

// Интерфейс для свойств компонента EnhancedTableToolbar
interface EnhancedTableToolbarProps {
  // Количество выбранных строк
  numSelected: number;
}

// Интерфейс для данных о репозитории
interface Data {
  // Уникальный идентификатор репозитория
  id: number;
  // Название репозитория
  name: string;
  // Язык программирования
  language: string;
  // Количество форков
  forks: number;
  // Количество звезд
  stars: number;
  // Дата создания репозитория
  date: string;
}

// Интерфейс для данных о репозитории, полученных из API
interface Repository {
  // Уникальный идентификатор репозитория
  id: number;
  // Название репозитория
  name: string;
  // Язык программирования (может быть null)
  language: string | null;
  // Количество форков
  forks: number;
  // Количество звезд
  stargazers_count: number;
  // Дата создания репозитория (строка)
  created_at: string;
}

// Тип для порядка сортировки
type Order = 'asc' | 'desc';

// Интерфейс для ячейки заголовка таблицы
interface HeadCell {
  // Флаг, указывающий, нужно ли отключить отступы
  disablePadding: boolean;
  // Ключ данных, по которому производится сортировка
  id: keyof Data;
  // Текст, отображаемый в заголовке
  label: string;
  // Флаг, указывающий, является ли ячейка числовой
  numeric: boolean;
}

// Тип для данных о репозитории, используемых в компонентах
type RepositoryData = {
  // Уникальный идентификатор репозитория
  id: number;
  // Название репозитория
  name: string;
  // Язык программирования (может быть null)
  language: string | null;
  // Количество форков
  forks: number;
  // Количество звезд
  stars: number;
  // Дата создания репозитория
  date: string;
};

export default function TableDone() {
  // Хук для получения значения wordSearch из состояния Redux
  const wordSearch = useSelector(
    // Тип состояния Redux
    (state: { reduserSearch: { wordSearch: string } }) =>
      // Получение значения wordSearch из состояния
      state.reduserSearch.wordSearch
  );

  // Хук для получения значения perPage из состояния Redux
  const perPage = useSelector(
    (state: { reduserSearch: { perPage: number } }) =>
      state.reduserSearch.perPage
  );

  // Хук для получения значения quntityRepositories из состояния Redux
  const quntityRepositories = useSelector(
    (state: { reduserSearch: { quntityRepositories: number } }) =>
      state.reduserSearch.quntityRepositories
  );

  // Хук для получения значения sortColum из состояния Redux
  const sortColum = useSelector(
    (state: { reduserSearch: { sortColum: number } }) =>
      state.reduserSearch.sortColum
  );
  // Хук для получения значения page из состояния Redux
  const page = useSelector(
    (state: { reduserSearch: { page: any } }) => state.reduserSearch.page
  );
  // Хук для получения значения search из состояния Redux
  const search = useSelector(
    (state: { reduserSearch: { search: any } }) => state.reduserSearch.search
  );
  // Состояние для порядка сортировки
  const [order, setOrder] = React.useState<Order>('asc');

  // Состояние для свойства, по которому производится сортировка
  const [orderBy, setOrderBy] = React.useState<keyof Data>('stars');

  // Хук для получения диспетчера действий Redux
  const dispatch = useDispatch();

  // Состояние для количества строк на странице
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Массив ячеек заголовка таблицы
  const headCells: readonly HeadCell[] = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Название',
    },
    {
      id: 'language',
      numeric: false,
      disablePadding: false,
      label: 'Язык',
    },
    {
      id: 'forks',
      numeric: false,
      disablePadding: false,
      label: 'Число форков',
    },
    {
      id: 'stars',
      numeric: false,
      disablePadding: false,
      label: 'Число звезд',
    },
    {
      id: 'date',
      numeric: false,
      disablePadding: false,
      label: 'Дата обновления',
    },
  ];

  // Функция, вызываемая при запросе сортировки
  const handleRequestSort = (
    // Событие, вызвавшее запрос сортировки
    event: React.MouseEvent<unknown>,
    // Свойство, по которому производится сортировка
    property: keyof Data
  ) => {
    // Функция getSearch с параметрами для поиска, сортировки, нужной страницы и порядка отображения запрашивает данные на Github API
    getSearch(
      'search/repositories?q=' +
        wordSearch +
        `&per_page=${perPage}&page=0&sort=${property}&order=${order}`
    )
      .then((res) => {
        // Отправка действия для обновления данных в таблице
        dispatch(setSearch(getDataTable(res.data.items)));
        // Отправка действия для обновления номера страницы
        dispatch(setPage(1));
        // Отправка действия для обновления свойства, по которому производится сортировка
        dispatch(setSortColum(property));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        // Определение нового порядка сортировки
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        // Обновление свойства, по которому производится сортировка
        setOrderBy(property);
        // Сброс номера страницы
        setPage(0);
      });
  };
  //Функция, обрабатывающая изменение страницы в таблице.
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    // Функция getSearch с параметрами для поиска, сортировки, нужной страници и порядка запрашивает данные на Github API
    getSearch(
      'search/repositories?q=' +
        wordSearch +
        `&per_page=${perPage}&page=${
          newPage + 1
        }&sort=${sortColum}&order=${order}`
    )
      .then((res) => {
        dispatch(setSearch(getDataTable(res.data.items)));
        dispatch(setPage(newPage + 1));
      })
      .catch((err) => console.log(err));
  };
  //Функция, обрабатывающая изменение количества строк на странице в таблице.
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Функция getSearch с параметрами для поиска, сортировки, нужной страници и порядка запрашивает данные на Github API
    getSearch(
      'search/repositories?q=' +
        wordSearch +
        `&per_page=${event.target.value}&page=${page}&sort=${sortColum}&order=${order}`
    )
      .then((res) => {
        dispatch(setSearch(getDataTable(res.data.items)));
        dispatch(setPerPage(parseInt(event.target.value, 10)));
        dispatch(setPage(1));
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  };
  // Компонент, отвечающий за отображение заголовка таблицы с возможностью сортировки.
  function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler =
      (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
      <TableHead sx={{ width: '960px' }}>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  //Компонент, отвечающий за отображение панели инструментов таблицы.
  function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;

    return (
      <Toolbar
        className={style.titleTable}
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        <Typography
          sx={{
            flex: '1 1 100%',
            fontWeight: '400',
            fontSize: '48px',
          }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Результаты поиска
        </Typography>
      </Toolbar>
    );
  }
  /** Функция, преобразующая данные о репозиториях в формат, используемый в таблице.
   *  data - массив объектов, содержащих данные о репозиториях.
   * returns - массив объектов, содержащих данные о репозиториях в формате, используемом в таблице.
   */
  function getDataTable(data: Repository[]) {
    if (data.length > 0) {
      return data.map((repository: Repository) => {
        return {
          id: repository.id,
          name: repository.name,
          language: repository.language,
          forks: repository.forks,
          stars: repository.stargazers_count,
          date: new Date(repository.created_at).toLocaleString('ru-RU'),
        };
      });
    }
    return [];
  }
  //Функция, обрабатывающая клик на репозитории в таблице.
  function handleClick(id: number) {
    getSearch(`repositories/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(setRepositoryInfo(res.data));
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  }

  return (
    <Box className={style.box}>
      <Paper className={style.paper}>
        <EnhancedTableToolbar numSelected={0} />
        <TableContainer sx={{ flexGrow: '1' }}>
          <Table
            sx={{ width: 912, marginLeft: 'auto', marginRight: '16px' }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={0}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={search.length}
            />
            <TableBody>
              {search.map((row: RepositoryData, index: number) => {
                return (
                  <TableRow
                    hover
                    onClick={() => handleClick(row.id)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.language}</TableCell>
                    <TableCell align="left">{row.forks}</TableCell>
                    <TableCell align="left">{row.stars}</TableCell>
                    <TableCell align="left">{row.date}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={quntityRepositories}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ marginTop: 'auto' }}
        />
      </Paper>
    </Box>
  );
}
