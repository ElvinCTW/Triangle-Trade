/* eslint-disable require-jsdoc */
/* eslint-disable no-undef */
let page = 0;
let nomoreUpdate = false;
let nickname = null;
const selectItemIDArr = [];
let lastTimeSelectedArr;

/**
 * 申請用戶選擇完畢後，點選按鈕送出申請資料
 */
$('#exchange-request-btn').click(() => {
  // 避免重複按鍵上傳
  if (!localStorage.getItem('nickname')) {
    // 確認使用者有登入，如果沒有，跳alert請user登入
    alert('請登入以進行物品交換申請');
    return;
  } else if (localStorage.getItem('nickname') === $('#required-owner').html()) {
    // 確認使用者沒對自己的物品進行交換
    alert('請不要和自己交換喔～是在哈囉？');
    return;
  } else if (selectItemIDArr.length > 0) {
    $('#exchange-request-btn').attr({
      type: 'button',
      background: 'rgba(20,59,81,0.5)',
    }).html('送出中');
    // 送出請求 Aajx
    const wantItemArr = selectItemIDArr
        .filter((id) => lastTimeSelectedArr.indexOf(id) === -1);
    if (wantItemArr.length > 0) {
      $.ajax({
        method: 'post',
        url: '/api/1.0/want/new',
        data: {
          'wantItemsArr': wantItemArr.toString(),
          'requiredItem': parseInt(window.location.search.split('=')[1]),
          'token': localStorage.getItem('token'),
        },
        success: (successMsg) => {
          alert(successMsg.msg);
          location.reload();
        },
        error: () => {
          alert('金拍謝，暫時無法為您添加交換邀請，若持續發生請聯繫我們');
        },
      });
    } else {
      alert('您本次選擇的物品已在以前選擇過了，請選擇其他物品');
    }
  } else {
    alert('請確認您有選擇新物品後再點選按鈕');
  }
});


let picCount = 0;
const imgLength = $('.item-pic').length;
$('#img0').attr('style', 'display:``');

// 點擊換照
$('#item-detail-pic-div').click(() => {
  changePic();
});
// 輪播照片
window.setInterval(() => {
  changePic();
}, 3000);
// 換照function
function changePic() {
  if (imgLength > 1) {
    $(`#img${picCount % imgLength}`).attr('style', 'display:none;');
    picCount++;
    $(`#img${picCount % imgLength}`).attr('style', 'display:``');
  }
}

// 讀取 user items
if (page !== 'end') {
  // $('#subdiv-itemdetail-useritems').attr({ style: '' })
  nickname = localStorage.getItem('nickname');
  const requiredItemId = parseInt(window.location.search.split('=')[1]);
  $.ajax({
    url: `/api/1.0/want/last?requiredItemId=${requiredItemId}&nickname=${nickname}`,
    type: 'get',
    success: (result) => {
      lastTimeSelectedArr = result;
      $.ajax({ // 前端發送 ajax，更新現有頁面為申請者所有物品頁面
        url: `/api/1.0/items/all?page=${page}&nickname=${nickname}`,
        type: 'get',
        success: (itemsListArr) => {
          for (let i = 20 * page; i < (20 * page + itemsListArr.length); i++) {
            // Create link to item detail page
            let link;
            if (lastTimeSelectedArr
                .indexOf(itemsListArr[i - 20 * page].id) !== -1) {
              link = $('<div></div>').attr({
                'class': 'item-div user-item',
                'item_id': itemsListArr[i - 20 * page].id,
                'style': 'background:rgb(235,235,235)',
              });
            } else {
              link = $('<div></div>').attr({
                'class': 'item-div user-item',
                'item_id': itemsListArr[i - 20 * page].id,
              });
            }
            link.click(() => {
              if (link.attr('style') === 'background:rgb(235,235,235)') {
                // 取消點選時將 itemID 移出 selectorListArr
                link.attr({'style': 'background:none;'});
                selectItemIDArr.forEach((itemID) => {
                  if (itemID === parseInt(link.attr('item_id'))) {
                    selectItemIDArr.splice(selectItemIDArr.indexOf(itemID), 1);
                  }
                });
              } else {
                // 點選時將 itemID 加入 selectorListArr
                link.attr({'style': 'background:rgb(235,235,235)'});
                selectItemIDArr.push(parseInt(link.attr('item_id')));
              }
            });
            $('#items-area-user-item').append(link);
            const itemImgDiv = $('<div></div>')
                .attr({'class': 'picture-div user-item'});
            const itemContentDiv = $('<div></div>')
                .attr({'class': 'content-div user-item'});
            link.append(itemImgDiv);
            link.append(itemContentDiv);
            // add picture
            const itemImg = $('<img></img>').attr({
              'src': s3URL + itemsListArr[i - 20 * page].pictures.split(',')[0],
              'alt': itemsListArr[i - 20 * page].title,
            });
            itemImgDiv.append(itemImg);
            // add title, item-info and tags Divs
            const titleDiv = $('<span></span>')
                .attr({'class': 'title user-item'})
                .html(`${itemsListArr[i - 20 * page].title}`);
            const tagsDiv = $('<div></div>')
                .attr({'class': 'introduction-div tags user-item'});
            itemContentDiv.append(titleDiv);
            itemContentDiv.append(tagsDiv);
            // add tags to tagsDiv
            const tagsArr = itemsListArr[i - 20 * page].tags;
            for (let j = 0; j < tagsArr.length; j++) {
              const tagSpan = $('<div />')
                  .attr('class', 'tag user-item')
                  .html(`${tagsArr[j]} `);
              tagsDiv.append(tagSpan);
            }
          }
          if (itemsListArr.length === 20) {
            page += 1;
          } else {
            page = 'end';
          }
        },
        error: () => {
          alert('金拍謝，暫時找不到你的物品資訊QQ，若持續發生請聯繫我們');
        },
      });
    },
    error: () => {
      // alert(err);
      alert('暫時無法找到您上次的交換邀請紀錄');
    },
  });
} else {
  if (!nomoreUpdate) {
    nomoreUpdate = true;
    $('#change-btn-item-detail').attr({'onclick': ''}).html('沒有更多物品囉');
  }
}
