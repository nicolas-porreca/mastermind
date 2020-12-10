import React, { useEffect } from 'react';
import { navigate } from '@reach/router';

const DevNotFoundPage: React.FC<{}> = () => {
    console.warn('404! Redirecting to homepage');

    useEffect(() => {
        navigate('/');
    }, []);

    return null;
};

export default DevNotFoundPage;
