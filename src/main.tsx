import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element. Please ensure your HTML includes a div with id="root".');
}

createRoot(rootElement).render(<App />);
