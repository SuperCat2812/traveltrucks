'use client';
import { useState } from 'react';
import css from './catalog.module.css';
import { CiMap } from 'react-icons/ci';
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
export default function Catalog() {
  const [location, setLocation] = useState('');
  return (
    <div>
      <aside className={css.asideFilters}>
        <div>
          <form action="" className={css.formFilter}>
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
                    <input type="radio" name="camper-type" id="Alcove" value={'Alcove'} />
                    <IoMdRadioButtonOff className={css.empty} size={24} />
                    <IoMdRadioButtonOn className={css.checked} size={24} />
                    <span>Alcove</span>
                  </label>
                  <label htmlFor="Panel-Van" className={css.labelRadio}>
                    <input type="radio" name="camper-type" id="Panel-Van" value={'Panel Van'} />
                    <IoMdRadioButtonOff className={css.empty} size={24} />
                    <IoMdRadioButtonOn className={css.checked} size={24} />
                    <span>Panel Van</span>
                  </label>
                  <label htmlFor="Integrated" className={css.labelRadio}>
                    <input type="radio" name="camper-type" id="Integrated" value={'Integrated'} />
                    <IoMdRadioButtonOff className={css.empty} size={24} />
                    <IoMdRadioButtonOn className={css.checked} size={24} />
                    <span>Integrated</span>
                  </label>
                  <label htmlFor="Semi-Integrated" className={css.labelRadio}>
                    <input type="radio" name="camper-type" id="Semi-Integrated" value={'Semi Integrated'} />
                    <IoMdRadioButtonOff className={css.empty} size={24} />
                    <IoMdRadioButtonOn className={css.checked} size={24} />
                    <span>Semi Integrated</span>
                  </label>
                </div>
                <div className={css.CamperField}>
                  <p className={css.radioTitle}>Engine</p>
                  <label htmlFor="Diesel" className={css.labelRadio}>
                    <input type="radio" name="camper-type" id="Diesel" value={'Diesel'} />
                    <IoMdRadioButtonOff className={css.empty} size={24} />
                    <IoMdRadioButtonOn className={css.checked} size={24} />
                    <span>Diesel</span>
                  </label>
                  <label htmlFor="Petrol" className={css.labelRadio}>
                    <input type="radio" name="camper-type" id="Petrol" value={'Petrol'} />
                    <IoMdRadioButtonOff className={css.empty} size={24} />
                    <IoMdRadioButtonOn className={css.checked} size={24} />
                    <span>Petrol</span>
                  </label>
                  <label htmlFor="Hybrid" className={css.labelRadio}>
                    <input type="radio" name="camper-type" id="Hybrid" value={'Hybrid'} />
                    <IoMdRadioButtonOff className={css.empty} size={24} />
                    <IoMdRadioButtonOn className={css.checked} size={24} />
                    <span>Hybrid</span>
                  </label>
                  <label htmlFor="Electric" className={css.labelRadio}>
                    <input type="radio" name="camper-type" id="Electric" value={'Electric'} />
                    <IoMdRadioButtonOff className={css.empty} size={24} />
                    <IoMdRadioButtonOn className={css.checked} size={24} />
                    <span>Electric</span>
                  </label>
                </div>
                <div className={css.CamperField}>
                  <p className={css.radioTitle}>Transmission</p>
                  <label htmlFor="Automatic" className={css.labelRadio}>
                    <input type="radio" name="camper-type" id="Automatic" value={'Automatic'} />
                    <IoMdRadioButtonOff className={css.empty} size={24} />
                    <IoMdRadioButtonOn className={css.checked} size={24} />
                    <span>Automatic</span>
                  </label>
                  <label htmlFor="Manual" className={css.labelRadio}>
                    <input type="radio" name="camper-type" id="Petrol" value={'Manual'} />
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
              <button type="button" className={css.clearBtn}>
                <RxCross2 size={24} />
                Clear filters
              </button>
            </div>
          </form>
        </div>
      </aside>
      <aside></aside>
    </div>
  );
}
