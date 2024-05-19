import React from 'react';
import s from './ProfileDataForm.module.css';
import {Field, Form, Formik} from 'formik';
import {ContactsType, ProfileType} from '../../../../redux/profile-reducer';

type ProfileDataFormPropsType = {
    profile: ProfileType
    exitFromEditMode: (profileData: ProfileFormType) => void
}

const requiredFieldValidate = (value: string) => {
    if (!value) {
        return 'This field is required'
    }
}

const contactsValidate = (value: string) => {
    if (!value) {
        return
    }
    const regex = /\./
    if (!regex.test(value)) {
       return 'Enter correct URL';
    }
}


export type ProfileFormType = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: ContactsType
}

export const ProfileDataForm = (props: ProfileDataFormPropsType) => {
    const submit = (values: ProfileFormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const profileData: ProfileFormType = {
            fullName: values.fullName,
            aboutMe: values.aboutMe,
            lookingForAJob: values.lookingForAJob,
            lookingForAJobDescription: values.lookingForAJobDescription,
            contacts: {
                facebook: values.contacts.facebook,
                website: values.contacts.website,
                vk: values.contacts.vk,
                twitter: values.contacts.twitter,
                instagram: values.contacts.instagram,
                youtube: values.contacts.youtube,
                github: values.contacts.github,
                mainLink: values.contacts.mainLink
            }
        }
        setSubmitting(false)
        props.exitFromEditMode(profileData)
    }
    return (
        <div>
            <Formik
                initialValues={props.profile}
                onSubmit={submit}
            >
                {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      errors
                  }) => (
                    <Form onSubmit={handleSubmit} className={s.profileForm}>
                        <label>
                        Full name <Field
                            type="text"
                            name="fullName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.fullName}
                            className={errors.fullName ? errors.fullName && s.fieldError : ''}
                            validate={requiredFieldValidate}
                        /></label>
                        <label>
                        About me <Field
                            type="text"
                            name="aboutMe"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.aboutMe}
                            className={errors.aboutMe ? errors.aboutMe && s.fieldError : ''}
                            validate={requiredFieldValidate}
                        /></label>
                        <label>
                            Looking for a job <Field
                            type="checkbox"
                            name="lookingForAJob"
                            checked={values.lookingForAJob}
                        />
                        </label>
                        <label>My professional skills <Field
                            type="text"
                            name="lookingForAJobDescription"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lookingForAJobDescription}
                            validate={requiredFieldValidate}
                            className={errors.lookingForAJobDescription ? errors.lookingForAJobDescription && s.fieldError : ''}
                        /></label>
                        {Object.keys(props.profile.contacts).map(key => {
                            return <label>{`${key}`} <Field
                                    key={key}
                                    type="text"
                                    name={`contacts.${key}`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.contacts[key as keyof typeof props.profile.contacts]}
                                    validate={contactsValidate}
                                    className={errors.contacts ? errors.contacts[key as keyof typeof props.profile.contacts] && s.fieldError : ''}
                                /></label>
                        })}
                       {errors.contacts && <div className={s.error}>Enter correct URL</div>}
                        {(errors.lookingForAJobDescription || errors.aboutMe || errors.fullName)
                            && <div className={s.error}>This field is required</div>}
                        <div>
                            <button type="submit" disabled={isSubmitting}>
                                Save
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};