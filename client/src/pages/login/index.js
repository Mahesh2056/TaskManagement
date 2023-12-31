import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import Image from "next/image";
import { setUserDetails } from "../../redux/reducerSlices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export default function Login() {
	const dispatch = useDispatch();
    const router = useRouter();
    const [responseMsg, setResponseMsg] = useState({ msgLabel: "", msgType: "" });
	const handleLogin = async (values) => {
		try {
			const response = await fetch("http://localhost:8080/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});
			const result = await response.json();
			// console.log("Post response:", result);
			dispatch(setUserDetails(result))
		} catch (error) {
			console.error("Error posting data:", error);
		}
	};

	return (
		<div className="flex w-5/6  justify-center  m-auto mt-4">
			<div className="flex flex-col w-full sm:w-3/4 md:w-2/4  lg:w-2/4 xl:w-96  justify-center ">
				<h1 className=" text-lg mt-4 w-full text-center md:text-2xl font-semibold">
					Login
					{/* <Image src={'/logo.png'} width={100} height={100} alt="logo/"></Image> */}
				</h1>
				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					validationSchema={SigninSchema}
					onSubmit={(values) => {
						// same shape as initial values
						handleLogin(values);
					}}
				>
					{({ errors, touched }) => (
						<Form className="w-full flex flex-col justify-center mx-auto mt-10">
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900 mt-5"
							>
								Email
							</label>
							<Field
								className="block mt-2  w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none"
								name="email"
							/>
							{errors.email && touched.email ? (
								<div className="text-red-500">{errors.email}</div>
							) : null}

							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900 mt-5"
							>
								Password
							</label>
							<Field
								name="password"
								type="password"
								className="block mt-2 w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none"
							/>
							{errors.password && touched.password ? (
								<div className="text-red-500">{errors.password}</div>
							) : null}

							<button
								type="submit"
								className="flex mt-6 w-full justify-center rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:bg-indigo-800"
							>
								Log In
							</button>
							<div
                className="text-sm  cursor-pointer hover:text-gray-900 text-center pt-4"
                onClick={() => router.push("./register")}
              >
                <p>Don't have have an account? Sign Up</p>
              </div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}