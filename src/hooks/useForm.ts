import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchInitialData, updateData } from "../utils/api";

const useForm = () => {
  const [id, setId] = useState<number | string>(1);

  const validationSchema = Yup.object({
    nome: Yup.string().required("Nome é obrigatório"),
    cep: Yup.string(),
    endereco: Yup.string(),
    bairro: Yup.string(),
    fone: Yup.string().required("Telefone é obrigatório"),
  });

  const formik = useFormik({
    initialValues: {
      nome: "",
      cep: "",
      endereco: "",
      bairro: "",
      fone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const updatedData = await updateData({
        ...values,
        id,
        cnpjCpf: "",
      });
      console.log(updatedData);
    },
  });

  useEffect(() => {
    const loadData = async () => {
      const idValue = 1;
      setId(idValue);
      const data = await fetchInitialData(String(idValue));
      formik.setValues(data);
    };
    loadData();
  }, [formik]);

  return formik;
};

export default useForm;
