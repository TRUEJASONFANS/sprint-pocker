package org.zhxie.sprintpoker.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.stereotype.Component;
import org.zhxie.sprintpoker.service.AuthFailureHandler;
import org.zhxie.sprintpoker.service.CustomUserDetailsService;
import org.zhxie.sprintpoker.service.LoginSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by jianyang on 1/7/2019.
 */

@Configuration
@EnableWebSecurity
@EnableConfigurationProperties(SecuritySettings.class)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  private CustomUserDetailsService customUserDetailsService;

  @Autowired
  private SecuritySettings settings;

  @Autowired @Qualifier("dataSource")
  private DataSource dataSource;

  @Autowired
  private AuthFailureHandler authFailureHandler;

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    /**
     *  / , /login are allowed to directly visit
     * others routes visit need be authenticated
     *
     */

    //include /login?msg=Bad Credentials
    http.authorizeRequests()
            .antMatchers("/images/**", "/checkcode", "/scripts/**", "/styles/**", "/sprint/login*")
            .permitAll()
            .anyRequest().authenticated().and().formLogin()
            .loginPage("/sprint/login").loginProcessingUrl("/sprint/login")
            .permitAll().successHandler
            (loginSuccessHandler()).failureHandler
            (authFailureHandler);


    http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS);

    http.logout().logoutUrl("/sprint/logout").deleteCookies("JSESSIONID").logoutSuccessUrl("/")
            .and().rememberMe().userDetailsService(customUserDetailsService)
            .tokenValiditySeconds(86400).tokenRepository(tokenRepository());

    // enable the cookie transfer from different port
    http.csrf().disable();

    http.cors().disable();

  // 用来给浏览器指示允许一个页面可否在 <frame>, <iframe> 或者 <object> 中展现的标记
    http.headers().frameOptions().sameOrigin();
  }

  private JdbcTokenRepositoryImpl tokenRepository() {
    JdbcTokenRepositoryImpl jtr = new JdbcTokenRepositoryImpl();
    jtr.setDataSource(dataSource);
    return jtr;
  }

  @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/sprint/api/user/regist");
  }

    @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(customUserDetailsService).passwordEncoder(bcryptPasswordEncoder());
    //remember me
    auth.eraseCredentials(false);
  }

  @Bean
  public BCryptPasswordEncoder bcryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public LoginSuccessHandler loginSuccessHandler(){
    return new LoginSuccessHandler();
  }

  @Bean
  public AuthFailureHandler authFailureHandler() {return new AuthFailureHandler();}

  @Bean
  public CustomSecurityMetadataSource securityMetadataSource() {
    return new CustomSecurityMetadataSource(settings.getUrlroles());
  }

  @Bean
  public CustomFilterSecurityInterceptor customFilter() throws Exception{
    CustomFilterSecurityInterceptor customFilter = new CustomFilterSecurityInterceptor();
    customFilter.setSecurityMetadataSource(securityMetadataSource());
    customFilter.setAccessDecisionManager(accessDecisionManager());
    return customFilter;
  }

  @Bean
  public AccessDecisionManager accessDecisionManager() {
    return new CustomAccessDecisionManager();
  }



}