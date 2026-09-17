import { Form } from "antd";
import DynamicForm from "../../reuseableComponents/DynamicForm";

const field = (name, label, type = "text", isMandatory = false) => ({
  name,
  label,
  type,
  value: "",
  isMandatory,
  columnSpace: 12,
  placeholder: `Enter ${label}`,
});

const familyFields = [
  field("name", "Name", "text", true),
  field("gender", "Gender", "text", true),
  field("dateOfBirth", "Date of Birth", "date", true),
  field("age", "Age", "number", true),
  field("nationality", "Nationality", "text", true),
  field("bloodGroup", "Blood Group"),
  field("profession", "Profession", "text", true),
  field("relationship", "Relationship", "text", true),
];

const nomineeFields = [
  field("nominee", "Nominee"),
  field("pfPercentage", "PF %", "number"),
  field("superannuationPercentage", "Superannuation %", "number"),
  field("accidentPercentage", "Accident %", "number"),
  field("giPercentage", "GI %", "number"),
  field("gratuityPercentage", "Gratuity %", "number"),
  field("esiPercentage", "ESI %", "number"),
  field("mediclaimPercentage", "Mediclaim %", "number"),
  field("paymentOfWagesPercentage", "Payment of Wages %", "number"),
];

function FamilyDetail() {
  const [form] = Form.useForm();

  return (
    <Form form={form} className="personal-detail-form">
      <section className="personal-detail-section">
        <h2>Family Details</h2>
        <DynamicForm form={form} formFields={familyFields} />
      </section>
      <section className="personal-detail-section">
        <h2>Nominee Details</h2>
        <DynamicForm form={form} formFields={nomineeFields} />
      </section>
    </Form>
  );
}

export default FamilyDetail;
