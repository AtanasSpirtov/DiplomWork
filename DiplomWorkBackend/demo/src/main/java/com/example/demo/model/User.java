package com.example.demo.model;

import com.sun.istack.NotNull;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import java.util.Collection;
import java.util.Set;

@Entity
@Table(name = "`user`")
public class User extends _BaseEntity {
    @NotNull

    private String username;
    @NotNull

    private String password;
    @NotNull

    private String email;
    @NotNull

    private String phone;

    @ColumnDefault("false")
    @NotNull
    private boolean isBusiness;

    @Enumerated(EnumType.STRING)
    private BusinessEnum business;


    @ManyToMany(targetEntity = Role.class, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Role> roles;

    public User(String username, String password, String email, String phone, boolean isBusiness, BusinessEnum business) {
        this.password = password;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.business = business;
        this.isBusiness = isBusiness;
    }

    public User() {
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public BusinessEnum getBusiness() {
        return business;
    }

    public void setBusiness(BusinessEnum business) {
        this.business = business;
    }

    public boolean isBusiness() {
        return this.isBusiness;
    }

    public void setBusiness(boolean business) {
        this.isBusiness = business;
    }

    public Collection<? extends GrantedAuthority> getRolesAsSimpleGrantedAuthorities() {
        return this.roles.stream().flatMap(role ->
                role.getAuthority().stream().map(authority ->
                        new SimpleGrantedAuthority(authority.getAuthorityName()))).toList();
    }
}
