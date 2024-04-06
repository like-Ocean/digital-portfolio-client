import {apiUrl} from "../index.js";

export const getFile = (file_id) =>{
    return `${apiUrl}/projects/project/file/${file_id}`;
}
