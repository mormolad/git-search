import load from './load.svg';
import style from './Load.module.scss';

const Load = () => {
  return (
    <div className={style.load}>
      <img
        width="121"
        height="130"
        src={load}
        alt="Loading"
        className={style.image}
      />
    </div>
  );
};

export default Load;
