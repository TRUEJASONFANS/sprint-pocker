package org.zhxie.sprintpoker.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.zhxie.sprintpoker.entity.Role;
import org.zhxie.sprintpoker.entity.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public  class SecurityUser extends User implements UserDetails {

        public SecurityUser(User user) {
            this.setEmail(user.getEmail());
            this.setName(user.getName());
            this.setPassword(user.getPassword());
            this.setCreatedate(user.getCreatedate());
            this.setRoles(user.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
            List<Role> roles = this.getRoles();
            if(roles != null)
            {
                for (Role role : roles) {
                    SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.getName());
                    authorities.add(authority);
                }
            }
            return authorities;
        }

        @Override
        public String getPassword() {
            return super.getPassword();
        }

        @Override
        public String getUsername() {
            return super.getName();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }