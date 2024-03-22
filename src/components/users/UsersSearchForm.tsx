import React from 'react';
import {Field, Formik} from 'formik';
import {FilterType} from '../../redux/users-reducer';
import s from './UsersSearchForm.module.css'

type FormType = {
    term: string
    friend: "null" | "true" | "false"
}

type UsersSearchFormType = {
    onFilterChanged: (filter: FilterType)=> void
}

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

export const UsersSearchForm = (props: UsersSearchFormType) => {
    const submit =(values: FormType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
        }
    return (
        <Formik
            initialValues={{term: '', friend: "null"}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                    <Field name="friend" as="select" className={s.FilterField}>
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <Field
                        type="text"
                        name="term"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.term}
                        className={s.SearchField}
                        placeholder={'Search...'}
                    />
                   {/* <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>*/}
                    <button type="submit" disabled={isSubmitting} className={s.SearchBtn}>
                        Find
                    </button>
                </form>
            )}
        </Formik>
    );
};