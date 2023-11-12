export const ROUTES={
   LOGIN:"/",
   REGISTER:"register",
   DASHBOARD:{
      PATH_INITIAL:"dashboard",
      PATH_BOARDS:"boards",
      PATH_BOARD:"board/:id/:name",
      PATH_WORK_AREA:"work-area/:id/:name",
      PATH_WORK_AREA_MEMBERS:"work-area/:id/:name/members"
   },
   NOT_FOUND:"*"
}

export const headers={
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
   "Access-Control-Allow-Headers": "Content-Type",
   "Content-Type":"application/json"
}