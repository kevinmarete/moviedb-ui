import React, {Component} from 'react';
import {useParams} from 'react-router-dom';

// Config
import {IMAGE_BASE_URL, POSTER_SIZE} from '../config';

// API
import API from '../API';

// Components
import Grid from './Grid';
import Spinner from './Spinner';
import Breadcrumb from './Breadcrumb';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actor from './Actor';

// Image
import NoImage from '../images/no_image.jpg';

class Movie extends Component {
	state = {
		movie: {},
		loading: true,
		error: false,
	};

	fetchMovie = async () => {
		const {movieId} = this.props.params;

		try {
			this.setState({loading: true, error: false});

			const movie = await API.fetchMovie(movieId);
			const credits = await API.fetchCredits(movieId);
			// Get directors only
			const directors = credits.crew.filter((member) => member.job === 'Director');

			this.setState({
				movie: {
					...movie,
					actors: credits.cast,
					directors,
				},
				loading: false,
			});
		} catch (error) {
			this.setState({error: true, loading: false});
		}
	};

	componentDidMount() {
		this.fetchMovie();
	}

	render() {
		const {movie, loading, error} = this.state;

		if (loading) return <Spinner />;
		if (error) return <div>Something went wrong ...</div>;

		return (
			<>
				<Breadcrumb movieTitle={movie.original_title} />
				<MovieInfo movie={movie} />
				<MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue} />
				<Grid header="Actors">
					{movie.actors.map((actor) => (
						<Actor
							key={actor.credit_id}
							name={actor.name}
							character={actor.character}
							imageUrl={actor.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}` : NoImage}
						/>
					))}
				</Grid>
			</>
		);
	}
}

const MovieWithParams = (props) => <Movie {...props} params={useParams()} />;

export default MovieWithParams;
