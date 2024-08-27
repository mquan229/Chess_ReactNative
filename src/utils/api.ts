import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000'; // Đảm bảo thay đổi URL nếu chạy trên thiết bị khác

export const saveMove = async (moveData: { type: string; details: object }) => {
    try {
        const response = await axios.post(`${API_URL}/move`, moveData);
        console.log('Move saved:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to save move:', error);
        throw error;
    }
};

export const getLastMove = async () => {
    try {
        const response = await axios.get(`${API_URL}/move/last`);
        return response.data;
    } catch (error) {
        console.error('Failed to get last move:', error);
        throw error;
    }
};

export const deleteLastMove = async () => {
    try {
        const response = await axios.delete(`${API_URL}/move/last`);
        console.log('Move deleted:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to delete last move:', error);
        throw error;
    }
};
