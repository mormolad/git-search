import style from './Main.module.scss';
import RepositoryDescription from '../RepositoryDescription/RepositoryDescription';
import { useSelector } from 'react-redux';
import Load from '../Load/Load';
import WellCome from '../WellCome/WellCome';
import Table from '../Table/Table';

/**
 * Компонент, отвечающий за отображение основной части страницы.
 * Он отображает либо загрузку, либо таблицу с результатами поиска, либо приветственный экран.
 */
export default function EnhancedTable() {
  /**
   * Получение значения `isLoad` из состояния Redux.
   * `isLoad` - флаг, указывающий, идет ли загрузка данных.
   */
  const isLoad = useSelector(
    (state: { reduserSearch: { isLoad: any } }) => state.reduserSearch.isLoad
  );

  /**
   * Получение значения `search` из состояния Redux.
   * `search` - массив объектов, содержащих данные о репозиториях.
   */
  const search = useSelector(
    (state: { reduserSearch: { search: any } }) => state.reduserSearch.search
  );

  return (
    <main
      className={`${style.main} ${search.length === 0 && style.main_wellcom}`}
    >
      {isLoad ? (
        <Load />
      ) : search.length > 0 ? (
        <>
          <div className={style.leftIndent}></div>
          <Table />
          <RepositoryDescription />
          <div className={style.rightIndent}></div>
        </>
      ) : (
        <WellCome />
      )}
    </main>
  );
}
