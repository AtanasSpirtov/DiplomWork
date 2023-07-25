package com.example.demo.service;

import com.example.demo.model.Business;
import com.example.demo.model.Slot;
import com.example.demo.model.User;
import com.example.demo.service.api.BusinessService;
import com.example.demo.service.api.SecurityService;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.IsoFields;
import java.time.temporal.TemporalField;
import java.time.temporal.WeekFields;
import java.util.*;

@Service
public class BusinessServiceImpl extends _BaseService implements BusinessService {
    @Autowired
    private SecurityService securityService;

    @Override
    @Transactional
    public List<Business> getAllBusinesses(Boolean forUser) {
        TemporalField temporalField = WeekFields.of(Locale.getDefault()).dayOfWeek();
        LocalDate startOfWeek = LocalDate.now().with(temporalField, 1);
        LocalDate endOfWeek = startOfWeek.plusDays(7);

        User currentUser = securityService.getUserByUsername((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        List<Business> businesses = em.createQuery("SELECT DISTINCT b FROM Business b  ORDER BY b.name", Business.class)
                .getResultList()
                .stream()
                .filter(business -> forUser || business.getUserId().longValue() == currentUser.getId().longValue())
                .filter(business -> !forUser || business.getWorkingSlots().stream().anyMatch(slot -> (slot.getDate().isAfter(startOfWeek) && slot.getDate().isBefore(endOfWeek)) || slot.getDate().isEqual(startOfWeek) || slot.getDate().isEqual(endOfWeek)))
                .peek(business -> business.getWorkingSlots().sort(Comparator.comparing(Slot::getDate)))
                .toList();
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
        business.setUserId(securityService.getUserByUsername((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());
        propagateSlotsUntilEndOfWeekAndSaveBusiness(business);
    }

    @Override
    @Transactional
    public void deleteBusiness(Long businessId) {
        Business currentBusiness = getAllBusinesses(false)
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

    @Override
    @Transactional
    public void propagateSlotsUntilEndOfWeekAndSaveBusiness(Business business) {
        LocalDate today = LocalDate.now();
        if (business.getWorkingSlots().size() != 0 && business.getWorkingSlots().stream().allMatch(slot -> slot.getDate() != null)) {
            if (business.getWorkingSlots().stream().map(Slot::getDate).anyMatch(date -> date.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR) == today.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR))) {
                return;
            }
        }
        if (business.getId() != null) {
            business = em.find(Business.class, business.getId());
            em.remove(business);
        }
        LocalDate endOfWeek = today.with(DayOfWeek.SUNDAY);

        List<LocalDate> datesUntilEndOfWeek = new ArrayList<>();
        LocalDate currentDate = today;

        do {
            datesUntilEndOfWeek.add(currentDate);
            currentDate = currentDate.plusDays(1);
        } while (currentDate.minusDays(1).isBefore(endOfWeek));
        List<Slot> allSlotsPropagated = new ArrayList<>();
        LocalDate randomDateForWorkingSlot = business.getWorkingSlots().stream().findFirst().get().getDate();
        Business finalBusiness = business;
        datesUntilEndOfWeek.forEach(date ->
                allSlotsPropagated.addAll(finalBusiness.getWorkingSlots()
                        .stream()
                        .filter(slot -> slot.getDate() == null || slot.getDate().isEqual(randomDateForWorkingSlot))
                        .map(workingSlot -> new Slot(workingSlot.getSlotStartTime(), workingSlot.getSlotEndTime(), new ArrayList<>(), workingSlot.getMaxUsers(), date))
                        .toList()
                )
        );
        em.persist(new Business(
                business.getName(),
                business.getLocation(),
                business.getTelephone(),
                business.getPicture(),
                business.getBusinessField(),
                business.getStartTime(),
                business.getEndTime(),
                allSlotsPropagated,
                business.getUserId()
        ));
    }

    @Override
    @Transactional
    public void addUserToBusiness(Long businessId, Long slotId) {
        User user = securityService.getUserByUsername((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        Business currentBusiness = getAllBusinesses(true)
                .stream()
                .filter(business -> Objects.equals(business.getId(), businessId))
                .findFirst().get();
        Slot currentSlot = currentBusiness.getWorkingSlots()
                .stream()
                .filter(slot -> Objects.equals(slot.getId(), slotId)).findFirst().get();
        List<User> allUsers = currentSlot.getAllUsers();
        allUsers.add(user);
        currentSlot.setAllUsers(allUsers);
    }
}
