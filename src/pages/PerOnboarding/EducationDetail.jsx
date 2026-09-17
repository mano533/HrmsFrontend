import { Form } from "antd";
import DynamicForm from "../../reuseableComponents/DynamicForm";

const fields = [
  {
    name: "level",
    label: "Level",
    type: "text",
    isMandatory: true,
    columnSpace: 12,
    value: "",
    placeholder: "Enter Level",
  },
  {
    name: "degree",
    label: "Degree",
    type: "text",
    isMandatory: true,
    columnSpace: 12,
    value: "",
    placeholder: "Enter Degree",
  },
  {
    name: "boardUniversity",
    label: "Board / University",
    type: "text",
    isMandatory: true,
    columnSpace: 12,
    value: "",
    placeholder: "Enter Board / University",
  },
  {
    name: "branchSpecialization",
    label: "Branch / Specialization",
    type: "text",
    isMandatory: true,
    columnSpace: 12,
    value: "",
    placeholder: "Enter Branch / Specialization",
  },
  {
    name: "yearOfPassing",
    label: "Year of Passing",
    type: "number",
    isMandatory: true,
    columnSpace: 12,
    value: "",
    placeholder: "Enter Year of Passing",
  },
  {
    name: "marksOrCgpa",
    label: "% of Marks / CGPA",
    type: "number",
    isMandatory: true,
    columnSpace: 12,
    value: "",
    placeholder: "Enter % of Marks / CGPA",
  },
];

function EducationDetail() {
  const [form] = Form.useForm();

  return (
    <Form form={form} className="personal-detail-form">
      <section className="personal-detail-section">
        <h2>Education Details</h2>
        <DynamicForm form={form} formFields={fields} />
      </section>
    </Form>
  );
}

export default EducationDetail;
