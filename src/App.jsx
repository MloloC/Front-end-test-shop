import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './routes/Home';
import Product from './routes/Product';

const App = () => {
	return (
		<div>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/:product' element={<Product />} />
			</Routes>
		</div>
	);
};

export default App;
