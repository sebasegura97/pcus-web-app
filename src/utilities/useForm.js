import { useState } from "react";

export const useForm = (handleSubmit, initialValues = {}) => {
  const [values, setValues] = useState(initialValues);

  const onChange = (event, obj) => {
    if (event !== null)
      setValues({ ...values, [event.target.name]: event.target.value });
    if (obj) setValues({ ...values, ...obj });
  };

  const onSubmit = event => {
    event.preventDefault();
    if (handleSubmit instanceof Function) {
      handleSubmit(values);
    }
  };

  return {
    onChange,
    onSubmit,
    values,
    setValues
  };
};
