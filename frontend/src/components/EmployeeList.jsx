function EmployeeList({
    employees,
    onEdit,
    onDelete,
    onView,
}) {
    return (
        <div className="table-wrapper">

            <table className="employee-table">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>EMPLOYEE</th>
                        <th>DEPARTMENT</th>
                        <th>EMAIL</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>

                <tbody>

                    {employees.map((employee) => (

                        <tr key={employee.id}>

                            <td>
                                <span className="employee-id">
                                    #{employee.id}
                                </span>
                            </td>

                            <td>
                                <div className="employee-name">

                                    <div className="avatar">
                                        {employee.name
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div>
                                        <strong>
                                            {employee.name}
                                        </strong>
                                        <small>
                                            Employee
                                        </small>
                                    </div>

                                </div>
                            </td>

                            <td>
                                <span className="department">
                                    {employee.department}
                                </span>
                            </td>

                            <td>
                                <span className="email">
                                    {employee.email}
                                </span>
                            </td>

                            <td>
                                <div className="actions">

                                    <button
                                        className="view-btn"
                                        onClick={() =>
                                            onView(employee.id)
                                        }
                                    >
                                        View
                                    </button>

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            onEdit(employee)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            onDelete(employee.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>
                            </td>

                        </tr>

                    ))}

                    {employees.length === 0 && (
                        <tr>
                            <td
                                colSpan="5"
                                className="empty-state"
                            >
                                No employees found.
                            </td>
                        </tr>
                    )}

                </tbody>

            </table>

        </div>
    );
}

export default EmployeeList;