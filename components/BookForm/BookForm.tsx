'use client';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { MdErrorOutline } from 'react-icons/md';
import * as Yup from 'yup';
import css from './BookForm.module.css';
import { Campers } from '@/types/types';
import { postBook } from '@/lib/api/camperApi';
import toast from 'react-hot-toast';

interface BookFormParams {
  camperId: Campers['id'];
}
export default function BookForm({ camperId }: BookFormParams) {
  interface FormValues {
    name: string;
    email: string;
  }
  const initialValues: FormValues = {
    name: '',
    email: '',
  };
  const contactFormSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(2, 'Please enter your full name.')
      .matches(/^[A-Za-zА-Яа-яІіЇїЄєҐґ' -]+$/, 'Name can contain only letters.')
      .required('Please enter your name.'),
    email: Yup.string().email('Please enter a valid email.').required('Please enter your email.'),
  });
  const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    try {
      await postBook({
        dataID: camperId,
        bookData: values,
      });

      resetForm();
      toast.success('Booking request sent successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to send booking request.');
    }
  };
  return (
    <>
      <p className={css.formTitle}>Book your campervan now</p>
      <p className={css.formDescription}>Stay connected! We are always ready to help you.</p>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={contactFormSchema}>
        {({ errors, touched, values, isSubmitting }) => {
          const nameError = Boolean(errors.name && touched.name);
          const emailError = Boolean(errors.email && touched.email);

          return (
            <Form className={css.formBook}>
              <div className={css.formBookContainer}>
                <div className={css.field}>
                  <div className={`${css.inputWrapper} ${nameError ? css.inputWrapperError : ''}`}>
                    {(values.name || nameError) && (
                      <label
                        htmlFor="name"
                        className={`${css.floatingLabel} ${nameError ? css.floatingLabelError : ''}`}
                      >
                        Name*
                      </label>
                    )}
                    <div className={`${css.inputContainer} ${nameError ? css.inputError : ''}`}>
                      <Field id="name" type="text" name="name" placeholder="Name*" className={css.input} />
                      <MdErrorOutline size={24} className={nameError ? css.errorIcon : css.errorIconOff} />
                    </div>
                  </div>

                  <ErrorMessage name="name" component="span" className={css.error} />
                </div>

                <div className={css.field}>
                  <div className={`${css.inputWrapper} ${emailError ? css.inputWrapperError : ''}`}>
                    {(values.email || emailError) && (
                      <label
                        htmlFor="email"
                        className={`${css.floatingLabel} ${emailError ? css.floatingLabelError : ''}`}
                      >
                        Email*
                      </label>
                    )}
                    <div className={`${css.inputContainer} ${emailError ? css.inputError : ''}`}>
                      <Field id="email" type="email" name="email" placeholder="Email*" className={css.input} />
                      <MdErrorOutline size={24} className={emailError ? css.errorIcon : css.errorIconOff} />
                    </div>
                  </div>

                  <ErrorMessage name="email" component="span" className={css.error} />
                </div>
              </div>
              <button type="submit" className={css.formButton} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
