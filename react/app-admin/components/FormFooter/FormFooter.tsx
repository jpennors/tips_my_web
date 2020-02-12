import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

interface FormFooterProps {
    backButtonURL?: string;
    isSubmitDisabled: boolean;
    onSubmitClick: () => void;
}

export const FormFooter: React.FunctionComponent<FormFooterProps> = ({
    backButtonURL,
    isSubmitDisabled,
    onSubmitClick,
}) => (
    <>
        {backButtonURL ? (
            <Link to={backButtonURL}>
                <Button icon labelPosition='left'>
                    <Icon name='arrow left' />
                    Back
                </Button>
            </Link>
        ) : null}
        <Button
            icon
            labelPosition='right'
            color="blue"
            onClick={onSubmitClick}
            disabled={isSubmitDisabled}
            floated="right"
        >
            Submit
            <Icon name='upload' />
        </Button>
    </>
);
