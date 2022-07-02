export class UserService {

    login = async (email: string|undefined, password: string|undefined) => {
        if (email && password ) {
            const url = process.env.REACT_APP_BACKEND_HOST + '/auth/login';
            const data = new URLSearchParams();
            data.append('email', email);
            data.append('password', password);
    
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: data
                });
                
                if (response.status === 200) {
                    let responseData = await response.json();
                    localStorage.setItem('vdas_token', responseData.data.token);
                    return responseData.data.token;
                } else {
                    switch (response.status) {
                        case 404:
                            throw new Error('Resource not found!');
                        case 401:
                            throw new Error('Unauthorized');
                        case 500:
                            throw new Error('System Error');
                        default:
                            throw new Error('Error when contacting API server');
                    }
                }
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    
        throw new Error('You must supply your email and password to login');
    }

    checkLogin = (token: string|undefined) => {
        if (token) {

        }

    }

    logout = (token: string|undefined) => {
        if (token) {
            
        }
    }

}