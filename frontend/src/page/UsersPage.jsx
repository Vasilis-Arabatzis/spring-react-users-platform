import { useEffect, useState } from "react";
import {
    getUsers,
    deleteUser,
    updateUser,
} from "../api/userApi";
import CreateUser from "./CreateUserPage";

export default function UserPage() {
    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState([]);

    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const [originalUser, setOriginalUser] = useState(null);

    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });

    const loadUsers = () => {
        getUsers().then((res) => setUsers(res.data));
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const toggleSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    const handleDelete = async () => {
        await Promise.all(selected.map((id) => deleteUser(id)));
        setSelected([]);
        loadUsers();
    };

    const startEdit = (user) => {

        setEditId(user.id);

        const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };

        setEditForm(data);
        setOriginalUser(data);
    };

    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const saveEdit = async () => {
        if (!editForm.firstName || !editForm.lastName || !editForm.email) {
            alert("All fields are required");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(editForm.email)) {
            alert("Invalid email");
            return;
        }

        await updateUser(editId, editForm);

        setEditId(null);
        setOriginalUser(null);
        loadUsers();
    };


    const hasChanges = () => {
        if (!originalUser) return false;

        return (
            originalUser.firstName !== editForm.firstName ||
            originalUser.lastName !== editForm.lastName ||
            originalUser.email !== editForm.email
        );
    };

    const cancelEdit = () => {
        if (hasChanges()) {
            const confirmCancel = window.confirm(
                "You have unsaved changes. Cancel edit?"
            );

            if (!confirmCancel) return;
        }

        setEditId(null);
        setOriginalUser(null);
        setEditForm({
            firstName: "",
            lastName: "",
            email: "",
        });
    };

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction:
                prev.key === key && prev.direction === "asc"
                    ? "desc"
                    : "asc",
        }));
    };

    const sortedUsers = [...users].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const valA = a[sortConfig.key] ?? "";
        const valB = b[sortConfig.key] ?? "";

        if (typeof valA === "string" && typeof valB === "string") {
            return sortConfig.direction === "asc"
                ? valA.localeCompare(valB)
                : valB.localeCompare(valA);
        }

        return sortConfig.direction === "asc"
            ? valA - valB
            : valB - valA;
    });

    const isEditing = editId !== null;

    return (
        <div style={{ padding: 20 }}>
            <h2>Users</h2>
            <div style={{ marginBottom: 10 }}>
                <button onClick={handleDelete} disabled={selected.length === 0}>
                    Delete Selected
                </button>

                {editId && (
                    <>
                        <button onClick={saveEdit} style={{ marginLeft: 10 }}>
                            Save
                        </button>

                        <button onClick={cancelEdit} style={{ marginLeft: 10 }}>
                            Cancel
                        </button>
                    </>
                )}
            </div>

            <table border="1" cellPadding="10">
                <thead>
                <tr>

                    <th onClick={() => handleSort("firstName")}>
                        First Name{" "}
                        {sortConfig.key === "firstName"
                            ? sortConfig.direction === "asc"
                                ? "⬆"
                                : "⬇"
                            : ""}
                    </th>

                    <th onClick={() => handleSort("lastName")}>
                        Last Name{" "}
                        {sortConfig.key === "lastName"
                            ? sortConfig.direction === "asc"
                                ? "⬆"
                                : "⬇"
                            : ""}
                    </th>

                    <th onClick={() => handleSort("email")}>
                        Email{" "}
                        {sortConfig.key === "email"
                            ? sortConfig.direction === "asc"
                                ? "⬆"
                                : "⬇"
                            : ""}
                    </th>

                    <th>Select</th>

                    <th>Edit</th>
                </tr>
                </thead>

                <tbody>
                {sortedUsers.map((user) => (
                    <tr key={user.id}>

                        <td>
                            {editId === user.id ? (
                                <input
                                    name="firstName"
                                    value={editForm.firstName}
                                    onChange={handleEditChange}
                                />
                            ) : (
                                user.firstName
                            )}
                        </td>

                        <td>
                            {editId === user.id ? (
                                <input
                                    name="lastName"
                                    value={editForm.lastName}
                                    onChange={handleEditChange}
                                />
                            ) : (
                                user.lastName
                            )}
                        </td>

                        <td>
                            {editId === user.id ? (
                                <input
                                    name="email"
                                    value={editForm.email}
                                    onChange={handleEditChange}
                                />
                            ) : (
                                user.email
                            )}
                        </td>

                        <td>
                            <input
                                type="checkbox"
                                checked={selected.includes(user.id)}
                                onChange={() => toggleSelect(user.id)}
                            />
                        </td>

                        <td>
                            <button
                                onClick={() => startEdit(user)}
                                disabled={isEditing && editId !== user.id}
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}