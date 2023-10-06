import { useEffect } from 'react';
import './App.css';
import { fetchDataFromApi } from './utils/API';
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration, getGenres } from './redux/HomeSlice';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNoteFound from './pages/404/PageNoteFound';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {

	const dispatch = useDispatch()
	// const { url } = useSelector((state) => state.home)

	useEffect(() => {
		fetchApiConfig()
		genresCall()
	}, [])

	const fetchApiConfig = () => {
		fetchDataFromApi("/configuration")
			.then((res) => {
				console.log(res)
				// creating object for images that comes from api 
				const url = {
					backdrop: res.images.secure_base_url + "original",
					poster: res.images.secure_base_url + "original",
					profile: res.images.secure_base_url + "original",
				}
				dispatch(getApiConfiguration(url))
			})
	}

	// for multiple api call with promise.all for the movie and tv api 

	const genresCall = async () => {
		let promises = []
		let endPoints = ["tv", "movie"]
		let allGenres = {}

		endPoints.forEach((url) => {
			promises.push(fetchDataFromApi(`/genre/${url}/list`))
		})

		const data = await Promise.all(promises)
		// console.log(data);
		data.map(({ genres }) => {
			return genres.map((item) => (allGenres[item.id] = item))
		})
		// console.log(allGenres);
		dispatch(getGenres(allGenres))

	}

	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/reactMovieX' element={<Home />} />
				<Route path='/:mediaType/:id' element={<Details />} />
				<Route path='/search/:query' element={<SearchResult />} />
				<Route path='/explore/:mediaType' element={<Explore />} />
				<Route path='*' element={<PageNoteFound />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
