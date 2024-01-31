import RedirectFail from "./RedirectFail";
import ReactDOM from 'react-dom/client';

const makeFailCall = async function() {

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RedirectFail />)
};

export {makeFailCall};

export default function WrappedAppFail() {}