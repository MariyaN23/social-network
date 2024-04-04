import React from 'react';
import s from './Login.module.css';
import {Field, Formik} from 'formik';

export type AuthFormType = {
    email: string
    password: string
    rememberMe: boolean
}

const emailValidate = (email: string)=> {
    let error
    if (!email) {
        error = 'Email required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        error = 'Invalid email address';
    }
    return error
}

const passwordValidate = (password: string)=> {
    let error
    if (!password) {
        error = 'Password required';
    }
    return error
}

type LoginFormPropsType = {
    loginFormSubmit: (loginData: AuthFormType) => void
}

export const LoginForm = (props: LoginFormPropsType) => {
    const submit =(values: AuthFormType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        const loginData: AuthFormType = {
            email: values.email,
            password: values.password,
            rememberMe: values.rememberMe
        }
        props.loginFormSubmit(loginData)
        setSubmitting(false)
    }
    return (
        <Formik
            initialValues={{email: '', password: '', rememberMe: false}}
            onSubmit={submit}
        >
            {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  errors,
                  touched
              }) => (
                <form onSubmit={handleSubmit} className={s.loginForm}>
                    <Field
                        type="text"
                        name="email"
                        placeholder={"Email"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        validate={emailValidate}
                    />
                    {errors.email && touched.email && <div>{errors.email}</div>}
                    <Field
                        type="password"
                        name="password"
                        placeholder={"Password"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        validate={passwordValidate}
                    />
                    {errors.password && touched.password && <div>{errors.password}</div>}
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