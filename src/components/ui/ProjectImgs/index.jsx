import {Image, Stack} from "@mantine/core";
import PropTypes from "prop-types";
import {getFile} from "../../../api/file/get-file.js";

export const ProjectImgs = ({ files }) => {
    return (
        <Stack align="center" gap="sm">
            {files && files.map((file) => (
                <Image radius="md" key={file.file_id} src={file ? getFile(file.file_id) : "/src/assets/9214833.jpg"} />
            ))}
        </Stack>
    );
};

ProjectImgs.propTypes = {
    files: PropTypes.arrayOf(
        PropTypes.shape({
            file_id: PropTypes.string,
        }),
    ),
};
