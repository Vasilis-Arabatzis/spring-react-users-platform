import { useState } from "react";
import { createUser } from "../api/userApi";

export default function CreateUser({ onCreated }) {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (!form.firstName || !form.lastName || !form.email) {
            alert("All fields are required");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            alert("Invalid email format");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        await createUser(form);

        setForm({
            firstName: "",
            lastName: "",
            email: "",
        });

        onCreated(); // reload list
    };

    return (
        <div style={{ marginBottom: 20 }}>
            <h3>Create User</h3>

            <form onSubmit={handleSubmit}>
                <input
                    name="firstName"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={handleChange}
                />

                <input
                    name="lastName"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={handleChange}
                />

                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <button type="submit">Create</button>
            </form>
        </div>
    );
}