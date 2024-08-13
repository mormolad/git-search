import style from './Main.module.scss';
import RepositoryDescription from '../RepositoryDescription/RepositoryDescription';
import { useSelector } from 'react-redux';
import Load from '../Load/Load';
import WellCome from '../WellCome/WellCome';
import Table from '../Table/Table';

export default function EnhancedTable() {
  const isLoad = useSelector(
    (state: { reduserSearch: { isLoad: any } }) => state.reduserSearch.isLoad
  );
  const search = useSelector(
    (state: { reduserSearch: { search: any } }) => state.reduserSearch.search
  );
  return (
    <main className={style.main}>
      {isLoad ? (
        <Load />
      ) : search.length > 0 ? (
        <>
          <Table />
          <RepositoryDescription description={'gfsdgsd'} />
        </>
      ) : (
        <WellCome />
      )}
    </main>
  );
}
