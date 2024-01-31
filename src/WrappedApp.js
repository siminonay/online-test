import Redirect from "./Redirect";
import ReactDOM from 'react-dom/client';

const makeCall = async function() {
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Redirect />)
};

export {makeCall};

export default function WrappedApp() {}