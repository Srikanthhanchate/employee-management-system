import { useState } from "react";

function EmployeeForm({ onEmployeeAdded }) {

    const [employee, setEmployee] = useState({
        id: "",
        name: "",
        department: "",
        email: "",
    });

    const handleChange = (event) => {
        setEmployee({
            ...employee,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newEmployee = {
            id: Number(employee.id),
            name: employee.name,
            department: employee.department,
            email: employee.email,
        };

        try {
            await onEmployeeAdded(newEmployee);

            setEmployee({
                id: "",
                name: "",
                department: "",
                email: "",
            });

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="employee-form"
        >

            <div className="form-title">
                <div className="form-icon">＋</div>

                <div>
                    <h2>Add New Employee</h2>
                    <p>Create a new employee record</p>
                </div>
            </div>

            <div className="form-grid">

                <input
                    type="number"
                    name="id"
                    placeholder="Employee ID"
                    value={employee.id}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={employee.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={employee.department}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={employee.email}
                    onChange={handleChange}
                    required
                />

            </div>

            <button
                type="submit"
                className="submit-button"
            >
                Create Employee
            </button>

        </form>
    );
}

export default EmployeeForm;