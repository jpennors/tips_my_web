import * as React from 'react';
import { Helmet } from 'react-helmet';

interface TagProps {
    title?: string;
    description?: string;
}

export const DocumentHead: React.FunctionComponent<TagProps> = ({ title, description }) => (
    <Helmet>
        {title && <title>{`TipsMyWeb | ${title}`}</title>}
        {description && <meta name="description" content={description} />}
    </Helmet>
);
