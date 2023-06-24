package com.example.demo.controller.dto;

import com.example.demo.model.Slot;

import java.util.List;

public class ChangeSlotsRequest {
    private Long businessId;

    private List<Slot> newSlots;

    public ChangeSlotsRequest(Long businessId, List<Slot> newSlots) {
        this.businessId = businessId;
        this.newSlots = newSlots;
    }

    public Long getBusinessId() {
        return businessId;
    }

    public void setBusinessId(Long businessId) {
        this.businessId = businessId;
    }

    public List<Slot> getNewSlots() {
        return newSlots;
    }

    public void setNewSlots(List<Slot> newSlots) {
        this.newSlots = newSlots;
    }
}
