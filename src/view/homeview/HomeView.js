import React, { useContext, useEffect, useState } from 'react'
import './HomeView.css'
import Recipe from './recipe/Recipe'
import { useLocation, useHistory } from 'react-router-dom'
import LoadingImage from '../../shared/images/LoadingImage.gif'
import UserContext from '../../shared/provider/UserContext'
import '../../components/footer/Footer'
import foodPic from '../../shared/images/foodPic.jpeg'



export const HomeView = () => {

	const history = useHistory()
	const location = useLocation()
	const APP_ID = '5ac39ccd'
	const APP_KEY = '36ce344a8e3b488843d7a5a4f3e8b215'
	const [recipes, setRecipes] = useState([])
	const [search, setSearch] = useState('')
	const [query, setQuery] = useState('chiken')
	const [loading, setLoading] = useState()
	const [serverData, setServerData] = useState()
	const name = useContext(UserContext)

	useEffect(() => {
		getRecipes()
	}, [query])

	useEffect(() => {
		localStorage.setItem("recipes", JSON.stringify(recipes))
	}, [recipes])

	const getRecipes = async () => {
		const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=10&calories=591-722&health=alcohol-free`)
		const data = await response.json()
		setRecipes(data.hits)
		console.log(data.hits)
	}

	const updateSearch = event => {
		setSearch(event.target.value)
	}

	const getSearch = event => {
		event.preventDefault()
		setQuery(search)
	}

	const displayData = () => {
		if (!loading) {
			return (
				<div className="recipes">
					{recipes.map(recipe => (
						<Recipe key={recipe.recipe.label}
							title={recipe.recipe.label}
							image={recipe.recipe.image}
							ingredients={recipe.recipe.ingredients}
							url={recipe.recipe.url} />))}
				</div>

			)
		}

		else {
			return <img src={LoadingImage} alt={'error !'} />

		}
	}

	return (
		<div className="content-wrapper">
			<img src={foodPic} alt={'..error'} />
			<div className="text-wrapper">
			<h3> 
			Welcome to FunFood !! <br/> <br/> Dear User, kindly visit our 'Recipes Page' to have a look at some of the best recipes from across the world.
			<br/> <br/>Please contact us with your valuable feedback to help us improve.
			</h3>
			</div>
					
		</div>
	)
}

export default HomeView