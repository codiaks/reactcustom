
const authService = {
  UserLogin: "/auth/login",
  UserLogout: "/auth/logout",
  UserRefresh: "/auth/refresh",
};

const departmentService = {
  DepartmentCreate: "/department/create",
  DepartmentEdit: "/department/update",
  DepartmentList: "/department/list",
  DepartmentDelete: "/department/delete",
};

const skillService = {
  SkillCreate: "/skill",
  SkillList: "/skill",
  SkillDelete: "/skill",
  SkillUpload: "/skill/csvLoad",
};

const userService = {
  UserUpload: "/user/upload",
  UserUpdate: "/user",
  UserList: "/user/pageable",
  UserDelete: "/user",
  UserDetails: "/user",
  UserRoleChange: "/user/role",
  UserSkillCreate: "/skill/addUserSkill",
  UserProfile:"/user/get",
  UserSkillList:"/skill/user/skillList"
};

const taskService = {
  TaskCreate: "/task",
  TaskUpdate: "/task",
  TaskList: "/task",
  TaskDelete: "/task",
  TaskMine: "/task/mytask",
};

const requestService = {
  RequestCreate: "/request/create",
  RequestIncoming: "/request/incoming",
  RequestApprove: "/request/approve",
  RequestsSent:  "/request/myRequest",
};

const subtaskService = {
  TaskSubTaskGet: "/sub-task/Task/subtask",
  MySubTaskGet: "/sub-task/mysubtak",
  SubTaskCreate: "/sub-task", // approving the request
  SubTaskFileUpload: "/sub-task/upload/task",
  SubTaskUpdate: "/sub-task",
  SubTaskGetById: "/sub-task",
};

export const ApiConstants = {
  ...authService,
  ...departmentService,
  ...skillService,
  ...userService,
  ...taskService,
  ...requestService,
  ...subtaskService,
};
