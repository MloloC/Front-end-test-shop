const Search = ({ search, setSearch }) => {
	return (
		<input
			type='text'
			name='search'
			placeholder='Buscar'
			value={search}
			onChange={e => setSearch(e.target.value)}
		></input>
	);
};

export default Search;
