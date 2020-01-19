//package org.zhxie.sprintpoker.config.interceptors;
//
//import io.jsonwebtoken.Claims;
//import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
//import org.zhxie.sprintpoker.util.JwtUtil;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
///**
// * Created by jianyang on 2019/1/9.
// */
//
//@Component
//public class JwtInterceptor extends HandlerInterceptorAdapter {
//
//    @Override
//    public boolean preHandle(HttpServletRequest request,
//                             HttpServletResponse response, Object handler) throws Exception {
//        System.out.println("经过了拦截器");
//        final String authHeader = request.getHeader("Authorization");
//        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//            final String token = authHeader.substring(7); // The part after "Bearer "
//            Claims claims = JwtUtil.parseJWT(token);
//            if (claims != null) {
//                if ("admin".equals(claims.get("roles"))) {//如果是管理员
//                    request.setAttribute("roles", "admin");
//                }
//                if ("user".equals(claims.get("roles"))) {//如果是用户
//                    request.setAttribute("roles", "user");
//                }
//            }
//        }
//        return true;
//    }
//}
