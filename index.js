const revolut = require("./src/connectors/revolut");

const CLIENT_ID = "pC2uuFgisRaJM8FR72RNvYUq_QyQCVfqbI73BGSDSLM";
const REFRESH_TOKEN = "oa_sand_gHJC17S9MK-pW9K4JlZCea7yx9HRAn9rfc-S89-pT_0";

const get_revolut_accounts = async () => {
  const jwt_token = revolut.get_jwt_token(CLIENT_ID);
  var {status, data: {access_token: access_token}} = await revolut.get_access_token(
    REFRESH_TOKEN,
    CLIENT_ID,
    jwt_token
  );
  if (status != 200) {
    throw new Error(
      "Une erreur est survenue durant la récupération de l'access token"
    );
  }

  var {status, data: accounts} = await revolut.get_accounts(access_token);
  if (status != 200) {
    throw new Error(
      "Une erreur est survenue durant la récupération de la liste des comptes"
    );
  }

  return accounts;
};

get_revolut_accounts()
  .then(function(response) {
    console.log(response);
  })
  .catch(function(response) {
    console.log(response.message);
  });
