import style from './RepositoryDescription.module.scss';
import { useSelector } from 'react-redux';

// Тип данных для лицензии
type LicenseData = {
  name: string;
};

// Тип данных для репозитория
type RepositoryData = {
  name: string;
  description: string | null;
  license: LicenseData | null;
};

// Компонент, отображающий информацию о репозитории
export default function RepositoryDescription() {
  // Получение информации о репозитории из состояния Redux
  const repositoryInfo = useSelector(
    (state: { reduserRepository: { repositoryInfo: RepositoryData } }) =>
      state.reduserRepository.repositoryInfo
  );

  // Функция, возвращающая строку с информацией о лицензии
  function getLicense(): string {
    // Если лицензия отсутствует, возвращаем сообщение об этом
    if (repositoryInfo.license === null) {
      return 'лицензия отсутствует';
    }
    // Возвращаем название лицензии, если она есть
    return `${
      repositoryInfo.license.name === 'free'
        ? 'free license'
        : repositoryInfo.license.name
    }`;
  }

  // Рендеринг компонента
  return (
    <div className={style.container}>
      {repositoryInfo.name ? (
        <>
          {/* Отображение названия репозитория */}
          <h3 className={style.title}>{repositoryInfo.name}</h3>
          {/* Отображение описания репозитория */}
          <p className={style.description}>
            {repositoryInfo.description
              ? repositoryInfo.description
              : 'описание отсутствует'}
          </p>
          {/* Отображение информации о лицензии */}
          <p className={style.license}>{getLicense()}</p>
        </>
      ) : (
        ''
      )}
    </div>
  );
}