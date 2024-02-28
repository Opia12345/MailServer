import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Formik, ErrorMessage, Field, Form } from "formik";
import * as yup from "yup";
import emailjs from "@emailjs/browser";

const Compose = () => {
  const [submit, setSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [err, setErr] = useState(false);

  const validationSchema = yup.object().shape({
    name: yup.string().required("This field is required"),
    email: yup
      .string()
      .email("Invalid Email Address")
      .required("Email is required"),
    message: yup.string().required("This field is required"),
  });

  const serviceId = "service_k8kfw2f";
  const templateId = "template_krfiuga";
  const userId = "VJ4rHiYnTwTuc_Kw1";

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const submitForm = (values, { resetForm }) => {
    const { name, email, message } = values;
    setIsSubmitting(true);
    emailjs
      .send(
        serviceId,
        templateId,
        { from_name: name, to_email: email, message: message },
        userId
      )
      .then(
        (result) => {
          console.log(result);
          if (result.status === 200) {
            setSubmit(true);
            setTimeout(() => {
              setSubmit(false);
            }, 3000);
            setIsSubmitting(false);
            resetForm();
          }
        },
        (error) => {
          console.error(error);
          setIsSubmitting(false);
          setErr(true);
          setTimeout(() => {
            setErr(false);
          }, 3000);
        }
      );
  };
  return (
    <>
      {submit && (
        <div className="fixed z-50 top-0 w-full h-screen left-0 text-white bg-slate-200/5 backdrop-blur-md flex items-center flex-col justify-center">
          <div className="flex flex-col items-center justify-center">
            <img src="confirm.svg" className="w-full" alt="" />
            <b className="text-3xl">Sent!</b>
            <small className="font-semibold">
              Your message has been delivered.
            </small>
          </div>
        </div>
      )}
      {err && (
        <div className="fixed z-50 top-0 w-full h-screen left-0 text-white bg-slate-200/5 backdrop-blur-md flex items-center flex-col justify-center">
          <div className="flex flex-col items-center justify-center">
            <img src="fail.png" className="w-full" alt="" />
            <b className="text-3xl">Sorry!</b>
            <small className="font-semibold">
              There seems to be a problem. Please check your internet connection
              or try again later.
            </small>
          </div>
        </div>
      )}
      <section className="ml-[300px] p-10">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          <Form id="emailForm">
            <div className="space-y-3">
              <div className="flex flex-col space-x-3">
                <span className="flex space-x-2 w-[90%]">
                  <label htmlFor="">From:</label>
                  <Field
                    className="w-[100%] bg-transparent outline-none border-b"
                    type="email"
                    name="email"
                  />
                </span>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex flex-col space-x-3">
                <span className="flex space-x-1 w-[90%]">
                  <label htmlFor="">Name:</label>
                  <Field
                    className="w-[100%] bg-transparent outline-none border-b"
                    type="text"
                    name="name"
                  />
                </span>
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>
            <div className="fixed bottom-4 w-full">
              <span className="flex items-center space-x-2">
                <Field
                  as="textarea"
                  type="text"
                  name="message"
                  rows={2}
                  className="w-[70%] bg-transparent outline-none border rounded-md"
                />

                {isSubmitting ? (
                  <button className="p-3 border-blue-600 border-2 rounded-md">
                    <div className="loading">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={submitForm}
                    className="bg-blue-600 p-3 border-blue-600 border-2 rounded-md"
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                )}
              </span>
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500"
              />
            </div>
          </Form>
        </Formik>
      </section>
    </>
  );
};

export default Compose;
