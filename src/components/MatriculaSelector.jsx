import { useState, useEffect } from 'react';

const MatriculaSelector = ({ value, onChange, label = "Matrícula" }) => {
  const [matriculas, setMatriculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchMatriculas();
  }, []);

  const fetchMatriculas = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/predios/matriculas/lista');
      const data = await response.json();
      setMatriculas(data);
    } catch (error) {
      console.error('Error al cargar matrículas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term.length < 2) {
      fetchMatriculas();
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/predios/matriculas/buscar/${term}`);
      const data = await response.json();
      setMatriculas(data);
    } catch (error) {
      console.error('Error al buscar matrículas:', error);
    }
  };

  const handleSelect = (matricula) => {
    onChange(matricula.matricula);
    setSearchTerm(matricula.matricula);
    setShowDropdown(false);
  };

  const filteredMatriculas = matriculas.filter(m => 
    m.matricula?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.direccion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="form-group" style={{ position: 'relative' }}>
      <label>{label}</label>
      <input
        type="text"
        className="form-control"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        placeholder="Buscar matrícula o dirección..."
        disabled={loading}
      />
      
      {showDropdown && filteredMatriculas.length > 0 && (
        <div 
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            maxHeight: '200px',
            overflowY: 'auto',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: 1000,
            marginTop: '4px'
          }}
        >
          {filteredMatriculas.map((matricula) => (
            <div
              key={matricula.matricula}
              onClick={() => handleSelect(matricula)}
              style={{
                padding: '10px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
            >
              <div style={{ fontWeight: 'bold' }}>{matricula.matricula}</div>
              <div style={{ fontSize: '0.9em', color: '#666' }}>{matricula.direccion}</div>
            </div>
          ))}
        </div>
      )}

      {showDropdown && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default MatriculaSelector;
