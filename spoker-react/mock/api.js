export default {
  'GET /api/users': { users: [1, 2] },
  'GET /api/rooms=1&_limit=8':
    [{ name: "room1", desc: "created by j1", roomNum: 1 },
    { name: "room2", desc: "created by j2", roomNum: 2 }]
  ,
  'GET /api/dashboard?page=1&limit=20':[
    { ticketNum: "001", title: "process definition", desc: "pxxxxxxx", storyPoint: 3 },
    { ticketNum: "002", title: "create auto selection", desc: "caaaaaaa", storyPoint: 5 },
  ]
};
