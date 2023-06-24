package com.example.demo.controller.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

//@JsonDeserialize(using = UserDTODeserializer.class)
public class UserDTO {
    private String username;
    private String password;
    private String email;
    private String phone;
    public boolean isBusiness;
    private String businessType;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public boolean getIsBusiness() {
        return isBusiness;
    }

    public void setIsBusiness(boolean isBusiness) {
        this.isBusiness = isBusiness;
    }

    public String getBusinessType() {
        return businessType;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }
}
