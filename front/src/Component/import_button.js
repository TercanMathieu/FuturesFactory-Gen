import React from 'react';

export default class FileUploadPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { image: null  };
        this.fileInput = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.image !== this.state.image) {
            console.log('image = ',this.state.image, 'caca')
        }
    }

    async handleSubmit(event) {
        try {
        event.preventDefault();
        if (!this.fileInput.current.files[0].name) {
              return  alert('No file selected')
        } else {
            let formdata = new FormData();
            formdata.append("NFT", this.fileInput.current.files[0], this.fileInput.current.files[0].name);

            let requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow',
                cache: 'no-cache',
            };

            let res = await fetch("http://localhost:8080/api/create", requestOptions)
            const blob = await res.blob()
            const url = URL.createObjectURL(blob);
            this.setState({image: url})

        }
       }
        catch(e) {
            alert(e)
        }
    }

    render() {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Choisir la texture:
                    <input type="file" ref={this.fileInput} alt="" />
                </label>
                <br/>
                    <button type="submit">Envoyer</button>

            </form>
                <img src={this.state.image} />

            </div>
        );
    }
}
/*Faire un cpmposant qui prend en props un .obj et un .png et afficher soit l'un soit l'autre*/

