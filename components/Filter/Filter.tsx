'use client';
import { Dispatch, SetStateAction } from 'react';
import css from './Filter.module.css';
import { CiMap } from 'react-icons/ci';
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { FilterData, FormDataValue } from '@/types/types';

interface FilterProps {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  setFilters: Dispatch<SetStateAction<FormDataValue>>;
  setDraftFilters: Dispatch<SetStateAction<FormDataValue>>;
  draftFilters: FormDataValue;
  filters: FilterData;
  onClear: () => void;
}

export default function Filter({
  location,
  setLocation,
  setFilters,
  filters,
  onClear,
  setDraftFilters,
  draftFilters,
}: FilterProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFilters({
      ...draftFilters,
      location,
    });
  };
  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form;

    if (form) {
      form.reset();
      onClear();
    }
  };
  const formatLabel = (value: string) =>
    value
      .split('_')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ');
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
                {filters.forms.map(form => {
                  return (
                    <label key={form} htmlFor={form} className={css.labelRadio}>
                      <input
                        type="radio"
                        name="camperType"
                        id={form}
                        value={form}
                        checked={draftFilters.form === form}
                        onChange={() =>
                          setDraftFilters(prev => ({
                            ...prev,
                            form,
                          }))
                        }
                      />
                      <IoMdRadioButtonOff className={css.empty} size={24} />
                      <IoMdRadioButtonOn className={css.checked} size={24} />
                      <span>{formatLabel(form)}</span>
                    </label>
                  );
                })}
              </div>
              <div className={css.CamperField}>
                <p className={css.radioTitle}>Engine</p>
                {filters.engines.map(engine => {
                  return (
                    <label key={engine} htmlFor={engine} className={css.labelRadio}>
                      <input
                        type="radio"
                        name="engineType"
                        id={engine}
                        value={engine}
                        checked={draftFilters.engine === engine}
                        onChange={() =>
                          setDraftFilters(prev => ({
                            ...prev,
                            engine,
                          }))
                        }
                      />
                      <IoMdRadioButtonOff className={css.empty} size={24} />
                      <IoMdRadioButtonOn className={css.checked} size={24} />
                      <span>{formatLabel(engine)}</span>
                    </label>
                  );
                })}
              </div>
              <div className={css.CamperField}>
                <p className={css.radioTitle}>Transmission</p>
                {filters.transmissions.map(transmission => {
                  return (
                    <label key={transmission} htmlFor={transmission} className={css.labelRadio}>
                      <input
                        type="radio"
                        name="transmissionType"
                        id={transmission}
                        value={transmission}
                        checked={draftFilters.transmission === transmission}
                        onChange={() =>
                          setDraftFilters(prev => ({
                            ...prev,
                            transmission,
                          }))
                        }
                      />
                      <IoMdRadioButtonOff className={css.empty} size={24} />
                      <IoMdRadioButtonOn className={css.checked} size={24} />
                      <span>{formatLabel(transmission)}</span>
                    </label>
                  );
                })}
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
