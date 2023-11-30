import axios from 'axios';
import authHeader from './authHeader';

const getDashboardService = async ()=>{
    const response = await axios.get('/api/dashboard', { headers: await authHeader() }).catch((error)=>{
        return error.response;
    });
    return response;
}

const getAllCampaignService = async () => {
    const response = await axios.get('/api/campaign', { headers: await authHeader() }).catch((error)=>{
        return error.response;
    });
    return response;
}

const getCampaignService = async (campaign_id) => {
    const response = await axios.get(`/api/campaign/${campaign_id}`, { headers: await authHeader() }).catch((error)=>{
        return error.response;
    });
    return response;
}

const postNewCampaignService = async (data) => {
    const response = await axios.post('/api/campaign', data, { headers: await authHeader() }).catch((error)=>{
        return error.response;
    });
    return response;
}

const editCampaignService = async (data) => {
    console.log(data);
    const response = await axios.patch('/api/campaign', data, { headers: await authHeader() }).catch((error)=>{
        return error.response;
    });
    return response;
}

const deleteCampaignService = async (data) => {
    const response = await axios.delete('/api/campaign', { headers: await authHeader(), data:data }).catch((error)=>{
        return error.response;
    });
    return response;
}


// Chapters 
const getEveryChapterService = async () => {
    const response = await axios.get(`/api/campaign/every/chapters`, { headers: await authHeader() }).catch((error)=>{
        return error.response;
    });
    return response;
}

const getAllChaptersService = async (campaign_id) => {
    const response = await axios.get(`/api/campaign/${campaign_id}/chapter`, { headers: await authHeader() }).catch((error)=>{
        return error.response;
    });
    return response;
}

const getChapterService = async (campaign_id, chapter_id) => {
    const response = await axios.get(`/api/campaign/${campaign_id}/chapter/${chapter_id}`, { headers: await authHeader() }).catch((error)=>{
        return error.response;
    });
    
    return response;
}

const postNewChapterService = async (data, campaign_id) => {
    const response = await axios.post(`/api/campaign/${campaign_id}/chapter`, data, { headers: await authHeader() }).catch((error)=>{
        return error.response;
    });
    return response;
}

const editChapterService = async (data, campaign_id) => {
    const response = await axios.patch(`/api/campaign/${campaign_id}/chapter`, data, { headers: await authHeader() }).catch((error)=>{
        return error.response;
    });
    return response;
}

const deleteChapterService = async (data) => {
    const response = await axios.delete(`/api/campaign/${data.campaign_id}/chapter`, { headers: await authHeader(), data:data }).catch((error)=>{
        return error.response;
    });
    return response;
}


// Videos
const getVideoService = async (campaign_id, chapter_id, video_id) => {    
    const response = await axios.get(`/api/campaign/${campaign_id}/chapter/${chapter_id}/video/${video_id}`, { headers: await authHeader() }).catch((error)=>{
        return error.response;
    });
    console.log(response);
    return response;
}

const postNewVideoService = async (data) => {
    const response = await axios.post(`/api/campaign/${data.campaign_id}/chapter/${data.chapter_id}/video`, data, { headers: await authHeader() }).catch((error)=>{
        return error.response;
    });
    return response;
}

const editVideoService = async (data) => {
    const response = await axios.patch(`/api/campaign/${data.campaign_id}/chapter/${data.chapter_id}/video`, data, { headers: await authHeader() }).catch((error)=>{
        return error.response;
    });
    return response;
}

const deleteVideoService = async (data) => {
    const response = await axios.delete(`/api/campaign/${data.campaign_id}/chapter/${data.chapter_id}/video`, { headers: await authHeader(), data:data }).catch((error)=>{
        return error.response;
    });
    return response;
}



// Moduler Api Controller
const getModulerService = async () => {
    const response = await axios.get(`/api/study-moduler`, { headers: await authHeader() }).catch((error)=>{
        return error.response;
    });
    return response;
}

const admin = {
    getDashboardService,
    getAllCampaignService,
    getCampaignService,
    postNewCampaignService,
    editCampaignService,
    deleteCampaignService,
    getEveryChapterService,
    getAllChaptersService,
    getChapterService,
    postNewChapterService,
    editChapterService,
    deleteChapterService,
    getVideoService,
    postNewVideoService,
    editVideoService,
    deleteVideoService,    
    getModulerService
}
export default admin;