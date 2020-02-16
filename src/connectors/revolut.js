const axios = require("axios")
const qs = require('querystring')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const REVOLUT_API = 'https://sandbox-b2b.revolut.com/api/1.0'

const get_jwt_token = (client_id) => {
    const private_key_name = 'privatekey.pem'
    const issuer = '127.0.0.1'
    const aud = 'https://revolut.com'
    const payload = {
        "iss": issuer,
        "sub": client_id,
        "aud": aud
    }
    const private_key = fs.readFileSync(private_key_name);
    return jwt.sign(payload, private_key, { algorithm: 'RS256', expiresIn: 60 * 60});
}

const get_access_token = (refresh_token, client_id, token) => {
    request_body = {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
        client_id: client_id,
        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        client_assertion: token
    }

    return axios.post(`${REVOLUT_API}/auth/token`, qs.stringify(request_body), {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
};

const get_accounts = token => {
    return axios.get(`${REVOLUT_API}/accounts`, {
        headers: {'Authorization': 'Bearer ' + token}
    })
};

module.exports = {
    get_jwt_token,
    get_access_token,
    get_accounts
};
