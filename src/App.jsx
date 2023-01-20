import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import { ShopContext } from './contexts/ShopContext';
import Home from './routes/Home';
import Product from './routes/Product';

const App = () => {
	// Se que no es necesario el usar useContext para esto, pero me daba a entender un poco la tarea como que había que tener acceso desde cualquier parte.
	// Podría haber creado este useState aquí y pasarselo como prop a Header y Product para conseguir lo mismo que con context.
	const [cartNumber, setCartNumber] = useState([]);

	return (
		<ShopContext.Provider value={{ cartNumber, setCartNumber }}>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/:product' element={<Product />} />
			</Routes>
		</ShopContext.Provider>
	);
};

export default App;
