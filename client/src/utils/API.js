import Axios from "axios";

export default {
    getSavedProjects: () => {
        return Axios.get('/api/projects');
    }
};