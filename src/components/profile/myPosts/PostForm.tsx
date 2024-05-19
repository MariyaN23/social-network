import React from 'react';
import {Field, Formik, FormikHelpers} from 'formik';
import s from './MyPosts.module.css'

type PostFormPropsType = {
    sendPost: (message: string) => void
}

type PostFormType = {
    newPost: string
}

const postValidate = (post: string)=> {
    let error
    if (!post) {
        error = 'Text required';
    } else if (post.length > 100) {
        error = 'Post is too large';
    }
    return error
}

export const PostForm = (props: PostFormPropsType) => {
    const submit = (values: PostFormType, actions: FormikHelpers<PostFormType>) => {
        const post: PostFormType = {
            newPost: values.newPost
        }
        props.sendPost(post.newPost)
        actions.resetForm();
        actions.setSubmitting(false)
    }
    return (
        <Formik
            initialValues={{newPost: ''}}
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
                <form onSubmit={handleSubmit}>
                    <Field
                        type="text"
                        name="newPost"
                        placeholder={'Your news...'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.newPost}
                        className={s.field}
                        validate={postValidate}
                    />
                    {errors.newPost === "Post is too large" && <div>{errors.newPost}</div>}
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