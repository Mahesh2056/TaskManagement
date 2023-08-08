import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  address: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phoneNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const Register = () => (
  <center>
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          fullName: "",
          address: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <Field placeholder="fullName" name="fullName" />
              {errors.fullName && touched.fullName ? (
                <div>{errors.fullName}</div>
              ) : null}
            </div>
            <div>
              <Field placeholder="address" name="address" />
              {errors.address && touched.address ? (
                <div>{errors.address}</div>
              ) : null}
            </div>
            <div>
              <Field placeholder="email" name="email" type="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
            </div>
            <div>
              <Field placeholder="phoneNumber" name="phoneNumber" />
              {errors.phoneNumber && touched.phoneNumber ? (
                <div>{errors.phoneNumber}</div>
              ) : null}
            </div> 
            <div>
              <Field placeholder="password" name="password" />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </center>
);

export default Register;
