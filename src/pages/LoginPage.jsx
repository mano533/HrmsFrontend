import { useEffect, useState } from "react";
import { Form } from "antd";
import DynamicForm from "../reuseableComponents/DynamicForm";
import ButtonComponent from "../reuseableComponents/ButtonComponent";
import jsonData from "../data/jsonData.json";
import { userDetailsData } from "../Redux/features/userSlice";
import useApiServices from "../Services/ApiServices";
import axios from "axios";
import { useDispatch } from "react-redux";

function LoginPage({ onLogin }) {

  const { getApi, postApi } = useApiServices()
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const [state, setState] = useState({
    formFields: jsonData.loginFormFields,
    message: "",
    loading: false,
  });

  const handleFieldsChange = (fields) => {
    setState((current) => ({
      ...current,
      formFields: current.formFields.map(
        (field) =>
          fields.find((updated) => updated.name === field.name) || field,
      ),
    }));
  };

  const handleSubmit = async (values) => {
    console.log("values", values);

    setState((current) => ({ ...current, loading: true, message: "" }));
    let url = "https://localhost:7151/api/AuthControllers/login"
    let params = {
      username: values.username,
      password: values.password,
    }


    try {
      let response = await axios.post(url, params)
      onLogin(response.data);
      localStorage.setItem("token", response.data.token)
      dispatch(userDetailsData(response.data))
    } catch (error) {
      setState((current) => ({
        ...current,
        loading: false,
        message: error.response?.data || "Invalid email or password.",
      }));
    }
  };

  return (
    <main className="login-screen">
      <section className="login-showcase">
        <p className="login-showcase-kicker">PROJECT SHOWCASE</p>
        <h1>HRMS</h1>
        <h2>Human Resource<br />Management System</h2>
        <p className="login-showcase-copy">
          One workspace for people,<br />processes, payroll, and performance.
        </p>
        <div className="login-showcase-tags">
          <span>React + Vite</span>
          <span>ASP.NET Core</span>
          <span>PostgreSQL</span>
        </div>
      </section>

      <section className="login-card">


        <div className="login-content">
          <h1>Welcome back</h1>
          <p className="login-muted">Sign in to continue to your workspace.</p>
        </div>

        <Form form={form} layout="vertical" onFinish={handleSubmit} className="login-form">
          <DynamicForm
            form={form}
            formFields={state.formFields}
            getFieldsValueHandel={handleFieldsChange}
          />
          <div className="flex justify-end">

            <ButtonComponent
              className="login-submit"
              htmlType="submit"
              loading={state.loading}
              disabled={state.loading}
            >
              {state.loading ? "Signing in..." : "Sign in"}
              {!state.loading && <span className="arrow-icon">→</span>}
            </ButtonComponent>

          </div>

          {state.message && (
            <div className="login-error-wrapper">
              <span className="error-icon">⚠️</span>
              <p className="login-error">{state.message}</p>
            </div>
          )}
        </Form>

        <div className="login-note-wrapper">
          <div className="note-icon">📦</div>
          <small className="login-note">
            Demo users are stored in the local JSON file until backend
            authentication is connected.
          </small>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
