import css from './Loading.module.css';

export default function Loader() {
  return (
    <div className={css.mainLoader}>
      <span className={css.loader}></span>
      <div className={css.loaderContainer}>
        <h2 className={css.loaderTitle}>Loading trucks...</h2>
        <p className={css.loaderDescription}>Please wait while we fetch the best travel trucks for you</p>
      </div>
    </div>
  );
}
