import { Dispatch, SetStateAction } from 'react';
import css from './Filter.module.css';
import { CiMap } from 'react-icons/ci';
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { campers, formDataValue } from '@/types/types';
import { getCamper } from '@/lib/api/clientApi';

interface FilterProps {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  setCamper: Dispatch<SetStateAction<campers[]>>;
  setFilters: Dispatch<SetStateAction<formDataValue>>;
  setPage: Dispatch<SetStateAction<number>>;
  setTotalPage: Dispatch<SetStateAction<number>>;
}

export default function Filter({ location, setCamper, setLocation, setFilters, setPage, setTotalPage }: FilterProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const camperType = formData.get('camperType')?.toString() ?? '';
    const engineType = formData.get('engineType')?.toString() ?? '';
    const transmissionType = formData.get('transmissionType')?.toString() ?? '';
    const newFilter = {
      location,
      form: camperType,
      engine: engineType,
      transmission: transmissionType,
    };
    setFilters(newFilter);
    const camperValue = await getCamper({
      dataFilter: newFilter,
      page: 1,
      perPage: 4,
    });
    setCamper([]);
    setCamper(camperValue.campers);
    setPage(1);
    setTotalPage(camperValue.totalPages);
  };
  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form;

    if (form) {
      setFilters({
        location: '',
        form: '',
        engine: '',
        transmission: '',
      });
      form.reset();
      setLocation('');
    }
  };
  return (
    <aside className={css.asideFilters}>
      <div>
        <form className={css.formFilter} onSubmit={handleSubmit}>
          <div className={css.formContainer}>
            <label className={css.labelLocation}>
              <span>Location</span>
              <div className={`${css.containerInput} ${location ? css.filled : ''}`}>
                <CiMap size={20} className={css.iconLocation} viewBox="3 3 20 20" />
                <input
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  type="text"
                  placeholder="City"
                  name="location"
                  className={css.inputLocation}
                />
              </div>
            </label>
            <div className={css.filterContainer}>
              <p className={css.titleFilter}>Filters</p>

              <div className={css.CamperField}>
                <p className={css.radioTitle}>Camper form</p>
                <label htmlFor="Alcove" className={css.labelRadio}>
                  <input type="radio" name="camperType" id="Alcove" value={'alcove'} />
                  <IoMdRadioButtonOff className={css.empty} size={24} />
                  <IoMdRadioButtonOn className={css.checked} size={24} />
                  <span>Alcove</span>
                </label>
                <label htmlFor="Panel-Van" className={css.labelRadio}>
                  <input type="radio" name="camperType" id="Panel-Van" value={'panel_van'} />
                  <IoMdRadioButtonOff className={css.empty} size={24} />
                  <IoMdRadioButtonOn className={css.checked} size={24} />
                  <span>Panel Van</span>
                </label>
                <label htmlFor="Integrated" className={css.labelRadio}>
                  <input type="radio" name="camperType" id="Integrated" value={'integrated'} />
                  <IoMdRadioButtonOff className={css.empty} size={24} />
                  <IoMdRadioButtonOn className={css.checked} size={24} />
                  <span>Integrated</span>
                </label>
                <label htmlFor="Semi-Integrated" className={css.labelRadio}>
                  <input type="radio" name="camperType" id="Semi-Integrated" value={'semi_integrated'} />
                  <IoMdRadioButtonOff className={css.empty} size={24} />
                  <IoMdRadioButtonOn className={css.checked} size={24} />
                  <span>Semi Integrated</span>
                </label>
              </div>
              <div className={css.CamperField}>
                <p className={css.radioTitle}>Engine</p>
                <label htmlFor="Diesel" className={css.labelRadio}>
                  <input type="radio" name="engineType" id="Diesel" value={'diesel'} />
                  <IoMdRadioButtonOff className={css.empty} size={24} />
                  <IoMdRadioButtonOn className={css.checked} size={24} />
                  <span>Diesel</span>
                </label>
                <label htmlFor="Petrol" className={css.labelRadio}>
                  <input type="radio" name="engineType" id="Petrol" value={'petrol'} />
                  <IoMdRadioButtonOff className={css.empty} size={24} />
                  <IoMdRadioButtonOn className={css.checked} size={24} />
                  <span>Petrol</span>
                </label>
                <label htmlFor="Hybrid" className={css.labelRadio}>
                  <input type="radio" name="engineType" id="Hybrid" value={'hybrid'} />
                  <IoMdRadioButtonOff className={css.empty} size={24} />
                  <IoMdRadioButtonOn className={css.checked} size={24} />
                  <span>Hybrid</span>
                </label>
                <label htmlFor="Electric" className={css.labelRadio}>
                  <input type="radio" name="engineType" id="Electric" value={'electric'} />
                  <IoMdRadioButtonOff className={css.empty} size={24} />
                  <IoMdRadioButtonOn className={css.checked} size={24} />
                  <span>Electric</span>
                </label>
              </div>
              <div className={css.CamperField}>
                <p className={css.radioTitle}>Transmission</p>
                <label htmlFor="Automatic" className={css.labelRadio}>
                  <input type="radio" name="transmissionType" id="Automatic" value={'automatic'} />
                  <IoMdRadioButtonOff className={css.empty} size={24} />
                  <IoMdRadioButtonOn className={css.checked} size={24} />
                  <span>Automatic</span>
                </label>
                <label htmlFor="Manual" className={css.labelRadio}>
                  <input type="radio" name="transmissionType" id="Manual" value={'manual'} />
                  <IoMdRadioButtonOff className={css.empty} size={24} />
                  <IoMdRadioButtonOn className={css.checked} size={24} />
                  <span>Manual</span>
                </label>
              </div>
            </div>
          </div>
          <div className={css.formButton}>
            <button type="submit" className={css.searchBtn}>
              Search
            </button>
            <button type="button" className={css.clearBtn} onClick={handleClear}>
              <RxCross2 size={24} />
              Clear filters
            </button>
          </div>
        </form>
      </div>
    </aside>
  );
}
