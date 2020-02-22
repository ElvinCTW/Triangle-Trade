const mysql = require('../util/mysql');
module.exports = {
  get: (data) => {
    return new Promise((resolve, reject)=>{
      if (data.action === 'getHotCounts') {
        let string = 'SELECT main_category hot_board, COUNT(*) count FROM items GROUP BY main_category ORDER BY count DESC LIMIT 0,500';
        // let data = [];
        mysql.pool.query(string, (err, hotCountsResult, fileds) => {
          if (err) {
            mysql.errLog(err,'hotCountsResult','itemDAO')
            reject(err)
          } else {
            console.log('hotCountsResult')
            console.log(hotCountsResult)
            resolve(hotCountsResult)
          }
        });
      } else if (data.action === 'getConfirmedMatchItemsData') {
        let string = mysql.itemJoinString+'WHERE i.id in (?)';
        mysql.pool.query(string, [data.idArr], (err, getConfirmedMatchItemsDataResult, fileds) => {
          if (err) {
            mysql.errLog(err,'getConfirmedMatchItemsDataResult','itemDAO')
            reject(err)
          } else {
            // console.log('getConfirmedMatchItemsDataResult')
            // console.log(getConfirmedMatchItemsDataResult)
            resolve(getConfirmedMatchItemsDataResult)
          }
        });
      } else if (data.type === 'all') {
        if (data.id_Arr) {
          // get data for id_Arr
          let string = mysql.itemJoinString+'WHERE i.id IN (?) AND i.availability = "true"';
          mysql.pool.query(string, [data.id_Arr], (err, getItemResultArr, fields)=>{
            if (err) {
              console.log(err.sqlMessage);
              console.log(err.sql);
              reject(err)
            };
            resolve(getItemResultArr);
          }) 
        } else if (data.main_category) {
          if (!data.sub_category) {
            // select all by main category only
            let string = mysql.itemJoinString+'WHERE i.main_category = ? AND i.availability = "true" ORDER BY time DESC LIMIT ?, 20';
            mysql.pool.query(string, [data.main_category, data.page*20], (err, getItemResultArr, fields)=>{
              if (err) {reject(err)};
              resolve(getItemResultArr);
            }) 
          } else {
            // select all by main and sub category
            let string = mysql.itemJoinString+'WHERE i.main_category = ? AND i.sub_category = ? AND i.availability = "true" ORDER BY time DESC LIMIT ?, 20';
            mysql.pool.query(string, data.main_category, data.sub_category, data.page*20, (err, getItemResultArr, fields)=>{
              if (err) {reject(err)};
              resolve(getItemResultArr);
            })
          }
        } else if (data.action === 'getConfirmedMatches') { 
          string = 'SELECT i.matched_id, i2.title required_item_title FROM items i JOIN items i2 ON i.matched_item_id = i2.id WHERE i.availability = "false" AND i.matched_id > 0 AND i.user_nickname = ?';
          mysql.pool.query(string, [data.user_nickname], (err, getConfirmedMatchesResult, fileds) => {
            if (err) {
              mysql.errLog(err,'getConfirmedMatchesResult','itemDAO')
              reject(err)
            } else {
              // console.log('getConfirmedMatchesResult')
              // console.log(getConfirmedMatchesResult)
              resolve(getConfirmedMatchesResult);
            }
          });
        } else if (!data.user_nickname) {
          // lastest
          mysql.advancedQuery({
            queryString: mysql.itemJoinString+'WHERE i.availability = "true" ORDER BY i.time DESC LIMIT ?, 20',
            queryCondition: [data.page*20],
            queryName: 'lastestItemsData',
            DAO_name: 'itemDAO',
            reject: reject,
          },(lastestItemsData)=>{
            if (lastestItemsData.length === 20) {lastestItemsData.next_paging = lastestItemsData.page+1 };
            resolve(lastestItemsData)
          })
        } else {
          // recommand
          mysql.advancedQuery({
            queryString: mysql.itemJoinString+'WHERE user_nickname = ? AND i.availability = "true" ORDER BY time DESC LIMIT ?, 20',
            queryCondition: [data.user_nickname,data.page*20],
            queryName: 'recommendItemsData',
            DAO_name: 'itemDAO',
            reject: reject,
          },(recommendItemsData)=>{
            if (recommendItemsData.length === 20) {recommendItemsData.next_paging = recommendItemsData.page+1 };
            resolve(recommendItemsData)
          })
        } 
      } else if (data.type === 'detail') {
        mysql.advancedQuery({
          queryString: mysql.itemJoinString+'WHERE i.id = ? AND i.availability = "true"',
          queryCondition: [data.item_id],
          queryName: 'itemDetailResult',
          DAO_name: 'itemDAO',
          reject: reject,
        },(itemDetailResult)=>{
          resolve(itemDetailResult)
        })
      } else {
        reject({msg: 'wrong query type, error in items.get()'})
      }
    })
  },
  insert: (data) => {
    /** Input: user_id(optional) and item information*/
    return new Promise((resolve, reject) => {
      mysql.pool.query('INSERT INTO items SET ?', data, (err, insertItem, fields) => {
        if (err) {
          mysql.errLog(err,'insertItem','itemDAO')
          reject(err)
        } else {
          console.log('insertItem')
          console.log(insertItem)
          resolve(insertItem);
        }
      })
    })
    /** To do: insert data to db */
    /** Output: Success or error msg*/
  },
  update: (data)=>{
    // update items // turn item / availability to false
    let string;
    let updateAvailabilitiesCount = 0;
    let id_Arr = data.id_Arr;
    return new Promise((resolve, reject) => {
      for (let i =0; i < id_Arr.length; i++ ) {
        // string = 'UPDATE items SET availability = "false", matched_id = ? WHERE id in (?)';
        string = 'UPDATE items SET availability = "false", matched_id = ?, matched_item_id = ? WHERE id = ?';
        mysql.pool.query(string, [ data.insertMatchId ,id_Arr[(i+1)%id_Arr.length] ,id_Arr[i%id_Arr.length]], (err, updateAvailbilityResult, fileds) => {
          if (err) {
            mysql.errLog(err,'updateAvailbilityResult','itemDAO')
            reject(err)
          } else {
            // console.log('updateAvailbilityResult')
            // console.log(updateAvailbilityResult)
            updateAvailabilitiesCount += updateAvailbilityResult.affectedRows
            if (i = id_Arr.length-1) {
              resolve(updateAvailabilitiesCount);
            }
          }
        });
      }
    })
  }
}