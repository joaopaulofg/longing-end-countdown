import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const TARGET_DATE = new Date('2026-06-15T00:00:00-03:00');

function getTimeLeft() {
  const difference = TARGET_DATE.getTime() - Date.now();
  const totalSeconds = Math.max(0, Math.floor(difference / 1000));

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isComplete: difference <= 0,
  };
}

function CountdownCard({ value, label }) {
  return (
    <div className="countdown-card">
      <strong>{String(value).padStart(2, '0')}</strong>
      <span>{label}</span>
    </div>
  );
}

function App() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  const countdownItems = useMemo(
    () => [
      { value: timeLeft.days, label: 'dias' },
      { value: timeLeft.hours, label: 'horas' },
      { value: timeLeft.minutes, label: 'minutos' },
      { value: timeLeft.seconds, label: 'segundos' },
    ],
    [timeLeft]
  );

  return (
    <main className="page">
      <section className="countdown-shell">
        <section className="hero">
          <div className="hero-title-row">
            <h1>
              Contagem regressiva
              <span> para o fim da saudade!</span>
            </h1>

            <div className="hero-visual" aria-label="Baloes metalicos com a data 15 de junho">
              <img
                src="/longing-end-date-transparent.png"
                alt="Baloes metalicos com a data 15/06"
                className="date-image"
              />
            </div>
          </div>

          <div className="hero-bottom">
            <p className="subtitle">
              Maria Heloisa sai de SP e está vindo para casa! 🥳
              Depois de mais de 1 ano sem te ver, (espero) que finalmente nós vamos matar a saudade e aproveitar muito juntos! ❤️
            </p>
          </div>
        </section>

        <section className="countdown-panel" aria-live="polite">
          <div className="feature-photo">
            <video
              src="/WhatsApp Video 2026-05-28 at 08.15.41.mp4"
              aria-label="Video da Maria Heloisa"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>

          <div className="timer-column">
            <div className="timer-header">
              <p className="field-label">
                {timeLeft.isComplete ? 'A saudade acabou!' : 'Falta pouco!'}
              </p>
              <h2>Contagem regressiva:</h2>
            </div>

            <div className="countdown-grid">
              {countdownItems.map((item) => (
                <CountdownCard key={item.label} {...item} />
              ))}
            </div>

            <div className="photo-strip">
              <img src="/joao-e-maria.jpeg" alt="Joao e Maria juntos" />
              <img src="/maria.jpeg" alt="Maria" />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
