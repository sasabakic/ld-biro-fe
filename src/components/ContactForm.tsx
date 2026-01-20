import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { FormValues, contactValidationSchema } from "../contact/validation";
import { BUSINESS_TYPE_KEYS } from "../lib/constants";

interface ContactFormTranslations {
  form: {
    title: string;
    name: string;
    email: string;
    businessType: {
      label: string;
      placeholder: string;
      options: Record<string, string>;
    };
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
  };
  messages: {
    success: string;
    error: string;
  };
}

interface ContactFormProps {
  translations: ContactFormTranslations;
}

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  businessType: "",
  message: "",
};

export default function ContactForm({ translations: t }: ContactFormProps) {
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage(result.message || t.messages.success);
        resetForm();
      } else {
        setSubmitMessage(result.error || t.messages.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage(t.messages.error);
    } finally {
      setSubmitting(false);
    }
  };

  const businessTypeOptions = BUSINESS_TYPE_KEYS.map((key) => ({
    key,
    value: t.form.businessType.options[key],
  }));

  const inputClassName =
    "w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const labelClassName = "block text-sm font-semibold text-slate-700 mb-2";
  const errorClassName = "text-red-600 text-sm mt-1";

  return (
    <div className="bg-slate-50 p-8 rounded-2xl">
      <h3 className="text-2xl font-semibold text-slate-900 mb-6">
        {t.form.title}
      </h3>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={contactValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {/* Name Field */}
            <div>
              <label className={labelClassName}>{t.form.name}</label>
              <Field type="text" name="name" className={inputClassName} />
              <ErrorMessage
                name="name"
                component="div"
                className={errorClassName}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className={labelClassName}>{t.form.email}</label>
              <Field type="email" name="email" className={inputClassName} />
              <ErrorMessage
                name="email"
                component="div"
                className={errorClassName}
              />
            </div>

            {/* Business Type Field */}
            <div>
              <label className={labelClassName}>
                {t.form.businessType.label}
              </label>
              <Field as="select" name="businessType" className={inputClassName}>
                <option value="">{t.form.businessType.placeholder}</option>
                {businessTypeOptions.map((option) => (
                  <option key={option.key} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="businessType"
                component="div"
                className={errorClassName}
              />
            </div>

            {/* Message Field */}
            <div>
              <label className={labelClassName}>{t.form.message}</label>
              <Field
                as="textarea"
                name="message"
                rows={4}
                className={inputClassName}
                placeholder={t.form.messagePlaceholder}
              />
              <ErrorMessage
                name="message"
                component="div"
                className={errorClassName}
              />
            </div>

            {/* Submit Message */}
            {submitMessage && (
              <div
                className={`p-4 rounded-lg ${
                  submitMessage === t.messages.success
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {submitMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isSubmitting ? t.form.submitting : t.form.submit}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
