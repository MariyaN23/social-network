import React from 'react';
import s from './Login.module.css';
import {Field, Formik} from 'formik';

type AuthFormType = {
    email: string
    password: string
    rememberMe: boolean
}

const usersLoginFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

export const LoginForm = () => {
    const submit =(values: AuthFormType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        const filter: AuthFormType = {
            email: values.email,
            password: values.password,
            rememberMe: values.rememberMe
        }
        console.log(filter)
        setSubmitting(false)
    }
    return (
        <Formik
            initialValues={{email: '', password: '', rememberMe: false}}
            validate={usersLoginFormValidate}
            onSubmit={submit}
        >
            {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
              }) => (
                <form onSubmit={handleSubmit} className={s.loginForm}>
                    <Field
                        type="text"
                        name="email"
                        placeholder={"email"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    <Field
                        type="password"
                        name="password"
                        placeholder={"password"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    <label>
                    <Field
                        type="checkbox"
                        name="rememberMe"
                        checked={values.rememberMe}
                    /> Remember me
                    </label>
                    <button type="submit" disabled={isSubmitting}>
                        Login
                    </button>
                </form>
            )}
        </Formik>
    );
};