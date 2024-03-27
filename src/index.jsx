import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

// Import statement to indicate that you need to bundle `./index.scss` which imports bootstrap inside it
import './index.scss';

// Main component (will eventually use all the others)
const CineDataApp = () => {
  return (
    //Red border added for styling debug
    <Container fluid>
      <MainView />
    </Container>
  );
};

// Finds the root of your app
const container = document.querySelector('#root');
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<CineDataApp />);
