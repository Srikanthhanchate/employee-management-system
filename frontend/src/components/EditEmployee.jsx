import { useState } from "react";

function EditEmployee({
    employee,
    onEmployeeUpdated,
    onCancel,
}) {

    const [formData, setFormData] = useState({
        name: employee.name,
        department: employee.department,
        email: employee.email,
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await onEmployeeUpdated(
                employee.id,
                formData
            );

            onCancel();

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
                <div className="form-icon">✎</div>

                <div>
                    <h2>Edit Employee</h2>
                    <p>Update employee information</p>
                </div>
            </div>

            <div className="form-grid">

                <input
                    type="text"
                    value={employee.id}
                    disabled
                />

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="form-actions">

                <button
                    type="submit"
                    className="submit-button"
                >
                    Save Changes
                </button>

                <button
                    type="button"
                    className="cancel-button"
                    onClick={onCancel}
                >
                    Cancel
                </button>

            </div>

        </form>
    );
}

export default EditEmployee;    