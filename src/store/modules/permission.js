import { asyncRouterMap, constantRouterMap, redirect404 } from '@/router'

// /**
//  * 通过meta.role判断是否与当前用户权限匹配
//  * @param roles
//  * @param route
//  */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }

// /**
//  * 递归过滤异步路由表，返回符合用户角色权限的路由表
//  * @param asyncRouterMap
//  * @param roles
//  */
// function filterAsyncRouter(asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }

/**
 * 判断路由是否在授权路由表中，是就返回true
 * @param permissionRouterInfo
 * @param route
 */
function inPermissionList(permissionRouterInfo, route) {
  if (route.name) {
    return permissionRouterInfo.some(item => {
      return item.name === route.name
    })
  } else {
    return false
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param permissionRouterInfo
 */
function filterPermissionRouter(asyncRouterMap, permissionRouterInfo) {
  return asyncRouterMap.filter(route => {
    if (route.children && route.children.length) {
      route.children = filterPermissionRouter(
        route.children,
        permissionRouterInfo
      )
      if (route.children.length) {
        return true
      }
    } else {
      const hasPermission = inPermissionList(permissionRouterInfo, route)
      if (hasPermission) {
        return true
      }
    }
    return false
  })
}

// 生成各个路由的完整路径
function flatRouter(routerObj, parentPath) {
  let flatRouters = {}
  if (Array.isArray(routerObj) && routerObj.length) {
    routerObj.forEach(item => {
      if (item.redirect) {
        item.redirect = ''
        item.redirect = parentPath
          ? `${parentPath}/${item.path}`
          : item.path === '/'
          ? ''
          : item.path
        if (item.children && item.children.length) {
          item.redirect = item.redirect + '/' + item.children[0].path
          item.children.forEach((itemChild, index) => {
            if (itemChild.redirect) {
              itemChild.redirect = ''
              itemChild.redirect = parentPath
                ? `${parentPath}/${item.path}`
                : item.path + '/' + itemChild.path
              if (itemChild.children && itemChild.children.length) {
                if (index === 0) {
                  item.redirect =
                    item.redirect + '/' + itemChild.children[0].path
                  itemChild.redirect =
                    itemChild.redirect + '/' + itemChild.children[0].path
                }
              }
            }
          })
        }
      }
      const fullPath =
        parentPath && parentPath !== '/'
          ? `${parentPath}/${item.path}`
          : item.path
      if (item.name) {
        flatRouters[item.name] = {
          fullPath,
          path: item.path,
          name: item.name || '',
          meta: item.meta || ''
        }
      }
      if (item.children && item.children.length) {
        flatRouters = { ...flatRouters, ...flatRouter(item.children, fullPath) }
      } else {
        return flatRouters
      }
    })
  }
  return flatRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    permissionRouters: [],
    flatRouters: {}
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = [...routers, ...redirect404]
      state.routers = [...constantRouterMap, ...routers, ...redirect404]
    },
    SET_FLATROUTERS: (state, routers) => {
      state.flatRouters = routers
    }
  },
  actions: {
    // GenerateRoutes({ commit }, data) {
    //   return new Promise(resolve => {
    //     const { roles } = data
    //     let accessedRouters
    //     // roles中有admin路由
    //     if (roles.indexOf('admin') >= 0) {
    //       accessedRouters = asyncRouterMap
    //     } else {
    //       accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
    //     }
    //     commit('SET_ROUTERS', accessedRouters)
    //     const flatRouters = flatRouter([...constantRouterMap, ...accessedRouters], '')
    //     commit('SET_FLATROUTERS', flatRouters)
    //     resolve()
    //   })
    // },
    FilterRoutes({ commit }, permissionRouteInfo) {
      return new Promise(resolve => {
        const accessedRouters = filterPermissionRouter(
          asyncRouterMap,
          permissionRouteInfo
        )
        commit('SET_ROUTERS', accessedRouters)
        const flatRouters = flatRouter(accessedRouters, '')
        commit('SET_FLATROUTERS', flatRouters)
        resolve()
      })
    }
  }
}

export default permission
