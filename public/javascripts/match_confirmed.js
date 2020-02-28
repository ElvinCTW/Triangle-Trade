// const alphabetArr = ['A', 'B', 'C']

if (!localStorage.getItem('token')) {
  // 確認使用者有登入，如果沒有，跳alert請user登入
  alert('請登入以進入交換討論頁面');
  window.location.assign('/');
  // 應確認使用者為指定 user_nickname 的使用者
} 

$('#send-msg-btn').click(()=>{
  console.log('btn-click');
  sendMsg();
})

function sendMsg() {
  // get user input msg
  let userInputContent = $('#user-type-content').val();
  // let currentTime = Date.now();
  // send msg to front end page
  if (userInputContent.length > 0 && currentMatchedId) {
    console.log('send emit from page');
    socket.emit('message', {
      token:localStorage.getItem('token'),
      data: {
        content:userInputContent,
        sender:localStorage.getItem('nickname'),
        matched_id: currentMatchedId,
      }
    })
  } else {
    alert('請確認已點選左方配對物，並填入對話內容')
  }
}
let infoBtn = $('#items-info-btn')
infoBtn.click(()=>{
  if ($('.item-info').length > 0) {
    if (infoBtn.attr('style')==='background:rgb(235,235,235)') {
      $('#items-info-btn').attr('style','background:none');
    } else {
      $('#items-info-btn').attr('style','background:rgb(235,235,235)');
    }
    // 點擊後變色
    // 點擊後開關 items-info-div
    $('#items-info-div').toggle();
  } else {
    alert('請先選擇對話～')
  }
})