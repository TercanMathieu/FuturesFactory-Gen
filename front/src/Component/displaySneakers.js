import React from 'react';

export default class DisplaySneakers extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { image: null, obj: null, displayed: null};
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.image !== this.state.image) {
            console.log('pokemons state has changed.')
        }
    }

    componentDidMount() {
    }


    render() {
        return (
            <div>

            </div>
        );
    }
}

