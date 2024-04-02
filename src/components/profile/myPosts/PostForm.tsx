import React from 'react';
import {Field, Formik} from 'formik';
import s from './MyPosts.module.css'

type PostFormPropsType = {
    sendPost: (message: string) => void
}

type PostFormType = {
    newPost: string
}

const postFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

export const PostForm = (props: PostFormPropsType) => {
    const submit = (values: PostFormType,
                    {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const post: PostFormType = {
            newPost: values.newPost
        }
        props.sendPost(post.newPost)
        setSubmitting(false)
    }
    return (
        <Formik
            initialValues={{newPost: ''}}
            validate={postFormValidate}
            onSubmit={submit}
        >
            {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
              }) => (
                <form onSubmit={handleSubmit}>
                    <Field
                        type="text"
                        name="newPost"
                        placeholder={'Your news...'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.newPost}
                        className={s.field}
                    />
                    <div className={s.buttonPost}>
                        <button type="submit" disabled={isSubmitting}>
                            Add Post
                        </button>
                    </div>
                </form>
            )}
        </Formik>
    );
};