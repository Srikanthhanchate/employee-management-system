import { useEffect, useState } from "react";

import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import EditEmployee from "./components/EditEmployee";

import {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} from "./services/employeeService";

function App() {
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const loadEmployees = async () => {
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            alert(error.message);
        }
    };

    // Load employees when the application starts.
    // The API call updates React state asynchronously.
    useEffect(() => {
        loadEmployees(); // eslint-disable-line react-hooks/set-state-in-effect
    }, []);

    const handleAddEmployee = async (employee) => {
        await createEmployee(employee);
        await loadEmployees();
        setShowAddForm(false);
    };

    const handleUpdateEmployee = async (id, employee) => {
        await updateEmployee(id, employee);
        await loadEmployees();
        setEditingEmployee(null);
    };

    const handleDeleteEmployee = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmed) return;

        try {
            await deleteEmployee(id);
            await loadEmployees();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleViewEmployee = async (id) => {
        try {
            const employee = await getEmployeeById(id);

            alert(
                `Employee Details\n\n` +
                `ID: ${employee.id}\n` +
                `Name: ${employee.name}\n` +
                `Department: ${employee.department}\n` +
                `Email: ${employee.email}`
            );
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="app">

            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo">
                    <div className="logo-icon">EM</div>

                    <div>
                        <h2>Employee</h2>
                        <span>Management</span>
                    </div>
                </div>

                <nav>
                    <div className="nav-item active">
                        <span>▦</span>
                        Dashboard
                    </div>

                    <div className="nav-item">
                        <span>♙</span>
                        Employees
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <span className="status-dot"></span>
                    System Online
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">

                {/* Header */}
                <header className="topbar">
                    <div>
                        <p className="breadcrumb">
                            Dashboard / Employees
                        </p>

                        <h1>Employee Management</h1>

                        <p className="subtitle">
                            Manage your team members and employee records.
                        </p>
                    </div>

                    <button
                        className="add-button"
                        onClick={() => setShowAddForm(!showAddForm)}
                    >
                        <span>＋</span>
                        Add Employee
                    </button>
                </header>

                {/* Statistics */}
                <section className="stats">

                    <div className="stat-card">
                        <div className="stat-icon">👥</div>

                        <div>
                            <p>Total Employees</p>
                            <h2>{employees.length}</h2>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">💻</div>

                        <div>
                            <p>Departments</p>

                            <h2>
                                {
                                    new Set(
                                        employees.map(
                                            (employee) =>
                                                employee.department
                                        )
                                    ).size
                                }
                            </h2>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">✓</div>

                        <div>
                            <p>System Status</p>
                            <h2 className="online">
                                Active
                            </h2>
                        </div>
                    </div>

                </section>

                {/* Add Employee Form */}
                {showAddForm && (
                    <div className="form-card">
                        <EmployeeForm
                            onEmployeeAdded={handleAddEmployee}
                        />
                    </div>
                )}

                {/* Edit Employee Form */}
                {editingEmployee && (
                    <div className="form-card">
                        <EditEmployee
                            employee={editingEmployee}
                            onEmployeeUpdated={handleUpdateEmployee}
                            onCancel={() => setEditingEmployee(null)}
                        />
                    </div>
                )}

                {/* Employee Table */}
                <section className="employee-card">

                    <div className="card-header">

                        <div>
                            <h2>Employees</h2>

                            <p>
                                All registered employees
                            </p>
                        </div>

                        <span className="employee-count">
                            {employees.length} Records
                        </span>

                    </div>

                    <EmployeeList
                        employees={employees}
                        onEdit={setEditingEmployee}
                        onDelete={handleDeleteEmployee}
                        onView={handleViewEmployee}
                    />

                </section>

            </main>
        </div>
    );
}

export default App;