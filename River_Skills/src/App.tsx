import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Courses from './pages/Courses';
import AITools from './pages/AITools';
import Canvas from './pages/Canvas';
import Resources from './pages/Resources';
import Creators from './pages/Creators';
import Handbook from './pages/Handbook';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Courses />} />
          <Route path="courses" element={<Courses />} />
          <Route path="creators" element={<Creators />} />
          <Route path="handbook" element={<Handbook />} />
          <Route path="ai-tools" element={<AITools />} />
          <Route path="canvas" element={<Canvas />} />
          <Route path="resources" element={<Resources />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
