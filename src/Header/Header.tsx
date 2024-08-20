import { TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import style from './Header.module.scss';
import getSearch from '../store/apiSearch';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearch,
  setIsLoad,
  setWordSearch,
  setQuntityRepositories,
  setSortColum,
} from '../store/searchSlics';

//Интерфейс, описывающий структуру данных о репозитории.

interface Repository {
  id: number;
  name: string;
  language: string | null;
  forks: number;
  stargazers_count: number;
  created_at: string;
}

// Тип, описывающий структуру данных о репозитории, используемую в таблице.

type RepositoryData = {
  id: number;
  name: string;
  language: string | null;
  forks: number;
  stars: number;
  date: string;
};

/**
 * Тип функции, используемой для обработки отправки формы.
 */
type SubmitHandle<T> = (data: T) => void | Promise<void>;

// Интерфейс, описывающий структуру данных формы.

interface FormValues {
  valueSerch: string;
}

// Компонент, отвечающий за отображение шапки страницы с полем поиска.

export default function Header() {
  // Получение методов и состояния формы с помощью react-hook-form.

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  // Получение функции отправки действий в Redux.

  const dispatch = useDispatch();

  // Получение значения `perPage` из состояния Redux.
  // `perPage` - количество репозиториев, отображаемых на странице.

  const perPage = useSelector(
    (state: { reduserSearch: { perPage: any } }) => state.reduserSearch.perPage
  );

  /**
   * Функция, преобразующая данные о репозиториях в формат, используемый в таблице.
   * param data - массив объектов, содержащих данные о репозиториях.
   * returns - массив объектов, содержащих данные о репозиториях в формате, используемом в таблице.
   */
  function getDataTable(data: Repository[]): RepositoryData[] {
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

  /**
   * Функция, обрабатывающая отправку формы.
   * param data - объект, содержащий данные, введенные в форму.
   */
  const onSubmit: SubmitHandle<FormValues> = (data) => {
    dispatch(setIsLoad(true));
    dispatch(setWordSearch(data.valueSerch));
    getSearch(
      'search/repositories?q=' +
        data.valueSerch +
        `&per_page=${perPage}&page=0&sort=best-match`
    )
      .then((res) => {
        dispatch(setSearch(getDataTable(res.data.items)));
        dispatch(setQuntityRepositories(res.data.total_count));
        dispatch(setSortColum('best-match'));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(setIsLoad(false));
      });
  };

  return (
    <header className={style.header}>
      <div className={style.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <Controller
            name="valueSerch"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                size="small"
                error={!!errors.valueSerch}
                helperText={errors.valueSerch ? 'This field is required' : null}
                placeholder="Поисковый запрос"
                className={style.field}
              />
            )}
          />
          <Button type="submit" variant="contained">
            Искать
          </Button>
        </form>
      </div>
    </header>
  );
}
