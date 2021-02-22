//Service Auth
export const TOKEN_KEY = "wiserToken";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token:string, id:number, email:string) => {
    //save token in localStorage
    localStorage.setItem(TOKEN_KEY, token);

    //Save User Data
    localStorage.setItem('userId', id);
    localStorage.setItem('userEmail', email);    
}