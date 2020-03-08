let msgCount = 0;
if (localStorage.getItem('token')) {

  // Sign in status
  const nickname = localStorage.getItem('nickname');
  const token = localStorage.getItem('token');
  $('#navbar-member-link').text(`${nickname}`).attr('href', '/').click(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
  });
  getNotification(token);
  // show red dot
  $('#general-notification').click(() => {
    $('#notification-area').toggle()
    $('.guide').toggle()
    if ($('#notification-count')) {
      // call update user watch_msg_time function**
      updateMsgWatchedTime(token)
      $('#notification-count').remove();
    }
  })
  $('#match-notification').attr('href', `/want/check`);
  $('#want-invitation').attr('href', `/want/invitation`)
  $('#match-confirmed').attr('href', `/matches/confirmed`);
  $('#add-item').attr('href', `/items/new`);
  // get notification counts
} else {
  $('#navbar-member-link').click(() => {
    $('#sign-area').show();
    $('.id').trigger('focus')
  });
  $('.fast-btn').click(() => {
    alert('請先登入或註冊以使用會員功能');
  })
}

function getNotification(token) {
  // get notification msg => add page
  $.ajax({
    url: `/api/1.0/message/header`,
    type: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    success: async (msgArr) => {
      if (msgArr.length > 0) {
        // insert msg into msg area
        msgArr.forEach(msgObj => {
          // show unread dot
          let link = $('<a />').attr({
            href: msgObj.type,
            class: 'header-msg',
          })
          $('#notification-area').append(link);
          let outerNotificationDiv
          if (msgObj.watched === 'false') { //unread msg
            outerNotificationDiv = $('<div></div>').attr({ 'class': 'notification-div outer notification new' });
            msgCount++;
          } else {
            outerNotificationDiv = $('<div></div>').attr({ 'class': 'notification-div outer notification' });
          }
          link.append(outerNotificationDiv);
          let notificationDiv = $('<div></div>').attr({ 'class': 'notification-div new' }).html(`${msgObj.content}`);
          $(outerNotificationDiv).append(notificationDiv);
          if (msgObj.watched === 'false') {
            // 標示為已讀
            link.click(() => {
              $.ajax({ // 要改成針對每個 notification
                url: `/api/1.0/message/watched?id=${msgObj.id}`,
                type: 'post',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                success: (affectedRows) => {
                  console.log(affectedRows);
                  console.log(`已將 ${msgObj.id} 之訊息標示為已讀`);
                  outerNotificationDiv.attr({ 'class': 'notification-div outer notification' });
                },
                error: (err) => {
                  console.log(err)
                  return;
                }
              })
            })
          }
        })

        // 顯示新訊息紅點 => 改為比對最新訊息時間與最後觀看時間**
        // if (lastWatchedTime < msgArr[0].time) { add red dot }
        let lastWatchTime = await getLastMsgWatchedTime(token)
        console.log('msgArr[0].time')
        console.log(msgArr[0].time)
        console.log('lastWatchTime')
        console.log(lastWatchTime)
        if ( msgArr[0].time > lastWatchTime) {
          let notificationCount = $('<div></div>').attr({ 'id': 'notification-count' });
          notificationCount.insertAfter($('#notification-span'))
        }
      } else {
        let outerNotificationDiv = $('<div></div>').attr({ 'class': 'notification-div outer notification' });
        $('#notification-area').append(outerNotificationDiv);
        let notificationDiv = $('<div></div>').attr({ 'class': 'notification-div new' }).html(`現在沒有新訊息喔！`);
        $(outerNotificationDiv).append(notificationDiv);
      }
    },
    error: (err) => {
      console.log(err);
    }
  })
}

function updateMsgWatchedTime(token) {
  $.ajax({
    url: `/api/1.0/users/watchMsgTime`,
    type: 'put',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    success: (res) => {
      console.log('update msg watched time success');
    },
    error: (err, textStatus, errorThrown) => {
      console.log(err)
      console.log(textStatus);
      console.log(errorThrown);
    }
  })
}

async function getLastMsgWatchedTime(token) {
  return new Promise((resolve,reject)=>{
    $.ajax({
      url: `/api/1.0/users/lastMsgWatchedTime`,
      type: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: (time) => {
        resolve(time)
      },
      error: (err) => {
        console.log(err);
        reject(err)
      }
    })
  })
}