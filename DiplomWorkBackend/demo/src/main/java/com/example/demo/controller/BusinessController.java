package com.example.demo.controller;

import com.example.demo.controller.dto.AddUserToSlotRequest;
import com.example.demo.controller.dto.ChangeSlotsRequest;
import com.example.demo.controller.dto.MessageDTO;
import com.example.demo.model.Business;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@Controller
@RequestMapping(value = "business")
public class BusinessController extends _BaseController {


    @GetMapping("/list/{forUser}")
    public ResponseEntity<List<Business>> listBusinesses(@PathVariable("forUser") Boolean forUser) {
        logger.info("Listing businesses");
        return ResponseEntity.ok(businessService.getAllBusinesses(forUser));
    }

    @PostMapping("/save")
    public ResponseEntity<MessageDTO> saveBusiness(@RequestBody Business business) {
        logger.info("Saving business {}", business);
        businessService.saveBusiness(business);
        return ResponseEntity.ok(new MessageDTO("Successfully saved"));
    }

    @PostMapping("/edit")
    public ResponseEntity<MessageDTO> editBusiness(@RequestBody Business business) {
        logger.info("Editing business with id {} to {}", business.getId(), business);
        businessService.editBusiness(business);
        return ResponseEntity.ok(new MessageDTO("Successfully edited"));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageDTO> editBusiness(@PathVariable("id") Long id) {
        logger.info("Deleting business with id {}", id);
        businessService.deleteBusiness(id);
        return ResponseEntity.ok(new MessageDTO("Successfully deleted"));
    }
    @PostMapping("/remove-user")
    public ResponseEntity<MessageDTO> removeUserFromBusiness(@RequestParam Long businessId, @RequestParam Long slotId, @RequestParam Long userId) {
        logger.info("Removing user with id {} from business with id {} from slot with id {}", userId, businessId, slotId);
        businessService.removeUserFromBusiness(businessId, slotId, userId);
        return ResponseEntity.ok(new MessageDTO("Successfully removed user"));
    }

    @PostMapping("/change-slots")
    public ResponseEntity<MessageDTO> changeBusinessSlots(@RequestBody ChangeSlotsRequest changeSlotsRequest) {
        logger.info("Changing slots of business with id {} to {}", changeSlotsRequest.getBusinessId(), changeSlotsRequest.getNewSlots());
        businessService.changeBusinessSlots(changeSlotsRequest.getNewSlots(), changeSlotsRequest.getBusinessId());
        return ResponseEntity.ok(new MessageDTO("Successfully edited slots"));
    }

    @PostMapping("/propagate-slots/{businessId}")
    public ResponseEntity<MessageDTO> propagateSlotsForCurrentWeek(@PathVariable("businessId") Long businessId) {
        logger.info("Propagating slots of business with id {}", businessId);
        Business currentBusiness = businessService.getAllBusinesses(false).stream().filter(business -> Objects.equals(business.getId(), businessId)).findFirst().get();
        businessService.propagateSlotsUntilEndOfWeekAndSaveBusiness(currentBusiness);
        return ResponseEntity.ok(new MessageDTO("Successfully edited slots"));
    }

    @PostMapping("/add-user-to-slot")
    public ResponseEntity<MessageDTO> addCurrentUserToSlot(@RequestBody AddUserToSlotRequest request) {
        logger.info("Adding current user to business {} to slot {}", request.getBusinessId(), request.getSlotId());
        businessService.addUserToBusiness(request.getBusinessId(), request.getSlotId());
        return ResponseEntity.ok(new MessageDTO("Successfully edited slots"));
    }
}
