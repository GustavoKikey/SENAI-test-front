import React from "react";
import { Formik, Form } from "formik";

const MyForm = ({ initialValues, validationSchema, onSubmit, children }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="needs-validation">{children}</Form>
    </Formik>
  );
};

export default MyForm;
