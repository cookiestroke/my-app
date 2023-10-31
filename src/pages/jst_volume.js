import Plot from 'react-plotly.js';
import React from 'react';

class JSTVolume extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			layout: {},
			frames: [],
			config: {},
		};
	}

	componentDidMount() {
		// Fetch your data here
		fetch('/data.json')
			.then((response) => response.json())
			.then((data) => {
				// Update the component's state with the fetched data
				this.setState({
					data: data.data,
					layout: data.layout,
					frames: data.frames,
					config: data.config,
				});
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}

	render() {
		return (
			<Plot
				data={this.state.data}
				layout={this.state.layout}
				frames={this.state.frames}
				config={this.state.config}
				onInitialized={(figure) => this.setState(figure)}
				onUpdate={(figure) => this.setState(figure)}
			/>
		);
	}
}

export default JSTVolume;
