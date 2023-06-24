package com.example.demo.service.api;

import com.example.demo.model.Business;
import com.example.demo.model.BusinessEnum;
import com.example.demo.model.Slot;
import com.example.demo.model.User;

import java.util.List;

public interface BusinessService {
    List<Business> getAllBusinesses();

    void saveBusiness(Business business);

    void deleteBusiness(Long businessId);

    void editBusiness(Business business);

    void removeUserFromBusiness(Long businessId, Long slotId, Long userId);

    void changeBusinessSlots(List<Slot> newSlots, Long businessId);

}
