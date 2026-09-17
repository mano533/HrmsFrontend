import { Form } from "antd";
import DynamicForm from "../../reuseableComponents/DynamicForm";

const textField = (name, label, isMandatory = false, type = "text") => ({
    name,
    label,
    type,
    value: "",
    isMandatory,
    isVisible: true,
    columnSpace: 6,
    placeholder: `Enter ${label}`,
});

const dropdownField = (name, label, options, isMandatory = false) => ({
    ...textField(name, label, isMandatory),
    type: "dropdown",
    options: options.map((value) => ({ label: value, value })),

});

const personalInformation = [
    textField("firstName", "First Name", true),
    textField("lastName", "Last Name"),
    textField("dateOfBirth", "Date of Birth", true, "date"),
    textField("age", "Age", false, "number"),
    dropdownField("gender", "Gender", ["Male", "Female", "Other"], true),
    dropdownField("bloodGroup", "Blood Group", ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], true),
    textField("fatherName", "Father Name", true),
];

const contactInformation = [
    textField("phoneNumber", "Phone Number", true),
    textField("email", "Email", true),
    textField("emergencyContactNumber", "Emergency Contact Number", true),
    textField("emergencyContactName", "Emergency Contact Name", true),
    textField("panNumber", "PAN Number", true),
    textField("aadhaarNumber", "Aadhaar Number / NIC Number", true),
    textField("pfUanNumber", "PF UAN Number"),
];

const permanentAddress = [
    textField("permanentHouse", "House / Flat / Block No", true),
    textField("permanentStreet", "Street / Road / Area", true),
    textField("permanentState", "State", true),
    textField("permanentCity", "City", true),
    textField("permanentPincode", "Pincode", true),
];

const presentAddress = [
    {
        ...textField("sameAsPermanentAddress", "Same As Permanent Address"),
        type: "checkbox",
        columnSpace: 24,
    },
    textField("presentHouse", "House / Flat / Block No", true),
    textField("presentStreet", "Street / Road / Area", true),
    textField("presentState", "State", true),
    textField("presentCity", "City", true),
    textField("presentPincode", "Pincode", true),
];

const sections = [
    ["Personal Information", personalInformation],
    ["Contact Information", contactInformation],
    ["Permanent Address", permanentAddress],
    ["Present Address", presentAddress],
];

function PersonalDetail() {
    const [form] = Form.useForm();

    return (
        <Form form={form} className="personal-detail-form">
            {sections.map(([title, fields]) => (
                <section className="personal-detail-section" key={title}>
                    <h2>{title}</h2>
                    <DynamicForm form={form} formFields={fields} />
                </section>
            ))}
        </Form>
    );
}

export default PersonalDetail;
