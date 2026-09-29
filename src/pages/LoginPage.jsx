import { useState } from "react";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../reuseableComponents/DynamicForm";
import ButtonComponent from "../reuseableComponents/ButtonComponent";
import jsonData from "../data/jsonData.json";
import { userDetailsData } from "../Redux/features/userSlice";
import useApiServices from "../Services/ApiServices";
import { useDispatch } from "react-redux";
import { generateToken } from "../data/generalFiles";
function LoginPage() {
  const { postApi } = useApiServices();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    setState((current) => ({ ...current, loading: true, message: "" }));
    try {
      await generateToken();
      const params = { username: values.username, password: values.password };
      const loginResponse = await postApi(
        "AuthControllers/ValidateToken",
        params,
      );
      console.log("Login Response:", loginResponse);
      //Save login details in Redux
      dispatch(userDetailsData(loginResponse));
      // Navigate based on role
      if (Number(loginResponse?.isSuperAdmin) === 1) {
        navigate("/super-admin");
      } else if (Number(loginResponse?.isAdmin) === 1) {
        navigate("/admin");
      } else if (Number(loginResponse?.isemployee) === 1) {
        navigate("/employee");
      } else {
        setState((current) => ({
          ...current,
          loading: false,
          message: "User does not have a valid role.",
        }));
      }
    } catch (error) {
      console.log("Login Error:", error);
      localStorage.removeItem("token");
      setState((current) => ({
        ...current,
        loading: false,
        message:
          error.response?.data || error.message || "Invalid email or password.",
      }));
    }
  };
  return (
    <main className="login-screen">
      <section className="login-showcase">
        <p className="login-showcase-kicker"> PROJECT SHOWCASE </p>{" "}
        <h1>HRMS</h1>{" "}
        <h2>
          {" "}
          Human Resource <br /> Management System{" "}
        </h2>{" "}
        <p className="login-showcase-copy">
          {" "}
          One workspace for people, <br /> processes, payroll, and
          performance.{" "}
        </p>{" "}
        <div className="login-showcase-tags">
          {" "}
          <span>React + Vite</span> <span>ASP.NET Core</span>{" "}
          <span>PostgreSQL</span>{" "}
        </div>{" "}
      </section>{" "}
      <section className="login-card">
        {" "}
        <div className="login-content">
          {" "}
          <h1>Welcome back</h1>{" "}
          <p className="login-muted">
            {" "}
            Sign in to continue to your workspace.{" "}
          </p>{" "}
        </div>{" "}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="login-form"
        >
          {" "}
          <DynamicForm
            form={form}
            formFields={state.formFields}
            getFieldsValueHandel={handleFieldsChange}
          />{" "}
          <div className="flex justify-end">
            {" "}
            <ButtonComponent
              className="login-submit"
              htmlType="submit"
              loading={state.loading}
              disabled={state.loading}
            >
              {" "}
              {state.loading ? "Signing in..." : "Sign in"}{" "}
              {!state.loading && <span className="arrow-icon"> → </span>}{" "}
            </ButtonComponent>{" "}
          </div>{" "}
          {state.message && (
            <div className="login-error-wrapper">
              {" "}
              <span className="error-icon"> ⚠️ </span>{" "}
              <p className="login-error"> {state.message} </p>{" "}
            </div>
          )}{" "}
        </Form>{" "}
        <div className="login-note-wrapper">
          {" "}
          <div className="note-icon"> 📦 </div>{" "}
          <small className="login-note">
            {" "}
            Sign in with your HRMS account.{" "}
          </small>{" "}
        </div>{" "}
      </section>{" "}
    </main>
  );
}
export default LoginPage;
