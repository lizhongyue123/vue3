const getters = {
  sidebar: state => state.app.sidebar,
  subSidebarRouter: state => state.app.sidebar.subSidebarRouter,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  status: state => state.user.status,
  roles: state => state.user.roles,
  userId: state => state.user.userId,
  permissionRouters: state => state.permission.routers, // 有登录后，根据不同权限生成路由
  addRouters: state => state.permission.addRouters,
  flatRouters: state => state.permission.flatRouters,
  errorLogs: state => state.errorLog.logs,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
