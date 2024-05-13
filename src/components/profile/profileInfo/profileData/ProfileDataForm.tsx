import React from 'react';
import s from './ProfileDataForm.module.css';
import {Field, Formik} from 'formik';
import {ContactsType, ProfileType} from '../../../../redux/profile-reducer';

type ProfileDataFormPropsType = {
    profile: ProfileType
    exitFromEditMode: (profileData: ProfileFormType) => void
}

const fieldValidate = (value: string) => {
}

const contactsValidate = (value: string) => {
    let error
    if (!/^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/.test(value) && value) {
        error = 'Enter correct URL';
    }
    return error
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
                    <form onSubmit={handleSubmit} className={s.profileForm}>
                        <Field
                            type="text"
                            name="fullName"
                            placeholder={'Full Name'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.fullName}
                            validate={fieldValidate}
                        />
                        <Field
                            type="text"
                            name="aboutMe"
                            placeholder={'About Me'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.aboutMe}
                            validate={fieldValidate}
                        />
                        <label>
                            Looking for a job: <Field
                            type="checkbox"
                            name="lookingForAJob"
                            checked={values.lookingForAJob}
                        />
                        </label>
                        <Field
                            type="text"
                            name="lookingForAJobDescription"
                            placeholder={'My professional skills'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lookingForAJobDescription}
                            validate={fieldValidate}
                        />
                        {Object.keys(props.profile.contacts).map(key => {
                            return <Field
                                    key={key}
                                    type="text"
                                    name={`contacts.${key}`}
                                    placeholder={key}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.contacts[key as keyof typeof props.profile.contacts]}
                                    validate={contactsValidate}
                                    className={errors.contacts ? errors.contacts[key as keyof typeof props.profile.contacts] && s.fieldError : ''}
                                />
                        })}
                       {errors.contacts && <div className={s.error}>Enter correct URL</div>}
                        <div>
                            <button type="submit" disabled={isSubmitting}>
                                Save
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};