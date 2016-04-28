import React from 'react';
import Repo from './repo';
import { reposForUser } from '../services/api';

export default class RepositoryList extends React.Component {

    constructor(props) {
        super(props);

        this.state = { repos: [] };
    }

    componentDidMount() {
        reposForUser('intojs').then(repos => {
            this.setState({ repos: repos });
        });
    }

    render() {
		let repos = this.state.repos.map((repo) => {
			return <li key={repo.id}><Repo raw={repo} /></li>;
		});
		return <ul>{repos}</ul>;
    }
}