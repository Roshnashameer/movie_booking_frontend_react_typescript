import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { loginApi, registerApi } from '../services/allApis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

interface AuthProps {
    register?: boolean;
}

interface FormValues {
    userName?: string;
    email: string;
    password: string;
}

const Auth: React.FC<AuthProps> = ({ register }) => {
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        userName: register
            ? Yup.string()
                .matches(/^[a-zA-Z ]+$/, 'Only letters are allowed')
                .required('User Name is required')
            : Yup.string(),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .matches(/^[0-9a-zA-Z@]{3,8}$/, 'Password must be 3-8 characters long and can include letters, numbers, and @')
            .required('Password is required')
    });

    const initialValues: FormValues = {
        userName: '',
        email: '',
        password: '',
    };

    const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const { userName, email, password } = values;

        try {
            if (register) {
                const result = await registerApi({ userName, email, password });
                // console.log("Register API result:", result);

                if (result.status === 200) {
                    toast.success(`${userName}, your account is created successfully.`, {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: 'light',
                    });
                    navigate('/login');
                } else {

                    if ('response' in result) {
                        const errors = (result.response?.data as { errors: Array<{ msg: string }> }).errors;
                        if (errors && errors.length > 0) {
                            // console.log(errors[0].msg);
                            toast.info(errors[0].msg, {
                                position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });


                        }

                    }
                }
            }
            else {
                const result = await loginApi({ email, password });
                console.log("Login API result:", result);

                if (result.status === 200) {
                    toast.success('Login successful!', {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: 'light',
                    });
                    if ('data' in result) {
                        localStorage.setItem('token', result.data.token);
                        localStorage.setItem('currentUser', JSON.stringify(result.data.user));
                        localStorage.setItem('currentId', result.data.user._id);
                    }
                    navigate("/dashboard");
                } else {
                    if ('response' in result) {
                        // console.log(result.response?.data)
                        const err: string |any = result.response?.data
                        toast.error(err, {
                            position: 'top-center',
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: 'light',
                        });
                    }

                }
            }
        } catch (error) {
            console.error("API call error:", error);
            toast.error('Something went wrong, please try again later.', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'light',
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <div className='w-50 container bg-light shadow-lg mb-5 mt-5 p-5'>
                <Row>
                    <Col>
                        <Link to={'/'} className='p-3 fs-5' style={{ textDecoration: 'none' }}>
                            <i className="fa-solid fa-backward text-danger fa-beat-fade"></i> Back to Home
                        </Link>
                        <img className='w-100'
                            src={register ? "https://i.postimg.cc/ZnT5XrF0/e8349cbaee4a18d613941c2cc7f70129.gif" : "https://i.postimg.cc/4NjT967t/login.gif"} alt="" />
                    </Col>
                    <Col className='p-3'>
                        <h1 className='text-center'>
                            {register ? 'Sign Up' : 'Sign In'}
                        </h1>
                        <div className='mt-5'>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        {register && (
                                            <FloatingLabel controlId="floatingUserName" label="User Name" className='mb-3'>
                                                <Field name='userName' type="text" placeholder="User Name" className='form-control' />
                                                <ErrorMessage name="userName" component="div" className='text-danger' />
                                            </FloatingLabel>
                                        )}
                                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                            <Field name='email' type="email" placeholder="name@example.com" className='form-control' />
                                            <ErrorMessage name="email" component="div" className='text-danger' />
                                        </FloatingLabel>
                                        <FloatingLabel controlId="floatingPassword" label="Password">
                                            <Field name='password' type="password" placeholder="Password" className='form-control' />
                                            <ErrorMessage name="password" component="div" className='text-danger' />
                                        </FloatingLabel>
                                        <div className='text-center mt-3'>
                                            <Button type="submit" className='btn btn-primary rounded-pill px-4 py-2' disabled={isSubmitting}>
                                                {register ? 'Register' : 'Login'}
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            <div className='mt-3 text-center'>
                                {register ?
                                    <p>Already Have An Account? <Link to={'/login'} style={{ textDecoration: 'none' }}>Login Here</Link></p> :
                                    <p>New User? <Link to={'/register'} style={{ textDecoration: 'none' }}>Register Here</Link></p>
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Auth;
