import { Form } from "antd";
import ButtonComponent from "../../reuseableComponents/ButtonComponent";
import DynamicForm from "../../reuseableComponents/DynamicForm";
import UploadComponent from "../../reuseableComponents/uploadComponent";

const documentNameFields = [
  {
    name: "documentName",
    label: "Document Name",
    type: "text",
    value: "",
    isMandatory: true,
    columnSpace: 12,
    placeholder: "Enter Document Name",
  },
  {
    name: "documentStatus",
    label: "Document Status",
    type: "text",
    value: "",
    isMandatory: false,
    columnSpace: 12,
    placeholder: "Enter Document Status",
  },
];

function DocumentDetail() {
  const [form] = Form.useForm();

  return (
    <Form form={form} className="personal-detail-form">
      <section className="personal-detail-section document-detail-section">
        <h2>Document Details</h2>
        <DynamicForm form={form} formFields={documentNameFields} />

        <div className="document-upload-field">
          <label>Upload Document *</label>
          <UploadComponent
            panelType={false}
            buttonName="Upload Document"
            accept=".png,.jpeg,.jpg,.pdf,.svg,.zip"
            handleUpload={() => Promise.resolve()}
            className="document-upload"
          />
        </div>

        <div className="document-actions">
          <ButtonComponent type="button">Download Document</ButtonComponent>
          <ButtonComponent type="button">Approve</ButtonComponent>
          <ButtonComponent type="button">Reject</ButtonComponent>
        </div>
      </section>

      <section className="personal-detail-section document-rules">
        <h2>Document Rules</h2>
        <p>Allowed formats: PNG, JPEG, JPG, PDF, SVG, ZIP</p>
        <p>Maximum file size: 2 MB</p>
        <p>Mandatory documents are marked with *</p>
      </section>
    </Form>
  );
}

export default DocumentDetail;
