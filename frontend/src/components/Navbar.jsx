import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav style={{ padding: "10px", background: "#222", color: "white" }}>
            <Link style={{ marginRight: 10, color: "white" }} to="/">
                Users
            </Link>

            <Link style={{ color: "white" }} to="/create">
                Create User
            </Link>
        </nav>
    );
}