import { Form } from "antd";
import DynamicForm from "../../reuseableComponents/DynamicForm";

const fields = [
  {
    name: "organization",
    label: "Organization",
    type: "text",
    isMandatory: true,
    columnSpace: 12,
    value: "",
    placeholder: "Enter Organization",
  },
  {
    name: "periodFrom",
    label: "Period From",
    type: "date",
    isMandatory: true,
    columnSpace: 12,
    value: "",
    placeholder: "Enter Period From",
  },
  {
    name: "periodTo",
    label: "Period To",
    type: "date",
    isMandatory: true,
    columnSpace: 12,
    value: "",
    placeholder: "Enter Period To",
  },
  {
    name: "designation",
    label: "Designation",
    type: "text",
    isMandatory: true,
    columnSpace: 12,
    value: "",
    placeholder: "Enter Designation",
  },
  {
    name: "majorResponsibilities",
    label: "Major Responsibilities",
    type: "textarea",
    isMandatory: true,
    columnSpace: 24,
    value: "",
    placeholder: "Enter Major Responsibilities",
  },
  {
    name: "reasonForSeparation",
    label: "Reason for Separation",
    type: "textarea",
    isMandatory: true,
    columnSpace: 24,
    value: "",
    placeholder: "Enter Reason for Separation",
  },
];

function CareerDetail() {
  const [form] = Form.useForm();

  return (
    <Form form={form} className="personal-detail-form">
      <DynamicForm form={form} formFields={fields} />
    </Form>
  );
}

export default CareerDetail;
