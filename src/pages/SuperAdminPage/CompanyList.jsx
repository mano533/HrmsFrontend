import { useEffect, useMemo, useState } from "react";
import { Form } from "antd";
import jsonData from "../../data/jsonData.json";
import addCompanyForm from "../../data/addCompanyForm.json";
import ButtonComponent from "../../reuseableComponents/ButtonComponent";
import DynamicForm from "../../reuseableComponents/DynamicForm";
import InputComponent from "../../reuseableComponents/InputComponent";
import useApiServices from "../../Services/ApiServices";
import { companyApi } from "../../Services/apiUrls";

const configuredSections = addCompanyForm.sections;

let nextFieldId = 1;
const createField = ({ name, label, value = "", type = "text", options = [], isMandatory = false, placeholder, maxLength }) => ({
  id: nextFieldId++,
  name,
  label,
  value,
  type,
  options,
  isError: false,
  isMandatory,
  isDisabled: false,
  isVisible: true,
  placeholder: placeholder || `Enter ${label.toLowerCase()}`,
  regexType: "",
  maxLength: maxLength || (type === "textarea" ? "2000" : "150"),
  columnSpace: 24,
});
const text = (label, name, required = false) => createField({ name, label, isMandatory: required });
const select = (label, name, options = ["--Select--"], required = false) => createField({
  name,
  label,
  type: "dropdown",
  isMandatory: required,
  options: options.map((option) => ({ label: option, value: option })),
});
const checkbox = (label, name, checked = false) => createField({
  name,
  label,
  value: Boolean(checked),
  type: "checkbox",
});


const formSections = [
  ...configuredSections
    .map((section) => ({
      title: section.title,
      fields: section.fields?.flat(),
    })),

];
const configuredInitialForm = Object.fromEntries(
  formSections.flatMap((section) => section.fields).map((field) => [field.name, field.value ?? (field.type === "checkbox" ? false : "")]),
);

const toDynamicFields = (fields) => fields.map((field, index) => ({
  id: field.id || index + 1,
  name: field.name,
  label: field.label,
  value: field.value ?? "",
  type: field.type === "select" ? "dropdown" : ["url", "tel"].includes(field.type) ? "text" : field.type,
  options: (field.options || []).map((option) => typeof option === "string" ? { label: option, value: option } : option),
  isError: false,
  isMandatory: Boolean(field.isMandatory ?? field.required),
  isDisabled: Boolean(field.isDisabled),
  isVisible: field.isVisible !== false,
  placeholder: field.placeholder || `Enter ${field.label.toLowerCase()}`,
  regexType: "",
  maxLength: field.maxLength || "150",
  columnSpace: 8,
}));

function CompanyList({ openForm = false }) {

  const [form] = Form.useForm();
  const [search, setSearch] = useState("");
  const { getApi, postApi } = useApiServices()
  const [companies, setCompanies] = useState(jsonData.companyList || []);
  const [showForm, setShowForm] = useState(openForm);
  const [formValues, setFormValues] = useState(configuredInitialForm);
  useEffect(() => setShowForm(openForm), [openForm]);
  const filteredCompanies = useMemo(
    () =>
      companies.filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [companies, search],
  );
  const handleFieldsChange = (fields) =>
    setFormValues((current) =>
      fields.reduce((next, field) => ({ ...next, [field.name]: field.value }), current),
    );
  const saveCompany = async (values) => {
    const company = { ...formValues, ...values };
    console.log("company", company);

    // if (!company.CompanyName?.trim() || !company.CompanyCode?.trim()) return;
    let url = `${companyApi.createCompany}`

    let responce = await postApi(url, company)
    console.log("responce", responce);

    setCompanies((current) => [
      ...current,
      {
        name: company.CompanyName,
        code: company.CompanyCode,
        created: new Date().toLocaleDateString("en-GB"),
        contact: company.EmailInfo || "",
      },
    ]);
    setShowForm(false);
  };
  const renderSection = (section) => (
    <section className="company-form-section" key={section.title}>
      <h3>{section.title}</h3>
      <div className="company-form-columns">
        <div className="company-form-column">
          <DynamicForm
            form={form}
            formFields={toDynamicFields(section.fields)}
            getFieldsValueHandel={handleFieldsChange}
          />
        </div>
      </div>
    </section>
  );

  return (
    <main className="company-list-page">
      <div className="company-list-heading">
        <div>
          <h1>{showForm ? "Add New Company" : "Company List"}</h1>
          <p>
            Administration&nbsp; › &nbsp;Manage&nbsp; › &nbsp;
            {showForm ? "New Company" : "Company List"}
          </p>
        </div>
      </div>
      {showForm ? (
        <Form form={form} className="company-full-form" onFinish={saveCompany}>
          <div className="company-form-intro">
            <strong>The below form intends to capture company details.</strong>
            <span>Please ensure that you enter the right details.</span>
          </div>
          {formSections.map(renderSection)}
          <div className="company-form-actions">
            <ButtonComponent onclickButton={() => setShowForm(false)}>
              Cancel
            </ButtonComponent>
            <ButtonComponent htmlType="submit" className="company-save-button" onclickButton={form.submit()}>
              Save Company
            </ButtonComponent>
          </div>
        </Form>
      ) : (
        <section className="company-list-panel">
          <div className="company-list-toolbar">
            <strong>Companies</strong>
            <InputComponent
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search company..."
            />
          </div>
          <div className="company-list-table-wrap">
            <table className="company-list-table">
              <thead>
                <tr>
                  <th>SL. No.</th>
                  <th>Company</th>
                  <th>Code</th>
                  <th>Created</th>
                  <th>Contact</th>
                  <th>Permission</th>
                  <th>HR Input Lock</th>
                  <th>FBP Option</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((item, index) => (
                  <tr key={`${item.code}-${index}`}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.code}</td>
                    <td>{item.created}</td>
                    <td>{item.contact}</td>
                    <td>
                      <ButtonComponent>Edit Permission</ButtonComponent>
                    </td>
                    <td>
                      <ButtonComponent>Lock Fields</ButtonComponent>
                    </td>
                    <td>
                      <ButtonComponent>Set FBP</ButtonComponent>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredCompanies.length === 0 && (
            <p className="company-list-empty">No companies found.</p>
          )}
        </section>
      )}
    </main>
  );
}

export default CompanyList;
