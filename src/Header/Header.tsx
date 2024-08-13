import { TextField, Button } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import style from './Header.module.scss';
import getSearch from '../store/apiSearch';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setIsLoad } from '../store/searchSlics';
interface FormValues {
  valueSerch: string;
}

export default function Header() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useDispatch();
  const page = useSelector(
    (state: { reduserSearch: { page: any } }) => state.reduserSearch.page
  );
  const perPage = useSelector(
    (state: { reduserSearch: { perPage: any } }) => state.reduserSearch.perPage
  );

  const search = useSelector(
    (state: { reduserSearch: { search: any } }) => state.reduserSearch.search
  );

  interface Repository {
    id: number;
    name: string;
    language: string | null;
    forks: number;
    stargazers_count: number;
    created_at: string; // или Date, если вы будете преобразовывать строку даты в объект Date
  }

  type RepositoryData = {
    id: number;
    name: string;
    language: string | null;
    fork: number;
    stars: number;
    date: string; // или Date
  };

  function getDataTable(data: Repository[]): RepositoryData[] {
    if (data.length > 0) {
      return data.map((repository: Repository) => {
        console.log(new Date(repository.created_at).toLocaleString('ru-RU'));
        return {
          id: repository.id,
          name: repository.name,
          language: repository.language,
          fork: repository.forks,
          stars: repository.stargazers_count,
          date: new Date(repository.created_at).toLocaleString('ru-RU'),
        };
      });
    }
    return [];
  }

  interface FormValues {
    valueSerch: string;
  }

  type SubmitHandler<T> = (data: T) => void | Promise<void>;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(setIsLoad(true));
    getSearch(data.valueSerch + `&per_page=${perPage}&page=${page}`)
      .then((res) => {
        dispatch(setSearch(getDataTable(res.data.items)));
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
