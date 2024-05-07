import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/authSlice";
import Dropzone from "react-dropzone";
import { PencilIcon } from '@heroicons/react/outline';

const registerSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
    location: yup.string().required("Required"),
    occupation: yup.string().required("Required"),
    picture: yup.string().required("Required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const [error, setError] = useState("");

    const register = async (values, onSubmitProps) => {

        const capitalizedFirstName = values.firstName.charAt(0).toUpperCase() + values.firstName.slice(1);
        const capitalizedLastName = values.lastName.charAt(0).toUpperCase() + values.lastName.slice(1);

        const formData = new FormData();
        formData.append("firstName", capitalizedFirstName);
        formData.append("lastName", capitalizedLastName);
        for (let value in values) {
            if (value !== "firstName" && value !== "lastName") {
                formData.append(value, values[value]);
            }
        }
        formData.append("picturePath", values.picture.name);

        const savedUserResponse = await fetch(
            "http://localhost:5000/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login");
        }
    };

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn.token) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/home");
        } else {
            setError(loggedIn.msg);
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-4 ">
                        {isRegister && (
                            <>
                                <div className="col-span-4 md:col-span-2">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.firstName}
                                        name="firstName"
                                        className="w-full p-2 border border-zinc-300 rounded hover:border-zinc-400 focus:outline-none focus:border-zinc-500 dark:bg-zinc-800"
                                    />
                                    {touched.firstName && errors.firstName && (
                                        <p className="text-red-500">{errors.firstName}</p>
                                    )}
                                </div>
                                <div className="col-span-4 md:col-span-2">
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        name="lastName"
                                        className="w-full p-2 border border-zinc-300 rounded hover:border-zinc-400 focus:outline-none focus:border-zinc-500 dark:bg-zinc-800"
                                    />
                                    {touched.lastName && errors.lastName && (
                                        <p className="text-red-500">{errors.lastName}</p>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    className="col-span-4 w-full p-2 border border-zinc-300 rounded hover:border-zinc-400 focus:outline-none focus:border-zinc-500 dark:bg-zinc-800 "
                                />
                                <input
                                    type="text"
                                    placeholder="Occupation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    className="col-span-4 w-full p-2 border border-zinc-300 rounded hover:border-zinc-400 focus:outline-none focus:border-zinc-500 dark:bg-zinc-800"
                                />
                                <div className="col-span-4 border border-zinc-300 rounded p-4">
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                            setFieldValue("picture", acceptedFiles[0])
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <div
                                                {...getRootProps()}
                                                className="border-2 border-dashed border-red-500 text-zinc-400 p-4 cursor-pointer dark:bg-zinc-800"
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add Picture Here</p>
                                                ) : (
                                                    <div className="flex justify-between">
                                                        <p>{values.picture.name}</p>
                                                        <PencilIcon className="h-5 w-5 text-zinc-500" />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Dropzone>
                                </div>
                            </>
                        )}

                        <input
                            type="text"
                            placeholder="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            className="col-span-4 w-full p-2 border border-zinc-300 rounded hover:border-zinc-400 focus:outline-none focus:border-zinc-500 dark:bg-zinc-800"
                        />
                        {touched.email && errors.email && (
                            <p className="text-red-500 col-span-4">{errors.email}</p>
                        )}
                        <input
                            type="password"
                            placeholder="Password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            className="col-span-4 w-full p-2 border border-zinc-300 rounded hover:border-zinc-400 focus:outline-none focus:border-zinc-500 dark:bg-zinc-800"
                        />
                        {touched.password && errors.password && (
                            <p className="text-red-500 col-span-4">{errors.password}</p>
                        )}
                        {error && (
                            <p className="text-red-500 col-span-4">{error}</p>
                        )}

                        {/* BUTTONS */}
                        <div className="col-span-4">
                            <button
                                type="submit"
                                className="w-full py-2 border border-orange-500 bg-orange-500 hover:bg-transparent hover:border hover:border-solid hover:text-orange-500 hover:border-orange-500 text-white rounded"
                            >
                                {isLogin ? "LOGIN" : "REGISTER"}
                            </button>
                            <p
                                onClick={() => {
                                    setPageType(isLogin ? "register" : "login");
                                    resetForm();
                                    setError("");
                                }}
                                className="pt-5 text-black cursor-pointer hover:underline dark:text-white dark:hover:text-zinc-300"
                            >
                                {isLogin
                                    ? "Don't have an account? Sign Up here."
                                    : "Already have an account? Login here."}
                            </p>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default Form;