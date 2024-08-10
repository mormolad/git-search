import { TextField, Button } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import style from './Header.module.scss';
import getSearch from '../store/apiSearch';
import { useDispatch } from 'react-redux';
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
  const page = 3;
  const per_page = 25;
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(setIsLoad(true));

    getSearch(data.valueSerch + `&per_page=${per_page}&page=${page}`)
      .then((res) => {
        dispatch(setSearch(res.data.items));
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
