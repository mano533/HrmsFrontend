import { useEffect, useMemo, useState } from "react";
import { Form } from "antd";
import jsonData from "../../data/jsonData.json";
import addCompanyForm from "../../data/addCompanyForm.json";
import ButtonComponent from "../../reuseableComponents/ButtonComponent";
import DynamicForm from "../../reuseableComponents/DynamicForm";
import InputComponent from "../../reuseableComponents/InputComponent";

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
const sections = [
  {
    title: "Company Details",
    columns: [
      [
        text("Company Code", "companyCode"),
        text("Company Name", "name", true),
        text("Formal Name", "formalName"),
        text("Website", "website", true),
        text("ESS Website", "essWebsite", true),
        select("Source", "source"),
        select("Sourcing Type", "sourcingType", ["--Sourcing Type--"]),
        select("Client Type", "clientType", ["All"]),
        text("Payroll Input Max Files allowed", "maxFiles"),
        select(
          "Business",
          "business",
          ["--Select--", "IT", "ITES", "NonIT"],
          true,
        ),
        select("Sister Company", "sisterCompany"),
      ],
      [
        text("Short Name", "shortName"),
        text("Posted By", "postedBy"),
        text("Department", "department"),
        text("Designation", "designation"),
        select("Revenue", "revenue"),
        select("Reputation", "reputation", ["--Select--"], true),
        text("Date Posted", "datePosted"),
        select("Status", "status", ["--Status--"], true),
        select("Employees", "employees"),
        text("CC Email Alert", "ccEmailAlert"),
        text("Company File Name", "companyFileName", true),
        text("Query Mailid", "queryMailid"),
        text("Width", "width"),
        text("Height", "height"),
        text("Company Other Name", "otherName"),
      ],
    ],
  },
  {
    title: "Address Company",
    columns: [
      [
        text("Address 1", "address1", true),
        text("Address 3", "address3"),
        text("Address 5", "address5"),
        text("State", "state", true),
        text("Postal Code", "postalCode", true),
      ],
      [
        text("Address 2", "address2"),
        text("Address 4", "address4"),
        text("City", "city", true),
        text("Country", "country", true),
      ],
    ],
  },
  {
    title: "Phone Company",
    columns: [
      [
        text("Business Area", "businessArea"),
        text("Business Number", "businessNumber", true),
        text("Fax Area", "faxArea"),
        text("Fax Number", "faxNumber"),
      ],
      [text("Email Info", "emailInfo"), text("Email Support", "emailSupport")],
    ],
  },
  {
    title: "Contact Person",
    columns: [
      [
        select("Salutation", "salutation", ["--Select--"], true),
        text("First Name", "firstName", true),
        text("Designation", "contactDesignation", true),
      ],
      [
        text("Last Name", "lastName", true),
        text("Department", "contactDepartment", true),
      ],
    ],
  },
  {
    title: "Contact Phone",
    columns: [
      [
        text("Business Area", "contactBusinessArea"),
        text("Business Number", "contactBusinessNumber"),
        text("Mobile Area", "mobileArea"),
        text("Mobile Number", "mobileNumber"),
      ],
      [text("Business Email", "businessEmail", true)],
    ],
  },
  {
    title:
      "TDS Details (Enter the details of the person responsible for deduction of tax)",
    columns: [
      [
        text("PAN/GIR No", "panGir", true),
        text("Full Name", "tdsFullName", true),
        text("Father Name", "fatherName", true),
        text("Email", "tdsEmail", true),
        text("Mobile No.", "tdsMobile", true),
      ],
      [
        text("TAN No", "tanNo", true),
        text("Designation", "tdsDesignation", true),
        text("Phone No.", "tdsPhone", true),
        text("Place", "tdsPlace", true),
        text("Asmt. Range", "asmtRange"),
      ],
    ],
  },
  {
    title: "CIT (TDS) Address",
    columns: [
      [
        text("CIT Name", "citName"),
        text("Address1", "citAddress1"),
        text("Address2", "citAddress2"),
      ],
      [text("City", "citCity"), text("PIN", "citPin")],
    ],
  },
  {
    title: "Tax Consultant Employee",
    columns: [
      [
        checkbox(
          "Enable income tax calculation for consultant employees",
          "incomeTaxConsultant",
        ),
        checkbox(
          "Enable PT calculation for consultant employees",
          "ptConsultant",
        ),
      ],
      [text("Consultant Rate %", "consultantRate")],
    ],
  },
  {
    title: "SBI Account Details",
    columns: [
      [
        text("SBI Account No", "sbiAccount"),
        text("SBI Reference Number", "sbiReference"),
      ],
      [text("SBI Code", "sbiCode")],
    ],
  },
  {
    title: "Invoice Details",
    columns: [
      [
        text("Company VAT TIN", "vatTin"),
        text("NEFT/RTGS No.", "neft"),
        text("Branch", "branch"),
      ],
      [
        text("Service Tax No.", "serviceTax"),
        text("A/C Number No.", "accountNumber"),
        text("Bank Name", "bankName"),
      ],
    ],
  },
  {
    title: "Preference, Permission and Alert Options",
    columns: [
      [
        checkbox("Send email alert to HR", "alertHr"),
        checkbox("Enable ESS Website For Employees", "essEmployees"),
        checkbox("Payslip to come with Reimbursement", "payslipReimbursement"),
        checkbox(
          "Can only generate PF monthly report, if payroll is locked, salary processed and PF TAT is set",
          "pfMonthlyReport",
        ),
        checkbox(
          "Allow reimbursement excess transaction claim posting",
          "excessClaim",
        ),
        checkbox(
          "Consider OnBoarding Group Mandatory for onboarding",
          "onboardingMandatory",
        ),
        checkbox(
          "Companywise bank Duplicate Account Number Check",
          "duplicateBank",
        ),
        checkbox("LIFA Enabled", "lifa"),
        checkbox("Leave Bulk Approval", "bulkApproval"),
      ],
      [
        checkbox("Enable employee change request workflow", "changeWorkflow"),
        checkbox("Employee No. as Username", "employeeUsername", true),
        checkbox(
          "Display subclient logo and address in payslip",
          "subclientPayslip",
        ),
        checkbox(
          "Consider for second level password authentication",
          "secondLevelAuth",
        ),
        checkbox("Payroll Migration", "payrollMigration"),
        checkbox(
          "Generate Salary Statement with reimbursement",
          "salaryReimbursement",
        ),
        checkbox("Varthana PMS", "varthanaPms"),
        checkbox("Enable IT Vouching", "itVouching"),
      ],
    ],
  },
  {
    title: "Attachment Limit",
    columns: [
      [
        text("HRMS forms max files", "hrmsMaxFiles"),
        text("Document center max files", "documentMaxFiles"),
        text("Bulletin board max files", "bulletinMaxFiles"),
        text("Pre Onboarding attachment size", "preOnboardingSize"),
      ],
      [
        text("Max size limit (Kbs)", "hrmsMaxSize"),
        text("Max size limit (Kbs)", "documentMaxSize"),
        text("Max size limit (Kbs)", "bulletinMaxSize"),
      ],
    ],
  },
  {
    title: "CTC Component",
    columns: [[select("CTC Component", "ctcComponent")], []],
  },
  {
    title: "Leave, Attendance and Permission Configuration",
    columns: [
      [
        text("Permission per Month", "permissionMonth", true),
        text("Leave Cut Off Days", "leaveCutOff", true),
      ],
      [text("Permission Hours per Month", "permissionHours", true)],
    ],
  },
  {
    title: "Challan Upload Cut Off",
    columns: [[text("Challan Upload Cut Off Date", "challanCutOff")], []],
  },
  {
    title: "PF Details",
    columns: [
      [
        text("PF Account No", "pfAccount"),
        text("PF % Deduction", "pfDeduction"),
        text("PF Admin %", "pfAdmin"),
        text("EDLI Admin%", "edliAdmin"),
        checkbox("Auto Generate Employee PF No", "autoPf"),
      ],
      [
        text("PF Base Limit", "pfBase"),
        text("EPS", "eps"),
        text("PF", "pf"),
        text("% of EDLI", "edli"),
        text("PF Establishment Code", "pfCode"),
        text("PF Establishment Id", "pfId"),
      ],
    ],
  },
  {
    title:
      "ESIC Details (Enter the details of the person responsible for ESIC deduction)",
    columns: [
      [
        text("ESIC Account No", "esicAccount"),
        text("ESIC Deduction", "esicDeduction"),
        text("Full Name", "esicName", true),
        text("Place", "esicPlace", true),
      ],
      [
        text("ESIC Cut Off Limit", "esicLimit"),
        text("Contribution", "esicContribution"),
        text("Designation", "esicDesignation", true),
      ],
    ],
  },

];

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
  const saveCompany = (values) => {
    const company = { ...formValues, ...values };
    console.log("company", company);

    if (!company.CompanyName?.trim() || !company.CompanyCode?.trim()) return;
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
