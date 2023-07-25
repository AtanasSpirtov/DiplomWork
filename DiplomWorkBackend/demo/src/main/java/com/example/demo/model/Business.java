package com.example.demo.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.sun.istack.NotNull;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@JsonDeserialize
public class Business extends _BaseEntity {
    @NotNull
    private String name;
    @NotNull
    private String location;
    @NotNull
    private String telephone;

    @Lob
    private byte[] picture;

    @NotNull
    private String businessField;

    @NotNull
    private LocalDateTime startTime;

    @NotNull
    private LocalDateTime endTime;

        @OneToMany(cascade = CascadeType.ALL )
        private List<Slot> workingSlots;

    @Column(columnDefinition = "NUMERIC DEFAULT 9")
    private Long userId;

    public Business(String name, String location, String telephone, byte[] picture, String businessField, LocalDateTime startTime, LocalDateTime endTime, List<Slot> allSlotsPropagated, Long userId) {
        super();
        this.name = name;
        this.location = location;
        this.telephone = telephone;
        this.picture = picture;
        this.businessField = businessField;
        this.startTime = startTime;
        this.endTime = endTime;
        this.workingSlots = allSlotsPropagated;
        this.userId = userId;
    }

    public Business() {

    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public String getBusinessField() {
        return businessField;
    }

    public void setBusinessField(String businessField) {
        this.businessField = businessField;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public List<Slot> getWorkingSlots() {
        return workingSlots;
    }

    public void setWorkingSlots(List<Slot> workingSlots) {
        this.workingSlots = workingSlots;
    }
}
