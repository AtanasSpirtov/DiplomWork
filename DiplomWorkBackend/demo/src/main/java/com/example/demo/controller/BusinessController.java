package com.example.demo.controller;

import com.example.demo.controller._BaseController;
import com.example.demo.controller.dto.ChangeSlotsRequest;
import com.example.demo.controller.dto.MessageDTO;
import com.example.demo.model.Business;
import com.example.demo.model.Slot;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value = "business")
public class BusinessController extends _BaseController {


    @GetMapping("/list")
    public ResponseEntity<List<Business>> listBusinesses() {
        logger.info("Listing businesses");
        return ResponseEntity.ok(businessService.getAllBusinesses());
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
}
