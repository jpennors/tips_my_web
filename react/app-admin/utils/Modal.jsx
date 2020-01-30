import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

class ErrorHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: this.props.open };
        this.close = this.close.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open && this.props.open === true && this.state.open === false) this.setState((state, props) => ({ open: props.open }));
    }

    close = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;

        return (
            <div className="modal_container">
                <Modal className="modal" size="tiny" open={open} onClose={this.close}>
                    <Modal.Header>Erreur</Modal.Header>
                    <Modal.Content>
                        <p>{this.props.message ? (this.props.message) : 'Une erreur est survenue, veuillez réessayer.'}</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="grey" onClick={this.close}>Ok</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default ErrorHandler;
