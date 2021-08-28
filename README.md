# leave_Api

requesting leaves :- route /api/leave-request :post ,data : userId, reason, leaveDate

getting all leaves :- route /api/get-leaves :get

reject/approve :- route /api/update-leave :put ,data :  status, id  ~ status (approve or reject) ~ id leaveId ("612a4f1362eefb9a3aea327d") ~ userId
