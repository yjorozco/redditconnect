import base64 from 'react-native-base64';

//change it 
const CLIENTID_CLIENTSECRET = 'client id:client secrect';

const URL_TOKEN =  "https://ssl.reddit.com/api/v1/access_token";

const URL_SUBMIT = "https://oauth.reddit.com/api/submit.json";

const URL_ME = "https://oauth.reddit.com/api/v1/me";

const CONN_ERROR = "Connection error";


export const login = async (username, password) =>{

    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('grant_type', 'password');
    var headers = new Headers();
    headers.append('Authorization', 'Basic ' + base64.encode(CLIENTID_CLIENTSECRET))
    const response = await fetch(
        URL_TOKEN, 
        {
            method: "POST",
            headers: headers,
            body: formData
        }
    );
    
    if (!response.ok) throw new Error(CONN_ERROR);
    return response.json();


};


export const meUser = async (token) =>{

    var headers = new Headers();
    headers.append('Authorization', 'bearer ' + token);
    const response = await fetch(
        URL_ME, 
        {
            headers: headers
        }
    );
   
    if (!response.ok) throw new Error(CONN_ERROR);
    const meProfile = await response.json();
    return meProfile;
};



export const posts = async (limit) => {
    const response = await fetch(`https://www.reddit.com/.json?limit=${limit}`);
    if (!response.ok) throw new Error(CONN_ERROR); 
    const reddit = await response.json();
    return   reddit;
};

export const submit = async (info) => {
    var formData = new FormData();
    formData.append('title', info.title);
    formData.append('text', info.description);
    formData.append('sr', "Home");
    formData.append("kind", "self");  
    formData.append('resubmit','true');
    formData.append('send_replies', 'true');
    formData.append('api_type', 'json');
    var headers = new Headers();
    headers.append('Authorization', 'bearer ' + info.token);
    const response = await fetch(
        URL_SUBMIT, 
        {
            method: "POST",
            headers: headers,
            body: formData
        }
    );
    if (!response.ok) {throw new Error(CONN_ERROR)};
    return response.json();

}