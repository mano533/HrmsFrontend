import React, { useMemo, useState } from "react";

import {
    FiSearch,
    FiFilter,
    FiCalendar,
    FiMail,
    FiPhone,
    FiMapPin,
    FiUserPlus,
    FiUsers,
    FiClock,
    FiCheckCircle,
    FiMoreVertical,
    FiEye,
    FiChevronDown,
} from "react-icons/fi";
import DynamicTableComponent from "../../reuseableComponents/DynamicTableComponent";
import ModalComponent from "../../reuseableComponents/ModalComponent";
import { Button, Col, Form, Row } from "antd";
import DynamicForm, { renderfields } from "../../reuseableComponents/DynamicForm";
import jsonData from "../../data/jsonData.json";
import ButtonComponent from "../../reuseableComponents/ButtonComponent";
import DynamicIconComponent from "../../reuseableComponents/IconComponent";

function NewJoiners() {
    const [form] = Form.useForm();
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("All Departments");
    const [status, setStatus] = useState("All Status");
    const [openModel, setOpenModel] = useState(false)


    const newJoiners = [
        {
            id: 1,
            name: "Arun Kumar",
            employeeId: "EMP00125",
            designation: "Software Developer",
            department: "IT",
            joiningDate: "08 Sep 2026",
            email: "arun.kumar@example.com",
            phone: "+91 98765 43210",
            location: "Bangalore",
            status: "Joined",
            initials: "AK",
        },
        {
            id: 2,
            name: "Priya Sharma",
            employeeId: "EMP00126",
            designation: "HR Executive",
            department: "Human Resources",
            joiningDate: "07 Sep 2026",
            email: "priya.sharma@example.com",
            phone: "+91 98765 12345",
            location: "Bangalore",
            status: "Joined",
            initials: "PS",
        },
        {
            id: 3,
            name: "Rahul Raj",
            employeeId: "EMP00127",
            designation: "UI/UX Designer",
            department: "Design",
            joiningDate: "05 Sep 2026",
            email: "rahul.raj@example.com",
            phone: "+91 99887 66554",
            location: "Chennai",
            status: "Onboarding",
            initials: "RR",
        },
        {
            id: 4,
            name: "Sneha Reddy",
            employeeId: "EMP00128",
            designation: "Business Analyst",
            department: "Finance",
            joiningDate: "03 Sep 2026",
            email: "sneha.reddy@example.com",
            phone: "+91 91234 56789",
            location: "Hyderabad",
            status: "Joined",
            initials: "SR",
        },
        {
            id: 5,
            name: "Vikram Singh",
            employeeId: "EMP00129",
            designation: "Backend Developer",
            department: "IT",
            joiningDate: "01 Sep 2026",
            email: "vikram.singh@example.com",
            phone: "+91 90000 12345",
            location: "Bangalore",
            status: "Onboarding",
            initials: "VS",
        },
        {
            id: 6,
            name: "Neha Patel",
            employeeId: "EMP00130",
            designation: "Marketing Executive",
            department: "Marketing",
            joiningDate: "30 Aug 2026",
            email: "neha.patel@example.com",
            phone: "+91 91111 22222",
            location: "Mumbai",
            status: "Joined",
            initials: "NP",
        },
    ];

    const newJoinerColumns = [
        {
            title: "Employee",
            dataIndex: "name",
            key: "employee",
            width: 220,
            render: (_, employee) => (
                <div className="nj-employee">
                    <div className="nj-avatar large">
                        {employee.initials}
                    </div>

                    <div>
                        <strong>{employee.name}</strong>
                        <span>{employee.employeeId}</span>
                    </div>
                </div>
            ),
        },

        {
            title: "Designation",
            dataIndex: "designation",
            key: "designation",
            width: 180,
            render: (_, employee) => (
                <div className="nj-designation">
                    <strong>{employee.designation}</strong>
                    <span>{employee.department}</span>
                </div>
            ),
        },

        {
            title: "Joining Date",
            dataIndex: "joiningDate",
            key: "joiningDate",
            width: 160,
            render: (_, employee) => (
                <div className="nj-date">
                    <FiCalendar />

                    <div>
                        <strong>{employee.joiningDate}</strong>
                        <span>Joining Date</span>
                    </div>
                </div>
            ),
        },

        {
            title: "Contact",
            dataIndex: "email",
            key: "contact",
            width: 230,
            render: (_, employee) => (
                <div className="nj-contact">
                    <span>
                        <FiMail />
                        {employee.email}
                    </span>

                    <span>
                        <FiPhone />
                        {employee.phone}
                    </span>
                </div>
            ),
        },

        {
            title: "Location",
            dataIndex: "location",
            key: "location",
            width: 150,
            render: (_, employee) => (
                <div className="nj-location">
                    <FiMapPin />
                    <span>{employee.location}</span>
                </div>
            ),
        },

        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 130,
            render: (status) => (
                <span
                    className={`nj-status ${status === "Joined" ? "joined" : "onboarding"
                        }`}
                >
                    <span className="status-dot"></span>
                    {status}
                </span>
            ),
        },

        {
            title: "",
            key: "actions",
            width: 100,
            render: (_, employee) => (
                <div className="nj-actions">
                    <button
                        className="nj-icon-button"
                        title="View Employee"
                        onClick={() => handleViewEmployee(employee)}
                    >
                        <FiEye />
                    </button>

                    <button
                        className="nj-icon-button"
                        title="More"
                        onClick={() => handleMoreEmployee(employee)}
                    >
                        <FiMoreVertical />
                    </button>
                </div>
            ),
        },
    ];
    const onclickNewJoiner = () => {
        setOpenModel(true)
    }

    return (
        <div className="new-joiners-page">

            {/* ================= HEADER ================= */}

            <div className="nj-header">

                <div className="nj-header-left">

                    <div className="nj-title-icon">
                        <FiUsers />
                    </div>

                    <div>
                        <h1>New Joiners</h1>

                        <p>
                            Manage and track employees who recently joined
                            your organization.
                        </p>
                    </div>

                </div>
                <ButtonComponent onclickButton={onclickNewJoiner} color="#0000" buttonIcon={<DynamicIconComponent iconName="FiUserPlus" />} ButtonName="Add New Joiner">

                </ButtonComponent>

            </div>

            {/* ================= SUMMARY ================= */}

            <div className="nj-summary-grid">

                <div className="nj-summary-card">

                    <div className="nj-summary-icon blue">
                        <FiUsers />
                    </div>

                    <div className="nj-summary-content">

                        <span>Total New Joiners</span>

                        <strong>24</strong>

                        <small>
                            <span className="positive">
                                +12%
                            </span>{" "}
                            from last month
                        </small>

                    </div>

                </div>

                <div className="nj-summary-card">

                    <div className="nj-summary-icon orange">
                        <FiCalendar />
                    </div>

                    <div className="nj-summary-content">

                        <span>Joined This Week</span>

                        <strong>8</strong>

                        <small>
                            New employees
                        </small>

                    </div>

                </div>

                <div className="nj-summary-card">

                    <div className="nj-summary-icon green">
                        <FiCheckCircle />
                    </div>

                    <div className="nj-summary-content">

                        <span>Successfully Joined</span>

                        <strong>19</strong>

                        <small>
                            <span className="positive">
                                79%
                            </span>{" "}
                            completed
                        </small>

                    </div>

                </div>

                <div className="nj-summary-card">

                    <div className="nj-summary-icon purple">
                        <FiClock />
                    </div>

                    <div className="nj-summary-content">

                        <span>Onboarding Pending</span>

                        <strong>5</strong>

                        <small>
                            Requires attention
                        </small>

                    </div>

                </div>

            </div>

            {/* ================= UPCOMING ================= */}

            <div className="nj-upcoming-card">

                <div className="nj-section-header">

                    <div>

                        <h2>
                            Upcoming & Recent Joiners
                        </h2>

                        <p>
                            Keep track of your newest team members.
                        </p>

                    </div>

                    <button className="nj-view-all">

                        View Calendar

                        <FiChevronDown />

                    </button>

                </div>

                <div className="nj-mini-list">

                    {newJoiners.slice(0, 4).map((employee) => (

                        <div
                            className="nj-mini-item"
                            key={employee.id}
                        >

                            <div className="nj-avatar">
                                {employee.initials}
                            </div>

                            <div className="nj-mini-info">

                                <strong>
                                    {employee.name}
                                </strong>

                                <span>
                                    {employee.designation}
                                </span>

                            </div>

                            <div className="nj-mini-date">

                                <FiCalendar />

                                <span>
                                    {employee.joiningDate}
                                </span>

                            </div>

                            <span
                                className={`nj-status ${employee.status === "Joined"
                                    ? "joined"
                                    : "onboarding"
                                    }`}
                            >
                                <span className="status-dot"></span>

                                {employee.status}

                            </span>

                        </div>

                    ))}

                </div>

            </div>

            {/* ================= FILTER ================= */}

            <div className="nj-toolbar">

                <div className="nj-search">

                    <FiSearch />

                    <input
                        type="text"
                        placeholder="Search by name, employee ID, department..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <div className="nj-filter">

                    <FiFilter />

                    <select
                        value={department}
                        onChange={(e) =>
                            setDepartment(e.target.value)
                        }
                    >
                        <option>All Departments</option>
                        <option>IT</option>
                        <option>Human Resources</option>
                        <option>Design</option>
                        <option>Finance</option>
                        <option>Marketing</option>
                    </select>

                </div>

                <div className="nj-filter">

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                    >
                        <option>All Status</option>
                        <option>Joined</option>
                        <option>Onboarding</option>
                    </select>

                </div>

            </div>

            {/* ================= TABLE ================= */}

            <div className="nj-table-card">

                <div className="nj-table-header">

                    <div>

                        <h2>
                            New Joiners
                        </h2>

                        <p>
                            {newJoiners.length} employees found
                        </p>

                    </div>

                    <button className="nj-filter-button">

                        <FiFilter />

                        More Filters

                    </button>

                </div>



                <DynamicTableComponent
                    columnsData={newJoinerColumns}
                    rowData={newJoiners}
                    uniqueId="id"
                    size="small"
                    loader={false}
                    isPagination={true}
                    isRowSelection={false}
                    customPageSize={5}
                    scroll={{ x: 1100 }}
                />

                {/* <div className="nj-table-wrapper">

                    <table className="nj-table">

                        <thead>

                            <tr>

                                <th>
                                    Employee
                                </th>

                                <th>
                                    Designation
                                </th>

                                <th>
                                    Joining Date
                                </th>

                                <th>
                                    Contact
                                </th>

                                <th>
                                    Location
                                </th>

                                <th>
                                    Status
                                </th>

                                <th></th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredJoiners.map((employee) => (

                                <tr key={employee.id}>

                                    {/* Employee 

                                    <td>

                                        <div className="nj-employee">

                                            <div className="nj-avatar large">
                                                {employee.initials}
                                            </div>

                                            <div>

                                                <strong>
                                                    {employee.name}
                                                </strong>

                                                <span>
                                                    {employee.employeeId}
                                                </span>

                                            </div>

                                        </div>

                                    </td>

                                    {/* Designation 

                                    <td>

                                        <div className="nj-designation">

                                            <strong>
                                                {employee.designation}
                                            </strong>

                                            <span>
                                                {employee.department}
                                            </span>

                                        </div>

                                    </td>

                                    {/* Joining Date 

                                    <td>

                                        <div className="nj-date">

                                            <FiCalendar />

                                            <div>

                                                <strong>
                                                    {employee.joiningDate}
                                                </strong>

                                                <span>
                                                    Joining Date
                                                </span>

                                            </div>

                                        </div>

                                    </td>

                                    {/* Contact 

                                    <td>

                                        <div className="nj-contact">

                                            <span>
                                                <FiMail />
                                                {employee.email}
                                            </span>

                                            <span>
                                                <FiPhone />
                                                {employee.phone}
                                            </span>

                                        </div>

                                    </td>

                                    {/* Location 

                                    <td>

                                        <div className="nj-location">

                                            <FiMapPin />

                                            <span>
                                                {employee.location}
                                            </span>

                                        </div>

                                    </td>

                                    {/* Status 

                                    <td>

                                        <span
                                            className={`nj-status ${employee.status === "Joined"
                                                ? "joined"
                                                : "onboarding"
                                                }`}
                                        >

                                            <span className="status-dot"></span>

                                            {employee.status}

                                        </span>

                                    </td>

                                    {/* Actions 

                                    <td>

                                        <div className="nj-actions">

                                            <button
                                                className="nj-icon-button"
                                                title="View Employee"
                                            >
                                                <FiEye />
                                            </button>

                                            <button
                                                className="nj-icon-button"
                                                title="More"
                                            >
                                                <FiMoreVertical />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    {filteredJoiners.length === 0 && (

                        <div className="nj-empty">

                            <div className="nj-empty-icon">
                                <FiUsers />
                            </div>

                            <h3>
                                No employees found
                            </h3>

                            <p>
                                Try changing your search or filter.
                            </p>

                        </div>

                    )}

                </div>

                {/* ================= PAGINATION ================= 

                <div className="nj-pagination">

                    <span>
                        Showing 1-{filteredJoiners.length} of 24 employees
                    </span>

                    <div className="nj-pages">

                        <button disabled>
                            Previous
                        </button>

                        <button className="active">
                            1
                        </button>

                        <button>
                            2
                        </button>

                        <button>
                            3
                        </button>

                        <button>
                            Next
                        </button>

                    </div>

                </div> */}

            </div>

            <ModalComponent
                openModal={openModel}
                modalWidth={700}
                modalheight={400}
                showButton
                buttonLabel="Save"
                title="Add new Joiner"
                onClose={() => { setOpenModel(false) }}
                modalContent={
                    <div>

                        <Form form={form} className="company-full-form">
                            <DynamicForm
                                form={form}
                                formFields={jsonData.requestPeronboardingfields}
                            // getFieldsValueHandel={handleFieldsChange}
                            />
                        </Form>
                    </div>
                }
            >


            </ModalComponent>
        </div >
    );
}

export default NewJoiners;

