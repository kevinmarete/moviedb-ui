import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

// Styles
import {Wrapper, Content} from './Breadcrumb.styles';

const Breadcrumb = ({movieTitle}) => (
	<Wrapper>
		<Content>
			<Link to="/">
				<span>Home</span>
			</Link>
			<span>|</span>
			<span>{movieTitle}</span>
		</Content>
	</Wrapper>
);

Breadcrumb.propTypes = {
	movieTitle: PropTypes.string,
};

export default Breadcrumb;
