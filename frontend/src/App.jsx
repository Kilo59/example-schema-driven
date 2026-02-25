// frontend/src/App.jsx
import { materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { useEffect, useState } from 'react';

function App() {
  const [config, setConfig] = useState(null);
  const [data, setData] = useState({});
  const [complete, setComplete] = useState(false);

  // Fetch the schema (Configuration) on mount
  useEffect(() => {
    fetch('http://localhost:8000/api/step/intake')
      .then(res => res.json())
      .then(res => {
        setConfig(res);
        setData(res.initialData);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/submit/intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.headers.get('HX-Trigger') === 'workflow-complete') {
      setComplete(true);
    }
  };

  if (complete) return <h1>✅ Workflow Step Complete!</h1>;
  if (!config) return <p>Loading Workflow Config...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc' }}>
      <h2>Schema-Driven Workflow</h2>
      <form onSubmit={handleSubmit}>
        <JsonForms
          schema={config.schema}
          uischema={config.uiSchema}
          data={data}
          renderers={materialRenderers}
          onChange={({ data }) => setData(data)}
        />
        <button type="submit" style={{ marginTop: '20px', padding: '10px 20px' }}>
          Submit to FastAPI
        </button>
      </form>
    </div>
  );
}

export default App;