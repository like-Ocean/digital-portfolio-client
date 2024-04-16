import { getFile } from '../../../api/file/get-file.js';
import { Card } from '@mantine/core';
import PropTypes from 'prop-types';

export const CertificateFileFrame = ({ file }) => {
    return (
        <Card shadow="null">
            <iframe
                style={{ height: '100vh' }}
                frameBorder={0}
                // sandbox=""
                src={getFile(file)}
            />
        </Card>
    );
};
CertificateFileFrame.propTypes = {
    file: PropTypes.string,
};
