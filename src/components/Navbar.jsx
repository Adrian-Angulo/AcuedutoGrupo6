import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Sistema Acueducto
        </Link>
      </div>
    </nav>
  );
}
