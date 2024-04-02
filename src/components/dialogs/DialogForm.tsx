import React from 'react';
import s from './Dialogs.module.css';
import {Field, Formik} from 'formik';

type DialogFormPropsType = {
    sendMessage: (message: string)=> void
}

type DialogFormType = {
    newMessageBody: string
}

const dialogFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

export const DialogForm = (props: DialogFormPropsType) => {
    const submit =(values: DialogFormType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        const message: DialogFormType = {
            newMessageBody: values.newMessageBody
        }
        props.sendMessage(message.newMessageBody)
        setSubmitting(false)
    }
    return (
        <Formik
            initialValues={{newMessageBody: ''}}
            validate={dialogFormValidate}
            onSubmit={submit}
        >
            {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
              }) => (
                <form onSubmit={handleSubmit} className={s.sendForm}>
                    <Field
                        type="text"
                        name="newMessageBody"
                        placeholder={"Write new message"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.newMessageBody}
                    />
                    <button type="submit" disabled={isSubmitting}>
                        Send Message
                    </button>
                </form>
            )}
        </Formik>
    );
};