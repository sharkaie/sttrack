import authService from './auth';

export default async function  authHeader() {
    const access_token = await authService.getAccessToken();
  
    if (access_token) {
      // for Node.js Express back-end
      return { 'x-access-token': access_token };
    } else {
      return {};
    }
}