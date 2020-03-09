const users = [
  {
    sign_id:'test',
    password:'test',
    nickname:'aaa',
    token:'test',
    time:'1580475176931',
    watch_msg_time:'1583646727989',
  },
  {
    sign_id:'testz',
    password:'testz',
    nickname:'zzz',
    token:'testz',
    time:'1582631682264',
    watch_msg_time:'1583646755773',
  },
  {
    sign_id:'ppp',
    password:'ppp',
    nickname:'ppp',
    token:'ppp',
    time:'1583401085543',
    watch_msg_time:'1583668448697',
  },
];

const items = [
  // items 1-3 for available want logic test
  { // item 1
    user_id:1,
    main_category:6,
    sub_category:40,
    tags:'#item1',
    title:'item1',
    status:'觀賞用',
    introduction:'item1',
    pictures:'userUpload/aaa/aaa-1582601355302,',
    time:'1582601355567',
    availability:'true',
    matched_id:null,
    matched_item_id:null,
  },
  { // item 2
    user_id:2,
    main_category:6,
    sub_category:40,
    tags:'#item2',
    title:'item2',
    status:'觀賞用',
    introduction:'item2',
    pictures:'userUpload/zzz/zzz-1583303100343,',
    time:'1583331295751',
    availability:'true',
    matched_id:null,
    matched_item_id:null,
  },
  { // item 3
    user_id:3,
    main_category:6,
    sub_category:40,
    tags:'#item3',
    title:'item3',
    status:'觀賞用',
    introduction:'item3',
    pictures:'userUpload/zzz/zzz-1583303100343,',
    time:'1583331295751',
    availability:'true',
    matched_id:null,
    matched_item_id:null,
  },
  // items 4-5 for double matched logic test
  { // item 4
    user_id:1,
    main_category:6,
    sub_category:40,
    tags:'#item4',
    title:'item4',
    status:'觀賞用',
    introduction:'item4',
    pictures:'userUpload/zzz/zzz-1583055020042,',
    time:'1583331295751',
    availability:'false',
    matched_id:1,
    matched_item_id:5,
  },
  { // item 5
    user_id:2,
    main_category:6,
    sub_category:40,
    tags:'#item5',
    title:'item5',
    status:'觀賞用',
    introduction:'item5',
    pictures:'userUpload/我不是彭彭/我不是彭彭-1582369750203,',
    time:'1583331295751',
    availability:'false',
    matched_id:1,
    matched_item_id:4,
  },
  // items 6-8 for triple matched logic test
  { // item 6
    user_id:1,
    main_category:6,
    sub_category:40,
    tags:'#item6',
    title:'item6',
    status:'觀賞用',
    introduction:'item6',
    pictures:'userUpload/我不是彭彭/我不是彭彭-1582368916410,userUpload/我不是彭彭/我不是彭彭-1582368916442,userUpload/我不是彭彭/我不是彭彭-1582368916568,userUpload/我不是彭彭/我不是彭彭-1582368916576,',
    time:'1583331295751',
    availability:'false',
    matched_id:2,
    matched_item_id:7,
  },
  { // item 7
    user_id:2,
    main_category:6,
    sub_category:40,
    tags:'#item7',
    title:'item7',
    status:'觀賞用',
    introduction:'item7',
    pictures:'userUpload/C2H5OH/C2H5OH-1582601426642,',
    time:'1583331295751',
    availability:'false',
    matched_id:2,
    matched_item_id:8,
  },
  { // item 8
    user_id:3,
    main_category:6,
    sub_category:40,
    tags:'#item8',
    title:'item8',
    status:'觀賞用',
    introduction:'item8',
    pictures:'userUpload/C2H5OH/C2H5OH-1582601214771,',
    time:'1583331295751',
    availability:'false',
    matched_id:2,
    matched_item_id:6,
  },
];
const want = [
  // for non-matched want test
  {
    want_item_id:1,
    required_item_id:2, 
    matched:'false', 
    checked:'false',
  },
  {
    want_item_id:2,
    required_item_id:1, 
    matched:'false', 
    checked:'false',
  },
  {
    want_item_id:2,
    required_item_id:3, 
    matched:'false', 
    checked:'false',
  },
  {
    want_item_id:3,
    required_item_id:1, 
    matched:'false', 
    checked:'false',
  },
  // for double match test
  {
    want_item_id:4,
    required_item_id:5, 
    matched:'true', 
    checked:'confirm',
  },
  {
    want_item_id:5,
    required_item_id:4, 
    matched:'true', 
    checked:'confirm',
  },
  // for triple match test
  {
    want_item_id:6,
    required_item_id:7, 
    matched:'true', 
    checked:'confirm',
  },
  {
    want_item_id:7,
    required_item_id:8, 
    matched:'true', 
    checked:'confirm',
  },
  {
    want_item_id:8,
    required_item_id:6, 
    matched:'true', 
    checked:'confirm',
  },
];

module.exports = {
  items,
  users,
  want
};