const API_URL = "/api/employees";

export const getEmployees = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch employees");
    }

    return response.json();
};

export const getEmployeeById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Employee not found");
    }

    return response.json();
};

export const createEmployee = async (employee) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
    });

    if (!response.ok) {
        throw new Error("Failed to create employee");
    }

    return response.json();
};

export const updateEmployee = async (id, employee) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
    });

    if (!response.ok) {
        throw new Error("Failed to update employee");
    }

    return response.json();
};

export const deleteEmployee = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete employee");
    }
};