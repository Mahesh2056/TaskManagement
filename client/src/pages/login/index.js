import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Image from "next/image";

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const Login = () => (
  <center>
    <div>
      <h1>Sign In</h1>
      <Image src={'/taskmana.png'} width={100} height={100} alt="logo/"></Image>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SigninSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <Field placeholder="email" name="email" type="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
            </div>
            <div>
              <Field placeholder="password" name="password" />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
            </div>
            <div>
              <button type="login">Log In</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </center>
);
export default Login;
