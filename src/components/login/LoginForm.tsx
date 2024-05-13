import React from 'react';
import s from './Login.module.css';
import {Field, Formik} from 'formik';

export type AuthFormType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

const emailValidate = (email: string) => {
    let error
    if (!email) {
        error = 'Email required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        error = 'Invalid email address';
    }
    return error
}

const passwordValidate = (password: string) => {
    let error
    if (!password) {
        error = 'Password required';
    }
    return error
}

const captchaValidate = (captcha: string) => {
    let error
    if (!captcha) {
        error = 'Captcha required';
    }
    return error
}

type LoginFormPropsType = {
    loginFormSubmit: (loginData: AuthFormType) => void
    captcha: string
}

export const LoginForm = (props: LoginFormPropsType) => {
    const submit = (values: AuthFormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const loginData: AuthFormType = {
            email: values.email,
            password: values.password,
            rememberMe: values.rememberMe,
            captcha: values.captcha
        }
        props.loginFormSubmit(loginData)
        setSubmitting(false)
    }
    return (
        <Formik
            initialValues={{email: '', password: '', rememberMe: false, captcha: ''}}
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
                        placeholder={'Email'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        validate={emailValidate}
                        className={s.loginField}
                    />
                    {errors.email && touched.email && <div className={s.error}>{errors.email}</div>}
                    <Field
                        type="password"
                        name="password"
                        placeholder={'Password'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        validate={passwordValidate}
                        className={s.loginField}
                    />
                    {errors.password && touched.password && <div className={s.error}>{errors.password}</div>}
                    <label>
                        <Field
                            type="checkbox"
                            name="rememberMe"
                            checked={values.rememberMe}
                            className={s.loginCheckbox}
                        /> Remember me
                    </label>
                    {props.captcha && <div>
                        <div>
                            <img src={props.captcha} alt={'captcha'}/>
                        </div>
                        <Field
                            type="text"
                            name="captcha"
                            placeholder={'Captcha'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.captcha}
                            validate={captchaValidate}
                            className={s.loginField}
                        />
                        {errors.captcha && touched.captcha && <div className={s.error}>{errors.captcha}</div>}
                    </div>}
                    <div className={s.submitBtn}>
                        <button type="submit" disabled={isSubmitting}>
                            Sign In
                        </button>
                    </div>
                    <div className={s.registrationText}>
                        <p>To log in get registered or logged in {<a target={'_blank'} rel="noreferrer"
                                                                     href={'https://social-network.samuraijs.com/'}>here</a>}</p>
                    </div>
                </form>
            )}
        </Formik>
    );
};