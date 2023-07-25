package com.example.demo.model;


import com.sun.istack.NotNull;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
public class Slot extends _BaseEntity{
    @NotNull
    private String slotStartTime;

    @NotNull
    private String slotEndTime;

    @NotNull
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "slot_user",
            joinColumns = @JoinColumn(name = "slot_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> allUsers;

    @NotNull
    @Column(columnDefinition = "NUMERIC DEFAULT 1")
    private Integer maxUsers;

    @Column(columnDefinition = "DATE DEFAULT '2023-06-24'")
    private LocalDate date;

    public Slot(String slotStartTime, String slotEndTime, List<User> allUsers, Integer maxUsers, LocalDate date) {
        this.slotStartTime = slotStartTime;
        this.slotEndTime = slotEndTime;
        this.allUsers = allUsers;
        this.maxUsers = maxUsers;
        this.date = date;
    }

    public Slot() {

    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

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

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        _BaseEntity other = (_BaseEntity) obj;
        return Objects.equals(getId(), other.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
