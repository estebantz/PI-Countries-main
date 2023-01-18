//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, Country } = require("./src/db.js");
const { getApiInfo } = require("./src/helpers/getApiInfo");

const countryToDb = async () => {
  try {
    let dbInfo = await Country.findAll();
    if (!dbInfo.length) {
      let arr = await getApiInfo();
      await Country.bulkCreate(arr);
      dbInfo = await Country.findAll();
    }
    return dbInfo;
  } catch (error) {
    console.log(error);
  }
};

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  countryToDb();
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
