import { useState } from 'react';

function App() {

  const [person, setPerson] = useState(null);

  if (!person) {
    return (
      <div className="home">

        <h1>DESEOS</h1>

        <button
          className="fernando"
          onClick={() => setPerson('Fernando')}
        >
          Fernando
        </button>

        <button
          className="debora"
          onClick={() => setPerson('Debora')}
        >
          Debora
        </button>

      </div>
    );
  }

  return (
    <div className="editor">

      <h2>{person}</h2>

      <textarea
        placeholder="Escribe tu deseo..."
      />

    </div>
  );
}

export default App;