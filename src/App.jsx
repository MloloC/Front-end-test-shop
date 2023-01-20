import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import { CartContext } from './contexts/CartContext';
import Home from './routes/Home';
import Product from './routes/Product';

const App = () => {
	// Se que no es necesario el usar useContext para esto, pero me daba a entender un poco la tarea como que había que tener acceso desde cualquier parte.
	// Podría haber creado este useState aquí y pasarselo como prop a Header y Product para conseguir lo mismo que con context.
	const [cartNumber, setCartNumber] = useState([]);

	return (
		<CartContext.Provider value={{ cartNumber, setCartNumber }}>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/:product' element={<Product />} />
			</Routes>
		</CartContext.Provider>
	);
};

export default App;
