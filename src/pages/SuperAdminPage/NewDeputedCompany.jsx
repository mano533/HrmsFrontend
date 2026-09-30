import { useState } from "react";
import { Col, Form, Row } from "antd";
import ButtonComponent from "../../reuseableComponents/ButtonComponent";
import { renderfields } from "../../reuseableComponents/DynamicForm";

const field = (name, label, type = "number", required = false, options = []) => ({
  id: name,
  name,
  label,
  value: type === "number" ? "0" : type === "checkbox" ? false : "",
  type,
  options: options.map((option) => ({ label: option, value: option })),
  isError: false,
  isMandatory: required,
  isDisabled: false,
  isVisible: true,
  placeholder: type === "dropdown" ? `Select ${label.toLowerCase()}` : `Enter ${label.toLowerCase()}`,
  regexType: "",
  maxLength: "10",
  columnSpace: 6,
});

const invoiceGroups = [
  {
    title: "Invoice Details",
    fields: [
      field("invoiceType", "Invoice Type", "dropdown", true, ["--Select Invoice Type--", "Tax Invoice", "Proforma Invoice"]),
      field("creditPeriod", "Credit Period", "number", true),
      field("isSezLocation", "Is SEZ Location", "dropdown", true, ["--Select--", "Yes", "No"]),
      field("serviceTax", "Service Tax", "number", true),
      field("secondaryCess", "Secondary Cess", "number", true),
      field("educationCess", "Education Cess", "number", true),
      field("eSugamNo", "e-Sugam No", "text", true),
      field("deliveryNote", "Delivery Note", "text", true),
      field("supplierReference", "Supplier's Ref", "text"),
      field("otherReferences", "Other References", "text"),
      field("buyersOrderNo", "Buyer's Order No", "text"),
      field("despatchDocumentNo", "Despatch Document No", "text"),
      field("despatchedThrough", "Despatched Through", "text"),
      field("termsOfDelivery", "Terms Of Delivery", "text"),
      field("invoicePrefix", "Invoice Prefix", "text"),
      field("invoiceSuffix", "Invoice Suffix", "text"),
    ],
  },
  {
    title: "Deliver To Contact",
    fields: [
      field("deliverContactName", "Contact Name", "text", true),
      field("deliverCompanyName", "Company Name", "text", true),
      field("deliverDepartment", "Department", "text", true),
      field("deliverAddress1", "Address1", "text", true),
      field("deliverAddress2", "Address2"),
      field("deliverAddress3", "Address3"),
      field("deliverPincode", "Pincode", "text", true),
      field("deliverCity", "City", "text", true),
      field("deliverState", "State", "text", true),
      field("deliverPhone", "Phone", "text", true),
    ],
  },
  {
    title: "Bill To Contact",
    fields: [
      field("billContactName", "Contact Name", "text", true),
      field("billCompanyName", "Company Name", "text", true),
      field("billDepartment", "Department", "text", true),
      field("billAddress1", "Address1", "text", true),
      field("billAddress2", "Address2"),
      field("billAddress3", "Address3"),
      field("billPincode", "Pincode", "text", true),
      field("billCity", "City", "text", true),
      field("billState", "State", "text", true),
      field("billPhone", "Phone", "text", true),
    ],
  },
  {
    title: "Bill Description",
    fields: [field("billDescription", "Bill Description", "dropdown", false, ["--Select Items--", "Payroll Month", "Attendance cycle from date", "Attendance cycle to date", "Employee Name"])],
  },
];

const detailGroups = [
  {
    title: "Sub Client Basic Details",
    fields: [
      field("subClientCode", "Sub Client Code", "text", true),
      field("subClientName", "Sub Client Name", "text", true),
      field("businessUnit", "Business Unit", "text", true),
      field("businessDomain", "Business Domain", "dropdown", true, ["--Select Business Domain--", "IT", "Payroll", "Consulting"]),
      field("url", "URL", "text", true),
      field("email", "Email", "email", true),
      field("isPoClient", "Is PO Client", "dropdown", true, ["--Select--", "Yes", "No"]),
      field("status", "Status", "dropdown", true, ["--Select Status--", "Active", "Inactive"]),
      field("accountManager", "Account Manager", "dropdown", true, ["--Select Reporting Manager--"]),
      field("clientCategory", "Client Category", "dropdown", true, ["--Select Client Category--"]),
      field("alertEmailLeave", "Alert Email Leave", "text"),
      field("alertEmailOnboarding", "Alert Email Onboarding", "text"),
      field("alertEmailItDeclaration", "Alert Email IT Declaration", "text"),
      field("shortName", "Short Name", "text"),
      field("reimbursementClaimTat", "Reimbursement Claim TAT"),
      field("alertRequired", "Alert Required", "checkbox"),
      field("enableFbpComponents", "Enable FbpComponents", "checkbox"),
      field("enableItVouching", "Enable IT Vouching", "checkbox"),
      field("appraisalCycle", "Appraisal Cycle", "dropdown", true, ["--Select--", "Financial Cycle", "Joining Date"]),
      field("subClientLogo", "Sub Client Logo", "file"),
      field("displayDeputedCompanyNameInPayslip", "Display Deputed Company Name in Payslip", "checkbox"),
      field("essWebsite", "ESS Website", "text", true),
      field("enableNewEmployeeCreation", "Enable New Employee Creation", "checkbox"),
      field("enableAutoLeaveGrant", "Enable Auto leave grant", "checkbox"),
    ],
  },
  {
    title: "Sub Client Address",
    fields: [
      field("address1", "Address1", "text", true),
      field("address2", "Address2"),
      field("address3", "Address3"),
      field("city", "City", "text", true),
      field("pincode", "Pincode", "text", true),
      field("state", "State", "text", true),
    ],
  },
  {
    title: "Sub Client Phone",
    fields: [
      field("phone", "Phone", "text", true),
      field("mobile", "Mobile", "text", true),
      field("fax", "Fax"),
      field("managerApplyLeaveOnBehalf", "Manager Apply leave on behalf of Employee", "checkbox"),
    ],
  },
  { title: "Remarks", fields: [field("remarks", "Remarks", "textarea")] },
];

const tabs = [
  { label: "Details", groups: detailGroups },
  { label: "Invoice", groups: invoiceGroups },
  {
    label: "Attendance Cycle",
    fields: [
      field("payrollCycleFrom", "Payroll Cycle From", "number", true),
      field("payrollCycleTo", "Payroll Cycle To", "number", true),
      field("docCutOffDays", "DOC Cut Off Days", "number", true),
      field("attendanceCycleFrom", "Attendance Cycle From", "number", true),
      field("attendanceCycleTo", "Attendance Cycle To", "number", true),
      field("attendanceCutOffDays", "Attendance Cut Off Days", "number", true),
      field("maxLateDaysAllowed", "Max Late Days Allowed"),
      field("payrollInputsProcessing", "Payroll Inputs and Processing", "number", true),
      field("payrollDocumentGeneration", "Payroll Document Generation", "number", true),
      field("invoiceGeneration", "Invoice Generation", "number", true),
      field("downloadingPayrollDocuments", "Downloading Payroll Documents", "number", true),
      field("salaryCredited", "Salary Credited", "dropdown", true, ["Last Day Of Month", "First Day Of Month"]),
    ],
  },
  { label: "Head Count", fields: [field("headCount", "Head Count", "number", true), field("headCountCutOffDays", "Head Count Cut Off Days")] },
];

function NewDeputedCompany() {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("Attendance Cycle");
  const [values, setValues] = useState({});
  const activeGroups = tabs.find((tab) => tab.label === activeTab)?.groups || [{ title: `${activeTab} Details`, fields: tabs.find((tab) => tab.label === activeTab)?.fields || [] }];
  const updateValue = ({ target }) => {
    const { name, value, type, checked } = target;
    const nextValue = type === "checkbox" ? checked : value;
    form.setFieldsValue({ [name]: nextValue });
    setValues((current) => ({ ...current, [name]: nextValue }));
  };

  return (
    <main className="deputed-company-page">
      <div className="deputed-company-heading">
        <div>
          <h1>New Deputed Company</h1>
          <p>Administration&nbsp; › &nbsp;Manage&nbsp; › &nbsp;Deputied Client&nbsp; › &nbsp;New Deputed Company</p>
        </div>
      </div>
      <Form form={form} onFinish={(submitted) => setValues((current) => ({ ...current, ...submitted }))}>
        <nav className="deputed-company-tabs" aria-label="Deputed company sections">
          {tabs.map((tab) => <ButtonComponent type="button" key={tab.label} className={activeTab === tab.label ? "active" : ""} onclickButton={() => setActiveTab(tab.label)}>{tab.label}</ButtonComponent>)}
        </nav>
        <section className="deputed-company-panel">
          {activeGroups.map((group) => (
            <div className="deputed-form-group" key={group.title}>
              <h2>{group.title}</h2>
              <Row gutter={[16, 0]} className="deputed-form-row">
                {group.fields.filter((field) => field.isVisible !== false).map((field) => (
                  <Col span={field.columnSpace || 6} xs={24} sm={12} md={field.columnSpace || 6} lg={field.columnSpace || 6} key={field.name}>
                    {renderfields(field, updateValue, form)}
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </section>
        <div className="deputed-company-actions">
          <ButtonComponent htmlType="submit" className="deputed-save-button">Save</ButtonComponent>
          <ButtonComponent type="button" onclickButton={() => form.resetFields()}>Cancel</ButtonComponent>
          <ButtonComponent type="button" isDisabled>Reset Payroll TAT</ButtonComponent>
        </div>
      </Form>
    </main>
  );
}

export default NewDeputedCompany;
