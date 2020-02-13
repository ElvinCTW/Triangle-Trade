if (!localStorage.getItem('nickname')) {
  // 確認使用者有登入，如果沒有，跳alert請user登入
  alert('plz sign in to active change function');
  window.location.assign('/');
  // 應確認使用者為指定 user_nickname 的使用者
}

function getMatchedResultData(want_item_id, want_title, item_type) {
  // call wantAPI get matched data (by want_item_id)
  $.ajax({
    url: `/api/1.0/want/matches/${item_type}?id=${want_item_id}`,
    type: 'get',
    success: (objOfDnTMatchArr) => {
      console.log(objOfDnTMatchArr);
      // $('#subtext-matched-result-page').html(`Matched Results of ${want_title}`);
      // $('#items-area-match').empty();
      // for (let i = 0; i < matchedItemsDataArr.length; i++) {
      //   // 點擊後可以送出配對確認給對方
      //   let match = $('<div></div>').attr({ 'class': 'match-container' });
      //   $('#items-area-match').append(match);
      //   /**
      //    * 商品資訊區
      //    */
      //   let link = $('<a></a>').attr({ 'href': `/items/detail?item_id=${matchedItemsDataArr[i].itemData.id}` });
      //   match.append(link);
      //   // Create new Item outside container
      //   let newItemContainer_Outside = $('<div></div>').attr({ 'class': 'item-container-outside recommands match' });
      //   link.append(newItemContainer_Outside);
      //   // Create new Item inside container
      //   let newItemContainer_Inside = $('<div></div>').attr({ 'class': 'item-container-inside recommands' });
      //   newItemContainer_Outside.append(newItemContainer_Inside);
      //   // Create basedonDiv, itemImgDiv and itemContentDiv
      //   let basedonDiv = $('<div></div>').attr({ 'class': 'based-on' });
      //   let itemImgDiv = $('<div></div>').attr({ 'class': 'item-img recommands' });
      //   let itemContentDiv = $('<div></div>').attr({ 'class': 'item content' });
      //   newItemContainer_Inside.append(basedonDiv);
      //   newItemContainer_Inside.append(itemImgDiv);
      //   newItemContainer_Inside.append(itemContentDiv);
      //   // basedonDiv text spans
      //   let basedonSpan = $('<span />')
      //   let interactors = 0;
      //   // let ownerStatusArr = [];
      //   let ownersArr;
      //   let owner_checkArr;
      //   if (matchedItemsDataArr[i].doubleMatchData.matched === 'true') {
      //     basedonSpan.html('Double Matched');
      //     interactors = 2;
      //     ownersArr = matchedItemsDataArr[i].doubleMatchData.ownersArr;
      //     owner_checkArr = matchedItemsDataArr[i].doubleMatchData.owner_checkArr;
      //   } else {
      //     basedonSpan.html('Triple Matched');
      //     interactors = 3;
      //     ownersArr = matchedItemsDataArr[i].tripleMatchData.ownersArr;
      //     owner_checkArr = matchedItemsDataArr[i].tripleMatchData.owner_checkArr;
      //   }
      //   basedonDiv.append(basedonSpan);
      //   // add picture
      //   let itemImg = $('<img></img>').attr({ 'src': s3_url + matchedItemsDataArr[i].itemData.pictures.split(',')[0] });
      //   itemImgDiv.append(itemImg);
      //   // add title, item-info and tags Divs
      //   let titleDiv = $('<div></div>').attr({ 'class': 'title' }).html(`${matchedItemsDataArr[i].itemData.title}`);
      //   let itemInfoDiv = $('<div></div>').attr({ 'class': 'item-info' });
      //   let tagsDiv = $('<div></div>').attr({ 'class': 'tags' });
      //   itemContentDiv.append(titleDiv);
      //   itemContentDiv.append(itemInfoDiv);
      //   itemContentDiv.append(tagsDiv);
      //   // add nickname and status span
      //   let nicknameSpan = $('<span />').attr({ 'class': 'nickname' }).html(`${matchedItemsDataArr[i].itemData.user_nickname}`);
      //   let statusSpan = $('<span />').attr({
      //     'class': 'status',
      //     'id': 'item-status',
      //   }).html(`${matchedItemsDataArr[i].itemData.status}`);
      //   itemInfoDiv.append(nicknameSpan);
      //   itemInfoDiv.append(statusSpan);
      //   // add tags to tagsDiv
      //   let tagsArr = matchedItemsDataArr[i].itemData.tags.split(' ')
      //   for (let j = 0; j < tagsArr.length; j++) {
      //     let tagSpan = $('<span />').html(`${tagsArr[j]}`);
      //     tagsDiv.append(tagSpan);
      //   }
      //   /**
      //    * 配對互動區
      //    */
      //   let interaction = $('<div></div>').attr({ 'class': 'match-interaction-container' });
      //   match.append(interaction);
      //   let checkStatusNodeArr = [];
      //   for (let k = 0; k < interactors; k++) {
      //     let ownercheckStatsus = $('<div></div>').attr({ 'class': 'user-check-status' }).html(
      //       `User : ${ownersArr[k]}, Check : ${owner_checkArr[k]}`
      //     );
      //     if (owner_checkArr[k] === "deny") {
      //       ownercheckStatsus.attr({
      //         'class': 'user-check-status',
      //         'style': 'background: #FAD7AC; color: #000'
      //       })
      //     }
      //     checkStatusNodeArr.push(ownercheckStatsus);
      //     interaction.append(ownercheckStatsus);
      //   }
      //   let interactionBtnDiv = $('<div></div>').attr({'class': 'interaction-btn-div'});
      //   interaction.append(interactionBtnDiv);
      //   let user_nickname = localStorage.getItem('nickname');
      //   let userIndex = ownersArr.indexOf(user_nickname)
      //   console.log(userIndex);
      //   let data = {};
      //   if (interactors === 2) {
      //     // 雙方
      //     data.want_item_id = want_item_id;
      //     data.required_item_id = matchedItemsDataArr[i].itemData.id;
      //   } else {
      //     // triple
      //     data.userIndex = userIndex;
      //     data.matched_id = matchedItemsDataArr[i].tripleMatchData.triple_id;
      //   }
      //   let confirmBtn = $('<button></button>').attr({
      //     'class': 'interaction-btn',
      //   }).html('Confirm').click(() => {
      //     data.type = 'confirm';
      //     console.log('data is:');
      //     console.log(data);
      //     $.ajax({
      //       url: `/api/1.0/matches/status`,
      //       type: 'post',
      //       data: data,
      //       success: (checkAllConfirmResultArr) => {
      //         if (interactors === 2) {
      //           // 雙方
      //           console.log(checkAllConfirmResultArr);
      //         } else {
      //           // 三方
      //           console.log(checkAllConfirmResultArr);
      //         }
      //         checkStatusNodeArr[userIndex].html(`User : ${user_nickname}, Check : ${data.type}`)
      //         interactionBtnDiv.attr({'style': 'display:none;'})
      //       },
      //       error: (error) => {
      //         console.log(error);
      //       },
      //     })
      //   });
      //   let denyBtn = $('<button></button>').attr({
      //     'class': 'interaction-btn',
      //   }).html('Deny').click(() => {
      //     data.type = 'deny';
      //     $.ajax({
      //       url: `/api/1.0/matches/status`,
      //       type: 'post',
      //       data: data,
      //       // 雙方 input: 
      //       // 三方 input: triple_id, userIndex
      //       success: (checkAllConfirmResultArr) => {
      //         if (interactors === 2) {
      //           // 雙方
      //           console.log(checkAllConfirmResultArr);
      //         } else {
      //           // 三方
      //           console.log(checkAllConfirmResultArr);
      //         }
      //         checkStatusNodeArr[userIndex].attr({
      //           'class': 'user-check-status',
      //           'style': 'background: #FAD7AC; color: #000'
      //         }).html(`User : ${user_nickname}, Check : ${data.type}`)
      //         interactionBtnDiv.attr({'style': 'display:none;'})
      //       },
      //       error: (error) => {
      //         console.log(error);
      //       },
      //     })
      //   });
      //   let show = true;
      //   owner_checkArr.forEach(checkstatus =>{
      //     if (checkstatus === "deny") {
      //       show = false;
      //     }
      //   })
      //   if (owner_checkArr[userIndex] === "confirm") {
      //     show = false;
      //   }
      //   if (show) {
      //     interactionBtnDiv.append(confirmBtn);
      //     interactionBtnDiv.append(denyBtn);
      //   }
      // }
    },
    error: () => {

    }
  })
  // create boxes after get data 
}

function updateCheckStatus(ownersArr, chcek) {
  // let user_nickname = localStorage.getItem('nickname');
  // let userIndex = ownersArr.indexOf(user_nickname)
  // // find which user on which index 
  // console.log(userIndex);
  if (check) {
    // user click btn "check"
    
  } else {

  }
  $.ajax({
    url: `/api/1.0/matches/status`,
    type: 'update',
    data: {
      tradeType: tradeType,
    },
    success: () => {
      checkStatusNodeArr[userIndex].html(`User : ${user_nickname}, Check : true`)
      interactionBtnDiv.attr({'style': 'display:none;'})
    },
    error: () => {

    },
  })
}