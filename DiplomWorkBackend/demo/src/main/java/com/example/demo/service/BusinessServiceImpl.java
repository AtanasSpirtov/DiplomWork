package com.example.demo.service;

import com.example.demo.model.Business;
import com.example.demo.model.Slot;
import com.example.demo.model.User;
import com.example.demo.service.api.BusinessService;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import javax.persistence.EntityTransaction;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@Service
public class BusinessServiceImpl extends _BaseService implements BusinessService {
    @Override
    @Transactional
    public List<Business> getAllBusinesses() {
        List<Business> businesses = em.createQuery("SELECT DISTINCT b FROM Business b JOIN FETCH b.workingSlots ws", Business.class)
                .getResultList();

        // Initialize the allUsers collection within the same session
        for (Business business : businesses) {
            Hibernate.initialize(business.getWorkingSlots());
            for (Slot slot : business.getWorkingSlots()) {
                Hibernate.initialize(slot.getAllUsers());
            }
        }

        return businesses;
    }

    @Override
    @Transactional
    public void saveBusiness(Business business) {
        em.persist(business);
    }

    @Override
    @Transactional
    public void deleteBusiness(Long businessId) {
        Business currentBusiness = getAllBusinesses()
                .stream()
                .filter(business -> Objects.equals(business.getId(), businessId))
                .findFirst()
                .get();
        em.remove(currentBusiness);
    }

    @Override
    @Transactional
    public void editBusiness(Business business) {
        em.persist(business);
    }

    @Override
    @Transactional
    public void removeUserFromBusiness(Long businessId, Long slotId, Long userId) {
        Business business = em.find(Business.class, businessId);
        Slot currentSlot = business.getWorkingSlots()
                .stream()
                .filter(slot -> Objects.equals(slot.getId(), slotId))
                .findFirst()
                .get();
        User user = em.find(User.class, userId);
        currentSlot.getAllUsers().remove(user);
        em.flush();
    }

    @Override
    @Transactional
    public void changeBusinessSlots(List<Slot> newSlots, Long businessId) {
        Business business = em.find(Business.class, businessId);
        business.setWorkingSlots(newSlots);
        em.flush();
    }
}
