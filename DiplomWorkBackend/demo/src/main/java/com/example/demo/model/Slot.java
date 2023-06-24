package com.example.demo.model;


import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.List;

@Entity
public class Slot extends _BaseEntity{
    @org.jetbrains.annotations.NotNull
    private String slotStartTime;

    @NotNull
    private String slotEndTime;

    @NotNull
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "slot_user",
            joinColumns = @JoinColumn(name = "slot_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )    private List<User> allUsers;

    @NotNull
    @Column(columnDefinition = "NUMERIC DEFAULT 1")
    private Integer maxUsers;

    public String getSlotStartTime() {
        return slotStartTime;
    }

    public void setSlotStartTime(String slotStartTime) {
        this.slotStartTime = slotStartTime;
    }

    public String getSlotEndTime() {
        return slotEndTime;
    }

    public void setSlotEndTime(String slotEndTime) {
        this.slotEndTime = slotEndTime;
    }

    public List<User> getAllUsers() {
        return allUsers;
    }

    public void setAllUsers(List<User> allUsersInSlot) {
        this.allUsers = allUsersInSlot;
    }

    public Integer getMaxUsers() {
        return maxUsers;
    }

    public void setMaxUsers(Integer maxUsers) {
        this.maxUsers = maxUsers;
    }
}
