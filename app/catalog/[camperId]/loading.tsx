import Loader from '@/components/Loading/Loading';
import css from './loading.module.css'
export default function Loading() {
  return (
    <div className={css.loadingOverlay}>
      <Loader />
    </div>
  );
}
