const mysql = require('../util/mysql');
// change to online crypto in the future ?
const crypto = require('crypto');
module.exports = {
  getUserDataByToken,
  get: (queryData) => {
    return new Promise((resolve, reject) => {
      if (queryData.token) {
        getUserDataByToken(queryData, (output)=>{
          if (output.result) {
            resolve(output.result)
          } else {
            reject(output.err)
          }
        }) 
      } else if (queryData.action === 'checkdoubleUserInfo') {
        let queryString = 'SELECT * FROM users WHERE sign_id = ? OR nickname = ?';
        let queryCondition = [queryData.user.sign_id, queryData.user.nickname];
        mysql.pool.query(queryString, queryCondition, (err, checkdoubleUserInfo, fileds) => {
          if (err) {
            mysql.errLog(err, 'checkdoubleUserInfo', 'userDAO')
            reject(err)
          } else {
            console.log('checkdoubleUserInfo')
            console.log(checkdoubleUserInfo)
            let sendbackObj = {};
            if (checkdoubleUserInfo.length > 0) {
              let doubleIdCount = checkdoubleUserInfo.filter(userInfo => userInfo.sign_id === queryData.user.sign_id).length;
              let doubleNicknameCount = checkdoubleUserInfo.length - doubleIdCount
              if (doubleIdCount === 0) {
                sendbackObj.errorMsg = '暱稱重複，請修改後再試一次'
              } else if (doubleNicknameCount === 0) {
                sendbackObj.errorMsg = 'ID重複，請修改後再試一次'
              } else {
                sendbackObj.errorMsg = 'ID與暱稱均重複，請修改後再試一次'
              }
            } else {
              sendbackObj.successMsg = 'noDuplication'
            }
            resolve(sendbackObj)
          }
        });
      } else if (queryData.action === 'sign-in') {
        queryData.user.password = crypto.createHash('sha256').update(queryData.user.password).digest('hex');
        let queryString = 'SELECT * FROM users WHERE sign_id = ? AND password = ?';
        let queryCondition = [queryData.user.sign_id, queryData.user.password];
        mysql.pool.query(queryString, queryCondition, (err, signinResult, fileds) => {
          if (err) {
            mysql.errLog(err, 'signinResult', 'userDAO')
            reject(err)
          } else {
            resolve(signinResult[0])
          }
        });
      }
    });
  },
  insert: (queryData) => {
    return new Promise((resolve, reject) => {
      if (queryData.action === 'insertUser') {
        // hash
        queryData.user.password = crypto.createHash('sha256').update(queryData.user.password).digest('hex');
        let token = crypto.createHash('sha256').update(queryData.user.id + Date.now().toString(), 'utf8').digest('hex');
        // make object
        queryData.user.token = token;
        queryData.user.time = Date.now().toString();
        let queryString = 'INSERT INTO users SET ?';
        let queryCondition = [queryData.user];
        mysql.pool.query(queryString, queryCondition, (err, insertUser, fileds) => {
          if (err) {
            mysql.errLog(err, 'insertUser', 'userDAO')
            reject(err)
          } else {
            resolve({
              token: token,
              nickname: queryData.user.nickname,
            })
          }
        });
      }
    })
  },
}

function getUserDataByToken(token, item_id) {
  return new Promise((resolve, reject)=>{    
    let string;
    let condition;
    if (item_id) {
      string =
        `SELECT * FROM users u 
      JOIN items i ON i.user_id = u.id 
      WHERE u.token = ? AND i.id = ?`;
      condition = [token, item_id];
    } else {
      string = 'SELECT * FROM users WHERE token = ?';
      condition = [token];
    }
    mysql.pool.query(string, condition, (err, result, fileds) => {
      if (err) {
        let functionName = arguments.callee.toString();
        functionName = functionName.substr('function '.length);
        functionName = functionName.substr(0, functionName.indexOf('('));
        mysql.errLog(err, functionName, __filename)
        reject(err)
      } else {
        resolve(result)
      }
    });
  })
}